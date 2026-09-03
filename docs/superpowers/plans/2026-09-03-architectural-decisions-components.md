# Architectural Decisions — StatusPill, RBACMatrix, DataTableWithCrossHair, KPIStrip

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Risolvere le 4 discrepanze concrete emerse dall'indagine del 2026-09-03 tra il contratto ufficiale (`heuresys-advanced/docs/architecture/brand-component-contract.md`, approvato da Enzo il 2026-05-29), il codice sorgente del design system, e l'uso reale nei consumer — poi dare a ciascun componente coinvolto una story Storybook coerente con la decisione presa.

**Decisioni prese da Enzo (2026-09-03)**, con la mia raccomandazione:
1. **StatusPill**: promosso a canonico (non migrare i 54 usi verso StatusIcon+Badge). Fix del difetto reale: 4/5 toni usano colori Tailwind hardcoded invece dei design token.
2. **RBACMatrix vs RbacMatrix**: sono due componenti diversi con scopi diversi (editor interattivo vs report read-only) — non unificare, disambiguare nel titolo Storybook.

**Global Constraints:**
- Nessuna modifica ai consumer (`heuresys-advanced`, `heuresys-datastore`) — solo al design system e alla sua documentazione.
- `pnpm run typecheck` pulito dopo ogni task.
- Commit per task.

---

## Parte 1: StatusPill — fix token + promozione a canonico

### Task 1.1: Correggere i colori hardcoded → design token

**Files:** Modify `ui/src/components/status-pill.tsx`

**Fatto verificato**: il commento del file dichiara "token-driven" ma 4 toni su 5 sono Tailwind hardcoded (`status-pill.tsx:20-26`: `border-green-200 bg-green-100 text-green-800` per `success`, ecc.). I token equivalenti esistono già nel design system (`--color-success`, `--color-warning`, `--color-info`, `--color-destructive`, verificati in `ui/src/styles/tokens.css:31-36`). `StatusIcon.tsx` fa già questo correttamente — stesso pattern da replicare qui.

- [ ] **Step 1: Leggi il file corrente per la mappa esatta**

