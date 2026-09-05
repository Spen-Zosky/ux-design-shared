import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { STORY_INDEX_FILE } from "./global-setup";

/**
 * Inventario axe su ogni voce, nei due temi.
 *
 * PRIMA SI MISURA. Il task chiede esplicitamente di non correggere in questa
 * fase: `addon-a11y` è installato e configurato con `rules: []`, cioè compare
 * nella barra degli strumenti ma non fa fallire niente — decorativo. Prima di
 * trasformarlo in un cancello serve sapere quanto è alto il muro, altrimenti la
 * soglia la si sceglie a caso e poi la si abbassa alla prima corsa rossa.
 *
 * Questo file NON fallisce sulle violazioni: le raccoglie e le scrive in
 * `test-results/a11y-inventario.json`, da cui nasce il rapporto per Enzo con la
 * proposta di soglia. Fallisce solo se axe non riesce proprio a girare — quello
 * sì è un difetto del banco di prova.
 *
 * Nota sulla versione: `jest-axe`, usato dai test unitari, si porta dietro
 * axe-core 3.5.6, di diverse major indietro. Qui si usa `@axe-core/playwright`
 * 4.13, quindi i due strumenti possono legittimamente contare regole diverse.
 */

type IndexEntry = { id: string; title: string; name: string; type?: string };

const entries: IndexEntry[] = JSON.parse(fs.readFileSync(STORY_INDEX_FILE, "utf-8"));

/**
 * Un file per voce, invece di un elenco in memoria.
 *
 * La prima versione accumulava tutto in un array e lo scriveva in `afterAll`,
 * il che costringeva a `mode: "serial"` — e in serial un fallimento SALTA i test
 * successivi: la corsa si è fermata su XR/ThreeScene e ha lasciato 7 voci non
 * esaminate. Un audit che dichiara di non escludere nulla non può perdere pezzi
 * per un timeout altrui. Con un file per voce i test tornano indipendenti e
 * paralleli, e l'aggregazione la fa `scripts/a11y-riepilogo.mjs`.
 */
const OUT_DIR = path.join("test-results", "a11y");

type Violazione = {
  id: string;
  voce: string;
  tema: "chiaro" | "scuro";
  regola: string;
  gravita: string;
  descrizione: string;
  nodi: number;
};

test.describe("inventario di accessibilità @audit", () => {

  for (const entry of entries) {
    const isDocs = (entry.type ?? "story") === "docs";

    test(`${entry.title} › ${entry.name}`, async ({ page }) => {
      const raccolte: Violazione[] = [];
      const viewMode = isDocs ? "docs" : "story";
      await page.goto(`/iframe.html?id=${entry.id}&viewMode=${viewMode}`);

      const root = page.locator(isDocs ? "#storybook-docs" : "#storybook-root");
      await expect(root.locator(":scope > *")).not.toHaveCount(0, { timeout: 25_000 });

      for (const [tema, dark] of [
        ["chiaro", false],
        ["scuro", true],
      ] as const) {
        await page.evaluate((isDark) => {
          document.documentElement.classList.toggle("dark", isDark);
        }, dark);
        await page.waitForTimeout(200);

        const risultato = await new AxeBuilder({ page })
          .include(isDocs ? "#storybook-docs" : "#storybook-root")
          .analyze();

        for (const v of risultato.violations) {
          raccolte.push({
            id: entry.id,
            voce: `${entry.title} › ${entry.name}`,
            tema,
            regola: v.id,
            gravita: v.impact ?? "sconosciuta",
            descrizione: v.help,
            nodi: v.nodes.length,
          });
        }
      }

      fs.mkdirSync(OUT_DIR, { recursive: true });
      fs.writeFileSync(path.join(OUT_DIR, `${entry.id}.json`), JSON.stringify(raccolte, null, 2));
    });
  }

  test.afterAll(() => {
    // Il riepilogo lo produce `node scripts/a11y-riepilogo.mjs`, che legge i
    // file per voce: qui non c'è più stato condiviso da stampare.
  });
});
