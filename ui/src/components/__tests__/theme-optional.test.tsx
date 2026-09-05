import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardHeader } from "../dashboard/DashboardHeader";
import { HeaderThemeToggle } from "../dashboard/header/theme-toggle-button";
import { ThemeProvider } from "../theme-provider";

/**
 * Il guscio non deve cadere per colpa di un pulsante.
 *
 * `useTheme()` lancia se manca il provider. Finche' il tema era una faccenda
 * di pagina andava bene; da quando `DashboardHeader` monta il toggle, quella
 * eccezione risale fino a spegnere l'header e con esso l'intera pagina. E'
 * gia' successo: la story di `DashboardShell` restava bianca, e la causa vera
 * ("useTheme must be used within ThemeProvider") era sepolta in un allegato.
 *
 * In produzione il provider c'e' — verificato in entrambi i consumatori — ma
 * questi test fissano il comportamento per chi arrivera' dopo.
 */
describe("il tema come dipendenza opzionale", () => {
  it("monta DashboardHeader senza ThemeProvider, senza lanciare", () => {
    expect(() => render(<DashboardHeader />)).not.toThrow();
  });

  it("senza provider il toggle c'e' ma e' inerte, e lo dichiara", () => {
    render(<HeaderThemeToggle />);
    const btn = screen.getByRole("button", { name: /alterna tema/i });

    // Presente: il layout non salta. Disabilitato: non promette un'azione che
    // non puo' compiere. Con un motivo leggibile, invece che muto.
    expect(btn).toBeDisabled();
    expect(btn.getAttribute("title")).toMatch(/ThemeProvider/);
  });

  it("con il provider il toggle torna operativo", () => {
    render(
      <ThemeProvider>
        <HeaderThemeToggle />
      </ThemeProvider>,
    );
    const btn = screen.getByRole("button", { name: /alterna tema/i });

    expect(btn).not.toBeDisabled();
    expect(btn.getAttribute("title")).toBeNull();
  });
});
