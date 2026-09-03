import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { FullConfig } from "@playwright/test";

/**
 * Legge l'indice delle story da Storybook (già avviato da `webServer` a
 * questo punto) e lo salva su disco come JSON, cosicché lo spec file possa
 * leggerlo in modo SINCRONO al momento dell'import e generare un test
 * Playwright per ciascuna story — pattern ufficiale per dataset scoperti a
 * runtime (vedi https://playwright.dev/docs/test-parameterize#generate-tests-in-a-loop).
 *
 * Perché non un unico test con un loop interno: con centinaia di story il
 * timeout per-test di Playwright (30s di default) si applicherebbe
 * all'INTERO ciclo, non alla singola story — misurato qui il 2026-09-03,
 * dove il test moriva a metà indice pur avendo già superato ~20 story valide.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const STORY_INDEX_FILE = path.join(__dirname, ".story-index.json");

type StoryIndexEntry = {
  id: string;
  type?: string;
  title: string;
  name: string;
};

type StoryIndex = {
  entries?: Record<string, StoryIndexEntry>;
  stories?: Record<string, StoryIndexEntry>;
};

async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use?.baseURL ?? "http://localhost:6006";
  const res = await fetch(`${baseURL}/index.json`);
  if (!res.ok) {
    throw new Error(`GET ${baseURL}/index.json → ${res.status} ${res.statusText}`);
  }
  const index = (await res.json()) as StoryIndex;
  const entries = Object.values(index.entries ?? index.stories ?? {});
  const stories = entries.filter((e) => (e.type ?? "story") === "story");

  if (stories.length === 0) {
    throw new Error("index.json non contiene nessuna story: controllo bloccato prima di partire");
  }

  fs.writeFileSync(STORY_INDEX_FILE, JSON.stringify(stories, null, 2));
}

export default globalSetup;
