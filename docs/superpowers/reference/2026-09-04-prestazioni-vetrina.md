# Prestazioni della vetrina e stabilità della suite — misure del 2026-09-04

**Validità: 2026-09-04**, macchina Windows di sviluppo, 380 story più 1 test di diagnosi.
Si rigenera rieseguendo `pnpm run test:e2e` (dev server) e `SB_STATIC=1 pnpm exec playwright test`
(vetrina statica).

---

## Il risultato in una frase

**Servire la vetrina già costruita dimezza il tempo e azzera la flakiness.** Il cancello di
prontezza, da solo, non basta: era la cura di un sintomo che non era la causa.

| Modo | Durata | Esito | Note |
|---|---|---|---|
| dev server, a caldo, senza cancello | **6,5 min** | 379/381 | flaky: AppShell, VideoPlayer |
| dev server, a caldo, con cancello | **6,56 min** | 379/381 | flaky: ThemeProvider ×2 |
| **vetrina statica, 1ª passata** | **3,3 min** | **381/381** | |
| **vetrina statica, 2ª passata** | **3,3 min** | **381/381** | |
| *(riferimento 2026-09-03: dev a freddo)* | *15,1 min* | *—* | *misura di una sessione precedente* |

Il criterio del task B6 — «zero fallimenti in **entrambe** le passate consecutive, non solo quelli
noti» — è soddisfatto dalla sola strada statica.

## Perché il cancello di prontezza non bastava

L'ipotesi di partenza era che i fallimenti nascessero dal server ancora freddo all'avvio dei worker.
Il cancello che ho aggiunto in `globalSetup` chiude *quella* porta: apre una story sentinella,
attende che renda davvero e che il service worker di MSW sia **attivo** (non solo registrato), e
solo allora lascia partire i test. A caldo si chiude in 1,6 secondi.

Non è servito a nulla per la flakiness, ed è un risultato utile: **scalda una story, non i 380 grafi
di import che restano da compilare**. Con `storybook dev` Vite trasforma i moduli su richiesta, e
quelle compilazioni continuano ad accavallarsi *dentro* la corsa, sparse, ogni volta su story
diverse — ecco perché a ogni giro i rossi cambiavano nome (Toast, ThreeScene, Accordion,
LottiePlayer, Button, VideoPlayer, Card, AppShell, ThemeProvider: **nove occorrenze** contate in
questo ciclo, tutte curate alzando un timeout).

Il build statico compila tutto in anticipo. Non resta niente da accavallare.

**Il cancello resta**, per due ragioni misurate: protegge il modo dev, che rimane il default per lo
sviluppo quotidiano; e ha intercettato subito il difetto del paragrafo seguente, fallendo con un
messaggio chiaro invece di lasciar produrre 380 rossi indistinguibili da difetti veri.

## Il difetto che questa misura ha scoperto — build silenziosamente incompleto

Il primo build statico ha prodotto una vetrina con **357 story invece di 380**. Mancavano **25
story**, fra cui l'**intero gruppo `Header/` (17)**, le tre di `StatusPill`, `KPIStrip › Default`,
entrambe le `RbacMatrix` e `DataTableWithCrossHair › Raw Html Table`: cioè quasi tutto ciò che le
tre PR di questo ciclo avevano aggiunto.

**Causa**: `node_modules/.cache/storybook` datata **3 settembre 16:37**, mentre le story mancanti
sono arrivate su `main` il **4 settembre**. `storybook build` ha riusato l'indice della cache senza
accorgersi che i sorgenti erano cambiati, e **senza emettere un solo avviso**. Svuotata la cache, lo
stesso comando ne ha prodotte 380.

**Perché conta più di un fastidio locale**: la vetrina viene pubblicata su GitHub Pages a partire da
questo build. Una cache vecchia sulla macchina che pubblica avrebbe messo online un design system
amputato di un quarto delle novità, in silenzio — nessun errore, nessun test rosso, solo voci che
non ci sono.

**Rimedio applicato**: `build-storybook` ora esegue `clean` prima di costruire (lo script `clean`
esisteva già e rimuove `storybook-static` e `node_modules/.cache`). Costa la ricostruzione della
cache di Vite a ogni build; il build misurato dopo la pulizia è di **1,43 min**, contro i 3,12 del
build che usava la cache stantia — quindi in questo caso la pulizia non è nemmeno costata tempo.

## Peso della vetrina costruita

| Voce | Peso |
|---|---|
| `storybook-static` completo | **16 MB** |
| di cui `assets/` | 11 MB |

Dieci file più pesanti:

| File | Peso |
|---|---|
| `iframe-*.js` (runtime del preview) | 1,4 MB |
| `echarts-card.stories-*.js` | 1,1 MB |
| `three-scene.stories-*.js` | 888 KB |
| `password-strength.stories-*.js` | 804 KB |
| `wardley-*.js` | 600 KB |
| `mermaid-diagram.stories-*.js` | 600 KB |
| `axe-*.js` | 572 KB |
| `cytoscape.esm-*.js` | 432 KB |
| `lottie-player.stories-*.js` | 320 KB |
| `motion.stories-*.js` | 312 KB |

Sono bundle **per story**, caricati solo quando quella story si apre: il peso totale non è ciò che
un visitatore scarica. `password-strength` a 804 KB è l'unico che sorprende per il rapporto fra peso
e apparenza del componente, e merita uno sguardo — annotato, non ancora indagato.

## Story più lente (vetrina statica)

Nessuna supera i 2 secondi, contro i 6+ che alcune raggiungevano sotto il dev server:

| Story | Tempo |
|---|---|
| Backgrounds › Aurora | 1,9 s |
| *(diagnosi UI d'errore)* | 1,7 s |
| Backgrounds › Mesh Custom Colors | 1,6 s |
| Mermaid › Flowchart | 1,6 s |
| ThreeScene › Default | 1,6 s |

## Cosa NON è stato misurato

- Il tempo di **avvio a freddo del dev server** con il cancello attivo: il riferimento di 15,1 min
  viene da una sessione precedente ed è stato lasciato tale, perché la strada statica lo rende una
  curiosità e non un dato su cui decidere.
- Il **primo render percepito** nel browser di una persona, che non è il tempo della suite.
- Il comportamento in CI, dove il parallelismo è fissato a 2 worker: qui i worker sono automatici.

## Raccomandazione

Usare la vetrina statica per ogni corsa completa — in CI senz'altro, e in locale quando si vuole un
verdetto affidabile — e tenere il dev server per il lavoro interattivo. La variabile `SB_STATIC=1`
sceglie la strada; la configurazione di Playwright fa il resto.
