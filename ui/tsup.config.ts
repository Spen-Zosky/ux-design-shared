import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: [
    // React core
    "react",
    "react-dom",
    // Radix UI — all packages (regex, ~25 entries in dependencies)
    /^@radix-ui\//,
    // Framer Motion
    "framer-motion",
    // TanStack (Query + Table + Virtual)
    /^@tanstack\//,
    // Three.js ecosystem (R3F context)
    /^@react-three\//,
    "three",
    // React Flow
    "reactflow",
    "@xyflow/react",
    // Forms
    "react-hook-form",
    "@hookform/resolvers",
    "zod",
    // Icons
    "lucide-react",
    // Command palette
    "cmdk",
    // Toast
    "sonner",
    // Charts
    "recharts",
    "plotly.js",
    "chart.js",
    "react-chartjs-2",
    // D3
    /^d3-/,
    "d3",
    // Drawer
    "vaul",
    // Date libraries
    "date-fns",
    "dayjs",
    // Calendar
    "react-day-picker",
    // Carousel
    /^embla-carousel/,
    // Utilities (class merging)
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "tailwindcss-animate",
    // Next.js peer
    "next",
    "next/link",
    "next/image",
    "next/router",
    "next/navigation",
    // === CLI ADDITIONS (X18.2 critical thinking — context-bearing libs in deps) ===
    // DnD Kit (DnDContext provider — HIGH risk dual-package hazard)
    /^@dnd-kit\//,
    // Gesture state (hook-based context)
    "@use-gesture/react",
    "use-gesture",
    // Focus trap (React context wrapper)
    "focus-trap-react",
    "focus-trap",
    // Grid layout (layout context)
    "react-grid-layout",
    // ECharts React wrapper (chart context)
    "echarts-for-react",
    "echarts",
    // Cytoscape React wrapper (graph context)
    "react-cytoscapejs",
    "cytoscape",
    // Intersection observer hook
    "react-intersection-observer",
    // Lottie React wrapper (animation refs)
    "lottie-react",
    // === Bundle-bloat utilities (safer external than bundle) ===
    "mermaid",
    "shiki",
    "katex",
    "react-markdown",
    "rehype-katex",
    "remark-gfm",
    "remark-math",
    "ai",
    "exceljs",
    "papaparse",
    "jszip",
    "jsqr",
    "qrcode",
    "signature_pad",
    "react-signature-canvas",
    "react-international-phone",
    "canvas-confetti",
    "zxcvbn",
    "fast-xml-parser",
    "@iarna/toml",
  ],
  treeshake: true,
  sourcemap: false,
  loader: {
    ".css": "empty",
  },
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".cjs",
    };
  },
});
