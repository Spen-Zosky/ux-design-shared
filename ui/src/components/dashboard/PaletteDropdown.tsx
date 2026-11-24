"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Palette dropdown listbox — canonical implementation.
 * Spec: docs/06_header_specification.md § "Interactive specification — palette switcher".
 *
 * 4 ratified presets. Active palette colors written to `--palette-1..4`
 * on `<html>` via inline style. Selection persisted in localStorage.
 *
 * 1.7.2 — i valori sono esadecimali `#RRGGBB`, come nel foglio di stile (`theme-heuresys.css`).
 * Fino alla 1.7.1 erano terne HSL nude («222 80% 50%»): in tema chiaro restavano su <html> e
 * `bg-palette-*`, `text-palette-*` e ogni `var(--palette-*)` non erano più un colore. La regola è
 * una sola per tutta la libreria: una variabile di colore è un colore completo, si usa diretta
 * (`var(--x)`) o con `color-mix()` per la trasparenza, mai dentro `hsl(var(--x))`.
 * I valori sono la conversione esatta delle terne ratificate in ADR-0005, riportate a fianco.
 */

export type PaletteIdx = 0 | 1 | 2 | 3;

export type PalettePreset = {
  readonly name: string;
  /** Colori completi `#RRGGBB` per palette-1..4 (fino alla 1.7.1 erano terne HSL nude). */
  readonly vars: readonly [string, string, string, string];
};

export const PALETTES: readonly PalettePreset[] = [
  // hsl: 222 80% 50% · 188 75% 45% · 262 65% 60% · 38 90% 55%
  // eslint-disable-next-line no-restricted-syntax -- dati della tavolozza ratificata: sono la fonte dei token --palette-*, non un colore di componente
  { name: "Default · balanced", vars: ["#1957E6", "#1DB2C9", "#8757DB", "#F4A825"] },
  // hsl: 178 75% 42% · 195 85% 48% · 215 85% 55% · 245 78% 60%
  // eslint-disable-next-line no-restricted-syntax -- dati della tavolozza ratificata: sono la fonte dei token --palette-*, non un colore di componente
  { name: "Cool ocean",         vars: ["#1BBBB6", "#12AEE2", "#2B7CEE", "#5749E9"] },
  // hsl: 0 80% 55% · 22 92% 55% · 38 90% 55% · 52 92% 60%
  // eslint-disable-next-line no-restricted-syntax -- dati della tavolozza ratificata: sono la fonte dei token --palette-*, non un colore di componente
  { name: "Warm sunset",        vars: ["#E83030", "#F67023", "#F4A825", "#F7DE3B"] },
  // hsl: 221 83% 35% · 221 75% 48% · 221 65% 60% · 221 55% 72%
  // eslint-disable-next-line no-restricted-syntax -- dati della tavolozza ratificata: sono la fonte dei token --palette-*, non un colore di componente
  { name: "Brand mono",         vars: ["#0F3EA3", "#1F59D6", "#5781DB", "#90A9DF"] },
] as const;

const STORAGE_KEY = "heuresys-palette";

export function applyPalette(idx: PaletteIdx) {
  const p = PALETTES[idx];
  if (!p) return;
  const html = document.documentElement;
  p.vars.forEach((value, i) => html.style.setProperty(`--palette-${i + 1}`, value));
}

function readSavedIdx(): PaletteIdx {
  if (typeof window === "undefined") return 0;
  const raw = parseInt(window.localStorage.getItem(STORAGE_KEY) || "0", 10);
  if (!Number.isFinite(raw) || raw < 0 || raw >= PALETTES.length) return 0;
  return raw as PaletteIdx;
}

/*
 * Una sola scelta per tutta la pagina (1.7.0). La tavolozza può comparire due volte (barra e
 * cassetto del telefono): con uno stato per istanza, scelta la terza nel cassetto, la copia
 * nella barra segnava ancora la prima. Le istanze leggono tutte da qui.
 */
const listeners = new Set<() => void>();
let currentIdx: PaletteIdx | null = null;

function getIdx(): PaletteIdx {
  if (currentIdx === null) currentIdx = readSavedIdx();
  return currentIdx;
}

function setSharedIdx(next: PaletteIdx) {
  currentIdx = next;
  applyPalette(next);
  try {
    window.localStorage.setItem(STORAGE_KEY, String(next));
  } catch {
    // Archivio del browser non disponibile: la scelta vale per la pagina aperta.
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

/** Testi e posizione del menu, tutti opzionali: i default sono quelli storici. */
export interface PaletteDropdownProps {
  /** Nome accessibile del pulsante. Default "Cambia palette accent (apri menu)". */
  label?: string;
  /** Nome accessibile dell'elenco. Default "Palette disponibili". */
  listLabel?: string;
  /** Intestazione visibile del menu. Default "Accent palette". */
  heading?: string;
  /** Prefisso degli id (`<prefisso>-trigger`, `<prefisso>-menu`). Default "js-palette": va
   *  cambiato quando nella pagina ce n'è un secondo, come nel cassetto del telefono. */
  idPrefix?: string;
  /** Lato a cui si allinea il menu. Default `end` (bordo destro del pulsante). */
  align?: 'start' | 'end';
}

export function PaletteDropdown({
  label = "Cambia palette accent (apri menu)",
  listLabel = "Palette disponibili",
  heading = "Accent palette",
  idPrefix = "js-palette",
  align = "end",
}: PaletteDropdownProps = {}) {
  const [open, setOpen] = useState(false);
  const idx = useSyncExternalStore(subscribe, getIdx, () => 0 as PaletteIdx);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyPalette(getIdx());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function selectPalette(next: PaletteIdx) {
    setSharedIdx(next);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative" data-palette-menu-root>
      <button
        id={`${idPrefix}-trigger`}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${idPrefix}-menu`}
        aria-label={label}
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        className="inline-flex h-9 items-center gap-1.5 rounded-control border border-border px-2 transition hover:bg-accent hover:border-foreground/30"
      >
        {/* Static class names so Tailwind v4 source-scan picks them up
            (template literal `bg-palette-${n}` is not resolvable at build time). */}
        <span className="flex gap-0.5">
          <span className="h-4 w-4 rounded-sm bg-palette-1" />
          <span className="h-4 w-4 rounded-sm bg-palette-2" />
          <span className="h-4 w-4 rounded-sm bg-palette-3" />
          <span className="h-4 w-4 rounded-sm bg-palette-4" />
        </span>
        <svg data-palette-chevron className="h-3.5 w-3.5 text-muted-foreground transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        id={`${idPrefix}-menu`}
        role="listbox"
        aria-label={listLabel}
        hidden={!open}
        className={`absolute ${align === "start" ? "left-0" : "right-0"} top-full z-50 mt-1.5 w-64 overflow-hidden rounded-card border border-border bg-card shadow-card`}
      >
        <div className="border-b border-border bg-muted/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {heading}
        </div>
        <ul className="py-1">
          {PALETTES.map((p, i) => {
            const selected = i === idx;
            return (
              <li key={p.name}>
                <button
                  role="option"
                  type="button"
                  aria-selected={selected}
                  onClick={() => selectPalette(i as PaletteIdx)}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-accent"
                >
                  <span className="flex gap-0.5 shrink-0">
                    {p.vars.map((v, k) => (
                      <span key={k} className="h-4 w-4 rounded-sm" style={{ background: v }} />
                    ))}
                  </span>
                  <span className="min-w-0 flex-1 text-xs font-medium text-foreground">{p.name}</span>
                  <svg className={`h-3.5 w-3.5 shrink-0 text-primary ${selected ? "" : "hidden"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
