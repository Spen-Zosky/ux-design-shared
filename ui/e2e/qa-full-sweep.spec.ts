import fs from "node:fs";
import path from "node:path";
import { test, expect, type ConsoleMessage } from "@playwright/test";
import { STORY_INDEX_FILE } from "./global-setup";
import {
  openManager,
  expandAllGroups,
  clickLeaf,
  openLeafInManager,
  isLeafSelected,
  canvasState,
} from "./lib/manager";

/**
 * Il giro completo: ogni voce della vetrina, guardata dalla UI manager.
 *
 * È la richiesta di Enzo tradotta in test — espandere i gruppi, aprire ciascuna
 * voce, osservare cosa accade nella finestra di contenuto — e copre TUTTE le 504
 * voci, story e pagine di documentazione, senza campionamento.
 *
 * COME SI ARRIVA A UNA VOCE, e cosa costa. Il gesto più fedele è il click nella
 * sidebar, ma per cliccare bisogna prima espandere l'albero, e `expandAllGroups`
 * costa circa un minuto: pagarlo 504 volte significherebbe otto ore di suite.
 * Il giro completo apre quindi ogni voce dentro il manager indirizzandola per
 * percorso — stessa interfaccia, stessa iframe, stessa sidebar che si apre da
 * sola — e il CLICK FISICO è verificato a parte, su una voce per ciascuno dei
 * gruppi di primo livello (`il click funziona in ogni gruppo`). Nessun cap
 * silenzioso: questo è il compromesso, dichiarato qui e ripreso nel report.
 */

type IndexEntry = { id: string; title: string; name: string; type?: string };

const entries: IndexEntry[] = JSON.parse(fs.readFileSync(STORY_INDEX_FILE, "utf-8"));

const SCREENSHOT_DIR = path.join("test-results", "qa-sweep");

/**
 * Voci legittimamente ad area zero — elenco ESPLICITO, mai una regola generica.
 *
 * Una story che non occupa spazio non è di per sé rotta: può rendere un vuoto
 * per definizione, o essere nascosta dal viewport di prova. Ma ogni caso deve
 * essere nominato e motivato: una voce ad area zero fuori da questo elenco
 * fallisce, ed è così che l'elenco resta onesto invece di diventare un tappeto
 * sotto cui spingere i difetti.
 *
 * L'elenco entra per intero nel report finale.
 */
const AREA_ZERO_AMMESSA: Record<string, string> = {
  "components-mobilenav--default":
    "il componente è `md:hidden`: per progetto non si vede sul viewport desktop del browser di prova",
  "components-mobilenav--with-badges":
    "stessa ragione: variante del medesimo componente `md:hidden`",
  "collab-commentthread--empty":
    "stato vuoto per definizione: una lista senza elementi collassa ad altezza zero",
};

/** Errori di console attesi per una voce precisa, con la loro ragione. */
const CONSOLE_ERROR_ATTESI: Record<string, RegExp[]> = {
  "components-lottieplayer--placeholder-while-loading": [
    // La story punta di proposito a una sorgente inesistente per mostrare il
    // placeholder: il 404 è il soggetto del test.
    /Failed to load resource: the server responded with a status of 404/,
  ],
  "components-lottieplayer--docs": [
    // La pagina di documentazione monta anche la story qui sopra, quindi
    // eredita il suo 404 voluto. È il primo effetto collaterale delle autodocs
    // sull'audit: un'eccezione dichiarata per una story vale anche per la
    // pagina che la contiene, e va ripetuta.
    /Failed to load resource: the server responded with a status of 404/,
  ],
  "components-datatable--with-mocked-error": [
    // MSW restituisce 500 di proposito (`data-table.stories.tsx:136`) e la
    // story documenta il fallback della tabella: l'errore È il soggetto.
    /Failed to load resource: the server responded with a status of 500/,
  ],
  "components-datatable--docs": [
    // Stessa eredità: la pagina docs monta anche la story col 500 simulato.
    /Failed to load resource: the server responded with a status of 500/,
  ],
};

