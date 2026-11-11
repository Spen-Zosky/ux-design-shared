'use client';
import * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * AgentLauncher e AgentWindow — il simbolo e la finestra dell'assistente (TIER 8, 1.4.0;
 * heuresys-advanced, piano dell'assistente nelle interfacce, blocco I2, logiche L1, L2, L9).
 *
 * Un simbolo fisso in un angolo, uguale in ogni pagina, con un puntino quando un lavoro è in
 * corso. Il clic non avvia niente: mostra la finestra, che si apre SOPRA la pagina senza
 * spostarla, si ridimensiona dall'angolo e si chiude senza fermare il lavoro (le conversazioni
 * vivono sul server). La disposizione è quella di un'interfaccia di conversazione: a sinistra le
 * attività (comprimibile), al centro la conversazione, a destra ciò che l'attività ha toccato o
 * prodotto.
 *
 * La finestra è un dialogo NON modale (`aria-modal="false"`) di proposito: l'assistente cambia
 * la vista della pagina (filtra una tabella, ordina) e la persona deve vederlo accadere e poter
 * usare la pagina mentre la finestra è aperta. Esc la chiude.
 *
 * Viste PURE: nessuno stato del server, nessuna parola scritta qui. Le parole arrivano in
 * `labels`; aperto, compresso e occupato li decide chi monta.
 */

/** Il simbolo: un segno generico di assistenza (una scintilla dentro un fumetto), non un marchio. */
export function AgentSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cn('h-6 w-6', className)}>
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16h0A2.5 2.5 0 0 1 4 13.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 6.2l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z" fill="currentColor" />
    </svg>
  );
}

export interface AgentLauncherProps {
  /** Il nome accessibile del pulsante, per esempio «Assistente». */
  label: string;
  /** Detto ai lettori di schermo quando c'è un lavoro in corso, per esempio «lavoro in corso». */
  busyLabel?: string;
  open: boolean;
  /** Un lavoro dell'assistente è in corso o aspetta la persona: il puntino. */
  busy?: boolean;
  onToggle: () => void;
  testIdPrefix?: string;
  className?: string;
}

export function AgentLauncher({
  label,
  busyLabel,
  open,
  busy = false,
  onToggle,
  testIdPrefix = 'agent',
  className,
}: AgentLauncherProps) {
  return (
    <button
      type="button"
      data-testid={`${testIdPrefix}-launcher`}
      aria-label={busy && busyLabel ? `${label}, ${busyLabel}` : label}
      aria-expanded={open}
      aria-haspopup="dialog"
      onClick={onToggle}
      className={cn(
        'fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full',
        'border border-border bg-background text-foreground shadow-lg transition-colors',
        'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        open && 'bg-muted',
        className,
      )}
    >
      <AgentSymbol />
      {busy && (
        <span
          data-testid={`${testIdPrefix}-launcher-busy`}
          aria-hidden="true"
          className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-background bg-primary"
        />
      )}
    </button>
  );
}

export interface AgentWindowLabels {
  title: string;
  close: string;
  /** Il pulsante che comprime o riapre la colonna di sinistra. */
  toggleAside: string;
  /** Il nome della colonna di destra, se c'è. */
  sideTitle?: string;
}

export interface AgentWindowProps {
  labels: AgentWindowLabels;
  open: boolean;
  onClose: () => void;
  /** Colonna di sinistra: le attività. */
  aside?: React.ReactNode;
  asideCollapsed?: boolean;
  onToggleAside?: () => void;
  /** Colonna di destra: pagine toccate, proposte, prodotti. */
  side?: React.ReactNode;
  /** Il centro: la conversazione. */
  children: React.ReactNode;
  testIdPrefix?: string;
  className?: string;
}

export function AgentWindow({
  labels,
  open,
  onClose,
  aside,
  asideCollapsed = false,
  onToggleAside,
  side,
  children,
  testIdPrefix = 'agent',
  className,
}: AgentWindowProps) {
  const id = (s: string) => `${testIdPrefix}-${s}`;
  const titoloId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open, onClose]);

  // Chiusa, la finestra non si smonta: si nasconde, e ciò che contiene (la conversazione, lo
  // stream) resta vivo. È la stessa regola del lavoro che continua sul server.
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titoloId}
      hidden={!open}
      data-testid={id('window')}
      className={cn(
        'fixed bottom-20 right-5 z-40 flex flex-col overflow-hidden rounded-lg border border-border',
        'bg-background text-foreground shadow-2xl',
        // Si ridimensiona dall'angolo; i limiti la tengono dentro lo schermo anche sul telefono.
        'h-[min(640px,calc(100vh-7rem))] w-[min(960px,calc(100vw-2.5rem))] min-h-[320px] min-w-[300px]',
        'max-h-[calc(100vh-7rem)] max-w-[calc(100vw-2.5rem)] resize',
        className,
      )}
    >
      <header className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          {aside !== undefined && onToggleAside && (
            <button
              type="button"
              data-testid={id('window-aside-toggle')}
              aria-label={labels.toggleAside}
              aria-expanded={!asideCollapsed}
              onClick={onToggleAside}
              className="rounded p-1 text-muted-fg hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M9 4v16" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          )}
          <AgentSymbol className="h-5 w-5" />
          <h2 id={titoloId} className="text-sm font-semibold">
            {labels.title}
          </h2>
        </div>
        <button
          type="button"
          data-testid={id('window-close')}
          aria-label={labels.close}
          onClick={onClose}
          className="rounded p-1 text-muted-fg hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </header>
      <div className="relative flex min-h-0 flex-1">
        {aside !== undefined && !asideCollapsed && (
          // Sul telefono la colonna copre la conversazione finché la si comprime; da tablet in su sta accanto.
          <aside
            data-testid={id('window-aside')}
            className="absolute inset-y-0 left-0 z-10 w-64 max-w-[85%] shrink-0 overflow-y-auto border-r border-border bg-background p-2 sm:static sm:max-w-none">
            {aside}
          </aside>
        )}
        {/* Non un <main>: la pagina ha già il suo, e la finestra le sta sopra. */}
        <div data-testid={id('window-main')} className="min-w-0 flex-1 overflow-y-auto p-3">
          {children}
        </div>
        {side !== undefined && (
          <aside
            data-testid={id('window-side')}
            aria-label={labels.sideTitle}
            className="hidden w-60 shrink-0 overflow-y-auto border-l border-border p-2 lg:block"
          >
            {side}
          </aside>
        )}
      </div>
    </div>
  );
}
