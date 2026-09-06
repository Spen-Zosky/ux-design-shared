# Proposta sul contrasto — che cosa cambiare, e cosa no

**Misure del 2026-09-06**, prese con `@axe-core/playwright` 4.13 su tutte le voci della vetrina nei
due temi, e verificate una seconda volta con una sonda indipendente che legge i pixel da un
`<canvas>` — la stessa tecnica di `scripts/verify-contrast.mjs`, perché Tailwind 4 compila le
trasparenze in `color-mix(in oklab, …)` e riscrivere quella conversione a mano sarebbe una fonte di
errore. I due strumenti concordano (axe: 4,3 · sonda: 4,31), quindi i numeri qui sotto sono
misurati due volte con metodi diversi.

Si rigenera con:

```bash
SB_STATIC=1 pnpm exec playwright test qa-a11y
node scripts/a11y-riepilogo.mjs
```

---

## La scoperta che ridimensiona il problema

Le violazioni di contrasto sono **218**, che toccano **666 elementi**. Sembrava un ciclo di lavoro
sui colori di marca. Non lo è: **solo l'11,7% di quegli elementi richiede una decisione sui
colori.** Il resto ha cause diverse e correzioni che non chiedono di scegliere niente.

| | elementi | quota | che cosa serve davvero |
|---|---|---|---|
| La pagina di documentazione resta bianca in tema scuro | **350** | 52,6% | una regola CSS nella vetrina |
| Grigi scritti a mano invece dei token | **144** | 21,6% | sostituzione meccanica |
| **Testo posato sulle tinte piene** | **78** | **11,7%** | **una decisione, ed è questa proposta** |
| Una tinta usata come colore di testo | 57 | 8,6% | usare la rampa `-ink`, che esiste già |
| Il resto | 37 | 5,6% | caso per caso |

### Il gruppo più grosso non è un problema di colori

`.sbdocs-wrapper`, il contenitore delle pagine di documentazione, resta **bianco** anche quando il
tema scuro è attivo. Misurato nel browser: con `<html class="dark">` il corpo della pagina diventa
`#0D1017` e il testo `#F2F4F8`, ma quel contenitore resta `rgb(255,255,255)`. Testo quasi bianco su
bianco: **1,1:1**, contro una soglia di 4,5.

È lo stesso difetto che il ciclo del 2026-09-04 ha corretto per gli esempi — `preview.css` dipinge
`html`, `body` e `.sb-show-main` — rimasto aperto per le pagine di documentazione, che non erano
ancora state generate a quel tempo. Nessun colore di marca è in causa.

### Il secondo gruppo è un'incoerenza, non una scelta

`text-neutral-500` compare in **27 file**. È un grigio di Tailwind scritto a mano, che non fa parte
del tema e non cambia col tema: `#737373` su fondo scuro dà **4,01**, sotto la soglia. Il token
equivalente, `--muted-fg`, sullo stesso fondo dà **7,49**. Non c'è niente da decidere: c'è da usare
il token.

---

## La proposta vera e propria — i 78 elementi

Il difetto è sempre lo stesso: **il testo che la libreria posa sulle tinte piene**. Un badge verde
con la scritta bianca, un badge rosso con la scritta bianca.

Ci sono due modi di risolverlo, e il secondo è quello che raccomando.

- **Scurire le tinte**, tenendo il testo bianco. Funziona, ma cambia i colori di marca: il verde
  dovrebbe passare da `#16A34A` a `#19872B`, una differenza che si vede.
- **Cambiare il colore del testo**, tenendo le tinte. I colori di marca restano **identici**: cambia
  solo cosa ci si scrive sopra. È anche la pratica corrente — il verde e l'ambra vogliono testo
  scuro, il blu e il rosso testo chiaro.

### Quello che propongo

| Dove | Testo ora | Testo proposto | Contrasto ora | Dopo | Soglia |
|---|---|---|---|---|---|
| Verde pieno, tema chiaro | bianco | **scuro** | 3,21 | **5,25** | 4,5 |
| Verde pieno, tema scuro | bianco | **scuro** | 2,22 | **7,60** | 4,5 |
| Ambra pieno, tema chiaro | scuro | **bianco** | 3,45 | **4,89** | 4,5 |
| Rosso pieno, tema scuro | bianco | **scuro** | 3,50 | **4,82** | 4,5 |

E **un solo ritocco a una tinta**, perché nessun colore di testo la salva:

| Dove | Ora | Proposto | Contrasto ora | Dopo |
|---|---|---|---|---|
| Rosso pieno, tema chiaro | `#E6293F` | `#E2243C` | 4,31 | **4,50** |

Quel rosso si sposta di un gradino di luminosità: affiancati, la differenza è al limite del
percepibile, ed è l'unico modo di superare la soglia senza cambiare il colore della scritta anche in
tema chiaro (dove il bianco sul rosso è la convenzione più solida che abbiamo).

### Cosa NON cambia

**Nessun colore di marca.** Il blu `#2563EB`, il verde `#16A34A`, l'ambra `#B45309`, il viola
`#7C3AED`, il ciano `#06B6D4` restano esattamente dove sono, in entrambi i temi. Cambia il colore
delle scritte che vi si posano sopra, più un gradino sul rosso.

Non cambia neanche la rampa `-ink` costruita il 2026-09-04: resta valida e anzi è la risposta pronta
per altri 57 elementi (una tinta usata come colore di testo su fondo chiaro — `text-success` su
sfondo pagina dà 3,18, mentre `text-success-ink` supera la soglia con margine).

---

## Che effetto ha sul consumer

`heuresys-advanced` usa `@heuresys/ui` 1.1.0. Le modifiche proposte cambiano l'aspetto di ciò che è
già in produzione lì: **le scritte dentro i badge verdi, ambra e rossi**. Il cambiamento è visibile
— una scritta scura al posto di una chiara si nota — anche se nessuna tinta si sposta.

Se preferisci vederlo prima di decidere, il modo è pubblicare i campioni affiancati, prima e dopo,
invece di leggerne i numeri.

---

## Le domande

1. **Va bene cambiare il colore delle scritte invece delle tinte?** È la strada che raccomando:
   tiene fermi i colori di marca, chiude 78 elementi su 78 e non tocca la palette.
2. **Il rosso può spostarsi di un gradino** (`#E6293F` → `#E2243C`)? È l'unica tinta che si muove.
3. **Gli altri tre gruppi li faccio senza altre domande?** Non contengono scelte estetiche: la
   pagina di documentazione va dipinta, i grigi a mano vanno sostituiti coi token, e la rampa `-ink`
   esiste già. Da soli valgono **551 elementi su 666**.
