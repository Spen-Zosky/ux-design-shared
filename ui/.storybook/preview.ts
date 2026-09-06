import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { initialize, mswLoader } from "msw-storybook-addon";
// Un solo entry CSS: base della libreria + tema di marca, uniti in preview.css.
// Vedi il commento in quel file: separarli lascerebbe Tailwind cieco ai token
// e le utility di superficie non verrebbero generate affatto.
import "./preview.css";

// Use a page-relative SW URL so MSW works both at the root in dev
// (http://localhost:6006/) and under a subpath in deploy
// (https://spen-zosky.github.io/ux-design-shared/). Without this the SW
// would default to /mockServiceWorker.js, which doesn't exist on Pages.
initialize({
  onUnhandledRequest: "bypass",
  serviceWorker: { url: "./mockServiceWorker.js" },
});

const preview: Preview = {
  parameters: {
    // `backgrounds` RIMOSSO deliberatamente (2026-09-04). Dichiarava tre valori
    // hardcoded (#ffffff, #0a0a0a, #fafaf7) e `default: "light"`, ma misurato
    // con una sonda Playwright non dipingeva nulla: configurazione morta, e per
    // giunta cieca ai token di marca — quei tre esadecimali non sono nessuno
    // dei nostri `--background`. La superficie ora la governa il tema, che e'
    // l'unica fonte di verita': vedi la regola su html/body in preview.css.
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
      expanded: true,
    },
    /**
     * Il pannello di accessibilita', da decorativo a severo.
     *
     * `config: { rules: [] }` non disattivava niente — non e' una lista di
     * esclusioni, e' una lista VUOTA di sovrascritture — ma nemmeno faceva
     * fallire alcunche': l'addon mostrava i suoi risultati e chi guardava la
     * vetrina poteva ignorarli. Il cancello vero vive in `e2e/qa-a11y.spec.ts`,
     * dove una violazione critical o serious rompe la suite; qui si allinea il
     * pannello a quella stessa soglia, perche' chi sviluppa la veda subito e
     * non scopra il rosso solo in CI.
     *
     * `test: "error"` marca le violazioni come errori nel pannello. Le regole
     * di composizione restano attive qui: nella barra degli strumenti si guarda
     * una story alla volta, non la pagina di documentazione che ne compone
     * molte, quindi non producono i falsi positivi che la suite deve escludere.
     */
    a11y: {
      test: "error",
      config: { rules: [] },
    },
    options: {
      storySort: {
        // MISURATO il 2026-09-04: l'ordine precedente elencava tre gruppi che
        // NON ESISTONO — "Welcome", "Foundations", "Recipes" — e non nominava
        // nessuno dei gruppi reali tranne "Components". Il risultato era una
        // sidebar ordinata di fatto a caso, che e' una delle ragioni per cui la
        // vetrina risultava poco leggibile.
        //
        // L'ordine qui sotto va dal generale al particolare, come lo leggerebbe
        // qualcuno che scopre il design system: prima l'identita' di marca, poi
        // il guscio di pagina, poi i mattoni, poi i domini specialistici, e in
        // fondo gli strumenti. Il "*" finale raccoglie qualunque gruppo nuovo
        // senza farlo sparire in cima.
        order: [
          "Brand",
          "Layout",
          "Components",
          "Forms",
          "Charts",
          "Dashboard",
          "Markdown",
          "Files",
          "Media",
          "Collab",
          "AI",
          "I18n",
          "A11y",
          "Utility",
          "Marketing",
          "XR",
          "Devtools",
          "*",
        ],
      },
    },
    layout: "padded",
  },
  loaders: [mswLoader],
  decorators: [
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
    }),
  ],
  tags: ["autodocs"],
};

export default preview;
