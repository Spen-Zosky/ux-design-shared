/**
 * Riepiloga l'inventario di accessibilità prodotto da `qa-a11y.spec.ts`.
 *
 * Legge un file per voce da `test-results/a11y/` — la spec li scrive così
 * perché i test restino indipendenti e paralleli — e ne ricava i conteggi per
 * gravità e per regola, più i componenti che pesano di più.
 *
 * A CHE COSA SERVE OLTRE AL CONTEGGIO. La prima versione rispondeva a «quanto è
 * alto il muro», che era la domanda dell'inventario. Per correggere serve
 * un'altra domanda: «quale file apro». La vetrina ragiona per voci
 * (`Collab/KanbanBoard › Docs`), il codice per file, e il ponte fra i due è
 * `importPath` dentro l'indice di Storybook: si legge da lì invece di
 * indovinarlo dal titolo.
 *
 * Uso:
 *   node scripts/a11y-riepilogo.mjs                 conteggi (comportamento storico)
 *   node scripts/a11y-riepilogo.mjs --json          gli stessi conteggi, per una macchina
 *   node scripts/a11y-riepilogo.mjs --per-file      che cosa correggere, file per file
 *   node scripts/a11y-riepilogo.mjs --regola label  i nodi che violano una regola
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UI_ROOT = path.join(__dirname, "..");
const DIR = path.join(UI_ROOT, "test-results", "a11y");
const INDEX = path.join(UI_ROOT, "storybook-static", "index.json");

if (!fs.existsSync(DIR)) {
  console.error(
    `Manca ${DIR}.\nEsegui prima l'inventario:  SB_STATIC=1 pnpm exec playwright test qa-a11y`,
  );
  process.exit(1);
}

/**
 * id della voce → file sorgente che la produce.
 *
 * Se l'indice manca il riepilogo continua a funzionare: perde solo la colonna
 * del file, e lo dichiara invece di inventarsi un percorso plausibile.
 */
const fileDiVoce = {};
let indiceLetto = false;
if (fs.existsSync(INDEX)) {
  const entries = JSON.parse(fs.readFileSync(INDEX, "utf8")).entries ?? {};
  for (const [id, e] of Object.entries(entries)) {
    if (e.importPath) fileDiVoce[id] = e.importPath.replace(/^\.\//, "");
  }
  indiceLetto = true;
}

const file = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
const violazioni = [];
for (const f of file) {
  try {
    violazioni.push(...JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")));
  } catch {
    console.error(`illeggibile, saltato: ${f}`);
  }
}
for (const v of violazioni) v.file = fileDiVoce[v.id] ?? "(sorgente sconosciuto)";

const perGravita = {};
const perRegola = {};
const perVoce = {};
for (const v of violazioni) {
  perGravita[v.gravita] = (perGravita[v.gravita] ?? 0) + 1;
  perRegola[v.regola] = (perRegola[v.regola] ?? 0) + 1;
  perVoce[v.voce] = (perVoce[v.voce] ?? 0) + 1;
}

const ordina = (o, n) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);
const GRAVI = new Set(["critical", "serious"]);

const argRegola = process.argv.indexOf("--regola");
if (argRegola !== -1) {
  const regola = process.argv[argRegola + 1];
  if (!regola) {
    console.error("--regola vuole il nome di una regola, per esempio:  --regola label");
    process.exit(1);
  }
  const scelte = violazioni.filter((v) => v.regola === regola);
  if (scelte.length === 0) {
    console.log(`nessuna violazione di "${regola}".`);
    console.log(`regole presenti: ${Object.keys(perRegola).sort().join(", ")}`);
    process.exit(0);
  }
  console.log(`${regola} — ${scelte.length} violazioni\n${scelte[0].descrizione}\n`);
  const perFile = {};
  for (const v of scelte) (perFile[v.file] ??= []).push(v);
  for (const [f, vs] of Object.entries(perFile).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n${f}   (${vs.length})`);
    const visti = new Set();
    for (const v of vs) {
      for (const n of v.nodiDettaglio ?? []) {
        if (visti.has(n.target)) continue;
        visti.add(n.target);
        console.log(`    ${n.target}`);
        console.log(`      ${n.html.replace(/\s+/g, " ").slice(0, 160)}`);
      }
    }
    if (visti.size === 0) {
      console.log("    (nessun dettaglio dei nodi: file grezzi di una misura precedente al 2026-09-06)");
    }
  }
} else if (process.argv.includes("--per-file")) {
  const perFile = {};
  for (const v of violazioni) {
    const f = (perFile[v.file] ??= { totale: 0, gravi: 0, regole: {} });
    f.totale += 1;
    if (GRAVI.has(v.gravita)) f.gravi += 1;
    f.regole[v.regola] = (f.regole[v.regola] ?? 0) + 1;
  }
  const righe = Object.entries(perFile).sort((a, b) => b[1].gravi - a[1].gravi || b[1].totale - a[1].totale);
  console.log(`${righe.length} file sorgente coinvolti · ${violazioni.length} violazioni\n`);
  console.log("ordinati per critical+serious, che è la soglia del cancello proposto:\n");
  for (const [f, d] of righe) {
    const regole = Object.entries(d.regole)
      .sort((a, b) => b[1] - a[1])
      .map(([r, n]) => `${r}×${n}`)
      .join(", ");
    console.log(`${String(d.gravi).padStart(4)} gravi / ${String(d.totale).padStart(4)} tot   ${f}`);
    console.log(`                        ${regole}`);
  }
  if (!indiceLetto) {
    console.log("\nATTENZIONE: manca storybook-static/index.json, quindi nessun file è stato risolto.");
    console.log("Ricostruisci la vetrina:  pnpm run build-storybook");
  }
} else if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ totale: violazioni.length, voci: file.length, perGravita, perRegola, perVoce }, null, 2));
} else {
  console.log(`voci esaminate:      ${file.length}`);
  console.log(`violazioni totali:   ${violazioni.length}   (ogni voce è misurata nei due temi)\n`);
  console.log("per gravità:");
  for (const [g, n] of ordina(perGravita, 10)) console.log(`  ${String(n).padStart(5)}  ${g}`);
  console.log("\nregole più frequenti:");
  for (const [r, n] of ordina(perRegola, 15)) console.log(`  ${String(n).padStart(5)}  ${r}`);
  console.log("\nvoci con più violazioni:");
  for (const [v, n] of ordina(perVoce, 15)) console.log(`  ${String(n).padStart(5)}  ${v}`);
}
