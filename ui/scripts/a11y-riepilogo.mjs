/**
 * Riepiloga l'inventario di accessibilità prodotto da `qa-a11y.spec.ts`.
 *
 * Legge un file per voce da `test-results/a11y/` — la spec li scrive così
 * perché i test restino indipendenti e paralleli — e ne ricava i conteggi per
 * gravità e per regola, più i componenti che pesano di più.
 *
 * Uso:  node scripts/a11y-riepilogo.mjs [--json]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "..", "test-results", "a11y");

if (!fs.existsSync(DIR)) {
  console.error(
    `Manca ${DIR}.\nEsegui prima l'inventario:  SB_STATIC=1 pnpm exec playwright test qa-a11y`,
  );
  process.exit(1);
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

const perGravita = {};
const perRegola = {};
const perVoce = {};
for (const v of violazioni) {
  perGravita[v.gravita] = (perGravita[v.gravita] ?? 0) + 1;
  perRegola[v.regola] = (perRegola[v.regola] ?? 0) + 1;
  perVoce[v.voce] = (perVoce[v.voce] ?? 0) + 1;
}

const ordina = (o, n) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);

if (process.argv.includes("--json")) {
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
