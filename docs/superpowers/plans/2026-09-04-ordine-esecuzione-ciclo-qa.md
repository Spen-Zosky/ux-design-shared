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
| 0.1 | Baseline riverificato su `main` c977df5 | io | install, typecheck, vitest, build, e2e eseguiti; numeri a confronto con quelli dichiarati nell'handoff | **fatto** — typecheck pulito, Vitest 116/116, build pulita, Playwright 381/381 a caldo (6,7 min) |
| 0.2 | Igiene git: 3 worktree residui + 3 branch locali morti | Enzo autorizza, io eseguo | `git worktree list` mostra solo la radice; i branch `integration-dryrun`, `fix-shell-decorator`, `verify-main` non esistono più | **fatto** — autorizzato il 2026-09-05; 95 file di `.superpowers/sdd/` archiviati PRIMA della cancellazione |

### Fase 1 — correzioni che devono precedere le misure

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| B1 | Canvas dipinta dai token; via la config morta di `backgrounds` | io | sonda: `body` = `#FAFBFD` in chiaro e `#0D1017` in scuro, output conservato | **fatto** — `5fbb201`, misura prima/dopo conservata |
| B2 | Il fallimento dello smoke test riporta il messaggio vero | io | un fallimento indotto stampa `errorText` da `.sb-errordisplay` | **fatto** — piu' un test permanente che protegge la diagnosi stessa |
| B6+B10.1 | Cancello di prontezza; misura freddo/caldo e build statico | io | suite completa verde **due volte di fila**; i due tempi riportati | **fatto** — statico 381/381 due volte, 3,3 min contro 6,5; scoperto un build silenziosamente incompleto |
| B3 | Classi Tailwind interpolate → mappa statica, + caccia esaustiva nel repo | io | le regole esistono nel CSS compilato; elenco completo delle occorrenze con file:riga | **fatto** — 22 occorrenze in 11 file (il piano ne stimava 2); zero residui |
| B4 | Accessibilità sistemica: censimento rifatto, rampa `-ink` estesa | io | tabella prima/dopo; nessun testo sotto 4.5:1, nessuna icona sotto 3:1 | **fatto** — 27 sostituzioni in 14 file; 54/54 combinazioni AA |
| B7 | `useTheme` senza provider: degrado invece di crash | io | test che monta `DashboardHeader` senza provider e asserisce il comportamento scelto | **fatto** — `1dab478`, Vitest 119/119 |

### Fase 2 — struttura, prima di fotografare la vetrina

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| A1 | Driver della UI manager (`openManager`, `expandAllGroups`, …) | io | `manager-navigation` verde; sidebar e `index.json` combaciano o le differenze sono elencate | **fatto** — 2/2 verdi, 504 voci combaciano una a una |
| B8 | Tassonomia e ordinamento della sidebar | io, su assunzione dichiarata | `storySort.order` elenca solo gruppi esistenti; famiglia del guscio in una casa sola; omonimie disambiguate | **fatto** — 17 gruppi invece di 19; Layout da 6 a 36 voci |
| B9 | Struttura: orfani, duplicati, documenti che mentono sui conteggi | io; le rimozioni le autorizza Enzo | documento con i tre incroci; ogni conteggio porta la data di validità | **fatto** — 4 orfani pubblici (il piano ne dava 1); rimozioni **proposte**, non eseguite |

**Voce aggiunta in corsa su decisione di Enzo** — non è una scoperta travestita da pendenza, è un
mandato nuovo: `@storybook/addon-docs` non era installato, quindi le pagine di documentazione non
esistevano. Enzo ha scelto di installarlo e documentare. L'indice passa da 380 a 504 voci, e l'audit
di Fase 3 ha ora 124 pagine in più da coprire.

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| B11 | Autodocs: addon installato, suite estesa alle pagine docs | io | l'indice porta voci di tipo `docs` e la suite le verifica | **fatto** — 124 pagine, 507/507 verdi |

### Fase 3 — audit, su una vetrina già sanata

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| A2 | Giro completo: ogni voce cliccata dalla sidebar + autodocs | io | un test per voce, screenshot per tutte, fallimenti classificati (a)/(b)/(c) con prova | **fatto** — 505 voci; i 3 rossi erano errori attesi per progetto, ora dichiarati |
| A3 | Ogni voce nei due temi, col pixel che cambia davvero | io | 4 asserzioni per voce; elenco esplicito delle insensibili al tema | **fatto** — 504/504; l'elenco delle insensibili resta VUOTO |
| A4 | Ogni Control produce un effetto visibile, col tipo giusto | io | inventario dei controlli; disallineamenti con file:riga | **fatto** — 568 controlli, 109 inerti, 0 disallineati |
| B5 | `addon-a11y` da decorativo a cancello | io propongo la soglia | inventario axe completo nei due temi, per gravità | **fatto** — 441 violazioni; soglia proposta critical+serious, da accendere DOPO la correzione di massa |
| B10.2 | Ottimizzare solo dove i numeri indicano | io | prima/dopo riportati | **fatto — nessun intervento**: i numeri non indicano nulla da correggere; il file più pesante dopo i grafici è `zxcvbn` col suo dizionario, che è il suo modo di funzionare |
| A5 | Report unico in italiano piano | io | apre col verdetto e i numeri; elenchi di esclusione allegati per intero | **fatto** — `2026-09-05-report-audit-vetrina.md` |

