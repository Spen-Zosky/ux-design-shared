import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";
import { STORY_INDEX_FILE } from "./global-setup";
import { canvas, openLeafInManager } from "./lib/manager";

/**
 * Ogni Control deve produrre un effetto visibile, e avere il widget giusto.
 *
 * Richiesta esplicita di Enzo: verificare che i controlli di modifica funzionino
 * e producano effetti visibili nella finestra di contenuto. Un controllo esposto
 * che non cambia nulla è un difetto in entrambi i modi in cui può esserlo — o è
 * dichiarato per errore, o il componente lo ignora — e va riportato comunque.
 *
 * COME SI MISURA L'EFFETTO. Si legge l'`outerHTML` della canvas prima e dopo il
 * cambio. È una misura grossolana ma sincera: cattura sia i cambi di struttura
 * sia quelli di sola classe CSS, che sono la maggioranza dei casi qui (un
 * `variant` che passa da `default` a `outline` cambia solo le classi).
 *
 * Come A2, questo file NON fallisce sui difetti trovati: li raccoglie in
 * `test-results/controls-inventario.json`, perché l'esito è un inventario da
 * leggere, non un cancello da superare. Fallisce solo se il banco di prova non
 * riesce a fare il proprio lavoro.
 */

type IndexEntry = { id: string; title: string; name: string; type?: string };

const entries: IndexEntry[] = JSON.parse(fs.readFileSync(STORY_INDEX_FILE, "utf-8"));
const storie = entries.filter((e) => (e.type ?? "story") === "story");

/**
 * Un file per story, non un elenco in memoria.
 *
 * Con più worker un array condiviso non esiste: ogni processo ha il suo, e
 * l'`afterAll` di chi non ha esaminato nulla stampa zero. È lo stesso errore
 * che avevo fatto nell'inventario a11y, qui evitato in partenza.
 * L'aggregazione la fa `scripts/controls-riepilogo.mjs`.
 */
const OUT_DIR = path.join("test-results", "controls");

type Esito = {
  voce: string;
  controllo: string;
  widget: string;
  tipoDichiarato: string;
  effetto: "sì" | "no" | "non-provato";
  nota?: string;
};

/**
 * Controlli per cui NON ci si aspetta un effetto sul rendering — elenco
 * esplicito, con la ragione.
 *
 * Un `on*` è un callback: cambiarlo non ridisegna niente, ed è corretto così.
 */
function effettoNonAtteso(nome: string): string | null {
  if (/^on[A-Z]/.test(nome)) return "è un callback (prop `on*`): non partecipa al rendering";
  if (nome === "className") return "classe passata dall'esterno: l'effetto dipende da cosa si scrive";
  return null;
}

function scriviEsiti(id: string, esiti: Esito[]): void {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, `${id}.json`), JSON.stringify(esiti, null, 2));
}

