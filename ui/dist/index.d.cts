import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React$1 from 'react';
import { ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { ClassValue } from 'clsx';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { HTMLMotionProps } from 'framer-motion';
import { ColumnDef } from '@tanstack/react-table';
import confettiLib from 'canvas-confetti';
import { LottieComponentProps } from 'lottie-react';
import { EChartsOption } from 'echarts';
import ReactMarkdown from 'react-markdown';
import * as lucide_react from 'lucide-react';

declare const buttonVariants: (props?: ({
    variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link" | null | undefined;
    size?: "sm" | "md" | "lg" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

declare const Card: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLHeadingElement> & React$1.RefAttributes<HTMLHeadingElement>>;
declare const CardDescription: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLParagraphElement> & React$1.RefAttributes<HTMLParagraphElement>>;
declare const CardContent: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;

declare const inputVariants: (props?: ({
    variant?: "default" | "error" | null | undefined;
    inputSize?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface InputProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
    label?: React$1.ReactNode;
    helperText?: React$1.ReactNode;
    errorText?: React$1.ReactNode;
    containerClassName?: string;
}
declare const Input: React$1.ForwardRefExoticComponent<InputProps & React$1.RefAttributes<HTMLInputElement>>;

/**
 * Toast — wrapper around @radix-ui/react-toast.
 *
 * Usage: mount once at the root of your app:
 *
 *   <ToastProvider>
 *     <App />
 *     <ToastViewport />
 *   </ToastProvider>
 *
 * Then render <Toast> imperatively or via your own state hook.
 */
declare const ToastProvider: React$1.FC<ToastPrimitive.ToastProviderProps>;
declare const ToastViewport: React$1.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastViewportProps & React$1.RefAttributes<HTMLOListElement>, "ref"> & React$1.RefAttributes<HTMLOListElement>>;
declare const toastVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ToastProps extends React$1.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>, VariantProps<typeof toastVariants> {
}
declare const Toast: React$1.ForwardRefExoticComponent<ToastProps & React$1.RefAttributes<HTMLLIElement>>;
declare const ToastTitle: React$1.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastTitleProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ToastDescription: React$1.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastDescriptionProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ToastClose: React$1.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastCloseProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const ToastAction: React$1.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastActionProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

declare function cn(...inputs: ClassValue[]): string;

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';
interface ThemeContextValue {
    theme: Theme;
    resolved: ResolvedTheme;
    setTheme: (t: Theme) => void;
}
declare function ThemeProvider({ children, defaultTheme, }: {
    children: React$1.ReactNode;
    defaultTheme?: Theme;
}): React$1.ReactElement;
declare function useTheme(): ThemeContextValue;

declare function ThemeToggle({ className }: {
    className?: string;
}): React$1.ReactElement;

declare const Dialog: React$1.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DialogClose: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React$1.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogOverlay: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DialogContent: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    showCloseButton?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare function DialogHeader({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare function DialogFooter({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare const DialogTitle: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React$1.RefAttributes<HTMLHeadingElement>, "ref"> & React$1.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>, "ref"> & React$1.RefAttributes<HTMLParagraphElement>>;

declare const DropdownMenu: React$1.FC<Dropdown.DropdownMenuProps>;
declare const DropdownMenuTrigger: React$1.ForwardRefExoticComponent<Dropdown.DropdownMenuTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: React$1.ForwardRefExoticComponent<Dropdown.DropdownMenuGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSub: React$1.FC<Dropdown.DropdownMenuSubProps>;
declare const DropdownMenuRadioGroup: React$1.ForwardRefExoticComponent<Dropdown.DropdownMenuRadioGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubTrigger: React$1.ForwardRefExoticComponent<Omit<Dropdown.DropdownMenuSubTriggerProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: React$1.ForwardRefExoticComponent<Omit<Dropdown.DropdownMenuSubContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuContent: React$1.ForwardRefExoticComponent<Omit<Dropdown.DropdownMenuContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: React$1.ForwardRefExoticComponent<Omit<Dropdown.DropdownMenuItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: React$1.ForwardRefExoticComponent<Omit<Dropdown.DropdownMenuCheckboxItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: React$1.ForwardRefExoticComponent<Omit<Dropdown.DropdownMenuRadioItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare function DropdownMenuLabel({ className, inset, ...props }: React$1.ComponentPropsWithoutRef<typeof Dropdown.Label> & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare const DropdownMenuSeparator: React$1.ForwardRefExoticComponent<Omit<Dropdown.DropdownMenuSeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare function DropdownMenuShortcut({ className, ...props }: React$1.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;

declare const Popover: React$1.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React$1.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React$1.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React$1.RefAttributes<HTMLDivElement>>;
declare const PopoverContent: React$1.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const TooltipProvider: React$1.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: React$1.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React$1.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const TooltipContent: React$1.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const Tabs: React$1.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React$1.RefAttributes<HTMLDivElement>>;
declare const TabsList: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const Accordion: React$1.ForwardRefExoticComponent<(AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps) & React$1.RefAttributes<HTMLDivElement>>;
declare const AccordionItem: React$1.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const AccordionTrigger: React$1.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const AccordionContent: React$1.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const Checkbox: React$1.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

declare const Switch: React$1.ForwardRefExoticComponent<Omit<SwitchPrimitive.SwitchProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

declare const Avatar: React$1.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarProps & React$1.RefAttributes<HTMLSpanElement>, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React$1.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React$1.RefAttributes<HTMLImageElement>, "ref"> & React$1.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React$1.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React$1.RefAttributes<HTMLSpanElement>, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
declare function AvatarGroup({ children, max, className, }: {
    children: React$1.ReactNode;
    max?: number;
    className?: string;
}): React$1.ReactElement;

declare const badgeVariants: (props?: ({
    variant?: "default" | "secondary" | "outline" | "destructive" | "success" | "warning" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

declare function Skeleton({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare function Spinner({ className }: {
    className?: string;
}): react_jsx_runtime.JSX.Element;

interface EmptyStateProps extends React$1.HTMLAttributes<HTMLDivElement> {
    icon?: React$1.ReactNode;
    title: string;
    description?: string;
    action?: React$1.ReactNode;
}
declare function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps): react_jsx_runtime.JSX.Element;
interface ErrorStateProps extends EmptyStateProps {
    retry?: () => void;
}
declare function ErrorState({ title, ...rest }: Partial<ErrorStateProps>): react_jsx_runtime.JSX.Element;

/**
 * Layout primitives — every-layout style. CSS-only, composable, no JS layout
 * logic. (RTGB B7.23)
 */
interface LayoutProps extends React$1.HTMLAttributes<HTMLDivElement> {
    as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'nav' | 'main' | 'aside';
}
declare function Stack({ className, gap, ...props }: LayoutProps & {
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}): react_jsx_runtime.JSX.Element;
declare function Cluster({ className, gap, align, justify, ...props }: LayoutProps & {
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
}): react_jsx_runtime.JSX.Element;
declare function Center({ className, ...props }: LayoutProps): react_jsx_runtime.JSX.Element;
declare function Cover({ className, ...props }: LayoutProps): react_jsx_runtime.JSX.Element;
declare function Frame({ className, ratio, ...props }: LayoutProps & {
    ratio?: '1/1' | '4/3' | '16/9' | '21/9' | '3/4';
}): react_jsx_runtime.JSX.Element;
declare function Grid({ className, cols, gap, ...props }: LayoutProps & {
    cols?: 'auto' | 1 | 2 | 3 | 4 | 6 | 12;
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}): react_jsx_runtime.JSX.Element;
declare function Switcher({ className, threshold, gap, ...props }: LayoutProps & {
    threshold?: string;
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}): react_jsx_runtime.JSX.Element;

/**
 * Motion primitives (RTGB B7.28-B7.30).
 *
 * Wrap framer-motion `motion.div` with a small set of presets so callers don't
 * have to repeat keyframes. All respect `prefers-reduced-motion` via the
 * media query in tokens.css.
 */
declare const FadeIn: React$1.FC<HTMLMotionProps<'div'> & {
    delay?: number;
}>;
declare const SlideIn: React$1.FC<HTMLMotionProps<'div'> & {
    from?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
}>;
declare const ScaleIn: React$1.FC<HTMLMotionProps<'div'> & {
    delay?: number;
}>;
declare const StaggerChildren: React$1.FC<HTMLMotionProps<'div'> & {
    delay?: number;
    stagger?: number;
}>;
declare const StaggerItem: React$1.FC<HTMLMotionProps<'div'>>;

/**
 * Command palette wrapper around cmdk. (RTGB B7.20)
 *
 * Use:
 *   const [open, setOpen] = useState(false);
 *   useGlobalCmdK(() => setOpen(true));
 *   <CommandPalette open={open} onOpenChange={setOpen}>
 *     <CommandPalette.Group heading="Navigate">
 *       <CommandPalette.Item onSelect={() => router.push('/dashboard')}>Dashboard</CommandPalette.Item>
 *     </CommandPalette.Group>
 *   </CommandPalette>
 */
declare function useGlobalCmdK(callback: () => void): void;
interface CommandPaletteRootProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    placeholder?: string;
    empty?: React$1.ReactNode;
    children: React$1.ReactNode;
}
declare function CommandPaletteRoot({ open, onOpenChange, placeholder, empty, children, }: CommandPaletteRootProps): react_jsx_runtime.JSX.Element;
declare const CommandPalette: typeof CommandPaletteRoot & {
    Group: React$1.ForwardRefExoticComponent<Omit<{
        children?: React$1.ReactNode;
    } & Omit<Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
        ref?: React$1.Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "asChild" | "key" | keyof React$1.HTMLAttributes<HTMLDivElement>>, "value" | "heading"> & {
        heading?: React$1.ReactNode;
        value?: string;
        forceMount?: boolean;
    } & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
    Item: React$1.ForwardRefExoticComponent<Omit<{
        children?: React$1.ReactNode;
    } & Omit<Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
        ref?: React$1.Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "asChild" | "key" | keyof React$1.HTMLAttributes<HTMLDivElement>>, "disabled" | "value" | "onSelect"> & {
        disabled?: boolean;
        onSelect?: (value: string) => void;
        value?: string;
        keywords?: string[];
        forceMount?: boolean;
    } & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
    Separator: React$1.ForwardRefExoticComponent<Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
        ref?: React$1.Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "asChild" | "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
        alwaysRender?: boolean;
    } & React$1.RefAttributes<HTMLDivElement>>;
};

/**
 * DataTable — TanStack Table 8 wrapper with sorting + pagination + filter
 * primitives. Virtual scroll opt-in via the `virtual` prop (consumer wraps
 * in VirtualScroller separately).
 *
 * (RTGB B7.15)
 */
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    className?: string;
    caption?: string;
    emptyMessage?: string;
    pageSize?: number;
}
declare function DataTable<TData, TValue>({ columns, data, className, caption, emptyMessage, pageSize, }: DataTableProps<TData, TValue>): react_jsx_runtime.JSX.Element;

/**
 * PageHeader — admin page header with title, description, breadcrumbs slot,
 * and right-aligned action area. (TIER 1)
 */
interface PageHeaderProps extends React$1.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    breadcrumbs?: React$1.ReactNode;
    actions?: React$1.ReactNode;
    badges?: React$1.ReactNode;
    divider?: boolean;
}
declare function PageHeader({ title, description, breadcrumbs, actions, badges, divider, className, ...props }: PageHeaderProps): react_jsx_runtime.JSX.Element;

interface FilterChip {
    id: string;
    label: string;
    value: string;
    onRemove: () => void;
}
interface FilterBarProps {
    searchValue?: string;
    onSearchChange?: (v: string) => void;
    searchPlaceholder?: string;
    chips?: FilterChip[];
    onClearAll?: () => void;
    filtersSlot?: React$1.ReactNode;
    rightSlot?: React$1.ReactNode;
    className?: string;
}
/**
 * FilterBar smart — search input + chip-based active filters + advanced
 * filters dropdown. (TIER 1)
 */
declare function FilterBar({ searchValue, onSearchChange, searchPlaceholder, chips, onClearAll, filtersSlot, rightSlot, className, }: FilterBarProps): react_jsx_runtime.JSX.Element;

interface AppShellNavItem {
    id: string;
    label: string;
    icon?: React$1.ReactNode;
    href?: string;
    onClick?: () => void;
    active?: boolean;
    badge?: React$1.ReactNode;
    children?: AppShellNavItem[];
}
interface AppShellProps {
    brand?: React$1.ReactNode;
    nav: AppShellNavItem[];
    topbarLeft?: React$1.ReactNode;
    topbarRight?: React$1.ReactNode;
    children: React$1.ReactNode;
    collapsedDefault?: boolean;
    className?: string;
}
/**
 * AppShell — full app skeleton: collapsible sidebar + topbar + main content.
 * Hierarchical sidenav supports 2 levels. Mobile uses overlay drawer.
 * (TIER 1)
 */
declare function AppShell({ brand, nav, topbarLeft, topbarRight, children, collapsedDefault, className, }: AppShellProps): react_jsx_runtime.JSX.Element;

/**
 * BentoGrid — adaptive responsive grid where children can span multiple
 * cells via colSpan/rowSpan props. CSS Grid auto-fit + named area-less.
 * (TIER 1)
 */
interface BentoGridProps extends React$1.HTMLAttributes<HTMLDivElement> {
    columns?: number;
    rowHeight?: string;
    gap?: 'sm' | 'md' | 'lg';
}
declare function BentoGrid({ columns, rowHeight, gap, className, style, ...props }: BentoGridProps): react_jsx_runtime.JSX.Element;
interface BentoCellProps extends React$1.HTMLAttributes<HTMLDivElement> {
    colSpan?: number;
    rowSpan?: number;
    colSpanMd?: number;
    rowSpanMd?: number;
}
declare function BentoCell({ colSpan, rowSpan, colSpanMd, rowSpanMd, className, style, ...props }: BentoCellProps): react_jsx_runtime.JSX.Element;

interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: () => void;
}
/**
 * Breadcrumbs advanced — collapses to ellipsis when items > maxItems.
 * (TIER 1)
 */
declare function Breadcrumbs({ items, maxItems, separator, className, }: {
    items: BreadcrumbItem[];
    maxItems?: number;
    separator?: React$1.ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;

interface StepperStep {
    id: string;
    label: string;
    description?: string;
    optional?: boolean;
}
interface StepperProps {
    steps: StepperStep[];
    current: number;
    onStepClick?: (idx: number) => void;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}
/**
 * Stepper / Wizard nav — accessible numbered step progression.
 * (TIER 1)
 */
declare function Stepper({ steps, current, onStepClick, orientation, className, }: StepperProps): react_jsx_runtime.JSX.Element;

interface PaginationProps {
    page: number;
    pageCount: number;
    onPageChange: (p: number) => void;
    showFirstLast?: boolean;
    showJumpTo?: boolean;
    showPageSize?: boolean;
    pageSize?: number;
    pageSizeOptions?: number[];
    onPageSizeChange?: (size: number) => void;
    className?: string;
}
/**
 * Pagination advanced — first/prev/page numbers/next/last + jump-to + size picker.
 * (TIER 1)
 */
declare function Pagination({ page, pageCount, onPageChange, showFirstLast, showJumpTo, showPageSize, pageSize, pageSizeOptions, onPageSizeChange, className, }: PaginationProps): react_jsx_runtime.JSX.Element;

declare const fabVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    position?: "bottom-right" | "bottom-left" | "bottom-center" | "top-right" | "top-left" | null | undefined;
    tone?: "secondary" | "primary" | "accent" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface FABProps extends Omit<React$1.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>, VariantProps<typeof fabVariants> {
    icon?: React$1.ReactNode;
    label: string;
    extended?: boolean;
}
/**
 * FAB — Floating Action Button. Pinned to viewport corners.
 * Supports extended (icon + label visible) for primary actions.
 * (TIER 1)
 */
declare const FAB: React$1.ForwardRefExoticComponent<FABProps & React$1.RefAttributes<HTMLButtonElement>>;

interface MobileNavItem {
    id: string;
    label: string;
    icon: React$1.ReactNode;
    active?: boolean;
    badge?: number;
    onClick?: () => void;
}
/**
 * MobileBottomNav — fixed bottom navigation bar for mobile/tablet.
 * Optimized for thumb-reach and 5 items max.
 * (TIER 1)
 */
declare function MobileBottomNav({ items, className, }: {
    items: MobileNavItem[];
    className?: string;
}): react_jsx_runtime.JSX.Element;

interface TabItem {
    id: string;
    label: string;
    badge?: React$1.ReactNode;
    disabled?: boolean;
}
/**
 * TabsOverflow — horizontally scrollable tabs that gracefully collapse
 * overflow into a "More" dropdown. Measures via ResizeObserver.
 * (TIER 1)
 */
declare function TabsOverflow({ items, value, onChange, className, }: {
    items: TabItem[];
    value: string;
    onChange: (id: string) => void;
    className?: string;
}): react_jsx_runtime.JSX.Element;

interface AppSwitcherApp {
    id: string;
    name: string;
    icon: React$1.ReactNode;
    href?: string;
    description?: string;
    onClick?: () => void;
}
/**
 * AppSwitcher — Google-style waffle 3x3 launcher. Opens a popover with
 * a grid of apps. (TIER 1)
 */
declare function AppSwitcher({ apps, trigger, className, }: {
    apps: AppSwitcherApp[];
    trigger?: React$1.ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;

interface MegaMenuColumn {
    heading: string;
    items: Array<{
        id: string;
        label: string;
        description?: string;
        icon?: React$1.ReactNode;
        href?: string;
        onClick?: () => void;
        badge?: React$1.ReactNode;
    }>;
}
interface MegaMenuTrigger {
    id: string;
    label: string;
    columns: MegaMenuColumn[];
    featured?: React$1.ReactNode;
}
/**
 * MegaMenu — multi-column dropdown for top navigation. Supports featured
 * card slot per trigger. (TIER 1)
 */
declare function MegaMenu({ triggers, className, }: {
    triggers: MegaMenuTrigger[];
    className?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * Lightweight OKLCH color utilities for the Theme Builder Wizard.
 * Pure TS, no deps. Math from CSS Color Module Level 4.
 */
interface OKLCH {
    l: number;
    c: number;
    h: number;
}
declare function oklch(l: number, c: number, h: number): OKLCH;
declare function toCss({ l, c, h }: OKLCH): string;
/** Convert OKLCH to sRGB hex (approximate via sRGB gamut clip). */
declare function toHex(color: OKLCH): string;
/** OKLCH → Linear sRGB (for relative luminance / contrast calcs). */
declare function toRgb({ l, c, h }: OKLCH): {
    r: number;
    g: number;
    b: number;
};
/** Approximate WCAG relative luminance from OKLCH. */
declare function luminance(color: OKLCH): number;
/** WCAG contrast ratio between two colors. */
declare function contrastRatio(a: OKLCH, b: OKLCH): number;
/** Color blindness simulation (Brettel et al., daltonization simplified). */
declare function simulateColorBlind(color: OKLCH, type: 'protan' | 'deutan' | 'tritan'): OKLCH;
/** Generate harmonies from a base color. */
declare function harmony(base: OKLCH, kind: 'analogous' | 'triadic' | 'split-complement' | 'monochromatic'): OKLCH[];
/** Build a 11-stop scale (50, 100..900, 950) from a base. */
declare function buildScale(base: OKLCH): OKLCH[];

interface BrandIdentity {
    name: string;
    tagline?: string;
    logoSvg?: string;
    mood: 'corporate' | 'playful' | 'minimal' | 'futuristic' | 'elegant';
}
interface ColorSystem {
    primary: OKLCH;
    secondary: OKLCH;
    accent: OKLCH;
    success: OKLCH;
    warning: OKLCH;
    destructive: OKLCH;
    info: OKLCH;
    grayScale: 'slate' | 'neutral' | 'zinc' | 'stone' | 'cool' | 'warm';
}
interface ColorModes {
    light: boolean;
    dark: boolean;
    highContrast: boolean;
    colorBlindSim?: 'protan' | 'deutan' | 'tritan' | null;
}
interface Typography {
    fontSans: string;
    fontSerif: string;
    fontMono: string;
    scale: 'modular' | 'fluid';
    baseSize: number;
    lineHeight: number;
    letterSpacing: number;
    weights: number[];
}
interface SpacingLayout {
    scale: '4-base' | '8-base' | 'fibonacci' | 'golden';
    borderRadius: 'sharp' | 'soft' | 'round';
    borderWidth: 'thin' | 'medium' | 'thick';
}
interface MotionConfig {
    intensity: 'reduced' | 'normal' | 'expressive';
    durationFast: number;
    durationBase: number;
    durationSlow: number;
    easing: 'linear' | 'ease-in-out' | 'spring' | 'bounce' | 'anticipate';
}
interface EffectsConfig {
    shadows: 'none' | 'subtle' | 'material' | 'elevated' | 'dramatic';
    glassmorphism: number;
    neumorphism: boolean;
    glow: boolean;
    meshGradient: boolean;
    noiseOverlay: number;
}
interface IconographyConfig {
    set: 'lucide' | 'phosphor' | 'tabler' | 'heroicons';
    weight: 'thin' | 'regular' | 'bold';
    style: 'linear' | 'filled' | 'duotone';
}
interface ThemeBuilderState {
    brand: BrandIdentity;
    colors: ColorSystem;
    modes: ColorModes;
    typography: Typography;
    spacing: SpacingLayout;
    motion: MotionConfig;
    effects: EffectsConfig;
    iconography: IconographyConfig;
    density: 'compact' | 'comfortable' | 'spacious';
}
declare const DEFAULT_THEME_STATE: ThemeBuilderState;

declare function ThemeBuilderWizard({ initial, onComplete, onChange, className, }: {
    initial?: Partial<ThemeBuilderState>;
    onComplete?: (state: ThemeBuilderState) => void;
    onChange?: (state: ThemeBuilderState) => void;
    className?: string;
}): react_jsx_runtime.JSX.Element;

interface ThemePreset {
    id: string;
    name: string;
    mood: string;
    description: string;
    primary: OKLCH;
    secondary: OKLCH;
    accent: OKLCH;
    fontSans: string;
    fontSerif: string;
    fontMono: string;
    borderRadius: 'sharp' | 'soft' | 'round';
    motionIntensity: 'reduced' | 'normal' | 'expressive';
    effects: ('shadow' | 'glass' | 'neumorphism' | 'glow' | 'mesh' | 'noise')[];
    density: 'compact' | 'comfortable' | 'spacious';
}
declare const STARTER_PRESETS: ThemePreset[];
declare function findPreset(id: string): ThemePreset | undefined;

/**
 * Export the wizard state to multiple formats:
 *  - tokens.css (CSS variables, light + dark)
 *  - tailwind.config.js (extended)
 *  - tokens.json (W3C Design Tokens spec)
 *  - figma-tokens.json (Style Dictionary compatible)
 *  - theme.tsx (TypeScript ThemeProvider config)
 */
declare function exportTokensCss(state: ThemeBuilderState): string;
declare function exportTailwindConfig(state: ThemeBuilderState): string;
declare function exportTokensJson(state: ThemeBuilderState): string;
declare function exportFigmaTokens(state: ThemeBuilderState): string;
declare function exportThemeProvider(state: ThemeBuilderState): string;
declare function downloadAsFile(filename: string, content: string, mime?: string): void;

declare const glassVariants: (props?: ({
    intensity?: "light" | "medium" | "heavy" | null | undefined;
    tint?: "none" | "primary" | "accent" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface GlassCardProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof glassVariants> {
}
/**
 * GlassCard — glassmorphism container with backdrop-blur tunable.
 * (TIER 2)
 */
declare const GlassCard: React$1.ForwardRefExoticComponent<GlassCardProps & React$1.RefAttributes<HTMLDivElement>>;

declare const neuVariants: (props?: ({
    elevation?: "flat" | "raised" | "pressed" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface NeumorphicCardProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof neuVariants> {
}
/**
 * NeumorphicCard — soft shadow elevated/pressed surface for "soft" UI styles.
 * (TIER 2)
 */
declare const NeumorphicCard: React$1.ForwardRefExoticComponent<NeumorphicCardProps & React$1.RefAttributes<HTMLDivElement>>;

interface StatsCardProps {
    label: string;
    value: number | string;
    unit?: string;
    trend?: number;
    trendDirection?: 'up' | 'down' | 'flat';
    description?: string;
    sparkline?: number[];
    icon?: React$1.ReactNode;
    animate?: boolean;
    className?: string;
}
/**
 * StatsCard — KPI card with animated count-up + sparkline + trend badge.
 * (TIER 3)
 */
declare function StatsCard({ label, value, unit, trend, trendDirection, description, sparkline, icon, animate, className, }: StatsCardProps): react_jsx_runtime.JSX.Element;

interface ActivityFeedItem {
    id: string;
    actor: {
        name: string;
        avatar?: string;
    };
    verb: string;
    target?: string;
    meta?: string;
    timestamp: string;
    icon?: React$1.ReactNode;
    actions?: React$1.ReactNode;
}
/**
 * ActivityFeed — vertical timeline of events with avatars + actions.
 * (TIER 3)
 */
declare function ActivityFeed({ items, className, emptyMessage, }: {
    items: ActivityFeedItem[];
    className?: string;
    emptyMessage?: string;
}): react_jsx_runtime.JSX.Element;

interface Notification {
    id: string;
    title: string;
    body?: string;
    timestamp: string;
    read?: boolean;
    variant?: 'info' | 'success' | 'warning' | 'destructive';
    href?: string;
    onClick?: () => void;
}
/**
 * NotificationCenter — bell icon trigger + dropdown with read/unread states.
 * (TIER 3)
 */
declare function NotificationCenter({ notifications, onMarkRead, onMarkAllRead, className, }: {
    notifications: Notification[];
    onMarkRead?: (id: string) => void;
    onMarkAllRead?: () => void;
    className?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * useConfetti — fire celebratory confetti burst from any component.
 * Wraps canvas-confetti. (TIER 3)
 */
declare function useConfetti(): (options?: confettiLib.Options) => void;
/**
 * ConfettiButton — drop-in button that fires confetti on click.
 */
declare function ConfettiButton({ children, onClick, ...props }: React$1.ButtonHTMLAttributes<HTMLButtonElement>): react_jsx_runtime.JSX.Element;

declare const tierVariants: (props?: ({
    tier?: "gold" | "silver" | "bronze" | "platinum" | "legendary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AchievementBadgeProps extends VariantProps<typeof tierVariants> {
    title: string;
    description?: string;
    icon?: React$1.ReactNode;
    unlocked?: boolean;
    unlockedAt?: string;
    className?: string;
}
/**
 * AchievementBadge — gamification badge with tier coloring + unlock state.
 * (TIER 3)
 */
declare function AchievementBadge({ title, description, icon, tier, unlocked, unlockedAt, className, }: AchievementBadgeProps): react_jsx_runtime.JSX.Element;

interface TourStep {
    id: string;
    targetSelector: string;
    title: string;
    description: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
}
/**
 * OnboardingTour — Joyride-style multi-step coach marks.
 * Highlights elements via querySelector + renders a popover beside them.
 * (TIER 3)
 */
declare function OnboardingTour({ steps, active, onDismiss, onComplete, }: {
    steps: TourStep[];
    active: boolean;
    onDismiss?: () => void;
    onComplete?: () => void;
}): react_jsx_runtime.JSX.Element | null;

interface ShortcutGroup {
    heading: string;
    shortcuts: Array<{
        keys: string[];
        label: string;
    }>;
}
/**
 * KeyboardShortcutsModal — Cmd+/ trigger that lists app shortcuts grouped.
 * (TIER 3)
 */
declare function KeyboardShortcutsModal({ groups, open, onOpenChange, }: {
    groups: ShortcutGroup[];
    open: boolean;
    onOpenChange: (v: boolean) => void;
}): react_jsx_runtime.JSX.Element;
/**
 * useShortcutsModal — hook that toggles a modal on Cmd+/ (or Ctrl+/).
 */
declare function useShortcutsModal(): {
    readonly open: boolean;
    readonly setOpen: React$1.Dispatch<React$1.SetStateAction<boolean>>;
};

/**
 * Decorative backgrounds — pure CSS, no JS, respects prefers-reduced-motion.
 * (TIER 3)
 */
declare function MeshGradient({ className, colors, intensity, }: {
    className?: string;
    colors?: string[];
    intensity?: number;
}): react_jsx_runtime.JSX.Element;
declare function AuroraBackground({ className }: {
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function DotGrid({ className, size, dotSize, color, }: {
    className?: string;
    size?: number;
    dotSize?: number;
    color?: string;
}): react_jsx_runtime.JSX.Element;
declare function NoiseOverlay({ className, opacity, }: {
    className?: string;
    opacity?: number;
}): react_jsx_runtime.JSX.Element;

/**
 * TiltCard — 3D tilt effect on hover via mouse position. Pure CSS transform
 * no extra deps. Disabled when prefers-reduced-motion. (TIER 3)
 */
declare function TiltCard({ children, className, intensity, ...props }: React$1.HTMLAttributes<HTMLDivElement> & {
    intensity?: number;
}): react_jsx_runtime.JSX.Element;

declare const bannerVariants: (props?: ({
    tone?: "destructive" | "info" | "success" | "warning" | "neutral" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BannerProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
    title?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
}
/**
 * Banner — page-level alert with variant tone + optional dismiss.
 * (TIER 3)
 */
declare function Banner({ tone, title, dismissible, onDismiss, children, className, ...props }: BannerProps): react_jsx_runtime.JSX.Element;

/**
 * LottiePlayer — wrap lottie-react with a11y label + reduced-motion respect.
 * Accepts JSON animation data or a URL fetched on demand.
 * (TIER 3)
 */
interface LottiePlayerProps extends Omit<LottieComponentProps, 'animationData' | 'data'> {
    src?: string;
    data?: object;
    ariaLabel: string;
    className?: string;
}
declare function LottiePlayer({ src, data, ariaLabel, className, ...rest }: LottiePlayerProps): react_jsx_runtime.JSX.Element;

/**
 * EChartsCard — generic ECharts wrapper. Pass option object directly. Theme
 * follows tokens via CSS variables. (TIER 4 charts core)
 */
interface EChartsCardProps {
    option: EChartsOption;
    height?: number | string;
    loading?: boolean;
    className?: string;
    onEvents?: Record<string, (params: unknown) => void>;
    ariaLabel?: string;
}
declare function EChartsCard({ option, height, loading, className, onEvents, ariaLabel, }: EChartsCardProps): react_jsx_runtime.JSX.Element;
/**
 * Quick presets for common charts. Pass `data` shaped per preset.
 */
declare const echartsPresets: {
    readonly line: (data: {
        x: string[];
        series: {
            name: string;
            values: number[];
        }[];
    }) => EChartsOption;
    readonly bar: (data: {
        x: string[];
        series: {
            name: string;
            values: number[];
        }[];
    }) => EChartsOption;
    readonly pie: (data: {
        name: string;
        value: number;
    }[]) => EChartsOption;
    readonly heatmap: (data: {
        x: string[];
        y: string[];
        values: [number, number, number][];
    }) => EChartsOption;
    readonly sankey: (data: {
        nodes: {
            name: string;
        }[];
        links: {
            source: string;
            target: string;
            value: number;
        }[];
    }) => EChartsOption;
    readonly funnel: (data: {
        name: string;
        value: number;
    }[]) => EChartsOption;
    readonly treemap: (data: {
        name: string;
        value: number;
        children?: unknown[];
    }[]) => EChartsOption;
    readonly radar: (data: {
        indicator: {
            name: string;
            max: number;
        }[];
        series: {
            name: string;
            value: number[];
        }[];
    }) => EChartsOption;
    readonly gauge: (value: number, max?: number) => EChartsOption;
};

/**
 * Sparkline — inline tiny chart. Renders SVG polyline + optional area fill.
 * (TIER 4 sparklines)
 */
interface SparklineProps {
    data: number[];
    width?: number;
    height?: number;
    stroke?: string;
    fill?: string;
    showPoints?: boolean;
    showMinMax?: boolean;
    className?: string;
    ariaLabel?: string;
}
declare function Sparkline({ data, width, height, stroke, fill, showPoints, showMinMax, className, ariaLabel, }: SparklineProps): react_jsx_runtime.JSX.Element | null;
declare function WinLossSparkline({ data, className, ariaLabel, }: {
    data: ('win' | 'loss' | 'tie')[];
    className?: string;
    ariaLabel?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * Radial gauge animated (semi-circle or full circle). SVG-only, no deps.
 * (TIER 4 gauges)
 */
interface RadialGaugeProps {
    value: number;
    max?: number;
    min?: number;
    label?: string;
    unit?: string;
    size?: number;
    thickness?: number;
    variant?: 'semi' | 'full';
    tone?: 'primary' | 'success' | 'warning' | 'destructive';
    className?: string;
}
declare function RadialGauge({ value, max, min, label, unit, size, thickness, variant, tone, className, }: RadialGaugeProps): react_jsx_runtime.JSX.Element;
/**
 * ActivityRing — Apple Watch-style multi-ring progress indicator.
 */
interface ActivityRingProps {
    rings: {
        value: number;
        max: number;
        color: string;
        label?: string;
    }[];
    size?: number;
    thickness?: number;
    className?: string;
}
declare function ActivityRing({ rings, size, thickness, className }: ActivityRingProps): react_jsx_runtime.JSX.Element;
/**
 * LinearGauge — horizontal progress with label + value.
 */
interface LinearGaugeProps {
    value: number;
    max?: number;
    label?: string;
    segments?: number;
    tone?: 'primary' | 'success' | 'warning' | 'destructive';
    className?: string;
}
declare function LinearGauge({ value, max, label, segments, tone, className, }: LinearGaugeProps): react_jsx_runtime.JSX.Element;

/**
 * NetworkGraph — Cytoscape.js wrapper for force-directed graph viz.
 * Useful for ESCO knowledge graph, org chart, dependency maps.
 * (TIER 4 specialized viz)
 */
interface NetworkGraphProps {
    nodes: {
        id: string;
        label?: string;
        group?: string;
        size?: number;
    }[];
    edges: {
        id: string;
        source: string;
        target: string;
        label?: string;
        weight?: number;
    }[];
    layout?: 'cose' | 'circle' | 'grid' | 'concentric' | 'breadthfirst';
    height?: number | string;
    className?: string;
    ariaLabel?: string;
}
declare function NetworkGraph({ nodes, edges, layout, height, className, ariaLabel, }: NetworkGraphProps): react_jsx_runtime.JSX.Element;

interface FormWizardStep<TState = unknown> extends StepperStep {
    render: (state: TState, update: (patch: Partial<TState>) => void) => React$1.ReactNode;
    validate?: (state: TState) => string | null;
}
/**
 * FormWizard — multi-step form with per-step validation, save & resume hook,
 * and skeleton state for "load draft" UX. (TIER 6)
 */
interface FormWizardProps<TState> {
    steps: FormWizardStep<TState>[];
    initial: TState;
    onComplete: (state: TState) => void;
    onSaveDraft?: (state: TState) => void;
    draft?: TState;
    className?: string;
    title?: string;
}
declare function FormWizard<TState extends Record<string, unknown>>({ steps, initial, onComplete, onSaveDraft, draft, className, title, }: FormWizardProps<TState>): react_jsx_runtime.JSX.Element;

/**
 * Smart inputs — domain-aware inputs with formatting + validation.
 * (TIER 6)
 */
declare function PhoneInputField({ value, onChange, defaultCountry, className, }: {
    value: string;
    onChange: (val: string) => void;
    defaultCountry?: string;
    className?: string;
}): react_jsx_runtime.JSX.Element;
interface MoneyInputProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    value: number | null;
    onChange: (val: number | null) => void;
    currency?: string;
    locale?: string;
}
declare function MoneyInput({ value, onChange, currency, locale, className, ...rest }: MoneyInputProps): react_jsx_runtime.JSX.Element;
/**
 * IbanInput — formats IBAN with spaces every 4 chars + light validation.
 */
declare function IbanInput({ value, onChange, className, ...rest }: Omit<React$1.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
    value: string;
    onChange: (val: string) => void;
}): react_jsx_runtime.JSX.Element;
/**
 * TaxIdInput — Italian Codice Fiscale or VAT.
 */
declare function TaxIdInput({ value, onChange, variant, className, ...rest }: Omit<React$1.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
    value: string;
    onChange: (val: string) => void;
    variant?: 'cf' | 'vat';
}): react_jsx_runtime.JSX.Element;

/**
 * OtpInput — segmented one-time password input. Auto-advance + paste support.
 * (TIER 6)
 */
interface OtpInputProps {
    length?: number;
    value: string;
    onChange: (v: string) => void;
    onComplete?: (v: string) => void;
    disabled?: boolean;
    className?: string;
    ariaLabel?: string;
}
declare function OtpInput({ length, value, onChange, onComplete, disabled, className, ariaLabel, }: OtpInputProps): react_jsx_runtime.JSX.Element;

/**
 * PasswordStrengthMeter — uses zxcvbn for entropy scoring (0-4).
 * Shows visual bars + feedback suggestions.
 * (TIER 6)
 */
declare function PasswordStrengthMeter({ password, userInputs, className, }: {
    password: string;
    userInputs?: string[];
    className?: string;
}): react_jsx_runtime.JSX.Element | null;

/**
 * SignaturePadField — canvas-based signature capture with clear + save.
 * (TIER 6)
 */
interface SignaturePadFieldProps {
    onSave?: (dataUrl: string) => void;
    width?: number;
    height?: number;
    className?: string;
    ariaLabel?: string;
}
declare function SignaturePadField({ onSave, width, height, className, ariaLabel, }: SignaturePadFieldProps): react_jsx_runtime.JSX.Element;

/**
 * FileDropzone — drag/drop upload zone with multi-file support, validation,
 * and per-file progress slot. (TIER 6 + TIER 9)
 */
interface FileDropzoneProps {
    accept?: string;
    multiple?: boolean;
    maxSize?: number;
    onFiles: (files: File[]) => void;
    files?: {
        file: File;
        progress?: number;
        error?: string;
    }[];
    onRemove?: (file: File) => void;
    className?: string;
    label?: string;
}
declare function FileDropzone({ accept, multiple, maxSize, onFiles, files, onRemove, className, label, }: FileDropzoneProps): react_jsx_runtime.JSX.Element;

interface KanbanCard {
    id: string;
    title: string;
    description?: string;
    assignee?: {
        name: string;
        avatar?: string;
    };
    badge?: React$1.ReactNode;
    meta?: React$1.ReactNode;
}
interface KanbanColumn {
    id: string;
    title: string;
    cards: KanbanCard[];
    color?: string;
}
/**
 * KanbanBoard — accessible drag-drop kanban (column reorder + cross-column).
 * Uses @dnd-kit. Ships full keyboard navigation. (TIER 5)
 */
declare function KanbanBoard({ columns: initialColumns, onChange, onAddCard, className, }: {
    columns: KanbanColumn[];
    onChange: (columns: KanbanColumn[]) => void;
    onAddCard?: (columnId: string) => void;
    className?: string;
}): react_jsx_runtime.JSX.Element;

interface TimelineEvent {
    id: string;
    time: string;
    title: string;
    description?: string;
    icon?: React$1.ReactNode;
    tone?: 'primary' | 'success' | 'warning' | 'destructive' | 'muted';
}
/**
 * Timeline — vertical event timeline. (TIER 5)
 */
declare function Timeline({ events, className, emptyMessage, }: {
    events: TimelineEvent[];
    className?: string;
    emptyMessage?: string;
}): react_jsx_runtime.JSX.Element;

interface Comment {
    id: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    body: string;
    timestamp: string;
    reactions?: Record<string, number>;
    replies?: Comment[];
}
/**
 * CommentThread — threaded comments with reply + reactions + mention support.
 * @mention parsing renders mentions as styled spans (parent supplies links).
 * (TIER 5)
 */
declare function CommentThread({ comments, onReply, onReact, className, depth, }: {
    comments: Comment[];
    onReply?: (parentId: string, body: string) => void;
    onReact?: (id: string, emoji: string) => void;
    className?: string;
    depth?: number;
}): react_jsx_runtime.JSX.Element;

interface CalendarEvent {
    id: string;
    date: string;
    title: string;
    tone?: 'primary' | 'success' | 'warning' | 'destructive';
}
/**
 * CalendarGrid — month view calendar with event dots + click-to-select.
 * Pure SVG/HTML, no DnD here (heavy DnD belongs to a separate Calendar prod
 * component for booking flows). (TIER 5)
 */
declare function CalendarGrid({ month, year, events, selected, onSelectDate, className, }: {
    month: number;
    year: number;
    events?: CalendarEvent[];
    selected?: string;
    onSelectDate?: (iso: string) => void;
    className?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * VideoPlayer — accessible HTML5 video with custom controls + chapters slot.
 * Renders captions/track elements when provided. (TIER 7)
 */
interface VideoChapter {
    start: number;
    title: string;
}
interface VideoCaption {
    src: string;
    srcLang: string;
    label: string;
    default?: boolean;
}
interface VideoPlayerProps {
    src: string;
    poster?: string;
    chapters?: VideoChapter[];
    captions?: VideoCaption[];
    className?: string;
    ariaLabel?: string;
}
declare function VideoPlayer({ src, poster, chapters, captions, className, ariaLabel, }: VideoPlayerProps): react_jsx_runtime.JSX.Element;

/**
 * QRCodeView — generate a QR code as a data URL via `qrcode`.
 * (TIER 7)
 */
declare function QRCodeView({ value, size, className, ariaLabel, level, }: {
    value: string;
    size?: number;
    className?: string;
    ariaLabel?: string;
    level?: 'L' | 'M' | 'Q' | 'H';
}): react_jsx_runtime.JSX.Element;

interface GalleryImage {
    src: string;
    alt: string;
    caption?: string;
}
/**
 * ImageGallery — masonry grid + lightbox overlay with prev/next + ESC close.
 * Lightweight, no extra deps. (TIER 7)
 */
declare function ImageGallery({ images, className, columns, }: {
    images: GalleryImage[];
    className?: string;
    columns?: 2 | 3 | 4 | 5;
}): react_jsx_runtime.JSX.Element;

interface DiffLine {
    type: 'add' | 'remove' | 'context';
    content: string;
    oldLine?: number;
    newLine?: number;
}
/**
 * DiffViewer — side-by-side or unified line diff renderer.
 * Accepts pre-computed DiffLine[] (caller can use jsdiff or any algo).
 * (TIER 9)
 */
declare function DiffViewer({ lines, variant, className, }: {
    lines: DiffLine[];
    variant?: 'unified' | 'split';
    className?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * JsonTree — collapsible JSON viewer with type-coloring.
 * (TIER 9)
 */
declare function JsonTree({ value, name, depth, defaultOpen, className, }: {
    value: unknown;
    name?: string;
    depth?: number;
    defaultOpen?: boolean;
    className?: string;
}): react_jsx_runtime.JSX.Element | null;

/**
 * Universal file parsers — promise-based, runtime-safe, generic typing.
 * (TIER 9)
 */
declare function parseCSV<T = Record<string, string>>(file: File | string, options?: {
    header?: boolean;
    delimiter?: string;
}): Promise<{
    data: T[];
    errors: string[];
}>;
declare function exportCSV<T extends Record<string, unknown>>(rows: T[]): string;
declare function parseExcel(file: File | ArrayBuffer): Promise<Record<string, unknown[]>>;
declare function exportExcel<T extends Record<string, unknown>>(sheets: Record<string, T[]>, filename: string): Promise<void>;
declare function parseJSON<T = unknown>(file: File | string): Promise<T>;
declare function parseTOML(file: File | string): Promise<Record<string, unknown>>;
declare function parseXML(file: File | string): Promise<Record<string, unknown>>;

/**
 * MarkdownView — react-markdown wrapper preset for Heuresys docs.
 * GFM tables/strikethrough/tasklists, KaTeX math, custom code blocks slot.
 * (TIER 10)
 */
declare function MarkdownView({ content, className, components, }: {
    content: string;
    className?: string;
    components?: React$1.ComponentProps<typeof ReactMarkdown>['components'];
}): react_jsx_runtime.JSX.Element;

/**
 * MermaidDiagram — render mermaid source as SVG via data-URL image.
 *
 * Implementation: mermaid produces SVG markup which we encode as a data URL
 * and assign to an <img> src. This avoids any HTML injection path entirely
 * since the browser parses the SVG as an image (no script execution).
 *
 * Supports flowchart/sequence/class/state/ER/Gantt/Sankey diagrams.
 * (TIER 10)
 */
declare function MermaidDiagram({ source, className, ariaLabel, }: {
    source: string;
    className?: string;
    ariaLabel?: string;
}): react_jsx_runtime.JSX.Element;

declare const VARIANTS: {
    readonly info: {
        readonly icon: React$1.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
        readonly label: "Info";
        readonly className: "border-info/40 bg-info/10 text-info";
    };
    readonly warning: {
        readonly icon: React$1.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
        readonly label: "Warning";
        readonly className: "border-warning/40 bg-warning/10 text-warning";
    };
    readonly tip: {
        readonly icon: React$1.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
        readonly label: "Tip";
        readonly className: "border-success/40 bg-success/10 text-success";
    };
    readonly danger: {
        readonly icon: React$1.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
        readonly label: "Danger";
        readonly className: "border-destructive/40 bg-destructive/10 text-destructive";
    };
    readonly note: {
        readonly icon: React$1.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
        readonly label: "Note";
        readonly className: "border-border bg-muted/40 text-foreground";
    };
    readonly quote: {
        readonly icon: React$1.ForwardRefExoticComponent<Omit<lucide_react.LucideProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
        readonly label: "Quote";
        readonly className: "border-l-4 border-primary bg-primary/5 text-foreground";
    };
};
type AdmonitionVariant = keyof typeof VARIANTS;
/**
 * Admonition — callout block for markdown / docs.
 * Variants: info / warning / tip / danger / note / quote.
 * (TIER 10)
 */
declare function Admonition({ variant, title, children, className, }: {
    variant?: AdmonitionVariant;
    title?: string;
    children: React$1.ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;

interface TocItem {
    id: string;
    level: number;
    text: string;
}
/**
 * TableOfContents — auto-generated from h1-h6 in a target container, with
 * scroll-spy active highlight via IntersectionObserver. (TIER 10)
 */
declare function TableOfContents({ containerSelector, className, }: {
    containerSelector?: string;
    className?: string;
}): react_jsx_runtime.JSX.Element | null;

/**
 * ChatProvider — provider-agnostic AI chat interface.
 *
 * Supports streaming via SSE/fetch. Concrete adapters live in:
 *   - @heuresys/ui/ai/adapters/anthropic
 *   - @heuresys/ui/ai/adapters/openai
 *   - @heuresys/ui/ai/adapters/google
 *
 * Tools/agent steps and message history rendered by sibling components
 * (Chatbot, AgentSteps, ToolCallView). (TIER 8)
 */
type ChatRole = 'system' | 'user' | 'assistant' | 'tool';
interface ChatMessage {
    id: string;
    role: ChatRole;
    content: string;
    timestamp: string;
    toolCalls?: ToolCall[];
    toolResults?: ToolResult[];
    reasoning?: string;
}
interface ToolCall {
    id: string;
    name: string;
    input: Record<string, unknown>;
}
interface ToolResult {
    toolCallId: string;
    output: unknown;
    error?: string;
}
interface ChatProviderAdapter {
    id: string;
    name: string;
    send(messages: ChatMessage[], opts?: {
        signal?: AbortSignal;
    }): AsyncIterable<{
        type: 'text-delta' | 'tool-call' | 'tool-result' | 'done' | 'error';
        delta?: string;
        toolCall?: ToolCall;
        toolResult?: ToolResult;
        error?: string;
    }>;
}
interface ChatContextValue {
    messages: ChatMessage[];
    send: (text: string) => Promise<void>;
    isStreaming: boolean;
    abort: () => void;
    clear: () => void;
    adapter: ChatProviderAdapter;
}
declare function ChatProvider({ adapter, initialMessages, children, }: {
    adapter: ChatProviderAdapter;
    initialMessages?: ChatMessage[];
    children: React$1.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function useChat(): ChatContextValue;

/**
 * Chatbot — UI shell for ChatProvider. Streams assistant responses, renders
 * markdown, shows tool calls inline, exposes abort + clear.
 * (TIER 8)
 */
declare function Chatbot({ className }: {
    className?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * ToolCallView — collapsible card showing a tool call + its result.
 * (TIER 8)
 */
declare function ToolCallView({ call, result, className, }: {
    call: ToolCall;
    result?: ToolResult;
    className?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * VoiceInput — Web Speech API recognition + waveform visualization.
 * Falls back gracefully when SpeechRecognition is unavailable (Safari etc.).
 * (TIER 8)
 */
declare function VoiceInput({ onTranscript, language, className, }: {
    onTranscript: (text: string, isFinal: boolean) => void;
    language?: string;
    className?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * Locale-aware formatters via Intl API. (TIER 11)
 */
declare function formatCurrency(value: number, currency?: string, locale?: string): string;
declare function formatNumber(value: number, options?: Intl.NumberFormatOptions, locale?: string): string;
declare function formatPercent(value: number, fractionDigits?: number, locale?: string): string;
declare function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions, locale?: string): string;
declare function formatDateTime(date: Date | string, locale?: string): string;
declare function formatRelativeTime(date: Date | string, locale?: string): string;
declare function formatList(items: string[], locale?: string, type?: 'conjunction' | 'disjunction'): string;
declare const SUPPORTED_LOCALES: readonly [{
    readonly code: "it-IT";
    readonly label: "Italiano";
}, {
    readonly code: "en-US";
    readonly label: "English (US)";
}, {
    readonly code: "en-GB";
    readonly label: "English (UK)";
}, {
    readonly code: "fr-FR";
    readonly label: "Français";
}, {
    readonly code: "de-DE";
    readonly label: "Deutsch";
}, {
    readonly code: "es-ES";
    readonly label: "Español";
}, {
    readonly code: "pt-PT";
    readonly label: "Português";
}];

/**
 * LanguagePicker — locale switcher with flag/label.
 * RTL-aware (sets dir attribute when ar/he/fa selected).
 * (TIER 11)
 */
declare function LanguagePicker({ value, onChange, locales, className, }: {
    value: string;
    onChange: (code: string) => void;
    locales?: ReadonlyArray<{
        code: string;
        label: string;
    }>;
    className?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * SkipLink — keyboard-only "Skip to main content" link, visible on focus.
 * (TIER 12)
 */
declare function SkipLink({ href, label, className, }: {
    href?: string;
    label?: string;
    className?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * AccessibilityPanel — user-controlled a11y preferences toolbar.
 * Persists settings to localStorage and applies CSS classes/data-attrs to <html>.
 * (TIER 12)
 */
declare function AccessibilityPanel({ className }: {
    className?: string;
}): react_jsx_runtime.JSX.Element;

declare function LiveRegionProvider({ children }: {
    children: React$1.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function useAnnounce(): (msg: string, urgency?: 'polite' | 'assertive') => void;

/**
 * PerfMonitor — embedded FPS + memory + dom-node-count overlay.
 * Useful in development builds. Pin to a corner.
 * (TIER 13)
 */
declare function PerfMonitor({ position, className, }: {
    position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    className?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * Hero sections — 5 layout variants for marketing landing pages.
 * (TIER 14)
 */
declare function HeroSplit({ eyebrow, title, description, primaryCta, secondaryCta, imageSrc, imageAlt, className, }: {
    eyebrow?: string;
    title: string;
    description: string;
    primaryCta?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
    secondaryCta?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
    imageSrc: string;
    imageAlt: string;
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function HeroCentered({ title, description, primaryCta, secondaryCta, className, }: {
    title: string;
    description: string;
    primaryCta?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
    secondaryCta?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function HeroVideoBackground({ videoSrc, poster, title, description, primaryCta, className, }: {
    videoSrc: string;
    poster?: string;
    title: string;
    description: string;
    primaryCta?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
    className?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * AnimatedNumber — count-up to a target value with easing.
 * Respects prefers-reduced-motion (snaps directly to value).
 * (TIER 15)
 */
declare function AnimatedNumber({ value, duration, decimals, prefix, suffix, className, }: {
    value: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * Text effects — typewriter, gradient, shimmer, marquee.
 * (TIER 15)
 */
declare function Typewriter({ text, speed, className, onComplete, }: {
    text: string;
    speed?: number;
    className?: string;
    onComplete?: () => void;
}): react_jsx_runtime.JSX.Element;
declare function GradientText({ children, from, to, className, }: {
    children: React$1.ReactNode;
    from?: string;
    to?: string;
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function Marquee({ children, speed, reverse, pauseOnHover, className, }: {
    children: React$1.ReactNode;
    speed?: number;
    reverse?: boolean;
    pauseOnHover?: boolean;
    className?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * ThreeScene — minimal three.js viewer with OrbitControls.
 * Pass children as <mesh>, <group>, etc. (TIER 16)
 */
declare function ThreeScene({ children, className, height, cameraPosition, ariaLabel, }: {
    children?: React$1.ReactNode;
    className?: string;
    height?: number | string;
    cameraPosition?: [number, number, number];
    ariaLabel?: string;
}): react_jsx_runtime.JSX.Element;

declare const pillVariants: (props?: ({
    tone?: "warn" | "info" | "down" | "ok" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type IntegrationHealthTone = 'ok' | 'warn' | 'down' | 'info';
interface IntegrationHealthPillProps extends Omit<React$1.HTMLAttributes<HTMLSpanElement>, 'children'>, VariantProps<typeof pillVariants> {
    label?: string;
    pulse?: boolean;
    showDot?: boolean;
}
declare function IntegrationHealthPill({ tone, label, pulse, showDot, className, ...props }: IntegrationHealthPillProps): react_jsx_runtime.JSX.Element;

type KpiRingTone = 'primary' | 'success' | 'warning' | 'destructive';
interface KpiRingThresholds {
    /** value ≥ goodAt → success */
    goodAt?: number;
    /** value ≥ warnAt → warning (else destructive) */
    warnAt?: number;
}
interface KpiRingProps {
    value: number;
    max?: number;
    min?: number;
    label: string;
    sublabel?: string;
    unit?: string;
    /** previous-period delta in percent points */
    trend?: number;
    /** threshold-based tone resolution; ignored if `tone` is set explicitly */
    thresholds?: KpiRingThresholds;
    /** override threshold-based resolution */
    tone?: KpiRingTone;
    size?: number;
    thickness?: number;
    variant?: RadialGaugeProps['variant'];
    className?: string;
}
declare function KpiRing({ value, max, min, label, sublabel, unit, trend, thresholds, tone, size, thickness, variant, className, }: KpiRingProps): react_jsx_runtime.JSX.Element;

type SuccessionRisk = 'low' | 'medium' | 'high' | 'critical';
type SuccessionReadiness = 'ready-now' | '1-2y' | '3-5y' | 'not-ready';
interface SuccessionCardProps {
    candidateName: string;
    candidateAvatarUrl?: string;
    currentRole: string;
    targetRole: string;
    /** 0-100 readiness percentage */
    readinessPercent: number;
    readiness?: SuccessionReadiness;
    risk?: SuccessionRisk;
    /** ISO date or human label */
    readyBy?: string;
    className?: string;
}
declare function SuccessionCard({ candidateName, candidateAvatarUrl, currentRole, targetRole, readinessPercent, readiness, risk, readyBy, className, }: SuccessionCardProps): react_jsx_runtime.JSX.Element;

type CareerStageStatus = 'past' | 'current' | 'future';
interface CareerStage {
    id: string;
    label: string;
    /** ISO year or display label */
    year?: string;
    description?: string;
    status?: CareerStageStatus;
}
interface CareerArcProps {
    stages: CareerStage[];
    /** Index of current stage; ignored if stages already define `status` */
    currentIndex?: number;
    className?: string;
}
declare function CareerArc({ stages, currentIndex, className }: CareerArcProps): react_jsx_runtime.JSX.Element;

interface KgMiniGraphLegendItem {
    group: string;
    label: string;
    color: string;
}
interface KgMiniGraphProps {
    nodes: NetworkGraphProps['nodes'];
    edges: NetworkGraphProps['edges'];
    /** Smaller default than NetworkGraph (200px vs 400px) */
    height?: number | string;
    layout?: NetworkGraphProps['layout'];
    /** Optional legend to render below the canvas */
    legend?: KgMiniGraphLegendItem[];
    ariaLabel?: string;
    className?: string;
}
declare function KgMiniGraph({ nodes, edges, height, layout, legend, ariaLabel, className, }: KgMiniGraphProps): react_jsx_runtime.JSX.Element;

interface SkillHeatmapAxis {
    id: string;
    label: string;
}
interface SkillHeatmapCell {
    rowId: string;
    colId: string;
    /** 0-100 coverage / proficiency / count normalized */
    value: number;
    /** optional human label to render inside the cell (overrides numeric) */
    display?: string;
}
interface SkillHeatmapProps {
    rows: SkillHeatmapAxis[];
    cols: SkillHeatmapAxis[];
    cells: SkillHeatmapCell[];
    /** caption for screen readers */
    caption?: string;
    /** show numeric value inside cell */
    showValue?: boolean;
    /** override default sequential scale */
    colorScale?: (value: number) => string;
    onCellClick?: (cell: SkillHeatmapCell) => void;
    className?: string;
}
declare function SkillHeatmap({ rows, cols, cells, caption, showValue, colorScale, onCellClick, className, }: SkillHeatmapProps): react_jsx_runtime.JSX.Element;

interface CapabilityRadarAxis {
    id: string;
    label: string;
}
interface CapabilityRadarSeries {
    id: string;
    label: string;
    /** Same length as `axes`, values 0-max */
    values: number[];
    /** Override stroke/fill color */
    color?: string;
}
interface CapabilityRadarProps {
    axes: CapabilityRadarAxis[];
    series: CapabilityRadarSeries[];
    max?: number;
    size?: number;
    rings?: number;
    showLegend?: boolean;
    className?: string;
}
declare function CapabilityRadar({ axes, series, max, size, rings, showLegend, className, }: CapabilityRadarProps): react_jsx_runtime.JSX.Element;

interface RbacRole$1 {
    id: string;
    label: string;
    /** Optional ordering hint, e.g. -1 SUPERUSER → 6 EMPLOYEE */
    level?: number;
}
interface RbacArea {
    id: string;
    label: string;
}
type RbacPermissionLevel = 'none' | 'read' | 'write' | 'admin' | 'owner';
interface RbacAssignment {
    roleId: string;
    areaId: string;
    level: RbacPermissionLevel;
}
interface RbacMatrixProps {
    roles: RbacRole$1[];
    areas: RbacArea[];
    assignments: RbacAssignment[];
    /** Display-only mode (no onChange; no controls) */
    readonly?: boolean;
    onChange?: (assignment: RbacAssignment) => void;
    className?: string;
}
declare function RbacMatrix({ roles, areas, assignments, readonly, onChange, className, }: RbacMatrixProps): react_jsx_runtime.JSX.Element;

/**
 * HeuresysWordmark — canonical brand wordmark.
 *
 * Spec (Heuresys Brand Identity, L25 + L27):
 * - Lowercase "heuresys" (8 lettere)
 * - "y" highlighted in `var(--accent)`
 * - Body color depends on variant:
 *   • default: Inter 700, body in `var(--ink)` (μ-architect header)
 *   • brand:   Exo 2 700, body in `var(--brand-blue)` (login-aurora hero, marketing surfaces)
 *   • relative (L28): Inter 700, body in `var(--logo-body, var(--ink))` (themed surfaces)
 *
 * The "y" letter is wrapped in <span class="wm-y"> so consumers can tweak
 * via CSS if needed. Default styling is provided.
 */
type WordmarkVariant = 'default' | 'brand' | 'relative';
type WordmarkSize = 'sm' | 'md' | 'lg' | 'xl' | 'hero';
interface HeuresysWordmarkProps extends React$1.HTMLAttributes<HTMLSpanElement> {
    variant?: WordmarkVariant;
    size?: WordmarkSize | number;
    /**
     * Optional render-as. Defaults to "span". Use "h1" for hero contexts (login).
     */
    as?: 'span' | 'div' | 'h1' | 'h2' | 'p';
    /**
     * Optional aria-label override. Default: "heuresys".
     */
    'aria-label'?: string;
}
declare function HeuresysWordmark({ variant, size, as, className, style, 'aria-label': ariaLabel, ...rest }: HeuresysWordmarkProps): react_jsx_runtime.JSX.Element;

interface ESCOTreeNode {
    uri: string;
    code: string | null;
    label: string;
    iscoCode: string | null;
    hasChildren: boolean;
    parentUri: string | null;
}
interface ESCOTreeNavigatorProps {
    nodes: ESCOTreeNode[];
    /** Called when the user expands a parent for the first time. Resolves to its children. */
    onExpand?: (parentUri: string) => Promise<ESCOTreeNode[]>;
    onSelect?: (node: ESCOTreeNode) => void;
}
declare function ESCOTreeNavigator({ nodes, onExpand, onSelect }: ESCOTreeNavigatorProps): react_jsx_runtime.JSX.Element;

interface KGNode {
    id: string;
    label: string;
    group?: string;
}
interface KGEdge {
    id: string;
    source: string;
    target: string;
    label?: string;
}
interface KGGraphCanvasProps {
    nodes: KGNode[];
    edges: KGEdge[];
    emptyState?: string;
}
declare function KGGraphCanvas({ nodes, edges, emptyState }: KGGraphCanvasProps): react_jsx_runtime.JSX.Element;

type SAPJobStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled' | 'rolled_back';
interface SAPJobSummary {
    id: string;
    jobName: string;
    jobType: string;
    status: SAPJobStatus;
    progressPercent: number | null;
    totalRecords: number | null;
    successCount: number | null;
    errorCount: number | null;
    startedAt: string | null;
    completedAt: string | null;
}
interface SAPDeltaEntry {
    timestamp: string;
    kind: 'success' | 'error' | 'warning';
    count: number;
    message: string | null;
}
interface SAPSyncPanelProps {
    jobs: SAPJobSummary[];
    delta: SAPDeltaEntry[];
    emptyJobsLabel?: string;
}
declare function SAPSyncPanel({ jobs, delta, emptyJobsLabel }: SAPSyncPanelProps): react_jsx_runtime.JSX.Element;

/**
 * HeuresysMark — the symbol-only variant of the Heuresys wordmark.
 *
 * Renders just the lowercase "y" in `var(--accent)` (purple) at a square aspect
 * ratio. Used for: favicon source, collapsed sidebar, loading spinner center,
 * app icon. See `wordmark.tsx` for the full wordmark.
 *
 * Spec: docs/10_graphic_assets_and_icon_system.md § Default brand logo.
 */
interface HeuresysMarkProps extends React$1.SVGAttributes<SVGSVGElement> {
    size?: number;
    /** Override the "y" color. Defaults to `var(--accent)`. */
    color?: string;
}
declare function HeuresysMark({ size, color, className, ...rest }: HeuresysMarkProps): react_jsx_runtime.JSX.Element;

/**
 * HeuresysLogoBadge — the small uppercase suffix tag rendered next to the
 * Heuresys wordmark in product surfaces (e.g. "advanced", "beta", "enterprise").
 *
 * Bordered, uppercase, tracking-wider, `text-muted-foreground` so it stays
 * subordinate to the wordmark. Token-driven (`--border`, `--card`,
 * `--muted-foreground`) so palette/theme switches propagate.
 *
 * Source: extracted from apps/web/src/components/SystemHealthDashboard.tsx
 * per ADR-0013 R2.
 */
interface HeuresysLogoBadgeProps extends React$1.HTMLAttributes<HTMLSpanElement> {
    children: React$1.ReactNode;
}
declare function HeuresysLogoBadge({ children, className, ...rest }: HeuresysLogoBadgeProps): react_jsx_runtime.JSX.Element;

/**
 * StatusIcon — discriminated-tone wrapper for any lucide-react icon component.
 *
 * Maps a semantic `tone` to a token-driven foreground color
 * (`--muted-foreground`, `--info`, `--success`, `--warning`, `--danger`).
 * Use for status indicators, alerts, validation feedback. Per ADR-0008
 * (lucide outline) and ADR-0013 R2 (portability invariant).
 *
 * Source: ux-design/heuresys_uxix_brand_identity_bundle_v1/docs/10_graphic_assets_and_icon_system.md
 * § Status icon semantic tones.
 *
 * @example
 *   import { CheckCircle } from "lucide-react";
 *   <StatusIcon icon={CheckCircle} tone="success" />
 */
type StatusTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'disabled';
interface StatusIconProps {
    /** The lucide-react icon component to render (e.g. `CheckCircle`). */
    icon: React$1.ComponentType<{
        className?: string;
        size?: number;
    }>;
    /** Semantic tone. Default: "neutral". */
    tone?: StatusTone;
    /** Pixel size. Default: 20. */
    size?: number;
    className?: string;
}
declare function StatusIcon({ icon: Icon, tone, size, className, }: StatusIconProps): react_jsx_runtime.JSX.Element;

/**
 * DashboardShell — canonical 3-row grid (header 64px / content 1fr / footer 44px)
 * with inner 2-column grid for sidebar + main.
 *
 * Spec: docs/07_sidebar_specification.md § "State management".
 *
 * The middle row uses an inner grid with `data-shell="grid"` so the sidebar
 * client component can mutate `grid-template-columns` inline (with !important)
 * for collapse/expand. The initial inline style is set here to avoid FOUC and
 * to work around a Chrome quirk on `transition: grid-template-columns`.
 *
 * Children prop receives [<sidebar>, <main>] as JSX or you can supply slots.
 */
interface DashboardShellProps {
    header: React$1.ReactNode;
    sidebar: React$1.ReactNode;
    footer: React$1.ReactNode;
    children: React$1.ReactNode;
    /** Initial sidebar width in px. Default 260. */
    initialSidebarWidth?: number;
    className?: string;
}
declare function DashboardShell({ header, sidebar, footer, children, initialSidebarWidth, className, }: DashboardShellProps): react_jsx_runtime.JSX.Element;

/**
 * DashboardHeader — full composition.
 * Spec: docs/06_header_specification.md (extended).
 *
 * Slots:
 *   left:        hamburger | logo | breadcrumb
 *   middle:      command palette trigger (⌘K)
 *   right:       language | palette dropdown | theme toggle | user identity card
 *
 * All sub-elements are rendered by this component but can be overridden via
 * `leftExtras` and `rightExtras` slots (rendered after the default content).
 */
type HeaderBreadcrumb = ReadonlyArray<Readonly<{
    label: string;
    href?: string;
}>>;
interface UserIdentity {
    initials: string;
    username: string;
    role: string;
    /** Tailwind color token without the leading `text-` prefix. Default "warning". */
    roleTone?: string;
}
interface DashboardHeaderProps {
    breadcrumb?: HeaderBreadcrumb;
    user?: UserIdentity;
    language?: 'IT' | 'EN';
    onToggleLanguage?: () => void;
    onOpenMenu?: () => void;
    onOpenCommandPalette?: () => void;
    className?: string;
    /** Override the default wordmark logo with a custom node (e.g. the canonical
     *  two-color SVG inline used in the SUPERUSER prototype). */
    logo?: React$1.ReactNode;
    /** Optional trailing badge next to the logo (e.g. "advanced" product chip). */
    logoBadge?: React$1.ReactNode;
    leftExtras?: React$1.ReactNode;
    rightExtras?: React$1.ReactNode;
}
declare function DashboardHeader({ breadcrumb, user, language, onToggleLanguage, onOpenMenu, onOpenCommandPalette, className, logo, logoBadge, leftExtras, rightExtras, }: DashboardHeaderProps): react_jsx_runtime.JSX.Element;

/**
 * DashboardSidebar — collapsible side navigation.
 * Spec: docs/07_sidebar_specification.md.
 *
 * The sidebar consumes a `groups` prop (each group has id, label, optional
 * aux label, and a list of nav items). The collapse state lives on
 * `body[data-sidebar="collapsed"]` and is mirrored on the shell grid via
 * inline `style="grid-template-columns:..."` with !important (Chrome quirk).
 *
 * To embed custom content (e.g. DBSupervisorSidebar) inside a group, pass a
 * `customGroup` slot. To replace the footer card, pass `footerSlot`.
 */
interface NavItem {
    id: string;
    label: ReactNode;
    href: string;
    icon?: ReactNode;
    aux?: ReactNode;
    active?: boolean;
}
interface NavGroup {
    id: string;
    label: ReactNode;
    items?: ReadonlyArray<NavItem>;
    /** Render a custom <ul> body in place of `items` (e.g. DBSupervisorSidebar). */
    customContent?: ReactNode;
    /** Initial expanded state. Default true. */
    defaultExpanded?: boolean;
}
interface DashboardSidebarProps {
    groups: ReadonlyArray<NavGroup>;
    /** Optional override for the build-info card at the bottom. */
    footerSlot?: ReactNode;
    className?: string;
}
declare function DashboardSidebar({ groups, footerSlot, className }: DashboardSidebarProps): react_jsx_runtime.JSX.Element;

/**
 * DashboardFooter — universal footer rule.
 * Spec: docs/08_footer_specification.md.
 *
 * Left area is FIXED across every Heuresys surface: © year · heuresys.com ·
 * 5 outlined social icons in canonical order (LinkedIn → GitHub → Discord →
 * Facebook → X).
 *
 * Right area is context-specific: build info on system-health, env on tenant
 * dashboards, empty on login/landing. Pass via `rightSlot`.
 */
interface SocialLink {
    id: 'linkedin' | 'github' | 'discord' | 'facebook' | 'x';
    href: string;
    label: string;
}
interface DashboardFooterProps {
    rightSlot?: ReactNode;
    /** Override the canonical 5 socials. Order is preserved. */
    socials?: ReadonlyArray<SocialLink>;
    websiteHref?: string;
    className?: string;
}
declare function DashboardFooter({ rightSlot, socials, websiteHref, className, }: DashboardFooterProps): react_jsx_runtime.JSX.Element;

/**
 * Palette dropdown listbox — canonical implementation.
 * Spec: docs/06_header_specification.md § "Interactive specification — palette switcher".
 *
 * 4 ratified presets. Active palette HSL values written to `--palette-1..4`
 * on `<html>` via inline style. Selection persisted in localStorage.
 */
type PaletteIdx = 0 | 1 | 2 | 3;
type PalettePreset = {
    readonly name: string;
    readonly vars: readonly [string, string, string, string];
};
declare const PALETTES: readonly PalettePreset[];
declare function applyPalette(idx: PaletteIdx): void;
declare function PaletteDropdown(): react_jsx_runtime.JSX.Element;

type GroupToggleProps = Readonly<{
    groupId: string;
    label: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}>;
declare function GroupToggle({ groupId, label, children, className }: GroupToggleProps): react_jsx_runtime.JSX.Element;

/**
 * Persistent alert banner with CTAs.
 * Spec: docs/13_best_practices_for_modern_saas_ui.md § "Alert banners".
 *
 * Variants: warning (default) / danger / info / success.
 * Always includes ≥1 CTA; dismiss is optional.
 */
type AlertVariant = "warning" | "danger" | "info" | "success";
type AlertAction = Readonly<{
    label: string;
    onClick: () => void;
    variant?: "primary" | "ghost";
}>;
type AlertBannerProps = Readonly<{
    variant?: AlertVariant;
    icon?: ReactNode;
    title: ReactNode;
    meta?: ReactNode;
    details?: ReactNode;
    actions?: ReadonlyArray<AlertAction>;
    onDismiss?: () => void;
}>;
declare function AlertBanner({ variant, icon, title, meta, details, actions, onDismiss }: AlertBannerProps): react_jsx_runtime.JSX.Element;

/**
 * Data table with optional cross-hair affordance.
 * Spec: docs/13_best_practices_for_modern_saas_ui.md § "Table cross-hair pattern".
 *
 * When enableCrossHair=true, attaches mouseenter/leave handlers on every
 * <th> and <td> to highlight column + cell intersection. Row hover is
 * handled by global CSS rule on tbody tr:hover.
 *
 * For tables in @heuresys/ui consider data-table.tsx (TanStack) instead;
 * this component is for the brand bundle showcase / raw HTML scenarios.
 */
type DataTableWithCrossHairProps = Readonly<{
    caption?: ReactNode;
    enableCrossHair?: boolean;
    children: ReactNode;
    className?: string;
}>;
declare function DataTableWithCrossHair({ caption, enableCrossHair, children, className, }: DataTableWithCrossHairProps): react_jsx_runtime.JSX.Element;

/**
 * TimeRangeSelector — controlled pill row for dashboard time-range selection.
 *
 * Renders an inline radiogroup of options (default 15m / 1h / 24h / 7d / 30d).
 * Active option uses `--accent` background; inactive uses `--muted-foreground`
 * with hover transition. Token-driven so palette/theme switches propagate.
 *
 * Source: extracted from apps/web/src/components/SystemHealthDashboard.tsx
 * (lines 180-186 of pre-promotion commit) per ADR-0013 R2.
 *
 * @example
 *   const [range, setRange] = useState("24h");
 *   <TimeRangeSelector value={range} onChange={setRange} />
 */
interface TimeRangeOption {
    value: string;
    label: string;
}
interface TimeRangeSelectorProps {
    /** Available options. Default: 15m / 1h / 24h / 7d / 30d. */
    options?: TimeRangeOption[];
    /** Currently selected option value. */
    value: string;
    /** Called when user picks an option. */
    onChange?: (value: string) => void;
    className?: string;
    /** Accessible label for the radiogroup. */
    ariaLabel?: string;
}
declare function TimeRangeSelector({ options, value, onChange, className, ariaLabel, }: TimeRangeSelectorProps): react_jsx_runtime.JSX.Element;

/**
 * PageActions — Refresh + Export button pair rendered in dashboard page headers.
 *
 * Refresh: outlined secondary, hover lifts to accent. Export: solid primary
 * with download glyph. Both buttons are token-driven (`--border`, `--card`,
 * `--accent`, `--primary`, `--background`). Either action can be omitted.
 *
 * Source: extracted from apps/web/src/components/SystemHealthDashboard.tsx
 * (lines 188-212 of pre-promotion commit) per ADR-0013 R2.
 */
interface PageActionsProps {
    /** If provided, shows the Refresh button wired to this handler. */
    onRefresh?: () => void;
    /** If provided, shows the Export button wired to this handler. */
    onExport?: () => void;
    /** Refresh button label. Default: "Aggiorna". */
    refreshLabel?: string;
    /** Export button label. Default: "Export report". */
    exportLabel?: string;
    className?: string;
}
declare function PageActions({ onRefresh, onExport, refreshLabel, exportLabel, className, }: PageActionsProps): react_jsx_runtime.JSX.Element;

/**
 * KPI strip — 5-card horizontal grid with sparklines.
 * Spec: docs/16_system_health_admin_dashboard_patterns.md § 2.
 */
type KpiCardData = Readonly<{
    label: string;
    value: ReactNode;
    unit?: ReactNode;
    icon?: ReactNode;
    iconTone?: "success" | "warning" | "danger" | "info" | "palette-1" | "palette-2" | "palette-3" | "palette-4";
    sparkline?: ReadonlyArray<number>;
    sparklineTone?: "success" | "warning" | "danger" | "info" | "primary";
    footerLeft?: ReactNode;
    footerRight?: ReactNode;
    /** Replace the default sparkline/footer slot with a custom body. */
    body?: ReactNode;
}>;
type KPIStripProps = Readonly<{
    items: ReadonlyArray<KpiCardData>;
}>;
declare function KPIStrip({ items }: KPIStripProps): react_jsx_runtime.JSX.Element;
declare function KpiCard(props: KpiCardData): react_jsx_runtime.JSX.Element;

/**
 * Live log stream — tailing ol with .log-line items.
 * Spec: docs/16_system_health_admin_dashboard_patterns.md § 8.
 */
type LogLevel = "info" | "warn" | "error" | "debug" | "trace";
type LogEntry = Readonly<{
    timestamp: string;
    level: LogLevel;
    source: string;
    sourceTone?: "primary" | "palette-1" | "palette-2" | "palette-3" | "palette-4" | "success" | "warning" | "info" | "muted";
    message: ReactNode;
    meta?: ReactNode;
}>;
type LogStreamProps = Readonly<{
    entries: ReadonlyArray<LogEntry>;
    title?: string;
    sourceLabel?: string;
    activeFilter?: LogLevel | "all";
    totalCount?: number;
    windowLabel?: string;
    connected?: boolean;
    onFilterChange?: (level: LogLevel | "all") => void;
    onPauseToggle?: () => void;
    paused?: boolean;
}>;
declare function LogStream({ entries, title, sourceLabel, activeFilter, totalCount, windowLabel, connected, onFilterChange, onPauseToggle, paused }: LogStreamProps): react_jsx_runtime.JSX.Element;

/**
 * Audit feed — ul divide-y of icon-wrapped events.
 * Spec: docs/16_system_health_admin_dashboard_patterns.md § 9.
 */
type AuditTone = "success" | "warning" | "danger" | "info" | "palette-1" | "palette-2" | "palette-3";
type AuditEvent = Readonly<{
    icon: ReactNode;
    tone: AuditTone;
    title: ReactNode;
    description?: ReactNode;
    meta?: ReactNode;
}>;
type AuditFeedProps = Readonly<{
    events: ReadonlyArray<AuditEvent>;
    title?: string;
    subtitle?: string;
    onViewAll?: () => void;
}>;
declare function AuditFeed({ events, title, subtitle, onViewAll }: AuditFeedProps): react_jsx_runtime.JSX.Element;

/**
 * Incident timeline — ol space-y with vertical chain + ring dots.
 * Spec: docs/16_system_health_admin_dashboard_patterns.md § 5.
 */
type IncidentSeverity = "P1" | "P2" | "P3";
type IncidentStatus = "ACTIVE" | "RESOLVED" | "ACKNOWLEDGED";
type IncidentItem = Readonly<{
    severity: IncidentSeverity;
    status: IncidentStatus;
    title: ReactNode;
    description?: ReactNode;
    meta?: ReactNode;
}>;
type IncidentTimelineProps = Readonly<{
    items: ReadonlyArray<IncidentItem>;
    title?: string;
    subtitle?: string;
    counts?: {
        p1?: number;
        p2?: number;
        p3?: number;
    };
    onViewFullLog?: () => void;
}>;
declare function IncidentTimeline({ items, title, subtitle, counts, onViewFullLog }: IncidentTimelineProps): react_jsx_runtime.JSX.Element;

/**
 * SQL slow query top-N table.
 * Spec: docs/16_system_health_admin_dashboard_patterns.md § 6.
 */
type SqlSlowRow = Readonly<{
    rank: number;
    query: ReactNode;
    queryNote?: ReactNode;
    tenant: ReactNode;
    tenantTone?: "warning" | "palette-1" | "palette-2" | "palette-3" | "muted";
    calls: number;
    p95Ms: number;
    meanMs: number;
    totalTimeBarPct: number;
    totalTimeTone?: "danger" | "warning" | "palette-2";
    totalTimeLabel: ReactNode;
    lastSeen: ReactNode;
}>;
type SQLSlowQueryTableProps = Readonly<{
    rows: ReadonlyArray<SqlSlowRow>;
    totalTracked?: number;
    sampleSince?: string;
    totalCaptured?: string;
    onResetStats?: () => void;
    onOpenExplain?: (row: SqlSlowRow) => void;
}>;
declare function SQLSlowQueryTable({ rows, totalTracked, sampleSince, totalCaptured, onResetStats, onOpenExplain }: SQLSlowQueryTableProps): react_jsx_runtime.JSX.Element;

/**
 * RBAC permissions matrix — sticky first column + tri-state cells.
 * Spec: docs/16_system_health_admin_dashboard_patterns.md § 7.
 */
type RbacState = "granted" | "scoped" | "denied";
type RbacRole = Readonly<{
    code: string;
    tone: "warning" | "palette-1" | "palette-2" | "palette-3" | "muted-foreground";
    label?: string;
}>;
type RbacRow = Readonly<{
    permission: string;
    description: string;
    states: ReadonlyArray<RbacState>;
    scopeTitles?: ReadonlyArray<string | undefined>;
}>;
type RBACMatrixProps = Readonly<{
    roles: ReadonlyArray<RbacRole>;
    rows: ReadonlyArray<RbacRow>;
    lastReload?: string;
    totalMappings?: number;
    totalRoles?: number;
    totalPermissions?: number;
    onExportCsv?: () => void;
    onViewFull?: () => void;
}>;
declare function RBACMatrix({ roles, rows, lastReload, totalMappings, totalRoles, totalPermissions, onExportCsv, onViewFull }: RBACMatrixProps): react_jsx_runtime.JSX.Element;

/**
 * Tenant fleet table — cross-tenant operational status.
 * Spec: docs/16_system_health_admin_dashboard_patterns.md § 3.
 */
type TenantStatus = "healthy" | "degraded" | "down";
type TenantRow = Readonly<{
    code: string;
    initials: string;
    initialsTone: "palette-1" | "palette-2" | "palette-3" | "palette-4" | "warning";
    tenantId: string;
    status: TenantStatus;
    users: number;
    tables: number;
    errors1h: number;
    lastActivity: string;
    poolUtilPct: number;
}>;
type TenantFleetTableProps = Readonly<{
    rows: ReadonlyArray<TenantRow>;
    title?: string;
    subtitle?: string;
    onOpenDetail?: (row: TenantRow) => void;
    onSearch?: (query: string) => void;
    onOpenFilters?: () => void;
}>;
declare function TenantFleetTable({ rows, title, subtitle, onOpenDetail, onSearch, onOpenFilters, }: TenantFleetTableProps): react_jsx_runtime.JSX.Element;

/**
 * Error rate breakdown — stacked status bar + top erroring endpoints.
 * Spec: docs/16_system_health_admin_dashboard_patterns.md § 4.
 */
type StatusBucket = "2xx" | "3xx" | "4xx" | "5xx";
type EndpointRow = Readonly<{
    method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
    path: string;
    scope?: string;
    statusBadge: ReactNode;
    statusTone: "danger" | "warning" | "muted";
    sparkline: ReadonlyArray<number>;
    sparklineTone: "danger" | "warning" | "primary" | "muted";
    delta?: ReactNode;
    deltaTone?: "danger" | "warning" | "success" | "muted-foreground";
}>;
type ErrorRateBreakdownProps = Readonly<{
    overallRate: ReactNode;
    overallUnit?: ReactNode;
    overallDelta?: ReactNode;
    overallDeltaTone?: "warning" | "danger" | "success";
    totalRequests?: number;
    distribution: Readonly<Record<StatusBucket, number>>;
    endpoints: ReadonlyArray<EndpointRow>;
    onViewAll?: () => void;
}>;
declare function ErrorRateBreakdown({ overallRate, overallUnit, overallDelta, overallDeltaTone, totalRequests, distribution, endpoints, onViewAll }: ErrorRateBreakdownProps): react_jsx_runtime.JSX.Element;

/**
 * DB Supervisor sidebar entry — special palette-2 callout + sub-tree preview.
 * Spec: docs/07_sidebar_specification.md § "DB Supervisor sidebar entry — special variant"
 *       + docs/16_system_health_admin_dashboard_patterns.md § 11.
 *
 * Renders ONLY the <li> + sub-tree of the DB Supervisor entry. The enclosing
 * group toggle (collapse for "Database") is provided by the parent
 * <DashboardSidebar> group entry — passing this as `customContent` means
 * the outer group already has its toggle, so we must NOT wrap with another
 * GroupToggle here (that would create a nested duplicate toggle button).
 */
type DBSubItem = Readonly<{
    label: string;
    count: string;
}>;
declare const DB_SUBITEMS: ReadonlyArray<DBSubItem>;
declare function DBSupervisorSidebar(): react_jsx_runtime.JSX.Element;

/**
 * Heuresys table cross-hair helper.
 *
 * Source: ux-design/prototypes/superuser-system-health.html
 * Doctrine: docs/13_best_practices_for_modern_saas_ui.md +
 *           docs/16_system_health_admin_dashboard_patterns.md
 *
 * Attaches `mouseenter` / `mouseleave` handlers on every `<th>` (header)
 * and `<td>` (body cell) of the table so that hovering a cell highlights
 * its column and its column header. The row highlight is handled by
 * `tbody tr:hover` CSS rule globally (see hover-affordance.css).
 *
 * Returns an `unbind()` function for React useEffect cleanup.
 */
type CrossHairBindings = () => void;
declare function attachCrossHair(table: HTMLTableElement): CrossHairBindings;

export { AccessibilityPanel, Accordion, AccordionContent, AccordionItem, AccordionTrigger, AchievementBadge, type AchievementBadgeProps, ActivityFeed, type ActivityFeedItem, ActivityRing, type ActivityRingProps, Admonition, type AdmonitionVariant, type AlertAction, AlertBanner, type AlertBannerProps, type AlertVariant, AnimatedNumber, AppShell, type AppShellNavItem, type AppShellProps, AppSwitcher, type AppSwitcherApp, type AuditEvent, AuditFeed, type AuditFeedProps, type AuditTone, AuroraBackground, Avatar, AvatarFallback, AvatarGroup, AvatarImage, Badge, Banner, type BannerProps, BentoCell, type BentoCellProps, BentoGrid, type BentoGridProps, type BrandIdentity, type BreadcrumbItem, Breadcrumbs, Button, type ButtonProps, type CalendarEvent, CalendarGrid, CapabilityRadar, type CapabilityRadarAxis, type CapabilityRadarProps, type CapabilityRadarSeries, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CareerArc, type CareerArcProps, type CareerStage, type CareerStageStatus, Center, type ChatMessage, ChatProvider, type ChatProviderAdapter, type ChatRole, Chatbot, Checkbox, Cluster, type ColorModes, type ColorSystem, CommandPalette, type Comment, CommentThread, ConfettiButton, Cover, type CrossHairBindings, type DBSubItem, DBSupervisorSidebar, DB_SUBITEMS, DEFAULT_THEME_STATE, DashboardFooter, type DashboardFooterProps, DashboardHeader, type DashboardHeaderProps, type RbacRole as DashboardRbacRole, DashboardShell, type DashboardShellProps, DashboardSidebar, type DashboardSidebarProps, DataTable, type DataTableProps, DataTableWithCrossHair, type DataTableWithCrossHairProps, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, type DiffLine, DiffViewer, DotGrid, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EChartsCard, type EChartsCardProps, ESCOTreeNavigator, type ESCOTreeNavigatorProps, type ESCOTreeNode, type EffectsConfig, EmptyState, type EmptyStateProps, type EndpointRow, ErrorRateBreakdown, type ErrorRateBreakdownProps, ErrorState, type ErrorStateProps, FAB, type FABProps, FadeIn, FileDropzone, type FileDropzoneProps, FilterBar, type FilterBarProps, type FilterChip, FormWizard, type FormWizardProps, type FormWizardStep, Frame, type GalleryImage, GlassCard, type GlassCardProps, GradientText, Grid, GroupToggle, type GroupToggleProps, type HeaderBreadcrumb, HeroCentered, HeroSplit, HeroVideoBackground, HeuresysLogoBadge, type HeuresysLogoBadgeProps, HeuresysMark, type HeuresysMarkProps, HeuresysWordmark, type HeuresysWordmarkProps, IbanInput, type IconographyConfig, ImageGallery, type IncidentItem, type IncidentSeverity, type IncidentStatus, IncidentTimeline, type IncidentTimelineProps, Input, type InputProps, IntegrationHealthPill, type IntegrationHealthPillProps, type IntegrationHealthTone, JsonTree, type KGEdge, KGGraphCanvas, type KGGraphCanvasProps, type KGNode, KPIStrip, type KPIStripProps, KanbanBoard, type KanbanCard, type KanbanColumn, KeyboardShortcutsModal, KgMiniGraph, type KgMiniGraphLegendItem, type KgMiniGraphProps, KpiCard, type KpiCardData, KpiRing, type KpiRingProps, type KpiRingThresholds, type KpiRingTone, LanguagePicker, LinearGauge, type LinearGaugeProps, LiveRegionProvider, type LogEntry, type LogLevel, LogStream, type LogStreamProps, LottiePlayer, type LottiePlayerProps, MarkdownView, Marquee, MegaMenu, type MegaMenuColumn, type MegaMenuTrigger, MermaidDiagram, MeshGradient, MobileBottomNav, type MobileNavItem, MoneyInput, type MoneyInputProps, type MotionConfig, type NavGroup, type NavItem, NetworkGraph, type NetworkGraphProps, NeumorphicCard, type NeumorphicCardProps, NoiseOverlay, type Notification, NotificationCenter, type OKLCH, OnboardingTour, OtpInput, type OtpInputProps, PALETTES, PageActions, type PageActionsProps, PageHeader, type PageHeaderProps, Pagination, type PaginationProps, PaletteDropdown, type PaletteIdx, type PalettePreset, PasswordStrengthMeter, PerfMonitor, PhoneInputField, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, QRCodeView, RBACMatrix, type RBACMatrixProps, RadialGauge, type RadialGaugeProps, type RbacArea, type RbacAssignment, RbacMatrix, type RbacMatrixProps, type RbacPermissionLevel, type RbacRole$1 as RbacRole, type RbacRow, type RbacState, type SAPDeltaEntry, type SAPJobStatus, type SAPJobSummary, SAPSyncPanel, type SAPSyncPanelProps, SQLSlowQueryTable, type SQLSlowQueryTableProps, STARTER_PRESETS, SUPPORTED_LOCALES, ScaleIn, type ShortcutGroup, SignaturePadField, type SignaturePadFieldProps, Skeleton, SkillHeatmap, type SkillHeatmapAxis, type SkillHeatmapCell, type SkillHeatmapProps, SkipLink, SlideIn, type SocialLink, type SpacingLayout, Sparkline, type SparklineProps, Spinner, type SqlSlowRow, Stack, StaggerChildren, StaggerItem, StatsCard, type StatsCardProps, type StatusBucket, StatusIcon, type StatusIconProps, type StatusTone, Stepper, type StepperProps, type StepperStep, SuccessionCard, type SuccessionCardProps, type SuccessionReadiness, type SuccessionRisk, Switch, Switcher, type TabItem, TableOfContents, Tabs, TabsContent, TabsList, TabsOverflow, TabsTrigger, TaxIdInput, type TenantRow as TenantFleetRow, TenantFleetTable, type TenantFleetTableProps, type TenantRow, type TenantStatus, type ThemeBuilderState, ThemeBuilderWizard, type ThemePreset, ThemeProvider, ThemeToggle, ThreeScene, TiltCard, type TimeRangeOption, TimeRangeSelector, type TimeRangeSelectorProps, Timeline, type TimelineEvent, Toast, ToastAction, ToastClose, ToastDescription, type ToastProps, ToastProvider, ToastTitle, ToastViewport, type TocItem, type ToolCall, ToolCallView, type ToolResult, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, type TourStep, Typewriter, type Typography as TypographyConfig, type UserIdentity, type VideoCaption, type VideoChapter, VideoPlayer, type VideoPlayerProps, VoiceInput, WinLossSparkline, type WordmarkSize, type WordmarkVariant, applyPalette, attachCrossHair, badgeVariants, buttonVariants, cn, downloadAsFile, echartsPresets, exportCSV, exportExcel, exportFigmaTokens, exportTailwindConfig, exportThemeProvider, exportTokensCss, exportTokensJson, findPreset, formatCurrency, formatDate, formatDateTime, formatList, formatNumber, formatPercent, formatRelativeTime, oklch, buildScale as oklchBuildScale, contrastRatio as oklchContrast, harmony as oklchHarmony, luminance as oklchLuminance, simulateColorBlind as oklchSimulateColorBlind, toCss as oklchToCss, toHex as oklchToHex, toRgb as oklchToRgb, parseCSV, parseExcel, parseJSON, parseTOML, parseXML, toastVariants, useAnnounce, useChat, useConfetti, useGlobalCmdK, useShortcutsModal, useTheme };