### Fase 4 — rilascio

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| C2a | Bump 1.1.0, `ui/dist` rigenerato, note di rilascio, `publish --dry-run` | io | dry-run pulito | **fatto** — `@heuresys/ui@1.1.0`, 53 file, 352,6 kB; verificato che le classi complete siano letterali nel bundle |
| C2b | `npm publish` | **Enzo** | il pacchetto è sul registry | **fatto** — 2026-09-05, `@heuresys/ui@1.1.0` è `latest`; verificato interrogando il registry |
| C3 | Contratto in `heuresys-advanced`, riga 23 di `brand-component-contract.md` | **non io** | riga applicata dall'altro repo | **annullato e ritirato** — i vincoli globali del piano vietano le modifiche ai consumer, e questa voce li contraddiceva. Avevo aperto una PR là: chiusa, branch remoto rimosso, repo riportato allo stato precedente. Il testo resta nel corpo della PR #7, da applicare da chi lavora su quel repository |

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

## Nota d'ordine — uno scambio dentro la Fase 1

**B6 e B10.1 sono stati spostati dopo B3+B4.** Le misure di prontezza e di tempo freddo/caldo hanno
senso sullo stato di codice più vicino a quello finale: prenderle prima di cambiare quattordici
componenti avrebbe voluto dire rifarle. L'ordine fra le fasi non cambia — restano entrambi prima
dell'audit di Fase 3, che è il motivo per cui erano stati anticipati.

## Registro delle scoperte — fuori da questo ciclo

Ciò che emerge e non appartiene alle righe qui sopra si annota qui, si presenta a Enzo **una volta
sola**, e non si traveste mai da pendenza del ciclo.

- **`verify-contrast.mjs` non era mai stato committato.** L'handoff lo dava «in repo»: viveva invece
  solo dentro il worktree `fix+architectural-decisions`, non tracciato. Rimuovere quel worktree lo
  avrebbe cancellato. Ora è in repo, generalizzato, come `ui/scripts/verify-contrast.mjs`.
- **`pnpm` non funziona da Git Bash** su questa macchina: corepack risolve un path mangled
  (`D:\c
odejs\…`) e muore. Solo PowerShell. Già registrato fra le assunzioni.
- **Le pagine autodocs potrebbero non esistere affatto.** `index.json` contiene 380 entry, **tutte
  di tipo `story` e nessuna di tipo `docs`**, benché `tags: ["autodocs"]` sia dichiarato globalmente
  in `preview.ts`. Il piano d'origine assume che ogni componente abbia la sua pagina Docs (task A2
  Step 5) e cita un difetto specifico dentro una di esse. Da verificare con Playwright prima di
  scrivere quella parte dell'audit: se le autodocs non vengono generate, A2 Step 5 non ha oggetto e
  il difetto citato non esiste in quella forma.
- **I worktree contenevano 95 file ignorati da git.** `.superpowers/sdd/` in ciascuno dei tre —
  report di batch, brief, `progress.md` e i diff di review delle tre PR: la memoria di *come* quel
  lavoro e' stato fatto, invisibile a `git status` perche' ignorata. Archiviati in
  `C:\Users\enzospenuso\Claude Desktop\ciclo-qa-hardening_20260905\archivio-worktree` prima di cancellare.
  E' la seconda volta in questo ciclo che un file prezioso viveva solo dentro un worktree.
- **Cinque branch locali restano, tutti interamente dentro `origin/main`**:
  `docs/design-system-taxonomy-planning`, `docs/storybook-qa-plan`, `feat/priority1-simple-stories`,
  `refactor/header-storybook-taxonomy`, `worktree-fix+architectural-decisions`. Non li ho toccati:
  l'autorizzazione riguardava i tre morti nominati nell'handoff.
- **KPIStrip e ErrorRateBreakdown costruiscono `var(--${tone})` in uno stile inline.** Non è il
  difetto B3 — le custom property esistono a runtime e funzionano — ma condivide la stessa fragilità:
  un tono fuori elenco produce una variabile inesistente invece di un errore. Non toccato.
