'use client';

import * as React from 'react';
import { User, Settings, LogOut, Building2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '../../avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '../../dropdown-menu';
import { ROLE_TONE_FALLBACK, type UserIdentity } from './user-identity-card';
import { toneClasses } from '../../../lib/tone-classes';

export interface HeaderUserMenuTenant {
  id: string;
  name: string;
}

export interface HeaderUserMenuProps {
  user?: UserIdentity;
  /** Se assente o con meno di 2 elementi, la voce "Cambia organizzazione" non compare. */
  tenants?: ReadonlyArray<HeaderUserMenuTenant>;
  onSelectTenant?: (id: string) => void;
  onNavigateProfile?: () => void;
  onNavigateSettings?: () => void;
  onLogout?: () => void;
}

export function HeaderUserMenu({
  user,
  tenants,
  onSelectTenant,
  onNavigateProfile,
  onNavigateSettings,
  onLogout,
}: HeaderUserMenuProps) {
  if (!user) return null;

  const showTenantSwitch = (tenants?.length ?? 0) >= 2;
  // Stesso ripiego di HeaderUserIdentity: i due componenti mostrano lo stesso
  // utente e devono colorarlo allo stesso modo.
  const tone = toneClasses(user.roleTone, ROLE_TONE_FALLBACK);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Menu utente: ${user.username}`}
          className="ml-1 flex items-center gap-2 rounded-control border border-border bg-card px-2 py-1.5 transition hover:bg-accent hover:border-foreground/30"
        >
          <Avatar className="h-7 w-7">
            <AvatarFallback className={`text-xs font-semibold ${tone.tint20} ${tone.textOnTint}`}>
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col leading-tight text-left sm:flex">
            <span className="text-xs font-medium text-foreground">{user.username}</span>
            <span className={`font-mono text-[10px] uppercase tracking-wider ${tone.text}`}>
              {user.role}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onNavigateProfile}>
          <User className="mr-2 h-4 w-4" aria-hidden="true" />
          Profilo
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onNavigateSettings}>
          <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
          Impostazioni
        </DropdownMenuItem>
        {showTenantSwitch && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Cambia organizzazione</DropdownMenuLabel>
            {tenants!.map((t) => (
              <DropdownMenuItem key={t.id} onSelect={() => onSelectTenant?.(t.id)}>
                <Building2 className="mr-2 h-4 w-4" aria-hidden="true" />
                {t.name}
              </DropdownMenuItem>
            ))}
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onLogout}>
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          Esci
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HeaderUserMenu;
