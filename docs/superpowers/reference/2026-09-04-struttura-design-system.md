# Struttura del design system — censimento del 2026-09-04

**Validità della misura: 2026-09-04**, su `main` dopo il merge delle tre PR del ciclo e le
correzioni B1–B8. Ogni conteggio qui sotto porta la propria data e il proprio **perimetro**: senza
il perimetro un numero non è verificabile, ed è la ragione per cui tre documenti di questo repository
sembravano contraddirsi (vedi in fondo).

Si rigenera con gli script indicati sotto ciascuna tabella.

---

## I numeri di oggi

| Voce | Oggi | Il censimento del 2026-09-03 diceva |
|---|---|---|
| File di componente in `ui/src/components/` (esclusi story, test, `index.ts`) | **136** | 120 |
| Con una story omonima | **124** | 93 |
| Senza story | **12** | 27 |
| Voci nell'indice di Storybook | **504** (380 story + 124 pagine docs) | — |
| Gruppi di primo livello nella sidebar | **17** | 19 prima di B8 |

Il censimento precedente non era sbagliato quando è stato scritto: le tre PR del ciclo hanno
aggiunto componenti e, soprattutto, story. La sua tabella «Priorità 1 — usati in produzione, senza
story (23)» è però **interamente superata**: tutte e 23 quelle voci hanno oggi una story.

## Esportati pubblicamente ma senza story — invisibili nella vetrina

Sono componenti che un consumatore può importare, ma che nessuno può vedere prima di usarli.

| Componente | Usato in `heuresys-advanced` | Usato in `heuresys-datastore` |
|---|---|---|
| `components/dashboard/GroupToggle.tsx` | no | no |
| `components/esco-tree-navigator.tsx` | no | no |
| `components/kg-graph-canvas.tsx` | no | no |
| `components/sap-sync-panel.tsx` | no | no |

*Misurato con grep del nome esportato su `apps/**` di entrambi i consumatori, esclusi `node_modules`
e il bundle statico `ux-design/heuresys_uxix_brand_identity_bundle_v1/code_examples`, che è materiale
di riferimento e non codice in esecuzione.*

Il piano d'origine ne segnalava **uno** (`GroupToggle`). Sono quattro, e nessuno ha un solo
utilizzatore reale.

**Proposta a Enzo, non eseguita** — le rimozioni non le faccio di mia iniziativa:

1. **Rimuoverli dal barrel pubblico** (`src/index.ts`) mantenendo i file. Riduce la superficie che
   dobbiamo garantire ai consumatori senza distruggere nulla. È la mossa reversibile.
2. **Oppure dare loro una story**, se sono destinati a essere usati e semplicemente non lo sono
   ancora. Tre dei quattro nomi (`esco-tree-navigator`, `kg-graph-canvas`, `sap-sync-panel`)
   suggeriscono funzioni di dominio molto specifiche: solo tu sai se sono lavoro in corso o residui.
3. **Cancellarli** è la terza strada, e la sconsiglio finché non è chiaro a quale delle due sopra
   appartengano.

## Componenti senza story che NON sono un problema

Otto file, tutti legittimi: `ThemeBuilderWizard/{export,presets,types}.ts` (non sono componenti),
`i18n/locale-formatters.ts` (utilità pura) e i quattro `brand/candidates/LogoCandidate{A,B,C,D}.tsx`,
che sono varianti di studio consumate dalle story del gruppo Brand.

## Duplicazioni per funzione, non per nome

**Due renderer di breadcrumb, entrambi pubblici.**

| | `Breadcrumbs` | `HeaderBreadcrumbTrail` |
|---|---|---|
| File | `components/breadcrumbs.tsx` | `components/dashboard/header/breadcrumb-trail.tsx` |
| Righe | 114 | 58 |
| Separatore | configurabile | `/` fisso |
| Collasso a ellissi | sì, oltre `maxItems` | no |

Il consolidamento del 2026-09-03 ha unificato il **tipo** (`BreadcrumbItem`) ma non
l'implementazione, e ha promosso ad API pubblica il secondo renderer — il più debole — senza che
nessuno dei due rimandasse all'altro. **Corretto in questo ciclo**: entrambi i file ora dichiarano
l'esistenza dell'altro e quando usare quale. Resta aperta la domanda se debbano restare due.

## I conteggi che sembravano contraddirsi

Il piano segnalava «tre documenti danno tre conteggi incompatibili per l'uso di StatusPill
(33+1 / 54 / 57+37+1)». Misurato oggi, non è una contraddizione ma **tre perimetri diversi mai
dichiarati**:

| Fonte | Numero | Perimetro reale |
|---|---|---|
| censimento 2026-09-03 | 33 | solo `apps/web/src` |
| nota di promozione | 54 | usi, non file |
| story `status-pill.stories.tsx` | 57 file, 37 che lo renderizzano | tutto `apps/**` escluso il bundle statico |
| **misura di oggi** | **58 file** in heuresys-advanced, **1** in heuresys-datastore | tutto `apps/**`, esclusi `node_modules` |

L'affermazione contenuta nella story — «il componente più usato di tutto il design system» — **regge
alla verifica**: 58 file oggi contro i 57 dichiarati il 2026-09-03. Il piano la dava per smentita;
non lo è.

**Regola adottata da qui in avanti**: ogni documento che contiene conteggi porta la data di validità
**e il perimetro di misura**, oppure il conteggio si genera da script. Un numero senza data invecchia
in silenzio; un numero senza perimetro non è nemmeno confrontabile.

## Affermazioni datate, corrette in questo ciclo

- `DashboardShell.stories.tsx` annunciava il gruppo `Header/` come qualcosa che «arriverà da un piano
  separato», mentre esisteva con 17 voci. Corretto.
- `DashboardHeader.tsx` rimandava al gruppo `Header/`, che dopo B8 non esiste più come gruppo di
  primo livello. Corretto in `Layout/Header/`.
- I piani e gli spec del 2026-09-03 contengono riferimenti al vecchio gruppo `Header/` e conteggi
  dell'epoca. **Non sono stati toccati**: sono documenti storici, datati, che registrano cosa si
  pensava allora. Riscriverli falsificherebbe la cronologia invece di correggerla.

## Cosa questo censimento NON copre

- L'uso dei componenti **dentro** la libreria stessa (un componente può essere non esportato e non
  avere story pur essendo usato da altri componenti).
- I componenti esportati **come tipo** soltanto.
- La qualità delle story esistenti: qui si conta la loro esistenza. Che mostrino qualcosa di utile è
  oggetto dell'audit A2/A3/A4.
