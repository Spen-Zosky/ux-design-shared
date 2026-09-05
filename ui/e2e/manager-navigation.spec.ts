import fs from "node:fs";
import { test, expect } from "@playwright/test";
import { STORY_INDEX_FILE } from "./global-setup";
import {
  openManager,
  expandAllGroups,
  listSidebarLeaves,
  canvasState,
  clickLeaf,
} from "./lib/manager";

/**
 * La sidebar deve mostrare esattamente ciò che l'indice dichiara.
 *
 * È il primo controllo che il piano chiede, e non è pignoleria: una voce
 * presente nell'indice ma assente dalla sidebar è invisibile a chiunque usi la
 * vetrina — c'è, ma nessuno la trova. Una presente nella sidebar e assente
 * dall'indice è l'opposto: una voce che i test automatici non guardano mai.
 */

type IndexEntry = { id: string; title: string; name: string; type?: string };

const indexed: IndexEntry[] = JSON.parse(fs.readFileSync(STORY_INDEX_FILE, "utf-8"));

test.describe("navigazione della UI manager", () => {
  // Espandere 127 nodi e leggere l'albero intero è lento, e questo file è un
  // banco di prova, non una corsa di velocità.
  test.setTimeout(180_000);

  test("ogni nodo della sidebar si apre, e l'albero combacia con l'indice", async ({ page }) => {
    await openManager(page);

    const opened = await expandAllGroups(page);
    expect(opened, "nessun nodo da espandere: la sidebar non si è caricata come previsto").toBeGreaterThan(0);

    const leaves = await listSidebarLeaves(page);
    const inSidebar = new Set(leaves.map((l) => l.id));
    const inIndex = new Set(indexed.map((e) => e.id));

    const soloIndice = [...inIndex].filter((id) => !inSidebar.has(id));
    const soloSidebar = [...inSidebar].filter((id) => !inIndex.has(id));

    // I due elenchi entrano nel messaggio per intero: un conteggio da solo
    // costringerebbe a rifare l'indagine a mano.
    expect(
      soloIndice,
      `${soloIndice.length} voci sono nell'indice ma NON compaiono nella sidebar (invisibili a chi usa la vetrina):\n  - ${soloIndice.join("\n  - ")}`,
    ).toEqual([]);

    expect(
      soloSidebar,
      `${soloSidebar.length} voci sono nella sidebar ma NON nell'indice (nessun test automatico le guarda):\n  - ${soloSidebar.join("\n  - ")}`,
    ).toEqual([]);
  });

  test("cliccare una voce dalla sidebar la seleziona e riempie la canvas", async ({ page }) => {
    await openManager(page);
    await expandAllGroups(page);

    // Una story e una pagina di documentazione: i due casi rendono in
    // contenitori diversi, e il driver deve saperli distinguere entrambi.
    const story = indexed.find((e) => (e.type ?? "story") === "story");
    const docs = indexed.find((e) => e.type === "docs");
    expect(story, "nessuna story nell'indice").toBeTruthy();

    for (const entry of [story, docs].filter(Boolean) as IndexEntry[]) {
      const isDocs = entry.type === "docs";
      await clickLeaf(page, entry.id);

      // Se cliccare non seleziona, la navigazione è rotta a prescindere da
      // cosa poi si disegni.
      await expect(
        page.locator(`[data-item-id="${entry.id}"]`).first(),
        `cliccare "${entry.title} › ${entry.name}" non l'ha selezionata nella sidebar`,
      ).toHaveAttribute("data-selected", "true", { timeout: 15_000 });

      await expect
        .poll(async () => (await canvasState(page, isDocs)).childCount, {
          message: `"${entry.title} › ${entry.name}" non ha disegnato nulla nella canvas`,
          timeout: 20_000,
        })
        .toBeGreaterThan(0);

      const state = await canvasState(page, isDocs);
      expect(
        state.hasErrorUi,
        `"${entry.title} › ${entry.name}" mostra la pagina d'errore di Storybook: ${state.errorText}`,
      ).toBe(false);
    }
  });
});
