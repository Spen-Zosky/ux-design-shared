import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type FullConfig } from "@playwright/test";

/**
 * Legge l'indice delle story da Storybook (già avviato da `webServer` a
 * questo punto) e lo salva su disco come JSON, cosicché lo spec file possa
 * leggerlo in modo SINCRONO al momento dell'import e generare un test
 * Playwright per ciascuna story — pattern ufficiale per dataset scoperti a
 * runtime (vedi https://playwright.dev/docs/test-parameterize#generate-tests-in-a-loop).
 *
 * Perché non un unico test con un loop interno: con centinaia di story il
 * timeout per-test di Playwright (30s di default) si applicherebbe
 * all'INTERO ciclo, non alla singola story — misurato qui il 2026-09-03,
 * dove il test moriva a metà indice pur avendo già superato ~20 story valide.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const STORY_INDEX_FILE = path.join(__dirname, ".story-index.json");

type StoryIndexEntry = {
  id: string;
  type?: string;
  title: string;
  name: string;
};

type StoryIndex = {
  entries?: Record<string, StoryIndexEntry>;
  stories?: Record<string, StoryIndexEntry>;
};

async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use?.baseURL ?? "http://localhost:6006";
  const res = await fetch(`${baseURL}/index.json`);
  if (!res.ok) {
    throw new Error(`GET ${baseURL}/index.json → ${res.status} ${res.statusText}`);
  }
  const index = (await res.json()) as StoryIndex;
  const entries = Object.values(index.entries ?? index.stories ?? {});

  // Story E pagine di documentazione. Fino al 2026-09-04 qui si filtravano le
  // sole `story`, ed era corretto: le pagine docs NON ESISTEVANO, perche'
  // mancava `@storybook/addon-docs` e il `tags: ["autodocs"]` di preview.ts non
  // produceva nulla. Ora che l'addon c'e', l'indice porta 380 story piu' 124
  // pagine di documentazione, e lasciarle fuori vorrebbe dire non guardare un
  // quarto della vetrina.
  const stories = entries.filter((e) => {
    const type = e.type ?? "story";
    return type === "story" || type === "docs";
  });

  if (stories.length === 0) {
    throw new Error("index.json non contiene nessuna voce: controllo bloccato prima di partire");
  }

  fs.writeFileSync(STORY_INDEX_FILE, JSON.stringify(stories, null, 2));

  await waitUntilReallyReady(baseURL);
}

/**
 * Cancello di prontezza: non lasciar partire i worker finche' Storybook non
 * renderizza davvero.
 *
 * PERCHE'. `index.json` risponde molto prima che la vetrina sappia disegnare:
 * a quel punto Vite deve ancora compilare i moduli su richiesta e il service
 * worker di MSW non e' registrato. I worker partivano tutti insieme contro un
 * server ancora freddo, e le prime story pagavano il conto — un giro a freddo
 * costa 15,1 minuti contro i 5,0 a caldo, con fallimenti sparsi che non erano
 * regressioni.
 *
 * OTTO OCCORRENZE MISURATE nello stesso ciclo — Toast, ThreeScene, Accordion,
 * LottiePlayer, Button+VideoPlayer, Card, AppShell, di nuovo VideoPlayer —
 * ognuna curata alzando un timeout, cioe' curando il sintomo. Questo cancello
 * paga UNA volta il riscaldamento, prima che i test comincino a contare.
 *
 * Il service worker e' un prerequisito duro, non un accessorio: se non si
 * registra, ogni story resta su uno spinner infinito, comprese quelle che non
 * intercettano nessuna richiesta.
 */
async function waitUntilReallyReady(baseURL: string): Promise<void> {
  const SENTINEL = "components-statuspill--all-tones";
  const DEADLINE_MS = 120_000;
  const started = Date.now();

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(`${baseURL}/iframe.html?id=${SENTINEL}&viewMode=story`, {
      waitUntil: "load",
      timeout: DEADLINE_MS,
    });

    // 1. La story rende davvero: non basta che la pagina risponda.
    await page.waitForSelector("#storybook-root > *", { timeout: DEADLINE_MS });

    // 2. Il service worker di MSW e' registrato E attivo. `ready` si risolve
    //    solo quando il controllo e' effettivo, che e' la condizione da cui
    //    dipendono le story, non la semplice presenza di una registrazione.
    const swOk = await page
      .evaluate(async () => {
        if (!("serviceWorker" in navigator)) return "assente: navigator.serviceWorker non esiste";
        const reg = await Promise.race([
          navigator.serviceWorker.ready.then(() => "ok"),
          new Promise<string>((r) => setTimeout(() => r("scaduto: nessun SW attivo"), 30_000)),
        ]);
        return reg;
      })
      .catch((e: unknown) => `errore: ${String(e)}`);

    if (swOk !== "ok") {
      throw new Error(
        `Cancello di prontezza: il service worker di MSW non risulta attivo (${swOk}).\n` +
          "Ogni story dipende da questa registrazione: proseguire produrrebbe una suite\n" +
          "di fallimenti che sembrano difetti dei componenti e non lo sono.",
      );
    }

    // eslint-disable-next-line no-console
    console.log(
      `[global-setup] vetrina pronta in ${((Date.now() - started) / 1000).toFixed(1)}s ` +
        `(${storiesInIndex()} voci nell'indice: story piu' pagine di documentazione)`,
    );
  } finally {
    await browser.close();
  }
}

function storiesInIndex(): number {
  try {
    return JSON.parse(fs.readFileSync(STORY_INDEX_FILE, "utf-8")).length;
  } catch {
    return -1;
  }
}

export default globalSetup;
