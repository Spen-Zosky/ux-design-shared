# Ciclo — correzione di massa dell'accessibilità

**Aperto**: 2026-09-06 · **Mandato di Enzo**: «partiamo dalle 441 violazioni di accessibilità».

Il *cosa* è misurato in `../reference/2026-09-05-inventario-accessibilita.md`, che resta la fonte del
numero di partenza. Questo file governa il **come** e tiene lo **stato per riga**. Lo stato del ciclo
si legge da qui e da nessun altro posto.

---

## Confine di sessione — dichiarato all'inizio

Il ciclo è **più grande di una sessione**: 441 violazioni su 504 voci, due temi. Questa sessione
arriva fin dove arriva. Non verrà mai lasciato credere che la fine sia vicina quando non lo è.

Misure all'apertura (2026-09-06 16:40): contesto **8,4%** — 84.286 token consumati, 915.714 residui
su una finestra di 1.000.000 **misurata**, non da tabella. Finestra 5 ore **23,0%**, dato di 2
minuti prima: fresco, quindi utilizzabile. Entrambi i rami vedono. Giudizio: largo.

---

## Il difetto che ha determinato la Fase 0

L'inventario del 2026-09-05 conta 441 violazioni ma **non è più interrogabile**: i file grezzi
stanno in `ui/test-results/`, che `.gitignore` esclude, e la cartella è vuota. Restano i totali
aggregati del documento, che dicono *quanto* ma non *dove*.

C'è un secondo difetto, più profondo, nello spec che li produceva: per ogni violazione salvava
`nodi: v.nodes.length`, cioè **quanti** elementi la violano, mai **quali**. Perfetto per contare,
inservibile per correggere — davanti a 52 violazioni `listitem` non si saprebbe da quale componente
partire. Corretto in questa sessione prima di rigenerare, così la corsa si paga una volta sola:
`qa-a11y.spec.ts` ora salva per ogni nodo il selettore e l'HTML troncato, al massimo 8 nodi per
violazione.

---

## Le tre famiglie, e perché non si affrontano insieme

| Famiglia | Violazioni | Che cosa tocca | Decisione di design? |
|---|---|---|---|
| **Struttura** — `listitem`, `label`, `button-name`, `heading-order`, `landmark-*`, `empty-table-header`, `aria-*` | 224 | markup dei componenti e delle story | no: c'è una sola forma corretta |
| **Contrasto** — `color-contrast` | 217 | i token di colore, soprattutto in tema scuro | **sì**: cambia l'aspetto del prodotto |
| **Cancello** | — | configurazione di `addon-a11y` e della suite | no, ma va acceso per ultimo |

La struttura si corregge senza chiedere niente a nessuno: un `<li>` fuori posto è sbagliato e basta.
Il contrasto no — 138 delle 217 sono in tema scuro, e alzarne il contrasto significa cambiare i
colori di una libreria già pubblicata alla 1.1.0 e già adottata da `heuresys-advanced`. Quella è una
scelta che spetta a Enzo, e gli va posta con davanti i colori proposti, non prima.

---

## Tabella dei deliverable

Legenda stato: `da fare` · `in corso` · `fatto` · `bloccato (chi/cosa)`.

### Fase 0 — rendere la misura interrogabile

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| 0.1 | `qa-a11y.spec.ts` salva i nodi, non il loro conteggio | io | il tipo `Violazione` porta `nodiDettaglio` con `target` e `html`, e i file prodotti li contengono davvero | **fatto** — la prova è nei file di 0.3, non nel typecheck: `tsconfig.json` include `src/**/*` e **lascia fuori `e2e/`** |
| 0.2 | Vetrina statica ricostruita da zero | io | `build-storybook` esce 0 e l'indice porta 504 voci | **fatto** — 4m54s, exit 0, 504 voci |
| 0.3 | Inventario rigenerato con i nodi | io | 504 file in `test-results/a11y/`, totale confrontato con le 441 del 2026-09-05, differenza spiegata | **in corso** — partito 16:47:32 |
| 0.4 | Il riepilogo raggruppa per componente, non per voce | io | `a11y-riepilogo.mjs --per-file` dice quali file sorgente aprire; `--regola X` mostra i nodi | **fatto** — da provare su 0.3 |

