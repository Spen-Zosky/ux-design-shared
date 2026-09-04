# Header Storybook Taxonomy — Spec

## Richiesta originale (Enzo, 2026-09-03)

> Quando rigenererai lo storybook dovrai trovare una strategia ed un metodo per i nomi e i gruppi di oggetti del design system in modo che io possa comprenderli e gestirli. Per esempio, se esistono oggetti facenti tutti riferimento a come si genera un header, il gruppo deve fare riferimento che sta descrivendo header e gli elementi appartenenti al gruppo devono avere nomi "parlanti" [...] Io voglio che quando ispezioni il gruppo header i suoi oggetti abbiano un nome chiaro e che ciascuno di essi possa essere editato attraverso i controlli disponibili per quel tipo di oggetto.

Trigger concreto: uno screenshot dell'header applicativo di `heuresys-datastore` con ~9 elementi (hamburger, logo, breadcrumb, search box, language switcher, palette switcher, chevron, theme toggle) che Enzo non riesce a mappare su oggetti Storybook comprensibili.

## Scope di questo ciclo

Riorganizzare **naming, raggruppamento e Controls** degli oggetti che compongono l'header — non correggere le funzionalità mancanti né consolidare le duplicazioni trovate durante l'indagine (elencate sotto come "Fuori scope", da decidere in un ciclo separato).

## Fatti verificati (indagine 2026-09-03, due agenti read-only su `ux-design-shared`, `heuresys-datastore`, `heuresys-advanced`)

1. **`ui/src/components/dashboard/DashboardHeader.tsx`** è il componente reale che produce l'header in ENTRAMBI i consumer verificati (`heuresys-datastore/apps/web/src/app/guscio.tsx:65`, `heuresys-advanced/apps/web/src/app/(authenticated)/layout.tsx:197`). Commento sorgente (`DashboardHeader.tsx:13-17`) dichiara lo spec degli slot:
   ```
   left:   hamburger | logo | breadcrumb
   middle: command palette trigger (⌘K)
   right:  language | palette dropdown | theme toggle | user identity card
   ```
2. **`DashboardHeader` non ha alcun file `.stories.tsx`** — zero presenza in Storybook, zero gruppo, zero Controls. Stesso per `PaletteDropdown.tsx`, `GroupToggle.tsx`, `PageActions.tsx`, `DashboardShell.tsx`.
3. Tutti i sotto-elementi (hamburger, breadcrumb, search-trigger, language toggle, theme toggle) sono **JSX inline nello stesso file**, senza props proprie — non esistono oggi come unità isolabili/testabili singolarmente.
4. `PaletteDropdown()` è **zero-arg** (nessuna prop): stato e 4 preset colore sono 100% interni (`PaletteDropdown.tsx:20-25,43-45`).
5. Story esistenti con Controls **inerti** (pattern `render: () => ...` senza `args`, quindi il pannello Controls non ha alcun effetto): `LanguagePicker`, `ThemeToggle`, `MegaMenu`. Solo `HeuresysWordmark` (`wordmark.stories.tsx:23-39`) ha `argTypes` espliciti e funzionanti tra i componenti header-correlati.
6. **Duplicazioni interne note** (non toccate in questo ciclo):
   - Due theme-toggle: inline in `DashboardHeader.tsx:76-79,165-186` (localStorage `heuresys-theme`) vs componente standalone `theme-toggle.tsx` + `theme-provider.tsx` (mai usato nel layout autenticato di nessuno dei due consumer).
   - Due language-toggle: inline in `DashboardHeader.tsx:149-161` vs componente standalone `LanguagePicker` (mai usato in produzione).
   - Due group-toggle sidebar: `GroupToggle.tsx` (orfano) vs logica duplicata inline in `DashboardSidebar.tsx:116-182`.
   - Tre modelli di breadcrumb: `HeaderBreadcrumb` (tipo inline in `DashboardHeader`), `React.ReactNode` slot in `PageHeader`, `BreadcrumbItem[]` nel componente standalone `Breadcrumbs`.
