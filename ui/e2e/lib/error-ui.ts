import type { Page, FrameLocator } from "@playwright/test";

/**
 * Dove Storybook mette davvero la sua UI d'errore.
 *
 * MISURATO con una sonda il 2026-09-04: quando una story non monta, Storybook
 * NON scrive niente dentro `#storybook-root` — quello resta a zero figli — e
 * disegna invece la pagina d'errore in due contenitori **fratelli**, che
 * esistono sempre nel documento e vengono resi visibili all'occorrenza.
 *
 * Cercare la causa dentro la canvas non trova quindi nulla: e' la ragione per
 * cui il fallimento dello smoke test diceva soltanto "expected not 0, received
 * 0", e recuperare il messaggio vero — per esempio "useTheme must be used
 * within ThemeProvider" — costava piu' passaggi dentro `error-context.md`.
 */
export const ERROR_HOSTS = [".sb-nopreview", ".sb-errordisplay"] as const;

export type StoryErrorUi = {
  /** Vero se uno dei due contenitori d'errore e' visibile. */
  hasErrorUi: boolean;
  /** Il messaggio leggibile, o `null` se non c'e' nessuna UI d'errore. */
  errorText: string | null;
  /** Quale contenitore l'ha prodotto, utile per diagnosticare la diagnosi. */
  host: string | null;
};

/**
 * Legge la UI d'errore di Storybook nel documento dato.
 *
 * Accetta sia una `Page` (quando si carica `iframe.html` direttamente, come
 * fa lo smoke test) sia un `FrameLocator` (quando si guida la UI manager e la
 * canvas e' dentro `#storybook-preview-iframe`, come fara' l'audit).
 *
 * Non lancia mai: se non trova niente risponde `hasErrorUi: false`. Serve a
 * spiegare un fallimento gia' avvenuto, non a produrne di nuovi.
 */
export async function readStoryErrorUi(scope: Page | FrameLocator): Promise<StoryErrorUi> {
  for (const host of ERROR_HOSTS) {
    const el = scope.locator(host).first();
    const visible = await el.isVisible().catch(() => false);
    if (!visible) continue;

    // L'heading porta la causa in forma breve; il corpo puo' essere uno stack
    // lungo. Si preferisce l'heading, e si ripiega sul testo intero quando
    // manca, troncato perche' finisce in un messaggio di fallimento.
    const heading = await el
      .locator("h1, h2, h3, .sb-heading")
      .first()
      .innerText()
      .catch(() => "");
    const body = await el.innerText().catch(() => "");
    const text = (heading.trim() || body.trim()).slice(0, 2000);

    return { hasErrorUi: true, errorText: text || null, host };
  }

  return { hasErrorUi: false, errorText: null, host: null };
}

/**
 * La stessa lettura, gia' formattata per finire in un messaggio di fallimento.
 */
export async function describeStoryFailure(scope: Page | FrameLocator): Promise<string> {
  const { hasErrorUi, errorText, host } = await readStoryErrorUi(scope);
  if (!hasErrorUi) {
    return "Nessuna UI d'errore di Storybook visibile: la story non ha montato nulla senza dichiarare un motivo (sospetta un render che ritorna null, o un caricamento mai concluso).";
  }
  return `Storybook ha mostrato la sua pagina d'errore in ${host}:\n  ${errorText ?? "(contenitore visibile ma senza testo leggibile)"}`;
}
