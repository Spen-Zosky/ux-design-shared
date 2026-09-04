import fs from "node:fs";
import { test, expect, type ConsoleMessage } from "@playwright/test";
import { STORY_INDEX_FILE } from "./global-setup";
import { describeStoryFailure } from "./lib/error-ui";

/**
 * Smoke test: ogni story pubblicata da Storybook deve renderizzare senza
 * errori JavaScript (console.error o eccezioni non gestite).
 *
 * Non asserisce sul contenuto visivo di ciascun componente — questo è un
 * cancello di regressione generale ("l'interfaccia si rompe?"), non un test
 * dei singoli componenti. La lista delle story è letta da index.json via
 * global-setup.ts, quindi copre automaticamente le nuove story aggiunte in
 * futuro senza bisogno di aggiornare questo file.
 *
 * Nato da un'indagine manuale (2026-09-03): il rendering di TUTTE le story
 * dipende dalla registrazione riuscita del Service Worker di MSW
 * (msw-storybook-addon) — un fallimento qui blocca ogni story con uno
 * spinner infinito, non solo quelle che intercettano richieste HTTP.
 */

type StoryIndexEntry = {
  id: string;
  title: string;
  name: string;
};

// Rumore noto e innocuo che non deve far fallire il cancello: aggiungere qui
// solo dopo aver verificato che il messaggio è davvero benigno, non per
// silenziare un errore reale.
const CONSOLE_ERROR_ALLOWLIST: RegExp[] = [
  // nessuna voce ad oggi — ogni [error] in console è trattato come reale
];

const stories: StoryIndexEntry[] = JSON.parse(fs.readFileSync(STORY_INDEX_FILE, "utf-8"));

for (const story of stories) {
  test(`${story.title} › ${story.name}`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on("console", (msg: ConsoleMessage) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      if (CONSOLE_ERROR_ALLOWLIST.some((rx) => rx.test(text))) return;
      consoleErrors.push(text);
    });
    page.on("pageerror", (err: Error) => pageErrors.push(err.message));

    // Niente "networkidle": alcune story hanno polling/timer continui
    // (es. Toast › Interactive Trigger) che non azzerano mai il traffico di
    // rete, facendo scadere il timeout senza che ci sia nessun problema
    // reale — misurato qui il 2026-09-03.
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);

    // Il renderer di Storybook monta ogni story in questo contenitore.
    // Si controlla la presenza di un elemento figlio nel DOM, non che sia
    // VISIBILE: uno stato legittimamente vuoto (es. CommentThread › Empty,
    // una <ul> senza <li>) collassa ad altezza zero, e un componente con
    // `className="md:hidden"` (es. MobileNav) è nascosto by design sul
    // viewport desktop di default del browser di test — nessuno dei due è
    // un errore di rendering. Un vero crash (root senza figli, o un
    // componente che non si monta) resta catturato da questo count() più
    // dal listener su console/pageerror qui sotto (falsi positivi
    // verificati il 2026-09-03).
    const root = page.locator("#storybook-root");
    await expect(root).toBeAttached();

    // L'assertion resta dentro un try perché deve conservare il proprio
    // retry: sostituirla con un `count()` secco toglierebbe l'attesa e
    // introdurrebbe flakiness proprio dove serve stabilità. Quello che
    // aggiungiamo è solo la DIAGNOSI: quando il fallimento è ormai certo,
    // andiamo a leggere la ragione dove Storybook la scrive davvero — fuori
    // da #storybook-root, in .sb-nopreview / .sb-errordisplay (misurato il
    // 2026-09-04). Senza questa lettura il messaggio era "expected not 0,
    // received 0", che non dice nulla su cosa si sia rotto.
    try {
      await expect(root.locator(":scope > *")).not.toHaveCount(0);
    } catch (cause) {
      const detail = await describeStoryFailure(page);
      throw new Error(
        `"${story.title} › ${story.name}" non ha montato nulla in #storybook-root.\n${detail}`,
        { cause },
      );
    }

    const issues = [...pageErrors, ...consoleErrors];
    expect(issues, `Errori in "${story.title} › ${story.name}":\n  - ${issues.join("\n  - ")}`).toEqual([]);
  });
}
