import { defineConfig, devices } from "@playwright/test";

/**
 * Config Playwright per gli smoke test contro la vetrina Storybook.
 *
 * Storybook viene avviato in modalità dev (`storybook dev --ci`, senza
 * apertura browser) da Playwright stesso tramite `webServer`: se un'istanza
 * gira già su :6006 (dev locale, come oggi) viene riusata invece di aprirne
 * una seconda — `reuseExistingServer` è true fuori da CI.
 */
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
    baseURL: "http://localhost:6007",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
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
    // arguments for 'dev'". Stesso bug già trovato e fissato nel worktree
    // del piano Header (2026-09-03) — non ancora backportato su main, quindi
    // riappare qui in un worktree fresco. `pnpm exec` chiama il binario
    // direttamente, un solo livello di parsing shell.
    // Porta 6007 (non 6006): un altro worktree di questa stessa sessione
    // (piano Header) ha già un server Storybook attivo su 6006.
    command: "pnpm exec storybook dev -p 6007 --ci --quiet",
    url: "http://localhost:6007",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
