# Ciclo — un solo posto per i colori

**Aperto**: 2026-09-07 · **Mandato di Enzo**: «unifica i due file di colori».

Nasce da una scoperta del ciclo precedente: una correzione ai colori scritta in `tokens.css` non
ebbe **alcun** effetto, perché quel file non lo importa nessuno. Lo stato si legge da questa tabella.

---

## Che cosa sono davvero i due file

Non sono due copie: sono due contratti con una zona di sovrapposizione, ed è la zona a essere
pericolosa.

| | `globals.css` | `tokens.css` |
|---|---|---|
| Importato a runtime | **sì**, è `@heuresys/ui/styles` | **no, da nessuno** |
| Che cosa dichiara | solo ciò che nessun consumatore fornisce | l'insieme completo |
| Token in comune | **16** | 16 |
| Token esclusivi | 3 | **27** |

I 16 in comune sono il rischio: cambiarne uno nel file sbagliato è esattamente ciò che è successo.

## Le tre cose morte che l'indagine ha trovato

Misurate leggendo il CSS **compilato** della vetrina, non i sorgenti.

1. **La scala tipografica fluida non è mai stata applicata.** `tokens.css` definisce
   `--text-xs: clamp(0.7rem, 0.66rem + 0.2vw, 0.78rem)` e simili; nel CSS compilato
   `--text-xs` vale `.75rem`, cioè il valore predefinito di Tailwind. Le 138 occorrenze di
   `text-xs` nei componenti usano quello.
2. **Lo stesso per i raggi**: `--radius-md` dovrebbe valere `0.5rem`, nel compilato è `.375rem`.
3. **Le durate di movimento non esistono affatto** nel CSS compilato — e
   `a11y/accessibility-panel.tsx` esegue `html.style.setProperty('--motion-duration-fast', '0ms')`,
   cioè pilota una variabile che nessuno legge.

E una quarta, che è un difetto di accessibilità vero:

4. **`prefers-reduced-motion` è rispettato solo in parte.** Il blocco universale — `*`, `*::before`,
   `*::after` — sta in `tokens.css` e non è attivo. Quello attivo, in `hover-affordance.css`, elenca
   quattordici selettori: tutto il resto, comprese le animazioni di framer-motion, continua a
   muoversi per chi ha chiesto che non lo faccia.

---

## Tabella dei deliverable

| id | cosa | chi | fatto significa | stato |
|---|---|---|---|---|
| 1 | I colori in un posto solo | io | `tokens.css` non dichiara più un solo token di colore; `globals.css` resta l'unica fonte | **fatto** |
| 2 | Il movimento ridotto rispettato davvero | io | il blocco universale vive dove è importato, e il CSS compilato lo contiene | **fatto** — verificato nel compilato |
| 3 | `tokens.css` dice cosa è | io | l'intestazione dichiara che non è importato e dove stanno i colori | **fatto** |
| 4 | Il commento falso in `playwright.config.ts` | io | diceva che il reduced-motion stava in `globals.css`: è diventato vero con la voce 2, e il commento ora lo racconta | **fatto** |
| 5 | Prova che nulla è cambiato | io | i token del CSS compilato, prima e dopo, confrontati riga per riga | **fatto** — vedi sotto |

### Esito — misurato il 2026-09-07

**363 token nel CSS compilato prima, 363 dopo, identici.** Nessun valore è cambiato: è la prova che
`tokens.css` era davvero inerte, e insieme la garanzia che togliergli i colori non ha toccato niente
di ciò che si vede.

Il blocco universale di `prefers-reduced-motion` **ora è nel CSS compilato** — prima non c'era. È
l'unica differenza di comportamento di questo ciclo, ed è il suo scopo.

Cancello di accessibilità: **504 voci su 504, zero violazioni, `exit 0`**, 16,1 minuti. Typecheck
pulito, Vitest 119/119.

Nessun file è stato cancellato.

### Fuori da questo ciclo — serve una decisione di Enzo

Le voci 1-3 dell'elenco qui sopra (scala tipografica, raggi, durate) sono **token morti**: attivarli
cambierebbe l'aspetto della libreria — la dimensione di ogni testo piccolo, il raggio di ogni
bordo — e questo il mandato non lo chiede. Restano dichiarati e inattivi finché Enzo non decide.
Sono presentati una volta sola, qui.

---

## Simulazione

- **Precondizioni**: `tokens.css` non è importato da alcun CSS (verificato con grep su `src`,
  `.storybook`, `package.json`) e non è raggiungibile dai consumatori: `exports` dichiara solo
  `./styles` e `./theme`, e `exports` blocca i percorsi non dichiarati.
- **Meccanismo**: i valori che contano sono quelli del `@theme` di `globals.css`, l'unico file che
  la vetrina e i consumatori caricano. La prova non è il sorgente ma il CSS compilato.
- **Propagazione**: nessuna release necessaria per la voce 1 (nulla cambia per chi consuma); la
  voce 2 **cambia il comportamento** per chi ha chiesto meno movimento, ed è il punto.
- **Chi**: io, per intero.
- **Guardia**: nessun file viene cancellato. `tokens.css` resta al suo posto, senza colori e con
  l'intestazione che dice cosa è. La verifica è un confronto del CSS compilato prima/dopo: se un
  solo token cambiasse valore, si vedrebbe.
