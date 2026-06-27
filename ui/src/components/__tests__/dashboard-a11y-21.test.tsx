/**
 * A11y regression guards for the #21 audit residue (forensic QA S1006).
 *
 * Four live axe violations on the authenticated /dashboard were rooted in shell
 * components, fixed here. These guards lock the fixes so a future refactor cannot
 * silently reintroduce them. jsdom has no layout, so the tap-target fix is checked
 * by class (as in Button.a11y.test.tsx) and the landmark/scroll fixes by DOM shape.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import { DashboardShell } from '../dashboard/DashboardShell';
import { DashboardSidebar } from '../dashboard/DashboardSidebar';
import { AuditFeed } from '../dashboard/AuditFeed';
import { LogStream } from '../dashboard/LogStream';

describe('#21 a11y — DashboardShell landmark', () => {
  it('does NOT render its own <main> (pages own the single main landmark)', () => {
    const { container } = render(
      <DashboardShell header={<div />} sidebar={<div />} footer={<div />}>
        <main data-testid="page-main">page content</main>
      </DashboardShell>
    );
    // Exactly one <main> in the tree — the page's. The shell wraps in a <div>,
    // so axe landmark-no-duplicate-main / landmark-unique / main-is-top-level
    // can no longer fire.
    expect(container.querySelectorAll('main')).toHaveLength(1);
    expect(container.querySelector('[data-testid="page-main"]')?.tagName).toBe('MAIN');
  });

  it('keeps the scroll container keyboard-focusable (scrollable-region-focusable)', () => {
    const { container } = render(
      <DashboardShell header={<div />} sidebar={<div />} footer={<div />}>
        <main>x</main>
      </DashboardShell>
    );
    const scroller = container.querySelector('div.overflow-y-auto');
    expect(scroller).toBeTruthy();
    expect(scroller?.getAttribute('tabindex')).toBe('0');
  });
});

describe('#21 a11y — sidebar group toggle tap-target (>=24px)', () => {
  it('sidebar-group-toggle has min-h-6 (was 23px, WCAG 2.5.8 target-size)', () => {
    const { container } = render(
      <DashboardSidebar
        groups={[{ id: 'g1', label: 'Group', items: [{ id: 'i1', label: 'Item', href: '#' }] }]}
      />
    );
    const toggle = container.querySelector('button.sidebar-group-toggle');
    expect(toggle).toBeTruthy();
    expect(toggle?.className).toContain('min-h-6');
  });
});

describe('#21 a11y — feed scroll containers keyboard access', () => {
  it('AuditFeed list is focusable and named', () => {
    const { container } = render(
      <AuditFeed events={[{ icon: null, tone: 'info', title: 'Event' }]} title="Audit feed" />
    );
    const ul = container.querySelector('ul.overflow-y-auto');
    expect(ul?.getAttribute('tabindex')).toBe('0');
    expect(ul?.getAttribute('aria-label')).toBe('Audit feed');
  });

  it('LogStream list is focusable and named', () => {
    const { container } = render(
      <LogStream
        entries={[{ timestamp: '00:00:00', level: 'info', source: 'db', message: 'ready' }]}
        title="Live log stream"
      />
    );
    const ol = container.querySelector('ol.overflow-y-auto');
    expect(ol?.getAttribute('tabindex')).toBe('0');
    expect(ol?.getAttribute('aria-label')).toBe('Live log stream');
  });
});
