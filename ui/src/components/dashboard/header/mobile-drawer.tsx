'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Dialog, DialogTitle } from '../../dialog';
import { cn } from '../../../lib/cn';

export interface HeaderMobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

/**
 * Drawer di navigazione mobile, aperto dall'hamburger dell'header.
 * A differenza di DialogContent (centrato), questo slide da sinistra e
 * occupa l'altezza intera — pattern drawer, non modale centrata.
 */
export function HeaderMobileDrawer({ open, onOpenChange, children }: HeaderMobileDrawerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            'fixed inset-y-0 left-0 z-50 h-full w-72 max-w-[85vw] overflow-y-auto border-r border-border bg-background p-4 shadow-lg',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left'
          )}
        >
          <DialogTitle className="sr-only">Menu di navigazione</DialogTitle>
          <DialogPrimitive.Close className="absolute right-3 top-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring">
            <X className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Chiudi</span>
          </DialogPrimitive.Close>
          <div className="mt-8">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}

export default HeaderMobileDrawer;
