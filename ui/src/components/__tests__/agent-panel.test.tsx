import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { AgentPanel, type AgentPanelLabels } from "../ai/agent-panel";

const labels: AgentPanelLabels = {
  title: "Assistente", promptLabel: "Domanda", run: "Chiedi", running: "In corso…", stop: "Ferma",
  streamTitle: "Risposta", streamEmpty: "Niente ancora", approvalTitle: "Approvazione",
  approvalTool: "Strumento", approvalInput: "Dati", allow: "Consenti", deny: "Nega", contextLabel: "Contesto",
};

function monta(over: Partial<React.ComponentProps<typeof AgentPanel>> = {}) {
  const onRun = vi.fn(); const onStop = vi.fn(); const onApproval = vi.fn(); const onPromptChange = vi.fn();
  render(
    <AgentPanel labels={labels} prompt="ciao" onPromptChange={onPromptChange} running={false}
      onRun={onRun} onStop={onStop} lines={[]} onApproval={onApproval} {...over} />,
  );
  return { onRun, onStop, onApproval, onPromptChange };
}

describe("<AgentPanel />", () => {
  it("è una vista pura: le parole vengono dalle labels, non da un namespace proprio", () => {
    monta();
    expect(screen.getByRole("heading", { name: "Assistente" })).toBeInTheDocument();
    expect(screen.getByTestId("agent-stream-empty")).toHaveTextContent("Niente ancora");
  });

  it("il contesto di pagina è un valore libero che si mostra, non un ramo per tipo di pagina", () => {
    monta({ context: "organization-units/OU-0042" });
    expect(screen.getByTestId("agent-context")).toHaveTextContent("Contesto: organization-units/OU-0042");
  });

  it("controprova: senza contesto la riga non esiste", () => {
    monta();
    expect(screen.queryByTestId("agent-context")).toBeNull();
  });

  it("il prefisso dei testid è del consumatore (una pagina con prove E2E non le riscrive)", () => {
    monta({ testIdPrefix: "agentdev" });
    expect(screen.getByTestId("agentdev-prompt")).toBeInTheDocument();
    expect(screen.queryByTestId("agent-prompt")).toBeNull();
  });

  it("Chiedi invoca onRun; con la corsa in atto compare Ferma e il prompt è bloccato", () => {
    const { onRun } = monta();
    fireEvent.click(screen.getByTestId("agent-run"));
    expect(onRun).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("agent-stop")).toBeNull();
    const { onStop } = monta({ running: true, testIdPrefix: "r" });
    expect(screen.getByTestId("r-prompt")).toBeDisabled();
    fireEvent.click(screen.getByTestId("r-stop"));
    expect(onStop).toHaveBeenCalledTimes(1);
  });

  it("l'approvazione mostra strumento e dati come arrivano e riporta la decisione", () => {
    const { onApproval } = monta({ approval: { approvalId: "a-1", tool: "hrx_x_upsert", input: { id: "P-1" } } });
    expect(screen.getByTestId("agent-approval-tool")).toHaveTextContent('"hrx_x_upsert"');
    expect(screen.getByTestId("agent-approval-input")).toHaveTextContent('"id": "P-1"');
    fireEvent.click(screen.getByTestId("agent-approve-deny"));
    expect(onApproval).toHaveBeenCalledWith("deny");
    fireEvent.click(screen.getByTestId("agent-approve-allow"));
    expect(onApproval).toHaveBeenCalledWith("allow");
  });

  it("un avviso di errore è un alert, uno positivo uno status", () => {
    monta({ notice: { kind: "err", text: "rotto" } });
    expect(screen.getByRole("alert")).toHaveTextContent("rotto");
    monta({ notice: { kind: "ok", text: "fatto" }, testIdPrefix: "k" });
    expect(screen.getByTestId("k-notice-ok")).toHaveTextContent("fatto");
  });

  it("le righe dello stream portano il genere come badge", () => {
    monta({ lines: [{ id: 1, kind: "message", text: "a" }, { id: 2, kind: "error", text: "b" }] });
    expect(screen.getAllByTestId("agent-stream-line")).toHaveLength(2);
    expect(screen.getByText("error")).toBeInTheDocument();
  });

  it("axe: nessuna violazione nei tre stati (vuoto, con approvazione, con errore)", async () => {
    const stati: Array<Partial<React.ComponentProps<typeof AgentPanel>>> = [
      {},
      { approval: { approvalId: "a-1", tool: "hrx_x_upsert", input: { id: "P-1" } }, lines: [{ id: 1, kind: "approval_required", text: "x" }] },
      { notice: { kind: "err", text: "rotto" }, lines: [{ id: 1, kind: "error", text: "y" }] },
    ];
    for (const [i, over] of stati.entries()) {
      const { container, unmount } = render(
        <AgentPanel labels={labels} prompt="" onPromptChange={() => undefined} running={false}
          onRun={() => undefined} onStop={() => undefined} lines={[]} testIdPrefix={`s${i}`} {...over} />,
      );
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });
});
