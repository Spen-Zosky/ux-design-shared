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

/**
 * Le regole che parlano della composizione di UN documento, disattivate sulle
 * sole pagine di documentazione. La ragione sta accanto a `disableRules`.
 */
const REGOLE_DI_COMPOSIZIONE = [
  "landmark-unique",
  "landmark-no-duplicate-banner",
  "landmark-no-duplicate-main",
  "landmark-no-duplicate-contentinfo",
  "landmark-banner-is-top-level",
  "landmark-main-is-top-level",
  "landmark-complementary-is-top-level",
  "heading-order",
  "page-has-heading-one",
  /**
   * `scrollable-region-focusable` riguarda `.docs-story`, il riquadro che
   * Storybook mette attorno a ogni esempio nella pagina di documentazione:
   * quando l'esempio e' piu' largo del riquadro, quel contenitore diventa
   * scorrevole e la regola chiede che sia raggiungibile da tastiera. Il
   * contenitore non e' nostro e non compare in nessuna applicazione — nella
   * story, dove il componente sta da solo, la regola resta attiva.
   */
  "scrollable-region-focusable",
];

/**
 * Il cancello: le gravita' che fanno fallire la suite.
 *
 * `critical` e `serious` sono la soglia proposta il 2026-09-05 e approvata da
 * Enzo. `moderate` e `minor` restano contate ma non bloccanti: sono in larga
 * parte rifiniture, e un cancello che le includesse verrebbe abbassato alla
 * prima corsa rossa — che e' il modo in cui i cancelli muoiono.
 */
const GRAVITA_BLOCCANTI = new Set(["critical", "serious"]);