7. **Elementi visivamente presenti ma non funzionanti in produzione**: hamburger (`onOpenMenu` non passato da nessuno dei due consumer), command-palette trigger (`onOpenCommandPalette` non passato; il componente `CommandPalette` del design system non è mai montato in nessuno dei due consumer), breadcrumb (mai passato in `heuresys-advanced`; passato in `heuresys-datastore`).
8. **Card identità utente è statica**: nessun dropdown/menu di logout collegato — il logout vive altrove (footer sidebar in `heuresys-advanced`).
9. **Gap nel design system stesso** (non solo nei consumer): nessun componente `UserMenu`/`AccountMenu` (avatar + dropdown profilo/logout), nessun `TenantSwitcher`/`OrgSwitcher`. Il design system ha già pronto `NotificationCenter` ("bell icon trigger + dropdown", `notification-center.tsx:19-20`) ma nessuno dei due consumer lo usa.
10. Codice morto trovato (in `heuresys-advanced`, non nel design system): `apps/web/src/components/language-switcher.tsx` (`LanguageSwitcher`), mai renderizzato in nessuna pagina.

## Decisione architetturale

Estrarre da `DashboardHeader.tsx` un sotto-componente per ciascun elemento visivo che oggi è JSX inline senza props proprie, esportarlo individualmente, e dargli una story Storybook sotto il gruppo `Header/` con `argTypes` espliciti. `DashboardHeader` resta l'unico punto di composizione e **mantiene la sua API pubblica invariata** (stesse props, stesso comportamento) — i consumer esistenti non cambiano una riga. Verificato ad ogni task dallo smoke test Playwright esistente (`ui/e2e/storybook-smoke.spec.ts`, copre automaticamente le nuove story) + `pnpm run typecheck` + `pnpm run build`.

Questo è un refactoring "extract component", non un redesign: nessun nuovo comportamento, nessuna nuova prop sui componenti pubblici esistenti oltre a quelle strettamente necessarie a rendere l'oggetto estratto controllabile via Storybook.

### Nuova struttura file

```
ui/src/components/dashboard/header/
  menu-trigger.tsx           (+ .stories.tsx)
  breadcrumb-trail.tsx       (+ .stories.tsx)
  search-trigger.tsx         (+ .stories.tsx)
  language-switcher.tsx      (+ .stories.tsx)
  theme-toggle-button.tsx    (+ .stories.tsx)
  user-identity-card.tsx     (+ .stories.tsx)
  index.ts                   (barrel)
ui/src/components/dashboard/
  DashboardHeader.tsx        (riscritto per comporre i pezzi sopra)
  DashboardHeader.stories.tsx (nuovo — "Header/Dashboard Header (Complete)")
  PaletteDropdown.tsx        (invariato)
  PaletteDropdown.stories.tsx (nuovo)
```

`apps/web/src/components/language-switcher.tsx` in `heuresys-advanced` si chiama uguale a `ui/src/components/dashboard/header/language-switcher.tsx` di questo piano ma sono entità diverse in repository diversi — nessuna collisione di import, ma va segnalato per evitare confusione quando si discuterà il consolidamento (fuori scope).

### Tassonomia Storybook — gruppo `Header/`

| Story title | Componente | Controls |
|---|---|---|
| `Header/Dashboard Header (Complete)` | `DashboardHeader` (assemblato) | `argTypes` su tutte le props pubbliche esistenti |
| `Header/Menu Trigger` | `HeaderMenuTrigger` | `onOpenMenu` (action), `label` (text) |
| `Header/Breadcrumb Trail` | `HeaderBreadcrumbTrail` | `items` (object, via args di esempio) |
| `Header/Search Trigger` | `HeaderSearchTrigger` | `onOpenCommandPalette` (action), `placeholder` (text) |
| `Header/Language Switcher` | `HeaderLanguageSwitcher` | `language` (select IT/EN), `onToggleLanguage` (action) |
| `Header/Palette Switcher` | `PaletteDropdown` | nessuno (componente zero-arg, story documenta il comportamento interno — vedi nota) |
| `Header/Theme Toggle` | `HeaderThemeToggle` | nessuno esposto oggi (comportamento interno via `localStorage`/DOM — stesso limite di `PaletteDropdown`) |
| `Header/User Identity` | `HeaderUserIdentity` | `user` (object: initials/username/role/roleTone) |

Nota su `Palette Switcher` e `Theme Toggle`: non aggiungo props artificiali solo per popolare il pannello Controls — sarebbe un cambiamento di comportamento non richiesto. La story esiste comunque (nome parlante, gruppo corretto, documentazione visibile), ma i Controls restano assenti finché quei componenti non vengono ridisegnati per accettare stato esterno (fuori scope, va deciso a parte).

