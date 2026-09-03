# Priority-1 Simple Components — Storybook Coverage Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dare una story Storybook, sotto un gruppo con nome parlante, a 18 componenti del design system che sono usati in produzione (in `heuresys-advanced` e/o `heuresys-datastore`) ma oggi invisibili in Storybook. Nessuna modifica al codice sorgente dei componenti — solo aggiunta della `.stories.tsx` mancante — tranne dove esplicitamente notato (DashboardShell/Footer/Sidebar restano invariati, Header è coperto da un piano separato già pronto).

**Architecture:** Un task per componente. Ogni story usa dati d'esempio derivati dall'uso reale già verificato nei report d'indagine (2026-09-03) — non inventati a caso. Dove il componente ha varianti "produzione" vs "solo showcase dev-only", la story lo dichiara esplicitamente nella sua descrizione, così chi la legge sa se sta guardando un pattern realmente in uso o un fixture dimostrativo.

**Tech Stack:** Storybook 10, React 19, TypeScript.

**Spec:** i 4 report d'indagine del 2026-09-03 (agenti Explore, sola lettura) che hanno prodotto i fatti citati in ogni task — non esiste un documento spec separato per questo piano, i fatti sono citati inline in ogni task con file:riga.

## Global Constraints

- Zero modifiche ai file `.tsx` sorgente dei componenti in questo piano — solo nuovi file `.stories.tsx`.
- Ogni story usa `title: 'Components/<Nome>'` salvo dove diversamente specificato (DashboardFooter/Sidebar/Shell restano sotto un gruppo dedicato, coerente col piano Header).
- Ogni story riporta nella sua descrizione se il componente ha uso reale in produzione o solo in pagine `/showcase` dev-only (fatto verificato, non assunto).
- Dopo ogni task: `pnpm run typecheck` pulito.
- Nessuna modifica a `heuresys-advanced` o `heuresys-datastore`.

---

## Task 1: `DashboardFooter`

**Files:** Create `ui/src/components/dashboard/DashboardFooter.stories.tsx`

**Fatti** (report 2026-09-03): props `rightSlot?, socials? (default DEFAULT_SOCIALS, tutti href:'#'), websiteHref? (default 'https://www.heuresys.com'), className?`. **Nessun consumer passa mai `socials`** — le 5 icone social sono link morti (`href:'#'`) in ogni superficie, incluso `heuresys-datastore/apps/web/src/app/guscio.tsx:182` (zero props). Il testo del link "heuresys.com" è hardcoded, indipendente da `websiteHref` (mismatch potenziale se un consumer passasse un href diverso).

```tsx
// ui/src/components/dashboard/DashboardFooter.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardFooter, type SocialLink } from './DashboardFooter';

const meta: Meta<typeof DashboardFooter> = {
  title: 'Layout/Dashboard Footer',
  component: DashboardFooter,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DashboardFooter>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Configurazione di default (zero props) — identica a come viene montato in produzione in entrambi i consumer (heuresys-datastore/apps/web/src/app/guscio.tsx:182). Le 5 icone social usano DEFAULT_SOCIALS con href="#" (link morti) perché nessun consumer verificato passa mai `socials`.',
      },
    },
  },
};

export const WithRightSlot: Story = {
  args: {
    rightSlot: <span className="text-xs text-muted-foreground">v5.0.0-mvp3 · build 2847</span>,
  },
  parameters: {
    docs: {
      description: { story: 'Pattern reale in heuresys-advanced: rightSlot con versione/build (es. layout.tsx:227-236).' },
    },
  },
};

const customSocials: readonly SocialLink[] = [
  { id: 'linkedin', href: 'https://linkedin.com/company/heuresys', label: 'LinkedIn' },
  { id: 'github', href: 'https://github.com/heuresys', label: 'GitHub' },
];

export const WithRealSocialLinks: Story = {
  args: { socials: customSocials },
  parameters: {
    docs: {
      description: {
        story:
          'Nessun consumer verificato usa questa combinazione oggi — dimostra che il problema (link morti) è risolvibile passando `socials` con href reali, non un limite del componente.',
      },
    },
  },
};
```

