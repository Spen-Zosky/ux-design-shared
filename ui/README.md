# @heuresys/ui

Design system condiviso — componenti React, theme token, preset Tailwind, Storybook.
**Pubblicato su npm**: `pnpm add @heuresys/ui` (oggi 0.1.9).

## Consumer attuali

Il pacchetto è consumato come dipendenza npm normale, **non** più via protocollo `link:`
né via workspace di un monorepo (quel modello apparteneva a `heuresys-evo`, dove questo
codice viveva come `packages/ui` accanto a `services/marketing|app|playground`; quei
service non esistono più come consumer).

| Consumer | Repo | Cosa usa |
|---|---|---|
| `apps/web` | `Spen-Zosky/heuresys-advanced` | admin SPA + portale ESS: primitive, `DataTable`, `DashboardShell`, form, `./charts` |
| `apps/showcase` | `Spen-Zosky/heuresys-advanced` | sito vetrina statico (GitHub Pages): brand, landing, icone |

Regola vincolante lato consumer: **nessun componente riusabile nasce in `heuresys-advanced`**.
Se serve una primitiva, nasce qui e arriva da npm; in `apps/web` restano solo le composizioni
tenant/RBAC-specifiche.

## Scope

- Componenti UI riusabili tra i consumer sopra
- Wrapper sulle primitive Radix UI + variant system (`class-variance-authority`)
- Theme token (colori, spacing, typography) e preset Tailwind 4
- Icone (re-export `lucide-react`)
- Storybook come unica vetrina dei componenti

## Stack

- TypeScript + React 19 — React è **peer dependency** (`react`, `react-dom`, `@types/react`,
  `@types/react-dom`): il consumer porta la sua istanza. Dichiararlo come `dependency`
  produceva due React nel grafo e il crash `createContext is not a function` in SSR.
- Radix UI + Tailwind 4 + `class-variance-authority` + `clsx`
- Build `tsup` → `dist/` (ESM + CJS + d.ts)
- Storybook (`npm run storybook`)

## Subpath exports

`.` (barrel) · `./charts` (d3/echarts/recharts) · `./markdown` · `./styles` ·
`./brand/candidates` · `./assets/brand/*`

I subpath non sono cosmetici: importare `@heuresys/ui/charts` invece del barrel tiene fuori
dal bundle del consumer l'intero albero di data-viz quando non serve.

## Convenzioni

- Componenti **stateless** quando possibile; lo stato vive nei consumer
- Ogni componente ha una `.stories.tsx` in Storybook
- API stabile: breaking change → bump major + ADR in `governance/`
- Nessun import dai repo consumer (dipendenza inversa vietata)

## Rilascio

L'ordine conta: `npm run build` → `npm version` → `npm publish` → **`git push origin main`**.
Un publish senza push lascia npm avanti rispetto a GitHub e rende la release non ispezionabile
(è successo con 0.1.8 e 0.1.9, recuperate nel S1030). Procedura completa: `../SETUP.md`.