test.describe("i Controls producono effetti visibili", () => {
  for (const entry of storie) {
    test(`${entry.title} › ${entry.name}`, async ({ page }) => {
      test.setTimeout(120_000);
      const esiti: Esito[] = [];

      await openLeafInManager(page, entry.id, false);

      // Il pannello degli addon si popola DOPO che la story ha finito di
      // montare: senza questa attesa il primo tentativo trovava zero controlli
      // e il test passava dichiarando di non aver esaminato niente — il modo
      // peggiore di fallire, perché sembra un successo.
      await page
        .locator('[id^="control-"]')
        .first()
        .waitFor({ state: "attached", timeout: 15_000 })
        .catch(() => {
          /* una story può legittimamente non avere controlli */
        });

      // Il pannello Controls vive nel manager, non nella canvas.
      const controlli = await page
        .locator('[id^="control-"]')
        .evaluateAll((els) =>
          els.map((el) => ({
            id: el.id,
            nome: el.id.replace(/^control-/, ""),
            widget: el.tagName.toLowerCase() + (el.getAttribute("type") ? `[${el.getAttribute("type")}]` : ""),
          })),
        )
        .catch(() => []);

      if (controlli.length === 0) {
        scriviEsiti(entry.id, []);
        return; // story senza controlli: niente da provare, ma va registrato
      }

      // Il tipo dichiarato si legge dalla riga della tabella che ospita il
      // controllo: è ciò che la documentazione promette a chi la consulta.
      const tipiDichiarati = await page
        .locator("table tr")
        .evaluateAll((righe) => {
          const out: Record<string, string> = {};
          for (const tr of righe) {
            const ctrl = tr.querySelector('[id^="control-"]');
            const nome = ctrl?.id.replace(/^control-/, "");
            if (!nome) continue;
            const celle = Array.from(tr.querySelectorAll("td"));
            out[nome] = (celle[1]?.textContent ?? "").trim().slice(0, 120);
          }
          return out;
        })
        .catch(() => ({}) as Record<string, string>);

      const root = canvas(page).locator("#storybook-root");

      for (const c of controlli) {
        const tipoDichiarato = tipiDichiarati[c.nome] ?? "";
        const nonAtteso = effettoNonAtteso(c.nome);

        if (nonAtteso) {
          esiti.push({
            voce: `${entry.title} › ${entry.name}`,
            controllo: c.nome,
            widget: c.widget,
            tipoDichiarato,
            effetto: "non-provato",
            nota: nonAtteso,
          });
          continue;
        }

        const prima = await root.innerHTML().catch(() => "");
        // Selettore per attributo, non `#id`: `CSS.escape` è un'API del
        // browser e qui siamo in Node, e gli id dei controlli possono contenere
        // caratteri che un selettore `#` interpreterebbe.
        const el = page.locator(`[id="${c.id}"]`);
        let cambiato = false;

        try {
          if (c.widget === "select") {
            const opzioni = await el.locator("option").evaluateAll((os) =>
              os.map((o) => (o as HTMLOptionElement).value).filter((v) => v && v !== "Choose option..."),
            );
            const attuale = await el.inputValue().catch(() => "");
            const nuova = opzioni.find((o) => o !== attuale);
            if (nuova) {
              await el.selectOption(nuova);
              cambiato = true;
            }
          } else if (c.widget.startsWith("input[checkbox]")) {
            await el.click();
            cambiato = true;
          } else if (c.widget.startsWith("input[radio]")) {
            // I radio di un'enumerazione condividono il `name` e si distinguono
            // per valore: si sceglie il primo diverso da quello selezionato.
            // Senza questo ramo 81 controlli su 568 — il 14% — finivano fra i
            // "non provati" per un limite di questo banco, non della vetrina:
            // un cap silenzioso travestito da risultato.
            const gruppo = page.locator(`[id^="control-${c.nome}"][type="radio"]`);
            const quanti = await gruppo.count();
            for (let i = 0; i < quanti; i++) {
              const r = gruppo.nth(i);
              if (!(await r.isChecked().catch(() => false))) {
                await r.click({ force: true });
                cambiato = true;
                break;
              }
            }
          } else if (c.widget === "textarea" || c.widget.startsWith("input[text]") || c.widget === "input") {
            await el.fill("SENTINELLA-QA");
            await el.press("Enter").catch(() => {});
            cambiato = true;
          } else if (c.widget.startsWith("input[number]")) {
            await el.fill("42");
            await el.press("Enter").catch(() => {});
            cambiato = true;
          }
        } catch {
          cambiato = false;
        }

        if (!cambiato) {
          esiti.push({
            voce: `${entry.title} › ${entry.name}`,
            controllo: c.nome,
            widget: c.widget,
            tipoDichiarato,
            effetto: "non-provato",
            nota: "il widget non è fra quelli che questo banco sa manipolare",
          });
          continue;
        }

        await page.waitForTimeout(400);
        const dopo = await root.innerHTML().catch(() => "");

        // Un'enumerazione dichiarata ma servita da un campo di testo libero è
        // un disallineamento fra tipo del dato e tipo di controllo: chi usa la
        // vetrina può digitare un valore che il componente non conosce.
        const sembraUnione = /"[^"]+"\s*\|/.test(tipoDichiarato);
        const widgetTestuale = c.widget === "textarea" || c.widget.startsWith("input[text]");
        const nota = sembraUnione && widgetTestuale
          ? `tipo dichiarato come unione (${tipoDichiarato}) ma servito da testo libero: dovrebbe essere select/radio`
          : undefined;

        esiti.push({
          voce: `${entry.title} › ${entry.name}`,
          controllo: c.nome,
          widget: c.widget,
          tipoDichiarato,
          effetto: prima !== dopo ? "sì" : "no",
          nota,
        });
      }

      scriviEsiti(entry.id, esiti);
    });
  }

  test.afterAll(() => {
    // Il riepilogo lo produce `node scripts/controls-riepilogo.mjs`.
  });
});
