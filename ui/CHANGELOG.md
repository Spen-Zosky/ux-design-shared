# Changelog

Le versioni seguono [semver](https://semver.org/lang/it/). Ogni voce dice cosa cambia **per chi usa
la libreria**, non cosa è stato toccato dentro.

---

## 1.1.0 — 2026-09-05

Nessuna API rimossa o rinominata: chi aggiorna da 1.0.0 non deve cambiare una riga. **L'aspetto però
cambia** in alcuni punti, e in meglio: vedi "Colori" qui sotto.

### Correzioni che vi raggiungono anche senza toccare nulla

**Colori che non venivano disegnati affatto.** Dodici componenti costruivano il nome della classe CSS
mentre giravano — `` `bg-${tone}/20` `` — e Tailwind, che genera le utility leggendo il *testo* dei
sorgenti, non produceva quelle regole: la classe non esisteva e lo sfondo non veniva dipinto.
Verificato sul CSS realmente compilato di un progetto consumer: `.bg-palette-3\/20` non c'era, e
l'avatar dell'header restava senza sfondo. **22 occorrenze corrette in 11 file.** Ora tutte le classi
sono stringhe intere, che Tailwind vede.

Componenti interessati: `AlertBanner`, `AuditFeed`, `ErrorRateBreakdown`, `IncidentTimeline`,
`KPIStrip`, `LogStream`, `RBACMatrix`, `SQLSlowQueryTable`, `TenantFleetTable`, `HeaderUserIdentity`,
`HeaderUserMenu`.

**Colori.** Il testo posato su una tinta del proprio tono non raggiungeva la soglia di leggibilità
WCAG AA: in tema chiaro **26 combinazioni su 27** stavano sotto 4,5:1, la peggiore a **1,85:1**. Ora
quel testo usa la rampa `-ink`, e tutte e 54 le combinazioni (9 toni × 3 tinte × 2 temi) passano con
margine. **Conseguenza visibile**: alcuni testi e icone su sfondo colorato appaiono più scuri in tema
chiaro. È voluto, ed è la correzione.

27 sostituzioni in 14 componenti, fra cui `StatusPill`, `IntegrationHealthPill`, `Admonition`,
`Banner`, `RBACMatrix`, `DiffViewer`, `Stepper`, `AppShell`, `Chatbot`.

### Novità

**La rampa `-ink` copre ora anche la palette di marca e `primary`.** Nuovi token nel tema spedito
(`@heuresys/ui/theme`): `--palette-1-ink`, `--palette-2-ink`, `--palette-3-ink`, `--palette-4-ink`,
`--primary-ink`, con le rispettive utility `text-*-ink`. Usateli per il testo posato su una tinta
dello stesso tono; il token pieno resta giusto sul testo su superficie neutra.

**`useThemeOptional()`** — nuovo export. Come `useTheme()`, ma restituisce `null` invece di lanciare
quando manca il `ThemeProvider`. Serve ai componenti per cui il tema è un accessorio e non la ragione
d'esistere. `HeaderThemeToggle` ora lo usa: senza provider resta al suo posto disabilitato invece di
far cadere l'header che lo contiene — e con esso la pagina.

`useTheme()` **non cambia**: continua a lanciare, ed è ancora la scelta giusta per chi il tema lo
governa davvero.

**`roleTone` è ora tipizzato** su `UserIdentity`. Era `string`; ora è un'unione **aperta**
(`ToneName | (string & {})`): ottenete l'autocompletamento sui valori validi senza che il vostro
codice smetta di compilare se il valore nasce da un ternario. Un valore fuori elenco degrada a un tono
di ripiego invece di produrre una classe inesistente.

**Ripiego unificato per il tono del ruolo.** Un utente senza `roleTone` compariva con l'iniziale viola
e la qualifica ambra nello stesso blocco: due default diversi, per svista. Ora è uno solo.

### Rinominato nella vetrina (non nel codice)

Le story Storybook del guscio sono state riorganizzate: il gruppo `Header/` è diventato
`Layout/Header/`, e `Dashboard/DBSupervisorSidebar` è ora `Dashboard/DB Supervisor Nav Item` (non è
una sidebar: è una voce che vive dentro una sidebar). **Nessun componente è stato rinominato**: cambia
solo dove li trovate nella vetrina.

### Sotto il cofano, se vi interessa

- La documentazione automatica dei componenti (tabella delle prop) ora esiste: 124 pagine. Prima il
  codice la dichiarava ma l'addon che la genera non era installato.
- La vetrina si costruisce ripartendo sempre da zero: la cache non invalidata produceva silenziosamente
  una vetrina con 25 story in meno.

**Restano due debiti noti e misurati**, che non si chiudono in questa versione: 441 violazioni di
accessibilità (inventario in `docs/superpowers/reference/2026-09-05-inventario-accessibilita.md`) e
109 controlli della vetrina che non producono effetto
(`2026-09-05-inventario-controls.md`). Nessuno dei due riguarda il funzionamento dei componenti nei
vostri prodotti.

---

## 1.0.0

Prima versione pubblicata: estrazione di `@heuresys/ui` da `evo.heuresys.com` come libreria
condivisa, con il tema di marca spedito insieme ai componenti.
