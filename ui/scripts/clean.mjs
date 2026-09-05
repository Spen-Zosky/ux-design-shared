/**
 * Rimuove gli artefatti rigenerabili della vetrina.
 *
 * Sostituisce `rimraf storybook-static node_modules/.cache`, che era lo script
 * `clean` dichiarato in package.json ma **non ha mai potuto funzionare**:
 * `rimraf` non e' fra le dipendenze del progetto e non esiste in
 * `node_modules/.bin`. Lo script falliva con "non e' riconosciuto come un
 * programma eseguibile" — un errore mai incontrato finche' nessuno lo lanciava.
 *
 * L'ho scoperto legando `build-storybook` a `clean`, cosa che serviva a
 * chiudere un difetto ben piu' serio: la cache di Storybook non si invalida da
 * sola quando cambiano i file di story, e un build che la riusa produce una
 * vetrina amputata senza dire niente (25 story mancanti su 380, misurato).
 *
 * `fs.rmSync` fa lo stesso lavoro con zero dipendenze ed e' identico su ogni
 * sistema operativo.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UI_ROOT = path.join(__dirname, "..");

const TARGETS = ["storybook-static", path.join("node_modules", ".cache")];

for (const target of TARGETS) {
  const full = path.join(UI_ROOT, target);
  if (!fs.existsSync(full)) {
    console.log(`[clean] gia' assente: ${target}`);
    continue;
  }
  fs.rmSync(full, { recursive: true, force: true });
  console.log(`[clean] rimosso: ${target}`);
}
