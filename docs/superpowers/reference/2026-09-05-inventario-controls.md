# Inventario dei Controls — misura del 2026-09-05

**Validità: 2026-09-05.** Perimetro: tutte le **380 story** (le pagine di documentazione non hanno
Controls propri), guidate dalla UI manager contro la vetrina statica. Nessun campionamento.

Si rigenera con:

```bash
SB_STATIC=1 pnpm exec playwright test qa-controls
node scripts/controls-riepilogo.mjs
```

---

## Il totale

| | |
|---|---|
| Story esaminate | **380** |
| Controlli trovati | **568** |
| Con effetto visibile | **434** (76%) |
| **Senza effetto** | **109** (19%) |
| Non provati | 25 (5%) |
| Widget non corrispondente al tipo | **0** |

Per tipo di widget: 212 testo, 171 select, 81 radio, 51 numero, 49 spunta, 4 fra data, ora e generici.

## I 109 controlli che non fanno niente

Sono controlli che la vetrina **espone e documenta**, e che cambiati non producono alcun effetto
visibile. Chi consulta la documentazione vede una prop, la prova, non succede nulla, e non ha modo di
sapere se è la prop a essere finta o il componente a essere rotto.

| Componente | Controlli inerti |
|---|---|
| Components/Input | 13 |
| Dashboard/KpiRing | 13 |
| Brand/Wordmark | 9 |
| Components/Button | 9 |
| Charts/NetworkGraph | 8 |
| Components/Fab | 7 |
| Dashboard/IntegrationHealthPill | 7 |
| Charts/EchartsCard | 5 |
| Dashboard/ErrorRateBreakdown | 5 |

I nomi che ricorrono di più: `variant` (21), `tone` (15), `height` (8), `size` (7), `disabled` (7).

**La causa è quasi sempre la stessa**, e non è un difetto dei componenti: sono story che dichiarano
un `render:` proprio, il quale costruisce l'esempio a mano e **ignora gli args** ereditati dagli
`argTypes` del meta. Il pannello Controls mostra allora le prop del componente, ma quella particolare
story non le usa. `Components/Input › Email With Icon` ne è il caso tipico: espone `variant`,
`inputSize` e `disabled`, e li ignora tutti e tre.

**14 dei 109 sono in story-vetrina** (`All Variants`, `Size Matrix`, `Variant Matrix`, gallerie): lì
l'inerzia è **corretta e voluta** — la story mostra tutte le varianti insieme, quindi non può
obbedire a un `variant` singolo. Restano **95 casi in story ordinarie**, dove la prop inerte non ha
una ragione visibile.

### Le tre strade, in ordine di preferenza

1. **Far usare gli args al `render`** dove è semplice — è la correzione vera: il controllo torna a
   fare quello che promette.
2. **Nascondere i controlli inerti** in quella story (`argTypes: { variant: { table: { disable:
   true } } }`), quando la story esiste apposta per mostrare un caso fisso. Onesto e a costo quasi
   nullo.
3. **Lasciarli e dichiararlo** nella descrizione della story. È la strada peggiore, ma meglio del
   silenzio attuale.

Per le 14 story-vetrina la strada 2 è quella giusta e basta a chiudere il caso.

**Non ho applicato nessuna delle tre**: 95 story sono un ciclo di lavoro a sé, e la scelta fra
correggere e nascondere va fatta caso per caso guardando l'intento della story. I numeri servono a
decidere, non sostituiscono la decisione.

## Zero disallineamenti fra widget e tipo

Nessun controllo usa un widget incompatibile col tipo dichiarato: le enumerazioni hanno `select` o
radio, i booleani una spunta, i numeri un campo numerico. Il piano segnalava come caso sospetto
`roleTone?: string`, servito da testo libero mentre avrebbe voluto un'unione — **quel caso è stato
risolto in questo stesso ciclo dal task B3**, che ha dato al tipo un'unione aperta con
autocompletamento.

## I 25 controlli non provati, uno per uno per categoria

Non è un cap silenzioso, è un elenco:

- **callback `on*`** — cambiarli non ridisegna nulla per definizione;
- **`className`** — l'effetto dipende da cosa si scrive, quindi non è verificabile in automatico;
- **widget rari** (`input[date]`, `input[time]`, campi generici) — 4 casi che il banco non sa
  manipolare.

**Erano 101 nella prima esecuzione.** Gli 81 controlli `radio` finivano tutti qui perché il banco non
sapeva cliccarli: un buco del **14%** travestito da risultato. Aggiunto il ramo che li gestisce, 76
sono rientrati nella misura vera.

## Cosa questo inventario NON copre

- Se l'effetto prodotto sia quello **giusto**: qui si verifica che qualcosa cambi, non che cambi
  correttamente.
- I controlli che appaiono solo dopo un'interazione (un pannello che si apre, uno stato condizionale).
- Le pagine di documentazione, che non espongono Controls propri.