### Fase 1 — le violazioni strutturali

Le righe di questa fase si scrivono quando 0.3 consegna i dati: prima di allora sarebbero nomi di
componenti tirati a indovinare. Il criterio d'ordine è già deciso — prima ciò che una sola
correzione chiude molte volte (un componente riusato, un template di pagina docs), poi il resto.

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| 1.0 | Decomposizione fino al comando, dai dati di 0.3 | io | ogni riga nomina file e correzione, non una categoria | **fatto** |
| 1.1 | `label` — l'input file di `FileDropzone` non ha nome | io | `aria-label` sull'input `sr-only`; 14 violazioni | **fatto** |
| 1.2 | `label` — telefono e importo in `smart-inputs` | io | `inputProps` su `PhoneInputField` (prop `ariaLabel`), `aria-label` di ripiego su `MoneyInput`; 6 violazioni | **fatto** |
| 1.3 | `label` — le caselle delle liste di cose da fare in `MarkdownView` | io | `components.input` di default che nomina la casella con il suo stato; 4 violazioni | **fatto** |
| 1.4 | `button-name` — Switch, Checkbox, Tooltip nudi nelle demo | io | `aria-label` nelle story; 20 violazioni | **fatto** |
| 1.5 | `empty-table-header` — tre tabelle con intestazioni vuote | io | `SkillHeatmap` prende `rowAxisLabel`; le colonne di azioni di `SQLSlowQueryTable` e `TenantFleetTable` hanno un nome per soli assistivi; 16 violazioni | **fatto** |
| 1.6 | `aria-allowed-attr` — `aria-sort` sul bottone invece che sul `<th>` in `DataTable` | io | l'attributo sta sull'intestazione di colonna; 10 violazioni | **fatto** |
| 1.7 | `KanbanBoard` — una causa, tre regole | io | `<ul role="list">` + `<li>` al posto di `<div role="list">` + `<section role="listitem">`, `DndContext` spostato fuori dalla lista, header di colonna reso `<div>`; attese ~22 violazioni fra `aria-required-children`, `aria-allowed-role`, `landmark-unique`, `landmark-no-duplicate-banner` | **fatto** |
| 1.8 | `CalendarGrid` — una griglia ARIA senza righe | io | celle raggruppate per settimana in `role="row"`, intestazioni dei giorni in `role="columnheader"`; 12 violazioni fra `aria-required-children` e `aria-required-parent` | **fatto** |
| 1.9 | `image-alt` — un `<img>` che nessuno ha scritto | io | il tag nudo nel JSDoc di `MermaidDiagram`, reso come HTML vero da Storybook, ora è fra apici inversi; 2 violazioni | **fatto** |
| 1.10 | `landmark-banner-is-top-level` — la barra del `Chatbot` | io | `<header>` → `<div>`: la barra di un pannello non è l'intestazione del documento; 2 violazioni | **fatto** |
| 1.11 | La tabella delle prop di Storybook fuori dalla misura | io | `.exclude(".docblock-argstable")` in `qa-a11y.spec.ts`, dopo aver verificato nel DOM che il `<li>` orfano vive lì dentro; 52 violazioni che non erano nostre | **fatto** |
| 1.12 | `aria-allowed-role` — `role="img"` su un'intestazione in `HeuresysWordmark` | io | il ruolo non si applica più quando `as` è `h1`/`h2`; 4 violazioni | **fatto** |
| 1.13 | Rimisura e confronto | io | inventario rigenerato, differenza spiegata | **fatto** — vedi sotto |

### Esito della Fase 1 — misurato il 2026-09-06

Vetrina ricostruita da zero e 504 voci su 504 esaminate nei due temi, in 15,0 minuti. Nessuna voce
persa: la misura del 2026-09-05 ne aveva perse 7 e quella delle 17:30 una sola.

| | 2026-09-05 | dopo la Fase 1 | differenza |
|---|---|---|---|
| **totale** | 441 | **270** | −171 |
| `critical` | 76 | **0** | −76 |
| `serious` | 269 | 217 | −52 |
| `moderate` | 68 | 53 | −15 |
| `minor` | 28 | 0 | −28 |

