import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { AgentActivityList, type AgentActivityListLabels } from "../ai/agent-activity-list";
import { AgentPanel, type AgentPanelLabels } from "../ai/agent-panel";

const labels: AgentActivityListLabels = {
  title: "Attività",
  empty: "Nessuna conversazione",
  resume: "Riprendi",
  newConversation: "Nuova conversazione",
  statusLabels: { IN_CORSO: "In corso", IN_ATTESA: "Aspetta te", FATTA: "Fatta", FALLITA: "Fallita", INTERROTTA: "Interrotta" },
  pending: (n) => `${n} in attesa di te`,
};

const items = [
  { id: "c1", title: "Chi è in ferie?", status: "IN_ATTESA" as const, pendingProposals: 2, updatedText: "oggi 10:12" },
  { id: "c2", title: "Riassumi l'unità", status: "INTERROTTA" as const },
  { id: "c3", title: "Appena aperta", status: null },
];

describe("<AgentActivityList />", () => {
  it("mostra stato tradotto, proposte in attesa e data come arrivano", () => {
    render(<AgentActivityList labels={labels} items={items} onSelect={() => undefined} />);
    expect(screen.getAllByTestId("agent-activities-item")).toHaveLength(3);
    expect(screen.getAllByTestId("agent-activities-status").map((b) => b.textContent)).toEqual(["Aspetta te", "Interrotta"]);
    expect(screen.getByTestId("agent-activities-pending")).toHaveTextContent("2 in attesa di te");
    expect(screen.getByText("oggi 10:12")).toBeInTheDocument();
  });

  it("riprendere riporta l'identificativo; la conversazione aperta è marcata", () => {
    const onSelect = vi.fn();
    render(<AgentActivityList labels={labels} items={items} selectedId="c2" onSelect={onSelect} />);
    const pulsanti = screen.getAllByTestId("agent-activities-resume");
    fireEvent.click(pulsanti[0]!);
    expect(onSelect).toHaveBeenCalledWith("c1");
    expect(pulsanti[1]).toHaveAttribute("aria-current", "true");
    expect(pulsanti[0]).not.toHaveAttribute("aria-current");
  });

  it("vuota dice che è vuota; «Nuova conversazione» solo se c'è chi la apre", () => {
    const onNew = vi.fn();
    render(<AgentActivityList labels={labels} items={[]} onSelect={() => undefined} onNew={onNew} />);
    expect(screen.getByTestId("agent-activities-empty")).toHaveTextContent("Nessuna conversazione");
    fireEvent.click(screen.getByTestId("agent-activities-new"));
    expect(onNew).toHaveBeenCalledTimes(1);
    render(<AgentActivityList labels={labels} items={[]} onSelect={() => undefined} testIdPrefix="x" />);
    expect(screen.queryByTestId("x-new")).toBeNull();
  });

  it("axe: nessuna violazione, vuota e piena", async () => {
    for (const lista of [[], items]) {
      const { container, unmount } = render(<AgentActivityList labels={labels} items={lista} selectedId="c1" onSelect={() => undefined} />);
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });
});

const pannello: AgentPanelLabels = {
  title: "Assistente", promptLabel: "Domanda", run: "Chiedi", running: "In corso…", stop: "Ferma",
  streamTitle: "Risposta", streamEmpty: "Niente ancora", approvalTitle: "Approvazione",
  approvalTool: "Strumento", approvalInput: "Dati", allow: "Consenti", deny: "Nega",
  rejectReasonLabel: "Perché la neghi?", rejectConfirm: "Conferma il rifiuto", approvalExpires: "Scade",
};

describe("<AgentPanel /> — rifiuto con motivo (1.3.0)", () => {
  function monta(requireRejectReason: boolean) {
    const onApproval = vi.fn();
    render(
      <AgentPanel labels={pannello} prompt="" onPromptChange={() => undefined} running={false}
        onRun={() => undefined} onStop={() => undefined} lines={[]} onApproval={onApproval}
        requireRejectReason={requireRejectReason}
        approval={{ approvalId: "a-1", tool: "hrx_x", input: {}, expiresText: "10:30" }} />,
    );
    return onApproval;
  }

  it("«Nega» apre il motivo; la conferma resta spenta finché è vuoto e poi porta il testo", () => {
    const onApproval = monta(true);
    expect(screen.getByTestId("agent-approval-expires")).toHaveTextContent("Scade: 10:30");
    fireEvent.click(screen.getByTestId("agent-approve-deny"));
    expect(onApproval).not.toHaveBeenCalled();
    const conferma = screen.getByTestId("agent-reject-confirm");
    expect(conferma).toBeDisabled();
    fireEvent.change(screen.getByTestId("agent-reject-reason"), { target: { value: "  non è il momento " } });
    expect(conferma).not.toBeDisabled();
    fireEvent.click(conferma);
    expect(onApproval).toHaveBeenCalledWith("deny", "non è il momento");
  });

  it("controprova: senza requireRejectReason «Nega» decide subito, come prima", () => {
    const onApproval = monta(false);
    fireEvent.click(screen.getByTestId("agent-approve-deny"));
    expect(onApproval).toHaveBeenCalledWith("deny");
    expect(screen.queryByTestId("agent-reject-reason")).toBeNull();
  });

  it("axe: nessuna violazione con il motivo aperto", async () => {
    const { container } = render(
      <AgentPanel labels={pannello} prompt="" onPromptChange={() => undefined} running={false}
        onRun={() => undefined} onStop={() => undefined} lines={[]} requireRejectReason testIdPrefix="m"
        approval={{ approvalId: "a-2", tool: "hrx_x", input: {} }} />,
    );
    fireEvent.click(screen.getByTestId("m-approve-deny"));
    expect(await axe(container)).toHaveNoViolations();
  });
});
