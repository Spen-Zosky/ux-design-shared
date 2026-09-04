# Design System — Censimento Completo (2026-09-03)

Generato meccanicamente (grep, non stima): 120 componenti sorgente in `ui/src/components/` (esclusi 14 file di test), incrociati con l'esistenza di una `.stories.tsx` omonima e con l'uso reale (grep del nome esportato) in `heuresys-advanced/apps/web/src` e `heuresys-datastore/apps/web/src`.

## Numeri chiave

- **120** componenti totali nel design system
- **93** hanno una story (78%), **27** no (22%)
- **72** sono completamente orfani — zero uso in entrambi i consumer (60%)
  - di cui **68 hanno comunque una story** (documentati, semplicemente non ancora scelti da nessun team prodotto — normale in un design system)
  - di cui **4 non hanno né story né uso**: `GroupToggle`, `ESCOTreeNavigator`, `KGGraphCanvas`, `SAPSyncPanel` — candidati a verifica (codice sperimentale abbandonato, o feature futura mai partita)
- **23 componenti sono usati in produzione MA senza alcuna story** — priorità più alta, sono gli stessi che avete già iniziato a vedere con Header/Footer/Sidebar/Shell

## Priorità 1 — usati in produzione, senza story (23)

| Componente | Story | Advanced | Datastore |
|---|---|---|---|
| `StatusPill` | ❌ | 33 | 1 |
| `KPIStrip` | ❌ | 11 | 0 |
| `DashboardHeader` | ❌ | 9 | 1 |
| `DashboardShell` | ❌ | 9 | 1 |
| `DashboardFooter` | ❌ | 7 | 1 |
| `HeuresysLogoBadge` | ❌ | 7 | 0 |
| `DashboardSidebar` | ❌ | 6 | 1 |
| `AuditFeed` | ❌ | 6 | 0 |
| `PaletteDropdown` | ❌ | 5 | 0 |
| `FieldGrid` | ❌ | 4 | 1 |
| `HeuresysMark` | ❌ | 4 | 0 |
| `DataTableWithCrossHair` | ❌ | 3 | 0 |
| `StatusIcon` | ❌ | 3 | 0 |
| `AlertBanner` | ❌ | 2 | 0 |
| `ErrorRateBreakdown` | ❌ | 2 | 0 |
| `IncidentTimeline` | ❌ | 2 | 0 |
| `LogStream` | ❌ | 2 | 0 |
| `RBACMatrix` | ❌ | 2 | 0 |
| `SQLSlowQueryTable` | ❌ | 2 | 0 |
| `DBSupervisorSidebar` | ❌ | 1 | 0 |
| `PageActions` | ❌ | 1 | 0 |
| `TenantFleetTable` | ❌ | 1 | 0 |
| `TimeRangeSelector` | ❌ | 1 | 0 |

## Priorità 2 — orfani senza story, da verificare (4)

| Componente | Story | Advanced | Datastore |
|---|---|---|---|
| `GroupToggle` | ❌ | 0 | 0 |
| `ESCOTreeNavigator` | ❌ | 0 | 0 |
| `KGGraphCanvas` | ❌ | 0 | 0 |
| `SAPSyncPanel` | ❌ | 0 | 0 |

## Il resto — 93 componenti con story (68 orfani ma documentati, 25 usati e documentati)

