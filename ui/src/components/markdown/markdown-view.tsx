'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { cn } from '../../lib/cn';

// NOTE: consumers must import 'katex/dist/katex.min.css' once at app entry
// to render math correctly. We don't import here because TS without CSS loaders
// configured cannot resolve it; the consuming Next.js app handles CSS.

/**
 * MarkdownView — react-markdown wrapper preset for Heuresys docs.
 * GFM tables/strikethrough/tasklists, KaTeX math, custom code blocks slot.
 * (TIER 10)
 */
type MarkdownComponents = React.ComponentProps<typeof ReactMarkdown>['components'];

/**
 * Le caselle delle liste di cose da fare, con un nome.
 *
 * `remark-gfm` traduce `- [x] fatto` in un <input type="checkbox" disabled>
 * senza etichetta: il testo dell'elemento gli sta accanto, non associato. Per
 * uno screen reader e' un campo anonimo — la regola `label` di axe. Il nome
 * dice lo stato, perche' il testo dell'elemento viene letto comunque.
 *
 * Sta fra i default, quindi chi passa `components` puo' sostituirlo.
 */
const DEFAULT_COMPONENTS: MarkdownComponents = {
  input: ({ node: _node, ...props }) =>
    props.type === 'checkbox' ? (
      <input {...props} aria-label={props.checked ? 'Completed task' : 'Task to do'} />
    ) : (
      <input {...props} />
    ),
};

export function MarkdownView({
  content,
  className,
  components,
}: {
  content: string;
  className?: string;
  components?: MarkdownComponents;
}) {
  return (
    <div className={cn('prose prose-sm [.dark_&]:prose-invert max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{ ...DEFAULT_COMPONENTS, ...components }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
