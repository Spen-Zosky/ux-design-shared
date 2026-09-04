import { test, expect } from "@playwright/test";
import { readStoryErrorUi } from "./lib/error-ui";

/**
 * Cancello sul cancello.
 *
 * Lo smoke test si fida di `readStoryErrorUi` per spiegare i propri
 * fallimenti. Se un aggiornamento di Storybook spostasse la UI d'errore
 * altrove — cosa gia' accaduta, visto che non sta dentro `#storybook-root`
 * come verrebbe naturale supporre — la diagnosi tornerebbe muta **in
 * silenzio**: i test continuerebbero a passare, e ce ne accorgeremmo solo il
 * giorno di un guasto vero, cioe' nel momento peggiore.
 *
 * Questo test provoca l'errore apposta e pretende che la lettura funzioni.
 */
test("la UI d'errore di Storybook resta leggibile da dove la cerchiamo", async ({ page }) => {
  await page.goto("/iframe.html?id=non-esiste--affatto&viewMode=story");

  // Attesa su UN contenitore solo, non sul selettore combinato: entrambi gli
  // host esistono SEMPRE nel documento — `.sb-nopreview` sta a `display: none`
  // e `.sb-errordisplay` viene acceso all'occorrenza (misurato) — quindi un
  // `.sb-nopreview, .sb-errordisplay` risolve a due elementi e viola lo strict
  // mode di Playwright invece di attendere quello giusto.
  await expect(page.locator(".sb-errordisplay")).toBeVisible({ timeout: 15_000 });

  const { hasErrorUi, errorText, host } = await readStoryErrorUi(page);

  expect(hasErrorUi, "nessuno dei contenitori d'errore noti risulta visibile").toBe(true);
  expect(host, "il contenitore trovato non e' uno di quelli attesi").toBeTruthy();
  expect(
    errorText,
    "il contenitore d'errore e' visibile ma non restituisce testo: la diagnosi sarebbe vuota",
  ).toBeTruthy();

  // E il DOM deve confermare la premessa che rende necessario tutto questo:
  // la canvas resta vuota mentre l'errore vive fuori.
  await expect(page.locator("#storybook-root").locator(":scope > *")).toHaveCount(0);
});
