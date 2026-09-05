/**
 * Classi di tono, scritte per intero — mai composte a pezzi.
 *
 * PERCHE' ESISTE QUESTO FILE.
 *
 * Tailwind 4 genera le utility scandendo il **testo** dei sorgenti: cerca
 * stringhe che somigliano a nomi di classe e produce le regole corrispondenti.
 * Una classe costruita a runtime — `` `bg-${tone}/15` `` — non e' mai una
 * stringa nel sorgente, quindi non produce **nessun** candidato e la regola non
 * viene emessa affatto. Il codice compila, i test passano, e a schermo non c'e'
 * niente: nessun errore da nessuna parte.
 *
 * MISURATO il 2026-09-04 sul CSS realmente costruito dal consumer
 * (heuresys-advanced/apps/web/.next/static/chunks/1nc9eic8uw3zx.css): esistono
 * `.bg-palette-3`, `.bg-palette-3\/10`, `.bg-palette-3\/15` e la variante
 * `.hover\:bg-palette-3\/20:hover`, ma la regola base `.bg-palette-3\/20` — che
 * l'avatar dell'header chiede — **non esiste**. L'avatar resta senza sfondo. Le
 * poche classi interpolate che "funzionano" lo fanno per coincidenza: esistono
 * come letterali altrove nel codice, non perche' qualcuno le abbia previste.
 *
 * Il censimento completo (2026-09-04) ha trovato il pattern in 11 file e 22
 * occorrenze, non nei 2 inizialmente sospettati. Questo modulo e' la loro casa
 * comune: qui ogni classe e' una stringa intera, che Tailwind vede.
 *
 * L'ACCESSIBILITA' NON E' UN SECONDO PROBLEMA, E' LO STESSO PUNTO.
 *
 * Le righe da correggere sono quasi tutte della forma "testo del tono su tinta
 * dello stesso tono" — un `text-warning` dentro `bg-warning/15`. Misurato, e'
 * proprio la famiglia che sta sotto la soglia AA: una tinta al 10-20% su card
 * chiara non stacca abbastanza dal token pieno (success #16A34A composito su
 * bianco: 2,95:1 contro 4,5:1 richiesti). Riscrivere queste righe per la sola
 * questione Tailwind, lasciandole illeggibili, avrebbe voluto dire toccare
 * dodici file due volte. Il testo su tinta usa percio' la rampa `-ink`, che e'
 * il gradino -800 della stessa tinta in chiaro e il valore semantico gia' AA in
 * scuro (vedi theme-heuresys.css).
 *
 * NON usare varianti `dark:` qui. I consumatori commutano il tema con la CLASSE
 * `.dark`, mentre il `dark:` di Tailwind 4 e' `@media (prefers-color-scheme)`:
 * scatterebbe sullo schema del sistema operativo indipendentemente dal tema
 * dell'applicazione. E' gia' costato un incidente (heuresys S952: verde chiaro
 * su quasi-bianco, 1,22:1).
 */

/** I toni che hanno una scala di classi completa in questo modulo. */
export type ToneName =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "palette-1"
  | "palette-2"
  | "palette-3"
  | "palette-4"
  | "primary"
  | "muted";

/**
 * Un tono accettato in ingresso da una prop pubblica.
 *
 * Volutamente **aperta**: `string & {}` conserva l'autocompletamento sui valori
 * noti ma continua ad accettare qualunque stringa. Restringere la prop a
 * `ToneName` sarebbe stato un breaking change silenzioso per i consumatori —
 * verificato: `heuresys-advanced/apps/web/src/app/(authenticated)/layout.tsx:177`
 * costruisce il valore con un ternario dentro un oggetto letterale, che
 * TypeScript allarga a `string`. Un valore fuori elenco degrada al tono di
 * ripiego invece di rompere la compilazione altrui.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ToneInput = ToneName | (string & {});

type ToneClasses = {
  /** Fondo pieno del tono. */
  solid: string;
  /** Tinta al 10% — chip e sfondi molto leggeri. */
  tint10: string;
  /** Tinta al 15% — chip e badge di uso corrente. */
  tint15: string;
  /** Tinta al 20% — avatar e pastiglie piu' marcate. */
  tint20: string;
  /** Testo del tono su superficie NEUTRA (card, sfondo): token pieno. */
  text: string;
  /** Testo del tono SU TINTA dello stesso tono: rampa ink, AA in entrambi i temi. */
  textOnTint: string;
  /** Bordo al 30%. */
  border30: string;
  /** Bordo al 40%. */
  border40: string;
  /** Alone al 20%, per i pallini su timeline. */
  ring20: string;
};

/**
 * Ogni valore e' una stringa intera e letterale: e' la condizione perche'
 * Tailwind la veda. Non comporre queste stringhe altrove.
 */
