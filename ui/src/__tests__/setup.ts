import { afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { toHaveNoViolations } from 'jest-axe';

// jest-axe exports { toHaveNoViolations } as an object that already maps the
// matcher name to its implementation; pass it through verbatim.
expect.extend(toHaveNoViolations);

/**
 * `window.matchMedia` non esiste in jsdom.
 *
 * Non e' una lacuna dei nostri componenti: matchMedia e' supportato da ogni
 * browser in circolazione, e cinque componenti lo usano legittimamente senza
 * guardia (ThemeProvider per `prefers-color-scheme`, LottiePlayer, TiltCard,
 * AnimatedNumber e TextEffects per `prefers-reduced-motion`). E' jsdom a non
 * implementarlo, quindi il rimedio sta qui — nell'ambiente di prova — e non
 * nel codice di produzione, che non va piegato a un artefatto dei test.
 *
 * Il finto risponde sempre `matches: false`: nessuna preferenza espressa, che
 * e' il default di un utente qualunque. Un test che voglia il contrario lo
 * sovrascrive da se'.
 */
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string): MediaQueryList =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  });
}

afterEach(() => {
  cleanup();
});
