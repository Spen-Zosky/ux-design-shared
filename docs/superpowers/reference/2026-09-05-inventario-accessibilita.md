# Inventario di accessibilità — misura del 2026-09-05

**Validità: 2026-09-05.** Perimetro: tutte le **504 voci** della vetrina (380 story + 124 pagine di
documentazione), ciascuna esaminata **nei due temi**, con `@axe-core/playwright` 4.13 contro la
vetrina statica. Nessuna esclusione.

Si rigenera con:

```bash
SB_STATIC=1 pnpm exec playwright test qa-a11y
node scripts/a11y-riepilogo.mjs
```

---

## Perché prima si misura e basta

`addon-a11y` è installato da tempo e configurato con `rules: []`: compare nella barra degli
strumenti, mostra i suoi risultati, e **non fa fallire niente**. È decorativo. Il task chiede di
trasformarlo in un cancello, e la prima cosa da sapere è quanto è alto il muro — altrimenti la soglia
la si sceglie a caso e la si abbassa alla prima corsa rossa.

Questo inventario **non corregge nulla**. Conta.

## Il totale

**441 violazioni**, su 504 voci × 2 temi.

| Gravità | Numero |
|---|---|
| `critical` | **76** |
| `serious` | **269** |
| `moderate` | 68 |
| `minor` | 28 |

## Le regole che pesano

| Regola | Occorrenze | Che cosa segnala |
|---|---|---|
| `color-contrast` | **217** | testo sotto la soglia di contrasto |
| `listitem` | 52 | un `<li>` fuori da `<ul>`/`<ol>` |
| `landmark-unique` | 26 | due punti di riferimento identici nella stessa pagina |
| `label` | 24 | un campo senza etichetta associata |
| `heading-order` | 22 | livelli di intestazione saltati |
| `button-name` | 20 | un bottone senza nome accessibile |
| `empty-table-header` | 16 | intestazione di tabella vuota |
| `aria-required-children` | 14 | un ruolo ARIA senza i figli che richiede |
| `aria-allowed-role` | 12 | ruolo non ammesso su quell'elemento |
| `landmark-no-duplicate-banner` | 12 | più di un `banner` nella stessa pagina |

## Il contrasto: 217, e non contraddicono la correzione di ieri

Il task B4 ha corretto **il testo di un tono posato su una tinta dello stesso tono** — 27 occorrenze
in 14 file, tutte verificate a 54/54 combinazioni AA. Queste 217 sono **un'altra famiglia**, e
convivono senza contraddizione:

- **138 in tema scuro contro 79 in chiaro.** Il tema scuro è il meno curato dei due: la rampa `-ink`
  nasce per il chiaro, dove il problema era acuto, e in scuro coincide quasi sempre col token pieno.
- **93 su pagine di documentazione contro 124 su story.** Le pagine docs sono state generate solo
  ieri (prima l'addon non c'era): il loro contrasto non è mai stato guardato da nessuno, ed è
  interamente debito nuovo — nuovo per noi, non introdotto da noi.
- Le restanti riguardano testo su superfici diverse dalle tinte di tono, che B4 non toccava per
  definizione.

**Non è una regressione**: è la parte del debito che B4 non aveva nel mirino, ora visibile perché
per la prima volta qualcuno l'ha misurata su tutte le voci e in entrambi i temi.

## Le voci che pesano di più

| Voce | Violazioni |
|---|---|
| Collab/KanbanBoard › Docs | 14 |
| Components/AppShell › Docs | 11 |
| Collab/KanbanBoard › Default | 10 |
| Collab/KanbanBoard › Empty | 8 |
| Components/PageHeader › Docs | 8 |
| Layout/Header/Dashboard Header (Complete) › Docs | 7 |
| Layout/Dashboard Sidebar › Docs | 6 |

`KanbanBoard` da solo raccoglie 32 violazioni fra le sue tre voci: è il candidato naturale per il
primo intervento, e probabilmente una sola correzione strutturale ne chiude molte.

## La soglia proposta

**Raccomandazione: far fallire su `critical` e `serious`.** È la soglia che il piano suggeriva, e i
numeri la confermano — coprirebbe 345 violazioni su 441, lasciando fuori `moderate` e `minor` che
sono in larga parte rifiniture.

**Ma non è attivabile oggi**: accesa adesso, la suite sarebbe rossa su decine di voci e nessuno
potrebbe più distinguere una regressione nuova da un debito vecchio. La sequenza sensata è:

1. **Adesso** — l'inventario esiste e si rigenera con un comando. Nessun cancello.
2. **Poi** — un ciclo dedicato alla correzione di massa, cominciando da `KanbanBoard` e dalle pagine
   docs, che insieme fanno la fetta più grossa.
3. **Solo alla fine** — si accende il cancello su `critical` + `serious`, quando il numero da
   difendere è zero e ogni rosso nuovo significa davvero qualcosa.

Accendere il cancello prima del punto 3 significherebbe o una suite permanentemente rossa, o una
lista di eccezioni così lunga da equivalere a non avere il cancello.

**La correzione di massa è un ciclo a sé, da decidere con Enzo coi numeri di questo documento in
mano.** Non è compresa in quello corrente.

## Due note sul metodo

- **Versioni di axe diverse fra i due strumenti.** I test unitari usano `jest-axe`, che si porta
  dietro `axe-core` **3.5.6**; qui si usa `@axe-core/playwright` **4.13**. Le due versioni possono
  legittimamente contare regole diverse, e un numero preso di là non è confrontabile con uno preso
  di qua. Allinearle è un lavoro a sé, annotato e non svolto.
- **Un difetto della prima misura, corretto.** La prima esecuzione accumulava tutto in memoria e
  scriveva alla fine, il che costringeva i test in modalità seriale — dove un fallimento **salta**
  quelli successivi. La corsa si fermò su `XR/ThreeScene` lasciando **7 voci non esaminate**, e il
  totale (428) era quindi incompleto. Ora ogni voce scrive il proprio file, i test sono indipendenti,
  e la copertura è 504 su 504.

## Cosa questo inventario NON copre

- Le violazioni che axe non sa vedere: ordine di lettura, senso delle etichette, uso reale con uno
  screen reader.
- Gli stati che richiedono interazione (menu aperti, modali, focus dentro un dialog): axe guarda la
  pagina come si presenta al caricamento.
- Il contrasto degli elementi grafici, che ha soglia 3:1 e una misura sua in
  `2026-09-04-contrasto-toni.md`.
