import { expect, type FrameLocator, type Page } from "@playwright/test";
import { readStoryErrorUi } from "./error-ui";

/**
 * Driver della UI manager di Storybook — la vetrina come la usa una persona.
 *
 * PERCHE' SERVE. Lo smoke test carica `iframe.html?id=…` direttamente: verifica
 * che una story monti, e nient'altro. Non tocca la sidebar, non espande i
 * gruppi, non clicca le voci, non guarda il tema, non prova i Controls. I
 * difetti che Enzo ha trovato scorrendo la vetrina a mano vivono tutti fuori da
 * quel caso — voci che compaiono in lista e non mostrano nulla, un tema scuro
 * che non si vede. Questo modulo apre la porta a quella verifica.
 *
 * STRUTTURA DELLA SIDEBAR, misurata il 2026-09-04 su Storybook 10.3.6:
 * l'albero e' `#storybook-explorer-tree`; ogni voce e' un `[data-item-id]` con
 * un `data-nodetype` fra `root` (i 19 gruppi di primo livello), `component`,
 * `story` e `document` (le pagine di documentazione). L'attributo
 * `aria-expanded` NON sta sul contenitore ma sul `button` che vi sta dentro —
 * cercarlo sul `[data-item-id]` non trova niente, ed e' la trappola in cui si
 * cade scrivendo questo codice a intuito.
 */

/** Le voci foglia: quelle che, cliccate, mostrano qualcosa nella canvas. */
export const LEAF_NODETYPES = ["story", "document"] as const;

export type SidebarLeaf = {
  /** L'id di Storybook, confrontabile con le chiavi di `index.json`. */
  id: string;
  /** L'etichetta visibile nella sidebar. */
  label: string;
  /** `story` oppure `document` (pagina di documentazione). */
  nodetype: string;
};

export type CanvasState = {
  /** Figli del contenitore di rendering: 0 significa "non ha montato nulla". */
  childCount: number;
  /** Vero se Storybook mostra la propria pagina d'errore. */
  hasErrorUi: boolean;
  /** Il messaggio d'errore reale, quando c'e'. */
  errorText: string | null;
  /** Area visibile in pixel: 0 puo' essere legittimo, va confrontato con l'elenco delle eccezioni. */
  visibleArea: number;
  /** Lunghezza del testo renderizzato, utile a distinguere un vuoto da un contenuto. */
  textLength: number;
};

/** Apre la vetrina e attende che l'albero sia pronto. */
export async function openManager(page: Page): Promise<void> {
  await page.goto("/");
  await expect(page.locator("#storybook-explorer-tree")).toBeVisible({ timeout: 30_000 });
  // Almeno una foglia presente: l'albero puo' esistere vuoto per un istante.
  await expect(page.locator('[data-item-id][data-nodetype="story"]').first()).toBeAttached({
    timeout: 30_000,
  });
}

/**
 * Espande ogni nodo collassato, fino a punto fisso.
 *
 * Un passaggio solo non basta: aprire un gruppo puo' rivelare sottogruppi
 * ancora chiusi. Si cicla finche' un giro intero non apre piu' nulla; la
 * guardia anti-loop e' proprio quella, non un contatore arbitrario.
 *
 * Ritorna quanti nodi ha aperto. Se al termine restano nodi chiusi, lancia con
 * il loro elenco: un gruppo che si rifiuta di aprirsi e' gia' un difetto della
 * vetrina, e passarci sopra in silenzio nasconderebbe tutte le voci che
 * contiene.
 */
