# Audit QA completo di Storybook + hardening del design system

> **For agentic workers:** REQUIRED SUB-SKILL: usa `superpowers:subagent-driven-development` per eseguire questo piano task per task. Gli step usano checkbox (`- [ ]`).

**Goal:** Portare la vetrina Storybook di `@heuresys/ui` da "sembra a posto perché i test passano" a "verificata voce per voce, senza esclusioni, con prove", e sanare i difetti strutturali, di accessibilità e di performance che le verifiche hanno già fatto emergere.

**Architettura:** Tre parti ordinate. La **Parte A** costruisce lo strumento che oggi manca — un audit Playwright che guida la UI reale di Storybook (sidebar, click, Controls, tema), non le iframe — e produce l'inventario dei difetti voce per voce. La **Parte B** corregge difetti già diagnosticati con misure, il primo dei quali rende l'audit stesso più affidabile. La **Parte C** chiude il rilascio sospeso.

**Tech Stack:** Storybook 10.3.6 (`@storybook/react-vite`), Vite 7, React 19, TypeScript 6, Tailwind 4, Playwright, pnpm 11.

**Origine:** difetti riportati da Enzo dopo aver scorso l'intera vetrina a mano (2026-09-04) — voci che compaiono in lista ma non mostrano nulla; impossibilità di vedere il tema scuro nella finestra di rendering — più quanto emerso da un audit meccanico a 4 lenti con verifica avversariale (24 finding esaminati) e da quattro sonde Playwright mirate.

---

## Global Constraints

