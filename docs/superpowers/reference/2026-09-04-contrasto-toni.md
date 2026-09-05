# Contrasto dei toni su tinta — misure del 2026-09-04

**Validità della misura: 2026-09-04.** I numeri qui sotto invecchiano insieme ai token: se
`theme-heuresys.css` cambia, questa tabella va rifatta, non riletta. Si rigenera con

```bash
node scripts/verify-contrast.mjs
```

(richiede Storybook acceso su `:6006`; esce con codice 1 se anche una sola combinazione fallisce).

---

## Cosa è stato misurato, e come

Per ognuno dei 9 toni e per ciascuna delle 3 tinte di sfondo (10%, 15%, 20%) si misura il rapporto
di contrasto WCAG del testo che vi sta sopra, in entrambi i temi: **54 combinazioni**.

Il compositing non è ricalcolato a mano. Tailwind 4 compila `/20` in `color-mix(in oklab, …)`, e
riscrivere la conversione OKLab→sRGB sarebbe stata una fonte di errore reale: lo script dipinge il
fondo opaco e poi la tinta traslucida su un `<canvas>` e rilegge il pixel. È la pipeline di
rendering del browser a dare la verità, cioè gli stessi pixel che vede un utente.

Lo script verifica anche che **la classe esista** nel CSS compilato: una utility Tailwind mai
generata non dà errore, si limita a non dipingere. Le due verifiche stanno insieme perché sono la
stessa riga di codice vista da due lati — il difetto delle classi interpolate e quello del
contrasto abitavano le stesse righe.

## Il risultato in una frase

**Il token pieno su una tinta del proprio tono non è leggibile in tema chiaro.** Su 27 combinazioni
in chiaro, **26 sono sotto la soglia AA di 4,5:1** e l'unica che passa lo fa per un soffio
(`palette-3/10`, 4,91:1). Con la rampa `-ink` tutte e 54 passano, con margine.

## Tema chiaro — prima (token pieno) e dopo (rampa ink)

| Tinta | token pieno | ink | Tinta | token pieno | ink |
|---|---|---|---|---|---|
| `bg-success/10` | **2,95** | 6,38 | `bg-palette-1/10` | **4,49** | 7,57 |
| `bg-success/15` | **2,78** | 6,03 | `bg-palette-1/15` | **4,21** | 7,10 |
| `bg-success/20` | **2,64** | 5,71 | `bg-palette-1/20` | **3,89** | 6,57 |
| `bg-warning/10` | **4,35** | 6,15 | `bg-palette-2/10` | **2,22** | 6,64 |
| `bg-warning/15` | **4,08** | 5,76 | `bg-palette-2/15` | **2,11** | 6,33 |
| `bg-warning/20` | **3,81** | 5,38 | `bg-palette-2/20` | **2,01** | 6,02 |
| `bg-danger/10` | **4,12** | 7,10 | `bg-palette-3/10` | 4,91 | 7,73 |
| `bg-danger/15` | **3,84** | 6,60 | `bg-palette-3/15` | **4,56** → vedi nota | 7,19 |
| `bg-danger/20` | **3,53** | 6,08 | `bg-palette-3/20` | **4,22** | 6,65 |
| `bg-info/10` | **4,49** | 7,57 | `bg-palette-4/10` | **1,99** | 6,56 |
| `bg-info/15` | **4,21** | 7,10 | `bg-palette-4/15` | **1,92** | 6,35 |
| `bg-info/20` | **3,89** | 6,57 | `bg-palette-4/20` | **1,85** | 6,10 |
| `bg-primary/10` | **4,49** | 7,57 | | | |
| `bg-primary/15` | **4,21** | 7,10 | | | |
| `bg-primary/20` | **3,89** | 6,57 | | | |

In grassetto i valori sotto 4,5:1. *(`palette-3/15` a 4,56 passa la soglia del testo ma resta
sotto il margine che ci si vuole tenere; usa l'ink come tutti gli altri.)*

**Il peggiore dell'intero censimento è `palette-4` su tinta 20%: 1,85:1.** Il piano d'origine
indicava 2,11:1 come caso peggiore — la misura diretta lo smentisce in peggio.

## Tema scuro

In scuro il token semantico è già stato schiarito per l'AA su `--card`, quindi ink e token pieno
coincidono e passano tutti — **con una sola eccezione, che è stata corretta**: `palette-3` (viola
`#B07BFA`) su tinta 20% si fermava a **4,46:1**, appena sotto soglia. È l'unico dei quattro a non
passare, quindi il suo ink in dark **non** coincide col token: un gradino più chiaro
(`violet-300 #C4B5FD`) porta il rapporto a 7,19:1.

## Cosa è cambiato nel tema

La rampa `-ink` esisteva solo per i quattro toni semantici. Ora copre anche la palette di marca e
`primary`:

| Token | chiaro | scuro |
|---|---|---|
| `--palette-1-ink` | `#1E40AF` | `#5E9DF5` (= token) |
| `--palette-2-ink` | `#155E75` | `#34D3DC` (= token) |
| `--palette-3-ink` | `#5B21B6` | `#C4B5FD` (**≠** token, vedi sopra) |
| `--palette-4-ink` | `#92400E` | `#F8BD55` (= token) |
| `--primary-ink` | `#1E40AF` | `#5E9DF5` (= token) |

## Copertura della correzione

- **27 sostituzioni** in **14 componenti**: ovunque il testo o un'icona stessero su una tinta del
  proprio tono, il colore passa dal token pieno alla rampa ink.
- Le **icone** hanno soglia 3:1 anziché 4,5:1, ma sono state trattate come il testo: l'ink le porta
  tutte sopra 5,3:1, e distinguere due soglie in una mappa di classi avrebbe aggiunto un caso
  particolare senza alcun guadagno visivo.
- Il testo che sta su superficie **neutra** (card, sfondo) continua a usare il token pieno: lì è
  corretto ed è già AA. La distinzione vive nel modulo `src/lib/tone-classes.ts` come due campi
  diversi, `text` e `textOnTint`, così la scelta è esplicita nel punto d'uso.

## Cosa questa misura NON copre

- Il contrasto **fra elementi grafici adiacenti** (bordi contro sfondo): fuori scope, non misurato.
- Le combinazioni che nascono da `className` passate dall'esterno da un consumatore.
- Il resto delle regole WCAG: qui si guarda il solo contrasto di colore. L'inventario completo con
  axe è il task **B5**, ancora da eseguire.
