// Subpath entry `@heuresys/ui/markdown` — isolates the mermaid-backed diagram so
// a dynamic `import("@heuresys/ui/markdown")` loads mermaid ONLY, without pulling
// the full barrel. Companion of entry-charts.ts; see the #21 perf chunk-split and
// apps/web/src/app/(authenticated)/_charts-client.tsx.
export { MermaidDiagram } from './components/markdown/mermaid-diagram';
