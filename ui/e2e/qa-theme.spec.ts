import fs from "node:fs";
import { test, expect } from "@playwright/test";
import { STORY_INDEX_FILE } from "./global-setup";

/**
 * Ogni voce nei due temi, con la prova che a schermo cambia davvero qualcosa.
 *
 * PERCHÉ L'ASSERZIONE SUL PIXEL È LA PIÙ IMPORTANTE. Fino al 2026-09-04 il tema
 * scuro "funzionava" secondo ogni misura tranne quella che conta: la classe
 * `dark` arrivava su `<html>`, i token ribaltavano — e a schermo non cambiava
 * niente, perché nessuno dipingeva la superficie della finestra di rendering.
 * Un test che avesse controllato solo classe e token avrebbe dichiarato tutto a
 * posto mentre Enzo guardava una vetrina bianca. Il confronto fra gli screenshot
 * è l'unica asserzione che avrebbe colto quel difetto, ed è la ragione per cui
 * questo file esiste.
 *
 * Dipende da B1 (la canvas dipinta dai token): senza, fallirebbe ovunque per una
 * causa sola e già nota.
 */

type IndexEntry = { id: string; title: string; name: string; type?: string };

const entries: IndexEntry[] = JSON.parse(fs.readFileSync(STORY_INDEX_FILE, "utf-8"));

/**
 * Voci legittimamente INSENSIBILI al tema — elenco esplicito, con la ragione.
 *
 * Una story che non cambia fra chiaro e scuro non è di per sé rotta: un logo
 * monocromatico su fondo proprio resta identico per progetto. Ma ogni caso va
 * nominato: quelle fuori elenco devono cambiare, e se non cambiano è un difetto.
 */
const INSENSIBILI_AL_TEMA: Record<string, string> = {
  // Popolato dalla prima esecuzione: ogni voce entra qui solo dopo aver
  // verificato a mano che l'immobilità è voluta, mai per far passare la suite.
};

/** Quanti elementi devono almeno cambiare colore perché il tema si consideri arrivato. */
const MINIMO_ELEMENTI_CAMBIATI = 1;

/**
 * Quanti elementi cambiano colore davvero, fra i due temi.
 *
 * PERCHÉ NON GLI SCREENSHOT. La prima versione di questo file confrontava i byte
 * dei due PNG. Era una misura sbagliata e l'ho corretta: un PNG è compresso, due
 * immagini diverse hanno quasi sempre lunghezza diversa, e il confronto
 * restituiva "100% di differenza" per costruzione — cioè dichiarava un successo
 * senza averlo verificato. Confrontare i byte di un formato compresso non dice
 * nulla sui pixel.
 *
 * Questa misura guarda invece il colore CALCOLATO di ogni elemento visibile:
 * `backgroundColor` e `color` come li risolve il browser. Se fra chiaro e scuro
 * non cambia il colore di un solo elemento, il tema non sta raggiungendo quella
 * voce — ed è esattamente la domanda a cui il task deve rispondere. È anche più
 * severa: coglie il caso in cui cambia il fondo della pagina ma non i
 * componenti.
 */
/**
 * Legge i colori dei MEDESIMI elementi nei due temi, in una sola valutazione.
 *
 * PERCHÉ IN UNA VOLTA SOLA. Due letture separate, con un `waitForTimeout` in
 * mezzo, non guardano lo stesso DOM: le pagine di documentazione si costruiscono
 * progressivamente e i componenti animati (PerfMonitor aggiorna metriche, Motion
 * anima, CommandPalette ha stato) cambiano da soli fra un campione e l'altro. Ci
 * ho sbattuto due volte — prima ottenendo due elenchi di lunghezza diversa, poi
 * facendo fallire nove voci sane perché il contenuto si muoveva.
 *
 * Qui gli elementi si raccolgono UNA volta e si leggono due volte a distanza di
 * microsecondi, commutando la classe in mezzo: `getComputedStyle` forza il
 * ricalcolo sincrono, quindi non serve attendere e non c'è finestra in cui il
 * DOM possa cambiare sotto la misura.
 */
async function contaColoriCambiati(
  page: import("@playwright/test").Page,
  dentro: string,
): Promise<{ cambiati: number; totale: number }> {
  return page.evaluate((sel) => {
    const radice = document.querySelector(sel);
    if (!radice) return { cambiati: 0, totale: 0 };

    const elementi = [radice, ...Array.from(radice.querySelectorAll("*"))].slice(0, 400);
    const leggi = () =>
      elementi.map((el) => {
        const cs = getComputedStyle(el as Element);
        return `${cs.backgroundColor}|${cs.color}`;
      });

    const eraScuro = document.documentElement.classList.contains("dark");

    document.documentElement.classList.remove("dark");
    const chiaro = leggi();
    document.documentElement.classList.add("dark");
    const scuro = leggi();

    // Si ripristina lo stato di partenza: questa funzione misura, non decide.
    document.documentElement.classList.toggle("dark", eraScuro);

    let cambiati = 0;
    for (let i = 0; i < elementi.length; i++) if (chiaro[i] !== scuro[i]) cambiati++;
    return { cambiati, totale: elementi.length };
  }, dentro);
}

