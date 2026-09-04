'use client';

import * as React from 'react';
import { toneClasses, type ToneInput } from '../../../lib/tone-classes';

export interface UserIdentity {
  initials: string;
  username: string;
  role: string;
  /**
   * Tono di marca del ruolo, senza prefisso di utility (`info`, `warning`,
   * `palette-3`, ...). Un valore fuori elenco degrada al tono di ripiego
   * invece di produrre una classe inesistente.
   */
  roleTone?: ToneInput;
}

/**
 * Ripiego unico per entrambe le righe.
 *
 * Prima erano DUE: l'avatar cadeva su `palette-3` e il ruolo su `warning`, per
 * cui un utente senza `roleTone` compariva con l'iniziale viola e la qualifica
 * ambra nello stesso blocco. Nessuno l'aveva deciso: era una svista, ereditata
 * identica anche da user-menu.tsx.
 */
export const ROLE_TONE_FALLBACK = 'palette-3' as const;

export interface HeaderUserIdentityProps {
  user?: UserIdentity;
}

export function HeaderUserIdentity({ user }: HeaderUserIdentityProps) {
  if (!user) return null;

  const tone = toneClasses(user.roleTone, ROLE_TONE_FALLBACK);

  return (
    <div className="ml-1 flex items-center gap-2 rounded-control border border-border bg-card px-2 py-1.5">
      {/* Iniziali su tinta 20%: il testo usa la rampa ink, non il token pieno.
          Misurato, il token pieno su questa tinta scende fino a 1,85:1. */}
      <span
        className={`relative inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${tone.tint20} ${tone.textOnTint}`}
      >
        {user.initials}
      </span>
      <div className="hidden flex-col leading-tight sm:flex">
        <span className="text-xs font-medium text-foreground">{user.username}</span>
        {/* Il ruolo sta su --card, non su una tinta: qui il token pieno e' la
            scelta giusta ed e' gia' AA. */}
        <span className={`font-mono text-[10px] uppercase tracking-wider ${tone.text}`}>
          {user.role}
        </span>
      </div>
    </div>
  );
}

export default HeaderUserIdentity;