- [ ] **Step 1: Crea il file sopra**
- [ ] **Step 2: Verifica typecheck** — `cd ui && pnpm run typecheck` → nessun errore
- [ ] **Step 3: Verifica story** — `cd ui && pnpm exec playwright test -g "Dashboard Footer" --workers=1` → `3 passed`
- [ ] **Step 4: Commit** — `git add ui/src/components/dashboard/DashboardFooter.stories.tsx && git commit -m "feat(ui): story per DashboardFooter"`

---

## Task 2: `DashboardSidebar`

**Files:** Create `ui/src/components/dashboard/DashboardSidebar.stories.tsx`

**Fatti**: props `groups: NavGroup[], footerSlot?, className?`. `NavGroup{id,label,items?,customContent?,defaultExpanded?}`, `NavItem{id,label,href,icon?,aux?,active?}`. In produzione, `heuresys-datastore/apps/web/src/app/guscio.tsx:89-180` passa 3 gruppi hardcoded (archivio/lavoro/modellazione); `heuresys-advanced` costruisce i gruppi dinamicamente da un'API. **Nessun logout nel footer di default** (`DefaultSidebarFooter`, solo versione + pallino stato) — il logout, dove esiste, è markup locale del consumer passato via `footerSlot` (`heuresys-advanced/apps/web/src/app/(authenticated)/layout.tsx:210-221`).

```tsx
// ui/src/components/dashboard/DashboardSidebar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardSidebar, type NavGroup } from './DashboardSidebar';
import { Button } from '../Button';

const meta: Meta<typeof DashboardSidebar> = {
  title: 'Layout/Dashboard Sidebar',
  component: DashboardSidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DashboardSidebar>;

const groups: NavGroup[] = [
  {
    id: 'archivio',
    label: 'Archivio',
    defaultExpanded: true,
    items: [
      { id: 'cataloghi', label: 'Cataloghi', href: '/cataloghi' },
      { id: 'cerca', label: 'Cerca', href: '/cerca' },
      { id: 'stato', label: 'Stato import', href: '/stato', aux: <span className="text-xs text-success">●</span> },
    ],
  },
  {
    id: 'modellazione',
    label: 'Modellazione',
    items: [
      { id: 'prototipi', label: 'Prototipi', href: '/prototipi' },
      { id: 'classi', label: 'Classi dimensionali', href: '/classi-dimensionali' },
    ],
  },
];

export const Default: Story = {
  args: { groups },
  parameters: {
    docs: {
      description: {
        story:
          'Struttura equivalente a heuresys-datastore/apps/web/src/app/guscio.tsx (3 gruppi, gerarchia a 2 livelli). Il DefaultSidebarFooter interno (versione + stato) è quello usato quando footerSlot non è passato.',
      },
    },
  },
};

export const WithFooterSlotLogout: Story = {
  args: {
    groups,
    footerSlot: (
      <div className="flex items-center justify-between px-2 py-2 text-xs">
        <span>mario.rossi@heuresys.com</span>
        <Button variant="ghost" size="sm">Esci</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pattern reale in heuresys-advanced: il logout non è dentro il componente, è markup locale del consumer passato via footerSlot (layout.tsx:210-221) — dimostrato qui per chiarezza, non è un default del componente.',
      },
    },
  },
};
```

- [ ] **Step 1: Crea il file sopra**
- [ ] **Step 2: Verifica typecheck**
- [ ] **Step 3: Verifica story** — `pnpm exec playwright test -g "Dashboard Sidebar" --workers=1` → `2 passed`
- [ ] **Step 4: Commit** — `git commit -m "feat(ui): story per DashboardSidebar"`

---

## Task 3: `DashboardShell`

**Files:** Create `ui/src/components/dashboard/DashboardShell.stories.tsx`

**Fatti**: props `header, sidebar, footer, children` tutti `React.ReactNode` obbligatori. Puro layout a griglia 3 righe (64px/1fr/44px). Nessuna logica propria — è il contenitore che il consumer popola con gli altri 3 (Header/Sidebar/Footer). Esattamente l'esempio fatto da Enzo ("un oggetto Dashboard che gestisce il rendering... popolato dal singolo consumer").

