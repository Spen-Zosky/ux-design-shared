// @vitest-environment node
/**
 * 1.7.2 — la tavolozza nel browser vero (Chromium di Playwright), nei due temi e per le quattro
 * tavolozze. jsdom non applica la cascata (`!important` del tema scuro contro lo stile in linea
 * su <html>) né sa dire se un colore è valido: qui lo dice il motore.
 *
 * La pagina carica `theme-heuresys.css` così com'è e, accanto, le stesse regole che Tailwind v4
 * genera per le utility della libreria con `@theme inline`: `bg-palette-N` diventa
 * `background-color: var(--palette-N)` e `bg-palette-N/12` diventa
 * `color-mix(in oklab, var(--palette-N) 12%, transparent)`. I valori di --palette-* li scrive la
 * vera `applyPalette`, su un <html> finto che ne raccoglie le chiamate.
 *
 * Per ogni tema, tavolozza e variabile si controlla che il colore risolto sia quello atteso
 * (in chiaro quello della tavolozza, in scuro quello del tema) e che l'uso con l'alfa dia un
 * colore e non il trasparente di una dichiarazione non valida. Le prove falliscono con la 1.7.1,
 * che scriveva terne HSL nude.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, it, expect } from 'vitest';
import { chromium, type Browser, type Page } from '@playwright/test';

import { PALETTES, applyPalette, type PaletteIdx } from '../dashboard/PaletteDropdown';

const TEMA = readFileSync(join(__dirname, '..', '..', 'styles', 'theme-heuresys.css'), 'utf8');

const UTILITY = [1, 2, 3, 4]
  .map(
    (n) => `
  #bg-${n} { background-color: var(--palette-${n}); }
  #text-${n} { color: var(--palette-${n}); }
  #alfa-${n} { background-color: color-mix(in oklab, var(--palette-${n}) 12%, transparent); }
  #ink-${n} { color: var(--palette-${n}-ink); }`,
  )
  .join('\n');

const CORPO = [1, 2, 3, 4]
  .map((n) => `<i id="bg-${n}"></i><i id="text-${n}">x</i><i id="alfa-${n}"></i><i id="ink-${n}">x</i>`)
  .join('');

/** Le chiamate di `applyPalette` su `document.documentElement.style`, raccolte in un oggetto. */
function scritteDa(idx: PaletteIdx): Record<string, string> {
  const scritte: Record<string, string> = {};
  const g = globalThis as { document?: unknown };
  const prima = g.document;
  g.document = { documentElement: { style: { setProperty: (k: string, v: string) => (scritte[k] = v) } } };
  try {
    applyPalette(idx);
  } finally {
    g.document = prima;
  }
  return scritte;
}

/** `#RRGGBB` → `rgb(r, g, b)`, la forma in cui il browser restituisce un colore calcolato. */
function rgb(esadecimale: string): string {
  const n = (i: number) => parseInt(esadecimale.slice(i, i + 2), 16);
  return `rgb(${n(1)}, ${n(3)}, ${n(5)})`;
}

/** Il valore di una variabile in un blocco del tema (`:root` o `.dark`). */
function delTema(selettore: string, nome: string): string {
  const inizio = TEMA.indexOf(`\n${selettore} {`);
  const corpo = TEMA.slice(inizio, TEMA.indexOf('\n}', inizio)).replace(/\/\*[\s\S]*?\*\//g, '');
  const m = new RegExp(`${nome}\\s*:\\s*([^;!]+)`).exec(corpo);
  return m![1]!.trim();
}

let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.setContent(`<!doctype html><html><head><style>${TEMA}\n${UTILITY}</style></head><body>${CORPO}</body></html>`);
}, 60_000);

afterAll(async () => {
  await browser?.close();
});

async function misura(tema: 'chiaro' | 'scuro', scritte: Record<string, string>) {
  return page.evaluate(
    ({ scuro, scritte }) => {
      const html = document.documentElement;
      html.removeAttribute('style');
      html.classList.toggle('dark', scuro);
      for (const [k, v] of Object.entries(scritte)) html.style.setProperty(k, v);
      const cs = (id: string) => getComputedStyle(document.getElementById(id)!);
      return [1, 2, 3, 4].map((n) => ({
        bg: cs(`bg-${n}`).backgroundColor,
        text: cs(`text-${n}`).color,
        alfa: cs(`alfa-${n}`).backgroundColor,
        ink: cs(`ink-${n}`).color,
      }));
    },
    { scuro: tema === 'scuro', scritte },
  );
}

describe('tavolozza nel browser — due temi × quattro tavolozze × quattro variabili', () => {
  for (const tema of ['chiaro', 'scuro'] as const) {
    for (const [i, p] of PALETTES.entries()) {
      it(`${tema}, tavolozza ${i} «${p.name}»`, async () => {
        const scritte = scritteDa(i as PaletteIdx);
        const righe = await misura(tema, scritte);
        righe.forEach((r, k) => {
          const n = k + 1;
          // In chiaro vale la tavolozza scelta; in scuro il tema la sovrascrive con !important.
          const atteso = rgb(tema === 'chiaro' ? scritte[`--palette-${n}`]! : delTema('.dark', `--palette-${n}`));
          expect(r.bg, `bg-palette-${n}`).toBe(atteso);
          expect(r.text, `text-palette-${n}`).toBe(atteso);
          // L'alfa di Tailwind (`/12`) dà un colore semitrasparente, non il trasparente puro.
          expect(r.alfa, `bg-palette-${n}/12`).not.toBe('rgba(0, 0, 0, 0)');
          expect(r.alfa, `bg-palette-${n}/12`).toMatch(/^(?:oklab|rgba|color)\(/);
          const ink = delTema(tema === 'chiaro' ? ':root' : '.dark', `--palette-${n}-ink`);
          expect(r.ink, `text-palette-${n}-ink`).toBe(rgb(ink));
        });
      });
    }
  }
});

describe('i colori delle tavolozze sono quelli ratificati in HSL (ADR-0005), a meno di 1/255', () => {
  const RATIFICATI = [
    ['222 80% 50%', '188 75% 45%', '262 65% 60%', '38 90% 55%'],
    ['178 75% 42%', '195 85% 48%', '215 85% 55%', '245 78% 60%'],
    ['0 80% 55%', '22 92% 55%', '38 90% 55%', '52 92% 60%'],
    ['221 83% 35%', '221 75% 48%', '221 65% 60%', '221 55% 72%'],
  ];
  it('conversione del browser contro i valori di PALETTES', async () => {
    const dalBrowser = await page.evaluate((terne) => {
      const el = document.createElement('i');
      document.body.appendChild(el);
      return terne.map((r) =>
        r.map((t) => {
          el.style.color = `hsl(${t})`;
          return getComputedStyle(el).color;
        }),
      );
    }, RATIFICATI);
    const canali = (s: string) => s.match(/\d+/g)!.map(Number);
    PALETTES.forEach((p, i) =>
      p.vars.forEach((v, k) => {
        const a = canali(rgb(v));
        const b = canali(dalBrowser[i]![k]!);
        a.forEach((c, j) => expect(Math.abs(c - b[j]!), `${p.name} ${k + 1}`).toBeLessThanOrEqual(1));
      }),
    );
  });
});