- **Nessuna esclusione, nessun campionamento.** Dove il piano dice "ogni story" si intende tutte (380 al 2026-09-04; riverificare da `index.json` all'avvio). Un audit che copre un sottoinsieme senza dichiararlo è peggio di nessun audit.
- **Ogni asserzione negativa porta il comando e il suo output.** Vietato "non ci sono problemi" senza la prova.
- **Nessun cap silenzioso**: se una fase limita la copertura (timeout, retry, top-N), lo dichiara nel report.
- **Nessuna cancellazione di file senza conferma di Enzo.** Le rimozioni si *propongono* con l'evidenza.
- **Nessuna modifica ai consumer** (`heuresys-advanced`, `heuresys-datastore`).
- `pnpm run typecheck` pulito dopo ogni task; commit per task.
- Gli artefatti di misura (script + output grezzo) si conservano accanto al report. In questo ciclo una tabella di misure è già stata accusata di essere inventata, e solo l'artefatto sopravvissuto ha chiuso la questione.

---

## Stato di partenza — fatti misurati, da NON riverificare da zero

| Fatto | Prova |
|---|---|
| Il tema scuro **viene applicato**: classe `dark` su `<html>`, token ribaltano (`--background` `#FAFBFD`→`#0D1017`, `--card` `#FFFFFF`→`#131720`) | sonda Playwright su `?globals=theme:dark` |
| …ma `html`, `body` e `.sb-show-main` hanno `background-color: rgba(0,0,0,0)` in **entrambi** i temi: nessuno dipinge la canvas con i token → si vede sempre il bianco di default | stessa sonda |
| L'addon `backgrounds` è configurato (`default: "light"`, 3 valori hardcoded) ma **non dipinge nulla**: è configurazione morta | stessa sonda |
| La UI d'errore di Storybook renderizza in contenitori **fratelli** (`div.sb-nopreview`, `div.sb-errordisplay`), NON dentro `#storybook-root`, che resta a 0 figli | sonda su `?id=non-esiste--affatto` |
| `Layout/Dashboard Shell (Complete)` non renderizzava nulla: `useTheme must be used within ThemeProvider`. **Già corretto** con un decorator, patch in `fix-shell-theme.patch` | Playwright + `error-context.md` |
| I fallimenti di `Components/Button` (7 story) e `Media/VideoPlayer` sono rumore da avvio a freddo, non regressioni | passano contro server già caldo; run a freddo 15,1 min contro 5,0 a caldo |
| Entrambi i consumer avvolgono la root in `ThemeProvider` | `heuresys-advanced/.../AppProviders.tsx:30`, `heuresys-datastore/.../providers.tsx:42` |
| I 3 branch aperti si mergiano fra loro senza conflitti | merge sequenziale a secco |
| npm non è autenticato su questa macchina | `npm whoami` → 401; nessun `.npmrc`; nessun `NPM_TOKEN` |

**Limite noto dell'ambiente**: il browser in-app non registra il service worker di MSW; ogni story che dipende da MSW *appare* rotta lì mentre funziona in Chrome reale e in Playwright. **Diagnosticare sempre con Playwright**, mai da quel pane.

**Correzione a una premessa sbagliata**: una versione precedente di questo piano sosteneva che lo smoke test dichiarasse verdi le story rotte. È **falso**, misurato: la pagina d'errore sta fuori da `#storybook-root`, quindi l'asserzione sui figli la coglie. Il difetto reale è un altro, ed è in B2.

---

## Parte A — Audit QA della vetrina, guidato dalla UI reale

Lo smoke test attuale (`ui/e2e/storybook-smoke.spec.ts`) carica `iframe.html?id=…` direttamente. Non tocca la sidebar, non espande i gruppi, non clicca le voci, non prova i Controls, non guarda il tema, non apre le pagine autodocs. Copre un solo caso — "la story monta" — e i difetti trovati da Enzo vivono tutti fuori da quel caso.

### Task A1: Banco di prova — driver della UI manager di Storybook

**Files:**
- Create: `ui/e2e/lib/manager.ts`
- Create: `ui/e2e/manager-navigation.spec.ts`

**Interfacce prodotte** (consumate da A2–A4):
- `openManager(page)` — apre `http://localhost:6006/` e attende l'albero pronto
- `expandAllGroups(page): Promise<number>` — espande ricorsivamente **ogni** nodo collassato fino a punto fisso; ritorna quanti
- `listSidebarLeaves(page): Promise<Array<{id,label,path}>>` — ogni voce foglia, col percorso dei gruppi
- `canvas(page): FrameLocator` — la iframe `#storybook-preview-iframe`
- `canvasState(page): Promise<{childCount, hasErrorUi, errorText, visibleArea, textLength}>`

- [ ] **Step 1: `canvasState` legge l'errore dove sta davvero**

Misurato: la UI d'errore vive in `div.sb-nopreview` e `div.sb-errordisplay`, **fratelli** di `#storybook-root`. Cercarla dentro la canvas non troverebbe niente.

```ts
const ERROR_HOSTS = ['.sb-nopreview', '.sb-errordisplay'];
// visibile = getComputedStyle(el).display !== 'none'
// errorText = testo dell'heading dentro l'host visibile
```
`hasErrorUi` è vero se uno dei due host è visibile; `errorText` riporta il messaggio reale (es. `useTheme must be used within ThemeProvider`).

- [ ] **Step 2: `expandAllGroups` come ciclo fino a punto fisso**

Un passaggio solo non basta: aprire un gruppo può rivelare sottogruppi chiusi. Cicla finché non restano `[aria-expanded="false"]` nella sidebar, con guardia anti-loop (se un giro non apre più nulla, esci). Se restano nodi chiusi, **fallisci con l'elenco**: un gruppo che non si apre è già un difetto.

- [ ] **Step 3: Test — la sidebar espone esattamente l'indice**

Confronta `listSidebarLeaves()` con `index.json`. Una voce nell'indice ma non nella sidebar (o viceversa) è un difetto di tassonomia da riportare.

- [ ] **Step 4: Verifica** — `pnpm exec playwright test manager-navigation --workers=1`
- [ ] **Step 5: Commit**

### Task A2: Il giro completo — clicca ogni voce, osserva la finestra di contenuto

**Files:** Create `ui/e2e/qa-full-sweep.spec.ts`

Cuore della richiesta di Enzo: *espandere i gruppi, cliccare ciascuna voce, osservare cosa accade nella finestra di contenuto*.

- [ ] **Step 1: Un test per voce, non un monolite** — come lo smoke test: `globalSetup` produce l'elenco, il file genera un test per voce.

- [ ] **Step 2: Per ogni voce, dalla UI reale**

Clicca la voce **nella sidebar** (non navigare per URL: la navigazione via UI è ciò che ha fatto Enzo, ed è lì che nascono i difetti), poi asserisci:
1. `hasErrorUi === false`, con `errorText` nel messaggio di fallimento
2. `childCount > 0`
3. `visibleArea > 0`, salvo eccezione dichiarata (Step 3)
4. zero errori di console e zero `pageerror`
5. la voce risulta `aria-selected` dopo il click — se cliccare non seleziona, è un difetto di navigazione

- [ ] **Step 3: Registro delle eccezioni motivate, mai silenziose**

Alcune story sono legittimamente ad area zero (`MobileNav` è `md:hidden` su desktop; `CommentThread › Empty` rende un vuoto per definizione). Elenco **esplicito** nel file, ognuna con la ragione. Una story ad area zero fuori elenco fallisce. L'elenco entra nel report per intero.

- [ ] **Step 4: Screenshot come prova**, anche quando passa, in `test-results/qa-sweep/<id>.png` — è il materiale che permette a Enzo di ricontrollare a occhio senza rifare il giro.

- [ ] **Step 5: Le pagine autodocs, non solo le story**

`tags: ['autodocs']` è globale in `preview.ts`: ogni componente ha anche una pagina Docs, che l'audit deve visitare. **Difetto già noto da verificare qui**: nella pagina autodocs di `Header/Dashboard Header` convivono tre istanze dell'header, con id DOM duplicati, tre listener globali ⌘K e tre `ThemeProvider` sullo stesso documento (citazioni verificate: `DashboardHeader.stories.tsx:11/23-29/34/50/87`, `theme-toggle-button.tsx:16`, `search-trigger.tsx:17`).

- [ ] **Step 6: Esegui e classifica**

`pnpm exec playwright test qa-full-sweep --workers=2`. Ogni fallimento in una di tre categorie, con la prova: **(a)** difetto del componente, **(b)** difetto della story, **(c)** flakiness da carico — *dimostrata* rieseguendo isolata con `--workers=1`, non asserita.

- [ ] **Step 7: Commit** spec + classificazione

### Task A3: Il tema scuro, su ogni voce

**Files:** Create `ui/e2e/qa-theme.spec.ts`

**Da eseguire dopo B1**, altrimenti fallisce ovunque per una causa sola già nota.

- [ ] **Step 1: Ogni story nei due temi**, con quattro asserzioni:
1. `<html>` ha classe `dark` solo in scuro
2. i token di superficie sono cambiati (`--background`, `--card`, `--foreground`)
3. **il pixel visibile è cambiato**: lo screenshot scuro differisce dal chiaro oltre soglia. È l'asserzione che coglie il difetto vero — i token possono ribaltare mentre a schermo non cambia nulla, che è lo stato attuale
4. nessun testo sotto AA nel tema scuro (riusa `verify-contrast.mjs`, già in repo)

- [ ] **Step 2: Elenco esplicito delle story legittimamente insensibili al tema** (un logo monocromatico), con la ragione.
- [ ] **Step 3: Commit**

### Task A4: I Controls producono effetti visibili

**Files:** Create `ui/e2e/qa-controls.spec.ts`

Richiesta esplicita di Enzo: *verificare che i controlli di modifica funzionino e producano effetti visibili nella finestra di contenuto*.

- [ ] **Step 1: Inventario dei controlli per story** — da `index.json` più le `argTypes` estratte a runtime: elenco dei controlli manipolabili e loro tipo (select, boolean, text, number, color, radio).

- [ ] **Step 2: Per ogni controllo, un cambio e una prova**

Apri il pannello Controls nella UI, cambia il valore (select → un'opzione diversa dall'attuale; boolean → invertilo; text → una stringa sentinella), e asserisci che **il DOM o lo stile della canvas cambia**: confronto dell'`outerHTML` prima/dopo, o screenshot con soglia. Un controllo esposto che non produce effetto è un difetto — o è dichiarato per errore, o il componente lo ignora: riportalo in entrambi i casi.

- [ ] **Step 3: Il tipo di controllo deve corrispondere al tipo del dato**

Un'enumerazione vuole `select`/`radio`, non testo libero; un booleano un interruttore; un colore un color picker. Riporta ogni disallineamento con file:riga della `argTypes`. **Caso già noto da verificare**: `roleTone?: string` in `user-identity-card.tsx:10` è una stringa libera che dovrebbe essere un'unione tipizzata (vedi B3).

- [ ] **Step 4: Elenco esplicito dei controlli senza effetto atteso** (un callback `action` non cambia il rendering).
- [ ] **Step 5: Commit**

### Task A5: Report unico, leggibile da Enzo

**Files:** Create `docs/superpowers/reference/2026-09-XX-storybook-qa-report.md`

- [ ] **Step 1**: unisci A2/A3/A4 in un documento che apre col verdetto e i numeri (quante voci, quante verdi, quante rotte per categoria), poi la tabella dei difetti: gruppo, voce, sintomo, causa, gravità.
- [ ] **Step 2**: in italiano piano. Enzo non è tecnico: se una riga richiede competenze che non ha, è scritta male.
- [ ] **Step 3**: allega per intero gli elenchi di esclusione motivata.
- [ ] **Step 4: Commit**

---

## Parte B — Correzioni

### Task B1: La canvas non è mai dipinta dai token — causa del "vedo sempre chiaro"

**Files:** Modify `ui/.storybook/preview.css`, Modify `ui/.storybook/preview.ts`

**Priorità massima**: è la causa diretta del difetto riportato da Enzo, e sblocca A3.

- [ ] **Step 1: Dipingi la canvas dai token**
```css
html, body, .sb-show-main {
  background-color: var(--background);
  color: var(--foreground);
}
```

- [ ] **Step 2: Elimina la configurazione morta di `backgrounds`**

`preview.ts:19-26` dichiara `backgrounds` con valori hardcoded (`#ffffff`, `#0a0a0a`, `#fafaf7`) e `default: "light"`. Misurato: **non dipinge nulla** — è config morta, ed è per giunta cieca ai token di marca. Rimuovila e lascia che sia il tema a governare la superficie, documentando la scelta nel file. Se invece si vuole tenerla, va derivata dai token, non hardcoded: decidi, non lasciare entrambe.

- [ ] **Step 3: Verifica con la sonda** — `body` deve risultare `#FAFBFD` in chiaro e `#0D1017` in scuro. Conserva l'output.
- [ ] **Step 4**: typecheck + A3 su un campione. Commit.

### Task B2: Il fallimento dello smoke test non dice cosa è andato storto

**Files:** Modify `ui/e2e/storybook-smoke.spec.ts`

Lo smoke test **coglie** le story rotte (verificato), ma le riporta come `expected not 0, received 0`. Il messaggio vero — `useTheme must be used within ThemeProvider` — è dentro `.sb-errordisplay` e non viene letto: diagnosticare l'ultima regressione è costato diversi passaggi per recuperarlo da `error-context.md`.

- [ ] **Step 1**: quando `childCount === 0`, leggi `.sb-nopreview` / `.sb-errordisplay` e includi `errorText` nel messaggio di fallimento.
- [ ] **Step 2**: riesegui la suite completa; conferma zero regressioni. Commit.

### Task B3: Classi Tailwind costruite per interpolazione — non esistono affatto

**Files:** Modify `ui/src/components/dashboard/header/user-identity-card.tsx`, Modify `ui/src/components/dashboard/header/user-menu.tsx`

Il difetto più concreto trovato dall'audit, **provato sul CSS realmente costruito dal consumer**.

`user-identity-card.tsx:23` e `:30`, e identiche `user-menu.tsx:53` e `:61`, compongono il nome della classe a runtime:
```tsx
`... rounded-full bg-${user.roleTone ?? 'palette-3'}/20 text-xs font-semibold text-${user.roleTone ?? 'palette-3'}`
`... tracking-wider text-${user.roleTone ?? 'warning'}`
```
Tailwind 4 estrae le utility scandendo il **testo** dei sorgenti: una stringa spezzata non produce alcun candidato. Verificato in `heuresys-advanced/apps/web/.next/static/chunks/1nc9eic8uw3zx.css`: esistono `.bg-palette-3`, `.bg-palette-3\/10`, `.bg-palette-3\/15` e `.hover\:bg-palette-3\/20:hover`, ma **la regola base `.bg-palette-3\/20` non esiste**. Nessuna safelist nel repo. Esito reale: **l'avatar resta senza sfondo**. `text-palette-3` funziona solo perché esiste come letterale altrove (`SQLSlowQueryTable.tsx:40`) — per coincidenza, non per progetto.

Due difetti nello stesso punto: **default incoerenti** — riga 23 usa `palette-3`, riga 30 usa `warning`: avatar viola e ruolo ambra nello stesso blocco.

Aggravante da integrazione: il pattern esisteva in `main` in un solo sito (`DashboardHeader.tsx:190,195`), ora è in due file nuovi, **esportati come API pubblica** (`ui/src/index.ts`), con due story autodocs che documentano `roleTone: 'palette-3'` come valore d'uso.

- [ ] **Step 1: Sostituisci l'interpolazione con una mappa statica**, stesso schema di `TONE_CLASS` in `status-pill.tsx:25-31`: restringi `roleTone?: string` (`user-identity-card.tsx:10`) a un'unione tipizzata e indicizza un `Record` con le classi **per intero**.
- [ ] **Step 2: Unifica il default** nelle quattro occorrenze a un solo valore.
- [ ] **Step 3: Attenzione** — la rampa `-ink` copre solo `success/warning/danger/info` (`theme-heuresys.css:106-109`, `:155`), **non** `palette-1..4`. Se serve un testo su tinta per la palette, il gradino ink va creato: non usare `text-palette-3-ink`, che non esiste.
- [ ] **Step 4: Caccia esaustiva allo stesso pattern in tutto il repo**

Questa è la parte che vale più delle quattro righe: cerca **ogni** classe Tailwind costruita per interpolazione (`` `bg-${ ``, `` `text-${ ``, `` `border-${ ``, template literal con `-${` dentro un `className`). Ognuna è una classe che potrebbe non esistere. Riporta l'elenco completo con file:riga e correggi tutte.

- [ ] **Step 5**: build del CSS e verifica che le regole ora esistano. Commit.

### Task B4: Accessibilità — il debito è sistemico, non isolato

**Files:** vari (elenco prodotto dallo Step 1)

L'audit ha misurato che la rampa `-ink` introdotta per StatusPill risolve **un** caso di una famiglia molto più ampia. Numeri già verificati (ricalcolati a mano dai valori sRGB reali):

| Componente | Misura | Soglia |
|---|---|---|
| `integration-health-pill.tsx` — gemello esatto di StatusPill | 4 toni su 4 sotto AA in chiaro; `down` sotto AA anche in scuro | 4.5:1 |
| `admonition.tsx` — il titolo eredita il colore del tono su tinta 10% | 4 varianti su 6 sotto AA in chiaro | 4.5:1 |
| Censimento "testo del tono su tinta dello stesso tono" | **9 file**, il peggiore a **2.11:1** | 4.5:1 |
| `RBACMatrix.tsx` — icone di stato su tinta 20% | spunta `granted` a 2.64:1 | 3:1 (grafica) |
| `banner.tsx` — icona del tono `success` | 2.96:1 | 3:1 (grafica) |

Tutti pre-esistenti in `main`: per questo l'audit d'integrazione li ha giustamente esclusi dal proprio scope. Sono però esattamente il lavoro di questo piano.

- [ ] **Step 1: Rifai il censimento tu, non fidarti di questa tabella** — cerca `bg-<token>/10|15|20` insieme a `text-<stesso token>` in tutto `ui/src`, inclusi i componenti arrivati con le PR #5 e #6. Misura ciascuno nei due temi con `verify-contrast.mjs`.
- [ ] **Step 2: Estendi la rampa `-ink`** dove serve, **inclusa la palette** `palette-1..4` se i casi lo richiedono (oggi non c'è).
- [ ] **Step 3: Le icone hanno soglia 3:1**, non 4.5 — trattale come categoria a sé.
- [ ] **Step 4**: conserva la tabella prima/dopo. Commit.

### Task B5: `addon-a11y` da decorativo a cancello

**Files:** Modify `ui/.storybook/preview.ts`, Create `ui/e2e/qa-a11y.spec.ts`

`addon-a11y` è installato e configurato con `a11y: { config: { rules: [] } }`: compare nella UI, ma nessuno lo fa fallire. Considerato quanto emerso in B4, è il cancello che mancava.

- [ ] **Step 1**: esegui axe su **ogni** story nei due temi; inventario completo delle violazioni per gravità. **Non correggere ancora**: prima si misura.
- [ ] **Step 2**: presenta l'inventario e proponi la soglia bloccante (raccomandazione: `serious` e `critical`).
- [ ] **Step 3**: commit dell'inventario. La correzione di massa è un ciclo a sé, da proporre a Enzo coi numeri.

### Task B6: Flakiness da avvio a freddo — eliminarla alla radice

**Files:** Modify `ui/playwright.config.ts`, Modify `ui/e2e/global-setup.ts`

Difetto ricorrente, visto cinque volte in questo ciclo (Toast, ThreeScene, Accordion, LottiePlayer, Button+VideoPlayer). Finora curato alzando i timeout: cura del sintomo.

- [ ] **Step 1: Cancello di prontezza in `globalSetup`** — dopo `index.json`, apri una story sentinella e attendi che renda davvero (canvas con figli, service worker MSW registrato) prima di lasciar partire i worker. Fallisci con un messaggio chiaro oltre il limite.
- [ ] **Step 2: Valuta il build statico per la CI** — `storybook build` più servizio statico elimina compilazione a caldo, HMR e la corsa di MSW. Misura entrambe le strade sulla suite completa e scegli **coi numeri**. Riporta i due tempi.
- [ ] **Step 3**: riesegui la suite completa due volte di fila; criterio: **zero fallimenti in entrambe**, non "solo quelli noti". Commit.

### Task B7: `useTheme` — decidere se è una dipendenza dura

**Files:** Modify `ui/src/components/theme-provider.tsx` (eventuale)

`useTheme()` lancia se manca il provider, e `DashboardHeader` ora lo richiede. In produzione va bene (entrambi i consumer avvolgono la root, verificato), ma qualunque consumer futuro che monti `DashboardHeader` senza provider ha un crash, non un degrado.

- [ ] **Step 1: Decisione, motivata.** Due strade: **(a)** lasciare l'eccezione e documentare il requisito in README e nelle docs della story; **(b)** aggiungere `useThemeOptional()` con valore neutro e far degradare il solo toggle. Raccomandazione: **(b)** limitata a `theme-toggle-button`, perché un pulsante di tema inerte è un difetto minore, mentre un header che non renderizza abbatte la pagina.
- [ ] **Step 2**: test che monta `DashboardHeader` senza provider e asserisce il comportamento scelto.
- [ ] **Step 3**: il decorator già aggiunto alla story di `DashboardShell` resta comunque (corretto a prescindere). Commit.

### Task B8: Tassonomia e ordinamento della sidebar

**Files:** Modify `ui/.storybook/preview.ts`, e i `title:` interessati

Riguarda direttamente la lamentela di Enzo sulla vetrina poco intelligibile. Fatti verificati dall'audit:

- `storySort.order` (`preview.ts:37`) elenca **tre gruppi che non esistono** (`Welcome`, `Foundations`, `Recipes`) e **non elenca** i due nuovi gruppi top-level: l'ordinamento della sidebar è di fatto casuale.
- La stessa famiglia del guscio è spezzata su due gruppi: **10 story `Header/*`** contro **3 `Layout/*`**, benché `DashboardShell` le componga insieme.
- `Header/Theme Toggle` e `Components/ThemeToggle` coesistono senza alcuna nota di disambiguazione, mentre ogni altra coppia quasi-omonima creata in questo ciclo ne ha una.
- `Dashboard/DBSupervisorSidebar` è presentato come pari grado di `Layout/Dashboard Sidebar`, ma non è una sidebar: è una singola voce `<li>` (`DBSupervisorSidebar.tsx:31-33`) che vive dentro quella sidebar.

- [ ] **Step 1**: allinea `storySort.order` ai gruppi che esistono davvero.
- [ ] **Step 2**: decidi la casa della famiglia del guscio (raccomandazione: tutto sotto `Layout/`, con `Header/` come sottogruppo) e **proponi** la scelta a Enzo prima di applicarla — è la tassonomia che lui deve poter leggere.
- [ ] **Step 3**: disambigua le due coppie quasi-omonime, o rinominando o con nota incrociata, come già fatto per `RBACMatrix`/`RbacMatrix`.
- [ ] **Step 4**: rinomina `DBSupervisorSidebar` in modo che il nome dica cosa è. Commit.

### Task B9: Struttura — superficie pubblica, orfani, documenti falsi

**Files:** Create `docs/superpowers/reference/2026-09-XX-struttura-design-system.md`

- [ ] **Step 1: Incrocia tre elenchi** — esportati da `ui/src/index.ts`, componenti con story, componenti usati nei consumer. Le tre differenze sono i tre difetti: esportato senza story (invisibile in vetrina), story senza export (non usabile), componente usato da nessuno.
  - Caso già noto: **`GroupToggle`** è esportato pubblicamente, non ha story e non ha un solo utilizzatore.
- [ ] **Step 2: Duplicati per funzione, non per nome.** Caso già noto: il consolidamento dei breadcrumb ha unificato il tipo ma ha **promosso a API pubblica un secondo renderer**, più debole del primo e senza rimando incrociato.
- [ ] **Step 3: Sana i documenti che mentono.** Misurato: il censimento `2026-09-03-component-inventory.md` dichiara 120 componenti / 93 con story / 27 senza; la realtà dopo il merge è **128 / 124 / 4**. La tabella "Priorità 1 — usati in produzione, senza story (23)" ha **23 righe su 23 sbagliate**: tutti hanno una story. Tre documenti danno **tre conteggi incompatibili** per l'uso di StatusPill (33+1 / 54 / 57+37+1), e la story spedita in `ui/src` (`status-pill.stories.tsx:31`) afferma "il componente più usato di tutto il design system", smentito dal censimento nello stesso albero.
  - Regola da adottare: ogni documento che contiene conteggi porta **la data di validità della misura**, oppure il conteggio si genera da script. Un numero senza data invecchia in silenzio.
- [ ] **Step 4**: altre affermazioni datate già individuate — `DashboardShell.stories.tsx:34` annuncia il gruppo `Header/` come futuro mentre esiste con 10 story; lo spec header (`…header-storybook-taxonomy.md:21`) dice che `PageActions` e `DashboardShell` non hanno story, e ora ce l'hanno.
- [ ] **Step 5**: **proponi** le rimozioni a Enzo con l'evidenza; non cancellare nulla di iniziativa. Commit del documento.

### Task B10: Performance della vetrina

**Files:** Modify `ui/.storybook/main.ts` (eventuale)

- [ ] **Step 1: Misura prima di ottimizzare** — avvio a freddo, primo render, peso del bundle di `storybook build`, le 10 story più lente. Numeri, non impressioni. Riferimento noto: suite completa 5,0 min a caldo contro 15,1 a freddo.
- [ ] **Step 2**: intervieni solo dove i numeri indicano. Candidati: i bundle three.js/`@react-three/fiber` (~6s isolati), `reactDocgen: "react-docgen-typescript"` (accurato ma lento su repo grandi).
- [ ] **Step 3**: rimisura, riporta prima/dopo. Commit.

---

## Parte C — Il rilascio rimasto in sospeso

**Stato**: tre PR aperte e non mergiate — [#5](https://github.com/Spen-Zosky/ux-design-shared/pull/5) header, [#6](https://github.com/Spen-Zosky/ux-design-shared/pull/6) 17 story, [#7](https://github.com/Spen-Zosky/ux-design-shared/pull/7) decisioni architetturali. Si mergiano fra loro senza conflitti (verificato a secco). Fermate deliberatamente: pubblicare una 1.1.0 mentre l'audit QA non è stato fatto sarebbe prematuro.

**Da decidere con Enzo, prima di eseguire la Parte C**: se il fix di B3 (classi interpolate) debba entrare **prima** del merge, dato che l'attuale PR #5 espone come API pubblica un componente con quel difetto.

### Task C1: Portare la correzione della regressione dentro la PR #6
- [ ] Applica a `feat/priority1-simple-stories` la patch `fix-shell-theme.patch` (decorator `ThemeProvider` per `DashboardShell.stories.tsx`), così `main` resta verde in qualunque ordine di merge. Poi merge delle tre PR.

### Task C2: Rilascio 1.1.0
- [ ] Bump `ui/package.json` 1.0.0 → **1.1.0** (minor: nuovi export pubblici `HeaderUserMenu`/`HeaderMobileDrawer`, nuovi token nel tema spedito via `src/styles`; nessuna rottura di API).
- [ ] Rigenera e committa `ui/dist` (tracciato in git) **una volta sola**, dopo il merge di tutte e tre.
- [ ] Note di rilascio con dentro: correzione di contrasto di StatusPill, nuova rampa `-ink`, requisito `ThemeProvider` per `DashboardHeader`.
- [ ] `npm publish --dry-run` per provare che il pacchetto è corretto.
- [ ] **La pubblicazione vera richiede Enzo**: npm non è autenticato qui (401, nessun `.npmrc`, nessun token). Serve un suo `npm login`, poi `npm publish`. Non è delegabile all'assistente.

### Task C3: Contratto in `heuresys-advanced`
- [ ] Il testo proposto per la riga 23 di `brand-component-contract.md` è nel corpo della PR #7. Va applicato **nell'altro repo**.

---

## Registro delle pendenze — fuori dallo scope dei task qui sopra

- Duplicazione del toggle di gruppo nella sidebar.
- Adozione nei consumer delle nuove prop opzionali dell'header.
- `NotificationCenter` presente ma non collegato.
- `language-switcher.tsx` morto in `heuresys-advanced`.
- Lo spec header dice che `HeaderUserMenu` sostituisce `HeaderUserIdentity` come default, ma il codice lo monta solo su prop opzionale: divergenza dichiarata nel commit, da chiudere scegliendo quale delle due è la verità.
- La webapp drag-and-drop per comporre oggetti e gruppi del design system — concordata come passo successivo, **solo quando Enzo lo deciderà**.
