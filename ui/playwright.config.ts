import { defineConfig, devices } from "@playwright/test";

/**
 * Config Playwright per gli smoke test contro la vetrina Storybook.
 *
 * Storybook viene avviato in modalità dev (`storybook dev --ci`, senza
 * apertura browser) da Playwright stesso tramite `webServer`: se un'istanza
 * gira già su :6006 (dev locale, come oggi) viene riusata invece di aprirne
 * una seconda — `reuseExistingServer` è true fuori da CI.
 */
/**
 * Due modi di servire la vetrina, scelti con una variabile d'ambiente.
 *
 * `SB_STATIC=1` fa girare la suite contro `storybook-static` invece che contro
 * il dev server. Non è una comodità: con `storybook dev` Vite compila i moduli
 * su richiesta, e sotto più worker quelle compilazioni si accavallano facendo
 * scadere story che non hanno alcun difetto — otto occorrenze misurate nello
 * stesso ciclo. Il build statico compila tutto in anticipo.
 *
 * Il confronto misurato sta in
 * docs/superpowers/reference/2026-09-04-prestazioni-vetrina.md.
 */
const STATIC = !!process.env.SB_STATIC;
const PORT = STATIC ? 6007 : 6006;

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["html", { open: "never" }], ["github"]] : "list",
  timeout: 30_000,
  // Default 5s: troppo stretto per componenti che caricano bundle pesanti
  // (three.js/@react-three/fiber) mentre più worker condividono lo stesso
  // dev server Vite — misurato su XR/ThreeScene, che passa in ~6s isolato
  // ma scade a 5s sotto carico (2026-09-03).
  expect: { timeout: 10_000 },

  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    /**
     * Misura a pagina ferma, non a meta' animazione.
     *
     * axe fotografa i colori nell'istante in cui gira: un testo che entra in
     * dissolvenza viene letto con l'opacita' che ha in quel millesimo, e
     * risulta sotto soglia pur essendo perfettamente leggibile un attimo dopo.
     * Misurato il 2026-09-06 su `Components/Motion` e `AI/ToolCallView`, dove
     * gli stessi elementi passavano o fallivano a seconda del momento.
     *
     * `globals.css` azzera animazioni e transizioni sotto
     * `prefers-reduced-motion: reduce`, quindi qui non si sopprime la
     * misurazione: si chiede alla pagina lo stato che essa stessa dichiara di
     * assumere per chi quelle animazioni non le vuole.
     *
     * Quando questa riga fu scritta, il 2026-09-06, era FALSA: quel blocco
     * stava in `tokens.css`, che nessuno importa, e non azzerava niente. E'
     * diventata vera il giorno dopo, spostandolo. Vale la pena ricordarlo: da
     * sola questa impostazione non basto' a fermare le animazioni nella misura,
     * ed e' il motivo per cui il test aspetta anche `getAnimations()`.
     */
    reducedMotion: "reduce",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    // NON "pnpm run storybook -- --ci --quiet": su Windows il "--" letterale
    // finisce passato come argomento reale a `storybook dev` (invece di
    // essere il separatore pnpm/npm), che poi si rifiuta con "too many
    // arguments for 'dev'". Mai esercitato finché il dev server era già
    // acceso a mano (reuseExistingServer lo bypassava) — scoperto avviando
    // il webServer da zero per la prima volta (2026-09-03). `pnpm exec`
    // chiama il binario direttamente, un solo livello di parsing shell.
    command: STATIC
      ? "node e2e/serve-static.mjs 6007"
      : "pnpm exec storybook dev -p 6006 --ci --quiet",
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
