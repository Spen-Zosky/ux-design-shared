'use client';
import * as React from 'react';
import { cn } from '../../lib/cn';
import { Badge } from '../badge';
import { Button } from '../Button';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';

/**
 * AgentActivityList — la colonna delle attività dell'assistente (TIER 8, 1.3.0;
 * heuresys-advanced ADR-0056 D4).
 *
 * Una conversazione con l'assistente non vive più dentro la finestra: resta salvata, e il lavoro
 * continua anche a finestra chiusa. Questa colonna è ciò che la persona ritrova riaprendo: le
 * sue conversazioni, lo stato dell'ultima attività di ciascuna, quante proposte aspettano una
 * sua decisione, e il gesto per riprenderne una.
 *
 * Vista PURA, come `AgentPanel`: non legge niente, non traduce, non formatta date. Le parole
 * arrivano in `labels`, gli stati come codici con la loro etichetta già tradotta in
 * `statusLabels`, e la data come testo già formattato.
 */

/** Gli stati di un'attività. `INTERROTTA` comprende quella rimasta aperta oltre la durata. */
export type AgentActivityStatus = 'IN_CORSO' | 'IN_ATTESA' | 'FATTA' | 'FALLITA' | 'INTERROTTA';

export interface AgentActivityListItem {
  id: string;
  title: string;
  /** Lo stato dell'ultima attività, `null` se la conversazione non ne ha ancora. */
  status: AgentActivityStatus | null;
  /** Già formattato da chi monta la colonna. */
  updatedText?: string;
  /** Le proposte che aspettano la persona. */
  pendingProposals?: number;
}

export interface AgentActivityListLabels {
  title: string;
  empty: string;
  /** Il pulsante che riprende una conversazione. */
  resume: string;
  /** Il pulsante che apre una conversazione nuova, se `onNew` c'è. */
  newConversation?: string;
  /** Le etichette dei cinque stati, già tradotte. */
  statusLabels: Record<AgentActivityStatus, string>;
  /** «{n} in attesa di te»: chi monta la colonna lo costruisce, qui si mostra. */
  pending?: (n: number) => string;
}

export interface AgentActivityListProps {
  labels: AgentActivityListLabels;
  items: readonly AgentActivityListItem[];
  /** La conversazione aperta adesso, se c'è. */
  selectedId?: string | null;
  onSelect: (id: string) => void;
  onNew?: () => void;
  testIdPrefix?: string;
  className?: string;
}

function toneOf(status: AgentActivityStatus | null): 'destructive' | 'secondary' | 'outline' | 'default' {
  if (status === 'FALLITA') return 'destructive';
  if (status === 'IN_ATTESA') return 'default';
  if (status === 'IN_CORSO') return 'secondary';
  return 'outline';
}

export function AgentActivityList({
  labels,
  items,
  selectedId = null,
  onSelect,
  onNew,
  testIdPrefix = 'agent-activities',
  className,
}: AgentActivityListProps) {
  const id = (s: string) => `${testIdPrefix}-${s}`;
  return (
    <Card className={cn(className)} data-testid={id('list')} role="region" aria-label={labels.title}>
      <CardHeader>
        <CardTitle>{labels.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {onNew && labels.newConversation && (
          <Button type="button" variant="outline" size="sm" data-testid={id('new')} onClick={onNew}>
            {labels.newConversation}
          </Button>
        )}
        {items.length === 0 ? (
          <p className="text-sm text-muted-fg" data-testid={id('empty')}>
            {labels.empty}
          </p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => {
              const scelta = item.id === selectedId;
              const inAttesa = item.pendingProposals ?? 0;
              return (
                <li
                  key={item.id}
                  data-testid={id('item')}
                  data-selected={scelta ? 'true' : undefined}
                  className={cn(
                    'flex items-start justify-between gap-3 rounded-md border border-border p-2',
                    scelta && 'bg-muted',
                  )}
                >
                  <div className="min-w-0 space-y-1">
                    <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-fg">
                      {item.status && (
                        <Badge variant={toneOf(item.status)} data-testid={id('status')}>
                          {labels.statusLabels[item.status]}
                        </Badge>
                      )}
                      {inAttesa > 0 && labels.pending && (
                        <span data-testid={id('pending')}>{labels.pending(inAttesa)}</span>
                      )}
                      {item.updatedText && <span>{item.updatedText}</span>}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant={scelta ? 'secondary' : 'ghost'}
                    size="sm"
                    data-testid={id('resume')}
                    aria-current={scelta ? 'true' : undefined}
                    aria-label={`${labels.resume}: ${item.title}`}
                    onClick={() => onSelect(item.id)}
                  >
                    {labels.resume}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