```tsx
// ui/src/components/dashboard/DashboardShell.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardShell } from './DashboardShell';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar, type NavGroup } from './DashboardSidebar';
import { DashboardFooter } from './DashboardFooter';

const meta: Meta<typeof DashboardShell> = {
  title: 'Layout/Dashboard Shell (Complete)',
  component: DashboardShell,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DashboardShell>;

const groups: NavGroup[] = [
  { id: 'main', label: 'Principale', defaultExpanded: true, items: [{ id: 'home', label: 'Dashboard', href: '/' }] },
];

export const Assembled: Story = {
  render: () => (
    <DashboardShell
      header={<DashboardHeader language="IT" user={{ initials: 'MR', username: 'Mario Rossi', role: 'admin' }} />}
      sidebar={<DashboardSidebar groups={groups} />}
      footer={<DashboardFooter />}
    >
      <div className="p-6">Contenuto pagina — popolato dal consumer.</div>
    </DashboardShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Il "contenitore Dashboard" che orchestra Header/Sidebar/Footer/children — puro layout a griglia, nessuna logica propria. Ogni slot è popolato qui con i sotto-componenti già documentati sotto Header/ e Layout/*.',
      },
    },
  },
};
```

- [ ] **Step 1: Crea il file sopra**
- [ ] **Step 2: Verifica typecheck**
- [ ] **Step 3: Verifica story** — `pnpm exec playwright test -g "Dashboard Shell" --workers=1` → `1 passed`
- [ ] **Step 4: Commit** — `git commit -m "feat(ui): story per DashboardShell, il contenitore Header+Sidebar+Footer"`

---

## Task 4: `HeuresysLogoBadge`

**Files:** Create `ui/src/components/brand/HeuresysLogoBadge.stories.tsx`

**Fatti**: `{children: ReactNode}`, wrapper di stile uppercase per testo libero. In **tutti** i 7 usi reali verificati il testo è sempre `"advanced"` (nessun altro valore mai osservato, nonostante il commento del componente citi "beta"/"enterprise" come esempi mai implementati).

```tsx
// ui/src/components/brand/HeuresysLogoBadge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeuresysLogoBadge } from './HeuresysLogoBadge';

const meta: Meta<typeof HeuresysLogoBadge> = {
  title: 'Brand/Logo Badge',
  component: HeuresysLogoBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof HeuresysLogoBadge>;

export const Advanced: Story = {
  args: { children: 'advanced' },
  parameters: {
    docs: {
      description: {
        story: 'In tutti i 7 usi reali verificati (heuresys-advanced) il testo è sempre "advanced" — accetta testo libero ma questo è l\'unico valore mai osservato in produzione.',
      },
    },
  },
};

export const Beta: Story = {
  args: { children: 'beta' },
  parameters: {
    docs: { description: { story: 'Mai usato in produzione — il componente lo accetta (children libero), ma questo valore è solo menzionato in un commento, mai implementato.' } },
  },
};
```

- [ ] **Step 1: Crea il file sopra**
- [ ] **Step 2: Verifica typecheck**
- [ ] **Step 3: Verifica** — `pnpm exec playwright test -g "Logo Badge" --workers=1` → `2 passed`
- [ ] **Step 4: Commit**

---

## Task 5: `HeuresysMark`

**Files:** Create `ui/src/components/brand/HeuresysMark.stories.tsx`

**Fatti**: `{size?: number (default 32), color?: string (default var(--accent))}`. SVG del solo simbolo "y", colore theme-dependent (a differenza del Wordmark completo, hardcoded per garantire riconoscibilità su ogni tema). Uso reale: 2 punti, entrambi standalone senza wordmark accanto (avatar rotondo header, icona accanto a testo in un widget hero).

```tsx
// ui/src/components/brand/HeuresysMark.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeuresysMark } from './HeuresysMark';

const meta: Meta<typeof HeuresysMark> = {
  title: 'Brand/Mark (symbol only)',
  component: HeuresysMark,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 16, max: 128, step: 8 } },
    color: { control: 'color' },
  },
};
export default meta;
type Story = StoryObj<typeof HeuresysMark>;

export const Default: Story = {
  args: { size: 32 },
  parameters: {
    docs: {
      description: {
        story:
          'Variante solo-simbolo del logo (la "y") — a differenza di Brand/Wordmark (testo completo, colori hardcoded per riconoscibilità cross-tema), questo è theme-dependent (var(--accent) di default) e pensato per contesti compatti: favicon, sidebar collassata, avatar, loading spinner.',
      },
    },
  },
};

export const Large: Story = { args: { size: 64 } };
```