type Violazione = {
  id: string;
  voce: string;
  tema: "chiaro" | "scuro";
  regola: string;
  gravita: string;
  descrizione: string;
  nodi: number;
  /**
   * I nodi coinvolti, non il loro solo conteggio.
   *
   * La prima versione salvava `nodi: v.nodes.length` e basta: bastava a
   * CONTARE il debito, che era lo scopo dell'inventario, ma non a correggerlo
   * — davanti a 52 `listitem` non si sa quale elemento in quale componente. E
   * i file grezzi non sono in git (`test-results/` e' ignorato), quindi la
   * misura del 2026-09-05 non e' piu' interrogabile: si rigenera. Qui la si
   * rigenera una volta sola, gia' utile alla correzione.
   *
   * `html` e' troncato e i nodi sono al massimo 8 per violazione: serve a
   * riconoscere il punto nel sorgente, non a ricostruire la pagina.
   */
  nodiDettaglio: {
    target: string;
    html: string;
    /**
     * I due colori e il rapporto, quando la regola e' `color-contrast`.
     *
     * axe li conosce gia': ha letto i colori calcolati dal browser, compositing
     * delle trasparenze incluso, e sa quale soglia si applica a quel corpo e a
     * quel peso di carattere. Senza questi campi una proposta sui colori
     * sarebbe fatta a occhio sui token, e i token non dicono su che sfondo
     * finiscono davvero.
     */
    contrasto?: {
      testo: string;
      sfondo: string;
      rapporto: number;
      atteso: number;
      corpo: string;
      peso: string;
    };
  }[];
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

        /**
         * Aspetta che le animazioni FINISCANO, invece di sperare in un
         * ritardo fisso.
         *
         * axe legge i colori nell'istante in cui gira: un testo a meta'
         * dissolvenza risulta sotto soglia pur essendo perfettamente leggibile
         * un attimo dopo. Misurato su `Components/Motion`, dove le voci
         * segnalate erano proprio quelle con `delay 0.4s` e `delay 0.5s` —
         * cioe' le ultime a entrare.
         *
         * `getAnimations()` vede sia le animazioni CSS sia quelle della Web
         * Animations API, che e' cio' che usa framer-motion. Le animazioni
         * infinite non finiscono mai per definizione: si escludono, e per loro
         * vale il tetto di due secondi.
         */
        await page
          .waitForFunction(
            () =>
              document
                .getAnimations()
                .filter((a) => {
                  const durata = (a.effect?.getTiming().iterations ?? 1) as number;
                  return Number.isFinite(durata);
                })
                .every((a) => a.playState !== "running"),
            undefined,
            { timeout: 2_000 },
          )
          .catch(() => {
            /* Oltre i due secondi si misura com'e': un'animazione lunga non
               deve fermare l'inventario. */
          });

        const risultato = await new AxeBuilder({ page })
          .include(isDocs ? "#storybook-docs" : "#storybook-root")
          /**
           * La tabella delle prop non e' codice nostro.
           *
           * `.docblock-argstable` la genera Storybook, e per gli argomenti di
           * tipo oggetto usa `react-editable-json-tree`, che rende `<li>` fuori
           * da qualunque lista: da sola valeva **52 violazioni `listitem`**,
           * l'11,8% dell'inventario del 2026-09-05, su codice che non e' in
           * questo repository e che nessuna correzione qui puo' toccare.
           * Misurarla significava tenere il cancello rosso per un difetto di
           * una dipendenza.
           *
           * Si esclude il blocco, non la regola: un `<li>` fuori posto in un
           * nostro componente continua a fallire.
           */
          .exclude(".docblock-argstable")
          /**
           * Le regole di COMPOSIZIONE non si applicano a una pagina che
           * compone.
           *
           * Una pagina di documentazione rende piu' story una sotto l'altra,
           * quindi mette nello stesso documento due `<main>`, due `<header>`,
           * due `<nav>` e una scaletta di titoli che nessuna applicazione
           * reale produrrebbe mai. `landmark-*` e `heading-order` misurano
           * proprio l'unicita' e l'ordine dentro UN documento: applicarle qui
           * significa misurare un artefatto della vetrina.
           *
           * Non e' un sospetto: delle 54 violazioni rimaste al 2026-09-06,
           * **54 su 54 stanno su voci `Docs` e zero sulle story** — misurato.
           * Sulle story le stesse regole restano attive, ed e' li' che hanno
           * significato: un componente con due banner e' un difetto vero.
           */
          .disableRules(isDocs ? REGOLE_DI_COMPOSIZIONE : [])
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
            nodiDettaglio: v.nodes.slice(0, 8).map((n) => {
              const dati = n.any.find((c) => c.id === "color-contrast")?.data as
                | {
                    fgColor?: string;
                    bgColor?: string;
                    contrastRatio?: number;
                    expectedContrastRatio?: string;
                    fontSize?: string;
                    fontWeight?: string;
                  }
                | undefined;
              return {
                target: n.target.join(" "),
                html: n.html.length > 240 ? `${n.html.slice(0, 240)}…` : n.html,
                ...(dati?.contrastRatio != null
                  ? {
                      contrasto: {
                        testo: dati.fgColor ?? "?",
                        sfondo: dati.bgColor ?? "?",
                        rapporto: dati.contrastRatio,
                        atteso: parseFloat(String(dati.expectedContrastRatio ?? "4.5")),
                        corpo: dati.fontSize ?? "?",
                        peso: dati.fontWeight ?? "?",
                      },
                    }
                  : {}),
              };
            }),
          });
        }
      }

      fs.mkdirSync(OUT_DIR, { recursive: true });
      fs.writeFileSync(path.join(OUT_DIR, `${entry.id}.json`), JSON.stringify(raccolte, null, 2));

      /**
       * IL CANCELLO.
       *
       * L'inventario si scrive PRIMA di questa riga, sempre: anche una corsa
       * rossa lascia i dati completi da interrogare, che e' esattamente cio'
       * che serve per capire perche' e' rossa.
       *
       * Fino al 2026-09-06 questo file non faceva fallire niente — misurava e
       * basta, come `addon-a11y` con `rules: []`. Aveva ragione di essere
       * cosi': con 441 violazioni un cancello acceso avrebbe reso la suite
       * rossa in permanenza, e nessuno avrebbe piu' distinto una regressione
       * nuova da un debito vecchio. Ora il debito bloccante e' zero, e ogni
       * rosso significa qualcosa.
       */
      const bloccanti = raccolte.filter((v) => GRAVITA_BLOCCANTI.has(v.gravita));
      if (bloccanti.length > 0) {
        const elenco = bloccanti
          .map(
            (v) =>
              `  [${v.gravita}] ${v.regola} — tema ${v.tema}, ${v.nodi} elemento/i\n` +
              `    ${v.descrizione}\n` +
              (v.nodiDettaglio[0] ? `    primo: ${v.nodiDettaglio[0].target}\n` : ""),
          )
          .join("");
        throw new Error(
          `${bloccanti.length} violazione/i critical o serious in «${entry.title} › ${entry.name}»:\n${elenco}` +
            `\nL'inventario completo di questa voce e' in ${path.join(OUT_DIR, `${entry.id}.json`)}.\n` +
            `Per il quadro d'insieme: node scripts/a11y-riepilogo.mjs --per-file`,
        );
      }
    });
  }

  test.afterAll(() => {
    // Il riepilogo lo produce `node scripts/a11y-riepilogo.mjs`, che legge i
    // file per voce: qui non c'è più stato condiviso da stampare.
  });
});