Il **Logo** (`HeuresysWordmark`) non viene duplicato sotto `Header/`: resta sotto `Brand/Wordmark` (ha già Controls funzionanti, è usato anche fuori dall'header) — la story `Header/Dashboard Header (Complete)` lo mostra comunque nel contesto assemblato.

## Estensione decisa da Enzo (2026-09-03, stesso giorno)

Enzo ha chiesto di portare dentro lo scope 5 dei 6 punti sopra (tutto tranne group-toggle sidebar, che resta fuori scope — appartiene al ciclo Sidebar, non Header) più risposte esplicite a due bivi di design. Decisioni prese, con i fatti verificati che le rendono sicure:

### 1. Consolidare il theme-toggle

**Fatto verificato**: `ThemeProvider` (`ui/src/components/theme-provider.tsx`) è già montato in **entrambi** i consumer — `heuresys-advanced/apps/web/src/providers/AppProviders.tsx:6`, `heuresys-datastore/apps/web/src/app/providers.tsx:4,42`. Zero modifiche richieste ai consumer.

**Rischio noto da correggere**: le due implementazioni condividono la stessa chiave localStorage (`heuresys-theme`) ma logiche diverse — l'header oggi tocca `classList` direttamente, bypassando lo stato React del provider. Se un utente clicca il toggle dell'header, il componente `ThemeProvider` (se montato più in alto, come già accade) non lo sa: il suo state interno resta disallineato dal DOM finché non c'è un remount. È un bug latente reale, non solo una duplicazione cosmetica.

**Decisione**: `HeaderThemeToggle` chiama `useTheme()` dal provider esistente invece di manipolare `classList`/`localStorage` direttamente. Comportamento visibile invariato (bottone binario, icona sole/luna) — cicla tra `'light'` e `'dark'` esplicitamente (non introduce `'system'` nel bottone header, per non cambiare la UX nota; il provider supporta comunque `'system'` per chi lo usa altrove, es. `ThemeToggle` standalone che cicla su 3 stati).

### 2. Consolidare il language-toggle

**Fatto verificato**: `LanguagePicker` (`ui/src/components/i18n/language-picker.tsx`) è un `<select>` HTML generico per N locale (`SUPPORTED_LOCALES`), pensato per selezione multi-lingua. `HeaderLanguageSwitcher` è un bottone singolo che alterna IT/EN. **Non sono la stessa cosa concettualmente** — forzarne la fusione produrrebbe un componente peggiore di entrambi (un select con 2 sole opzioni non è un toggle rapido; un toggle binario non scala a N lingue).

**Decisione**: restano due componenti distinti per due casi d'uso distinti — non è una duplicazione da eliminare, è specializzazione legittima. La correzione reale è nel **naming e nella documentazione**: la story `Header/Language Switcher` dichiara esplicitamente (nella sua descrizione Storybook) che questo è il toggle binario IT/EN usato in produzione, distinto da `I18n/LanguagePicker` (select multi-locale, non usato in produzione da nessuno dei due consumer). Nessun codice di `LanguagePicker` viene toccato.

### 3. Consolidare i modelli di breadcrumb

**Fatto verificato**: `BreadcrumbItem` (`ui/src/components/breadcrumbs.tsx:5-9`: `{label: string; href?: string; onClick?: () => void}`) è un **superset** di `HeaderBreadcrumb` (`{label: string; href?: string}`) — chi oggi passa solo `label`/`href` continua a funzionare identico.

**Decisione**: `HeaderBreadcrumbTrail` adotta il tipo `BreadcrumbItem[]` (rinominando l'alias `HeaderBreadcrumb = BreadcrumbItem[]` per compatibilità del nome pubblico esistente nel barrel). Il terzo modello (`React.ReactNode` slot libero in `PageHeader`) resta invariato — è un catch-all generico per un componente diverso (header di pagina, non topbar), non fa parte di questo consolidamento.

### 4. Wiring del command-palette trigger (⌘K)

**Decisione**: `DashboardHeader` guadagna uno stato interno (`open`/`setOpen`) e monta il vero `CommandPalette` del design system quando il trigger viene cliccato o ⌘K viene premuto. Il *contenuto* dei comandi (quali azioni offrire) è specifico per app — non può essere deciso qui. Nuova prop pubblica, **opzionale e additiva** (non-breaking): `commandPaletteContent?: React.ReactNode` (i figli tipizzati `CommandPalette.Group`/`CommandPalette.Item`, stessi che l'app passerebbe se montasse `CommandPalette` da sé). Se non passata, la palette si apre comunque con un `Command.Empty` ("Nessun comando configurato") invece di un bottone morto — già un miglioramento percepibile senza che nessun consumer debba cambiare una riga.

### 5. Wiring dell'hamburger

**Decisione di Enzo**: apre un drawer con la sidebar, per viewport mobile. Nuovo componente `HeaderMobileDrawer` nel design system (usa `Dialog`/`DialogContent` già esistenti in modalità "slide da sinistra", non un nuovo primitivo). `DashboardHeader` gestisce `open`/`setOpen` internamente; il contenuto del drawer è lo stesso slot `sidebar` che il consumer già passa a `DashboardShell` — per evitare di richiedere una seconda prop duplicata, `DashboardHeader` non riceve la sidebar direttamente (romperebbe l'incapsulamento slot-based di `DashboardShell`): riceve invece `mobileNav?: React.ReactNode`, un nodo opzionale che il consumer passa se vuole un drawer mobile popolato. Additiva, non-breaking.

### 6. Nuovo componente `HeaderUserMenu`

**Decisione di Enzo sul contenuto**: Profilo, Impostazioni, Logout, Cambio tenant/organizzazione (tutte e 4 le voci).

Costruito su primitive già esistenti nel design system (`DropdownMenu`/`DropdownMenuTrigger`/`DropdownMenuContent`/`DropdownMenuItem`/`DropdownMenuSeparator`/`DropdownMenuLabel` da `ui/src/components/dropdown-menu.tsx`, `Avatar`/`AvatarFallback` da `ui/src/components/avatar.tsx`) — nessuna nuova dipendenza esterna.

`HeaderUserMenu` **sostituisce** `HeaderUserIdentity` come elemento montato di default in `DashboardHeader` (la card statica di oggi non ha alcun'azione collegata — un dropdown con le stesse informazioni più le 4 azioni è strettamente più capace, non un cambiamento di scope visivo). `HeaderUserIdentity` (Task 6 del piano originale) resta comunque nel design system come variante "sola lettura" per contesti dove non serve un menu (es. dentro un report stampabile) — non viene rimossa, semplicemente non è più quella di default nell'header.

Props: `user: UserIdentity` (invariato), `tenants?: ReadonlyArray<{id: string; name: string}>` (per "Cambio tenant" — se assente o con 0/1 elementi, la voce non compare), `onSelectTenant?: (id: string) => void`, `onNavigateProfile?: () => void`, `onNavigateSettings?: () => void`, `onLogout?: () => void`. Tutte opzionali: se non passate, la voce di menu è comunque visibile ma il click non fa nulla (stesso pattern di `onOpenMenu`/`onOpenCommandPalette` già esistenti in `DashboardHeaderProps` — coerenza con l'API attuale).

## Fuori scope — registro per un ciclo futuro

1. Consolidare il group-toggle sidebar (`GroupToggle.tsx` orfano vs logica duplicata in `DashboardSidebar.tsx:116-182`) — appartiene al ciclo Sidebar (indagine in corso separatamente, 2026-09-03).
2. Passare `breadcrumb` da `heuresys-advanced/apps/web/src/app/(authenticated)/layout.tsx` (oggi non lo fa) — è una modifica lato consumer, non lato design system; da proporre quando il ciclo Header sarà mergiato.
3. Passare `mobileNav`/`commandPaletteContent` dai due consumer per attivare davvero i nuovi wiring — stesso discorso: le prop esistono e funzionano da subito nel design system, ma restano "spente" finché ciascun consumer non le adotta.
4. Wiring di `NotificationCenter` (già esiste, mai usato) nei due consumer.
5. Rimuovere il codice morto `apps/web/src/components/language-switcher.tsx` in `heuresys-advanced`.
6. Webapp di composizione drag-and-drop per assemblare i gruppi del design system (menzionata da Enzo come direzione futura, non ancora uno spec) — il lavoro di questo piano (sotto-componenti isolati con props/Controls espliciti) è il prerequisito tecnico, ma la webapp stessa è un progetto a sé, da specificare quando Enzo la vorrà affrontare.
