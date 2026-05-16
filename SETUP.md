# Setup: @heuresys/ui Extracted Library

Questo è uno snapshot **standalone** della libreria `@heuresys/ui` estratto dal repo `heuresys-evo`.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run Storybook (vetrina componenti)
npm run storybook
# → http://localhost:6006

# 3. Run tests
npm run test

# 4. Type check
npm run typecheck
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
- `cytoscape` 3.33, `reactflow` 11.11

### Forms & Validation
- `react-hook-form` 7.74, `zod` 3.25

### Advanced
- `@dnd-kit/*` (drag & drop)
- `mermaid` 11.14, `react-markdown` 10.1
- `three.js` + `@react-three/fiber` (3D)
- `ai` 6.0 (Vercel AI, chatbot)

## Uso in Altro Progetto

Se vuoi usare `@heuresys/ui` in un altro repo:

**Opzione A: Local Development (npm workspaces)**
```bash
# Nel tuo repo root package.json
"workspaces": ["./node_modules/.heuresys-ui", "src/..."]

# Symlink locale
npm install ../../ux-design-shared/ui
```

**Opzione B: NPM Publish (futuro)**
```bash
# Quando pronto, publish a registry privato/pubblico
cd ui && npm publish --access public
# Poi: npm install @heuresys/ui
```

## Commands

| Command | Scopo |
|---------|-------|
| `npm run dev` | Storybook dev (HMR) |
| `npm run build-storybook` | Build statico Storybook |
| `npm run typecheck` | TypeScript type check |
| `npm run test` | Vitest unit tests |
| `npm run test:coverage` | Coverage report |
| `npm run clean` | Pulisci build artifacts |

## API Stability

- **Stable**: Button, Card, Dialog, TIER 1-6
- **Production**: Charts, Forms, i18n, Dashboard atomics
- **Experimental**: AI integration, 3D/XR

Breaking changes → Semantic versioning + changelog

## Accessibility

- WCAG 2.2 AA compliance (jest-axe audit)
- Storybook a11y addon (`npm run storybook`)

## Testing

- Vitest 4 (~95 unit tests)
- React Testing Library
- jest-axe (a11y)
- MSW (mocking)

## Troubleshooting

### `npm install` fallisce
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Storybook non parte
```bash
npm run clean
npm install
npm run dev
```

### Type errors dopo update
```bash
npm run typecheck
# Se fallisce, verifica TypeScript version (6.0.3 richiesta)
npm ls typescript
```

## Maintenance

- Sincronizza con heuresys-evo periodicamente per bug fix/feature
- Tracking: vedere `.CHANGELOG.md` (da creare)

---

**Fonte**: `D:\evo.heuresys.com\packages\ui` (maintained in heuresys-evo)  
**Last Extracted**: 2026-05-16  
**Version**: @heuresys/ui@0.0.0 (snapshot)
