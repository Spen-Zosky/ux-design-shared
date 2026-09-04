# Ciclo di esecuzione — audit QA + hardening, ordine deciso

**Aperto**: 2026-09-04 · **Mandato di Enzo**: «devi farle tutte, decidi tu l'ordine migliore».

Il *cosa* sta in `2026-09-04-storybook-qa-audit-e-hardening.md`, che resta la fonte di verità
per il contenuto di ogni task. Questo file governa il **quando** e tiene lo **stato per riga**.

---

## Confine di sessione — dichiarato all'inizio

Il ciclo è **più grande di una sessione**. 15 task del piano più igiene git e un intervento in un
altro repository. Questa sessione arriva fin dove arriva; lo stato si legge da questa tabella e da
nessun altro posto. Non verrà mai lasciato credere che la fine sia vicina quando non lo è.

Misure all'apertura: contesto **8,3%** (917k residui su 1M). Finestra 5 ore **NON MISURATA** — dato
stantio di 167 minuti, la riga di stato non gira. Un ramo su due è cieco.

---

## L'ordine, e perché è diverso da «A poi B»

Il piano d'origine dice Parte A (audit) → Parte B (correzioni) → Parte C (rilascio), con **una**
eccezione già ammessa: B1 prima di A3. Quella eccezione non è un caso isolato: è un criterio, e
applicato per intero sposta altri quattro task.

| Perché anticipare | Task | Se restasse dopo l'audit |
|---|---|---|
| L'audit non vedrebbe altro che quella causa | **B1** | A3 fallirebbe su tutte le voci per un solo motivo già noto |
| L'audit asserisce contrasto AA nel tema scuro | **B4** | A3 produrrebbe 9 file di rossi già diagnosticati e già misurati |
| L'audit gira 380 voci dalla UI reale | **B6** | il giro a freddo costa 15,1 min contro 5,0, e genera falsi rossi da classificare a mano uno per uno (sesta occorrenza misurata) |
| L'audit fotografa il DOM | **B3** | gli screenshot ritrarrebbero un avatar senza sfondo che stiamo per correggere comunque |
| L'audit indicizza le voci per `id` | **B8** | rinominare i `title:` dopo invaliderebbe id, screenshot e tabelle del report |

**Rischio dell'inversione, dichiarato**: correggere prima di misurare può nascondere difetti che
l'audit avrebbe scoperto. Regge perché le sei correzioni anticipate sono **tutte già diagnosticate
con misure conservate** — non sono ipotesi da confermare — e ognuna conserva il proprio prima/dopo.
L'audit di Fase 3 resta integrale e senza esclusioni: cambia ciò che fotografa, non quanto copre.

---

## Tabella dei deliverable

Legenda stato: `da fare` · `in corso` · `fatto` · `bloccato (chi/cosa)`.

### Fase 0 — fondamenta

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| 0.1 | Baseline riverificato su `main` c977df5 | io | install, typecheck, vitest, build, e2e eseguiti; numeri a confronto con quelli dichiarati nell'handoff | in corso |
| 0.2 | Igiene git: 3 worktree residui + 3 branch locali morti | Enzo autorizza, io eseguo | `git worktree list` mostra solo la radice; i branch `integration-dryrun`, `fix-shell-decorator`, `verify-main` non esistono più | bloccato (conferma di Enzo — sono cancellazioni) |

