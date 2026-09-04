/**
 * Misura di contrasto e di ESISTENZA delle classi di tono.
 *
 * Nasce dallo script usato per la regressione di StatusPill (fix wave
 * 2026-09-03), che pero' sapeva misurare una sola story. Questa versione
 * verifica l'intera scala di `src/lib/tone-classes.ts` e risponde a due
 * domande in un colpo solo:
 *
 *   1. la classe ESISTE nel CSS realmente compilato? Una utility Tailwind mai
 *      generata non da' errore: si limita a non dipingere. E' il difetto B3.
 *   2. il testo su tinta raggiunge la soglia WCAG AA? E' il difetto B4.
 *
 * Le due domande sono la stessa riga di codice vista da due lati, ed e' il
 * motivo per cui i task B3 e B4 sono stati eseguiti insieme.
 *
 * COME MISURA. Apre una story qualunque (serve solo come documento con il CSS
 * del tema gia' applicato), inietta un campione per ogni combinazione e legge
 * il colore calcolato dal browser. Il compositing non e' ricalcolato a mano —
 * Tailwind 4 compila `/20` in `color-mix(in oklab, ...)`, e riscrivere la
 * conversione OKLab->sRGB sarebbe una fonte di errore reale — ma delegato a un
 * <canvas>: si dipinge il fondo opaco, poi la tinta traslucida sopra, e si
 * rilegge il pixel. E' la pipeline di rendering del browser a dare la verita'.
 *
 * Uso:  node scripts/verify-contrast.mjs            (richiede Storybook su :6006)
 *       node scripts/verify-contrast.mjs --json     (solo JSON, per gli artefatti)
 *
 * Esce con codice 1 se una sola combinazione fallisce: e' pensato per essere
 * un cancello, non un rapporto informativo.
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uiRequire = createRequire(path.join(__dirname, "..", "package.json"));
const { chromium } = uiRequire("@playwright/test");

const STORY_URL =
  "http://localhost:6006/iframe.html?id=components-statuspill--all-tones&viewMode=story";

/** Deve restare allineato a src/lib/tone-classes.ts. */
const TONES = [
  "success",
  "warning",
  "danger",
  "info",
  "palette-1",
  "palette-2",
  "palette-3",
  "palette-4",
  "primary",
];

/** Le tinte su cui puo' posarsi del testo, con la classe di testo attesa. */
const TINTS = ["10", "15", "20"];

const jsonOnly = process.argv.includes("--json");

function relLuminance({ r, g, b }) {
  const chan = (c) => {
    const cs = c / 255;
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
}

function contrastRatio(c1, c2) {
  const l1 = relLuminance(c1);
  const l2 = relLuminance(c2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

async function measure(page, dark, tones, tints) {
  await page.evaluate((isDark) => {
    document.documentElement.classList.toggle("dark", isDark);
  }, dark);
  await page.waitForTimeout(250);

  return page.evaluate(
    ({ tones, tints }) => {
      function paint(colors) {
        const c = document.createElement("canvas");
        c.width = 1;
        c.height = 1;
        const ctx = c.getContext("2d", { willReadFrequently: true });
        for (const col of colors) {
          ctx.fillStyle = col;
          ctx.fillRect(0, 0, 1, 1);
        }
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        return { r, g, b };
      }

      const card = getComputedStyle(document.documentElement)
        .getPropertyValue("--card")
        .trim();

      const host = document.createElement("div");
      // Fuori dallo schermo ma renderizzato: `display:none` non produrrebbe
      // stili calcolati utili.
      host.style.cssText = "position:fixed;left:-9999px;top:0;";
      document.body.appendChild(host);

      const out = [];
      for (const tone of tones) {
        for (const tint of tints) {
          const bgClass = `bg-${tone}/${tint}`;
          const inkClass = `text-${tone}-ink`;
          const plainClass = `text-${tone}`;

          const el = document.createElement("span");
          el.className = `${bgClass} ${inkClass}`;
          el.textContent = "Xg";
          host.appendChild(el);

          const plain = document.createElement("span");
          plain.className = plainClass;
          plain.textContent = "Xg";
          host.appendChild(plain);

          const cs = getComputedStyle(el);
          const csPlain = getComputedStyle(plain);

          // Una utility mai generata lascia il valore iniziale: fondo
          // trasparente, colore ereditato. E' cosi' che si riconosce una
          // classe che NON ESISTE, senza nessun errore da nessuna parte.
          const bgRaw = cs.backgroundColor;
          const bgMissing =
            bgRaw === "rgba(0, 0, 0, 0)" || bgRaw === "transparent";

          out.push({
            tone,
            tint,
            bgClass,
            inkClass,
            bgExists: !bgMissing,
            inkColor: cs.color,
            plainColor: csPlain.color,
            // ink diverso dal token pieno = la rampa esiste davvero per questo
            // tono; se coincidono in light, l'ink non e' stato definito.
            inkDiffersFromPlain: cs.color !== csPlain.color,
            textRgb: paint([cs.color]),
            bgRgb: paint([card, bgRaw]),
            plainTextRgb: paint([csPlain.color]),
          });

          el.remove();
          plain.remove();
        }
      }
      host.remove();
      return out;
    },
    { tones, tints },
  );
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(STORY_URL, { waitUntil: "load" });
await page.waitForSelector("#storybook-root > *", { timeout: 20000 });
await page.waitForTimeout(500);

const results = {};
for (const [name, dark] of [
  ["light", false],
  ["dark", true],
]) {
  const raw = await measure(page, dark, TONES, TINTS);
  results[name] = raw.map((m) => ({
    tone: m.tone,
    tint: `${m.tint}%`,
    bgClass: m.bgClass,
    bgExists: m.bgExists,
    inkClass: m.inkClass,
    inkColor: m.inkColor,
    ratioInk: Math.round(contrastRatio(m.textRgb, m.bgRgb) * 100) / 100,
    ratioPlain: Math.round(contrastRatio(m.plainTextRgb, m.bgRgb) * 100) / 100,
    passesAA: contrastRatio(m.textRgb, m.bgRgb) >= 4.5,
  }));
}

await browser.close();

console.log(JSON.stringify(results, null, 2));

const all = [
  ...results.light.map((r) => ({ ...r, theme: "light" })),
  ...results.dark.map((r) => ({ ...r, theme: "dark" })),
];
const missing = all.filter((r) => !r.bgExists);
const failing = all.filter((r) => !r.passesAA);

if (!jsonOnly) {
  console.log("\n--- Riepilogo ---");
  for (const r of all) {
    const flagClasse = r.bgExists ? "  " : "!!";
    const flagAA = r.passesAA ? "PASS" : "FAIL";
    console.log(
      `${flagClasse} ${r.theme.padEnd(5)} ${r.bgClass.padEnd(20)} ink ${String(r.ratioInk).padStart(6)}:1 ${flagAA}   (token pieno: ${r.ratioPlain}:1)`,
    );
  }
  console.log(
    `\nclassi assenti dal CSS: ${missing.length}   sotto AA: ${failing.length}   combinazioni: ${all.length}`,
  );
}

process.exit(missing.length === 0 && failing.length === 0 ? 0 : 1);