- [ ] **Step 1: Crea il file sopra**
- [ ] **Step 2: Verifica typecheck**
- [ ] **Step 3: Verifica** — `pnpm exec playwright test -g "Mark \(symbol" --workers=1` → `2 passed`
- [ ] **Step 4: Commit**

---

## Task 6: `AuditFeed`

**Files:** Create `ui/src/components/dashboard/AuditFeed.stories.tsx`
**Fatti**: `events: AuditEvent[], title?, subtitle?, onViewAll?`. `AuditEvent{icon,tone,title,description?,meta?}`. Reale in produzione (SystemHealthLive.tsx:478, dashboard/page.tsx:179, me/inbox/page.tsx:200).

```tsx
// ui/src/components/dashboard/AuditFeed.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Shield, UserPlus, AlertTriangle } from 'lucide-react';
import { AuditFeed, type AuditEvent } from './AuditFeed';

const meta: Meta<typeof AuditFeed> = {
  title: 'Components/AuditFeed',
  component: AuditFeed,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onViewAll: { action: 'viewAll' } },
};
export default meta;
type Story = StoryObj<typeof AuditFeed>;

const events: AuditEvent[] = [
  { icon: <Shield className="h-4 w-4" />, tone: 'success', title: 'RBAC mapping updated', description: 'auditor role → +2 permissions', meta: '2 min ago' },
  { icon: <UserPlus className="h-4 w-4" />, tone: 'info', title: 'New tenant onboarded', description: 'GENESIS_DEMO', meta: '1h ago' },
  { icon: <AlertTriangle className="h-4 w-4" />, tone: 'warning', title: 'Failed login burst', description: '5 attempts, blocked', meta: '3h ago' },
];

export const Default: Story = {
  args: { events },
  parameters: {
    docs: { description: { story: 'Reale in produzione (SystemHealthLive.tsx, dashboard/page.tsx, me/inbox/page.tsx) con dati dinamici da API — questi eventi sono di esempio.' } },
  },
};
export const Empty: Story = { args: { events: [] } };
```

- [ ] Crea il file, verifica typecheck, `pnpm exec playwright test -g "AuditFeed" --workers=1` → `2 passed`, commit.

---

## Task 7: `StatusIcon`

**Files:** Create `ui/src/components/StatusIcon.stories.tsx`
**Fatti**: `icon: ComponentType, tone? (neutral|info|success|warning|danger|disabled), size? (default 20), className?`. Unico uso reale è la pagina `/showcase/icons` stessa — questa story sostituisce di fatto quella pagina come riferimento.

```tsx
// ui/src/components/StatusIcon.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Wifi, Database, ShieldCheck } from 'lucide-react';
import { StatusIcon } from './StatusIcon';

const meta: Meta<typeof StatusIcon> = {
  title: 'Components/StatusIcon',
  component: StatusIcon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'danger', 'disabled'] },
    size: { control: { type: 'number', min: 12, max: 48 } },
  },
};
export default meta;
type Story = StoryObj<typeof StatusIcon>;

export const Success: Story = { args: { icon: ShieldCheck, tone: 'success' } };
export const Warning: Story = { args: { icon: Wifi, tone: 'warning' } };
export const Danger: Story = { args: { icon: Database, tone: 'danger' } };
```

- [ ] Crea il file, verifica typecheck, `pnpm exec playwright test -g "StatusIcon" --workers=1` → `3 passed`, commit.

---

## Task 8: `FieldGrid`

**Files:** Create `ui/src/components/field-grid.stories.tsx`
**Fatti**: `fields: DetailField[], testId?, className?`. `DetailField{label,value,mono?,testId?}`. 4 usi reali, compone StatusBadge al suo interno in un consumer.

```tsx
// ui/src/components/field-grid.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldGrid, type DetailField } from './field-grid';
import { StatusBadge } from './status-pill';

const meta: Meta<typeof FieldGrid> = {
  title: 'Components/FieldGrid',
  component: FieldGrid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FieldGrid>;

const fields: DetailField[] = [
  { label: 'ID', value: 'POS-1042', mono: true },
  { label: 'Nome', value: 'Senior Backend Engineer' },
  { label: 'Stato', value: <StatusBadge value="active" /> },
  { label: 'Creato il', value: '2026-08-12' },
];

export const Default: Story = {
  args: { fields },
  parameters: {
    docs: { description: { story: 'Pattern reale: composizione con StatusBadge per il campo "Stato" (heuresys-advanced/apps/web/src/app/(authenticated)/positions/[positionId]/page.tsx).' } },
  },
};
```

