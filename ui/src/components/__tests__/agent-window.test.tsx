import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { AgentLauncher, AgentWindow, type AgentWindowLabels } from "../ai/agent-window";

const labels: AgentWindowLabels = { title: "Assistente", close: "Chiudi", toggleAside: "Attività", sideTitle: "Pagine e proposte" };

describe("<AgentLauncher />", () => {
  it("dice se è aperto e se c'è un lavoro in corso, e non fa altro che chiedere di aprire", () => {
    const onToggle = vi.fn();
    const { rerender } = render(<AgentLauncher label="Assistente" busyLabel="lavoro in corso" open={false} onToggle={onToggle} />);
    const b = screen.getByTestId("agent-launcher");
    expect(b).toHaveAttribute("aria-expanded", "false");
    expect(b).toHaveAccessibleName("Assistente");
    expect(screen.queryByTestId("agent-launcher-busy")).toBeNull();
    fireEvent.click(b);
    expect(onToggle).toHaveBeenCalledOnce();
    rerender(<AgentLauncher label="Assistente" busyLabel="lavoro in corso" open busy onToggle={onToggle} />);
    expect(b).toHaveAttribute("aria-expanded", "true");
    expect(b).toHaveAccessibleName("Assistente, lavoro in corso");
    expect(screen.getByTestId("agent-launcher-busy")).toBeInTheDocument();
  });
});

describe("<AgentWindow />", () => {
  it("chiusa si nasconde senza smontare ciò che contiene", () => {
    const { rerender } = render(
      <AgentWindow labels={labels} open onClose={() => undefined}>
        <p data-testid="conversazione">testo</p>
      </AgentWindow>,
    );
    const nodo = screen.getByTestId("conversazione");
    rerender(
      <AgentWindow labels={labels} open={false} onClose={() => undefined}>
        <p data-testid="conversazione">testo</p>
      </AgentWindow>,
    );
    expect(screen.getByTestId("agent-window")).not.toBeVisible();
    expect(screen.getByTestId("conversazione")).toBe(nodo);
  });

  it("tre aree: attività comprimibile, conversazione, lato; Esc e la croce chiudono", () => {
    const onClose = vi.fn();
    const onToggleAside = vi.fn();
    const { rerender } = render(
      <AgentWindow labels={labels} open onClose={onClose} aside={<p>attività</p>} onToggleAside={onToggleAside} side={<p>pagine</p>}>
        <p>conversazione</p>
      </AgentWindow>,
    );
    expect(screen.getByRole("dialog", { name: "Assistente" })).toHaveAttribute("aria-modal", "false");
    expect(screen.getByTestId("agent-window-aside")).toHaveTextContent("attività");
    expect(screen.getByTestId("agent-window-side")).toHaveTextContent("pagine");
    fireEvent.click(screen.getByTestId("agent-window-aside-toggle"));
    expect(onToggleAside).toHaveBeenCalledOnce();
    rerender(
      <AgentWindow labels={labels} open onClose={onClose} aside={<p>attività</p>} asideCollapsed onToggleAside={onToggleAside}>
        <p>conversazione</p>
      </AgentWindow>,
    );
    expect(screen.queryByTestId("agent-window-aside")).toBeNull();
    expect(screen.getByTestId("agent-window-aside-toggle")).toHaveAttribute("aria-expanded", "false");
    fireEvent.keyDown(window, { key: "Escape" });
    fireEvent.click(screen.getByTestId("agent-window-close"));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("chiusa, Esc non fa niente", () => {
    const onClose = vi.fn();
    render(<AgentWindow labels={labels} open={false} onClose={onClose}><p>x</p></AgentWindow>);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("nessuna violazione di accessibilità, con il simbolo accanto", async () => {
    const { container } = render(
      <div>
        <AgentLauncher label="Assistente" open onToggle={() => undefined} />
        <AgentWindow labels={labels} open onClose={() => undefined} aside={<p>attività</p>} onToggleAside={() => undefined} side={<p>pagine</p>}>
          <p>conversazione</p>
        </AgentWindow>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