test.describe("giro completo della vetrina", () => {
  for (const entry of entries) {
    const isDocs = (entry.type ?? "story") === "docs";

    test(`${entry.title} › ${entry.name}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];
      const attesi = CONSOLE_ERROR_ATTESI[entry.id] ?? [];

      page.on("console", (msg: ConsoleMessage) => {
        if (msg.type() !== "error") return;
        const text = msg.text();
        if (attesi.some((rx) => rx.test(text))) return;
        consoleErrors.push(text);
      });
      page.on("pageerror", (err: Error) => pageErrors.push(err.message));

      await openLeafInManager(page, entry.id, isDocs);

      // 1. La sidebar deve considerare selezionata la voce che stiamo
      //    guardando: se la navigazione non la seleziona, l'utente si perde
      //    anche quando il contenuto è corretto.
      await expect
        .poll(() => isLeafSelected(page, entry.id), {
          message: `la voce "${entry.title} › ${entry.name}" non risulta selezionata nella sidebar dopo l'apertura`,
          timeout: 20_000,
        })
        .toBe(true);

      // 2. La canvas deve avere montato qualcosa.
      await expect
        .poll(async () => (await canvasState(page, isDocs)).childCount, {
          message: `"${entry.title} › ${entry.name}" non ha montato nulla nella finestra di contenuto`,
          timeout: 25_000,
        })
        .toBeGreaterThan(0);

      const state = await canvasState(page, isDocs);

      // 3. Nessuna pagina d'errore di Storybook, col messaggio vero se c'è.
      expect(
        state.hasErrorUi,
        `"${entry.title} › ${entry.name}" mostra la pagina d'errore di Storybook:\n  ${state.errorText}`,
      ).toBe(false);

      // 4. Area visibile, salvo eccezione dichiarata sopra.
      const motivo = AREA_ZERO_AMMESSA[entry.id];
      if (motivo) {
        // Non pretendiamo che sia zero: pretendiamo solo di non fallire se lo è.
        // Se un giorno diventasse visibile, non è un difetto — è l'elenco a
        // essere invecchiato, e va rivisto.
      } else {
        expect(
          state.visibleArea,
          `"${entry.title} › ${entry.name}" occupa area zero e non è fra le eccezioni dichiarate. ` +
            `Se è legittimo, va aggiunto ad AREA_ZERO_AMMESSA con la sua ragione; altrimenti è un difetto.`,
        ).toBeGreaterThan(0);
      }

      // 5. Prova visiva anche quando passa: è il materiale che permette di
      //    ricontrollare a occhio senza rifare il giro.
      await page
        .screenshot({ path: path.join(SCREENSHOT_DIR, `${entry.id}.png`), fullPage: false })
        .catch(() => {
          /* uno screenshot mancato non deve far fallire una voce sana */
        });

      // 6. Console pulita.
      const issues = [...pageErrors, ...consoleErrors];
      expect(
        issues,
        `Errori in "${entry.title} › ${entry.name}":\n  - ${issues.join("\n  - ")}`,
      ).toEqual([]);
    });
  }
});

/**
 * Il click fisico, verificato in ogni gruppo di primo livello.
 *
 * Copre ciò che il giro qui sopra salta per ragioni di costo. Un test per
 * gruppo: espande l'albero una volta sola, poi clicca la prima voce del gruppo e
 * pretende che venga selezionata e disegnata.
 */
const gruppi = [...new Set(entries.map((e) => e.title.split("/")[0]))];
const primaVoceDelGruppo = new Map<string, IndexEntry>();
for (const e of entries) {
  const g = e.title.split("/")[0];
  if (!primaVoceDelGruppo.has(g) && (e.type ?? "story") === "story") primaVoceDelGruppo.set(g, e);
}

test.describe("il click funziona in ogni gruppo", () => {
  test.setTimeout(240_000);

  test(`una voce cliccata a mano in ciascuno dei ${gruppi.length} gruppi`, async ({ page }) => {
    await openManager(page);
    await expandAllGroups(page);

    const falliti: string[] = [];

    for (const gruppo of gruppi) {
      const entry = primaVoceDelGruppo.get(gruppo);
      if (!entry) continue;

      await clickLeaf(page, entry.id);

      const selezionata = await expect
        .poll(() => isLeafSelected(page, entry.id), { timeout: 15_000 })
        .toBe(true)
        .then(() => true)
        .catch(() => false);

      const disegnata = await expect
        .poll(async () => (await canvasState(page)).childCount, { timeout: 20_000 })
        .toBeGreaterThan(0)
        .then(() => true)
        .catch(() => false);

      if (!selezionata || !disegnata) {
        falliti.push(
          `${gruppo}: "${entry.title} › ${entry.name}" — ${!selezionata ? "il click non l'ha selezionata" : "selezionata ma la canvas è rimasta vuota"}`,
        );
      }
    }

    expect(
      falliti,
      `Il click dalla sidebar non funziona in ${falliti.length} gruppi:\n  - ${falliti.join("\n  - ")}`,
    ).toEqual([]);
  });
});