| Componente | Story | Advanced | Datastore |
|---|---|---|---|
| `PageHeader` | ✅ | 68 | 0 |
| `Card` | ✅ | 64 | 0 |
| `Button` | ✅ | 62 | 10 |
| `Badge` | ✅ | 54 | 11 |
| `Input` | ✅ | 34 | 5 |
| `EmptyState` | ✅ | 20 | 10 |
| `EChartsCard` | ✅ | 18 | 0 |
| `HeuresysWordmark` | ✅ | 15 | 1 |
| `StatsCard` | ✅ | 12 | 0 |
| `ThemeProvider` | ✅ | 4 | 2 |
| `Dialog` | ✅ | 3 | 0 |
| `Sparkline` | ✅ | 3 | 0 |
| `Timeline` | ✅ | 3 | 0 |
| `MarkdownView` | ✅ | 2 | 0 |
| `MermaidDiagram` | ✅ | 2 | 0 |
| `ThemeToggle` | ✅ | 2 | 0 |
| `CapabilityRadar` | ✅ | 1 | 0 |
| `DataTable` | ✅ | 1 | 0 |
| `Pagination` | ✅ | 1 | 0 |
| `RadialGauge` | ✅ | 1 | 0 |
| `Tabs` | ✅ | 1 | 0 |
| `FadeIn` | ✅ | 0 | 10 |
| `Admonition` | ✅ | 0 | 1 |
| `LiveRegionProvider` | ✅ | 0 | 1 |
| `Skeleton` | ✅ | 0 | 1 |
| `AccessibilityPanel` | ✅ | 0 | 0 |
| `Accordion` | ✅ | 0 | 0 |
| `AchievementBadge` | ✅ | 0 | 0 |
| `ActivityFeed` | ✅ | 0 | 0 |
| `AnimatedNumber` | ✅ | 0 | 0 |
| `AppShell` | ✅ | 0 | 0 |
| `AppSwitcher` | ✅ | 0 | 0 |
| `Avatar` | ✅ | 0 | 0 |
| `Banner` | ✅ | 0 | 0 |
| `BentoGrid` | ✅ | 0 | 0 |
| `Breadcrumbs` | ✅ | 0 | 0 |
| `CalendarGrid` | ✅ | 0 | 0 |
| `CareerArc` | ✅ | 0 | 0 |
| `ChatProvider` | ✅ | 0 | 0 |
| `Chatbot` | ✅ | 0 | 0 |
| `Checkbox` | ✅ | 0 | 0 |
| `CommandPalette` | ✅ | 0 | 0 |
| `CommentThread` | ✅ | 0 | 0 |
| `ConfettiButton` | ✅ | 0 | 0 |
| `DiffViewer` | ✅ | 0 | 0 |
| `DropdownMenu` | ✅ | 0 | 0 |
| `FAB` | ✅ | 0 | 0 |
| `FileDropzone` | ✅ | 0 | 0 |
| `FilterBar` | ✅ | 0 | 0 |
| `FormWizard` | ✅ | 0 | 0 |
| `GlassCard` | ✅ | 0 | 0 |
| `HeroSplit` | ✅ | 0 | 0 |
| `ImageGallery` | ✅ | 0 | 0 |
| `IntegrationHealthPill` | ✅ | 0 | 0 |
| `JsonTree` | ✅ | 0 | 0 |
| `KanbanBoard` | ✅ | 0 | 0 |
| `KeyboardShortcutsModal` | ✅ | 0 | 0 |
| `KgMiniGraph` | ✅ | 0 | 0 |
| `KpiRing` | ✅ | 0 | 0 |
| `LanguagePicker` | ✅ | 0 | 0 |
| `LottiePlayer` | ✅ | 0 | 0 |
| `MegaMenu` | ✅ | 0 | 0 |
| `MeshGradient` | ✅ | 0 | 0 |
| `MobileBottomNav` | ✅ | 0 | 0 |
| `NetworkGraph` | ✅ | 0 | 0 |
| `NeumorphicCard` | ✅ | 0 | 0 |
| `NotificationCenter` | ✅ | 0 | 0 |
| `OnboardingTour` | ✅ | 0 | 0 |
| `OtpInput` | ✅ | 0 | 0 |
| `PasswordStrengthMeter` | ✅ | 0 | 0 |
| `PerfMonitor` | ✅ | 0 | 0 |
| `PhoneInputField` | ✅ | 0 | 0 |
| `Popover` | ✅ | 0 | 0 |
| `QRCodeView` | ✅ | 0 | 0 |
| `RbacMatrix` | ✅ | 0 | 0 |
| `SignaturePadField` | ✅ | 0 | 0 |
| `SkillHeatmap` | ✅ | 0 | 0 |
| `SkipLink` | ✅ | 0 | 0 |
| `Stack` | ✅ | 0 | 0 |
| `Stepper` | ✅ | 0 | 0 |
| `SuccessionCard` | ✅ | 0 | 0 |
| `Switch` | ✅ | 0 | 0 |
| `TableOfContents` | ✅ | 0 | 0 |
| `TabsOverflow` | ✅ | 0 | 0 |
| `ThemeBuilderWizard` | ✅ | 0 | 0 |
| `ThreeScene` | ✅ | 0 | 0 |
| `TiltCard` | ✅ | 0 | 0 |
| `ToastProvider` | ✅ | 0 | 0 |
| `ToolCallView` | ✅ | 0 | 0 |
| `TooltipProvider` | ✅ | 0 | 0 |
| `Typewriter` | ✅ | 0 | 0 |
| `VideoPlayer` | ✅ | 0 | 0 |
| `VoiceInput` | ✅ | 0 | 0 |
