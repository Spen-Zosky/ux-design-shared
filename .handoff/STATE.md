# Stato — ux-design-shared

## Ultima sessione (2026-09-05)

Eseguito per intero il ciclo di audit QA e hardening: la vetrina è stata verificata voce per
voce nei due temi, i difetti diagnosticati sono stati corretti, e la libreria è stata
pubblicata e adottata dal consumer. Il tema scuro che non si vedeva aveva una causa precisa
— nessuno dipingeva la superficie di rendering — ed è chiusa. Restano due debiti misurati e
non affrontati, entrambi cicli a sé.

## Priorità

1. **Correzione di massa dell'accessibilità** — 441 violazioni inventariate (76 critical,
   269 serious), con il piano già scritto: partire da `KanbanBoard`, che da solo ne raccoglie
   32, e dalle pagine di documentazione. Il cancello axe si accende **solo alla fine**, quando
   il numero da difendere è zero. Riferimento:
   `docs/superpowers/reference/2026-09-05-inventario-accessibilita.md`. Effort: alto.
2. **I 95 controlli inerti** — comandi che la vetrina espone e che, cambiati, non producono
   effetto: quasi sempre story con un `render:` proprio che ignora gli args. Tre strade per
   ciascuno (far usare gli args, nascondere il controllo, dichiararlo), da scegliere caso per
   caso. Riferimento: `2026-09-05-inventario-controls.md`. Effort: medio.
3. **I 4 orfani pubblici** — `GroupToggle`, `esco-tree-navigator`, `kg-graph-canvas`,
   `sap-sync-panel`: esportati dal barrel, senza story, senza un solo utilizzatore nei
   consumer. Proposti e non rimossi. Riferimento: `2026-09-04-struttura-design-system.md`.
   Effort: basso, ma serve una decisione di Enzo.

## Domande aperte

1. **Che fine fanno i 4 orfani?** Toglierli dal barrel mantenendo i file (reversibile, la mia
   raccomandazione), dare loro una story, o cancellarli. Tre dei quattro nomi suggeriscono
   lavoro di dominio: solo Enzo sa se sono in corso o residui.
2. **Quando si accende il cancello a11y?** La soglia proposta è `critical` + `serious`.
   Accesa oggi renderebbe la suite rossa in permanenza: va accesa dopo la correzione di massa,
   non prima.

## Verifica

```bash
cd ui
pnpm install --frozen-lockfile
pnpm run typecheck        # atteso: pulito
pnpm run test             # atteso: 119/119
pnpm run build            # atteso: pulita; poi `git checkout -- ui/dist` (è tracciato)
pnpm run build-storybook  # atteso: 504 voci (380 story + 124 docs)
SB_STATIC=1 pnpm run test:e2e   # regressione, ~9 min, atteso 507/507
SB_STATIC=1 pnpm run test:audit # i 4 audit completi, ~88 min: solo quando serve
```

Misurato il 2026-09-05 su `main` `a88cefa`: typecheck pulito, Vitest 119/119, `test:e2e`
507/507 in 9,0 min. `@heuresys/ui` è a **1.1.0** in `package.json` e sul registry.

## Note

- **`pnpm` non funziona in Git Bash** su questa macchina: corepack risolve un path mangled e
  muore. Solo PowerShell. Costa tempo scoprirlo da capo.
- **La suite gira contro la vetrina statica** (`SB_STATIC=1`), non contro il dev server: è ciò
  che ha eliminato la flakiness. E `storybook build` riparte sempre da zero, perché la cache
  non invalidata produceva una vetrina con 25 story in meno, in silenzio.
- Il contratto in `heuresys-advanced` è stato applicato e mergiato (PR #81), e quel progetto
  usa la 1.1.0. **Non si scrive su quel repo** se non su istruzione esplicita di Enzo.
