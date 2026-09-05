/**
 * Riepiloga l'inventario dei Controls prodotto da `qa-controls.spec.ts`.
 *
 * Legge un file per story da `test-results/controls/` e risponde alle due
 * domande del task: quali controlli non producono alcun effetto visibile, e
 * quali hanno un widget che non corrisponde al tipo del dato dichiarato.
 *
 * Uso:  node scripts/controls-riepilogo.mjs [--json]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "..", "test-results", "controls");

if (!fs.existsSync(DIR)) {
  console.error(
    `Manca ${DIR}.\nEsegui prima l'inventario:  SB_STATIC=1 pnpm exec playwright test qa-controls`,
  );
  process.exit(1);
}

const file = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
const esiti = [];
for (const f of file) {
  try {
    esiti.push(...JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")));
  } catch {
    console.error(`illeggibile, saltato: ${f}`);
  }
}

const conEffetto = esiti.filter((e) => e.effetto === "sì");
const senzaEffetto = esiti.filter((e) => e.effetto === "no");
const nonProvati = esiti.filter((e) => e.effetto === "non-provato");
const disallineati = esiti.filter((e) => e.nota?.startsWith("tipo dichiarato"));

const perWidget = {};
for (const e of esiti) perWidget[e.widget] = (perWidget[e.widget] ?? 0) + 1;

if (process.argv.includes("--json")) {
  console.log(
    JSON.stringify(
      {
        story: file.length,
        controlli: esiti.length,
        conEffetto: conEffetto.length,
        senzaEffetto,
        nonProvati: nonProvati.length,
        disallineati,
        perWidget,
      },
      null,
      2,
    ),
  );
} else {
  console.log(`story esaminate:        ${file.length}`);
  console.log(`controlli trovati:      ${esiti.length}`);
  console.log(`  con effetto visibile: ${conEffetto.length}`);
  console.log(`  SENZA effetto:        ${senzaEffetto.length}`);
  console.log(`  non provati:          ${nonProvati.length}  (callback, className, widget non manipolabili)`);
  console.log(`  widget disallineato:  ${disallineati.length}\n`);

  console.log("per tipo di widget:");
  for (const [w, n] of Object.entries(perWidget).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(5)}  ${w}`);
  }

  if (senzaEffetto.length) {
    console.log("\ncontrolli che NON producono effetto visibile:");
    for (const e of senzaEffetto.slice(0, 40)) {
      console.log(`  ${e.voce}  →  ${e.controllo} (${e.widget})`);
    }
    if (senzaEffetto.length > 40) console.log(`  … e altri ${senzaEffetto.length - 40}`);
  }

  if (disallineati.length) {
    console.log("\nwidget non corrispondente al tipo dichiarato:");
    for (const e of disallineati.slice(0, 30)) {
      console.log(`  ${e.voce}  →  ${e.controllo}: ${e.nota}`);
    }
  }
}