Run: `grep -n "success:\|warning:\|danger:\|info:\|neutral:" ui/src/components/status-pill.tsx` — conferma le 5 righe da modificare prima di editarle (non assumere il numero di riga da questo piano, verificare sul file reale al momento dell'esecuzione).

- [ ] **Step 2: Sostituisci la mappa toni con classi token-driven**

Cambia (nella struttura, non necessariamente lo stesso identificatore di variabile — verificare il nome reale nel file):
```ts
success: "border-green-200 bg-green-100 text-green-800"
warning: "border-amber-200 bg-amber-100 text-amber-800"
danger:  "border-red-200 bg-red-100 text-red-800"
info:    "border-blue-200 bg-blue-100 text-blue-800"
```
In:
```ts
success: "border-success/30 bg-success/10 text-success"
warning: "border-warning/30 bg-warning/10 text-warning"
danger:  "border-destructive/30 bg-destructive/10 text-destructive"
info:    "border-info/30 bg-info/10 text-info"
```
`neutral` resta invariato (già token-driven: `border-border bg-muted text-muted-foreground`).

- [ ] **Step 3: Verifica visiva — nessuna regressione percepibile**

Run: `cd ui && pnpm run storybook`, apri la story di StatusPill (Task 1.3 sotto, va creata prima per poter verificare) in entrambi i temi (light/dark, toggle in alto nella toolbar Storybook) — i colori devono restare visivamente equivalenti (stesso hue, ora derivato dal token invece che hardcoded), non ci deve essere un cambio percepibile a occhio.

- [ ] **Step 4: Typecheck + commit**

Run: `cd ui && pnpm run typecheck`
```bash
git add ui/src/components/status-pill.tsx
git commit -m "fix(ui): StatusPill usa i design token invece di colori Tailwind hardcoded"
```

### Task 1.2: Aggiornare il contratto ufficiale (fuori dal design system)

**Nota**: `brand-component-contract.md` vive in `heuresys-advanced`, non in questo repo. Questo task è **solo una proposta di testo** da consegnare a Enzo o alla sessione che lavora su quel repository — non lo modifico direttamente qui (fuori dal mio repo di lavoro, e un'altra sessione è attiva su `heuresys-advanced` in questo momento).

**Testo proposto per la riga 23 del contratto** (oggi: *"Status / health indicator | raw text | **StatusIcon** (icon, tone, size) + **Badge** (variant)"*):
```
Status / health indicator (icon-only) | raw text | **StatusIcon** (icon, tone, size)
Status / health indicator (badge/pill) | raw text | **StatusPill** / **StatusBadge** (tone o value, statusTone() mappa ~30 valori noti)
```

- [ ] **Step 1**: comunicare questa proposta a Enzo o alla sessione `heuresys-advanced` attiva, non applicarla autonomamente.

### Task 1.3: Story per StatusPill/StatusBadge/statusTone

**Files:** Create `ui/src/components/status-pill.stories.tsx`

```tsx
// ui/src/components/status-pill.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusPill, StatusBadge } from './status-pill';

const meta: Meta<typeof StatusPill> = {
  title: 'Components/StatusPill',
  component: StatusPill,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['success', 'warning', 'danger', 'info', 'neutral'] },
  },
};
export default meta;
type Story = StoryObj<typeof StatusPill>;

export const AllTones: Story = {
  render: () => (
    <div className="flex gap-2">
      <StatusPill tone="success">Active</StatusPill>
      <StatusPill tone="warning">Pending</StatusPill>
      <StatusPill tone="danger">Failed</StatusPill>
      <StatusPill tone="info">Info</StatusPill>
      <StatusPill tone="neutral">Neutral</StatusPill>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Il componente più usato di tutto il design system (54 file in produzione, verificato 2026-09-03) — non era ancora nel contratto ufficiale dei componenti canonici, ora promosso esplicitamente. Dal 2026-09-03 usa design token invece di colori Tailwind hardcoded.',
      },
    },
  },
};

export const AutoTone_StatusBadge: Story = {
  render: () => (
    <div className="flex gap-2">
      <StatusBadge value="ACTIVE" />
      <StatusBadge value="PENDING" />
      <StatusBadge value="unrecognized-value" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'StatusBadge = StatusPill + statusTone(value) automatico. statusTone() riconosce ~30 stringhe note (ACTIVE/FILLED/APPROVED/...) — un valore non riconosciuto ("unrecognized-value") ricade silenziosamente su tone="neutral". Verificato nei consumer reali: valori come "difficulty"/"readiness" (non stati in senso stretto) cadono sempre su neutral.',
      },
    },
  },
};

export const RelatedComponents: Story = {
  render: () => <p className="text-sm text-muted-foreground max-w-md">Vedi anche: Components/StatusIcon (wrapper colore per icone lucide, non testuale) e Components/Badge (varianti CVA generiche, non status-specifiche). Tre primitivi distinti per "badge colorato", ciascuno con un proprio caso d'uso — non duplicati da unificare.</p>,
  parameters: { docs: { description: { story: 'Nota di orientamento tra i 3 primitivi simili del design system.' } } },
};
```

- [ ] **Step 1: Crea il file sopra**
- [ ] **Step 2: Verifica typecheck**
- [ ] **Step 3: Verifica** — `pnpm exec playwright test -g "StatusPill" --workers=1` → `3 passed`
- [ ] **Step 4: Commit** — `git commit -m "feat(ui): story per StatusPill/StatusBadge, chiarisce relazione con StatusIcon/Badge"`

---

## Parte 2: RBACMatrix vs RbacMatrix — disambiguazione

### Fatti verificati
- `RbacMatrix` (`ui/src/components/dashboard/rbac-matrix.tsx`): ha già story (`rbac-matrix.stories.tsx`), props `roles, areas, assignments, readonly, onChange` — editor interattivo, è quello citato nel contratto ufficiale (riga 27).
- `RBACMatrix` (`ui/src/components/dashboard/RBACMatrix.tsx`): **nessuna story**, props `roles, rows, lastReload?, totalMappings?, totalRoles?, totalPermissions?, onExportCsv?, onViewFull?` — report read-only con export, agganciato a **dati live in produzione** (`SystemHealthLive.tsx:459-466`, route `PLATFORM_ADMIN`).

Sono due strumenti concettualmente diversi (editing vs reporting) con un nome quasi identico — la fonte di confusione è il nome, non la duplicazione di funzione.

### Task 2.1: Story per `RBACMatrix` (quello di produzione)

**Files:** Create `ui/src/components/dashboard/RBACMatrix.stories.tsx`

```tsx
// ui/src/components/dashboard/RBACMatrix.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RBACMatrix } from './RBACMatrix';

const meta: Meta<typeof RBACMatrix> = {
  title: 'Components/RBAC Matrix — Production Report',
  component: RBACMatrix,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onExportCsv: { action: 'exportCsv' }, onViewFull: { action: 'viewFull' } },
};
export default meta;
type Story = StoryObj<typeof RBACMatrix>;

export const Default: Story = {
  args: {
    roles: ['admin', 'auditor', 'viewer'],
    rows: [
      { permission: 'tenants:read', grants: { admin: 'granted', auditor: 'granted', viewer: 'granted' } },
      { permission: 'tenants:write', grants: { admin: 'granted', auditor: 'denied', viewer: 'denied' } },
      { permission: 'audit:export', grants: { admin: 'granted', auditor: 'scoped', viewer: 'denied' } },
    ],
    totalMappings: 388,
    totalRoles: 3,
    totalPermissions: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Report di sola lettura con celle tri-state (granted/scoped/denied) ed export CSV, agganciato a dati live in produzione (SystemHealthLive.tsx, route PLATFORM_ADMIN). NON è lo stesso componente di Components/Rbac Matrix — Interactive Editor (nomi quasi identici, scopi diversi: quello è un editor per assegnare permessi, questo è un report per monitorarli). Vedi entrambe le story per la distinzione.',
      },
    },
  },
};
```

- [ ] **Step 1: Crea il file sopra**
- [ ] **Step 2: Verifica typecheck**
- [ ] **Step 3: Verifica** — `pnpm exec playwright test -g "RBAC Matrix — Production" --workers=1` → `1 passed`
- [ ] **Step 4: Commit** — `git commit -m "feat(ui): story per RBACMatrix (production report), disambiguato da RbacMatrix"`

### Task 2.2: Rinominare il titolo della story esistente per `RbacMatrix`

**Files:** Modify `ui/src/components/dashboard/rbac-matrix.stories.tsx`

- [ ] **Step 1**: Leggi il file, trova il `title:` nel `meta` (verificare il valore esatto attuale, probabilmente `'Components/RbacMatrix'` o simile — non assumere).
- [ ] **Step 2**: Cambia il `title` in `'Components/RBAC Matrix — Interactive Editor'` (coerente col nome della story gemella creata al Task 2.1), aggiungi una riga in `parameters.docs.description` del `meta` (o della prima story) che rimanda esplicitamente a "RBAC Matrix — Production Report" per la distinzione.
- [ ] **Step 3**: Typecheck + verifica Playwright sul nuovo titolo + commit — `git commit -m "refactor(ui): rinomina il titolo Storybook di RbacMatrix per disambiguare da RBACMatrix"`

---

## Parte 3: DataTableWithCrossHair — chiarire il pattern canonico

### Fatto verificato — conflitto a 3 vie
- Commento nel sorgente (`DataTableWithCrossHair.tsx:14-16`): "usa `data-table.tsx` **invece** di questo, per tabelle vere; questo è per showcase/HTML grezzo" → li presenta come **alternativi**.
- Contratto ufficiale (`brand-component-contract.md:22`): "**wrap** DataTable **in** DataTableWithCrossHair" → li presenta come da usare **insieme**.
- Uso reale (2 consumer verificati): **nessuno dei due annida `DataTable` dentro `DataTableWithCrossHair`** — entrambi costruiscono `<table>` HTML a mano e lo passano come `children`. Il comportamento reale conferma il commento del sorgente, non il contratto.

### Decisione
Non è compito di questo piano decidere se il contratto va corretto o se i consumer vanno migrati verso il pattern annidato (decisione architetturale che coinvolge `heuresys-advanced`, fuori scope). Questo piano **documenta la realtà verificata** nella story — la story deve riflettere come il componente è davvero usato oggi, non come la doc dice che dovrebbe essere usato, altrimenti la story stessa diventa un'altra fonte di confusione.

### Task 3.1: Story per DataTableWithCrossHair

**Files:** Create `ui/src/components/dashboard/DataTableWithCrossHair.stories.tsx`

```tsx
// ui/src/components/dashboard/DataTableWithCrossHair.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTableWithCrossHair } from './DataTableWithCrossHair';

const meta: Meta<typeof DataTableWithCrossHair> = {
  title: 'Components/DataTableWithCrossHair',
  component: DataTableWithCrossHair,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DataTableWithCrossHair>;

export const RawHtmlTable: Story = {
  render: () => (
    <DataTableWithCrossHair caption="Posizioni aperte">
      <table className="w-full text-sm">
        <thead>
          <tr><th className="text-left p-2">ID</th><th className="text-left p-2">Titolo</th><th className="text-left p-2">Stato</th></tr>
        </thead>
        <tbody>
          <tr><td className="p-2">POS-1042</td><td className="p-2">Senior Backend Engineer</td><td className="p-2">Aperta</td></tr>
          <tr><td className="p-2">POS-1043</td><td className="p-2">Product Designer</td><td className="p-2">In revisione</td></tr>
        </tbody>
      </table>
    </DataTableWithCrossHair>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Pattern verificato come REALMENTE usato in produzione (2026-09-03): un <table> HTML grezzo passato come children, non il componente DataTable (TanStack) annidato al suo interno. Nota di governance: il commento nel codice sorgente di questo componente dice che i due sono alternativi; il contratto ufficiale del design system (brand-component-contract.md:22) dice che andrebbero annidati — nessun consumer verificato segue quest\'ultimo pattern. Questa story documenta la realtà, non entrambe le versioni della doc.',
      },
    },
  },
};
```

- [ ] **Step 1: Crea il file sopra**
- [ ] **Step 2: Verifica typecheck**
- [ ] **Step 3: Verifica** — `pnpm exec playwright test -g "DataTableWithCrossHair" --workers=1` → `1 passed`
- [ ] **Step 4: Commit** — `git commit -m "feat(ui): story per DataTableWithCrossHair, documenta il pattern reale (non annidato)"`

---

## Parte 4: KPIStrip — chiarire la distinzione da StatsCard

### Fatto verificato
Contratto ufficiale (`brand-component-contract.md:20-21`) distingue già esplicitamente: `StatsCard` per "KPI singola" (count-up animato, trend), `KPIStrip` per "riga di KPI" (griglia di 2-5, `body` slot libero, footer). Non è duplicazione, ma la distinzione non è visibile in Storybook oggi perché KPIStrip non ha story (StatsCard sì).

### Task 4.1: Story per KPIStrip

**Files:** Create `ui/src/components/dashboard/KPIStrip.stories.tsx`

```tsx
// ui/src/components/dashboard/KPIStrip.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { KPIStrip, type KpiCardData } from './KPIStrip';

const meta: Meta<typeof KPIStrip> = {
  title: 'Components/KPIStrip',
  component: KPIStrip,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof KPIStrip>;

const items: KpiCardData[] = [
  { label: 'API uptime · 24h', value: '99.97', unit: '%', iconTone: 'success', sparkline: [0.9, 0.95, 0.97, 0.99, 0.98, 1] },
  { label: 'DB pool · pg 16', value: '18', unit: '/50', iconTone: 'info' },
  { label: 'Active tenants', value: '4', unit: '/4', iconTone: 'palette-3' },
];

export const Default: Story = {
  args: { items },
  parameters: {
    docs: {
      description: {
        story:
          'Griglia responsive di 2-5 card (11 usi reali in produzione, l\'11° componente più adottato del design system). Distinzione ufficiale da Components/StatsCard (già documentato con la propria story): StatsCard è per UNA metrica singola con count-up animato e trend badge; KPIStrip è per una RIGA di 2-5 metriche senza animazione ma con `body` slot libero e footer configurabile per riga. Non sono duplicati — sono varianti complementari (brand-component-contract.md:20-21).',
      },
    },
  },
};
```

- [ ] **Step 1: Crea il file sopra**
- [ ] **Step 2: Verifica typecheck**
- [ ] **Step 3: Verifica** — `pnpm exec playwright test -g "KPIStrip" --workers=1` → `1 passed`
- [ ] **Step 4: Commit** — `git commit -m "feat(ui): story per KPIStrip, chiarisce la distinzione da StatsCard"`

---

## Verifica finale

- [ ] `cd ui && pnpm run typecheck` → pulito
- [ ] `cd ui && pnpm run test:e2e` → tutte le story passano
- [ ] Verifica visiva del fix StatusPill in entrambi i temi (Task 1.1, Step 3)
- [ ] `git status` → pulito