- [ ] Crea il file, verifica typecheck, `pnpm exec playwright test -g "FieldGrid" --workers=1` → `1 passed`, commit.

---

## Task 9: `AlertBanner`

**Files:** Create `ui/src/components/dashboard/AlertBanner.stories.tsx`
**Fatti**: `variant? (warning|danger|info|success), icon?, title, meta?, details?, actions?, onDismiss?`. **Zero uso in produzione reale** — esclusione esplicita documentata nel codice ("no incident module shipped"). Solo mock showcase.

```tsx
// ui/src/components/dashboard/AlertBanner.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertBanner } from './AlertBanner';

const meta: Meta<typeof AlertBanner> = {
  title: 'Components/AlertBanner',
  component: AlertBanner,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['warning', 'danger', 'info', 'success'] },
    onDismiss: { action: 'dismiss' },
  },
};
export default meta;
type Story = StoryObj<typeof AlertBanner>;

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: '1 active incident · GENESIS_DEMO',
    meta: 'P2 · degraded',
    details: 'started 16:35 · 8m ago',
    actions: [{ label: 'Acknowledge', onClick: () => {}, variant: 'primary' }, { label: 'View incident →', onClick: () => {} }],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Zero uso in produzione reale — esplicitamente escluso ("no incident module shipped", SystemHealthLive.tsx:19-21). Questa story usa dati equivalenti al mock showcase, unica fonte disponibile.',
      },
    },
  },
};
```

- [ ] Crea il file, verifica typecheck, `pnpm exec playwright test -g "AlertBanner" --workers=1` → `1 passed`, commit.

---

## Task 10: `ErrorRateBreakdown`

**Files:** Create `ui/src/components/dashboard/ErrorRateBreakdown.stories.tsx`
**Fatti**: `overallRate, overallUnit?, overallDelta?, overallDeltaTone?, totalRequests?, distribution, endpoints, onViewAll?`. **Reale in produzione** (SystemHealthLive.tsx:347-364, dati live).

```tsx
// ui/src/components/dashboard/ErrorRateBreakdown.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorRateBreakdown } from './ErrorRateBreakdown';

const meta: Meta<typeof ErrorRateBreakdown> = {
  title: 'Components/ErrorRateBreakdown',
  component: ErrorRateBreakdown,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ErrorRateBreakdown>;

export const Default: Story = {
  args: {
    overallRate: 4.1,
    overallUnit: '%',
    totalRequests: 128400,
    distribution: [
      { status: '2xx', pct: 92.3 },
      { status: '4xx', pct: 3.6 },
      { status: '5xx', pct: 4.1 },
    ],
    endpoints: [
      { path: '/v1/tenants', errorRate: 6.2, sparkline: [2, 3, 5, 6, 4, 6] },
      { path: '/v1/auth/login', errorRate: 2.1, sparkline: [1, 2, 1, 2, 2, 2] },
    ],
  },
  parameters: {
    docs: { description: { story: 'Agganciato a dati live in produzione (SystemHealthLive.tsx, route PLATFORM_ADMIN) — questi valori sono di esempio.' } },
  },
};
```

- [ ] Crea il file, verifica typecheck, `pnpm exec playwright test -g "ErrorRateBreakdown" --workers=1` → `1 passed`, commit.

---

## Task 11: `IncidentTimeline`

**Files:** Create `ui/src/components/dashboard/IncidentTimeline.stories.tsx`
**Fatti**: `items, title?, subtitle?, counts?, onViewFullLog?`. Solo mock showcase — assenza esplicita da produzione ("no incident module shipped").

```tsx
// ui/src/components/dashboard/IncidentTimeline.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IncidentTimeline } from './IncidentTimeline';

const meta: Meta<typeof IncidentTimeline> = {
  title: 'Components/IncidentTimeline',
  component: IncidentTimeline,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof IncidentTimeline>;

export const Default: Story = {
  args: {
    items: [
      { id: '1', severity: 'P2', status: 'resolved', title: 'DB pool exhaustion', timestamp: '14:20' },
      { id: '2', severity: 'P3', status: 'monitoring', title: 'Elevated latency /v1/tenants', timestamp: '15:05' },
    ],
  },
  parameters: {
    docs: { description: { story: 'Solo mock showcase, zero uso in produzione reale — nessun modulo incidenti reale è ancora collegato (dichiarato esplicitamente nel codice).' } },
  },
};
```

