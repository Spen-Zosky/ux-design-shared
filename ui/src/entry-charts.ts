// Subpath entry `@heuresys/ui/charts` — isolates the echarts-backed card so a
// dynamic `import("@heuresys/ui/charts")` loads echarts ONLY, without pulling the
// full barrel (cytoscape/mermaid/three/d3 and every other Tier component).
//
// Why this exists: heuresys-advanced apps/web lazy-loads chart components via
// `next/dynamic(() => import("@heuresys/ui"))`, which forces the whole index
// namespace into a single ~1.68 MB on-demand chunk. Importing the heavy parts
// from dedicated subpaths lets the bundler split per-library. See the #21 perf
// chunk-split work and apps/web/src/app/(authenticated)/_charts-client.tsx.
export { EChartsCard, echartsPresets, type EChartsCardProps } from './components/charts/echarts-card';
