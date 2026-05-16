# MANIFEST: @heuresys/ui Extracted

**Data Estrazione**: 2026-05-16  
**Sorgente**: `D:\evo.heuresys.com\packages\ui`  
**Target**: `D:\ux-design-shared\ui`  
**Stato**: ✅ Completo (no rimozioni da sorgente)

## Contenuti Estratti

### Codice Sorgente
- ✅ `src/` — Full source tree
  - `components/` — 99 file .tsx (51 componenti + cartelle tematiche + stubs)
  - `lib/` — Utility (cn, oklch, parsers, i18n helpers)
  - `styles/` — Global CSS, Tailwind presets, token framework
  - `index.ts` — 347 export statement

### Configurazione
- ✅ `package.json` — dipendenze complete (30+ lib specializzate)
- ✅ `tsconfig.json` — TypeScript strict mode
- ✅ `vitest.config.ts` — Test runner config
- ✅ `README.md` — Scope e convenzioni originali
- ✅ `public/` — Assets (icone, ecc.)

### Root Files
- ✅ `.prettierignore` — Prettier config
- ✅ `.gitignore` — Git ignore patterns
- ✅ `package.json` (root) — Workspace orchestration
- ✅ `SETUP.md` — Quick start guide
- ✅ `MANIFEST.md` — Questo file

## Dipendenze (30 lib)

### Tier 0: Base (Radix + Tailwind)
- @radix-ui/* (17 lib, ~80KB)
- tailwindcss 4.2.4
- class-variance-authority
- clsx, tailwind-merge
- framer-motion

### Tier 1: Data Viz
- d3 7.9, echarts 6.0, recharts 3.8
- cytoscape 3.33, reactflow 11.11
- three.js + @react-three/*

### Tier 2: Forms
- react-hook-form, zod
- @hookform/resolvers
- react-international-phone

### Tier 3: Interaction
- @dnd-kit (core + sortable)
- react-grid-layout
- @tanstack/react-table
- @tanstack/react-virtual

### Tier 4: Content
- react-markdown, remark-*, rehype-*
- mermaid, shiki
- katex, jsqr, papaparse, exceljs

### Tier 5: AI & Utility
- ai (Vercel SDK)
- canvas-confetti, lottie-react
- date-fns, signature_pad

## Verifica Integrità

```bash
# Check source files
find ui/src/components -type f -name "*.tsx" | wc -l
# Expected: ~99 (51 componenti + sub-dirs)

# Check exports in index.ts
grep -c "^export" ui/src/index.ts
# Expected: ~347

# Check dependencies resolved
cd ui && npm list --depth=0 2>/dev/null | tail -20
```

## Prossimi Passi (Opzionali)

1. **Git Init**
   ```bash
   cd D:\ux-design-shared
   git init
   git add .
   git commit -m "chore: extract @heuresys/ui library"
   ```

2. **NPM Install & Test**
   ```bash
   npm install
   npm run typecheck
   npm run test
   npm run storybook  # Verify stories work
   ```

3. **NPM Publish (futuro)**
   ```bash
   npm version 1.0.0  # Update version
   npm publish --access public  # o private registry
   ```

4. **Sync Strategy**
   - Monitora heuresys-evo `packages/ui` per aggiornamenti
   - Merge periodici di bug fix/feature (ogni 2-4 settimane)
   - Tag version per tracking stability

## Esclusioni Intenzionali

❌ **Non estratto**:
- `services/app/src/components/widgets/brand/*` — Brand-specific widgets (dipendono da heuresys-evo context)
- `services/app/src/lib/data/*` — Data fetching queries (tenant-scoped)
- heuresys-evo `node_modules/` — Ricreati via `npm install`
- heuresys-evo `.git/` — Nuovo repo

## Note di Manutenzione

- **Reverse dependency**: `ux-design-shared` deve rimanere **self-contained**, senza import da `services/*`
- **Version lock**: `package-lock.json` va committato per garantire coerenza
- **Type safety**: TypeScript 6.0.3 (strict mode) — aggiornamenti con cautela

---

**Status**: ✅ Ready for distribution / npm publish / shared development  
**Support**: Sincronizzare con heuresys-evo su demand