export const TONE: Record<ToneName, ToneClasses> = {
  success: {
    solid: "bg-success",
    tint10: "bg-success/10",
    tint15: "bg-success/15",
    tint20: "bg-success/20",
    text: "text-success",
    textOnTint: "text-success-ink",
    border30: "border-success/30",
    border40: "border-success/40",
    ring20: "ring-success/20",
  },
  warning: {
    solid: "bg-warning",
    tint10: "bg-warning/10",
    tint15: "bg-warning/15",
    tint20: "bg-warning/20",
    text: "text-warning",
    textOnTint: "text-warning-ink",
    border30: "border-warning/30",
    border40: "border-warning/40",
    ring20: "ring-warning/20",
  },
  danger: {
    solid: "bg-danger",
    tint10: "bg-danger/10",
    tint15: "bg-danger/15",
    tint20: "bg-danger/20",
    text: "text-danger",
    textOnTint: "text-danger-ink",
    border30: "border-danger/30",
    border40: "border-danger/40",
    ring20: "ring-danger/20",
  },
  info: {
    solid: "bg-info",
    tint10: "bg-info/10",
    tint15: "bg-info/15",
    tint20: "bg-info/20",
    text: "text-info",
    textOnTint: "text-info-ink",
    border30: "border-info/30",
    border40: "border-info/40",
    ring20: "ring-info/20",
  },
  "palette-1": {
    solid: "bg-palette-1",
    tint10: "bg-palette-1/10",
    tint15: "bg-palette-1/15",
    tint20: "bg-palette-1/20",
    text: "text-palette-1",
    textOnTint: "text-palette-1-ink",
    border30: "border-palette-1/30",
    border40: "border-palette-1/40",
    ring20: "ring-palette-1/20",
  },
  "palette-2": {
    solid: "bg-palette-2",
    tint10: "bg-palette-2/10",
    tint15: "bg-palette-2/15",
    tint20: "bg-palette-2/20",
    text: "text-palette-2",
    textOnTint: "text-palette-2-ink",
    border30: "border-palette-2/30",
    border40: "border-palette-2/40",
    ring20: "ring-palette-2/20",
  },
  "palette-3": {
    solid: "bg-palette-3",
    tint10: "bg-palette-3/10",
    tint15: "bg-palette-3/15",
    tint20: "bg-palette-3/20",
    text: "text-palette-3",
    textOnTint: "text-palette-3-ink",
    border30: "border-palette-3/30",
    border40: "border-palette-3/40",
    ring20: "ring-palette-3/20",
  },
  "palette-4": {
    solid: "bg-palette-4",
    tint10: "bg-palette-4/10",
    tint15: "bg-palette-4/15",
    tint20: "bg-palette-4/20",
    text: "text-palette-4",
    textOnTint: "text-palette-4-ink",
    border30: "border-palette-4/30",
    border40: "border-palette-4/40",
    ring20: "ring-palette-4/20",
  },
  // `primary` compare come tono di sorgente in LogStream, quindi finisce
  // anche lui sotto forma di tinta e ha bisogno del proprio ink. Da non
  // confondere con --color-primary-fg, che e' il testo sul primary PIENO.
  primary: {
    solid: "bg-primary",
    tint10: "bg-primary/10",
    tint15: "bg-primary/15",
    tint20: "bg-primary/20",
    text: "text-primary",
    textOnTint: "text-primary-ink",
    border30: "border-primary/30",
    border40: "border-primary/40",
    ring20: "ring-primary/20",
  },
  // Il neutro non ha tinte percentuali ne' rampa ink: la sua superficie e'
  // gia' un token opaco e il suo testo e' --muted-foreground, che e' AA su
  // --muted per costruzione.
  muted: {
    solid: "bg-muted",
    tint10: "bg-muted",
    tint15: "bg-muted",
    tint20: "bg-muted",
    text: "text-muted-foreground",
    textOnTint: "text-muted-foreground",
    border30: "border-border",
    border40: "border-border",
    ring20: "ring-border",
  },
};

const TONE_NAMES = Object.keys(TONE) as ToneName[];

/**
 * Sinonimi accettati in ingresso.
 *
 * `muted-foreground` circola in piu' componenti come valore di tono del testo
 * (e' il nome del token, non di un tono): vale il neutro, il cui testo e'
 * proprio `text-muted-foreground`.
 */
const TONE_ALIASES: Record<string, ToneName> = {
  "muted-foreground": "muted",
  neutral: "muted",
};

/**
 * Porta un valore qualunque su un tono noto.
 *
 * Un valore fuori elenco non deve produrre una classe inesistente — che e'
 * esattamente il difetto da cui nasce questo modulo — quindi degrada al tono di
 * ripiego indicato dal chiamante.
 */
export function resolveTone(value: ToneInput | null | undefined, fallback: ToneName): ToneName {
  if (value == null) return fallback;
  if ((TONE_NAMES as string[]).includes(value)) return value as ToneName;
  return TONE_ALIASES[value] ?? fallback;
}

/** Le classi di un tono, con degrado sicuro per i valori fuori elenco. */
export function toneClasses(value: ToneInput | null | undefined, fallback: ToneName): ToneClasses {
  return TONE[resolveTone(value, fallback)];
}