- [ ] Crea il file, verifica typecheck, `pnpm exec playwright test -g "IncidentTimeline" --workers=1` → `1 passed`, commit.

---

## Task 12: `LogStream`

**Files:** Create `ui/src/components/dashboard/LogStream.stories.tsx`
**Fatti**: `entries, title?, sourceLabel?, activeFilter?, totalCount?, windowLabel?, connected?, onFilterChange?, onPauseToggle?, paused?`. Solo mock showcase + 1 test unitario a11y nel repo UI stesso.

```tsx
// ui/src/components/dashboard/LogStream.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogStream } from './LogStream';

const meta: Meta<typeof LogStream> = {
  title: 'Components/LogStream',
  component: LogStream,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onFilterChange: { action: 'filterChange' }, onPauseToggle: { action: 'pauseToggle' } },
};
export default meta;
type Story = StoryObj<typeof LogStream>;

export const Default: Story = {
  args: {
    connected: true,
    entries: [
      { id: '1', level: 'info', message: 'GET /v1/tenants 200 42ms', timestamp: '16:41:02' },
      { id: '2', level: 'warn', message: 'Slow query detected (1.2s)', timestamp: '16:41:05' },
    ],
  },
  parameters: {
    docs: { description: { story: 'Solo mock showcase — dichiarato esplicitamente "no honest backend" nel codice di produzione (systemd/journalctl infra, non app data).' } },
  },
};
```

- [ ] Crea il file, verifica typecheck, `pnpm exec playwright test -g "LogStream" --workers=1` → `1 passed`, commit.

---

## Task 13: `SQLSlowQueryTable`

**Files:** Create `ui/src/components/dashboard/SQLSlowQueryTable.stories.tsx`
**Fatti**: `rows, totalTracked?, sampleSince?, totalCaptured?, onResetStats?, onOpenExplain?`. **Reale in produzione** (SystemHealthLive.tsx:410-424, dati live).

```tsx
// ui/src/components/dashboard/SQLSlowQueryTable.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SQLSlowQueryTable } from './SQLSlowQueryTable';

const meta: Meta<typeof SQLSlowQueryTable> = {
  title: 'Components/SQLSlowQueryTable',
  component: SQLSlowQueryTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onOpenExplain: { action: 'openExplain' }, onResetStats: { action: 'resetStats' } },
};
export default meta;
type Story = StoryObj<typeof SQLSlowQueryTable>;

export const Default: Story = {
  args: {
    totalTracked: 42,
    rows: [
      { query: 'SELECT * FROM tenants WHERE...', avgMs: 840, calls: 120, totalMs: 100800 },
      { query: 'SELECT * FROM audit_log JOIN...', avgMs: 620, calls: 300, totalMs: 186000 },
    ],
  },
  parameters: {
    docs: { description: { story: 'Agganciato a dati live in produzione (SystemHealthLive.tsx, route PLATFORM_ADMIN).' } },
  },
};
```

- [ ] Crea il file, verifica typecheck, `pnpm exec playwright test -g "SQLSlowQueryTable" --workers=1` → `1 passed`, commit.

---

## Task 14: `DBSupervisorSidebar`

**Files:** Create `ui/src/components/dashboard/DBSupervisorSidebar.stories.tsx`
**Fatti**: zero props, usa costante interna `DB_SUBITEMS`. Un solo punto d'uso, nel mock showcase (`customContent` di un gruppo sidebar). Deve essere renderizzato dentro un `<ul>` (è un `<li>`).

```tsx
// ui/src/components/dashboard/DBSupervisorSidebar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DBSupervisorSidebar } from './DBSupervisorSidebar';

const meta: Meta<typeof DBSupervisorSidebar> = {
  title: 'Components/DBSupervisorSidebar',
  component: DBSupervisorSidebar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DBSupervisorSidebar>;

export const Default: Story = {
  render: () => (
    <ul className="w-64 border border-border rounded-card">
      <DBSupervisorSidebar />
    </ul>
  ),
  parameters: {
    docs: { description: { story: 'Zero props (dati interni hardcoded, DB_SUBITEMS). Un solo punto d\'uso in tutto l\'ecosistema, nel mock showcase come customContent di un gruppo sidebar — non un pattern di produzione.' } },
  },
};
```

