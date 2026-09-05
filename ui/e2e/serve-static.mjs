/**
 * Server statico per la vetrina già costruita — zero dipendenze.
 *
 * PERCHE' NON IL DEV SERVER. Con `storybook dev` Vite compila i moduli su
 * richiesta: la prima volta che un test apre una story, il suo grafo di import
 * viene trasformato lì per lì. Con più worker in parallelo quelle compilazioni
 * si accavallano, e le story più pesanti (three.js, lottie, video) scadono il
 * timeout senza avere alcun difetto. Misurato otto volte nello stesso ciclo.
 *
 * Un cancello di prontezza in `globalSetup` non basta a chiuderla: scalda la
 * story sentinella e registra il service worker, ma non compila gli altri 379
 * grafi. La compilazione resta sparsa dentro la corsa — verificato, i
 * fallimenti sotto carico continuano.
 *
 * `storybook build` invece emette tutto in anticipo: qui non si compila più
 * nulla, si serve e basta.
 *
 * PERCHE' SCRITTO A MANO. Serve un solo verbo (GET) su file già in cartella.
 * Aggiungere una dipendenza a `http-server` o `serve` per questo significa
 * caricare l'albero delle dipendenze del progetto — e la sua manutenzione — per
 * quaranta righe che non cambieranno mai.
 *
 * Uso:  node e2e/serve-static.mjs [porta]      (default 6007)
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "storybook-static");
const PORT = Number(process.argv[2] ?? 6007);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".lottie": "application/octet-stream",
  ".wasm": "application/wasm",
};

if (!fs.existsSync(ROOT)) {
  console.error(
    `Manca ${ROOT}.\nCostruisci prima la vetrina:  pnpm run build-storybook`,
  );
  process.exit(1);
}

const server = http.createServer((req, res) => {
  // Solo il percorso: la query (?id=…&viewMode=…) non seleziona file.
  const urlPath = decodeURIComponent((req.url ?? "/").split("?")[0]);
  const rel = urlPath === "/" ? "/index.html" : urlPath;

  // Nessuna risalita fuori dalla radice servita.
  const filePath = path.join(ROOT, rel);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, buf) => {
    if (err) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end(`404 ${rel}`);
      return;
    }
    res.writeHead(200, {
      "content-type": TYPES[path.extname(filePath).toLowerCase()] ?? "application/octet-stream",
      // Il service worker di MSW deve poter controllare la radice: senza questa
      // intestazione il browser limita lo scope alla cartella del worker.
      "service-worker-allowed": "/",
      "cache-control": "no-store",
    });
    res.end(buf);
  });
});

server.listen(PORT, () => {
  console.log(`[serve-static] vetrina statica su http://localhost:${PORT}`);
});
