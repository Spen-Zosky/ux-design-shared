# Stato — ux-design-shared

## Ultima sessione (2026-09-04)

Chiuso il ciclo di riorganizzazione della vetrina Storybook: tre PR mergiate su main
(header consolidato, 17 componenti resi visibili, 4 decisioni architetturali). Enzo ha poi
scorso la vetrina a mano e trovato criticità diffuse, quindi il rilascio è stato fermato e
il lavoro successivo è stato messo a piano invece che eseguito.

## Priorità

1. **Audit QA di Storybook + hardening** — piano pronto ed eseguibile, da sessione fresca.
   `docs/superpowers/plans/2026-09-04-storybook-qa-audit-e-hardening.md`, **su main**.
   5 task di audit + 10 di correzione + 3 di rilascio.
   Ordine obbligato: **B1 prima di A3**. Effort: alto, ciclo dedicato.
2. **Rilascio 1.1.0** — task C2 del piano, dopo l'audit. `ui/package.json` è ancora a 1.0.0 e
   `ui/dist` (tracciato) non è stato rigenerato: le correzioni **non raggiungono i consumer**
   finché non si pubblica. Bloccato su credenziali, vedi domanda aperta 1.
3. **Contratto in heuresys-advanced** — testo pronto nel corpo della PR #7, da applicare
   nell'altro repo (riga 23 di `docs/architecture/brand-component-contract.md`).

## Domande aperte

1. **npm non è autenticato su questa macchina** (`npm whoami` → 401, nessun `.npmrc`, nessun
   `NPM_TOKEN`). La pubblicazione richiede un `npm login` fatto da Enzo: non delegabile.
2. **Il fix delle classi Tailwind interpolate va prima o dopo il merge?** Ormai mergiato: la
   PR #5 ha portato su main due componenti pubblici con `bg-${roleTone}/20`, classe che
   Tailwind non genera affatto (provato sul CSS compilato del consumer). Task B3.
3. **Tassonomia del guscio**: 10 story `Header/*` contro 3 `Layout/*` per la stessa famiglia.
   Task B8 chiede a Enzo dove deve stare prima di spostare.

## Verifica del baseline

```bash
cd ui
pnpm install --frozen-lockfile
pnpm run typecheck      # atteso: pulito
pnpm run test           # atteso: 116/116
pnpm run build          # atteso: pulito; poi `git checkout -- ui/dist` (è tracciato)
pnpm run test:e2e       # atteso: 380 story, ~379 verdi
```

Misurato il 2026-09-04 su main `633e50c`: typecheck pulito, Vitest 116/116, build pulita,
Playwright **379/380** — l'unico fallimento (`Components/Card › Default`) passa in 1,6s
rieseguito isolato con `--workers=1`. È flakiness da avvio a freddo, **sesta occorrenza** di
questa classe nel ciclo (Toast, ThreeScene, Accordion, LottiePlayer, Button+VideoPlayer,
Card): non è una regressione, ed è la ragione del task B6.

## Note

- Materiale d'avvio per la sessione fresca, con todo e artefatti di misura:
  `C:\Users\enzospenuso\Claude Desktop\storybook-qa-audit_20260904\AVVIA-QUI.md`
- Il browser in-app non registra il service worker di MSW: le story che ne dipendono vi
  appaiono rotte pur funzionando. Diagnosticare sempre con Playwright.
- Branch locali di lavoro da buttare: `integration-dryrun`, `fix-shell-decorator`,
  `verify-main`.
