'use client';
import * as React from 'react';
import { cn } from '../../lib/cn';
import { Badge } from '../badge';
import { Button } from '../Button';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';

/**
 * AgentPanel — la superficie riusabile dell'assistente sulle pagine di un'applicazione.
 * (TIER 8, heuresys-advanced #159 F2)
 *
 * È una vista PURA: non apre nessun canale, non traduce, non sa su quale pagina sta.
 *   · il CANALE (stream, corsa, approvazioni) lo porta chi la monta, come stato e callback;
 *   · le PAROLE arrivano già tradotte in `labels`, così ogni consumatore usa il proprio
 *     namespace i18n e nessuna pagina eredita le stringhe della prima;
 *   · il CONTESTO di pagina («sto guardando l'unità X») è un parametro libero (`context`),
 *     mai un ramo condizionale per tipo di pagina: aggiungere una pagina = montare il
 *     componente, zero lavoro qui dentro.
 *
 * `tool` e `input` dell'approvazione si mostrano così come arrivano: chi li produce li ha
 * già redatti a monte, e questa vista non è il posto in cui deciderlo.
 */

export interface AgentPanelLabels {
  title: string;
  description?: string;
  promptLabel: string;
  promptPlaceholder?: string;
  run: string;
  running: string;
  stop: string;
  streamTitle: string;
  streamEmpty: string;
  approvalTitle: string;
  approvalDesc?: string;
  approvalTool: string;
  approvalInput: string;
  allow: string;
  deny: string;
  /** Etichetta davanti a `gatewayUrl`, se lo si mostra. */
  gatewayLabel?: string;
  /** Etichetta davanti al contesto di pagina, se c'è. */
  contextLabel?: string;
}

export interface AgentPanelLine {
  id: number | string;
  /** Il genere della riga: `message`, `approval_required`, `error`, `done`… */
  kind: string;
  text: string;
}

export interface AgentPanelApproval {
  approvalId: string;
  tool: unknown;
  input: unknown;
}

export interface AgentPanelNotice {
  kind: 'ok' | 'err';
  /** Già tradotto da chi monta il pannello. */
  text: string;
}

export interface AgentPanelProps {
  labels: AgentPanelLabels;
  /** Il contesto di pagina, come valore libero: si mostra e si passa, non si interpreta. */
  context?: string | null;
  prompt: string;
  onPromptChange: (value: string) => void;
  running: boolean;
  onRun: () => void;
  onStop: () => void;
  lines: readonly AgentPanelLine[];
  approval?: AgentPanelApproval | null;
  onApproval?: (decision: 'allow' | 'deny') => void;
  notice?: AgentPanelNotice | null;
  /** Se presente si mostra in piccolo: è un indirizzo, mai un segreto. */
  gatewayUrl?: string;
  /** Prefisso dei `data-testid` (default `agent`): un consumatore che ha già delle prove
   *  E2E lo imposta sul proprio e non le riscrive. */
  testIdPrefix?: string;
  className?: string;
}

function toneOf(kind: string): 'destructive' | 'secondary' | 'outline' {
  if (kind === 'error') return 'destructive';
  if (kind === 'approval_required') return 'secondary';
  return 'outline';
}

export function AgentPanel({
  labels,
  context = null,
  prompt,
  onPromptChange,
  running,
  onRun,
  onStop,
  lines,
  approval = null,
  onApproval,
  notice = null,
  gatewayUrl,
  testIdPrefix = 'agent',
  className,
}: AgentPanelProps) {
  const id = (s: string) => `${testIdPrefix}-${s}`;
  const promptId = React.useId();

  return (
    <div className={cn('space-y-6', className)} data-testid={id('page')} role="region" aria-label={labels.title}>
      <Card>
        <CardHeader>
          <CardTitle data-testid={id('title')}>{labels.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {labels.description && <p className="text-sm text-muted-fg">{labels.description}</p>}
          {context && (
            <p className="text-xs text-muted-fg" data-testid={id('context')}>
              {labels.contextLabel ? `${labels.contextLabel}: ` : null}
              <code className="font-mono">{context}</code>
            </p>
          )}
          {gatewayUrl && (
            <p className="text-xs text-muted-fg">
              {labels.gatewayLabel ? `${labels.gatewayLabel}: ` : null}
              <code className="font-mono">{gatewayUrl}</code>
            </p>
          )}

          <div className="space-y-1">
            <label htmlFor={promptId} className="block text-sm font-medium text-foreground">
              {labels.promptLabel}
            </label>
            <textarea
              id={promptId}
              data-testid={id('prompt')}
              className="min-h-28 w-full rounded-md border border-input bg-background p-3 text-sm text-foreground"
              placeholder={labels.promptPlaceholder}
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              disabled={running}
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" data-testid={id('run')} onClick={onRun} disabled={running || !prompt.trim()}>
              {running ? labels.running : labels.run}
            </Button>
            {running && (
              <Button type="button" variant="secondary" data-testid={id('stop')} onClick={onStop}>
                {labels.stop}
              </Button>
            )}
          </div>

          {notice && (
            <p
              data-testid={notice.kind === 'ok' ? id('notice-ok') : id('notice-err')}
              className={cn('text-sm font-medium', notice.kind === 'ok' ? 'text-success-ink' : 'text-danger-ink')}
              role={notice.kind === 'err' ? 'alert' : 'status'}
            >
              {notice.text}
            </p>
          )}
        </CardContent>
      </Card>

      {approval && (
        <Card data-testid={id('approval')}>
          <CardHeader>
            <CardTitle>{labels.approvalTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {labels.approvalDesc && <p className="text-sm text-muted-fg">{labels.approvalDesc}</p>}
            <div className="space-y-1 text-sm">
              <span className="font-medium text-foreground">{labels.approvalTool}:</span>{' '}
              <code data-testid={id('approval-tool')} className="break-all font-mono">
                {JSON.stringify(approval.tool)}
              </code>
            </div>
            <div className="space-y-1 text-sm">
              <span className="font-medium text-foreground">{labels.approvalInput}:</span>
              <pre
                data-testid={id('approval-input')}
                className="mt-1 max-h-48 overflow-auto rounded bg-muted p-2 font-mono text-xs"
              >
                {JSON.stringify(approval.input, null, 2)}
              </pre>
            </div>
            <div className="flex gap-3">
              <Button type="button" data-testid={id('approve-allow')} onClick={() => onApproval?.('allow')}>
                {labels.allow}
              </Button>
              <Button
                type="button"
                variant="destructive"
                data-testid={id('approve-deny')}
                onClick={() => onApproval?.('deny')}
              >
                {labels.deny}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{labels.streamTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          {lines.length === 0 ? (
            <p data-testid={id('stream-empty')} className="text-sm text-muted-fg">
              {labels.streamEmpty}
            </p>
          ) : (
            <ul data-testid={id('stream')} className="space-y-1" aria-live="polite">
              {lines.map((line) => (
                <li key={line.id} data-testid={id('stream-line')} className="flex items-start gap-2 text-xs">
                  <Badge variant={toneOf(line.kind)}>{line.kind}</Badge>
                  <code className="break-all font-mono text-muted-fg">{line.text}</code>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
