'use client';

import * as React from 'react';

export interface UserIdentity {
  initials: string;
  username: string;
  role: string;
  /** Tailwind color token without the leading `text-` prefix. Default "warning". */
  roleTone?: string;
}

export interface HeaderUserIdentityProps {
  user?: UserIdentity;
}

export function HeaderUserIdentity({ user }: HeaderUserIdentityProps) {
  if (!user) return null;

  return (
    <div className="ml-1 flex items-center gap-2 rounded-control border border-border bg-card px-2 py-1.5">
      <span
        className={`relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-${user.roleTone ?? 'palette-3'}/20 text-xs font-semibold text-${user.roleTone ?? 'palette-3'}`}
      >
        {user.initials}
      </span>
      <div className="hidden flex-col leading-tight sm:flex">
        <span className="text-xs font-medium text-foreground">{user.username}</span>
        <span
          className={`font-mono text-[10px] uppercase tracking-wider text-${user.roleTone ?? 'warning'}`}
        >
          {user.role}
        </span>
      </div>
    </div>
  );
}

export default HeaderUserIdentity;