**Le 270 rimaste sono di due sole nature**, e nessuna è un difetto strutturale di un componente:

- **217 `color-contrast`** — la Fase 2, che aspetta una decisione di Enzo sui colori.
- **53 di composizione** (`heading-order` 24, `landmark-*` 29) — **tutte e 53 su pagine `› Docs`,
  zero su story**, misurato. Esistono perché una pagina di documentazione rende più story insieme:
  due `<main>`, due `<header>` che in un'applicazione reale non si incontrerebbero mai.

Un errore da registrare: il primo giro di correzioni ha **introdotto 4 violazioni `critical`**. Il
commento che avevo scritto in `checkbox.stories.tsx` conteneva un tag nudo, e Storybook rende quei
commenti come markdown nella pagina docs — l'ho scoperto un'ora prima diagnosticando lo stesso
difetto in `MermaidDiagram`, e l'ho ripetuto io stesso subito dopo. Corretto con gli apici inversi,
e la stessa protezione è stata messa in ogni altro commento che nomina un tag.

Verifiche: typecheck pulito, Vitest 119/119, tre volte durante il ciclo.

### Fase 2 — il contrasto

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| 2.0 | Proposta dei colori, coi rapporti misurati | io | `../reference/2026-09-06-proposta-contrasto.md` | **fatto** — `39ed16a` |
| 2.1 | Decisione | **Enzo** | scelta registrata | **fatto** — 2026-09-06: sì a tutte e tre le domande (cambiare le scritte invece delle tinte; il rosso di un gradino; gli altri tre gruppi senza altre domande) |
| 2.2 | Il testo sulle tinte piene | io | `--color-success-fg` e `--color-destructive-foreground` (scuro) e `--warning-fg` di marca (bianco in chiaro, scuro in scuro) | **fatto** |
| 2.3 | Il rosso di un gradino | io | `--color-destructive` L 0,60 → 0,59 | **fatto** |
| 2.4 | La pagina docs dipinta in tema scuro | io | regole `.dark .sbdocs-*` in `preview.css`; il gruppo passa da 350 nodi a **0**, misurato | **fatto** |
| 2.5 | I grigi scritti a mano → token | io | `text-neutral-*` e `text-slate-700` non esistono più: 37 occorrenze in 29 file, 28 dei quali story | **fatto** |
| 2.6 | La rampa `-ink` dove la tinta fa da testo | io | 12 componenti indicati dai dati; nessun token nuovo, `danger-ink` dà già 6,44 su fondi chiari e 5,96 su quelli scuri | **fatto** |
| 2.7 | Rimisura e residuo | io | inventario rigenerato, residuo classificato | **fatto** — vedi sotto |

### Esito della Fase 2 — misurato il 2026-09-06, 504 voci su 504

| | 2026-09-05 | dopo la Fase 1 | **dopo la Fase 2** |
|---|---|---|---|
| **totale** | 441 | 270 | **70** |
| `color-contrast` | 217 | 217 | **16** |
| composizione delle pagine docs | — | 53 | 54 |
| `critical` | 76 | 0 | **0** |

**Sono serviti quattro giri di misura, non uno**, e ogni giro ha corretto un errore del precedente:

1. La prima correzione dei colori è stata scritta in `tokens.css` e non ha avuto **alcun** effetto:
   quel file è un template che nessuno importa: i valori veri stanno in `globals.css`, che li
   duplica. Scoperto solo rileggendo il CSS compilato dopo 29 minuti di corsa.
2. Dipingere la pagina di documentazione senza raggiungere **ogni** testo del telaio non ha risolto
   il difetto: lo ha **rovesciato**. Testo chiaro su bianco (1,10, 350 elementi) è diventato testo
   scuro su scuro (1,49, 404 elementi) — peggio di prima. La regola è stata riscritta per
   esclusione invece che per elenco.
3. Il rosso portato a L 0,59 dava esattamente 4,50 alla sonda e **4,49** ad axe, che arrotonda il
   compositing in modo appena diverso: sotto la soglia per un centesimo, su 19 elementi. Un valore
   al limite esatto non è un valore corretto, è un valore fortunato. Portato a 0,575.