### Fase 1 — correzioni che devono precedere le misure

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| B1 | Canvas dipinta dai token; via la config morta di `backgrounds` | io | sonda: `body` = `#FAFBFD` in chiaro e `#0D1017` in scuro, output conservato | da fare |
| B2 | Il fallimento dello smoke test riporta il messaggio vero | io | un fallimento indotto stampa `errorText` da `.sb-errordisplay` | da fare |
| B6+B10.1 | Cancello di prontezza; misura freddo/caldo e build statico | io | suite completa verde **due volte di fila**; i due tempi riportati | da fare |
| B3 | Classi Tailwind interpolate → mappa statica, + caccia esaustiva nel repo | io | le regole esistono nel CSS compilato; elenco completo delle occorrenze con file:riga | da fare |
| B4 | Accessibilità sistemica: censimento rifatto, rampa `-ink` estesa | io | tabella prima/dopo; nessun testo sotto 4.5:1, nessuna icona sotto 3:1 | da fare |
| B7 | `useTheme` senza provider: degrado invece di crash | io | test che monta `DashboardHeader` senza provider e asserisce il comportamento scelto | da fare |

### Fase 2 — struttura, prima di fotografare la vetrina

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| A1 | Driver della UI manager (`openManager`, `expandAllGroups`, …) | io | `manager-navigation` verde; sidebar e `index.json` combaciano o le differenze sono elencate | da fare |
| B8 | Tassonomia e ordinamento della sidebar | io, su assunzione dichiarata | `storySort.order` elenca solo gruppi esistenti; famiglia del guscio in una casa sola; omonimie disambiguate | da fare |
| B9 | Struttura: orfani, duplicati, documenti che mentono sui conteggi | io; le rimozioni le autorizza Enzo | documento con i tre incroci; ogni conteggio porta la data di validità | da fare |

### Fase 3 — audit, su una vetrina già sanata

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| A2 | Giro completo: ogni voce cliccata dalla sidebar + autodocs | io | un test per voce, screenshot per tutte, fallimenti classificati (a)/(b)/(c) con prova | da fare |
| A3 | Ogni voce nei due temi, col pixel che cambia davvero | io | 4 asserzioni per voce; elenco esplicito delle insensibili al tema | da fare |
| A4 | Ogni Control produce un effetto visibile, col tipo giusto | io | inventario dei controlli; disallineamenti con file:riga | da fare |
| B5 | `addon-a11y` da decorativo a cancello | io propongo la soglia | inventario axe completo nei due temi, per gravità | da fare |
| B10.2 | Ottimizzare solo dove i numeri indicano | io | prima/dopo riportati | da fare |
| A5 | Report unico in italiano piano | io | apre col verdetto e i numeri; elenchi di esclusione allegati per intero | da fare |

### Fase 4 — rilascio

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| C2a | Bump 1.1.0, `ui/dist` rigenerato, note di rilascio, `publish --dry-run` | io | dry-run pulito | da fare |
| C2b | `npm publish` | **Enzo** | il pacchetto è sul registry | bloccato (npm non autenticato: 401, nessun `.npmrc`, nessun token — non delegabile) |
| C3 | Contratto in `heuresys-advanced`, riga 23 di `brand-component-contract.md` | io | riga applicata nell'altro repo, commit separato là | da fare |

*C1 è già fatto il 2026-09-04 (decorator `238d476`, tre PR mergiate).*

---

## Assunzioni dichiarate

1. **B8 Step 2** — il piano chiede a Enzo dove va la famiglia del guscio. Il mandato «falle tutte»
   non è una risposta a quella domanda, quindi adotto la **raccomandazione già scritta nel piano**:
   tutto sotto `Layout/`, con `Header/` come sottogruppo. Reversibile: è una rinomina di `title:`.
2. **Cancellazioni** — restano fuori dalla mia mano. Worktree, branch morti, file orfani di B9: li
   propongo con l'evidenza, non li eseguo. Divieto globale, non un mio scrupolo.
3. **`pnpm` gira solo da PowerShell** su questa macchina — in Git Bash corepack risolve un path
   mangled (`D:\c\nodejs\…`) e muore. Misurato oggi. Ogni comando pnpm di questo ciclo passa da lì.

## Registro delle scoperte — fuori da questo ciclo

Vuoto all'apertura. Ciò che emergerà e non appartiene alle righe qui sopra si annota qui, si presenta
a Enzo **una volta sola**, e non si travestirà mai da pendenza del ciclo.