- [ ] Crea il file, verifica typecheck, `pnpm exec playwright test -g "DBSupervisorSidebar" --workers=1` → `1 passed`, commit.

---

## Task 15: `PageActions`

**Files:** Create `ui/src/components/dashboard/PageActions.stories.tsx`
**Fatti**: `onRefresh?, onExport?, refreshLabel? (default 'Aggiorna'), exportLabel? (default 'Export report'), className?`. Un solo punto d'uso, mock showcase.

```tsx
// ui/src/components/dashboard/PageActions.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageActions } from './PageActions';

const meta: Meta<typeof PageActions> = {
  title: 'Components/PageActions',
  component: PageActions,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { onRefresh: { action: 'refresh' }, onExport: { action: 'export' } },
};
export default meta;
type Story = StoryObj<typeof PageActions>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: { description: { story: 'Un solo punto d\'uso in tutto l\'ecosistema, nel mock showcase (SystemHealthDashboard.tsx) con handler no-op.' } },
  },
};
```

- [ ] Crea il file, verifica typecheck, `pnpm exec playwright test -g "PageActions" --workers=1` → `1 passed`, commit.

---

## Task 16: `TenantFleetTable`

**Files:** Create `ui/src/components/dashboard/TenantFleetTable.stories.tsx`
**Fatti**: `rows, title?, subtitle?, onOpenDetail?, onSearch?, onOpenFilters?`. Un solo punto d'uso, mock showcase, dati hardcoded.

```tsx
// ui/src/components/dashboard/TenantFleetTable.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TenantFleetTable } from './TenantFleetTable';

const meta: Meta<typeof TenantFleetTable> = {
  title: 'Components/TenantFleetTable',
  component: TenantFleetTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onOpenDetail: { action: 'openDetail' }, onSearch: { action: 'search' }, onOpenFilters: { action: 'openFilters' } },
};
export default meta;
type Story = StoryObj<typeof TenantFleetTable>;

export const Default: Story = {
  args: {
    rows: [
      { tenantId: 'RTL_BANK_REFERENCE', status: 'healthy', users: 240, tables: 38, errorsLastHour: 0, poolUtilPct: 42 },
      { tenantId: 'GENESIS_DEMO', status: 'degraded', users: 12, tables: 9, errorsLastHour: 4, poolUtilPct: 78 },
    ],
  },
  parameters: {
    docs: { description: { story: 'Un solo punto d\'uso, mock showcase con 4 tenant hardcoded — nessun uso in produzione reale verificato.' } },
  },
};
```

- [ ] Crea il file, verifica typecheck, `pnpm exec playwright test -g "TenantFleetTable" --workers=1` → `1 passed`, commit.

---

## Task 17: `TimeRangeSelector`

**Files:** Create `ui/src/components/dashboard/TimeRangeSelector.stories.tsx`
**Fatti**: `options? (default 15m/1h/24h/7d/30d), value, onChange?, className?, ariaLabel?`. Un solo punto d'uso, mock showcase, statico (`value="24h"`, nessun `onChange`).

```tsx
// ui/src/components/dashboard/TimeRangeSelector.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimeRangeSelector } from './TimeRangeSelector';

const meta: Meta<typeof TimeRangeSelector> = {
  title: 'Components/TimeRangeSelector',
  component: TimeRangeSelector,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'change' } },
};
export default meta;
type Story = StoryObj<typeof TimeRangeSelector>;

export const Default: Story = {
  args: { value: '24h' },
  parameters: {
    docs: { description: { story: 'Options di default (15m/1h/24h/7d/30d). Un solo uso reale verificato, statico (nessun onChange cablato) — questa story lo rende interattivo.' } },
  },
};
```

- [ ] Crea il file, verifica typecheck, `pnpm exec playwright test -g "TimeRangeSelector" --workers=1` → `1 passed`, commit.

---

## Task 18: Verifica finale + commit

- [ ] `cd ui && pnpm run typecheck` → pulito
- [ ] `cd ui && pnpm run test:e2e` → tutte le nuove story passano, 0 failed
- [ ] `git status` → pulito, ogni task ha già committato i propri file
- [ ] Push + PR quando questo piano viene eseguito, seguendo lo stesso schema già usato per Playwright (branch dedicato, non push diretto su main).
