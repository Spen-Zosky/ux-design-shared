/**
 * 1.7.2 — le variabili di colore della libreria sono sempre colori completi.
 *
 * Il difetto: `applyPalette` scriveva su <html> le `--palette-1..4` come terne HSL nude
 * («222 80% 50%»), mentre il foglio di stile le dà in esadecimale. In tema scuro vince
 * `.dark … !important` e non si vedeva niente; in chiaro restava la terna, che non è un colore:
 * `bg-palette-*`, `text-palette-*` e ogni `var(--palette-*)` diventavano trasparenti o neri
 * (grafici ECharts, icone, barre, organigramma nei consumatori).
 *
 * La regola unica, che queste prove fanno rispettare: **ogni variabile di colore, scritta dal
 * foglio di stile o dal codice, è un esadecimale `#RRGGBB`**, e nessun sorgente la avvolge in
 * `hsl(var(--x))` o `hsl(${…})`. Si usa diretta (`var(--x)`) o con `color-mix()` per l'alfa.
 *
 * Qui si prova in jsdom la forma dei valori; la resa nel browser vero, nei due temi e per le
 * quattro tavolozze, sta in `tavolozza-browser.test.ts`.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { afterEach, describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';

import { PALETTES, PaletteDropdown, applyPalette, type PaletteIdx } from '../dashboard/PaletteDropdown';

const ESADECIMALE = /^#[0-9A-F]{6}$/;
const SRC = join(__dirname, '..', '..');
const TEMA = readFileSync(join(SRC, 'styles', 'theme-heuresys.css'), 'utf8');

/** Le dichiarazioni `--nome: valore` del primo blocco che si apre con `selettore {`. */
function dichiarazioni(selettore: string): Map<string, string> {
  const inizio = TEMA.indexOf(`\n${selettore} {`);
  expect(inizio, `blocco ${selettore} nel tema`).toBeGreaterThan(-1);
  const fine = TEMA.indexOf('\n}', inizio);
  const corpo = TEMA.slice(inizio, fine).replace(/\/\*[\s\S]*?\*\//g, '');
  const out = new Map<string, string>();
  for (const m of corpo.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    out.set(m[1]!, m[2]!.replace(/\s*!important\s*$/, '').trim());
  }
  return out;
}

/** Variabili che non sono colori, dichiarate negli stessi blocchi. */
const NON_COLORI = new Set(['--theme-mode']);

afterEach(() => {
  document.documentElement.removeAttribute('style');
  window.localStorage.clear();
});

describe('applyPalette — scrive colori completi, per le quattro tavolozze', () => {
  for (const [i, p] of PALETTES.entries()) {
    it(`tavolozza ${i} «${p.name}»: --palette-1..4 su <html> sono esadecimali`, () => {
      applyPalette(i as PaletteIdx);
      const st = document.documentElement.style;
      for (let n = 1; n <= 4; n++) {
        const v = st.getPropertyValue(`--palette-${n}`).trim();
        expect(v, `--palette-${n}`).toMatch(ESADECIMALE);
        expect(v).toBe(p.vars[n - 1]);
      }
    });
  }

  it('i valori di PALETTES sono esadecimali (niente terne nude nei dati esportati)', () => {
    for (const p of PALETTES) for (const v of p.vars) expect(v, p.name).toMatch(ESADECIMALE);
  });

  it('i campioni del menu usano il colore così com’è, senza avvolgerlo in hsl()', () => {
    render(<PaletteDropdown />);
    fireEvent.click(screen.getByRole('button', { name: /palette/i }));
    const opzioni = screen.getAllByRole('option');
    expect(opzioni).toHaveLength(PALETTES.length);
    opzioni.forEach((o, i) => {
      const campioni = [...o.querySelectorAll<HTMLElement>('span[style]')];
      expect(campioni.map((c) => c.getAttribute('style'))).toEqual(
        // jsdom riscrive il colore in rgb(): si confronta con la stessa forma.
        PALETTES[i]!.vars.map((v) => {
          const n = (k: number) => parseInt(v.slice(k, k + 2), 16);
          return `background: rgb(${n(1)}, ${n(3)}, ${n(5)});`;
        }),
      );
    });
  });
});

describe('theme-heuresys.css — ogni variabile di colore, nei due temi, è un esadecimale', () => {
  for (const sel of [':root', '.dark']) {
    it(`blocco ${sel}`, () => {
      const d = dichiarazioni(sel);
      expect(d.size).toBeGreaterThan(10);
      const storte = [...d].filter(([k, v]) => !NON_COLORI.has(k) && !ESADECIMALE.test(v));
      expect(storte).toEqual([]);
    });
  }

  it('il tema scuro ridefinisce le stesse --palette-* che applyPalette scrive', () => {
    const dark = dichiarazioni('.dark');
    const root = dichiarazioni(':root');
    for (let n = 1; n <= 4; n++) {
      expect(root.get(`--palette-${n}`)).toMatch(ESADECIMALE);
      expect(dark.get(`--palette-${n}`)).toMatch(ESADECIMALE);
    }
  });

  it('la mappa @theme inline passa le variabili così come sono (var(--x), senza involucri)', () => {
    const inizio = TEMA.indexOf('@theme inline {');
    const corpo = TEMA.slice(inizio, TEMA.indexOf('\n}', inizio)).replace(/\/\*[\s\S]*?\*\//g, '');
    const colori = [...corpo.matchAll(/(--color-[a-z0-9-]+)\s*:\s*([^;]+);/g)];
    expect(colori.length).toBeGreaterThan(20);
    for (const [, k, v] of colori) expect(v!.trim(), k).toMatch(/^var\(--[a-z0-9-]+\)$/);
  });
});

describe('sorgenti della libreria — nessuna variabile di colore in forma mista', () => {
  function sorgenti(dir: string): string[] {
    return readdirSync(dir).flatMap((nome) => {
      const p = join(dir, nome);
      if (statSync(p).isDirectory()) return nome === '__tests__' ? [] : sorgenti(p);
      return /\.(tsx?|css)$/.test(nome) ? [p] : [];
    });
  }
  /** Il codice senza i commenti: le spiegazioni del difetto citano la forma vietata apposta. */
  const senzaCommenti = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:"'`])\/\/.*$/gm, '$1');

  it('niente hsl(var(--x)), rgb(var(--x)) né hsl(${…}) nel codice', () => {
    const vietate = /(?:hsla?|rgba?)\(\s*(?:var\(--|\$\{)/;
    const trovate = sorgenti(SRC)
      .filter((f) => vietate.test(senzaCommenti(readFileSync(f, 'utf8'))))
      .map((f) => relative(SRC, f));
    expect(trovate).toEqual([]);
  });

  it('niente terne HSL nude scritte come valore («222 80% 50%»)', () => {
    const terna = /["'`]\s*-?\d{1,3}(?:\.\d+)?(?:deg)?\s+\d{1,3}(?:\.\d+)?%\s+\d{1,3}(?:\.\d+)?%\s*(?:\/\s*[\d.]+%?\s*)?["'`]/;
    const trovate = sorgenti(SRC)
      .filter((f) => terna.test(senzaCommenti(readFileSync(f, 'utf8'))))
      .map((f) => relative(SRC, f));
    expect(trovate).toEqual([]);
  });
});