/**
 * Attende che il contenuto smetta di crescere prima di misurarlo.
 *
 * SERVE, e l'ho imparato sbagliando. Bastava che la canvas avesse UN figlio per
 * far partire il confronto, ma una pagina di documentazione pesante si
 * costruisce progressivamente: il campione del tema chiaro finiva più corto di
 * quello scuro, `Math.min` confrontava solo i primi elementi, e due pagine
 * risultavano "insensibili al tema" mentre fuori dal test cambiavano 33 e 49
 * elementi. Il difetto era nella misura, non nella vetrina.
 */
async function attendiAlberoStabile(
  page: import("@playwright/test").Page,
  dentro: string,
): Promise<number> {
  let precedente = -1;
  for (let giro = 0; giro < 20; giro++) {
    const attuale = await page.evaluate(
      (sel) => document.querySelector(sel)?.querySelectorAll("*").length ?? 0,
      dentro,
    );
    if (attuale > 0 && attuale === precedente) return attuale;
    precedente = attuale;
    await page.waitForTimeout(250);
  }
  return precedente;
}

test.describe("il tema scuro, su ogni voce @audit", () => {
  for (const entry of entries) {
    const isDocs = (entry.type ?? "story") === "docs";

    test(`${entry.title} › ${entry.name}`, async ({ page }) => {
      const viewMode = isDocs ? "docs" : "story";
      await page.goto(`/iframe.html?id=${entry.id}&viewMode=${viewMode}`);

      const selettore = isDocs ? "#storybook-docs" : "#storybook-root";
      const root = page.locator(selettore);
      await expect(root.locator(":scope > *")).not.toHaveCount(0, { timeout: 25_000 });
      await attendiAlberoStabile(page, selettore);

      // Token nei due temi: due letture separate bastano, perché i token
      // stanno su <html> e non dipendono dal contenuto della story.
      await page.evaluate(() => document.documentElement.classList.remove("dark"));
      const tokenChiaro = await page.evaluate(() => {
        const cs = getComputedStyle(document.documentElement);
        return {
          background: cs.getPropertyValue("--background").trim(),
          foreground: cs.getPropertyValue("--foreground").trim(),
          classe: document.documentElement.className,
        };
      });

      await page.evaluate(() => document.documentElement.classList.add("dark"));
      const tokenScuro = await page.evaluate(() => {
        const cs = getComputedStyle(document.documentElement);
        return {
          background: cs.getPropertyValue("--background").trim(),
          foreground: cs.getPropertyValue("--foreground").trim(),
          classe: document.documentElement.className,
        };
      });

      // 1. La classe `dark` c'è solo in scuro.
      expect(tokenChiaro.classe, "la classe `dark` risulta presente nel tema chiaro").not.toContain("dark");
      expect(tokenScuro.classe, "la classe `dark` non arriva nel tema scuro").toContain("dark");

      // 2. I token di superficie sono cambiati.
      expect(
        tokenScuro.background,
        `--background non cambia fra i temi (chiaro ${tokenChiaro.background}, scuro ${tokenScuro.background})`,
      ).not.toBe(tokenChiaro.background);
      expect(tokenScuro.foreground, "--foreground non cambia fra i temi").not.toBe(tokenChiaro.foreground);

      // 3. Il pixel visibile è cambiato davvero. È l'asserzione che coglie il
      //    difetto vero: i token possono ribaltare mentre a schermo tutto resta
      //    identico, che è esattamente lo stato da cui questo ciclo è partito.
      const { cambiati, totale } = await contaColoriCambiati(page, selettore);
      const motivo = INSENSIBILI_AL_TEMA[entry.id];

      if (motivo) {
        // Dichiarata insensibile: non pretendiamo che cambi.
      } else {
        expect(
          cambiati,
          `"${entry.title} › ${entry.name}": i token ribaltano ma NESSUNO dei ${totale} elementi esaminati ` +
            `cambia colore effettivo fra chiaro e scuro. ` +
            `O la voce è insensibile al tema per progetto — e allora va dichiarata in INSENSIBILI_AL_TEMA con la ragione — ` +
            `oppure il tema non la raggiunge.`,
        ).toBeGreaterThanOrEqual(MINIMO_ELEMENTI_CAMBIATI);
      }
    });
  }
});