export async function expandAllGroups(page: Page): Promise<number> {
  // Solo i bottoni DENTRO una voce dell'albero: la barra di ricerca e il
  // filtro portano anche loro un aria-expanded, e non sono gruppi.
  const collapsed = '[data-item-id] > button[aria-expanded="false"], [data-item-id] button[aria-expanded="false"]';
  let opened = 0;

  for (;;) {
    const buttons = page.locator(collapsed);
    const count = await buttons.count();
    if (count === 0) break;

    let openedThisPass = 0;
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(0); // sempre il primo: la lista si riduce a ogni click
      if ((await btn.count()) === 0) break;
      try {
        await btn.click({ timeout: 5_000 });
        openedThisPass++;
        opened++;
      } catch {
        // Un bottone che non si lascia cliccare viene ricontato al giro dopo;
        // se resta chiuso finira' nell'elenco dell'errore finale.
        break;
      }
    }

    // Punto fisso: un giro che non apre nulla significa che i rimanenti non si
    // aprono affatto. Uscire qui evita di ciclare per sempre.
    if (openedThisPass === 0) break;
  }

  const stillClosed = await page.locator(collapsed).evaluateAll((els) =>
    els.map((el) => {
      const host = el.closest("[data-item-id]");
      return host?.getAttribute("data-item-id") ?? (el.textContent || "").trim().slice(0, 40);
    }),
  );

  if (stillClosed.length > 0) {
    throw new Error(
      `${stillClosed.length} nodi della sidebar sono rimasti chiusi e nascondono le voci che contengono:\n  - ${stillClosed.join("\n  - ")}`,
    );
  }

  return opened;
}

/**
 * Ogni voce foglia della sidebar.
 *
 * Non ricostruisce il percorso dei gruppi risalendo il DOM: la sidebar di
 * Storybook e' una lista piatta con rientri visivi, quindi il "percorso" li'
 * dentro sarebbe un'inferenza. Il percorso vero e' il `title` dell'indice, e
 * chi ne ha bisogno lo prende da `index.json` incrociando l'`id` — che e'
 * anche il confronto che il test di questo modulo esegue.
 */
export async function listSidebarLeaves(page: Page): Promise<SidebarLeaf[]> {
  return page.locator("[data-item-id][data-nodetype]").evaluateAll(
    (els, leafTypes) =>
      els
        .filter((el) => leafTypes.includes(el.getAttribute("data-nodetype") ?? ""))
        .map((el) => ({
          id: el.getAttribute("data-item-id") ?? "",
          // "Skip to content" e' un'ancora di servizio annidata nella prima
          // voce: va tolta o l'etichetta risulta sporca.
          label: (el.textContent || "").replace(/Skip to content/g, "").trim(),
          nodetype: el.getAttribute("data-nodetype") ?? "",
        }))
        .filter((leaf) => leaf.id !== ""),
    [...LEAF_NODETYPES] as string[],
  );
}

/** La iframe in cui la vetrina disegna la voce selezionata. */
export function canvas(page: Page): FrameLocator {
  return page.frameLocator("#storybook-preview-iframe");
}

/**
 * Cosa mostra la canvas in questo momento.
 *
 * `hasErrorUi` interroga `.sb-nopreview` / `.sb-errordisplay`, che vivono
 * FUORI da `#storybook-root` — vedi `error-ui.ts` per la misura. Cercare
 * l'errore dentro il contenitore di rendering non troverebbe mai nulla.
 */
export async function canvasState(page: Page, isDocs = false): Promise<CanvasState> {
  const frame = canvas(page);
  const rootSelector = isDocs ? "#storybook-docs" : "#storybook-root";
  const root = frame.locator(rootSelector);

  const childCount = await root.locator(":scope > *").count().catch(() => 0);
  const { hasErrorUi, errorText } = await readStoryErrorUi(frame);

  const box = await root.boundingBox().catch(() => null);
  const visibleArea = box ? Math.round(box.width * box.height) : 0;

  const textLength = await root
    .innerText()
    .then((t) => t.trim().length)
    .catch(() => 0);

  return { childCount, hasErrorUi, errorText, visibleArea, textLength };
}

/**
 * Clicca una voce nella sidebar, come farebbe una persona.
 *
 * Deliberatamente NON naviga per URL: la navigazione via interfaccia e' il
 * gesto in cui i difetti riportati sono nati, e un `page.goto` la scavalcherebbe
 * insieme al difetto.
 */
export async function clickLeaf(page: Page, id: string): Promise<void> {
  const item = page.locator(`[data-item-id="${id}"]`).first();
  await item.scrollIntoViewIfNeeded();
  await item.click();
}
