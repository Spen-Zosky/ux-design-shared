import * as React from 'react';
import { cn } from '../lib/cn';
import type { CardTitleLevel } from './Card';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  /** Livello del titolo (1.7.0). Default `h3`, come prima: chi mostra lo stato subito
   *  sotto l'`h1` della pagina passa `h2`, per non saltare un livello. */
  headingLevel?: CardTitleLevel;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  headingLevel: Heading = 'h3',
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 p-10 text-center',
        className
      )}
      {...props}
    >
      {icon ? <div className="text-muted-fg">{icon}</div> : null}
      <Heading className="text-base font-semibold">{title}</Heading>
      {description ? <p className="max-w-prose text-sm text-muted-fg">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

export interface ErrorStateProps extends EmptyStateProps {
  retry?: () => void;
}

export function ErrorState({ title = 'Something went wrong', ...rest }: Partial<ErrorStateProps>) {
  return <EmptyState title={title} {...rest} />;
}
