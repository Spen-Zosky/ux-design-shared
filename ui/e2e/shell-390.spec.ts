import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Il guscio a 390 e a 1440 px (giro forense di heuresys-advanced del 2026-11-23, K03 e K04).
 *
 * Fino alla 1.6.0 a 390 px la barra in alto non si restringeva e usciva a destra insieme
 * alla pagina (tavolozza, tema e menu utente fuori dallo schermo), e il contenuto era una
 * `region` che conteneva il `<main>` della pagina. Qui si misura nel browser, perché jsdom
 * non ha layout: nessun elemento visibile oltre il bordo destro della finestra, e nessuna
 * violazione axe sui landmark.
 */

const STORY = "/iframe.html?id=layout-dashboard-shell-complete--telefono-390&viewMode=story";

for (const larghezza of [390, 1440]) {
  test(`guscio a ${larghezza} px: niente esce a destra, landmark al primo livello`, async ({ page }) => {
    await page.setViewportSize({ width: larghezza, height: 844 });
    await page.goto(STORY);
    await page.locator("header").waitFor();

    const misura = await page.evaluate(() => {
      const fuori = [...document.querySelectorAll("body *")]
        .filter((e) => e.getClientRects().length > 0 && e.getBoundingClientRect().right > window.innerWidth + 0.5)
        .map((e) => e.tagName.toLowerCase() + (e.id ? `#${e.id}` : ""));
      const header = document.querySelector("header") as HTMLElement;
      return { fuori, larghezzaHeader: header.scrollWidth, finestra: window.innerWidth };
    });
    expect(misura.fuori).toEqual([]);
    expect(misura.larghezzaHeader).toBeLessThanOrEqual(misura.finestra);

    // Il menu utente resta raggiungibile anche sul telefono.
    await expect(page.getByRole("button", { name: /Mariangela/ })).toBeVisible();

    const axe = await new AxeBuilder({ page })
      .withRules([
        "landmark-main-is-top-level",
        "landmark-one-main",
        "landmark-banner-is-top-level",
        "landmark-unique",
        "landmark-no-duplicate-main",
      ])
      .analyze();
    expect(axe.violations.map((v) => v.id)).toEqual([]);
  });
}

test("a 390 px lingua, tavolozza e tema stanno nel cassetto, e il menu della tavolozza ci sta dentro", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(STORY);
  await expect(page.locator("#js-palette-trigger")).toBeHidden();
  await page.locator("header button").first().click();
  await page.locator("#js-palette-drawer-trigger").click();
  const menu = await page.locator("#js-palette-drawer-menu").boundingBox();
  const cassetto = await page.getByRole("dialog").boundingBox();
  expect(menu && cassetto).toBeTruthy();
  expect(menu!.x + menu!.width).toBeLessThanOrEqual(cassetto!.x + cassetto!.width);
  await expect(page.locator("#js-theme-toggle-drawer")).toBeVisible();
});