4. Il residuo più grosso dopo tutto questo era il `<code>` in linea, che ha uno sfondo proprio
   (#F6F9FC) che nessuna regola sul contenitore tocca.

Verifiche: typecheck pulito e Vitest 119/119 a ogni passo.

### Fase 3 — il cancello

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| 3.0 | `addon-a11y` da decorativo a cancello su `critical` + `serious` | io | la suite fallisce su una violazione nuova, e passa sul repository pulito | **bloccato (Fase 1 e 2)** |

---

## Simulazione — Fase 0

- **Precondizioni**: `pnpm` funziona solo in PowerShell su questa macchina (in Git Bash corepack
  risolve un path mangled e muore). La vetrina statica va ricostruita perché `storybook-static` era
  del 2026-09-04 23:11 mentre i sorgenti sono del 05 20:58: misurare su una vetrina vecchia darebbe
  numeri che non corrispondono al codice.
- **Meccanismo**: `pnpm run build-storybook` esegue `clean.mjs` prima di `storybook build` — letto,
  e `clean.mjs` rimuove `storybook-static` e `node_modules/.cache`, **non** `dist`, che è tracciato
  in git nonostante `.gitignore`. Nessun `git checkout -- ui/dist` necessario dopo questa corsa.
- **Propagazione**: i file grezzi restano fuori da git per scelta (`test-results/` è ignorato). Ciò
  che deve sopravvivere alla sessione è il riepilogo aggregato, che va in `docs/`.
- **Chi**: io, per intero.
- **Guardia**: non distruttiva. `clean.mjs` tocca due sole cartelle rigenerabili, entrambe ignorate
  da git.

---

## Registro delle scoperte — fuori da questo ciclo

Non entrano in «cosa resta», non bloccano la chiusura. Si presentano a Enzo una volta sola.

1. **Una fetta del debito non è del design system.** Delle 441 violazioni, **58 vivono in codice
   che non è nostro**: 52 `listitem` e 6 `heading-order` vengono dal widget che Storybook usa per
   mostrare gli oggetti nella tabella dei Controls (`react-editable-json-tree`). Nessuna
   correzione nei nostri componenti le tocca. Vanno escluse dal cancello, o il cancello sarà
   rosso per sempre per colpa di una dipendenza altrui.
2. **Le pagine di documentazione moltiplicano i landmark.** Una pagina docs rende più story
   insieme, quindi due `<main>`, due `<header>`, due `<nav>` che in un'applicazione reale non si
   incontrerebbero mai. Sono **~52 violazioni di sola composizione** (`landmark-*` e
   `heading-order`, tutte su voci `› Docs`): non sono difetti dei componenti, e la scelta è se
   misurare quelle regole solo sulle story. Da decidere prima di accendere il cancello.
3. **`tokens.css` non è la fonte dei token: è un template che nessuno importa.** I valori che
   arrivano davvero al browser stanno in `globals.css`, che li **duplica** — il suo stesso commento
   lo dice: «values mirror src/styles/tokens.css (wizard template, not a runtime import)». Due file
   con gli stessi valori e un solo lettore: la prima correzione dei colori è stata scritta in
   `tokens.css` e non ha avuto **alcun** effetto, scoperto solo rileggendo il CSS compilato dopo una
   corsa da 29 minuti. Finché restano due, divergeranno.
4. **Prettier è dichiarato ma non installato.** `package.json` della radice lo elenca fra le
   devDependencies e `node_modules/.bin/prettier` esiste, ma punta a un pacchetto assente:
   qualunque `prettier --check` in una verifica automatica fallirebbe con `MODULE_NOT_FOUND`.
4. **I test end-to-end non sono type-checkati.** `ui/tsconfig.json` dichiara `include:
   ["src/**/*"]`, quindi `pnpm run typecheck` non guarda `e2e/`: un errore di tipo lì dentro non
   viene visto da nessuno, perché Playwright compila con esbuild, che i tipi non li controlla.
   Sono ~46 KB di codice di prova senza rete di sicurezza. Si chiude con un `tsconfig.e2e.json` e
   una riga in più nello script.
