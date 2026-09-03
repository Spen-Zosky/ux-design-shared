# Setup: @heuresys/ui Extracted Library

Questo è uno snapshot **standalone** della libreria `@heuresys/ui` estratto dal repo `heuresys-evo`.

## Quick Start

```bash
# 1. Install dependencies — pnpm, non npm: il repo committa ui/pnpm-lock.yaml,
#    che è il grafo di dipendenze testato. `npm install` lo ignora e risolve
#    da solo i range aperti (es. storybook ^10.3.6 → può prendere 10.6.0),
#    che possono rompere in modo criptico (visto su Windows con
#    msw-storybook-addon + ERR_PACKAGE_PATH_NOT_EXPORTED).
cd ui
pnpm install --frozen-lockfile

# 2. Run Storybook (vetrina componenti)
pnpm run storybook
# → http://localhost:6006

# 3. Run tests
pnpm run test

# 4. Type check
pnpm run typecheck
```

## Struttura

```
ux-design-shared/
├── ui/
│   ├── src/
│   │   ├── components/          # 51 componenti UI (16 cartelle tematiche)
│   │   ├── lib/                 # Utility: cn, oklch, parsers
│   │   ├── styles/              # Global CSS, Tailwind presets
│   │   └── index.ts             # 347 export (entry point)
│   ├── package.json
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   └── README.md                # Scope originale
├── package.json                 # Root (workspace)
└── SETUP.md                     # Questo file
```

## Dipendenze Principali

### Primitivi UI (Radix)
- `@radix-ui/*` (17 headless component)
- `tailwindcss` 4.2.4
- `class-variance-authority` 0.7.1
- `framer-motion` 12.38.0

### Data Visualization
- `d3` 7.9, `echarts` 6.0, `recharts` 3.8
- `cytoscape` 3.33
- esposte anche via subpath `@heuresys/ui/charts`, così un consumer che non fa grafici non
  si porta dietro l'albero d3/echarts/recharts

### Forms & Validation
- `react-hook-form` 7.74, `zod` 3.25

### Advanced
- `@dnd-kit/*` (drag & drop)
- `mermaid` 11.14, `react-markdown` 10.1
- `three.js` + `@react-three/fiber` (3D)
- `ai` 6.0 (Vercel AI, chatbot)

## Uso in Altro Progetto

`@heuresys/ui` è **pubblicato su npm** e si consuma come una dipendenza qualsiasi. Il vecchio
modello a symlink (`npm install ../../ux-design-shared/ui`, protocollo `link:`) è **ritirato**
dalla migrazione X18: produceva due istanze di React nel grafo del consumer e rendeva il build
dipendente da un path assoluto della macchina.

```bash
# Nel repo consumer
pnpm add @heuresys/ui        # oggi: 1.0.0
```

Il consumer dichiara React di suo (`peerDependencies` qui: react, react-dom, @types/react,
@types/react-dom) e aggiunge il path di scansione Tailwind verso `node_modules/@heuresys/ui/dist`.

**Rilasciare una nuova versione** (l'ordine conta — un publish senza push lascia npm avanti
rispetto a GitHub, che è esattamente il buco chiuso nel S1030):

```bash
cd ui
npm run build                # tsup -> dist/
npm version patch|minor      # bump in ui/package.json
npm publish --access public
git push origin main         # <-- il sorgente della release DEVE seguire il publish
```

Poi nel consumer: bump della dipendenza + `pnpm install`.

**Subpath disponibili**: `.` (barrel), `./charts`, `./markdown`, `./styles`,
`./brand/candidates`, `./assets/brand/*`.

## Commands

| Command | Scopo |
|---------|-------|
| `pnpm run dev` | Storybook dev (HMR) |
| `pnpm run build-storybook` | Build statico Storybook |
| `pnpm run typecheck` | TypeScript type check |
| `pnpm run test` | Vitest unit tests |
| `pnpm run test:coverage` | Coverage report |
| `pnpm run clean` | Pulisci build artifacts |

## API Stability

- **Stable**: Button, Card, Dialog, TIER 1-6
- **Production**: Charts, Forms, i18n, Dashboard atomics
- **Experimental**: AI integration, 3D/XR

Breaking changes → Semantic versioning + changelog

## Accessibility

- WCAG 2.2 AA compliance (jest-axe audit)
- Storybook a11y addon (`pnpm run storybook`)

## Testing

- Vitest 4 (~95 unit tests)
- React Testing Library
- jest-axe (a11y)
- MSW (mocking)

## Troubleshooting

### `pnpm install` fallisce
```bash
pnpm store prune
rm -rf node_modules
pnpm install --frozen-lockfile
```

### Storybook non parte
```bash
pnpm run clean
rm -rf node_modules
pnpm install --frozen-lockfile
pnpm run dev
```
Se l'errore è `ERR_PACKAGE_PATH_NOT_EXPORTED` o simili su un pacchetto di
`node_modules`, quasi sempre significa che l'installazione non ha usato
`ui/pnpm-lock.yaml` (es. è stato lanciato `npm install` invece di `pnpm
install`, o esiste ancora un `package-lock.json` locale): cancella
`node_modules` e reinstalla con `pnpm install --frozen-lockfile`.

### Type errors dopo update
```bash
pnpm run typecheck
# Se fallisce, verifica TypeScript version (6.0.3 richiesta)
pnpm ls typescript
```

## Maintenance

- Sincronizza con heuresys-evo periodicamente per bug fix/feature
- Tracking: vedere `.CHANGELOG.md` (da creare)

---

**Fonte**: `D:\evo.heuresys.com\packages\ui` (maintained in heuresys-evo)  
**Last Extracted**: 2026-05-16  
**Version**: @heuresys/ui@1.0.0 (pubblicata su npm il 2026-08-26 — verifica sempre con `npm view @heuresys/ui version`, questo file non è la fonte di verità)
