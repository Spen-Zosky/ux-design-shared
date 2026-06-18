import * as React53 from 'react';
import { useState, useMemo, useRef, useEffect } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { X, ChevronRight, Check, Circle, ChevronDown, Plus, Search, Moon, Sun, Monitor, ChevronUp, SlidersHorizontal, Menu, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronsRight, Grip, Download, RefreshCw, TrendingUp, TrendingDown, Minus, Bell, Award, Info, AlertCircle, AlertTriangle, CheckCircle2, Upload, FileText, GripVertical, Heart, Smile, Reply, Pause, Play, VolumeX, Volume2, Maximize2, Quote, BookOpen, Lightbulb, Wrench, Trash, Square, Send, MicOff, Mic, Globe, Accessibility, Activity } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { motion } from 'framer-motion';
import { Command } from 'cmdk';
import { useReactTable, getPaginationRowModel, getFilteredRowModel, getSortedRowModel, getCoreRowModel, flexRender } from '@tanstack/react-table';
import confettiLib from 'canvas-confetti';
import Lottie from 'lottie-react';
import ReactECharts from 'echarts-for-react';
import CytoscapeComponent from 'react-cytoscapejs';
import { PhoneInput } from 'react-international-phone';
import zxcvbn from 'zxcvbn';
import SignaturePadLib from 'react-signature-canvas';
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCorners } from '@dnd-kit/core';
import { sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import QRCode from 'qrcode';
import Papa from 'papaparse';
import ExcelJS from 'exceljs';
import TOML from '@iarna/toml';
import { XMLParser } from 'fast-xml-parser';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import mermaid from 'mermaid';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// src/components/Button.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-fg hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-fg hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline"
      },
      // AAA touch targets WCAG 2.5.5 Enhanced (≥ 44×44 CSS px) — S28 H10
      size: {
        sm: "h-11 px-3 text-sm",
        md: "h-11 px-4",
        lg: "h-12 px-6 text-base",
        icon: "h-11 w-11"
      }
    },
    defaultVariants: { variant: "default", size: "md" }
  }
);
var Button = React53.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { ref, className: cn(buttonVariants({ variant, size, className })), ...props });
  }
);
Button.displayName = "Button";
var Card = React53.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("rounded-lg border border-border bg-card text-card-foreground shadow-sm", className),
      ...props
    }
  )
);
Card.displayName = "Card";
var CardHeader = React53.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col gap-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
var CardTitle = React53.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", { ref, className: cn("text-lg font-semibold leading-none tracking-tight", className), ...props })
);
CardTitle.displayName = "CardTitle";
var CardDescription = React53.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
var CardContent = React53.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
var CardFooter = React53.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
var inputVariants = cva(
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-primary",
        error: "border-destructive focus-visible:ring-destructive"
      },
      inputSize: {
        sm: "h-11 text-sm",
        md: "h-11",
        lg: "h-12 text-base"
      }
    },
    defaultVariants: { variant: "default", inputSize: "md" }
  }
);
var inputIdCounter = 0;
var Input = React53.forwardRef(
  ({
    className,
    variant,
    inputSize,
    type = "text",
    label,
    helperText,
    errorText,
    containerClassName,
    id: providedId,
    ...props
  }, ref) => {
    const generatedId = React53.useId ? React53.useId() : `heur-input-${++inputIdCounter}`;
    const id = providedId ?? generatedId;
    const helperId = helperText || errorText ? `${id}-helper` : void 0;
    const effectiveVariant = errorText ? "error" : variant;
    const inputEl = /* @__PURE__ */ jsx(
      "input",
      {
        ref,
        id,
        type,
        "aria-invalid": errorText ? "true" : void 0,
        "aria-describedby": helperId,
        className: cn(inputVariants({ variant: effectiveVariant, inputSize, className })),
        ...props
      }
    );
    if (!label && !helperText && !errorText) return inputEl;
    return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-1", containerClassName), children: [
      label ? /* @__PURE__ */ jsx("label", { htmlFor: id, className: "text-sm font-medium text-foreground", children: label }) : null,
      inputEl,
      errorText ? /* @__PURE__ */ jsx("p", { id: helperId, className: "text-xs text-destructive", role: "alert", children: errorText }) : helperText ? /* @__PURE__ */ jsx("p", { id: helperId, className: "text-xs text-muted-foreground", children: helperText }) : null
    ] });
  }
);
Input.displayName = "Input";
var ToastProvider = ToastPrimitive.Provider;
var ToastViewport = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitive.Viewport,
  {
    ref,
    className: cn(
      "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;
var toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground",
        destructive: "border-destructive bg-destructive text-destructive-fg"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var Toast = React53.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitive.Root,
  {
    ref,
    className: cn(toastVariants({ variant }), className),
    ...props
  }
));
Toast.displayName = ToastPrimitive.Root.displayName;
var ToastTitle = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitive.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitive.Title.displayName;
var ToastDescription = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitive.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitive.Description.displayName;
var ToastClose = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitive.Close,
  {
    ref,
    className: cn("absolute right-2 top-2 rounded-md p-1 opacity-60 hover:opacity-100", className),
    "toast-close": "",
    ...props,
    children: "\xD7"
  }
));
ToastClose.displayName = ToastPrimitive.Close.displayName;
var ToastAction = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitive.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitive.Action.displayName;
var ThemeContext = React53.createContext(null);
var STORAGE_KEY = "heuresys-theme";
function resolveTheme(theme) {
  if (theme === "system") {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}
function applyTheme(resolved) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (resolved === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  root.style.colorScheme = resolved;
}
function ThemeProvider({
  children,
  defaultTheme = "system"
}) {
  const [theme, setThemeState] = React53.useState(() => {
    if (typeof window === "undefined") return defaultTheme;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ?? defaultTheme;
  });
  const [resolved, setResolved] = React53.useState(() => resolveTheme(theme));
  React53.useEffect(() => {
    const next = resolveTheme(theme);
    setResolved(next);
    applyTheme(next);
  }, [theme]);
  React53.useEffect(() => {
    if (theme !== "system" || typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const next = mql.matches ? "dark" : "light";
      setResolved(next);
      applyTheme(next);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme]);
  const setTheme = React53.useCallback((t) => {
    setThemeState(t);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, t);
  }, []);
  const value = React53.useMemo(() => ({ theme, resolved, setTheme }), [theme, resolved, setTheme]);
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value, children });
}
function useTheme() {
  const ctx = React53.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
var order = ["light", "dark", "system"];
function ThemeToggle({ className }) {
  const { theme, setTheme } = useTheme();
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  function cycle() {
    const idx = order.indexOf(theme);
    setTheme(order[(idx + 1) % order.length]);
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      "aria-label": `Theme: ${theme}. Click to cycle.`,
      onClick: cycle,
      className: cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      ),
      children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4", "aria-hidden": "true" })
    }
  );
}
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogClose = DialogPrimitive.Close;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-overlay/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React53.forwardRef(({ className, children, showCloseButton = true, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg rounded-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
        className
      ),
      ...props,
      children: [
        children,
        showCloseButton ? /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] }) : null
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col gap-1.5 text-center sm:text-left", className), ...props });
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
      ...props
    }
  );
}
var DialogTitle = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-fg", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
var DropdownMenu = Dropdown.Root;
var DropdownMenuTrigger = Dropdown.Trigger;
var DropdownMenuGroup = Dropdown.Group;
var DropdownMenuSub = Dropdown.Sub;
var DropdownMenuRadioGroup = Dropdown.RadioGroup;
var DropdownMenuSubTrigger = React53.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  Dropdown.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4", "aria-hidden": "true" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = Dropdown.SubTrigger.displayName;
var DropdownMenuSubContent = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Dropdown.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background p-1 text-foreground shadow-lg",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = Dropdown.SubContent.displayName;
var DropdownMenuContent = React53.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(Dropdown.Portal, { children: /* @__PURE__ */ jsx(
  Dropdown.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background p-1 text-foreground shadow-md",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Dropdown.Content.displayName;
var DropdownMenuItem = React53.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  Dropdown.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Dropdown.Item.displayName;
var DropdownMenuCheckboxItem = React53.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  Dropdown.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(Dropdown.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = Dropdown.CheckboxItem.displayName;
var DropdownMenuRadioItem = React53.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  Dropdown.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(Dropdown.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = Dropdown.RadioItem.displayName;
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Dropdown.Label,
    {
      className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
      ...props
    }
  );
}
var DropdownMenuSeparator = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Dropdown.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-border", className), ...props }));
DropdownMenuSeparator.displayName = Dropdown.Separator.displayName;
function DropdownMenuShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx("span", { className: cn("ml-auto text-xs tracking-widest opacity-60", className), ...props });
}
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverAnchor = PopoverPrimitive.Anchor;
var PopoverContent = React53.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border border-border bg-background p-4 text-foreground shadow-md outline-none",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React53.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground shadow-md",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
var Tabs = TabsPrimitive.Root;
var TabsList = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-fg",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
var Accordion = AccordionPrimitive.Root;
var AccordionItem = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("border-b border-border", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React53.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(
        ChevronDown,
        {
          className: "h-4 w-4 shrink-0 transition-transform duration-200",
          "aria-hidden": "true"
        }
      )
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React53.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
var Checkbox = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-fg",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4", "aria-hidden": "true" }) })
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
var Switch = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitive.Root,
  {
    ref,
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitive.Thumb,
      {
        className: cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitive.Root.displayName;
var Avatar = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
var AvatarImage = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
function AvatarGroup({
  children,
  max = 5,
  className
}) {
  const arr = React53.Children.toArray(children);
  const visible = arr.slice(0, max);
  const overflow = arr.length - visible.length;
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center -space-x-2", className), children: [
    visible,
    overflow > 0 ? /* @__PURE__ */ jsxs("div", { className: "relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-medium ring-2 ring-background", children: [
      "+",
      overflow
    ] }) : null
  ] });
}
var badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-fg",
        secondary: "border-transparent bg-secondary text-secondary-fg",
        destructive: "border-transparent bg-destructive text-destructive-fg",
        success: "border-transparent bg-success text-success-fg",
        warning: "border-transparent bg-warning text-warning-fg",
        outline: "border-border text-foreground"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "status",
      "aria-label": "Loading",
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...props
    }
  );
}
function Spinner({ className }) {
  return /* @__PURE__ */ jsxs("div", { role: "status", "aria-label": "Loading", children: [
    /* @__PURE__ */ jsxs(
      "svg",
      {
        className: cn("h-5 w-5 animate-spin text-muted-fg", className),
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeOpacity: "0.25", strokeWidth: "4" }),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M22 12a10 10 0 0 1-10 10",
              stroke: "currentColor",
              strokeWidth: "4",
              strokeLinecap: "round"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Loading" })
  ] });
}
function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "status",
      className: cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 p-10 text-center",
        className
      ),
      ...props,
      children: [
        icon ? /* @__PURE__ */ jsx("div", { className: "text-muted-fg", children: icon }) : null,
        /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: title }),
        description ? /* @__PURE__ */ jsx("p", { className: "max-w-prose text-sm text-muted-fg", children: description }) : null,
        action ? /* @__PURE__ */ jsx("div", { className: "mt-2", children: action }) : null
      ]
    }
  );
}
function ErrorState({ title = "Something went wrong", ...rest }) {
  return /* @__PURE__ */ jsx(EmptyState, { title, ...rest });
}
function Polymorphic({ as: Tag = "div", ...rest }) {
  return /* @__PURE__ */ jsx(Tag, { ...rest });
}
function Stack({
  className,
  gap = "md",
  ...props
}) {
  const map = { xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" };
  return /* @__PURE__ */ jsx(Polymorphic, { className: cn("flex flex-col", map[gap], className), ...props });
}
function Cluster({
  className,
  gap = "md",
  align = "center",
  justify = "start",
  ...props
}) {
  const gapMap = { xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" };
  const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch"
  };
  const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around"
  };
  return /* @__PURE__ */ jsx(
    Polymorphic,
    {
      className: cn("flex flex-wrap", gapMap[gap], alignMap[align], justifyMap[justify], className),
      ...props
    }
  );
}
function Center({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Polymorphic,
    {
      className: cn("flex min-h-full items-center justify-center", className),
      ...props
    }
  );
}
function Cover({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Polymorphic,
    {
      className: cn(
        "flex min-h-screen flex-col [&>*]:my-auto [&>:first-child]:mt-0 [&>:last-child]:mb-0",
        className
      ),
      ...props
    }
  );
}
function Frame({
  className,
  ratio = "16/9",
  ...props
}) {
  const ratioMap = {
    "1/1": "aspect-square",
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-video",
    "21/9": "aspect-[21/9]",
    "3/4": "aspect-[3/4]"
  };
  return /* @__PURE__ */ jsx(Polymorphic, { className: cn("overflow-hidden", ratioMap[ratio], className), ...props });
}
function Grid({
  className,
  cols = "auto",
  gap = "md",
  ...props
}) {
  const colsMap = {
    auto: "grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))]",
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    6: "grid-cols-6",
    12: "grid-cols-12"
  };
  const gapMap = { xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" };
  return /* @__PURE__ */ jsx(Polymorphic, { className: cn("grid", colsMap[cols], gapMap[gap], className), ...props });
}
function Switcher({
  className,
  threshold = "30rem",
  gap = "md",
  ...props
}) {
  const gapMap = { xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" };
  return /* @__PURE__ */ jsx(
    Polymorphic,
    {
      style: {
        ["--threshold"]: threshold,
        ["display"]: "flex",
        ["flexWrap"]: "wrap"
      },
      className: cn(
        gapMap[gap],
        "[&>*]:flex-1 [&>*]:min-w-[min(var(--threshold),100%)]",
        className
      ),
      ...props
    }
  );
}
var FadeIn = ({
  children,
  delay = 0,
  ...rest
}) => /* @__PURE__ */ jsx(
  motion.div,
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: "easeOut", delay },
    ...rest,
    children
  }
);
var SlideIn = ({ children, from = "bottom", delay = 0, ...rest }) => {
  const offset = 12;
  const initial = from === "top" ? { opacity: 0, y: -offset } : from === "bottom" ? { opacity: 0, y: offset } : from === "left" ? { opacity: 0, x: -offset } : { opacity: 0, x: offset };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial,
      animate: { opacity: 1, x: 0, y: 0 },
      transition: { duration: 0.24, ease: "easeOut", delay },
      ...rest,
      children
    }
  );
};
var ScaleIn = ({
  children,
  delay = 0,
  ...rest
}) => /* @__PURE__ */ jsx(
  motion.div,
  {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.2, ease: "easeOut", delay },
    ...rest,
    children
  }
);
var StaggerChildren = ({ children, delay = 0, stagger = 0.06, ...rest }) => /* @__PURE__ */ jsx(
  motion.div,
  {
    initial: "hidden",
    animate: "visible",
    variants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { delayChildren: delay, staggerChildren: stagger }
      }
    },
    ...rest,
    children
  }
);
var StaggerItem = ({ children, ...rest }) => /* @__PURE__ */ jsx(
  motion.div,
  {
    variants: {
      hidden: { opacity: 0, y: 8 },
      visible: { opacity: 1, y: 0 }
    },
    ...rest,
    children
  }
);
function useGlobalCmdK(callback) {
  React53.useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        callback();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [callback]);
}
function CommandPaletteRoot({
  open,
  onOpenChange,
  placeholder = "Type a command or search\u2026",
  empty = "No results.",
  children
}) {
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsx(DialogContent, { className: "overflow-hidden p-0", showCloseButton: false, children: /* @__PURE__ */ jsxs(Command, { className: "rounded-lg border-none", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b border-border px-3", children: [
      /* @__PURE__ */ jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx(
        Command.Input,
        {
          placeholder,
          className: "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-fg disabled:cursor-not-allowed disabled:opacity-50"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Command.List, { className: "max-h-[300px] overflow-y-auto overflow-x-hidden", children: [
      /* @__PURE__ */ jsx(Command.Empty, { className: "py-6 text-center text-sm text-muted-fg", children: empty }),
      children
    ] })
  ] }) }) });
}
var CommandPaletteGroup = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-fg",
      className
    ),
    ...props
  }
));
CommandPaletteGroup.displayName = "CommandPaletteGroup";
var CommandPaletteItem = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command.Item,
  {
    ref,
    className: cn(
      'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[selected="true"]:bg-accent',
      className
    ),
    ...props
  }
));
CommandPaletteItem.displayName = "CommandPaletteItem";
var CommandPalette = Object.assign(CommandPaletteRoot, {
  Group: CommandPaletteGroup,
  Item: CommandPaletteItem,
  Separator: Command.Separator
});
function DataTable({
  columns,
  data,
  className,
  caption,
  emptyMessage = "No rows.",
  pageSize = 10
}) {
  const [sorting, setSorting] = React53.useState([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } }
  });
  return /* @__PURE__ */ jsxs("div", { className: cn("w-full", className), children: [
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-md border border-border", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      caption ? /* @__PURE__ */ jsx("caption", { className: "sr-only", children: caption }) : null,
      /* @__PURE__ */ jsx("thead", { className: "bg-muted/50", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { className: "border-b border-border", children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(
        "th",
        {
          scope: "col",
          className: "h-10 px-3 text-left font-medium text-muted-fg",
          children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: header.column.getToggleSortingHandler(),
              className: "inline-flex items-center gap-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
              "aria-sort": header.column.getIsSorted() === "asc" ? "ascending" : header.column.getIsSorted() === "desc" ? "descending" : "none",
              children: [
                flexRender(header.column.columnDef.header, header.getContext()),
                header.column.getIsSorted() === "asc" ? /* @__PURE__ */ jsx(ChevronUp, { className: "h-3 w-3", "aria-hidden": "true" }) : header.column.getIsSorted() === "desc" ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3", "aria-hidden": "true" }) : null
              ]
            }
          )
        },
        header.id
      )) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx("tbody", { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        "tr",
        {
          className: "border-b border-border last:border-0 hover:bg-muted/30",
          "data-state": row.getIsSelected() ? "selected" : void 0,
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: columns.length, className: "h-24 text-center text-muted-fg", children: emptyMessage }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(DataTablePagination, { table })
  ] });
}
function DataTablePagination({ table }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 py-3 text-sm", children: [
    /* @__PURE__ */ jsxs("span", { className: "text-muted-fg", children: [
      "Page ",
      table.getState().pagination.pageIndex + 1,
      " of ",
      Math.max(table.getPageCount(), 1)
    ] }),
    /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: "outline",
        onClick: () => table.previousPage(),
        disabled: !table.getCanPreviousPage(),
        children: "Previous"
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: "outline",
        onClick: () => table.nextPage(),
        disabled: !table.getCanNextPage(),
        children: "Next"
      }
    )
  ] });
}
function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  badges,
  divider = true,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: cn("flex flex-col gap-3 pb-6", divider && "border-b border-border", className),
      ...props,
      children: [
        breadcrumbs ? /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-fg", children: breadcrumbs }) : null,
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight text-foreground", children: title }),
              badges
            ] }),
            description ? /* @__PURE__ */ jsx("p", { className: "max-w-prose text-sm text-muted-fg", children: description }) : null
          ] }),
          actions ? /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-2", children: actions }) : null
        ] })
      ]
    }
  );
}
function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search\u2026",
  chips = [],
  onClearAll,
  filtersSlot,
  rightSlot,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col gap-3 rounded-md border border-border bg-background p-3",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx(
              Search,
              {
                className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-fg",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: searchValue ?? "",
                onChange: (e) => onSearchChange?.(e.target.value),
                placeholder: searchPlaceholder,
                className: "pl-9",
                "aria-label": "Search"
              }
            )
          ] }),
          filtersSlot ? /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: filtersSlot }) : null,
          rightSlot ? /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-2", children: rightSlot }) : null
        ] }),
        chips.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-4 w-4 text-muted-fg", "aria-hidden": "true" }),
          chips.map((c) => /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "gap-1 pr-1", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xs", children: [
              c.label,
              ": ",
              c.value
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: c.onRemove,
                "aria-label": `Remove filter ${c.label}`,
                className: "rounded-full p-0.5 hover:bg-muted",
                children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3", "aria-hidden": "true" })
              }
            )
          ] }, c.id)),
          onClearAll && chips.length > 1 ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: onClearAll, children: "Clear all" }) : null
        ] }) : null
      ]
    }
  );
}
function AppShell({
  brand,
  nav,
  topbarLeft,
  topbarRight,
  children,
  collapsedDefault = false,
  className
}) {
  const [collapsed, setCollapsed] = React53.useState(collapsedDefault);
  const [mobileOpen, setMobileOpen] = React53.useState(false);
  return /* @__PURE__ */ jsxs("div", { className: cn("flex min-h-screen bg-background text-foreground", className), children: [
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: cn(
          "flex flex-col border-r border-border bg-muted/30 transition-all max-md:hidden",
          collapsed ? "w-16" : "w-64"
        ),
        "aria-label": "Primary navigation",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex h-14 items-center border-b border-border px-3", children: [
            !collapsed ? /* @__PURE__ */ jsx("div", { className: "flex-1 truncate text-sm font-semibold", children: brand }) : null,
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "icon",
                variant: "ghost",
                onClick: () => setCollapsed((c) => !c),
                "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
                "aria-expanded": !collapsed,
                children: /* @__PURE__ */ jsx(Menu, { className: "h-4 w-4", "aria-hidden": "true" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "flex-1 overflow-y-auto p-2", children: /* @__PURE__ */ jsx(NavList, { items: nav, collapsed }) })
        ]
      }
    ),
    mobileOpen ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Close navigation",
          className: "fixed inset-0 z-40 bg-overlay/50 md:hidden",
          onClick: () => setMobileOpen(false)
        }
      ),
      /* @__PURE__ */ jsxs(
        "aside",
        {
          className: "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-background md:hidden",
          "aria-label": "Primary navigation (mobile)",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex h-14 items-center justify-between border-b border-border px-3", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: brand }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  onClick: () => setMobileOpen(false),
                  "aria-label": "Close",
                  children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4", "aria-hidden": "true" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("nav", { className: "flex-1 overflow-y-auto p-2", children: /* @__PURE__ */ jsx(NavList, { items: nav, collapsed: false }) })
          ]
        }
      )
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex h-14 items-center gap-2 border-b border-border bg-background px-4", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "icon",
            variant: "ghost",
            className: "md:hidden",
            onClick: () => setMobileOpen(true),
            "aria-label": "Open navigation",
            children: /* @__PURE__ */ jsx(Menu, { className: "h-4 w-4", "aria-hidden": "true" })
          }
        ),
        topbarLeft,
        /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-2", children: topbarRight })
      ] }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-x-hidden p-4 md:p-6", children })
    ] })
  ] });
}
function NavList({ items, collapsed }) {
  return /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-0.5", children: items.map((it) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavItemRow, { item: it, collapsed }) }, it.id)) });
}
function NavItemRow({ item, collapsed }) {
  const [open, setOpen] = React53.useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const Tag = item.href ? "a" : "button";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Tag,
      {
        type: Tag === "button" ? "button" : void 0,
        href: item.href,
        onClick: (e) => {
          if (hasChildren) {
            e.preventDefault();
            setOpen((o) => !o);
          } else {
            item.onClick?.();
          }
        },
        "aria-current": item.active ? "page" : void 0,
        "aria-expanded": hasChildren ? open : void 0,
        className: cn(
          "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
          item.active ? "bg-primary/10 font-medium text-primary" : "text-foreground hover:bg-accent"
        ),
        title: collapsed ? item.label : void 0,
        children: [
          item.icon ? /* @__PURE__ */ jsx("span", { className: "shrink-0", children: item.icon }) : null,
          !collapsed ? /* @__PURE__ */ jsx("span", { className: "flex-1 truncate text-left", children: item.label }) : null,
          !collapsed && item.badge ? item.badge : null
        ]
      }
    ),
    hasChildren && open && !collapsed ? /* @__PURE__ */ jsx("ul", { className: "ml-6 mt-0.5 flex flex-col gap-0.5", children: item.children.map((c) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavItemRow, { item: c, collapsed: false }) }, c.id)) }) : null
  ] });
}
function BentoGrid({
  columns = 12,
  rowHeight = "minmax(120px, auto)",
  gap = "md",
  className,
  style,
  ...props
}) {
  const gapMap = { sm: "0.5rem", md: "1rem", lg: "1.5rem" };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("grid", className),
      style: {
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridAutoRows: rowHeight,
        gap: gapMap[gap],
        ...style
      },
      ...props
    }
  );
}
function BentoCell({
  colSpan = 1,
  rowSpan = 1,
  colSpanMd,
  rowSpanMd,
  className,
  style,
  ...props
}) {
  const spanStyle = {
    gridColumn: `span ${colSpan} / span ${colSpan}`,
    gridRow: `span ${rowSpan} / span ${rowSpan}`,
    ...style
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "rounded-lg border border-border bg-background p-4",
        colSpanMd && `md:[grid-column:span_${colSpanMd}]`,
        rowSpanMd && `md:[grid-row:span_${rowSpanMd}]`,
        className
      ),
      style: spanStyle,
      ...props
    }
  );
}
function Breadcrumbs({
  items,
  maxItems = 5,
  separator = /* @__PURE__ */ jsx(ChevronRight, { className: "h-3.5 w-3.5 text-muted-fg", "aria-hidden": "true" }),
  className
}) {
  let visible = items;
  let collapsed = [];
  if (items.length > maxItems) {
    visible = [items[0], ...items.slice(items.length - (maxItems - 2))];
    collapsed = items.slice(1, items.length - (maxItems - 2));
  }
  return /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: cn("flex items-center text-sm", className), children: /* @__PURE__ */ jsx("ol", { className: "flex flex-wrap items-center gap-1.5", children: visible.map((it, idx) => {
    const isCollapseSlot = idx === 1 && collapsed.length > 0;
    const isLast = idx === visible.length - 1;
    return /* @__PURE__ */ jsxs(React53.Fragment, { children: [
      idx > 0 ? /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: separator }) : null,
      isCollapseSlot ? /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(CollapsedItems, { items: collapsed }) }) : null,
      isCollapseSlot ? /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: separator }) : null,
      /* @__PURE__ */ jsx("li", { children: isLast || !it.href && !it.onClick ? /* @__PURE__ */ jsx(
        "span",
        {
          "aria-current": isLast ? "page" : void 0,
          className: "font-medium text-foreground",
          children: it.label
        }
      ) : /* @__PURE__ */ jsx(
        "a",
        {
          href: it.href,
          onClick: (e) => {
            if (it.onClick) {
              e.preventDefault();
              it.onClick();
            }
          },
          className: "text-muted-fg hover:text-foreground hover:underline",
          children: it.label
        }
      ) })
    ] }, `${it.label}-${idx}`);
  }) }) });
}
function CollapsedItems({ items }) {
  const [open, setOpen] = React53.useState(false);
  return /* @__PURE__ */ jsxs("span", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": `Show ${items.length} hidden breadcrumbs`,
        "aria-expanded": open,
        onClick: () => setOpen((o) => !o),
        className: "inline-flex items-center rounded p-0.5 text-muted-fg hover:bg-muted hover:text-foreground",
        children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4", "aria-hidden": "true" })
      }
    ),
    open ? /* @__PURE__ */ jsx("ul", { className: "absolute left-0 top-full z-20 mt-1 min-w-[10rem] rounded-md border border-border bg-background p-1 shadow-md", children: items.map((it) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "a",
      {
        href: it.href,
        onClick: (e) => {
          if (it.onClick) {
            e.preventDefault();
            it.onClick();
          }
          setOpen(false);
        },
        className: "block rounded-sm px-2 py-1.5 text-sm text-foreground hover:bg-accent",
        children: it.label
      }
    ) }, it.label)) }) : null
  ] });
}
function Stepper({
  steps,
  current,
  onStepClick,
  orientation = "horizontal",
  className
}) {
  const isV = orientation === "vertical";
  return /* @__PURE__ */ jsx(
    "ol",
    {
      role: "list",
      "aria-label": "Progress",
      className: cn(
        "flex",
        isV ? "flex-col gap-3" : "flex-row items-center gap-2 overflow-x-auto",
        className
      ),
      children: steps.map((step, idx) => {
        const completed = idx < current;
        const active = idx === current;
        const clickable = onStepClick && (completed || active);
        return /* @__PURE__ */ jsxs(
          "li",
          {
            className: cn("flex items-center", isV ? "gap-3" : "flex-1 gap-2"),
            "aria-current": active ? "step" : void 0,
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  disabled: !clickable,
                  onClick: () => clickable && onStepClick?.(idx),
                  className: cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors",
                    completed && "border-primary bg-primary text-primary-fg",
                    active && "border-primary bg-primary/10 text-primary",
                    !completed && !active && "border-border bg-background text-muted-fg",
                    clickable && "cursor-pointer hover:opacity-80"
                  ),
                  "aria-label": `Step ${idx + 1}: ${step.label}`,
                  children: completed ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4", "aria-hidden": "true" }) : idx + 1
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: cn("flex-1", !isV && "min-w-0"), children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn("text-sm font-medium", active ? "text-foreground" : "text-muted-fg"),
                    children: [
                      step.label,
                      step.optional ? /* @__PURE__ */ jsx("span", { className: "ml-1 text-xs font-normal text-muted-fg", children: "(optional)" }) : null
                    ]
                  }
                ),
                step.description ? /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-fg", children: step.description }) : null
              ] }),
              !isV && idx < steps.length - 1 ? /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    "h-px flex-1 transition-colors",
                    completed ? "bg-primary" : "bg-border"
                  ),
                  "aria-hidden": "true"
                }
              ) : null
            ]
          },
          step.id
        );
      })
    }
  );
}
function Pagination({
  page,
  pageCount,
  onPageChange,
  showFirstLast = true,
  showJumpTo = false,
  showPageSize = false,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  onPageSizeChange,
  className
}) {
  const [jump, setJump] = React53.useState("");
  const start = Math.max(1, Math.min(page - 2, Math.max(1, pageCount - 4)));
  const end = Math.min(pageCount, start + 4);
  const visiblePages = [];
  for (let i = start; i <= end; i++) visiblePages.push(i);
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      "aria-label": "Pagination",
      className: cn("flex flex-wrap items-center gap-2 text-sm", className),
      children: [
        showFirstLast ? /* @__PURE__ */ jsx(
          Button,
          {
            size: "icon",
            variant: "outline",
            onClick: () => onPageChange(1),
            disabled: page <= 1,
            "aria-label": "First page",
            children: /* @__PURE__ */ jsx(ChevronsLeft, { className: "h-4 w-4", "aria-hidden": "true" })
          }
        ) : null,
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "icon",
            variant: "outline",
            onClick: () => onPageChange(page - 1),
            disabled: page <= 1,
            "aria-label": "Previous page",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: visiblePages.map((p) => /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            variant: p === page ? "default" : "ghost",
            onClick: () => onPageChange(p),
            "aria-current": p === page ? "page" : void 0,
            "aria-label": `Page ${p}`,
            className: "min-w-[2.25rem]",
            children: p
          },
          p
        )) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "icon",
            variant: "outline",
            onClick: () => onPageChange(page + 1),
            disabled: page >= pageCount,
            "aria-label": "Next page",
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4", "aria-hidden": "true" })
          }
        ),
        showFirstLast ? /* @__PURE__ */ jsx(
          Button,
          {
            size: "icon",
            variant: "outline",
            onClick: () => onPageChange(pageCount),
            disabled: page >= pageCount,
            "aria-label": "Last page",
            children: /* @__PURE__ */ jsx(ChevronsRight, { className: "h-4 w-4", "aria-hidden": "true" })
          }
        ) : null,
        /* @__PURE__ */ jsxs("span", { className: "ml-2 text-muted-fg", children: [
          page,
          " / ",
          pageCount
        ] }),
        showJumpTo ? /* @__PURE__ */ jsxs(
          "form",
          {
            className: "ml-2 flex items-center gap-1",
            onSubmit: (e) => {
              e.preventDefault();
              const n = Number(jump);
              if (Number.isFinite(n) && n >= 1 && n <= pageCount) {
                onPageChange(Math.floor(n));
                setJump("");
              }
            },
            children: [
              /* @__PURE__ */ jsx("label", { className: "text-muted-fg", htmlFor: "jump-to-page", children: "Go to" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "jump-to-page",
                  type: "number",
                  min: 1,
                  max: pageCount,
                  value: jump,
                  onChange: (e) => setJump(e.target.value),
                  className: "w-16 text-center"
                }
              )
            ]
          }
        ) : null,
        showPageSize && onPageSizeChange ? /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-muted-fg", htmlFor: "page-size-select", children: "Rows" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              id: "page-size-select",
              value: pageSize,
              onChange: (e) => onPageSizeChange(Number(e.target.value)),
              className: "h-9 rounded-md border border-input bg-background px-2 text-sm",
              children: pageSizeOptions.map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s }, s))
            }
          )
        ] }) : null
      ]
    }
  );
}
var fabVariants = cva(
  "fixed z-40 inline-flex items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      size: {
        sm: "h-10 w-10",
        md: "h-14 w-14",
        lg: "h-16 w-16"
      },
      position: {
        "bottom-right": "bottom-6 right-6",
        "bottom-left": "bottom-6 left-6",
        "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
        "top-right": "top-6 right-6",
        "top-left": "top-6 left-6"
      },
      tone: {
        primary: "bg-primary text-primary-fg hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-fg hover:bg-secondary/80",
        accent: "bg-accent text-accent-fg hover:bg-accent/80"
      }
    },
    defaultVariants: { size: "md", position: "bottom-right", tone: "primary" }
  }
);
var FAB = React53.forwardRef(
  ({ className, size, position, tone, icon, label, extended, ...props }, ref) => /* @__PURE__ */ jsxs(
    "button",
    {
      ref,
      type: "button",
      "aria-label": label,
      title: extended ? void 0 : label,
      className: cn(
        fabVariants({ size, position, tone }),
        extended && "h-12 w-auto px-5",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: icon ?? /* @__PURE__ */ jsx(Plus, { className: "h-5 w-5" }) }),
        extended ? /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm font-medium", children: label }) : null
      ]
    }
  )
);
FAB.displayName = "FAB";
function MobileBottomNav({
  items,
  className
}) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      "aria-label": "Primary navigation (mobile)",
      className: cn(
        "fixed inset-x-0 bottom-0 z-30 flex h-14 items-stretch border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:hidden",
        className
      ),
      children: items.slice(0, 5).map((it) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: it.onClick,
          "aria-current": it.active ? "page" : void 0,
          className: cn(
            "flex flex-1 flex-col items-center justify-center gap-0.5 text-xs transition-colors",
            it.active ? "text-primary" : "text-muted-fg hover:text-foreground"
          ),
          children: [
            /* @__PURE__ */ jsxs("span", { className: "relative", "aria-hidden": "true", children: [
              it.icon,
              it.badge && it.badge > 0 ? /* @__PURE__ */ jsx("span", { className: "absolute -right-2 -top-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-destructive px-1 text-[0.6rem] font-medium text-destructive-fg", children: it.badge > 99 ? "99+" : it.badge }) : null
            ] }),
            /* @__PURE__ */ jsx("span", { children: it.label })
          ]
        },
        it.id
      ))
    }
  );
}
function TabsOverflow({
  items,
  value,
  onChange,
  className
}) {
  const containerRef = React53.useRef(null);
  const [overflowOpen, setOverflowOpen] = React53.useState(false);
  const [visibleCount, setVisibleCount] = React53.useState(items.length);
  React53.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      const w = el.offsetWidth;
      const approxItemWidth = 128;
      const moreSlot = 100;
      const fitable = Math.max(1, Math.floor((w - moreSlot) / approxItemWidth));
      setVisibleCount(Math.min(items.length, fitable));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length]);
  const visible = items.slice(0, visibleCount);
  const overflow = items.slice(visibleCount);
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className: cn("flex items-center gap-1 overflow-hidden", className), children: [
    /* @__PURE__ */ jsx("div", { role: "tablist", "aria-orientation": "horizontal", className: "flex items-center gap-1", children: visible.map((it) => /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        role: "tab",
        "aria-selected": value === it.id,
        disabled: it.disabled,
        onClick: () => onChange(it.id),
        className: cn(
          "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
          value === it.id ? "bg-primary text-primary-fg" : "text-muted-fg hover:bg-accent hover:text-foreground",
          it.disabled && "opacity-50"
        ),
        children: [
          /* @__PURE__ */ jsx("span", { children: it.label }),
          it.badge
        ]
      },
      it.id
    )) }),
    overflow.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "relative ml-auto", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setOverflowOpen((o) => !o),
          "aria-expanded": overflowOpen,
          "aria-haspopup": "menu",
          className: "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-muted-fg hover:bg-accent",
          children: [
            "More (",
            overflow.length,
            ")",
            /* @__PURE__ */ jsx(ChevronDown, { className: "h-3.5 w-3.5", "aria-hidden": "true" })
          ]
        }
      ),
      overflowOpen ? /* @__PURE__ */ jsx(
        "ul",
        {
          role: "menu",
          className: "absolute right-0 top-full z-20 mt-1 min-w-[10rem] rounded-md border border-border bg-background p-1 shadow-md",
          children: overflow.map((it) => /* @__PURE__ */ jsx("li", { role: "none", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              role: "menuitem",
              onClick: () => {
                onChange(it.id);
                setOverflowOpen(false);
              },
              disabled: it.disabled,
              className: cn(
                "block w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
                value === it.id && "bg-primary/10 text-primary"
              ),
              children: it.label
            }
          ) }, it.id))
        }
      ) : null
    ] }) : null
  ] });
}
function AppSwitcher({
  apps,
  trigger,
  className
}) {
  const [open, setOpen] = React53.useState(false);
  const ref = React53.useRef(null);
  React53.useEffect(() => {
    function onClickOutside(e) {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);
  return /* @__PURE__ */ jsxs("div", { ref, className: cn("relative", className), children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setOpen((o) => !o),
        "aria-haspopup": "dialog",
        "aria-expanded": open,
        "aria-label": "Open app switcher",
        className: "inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-fg hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        children: trigger ?? /* @__PURE__ */ jsx(Grip, { className: "h-5 w-5", "aria-hidden": "true" })
      }
    ),
    open ? /* @__PURE__ */ jsx(
      "div",
      {
        role: "dialog",
        "aria-label": "App switcher",
        className: "absolute right-0 top-full z-30 mt-2 w-72 rounded-md border border-border bg-background p-3 shadow-lg",
        children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-1", children: apps.map((a) => {
          const Tag = a.href ? "a" : "button";
          return /* @__PURE__ */ jsxs(
            Tag,
            {
              type: Tag === "button" ? "button" : void 0,
              href: a.href,
              onClick: () => {
                a.onClick?.();
                setOpen(false);
              },
              title: a.description ?? a.name,
              className: "flex flex-col items-center gap-1.5 rounded-md p-3 text-center text-xs hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              children: [
                /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary", children: a.icon }),
                /* @__PURE__ */ jsx("span", { className: "truncate text-foreground", children: a.name })
              ]
            },
            a.id
          );
        }) })
      }
    ) : null
  ] });
}
function MegaMenu({
  triggers,
  className
}) {
  const [open, setOpen] = React53.useState(null);
  const ref = React53.useRef(null);
  React53.useEffect(() => {
    function onClickOutside(e) {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(null);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return /* @__PURE__ */ jsx("nav", { ref, "aria-label": "Primary", className: cn("flex items-center gap-1", className), children: triggers.map((t) => {
    const isOpen = open === t.id;
    return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setOpen(isOpen ? null : t.id),
          "aria-expanded": isOpen,
          "aria-haspopup": "menu",
          className: cn(
            "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isOpen ? "bg-accent text-foreground" : "text-muted-fg hover:bg-accent hover:text-foreground"
          ),
          children: [
            t.label,
            /* @__PURE__ */ jsx(
              ChevronDown,
              {
                className: cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180"),
                "aria-hidden": "true"
              }
            )
          ]
        }
      ),
      isOpen ? /* @__PURE__ */ jsx(
        "div",
        {
          role: "menu",
          className: "fixed left-0 right-0 top-[calc(var(--header-height,3.5rem))] z-30 border-b border-border bg-background shadow-lg",
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "mx-auto grid max-w-7xl gap-6 p-6 md:grid-cols-[repeat(var(--col-count),minmax(0,1fr))_minmax(0,18rem)]",
              style: { ["--col-count"]: t.columns.length },
              children: [
                t.columns.map((col, idx) => /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-wider text-muted-fg", children: col.heading }),
                  /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-1", children: col.items.map((item) => {
                    const Tag = item.href ? "a" : "button";
                    return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                      Tag,
                      {
                        type: Tag === "button" ? "button" : void 0,
                        href: item.href,
                        onClick: () => {
                          item.onClick?.();
                          setOpen(null);
                        },
                        className: "flex w-full items-start gap-3 rounded-md p-2 text-left transition-colors hover:bg-accent",
                        children: [
                          item.icon ? /* @__PURE__ */ jsx("span", { className: "mt-0.5 text-muted-fg", children: item.icon }) : null,
                          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
                              item.label,
                              item.badge
                            ] }),
                            item.description ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-fg", children: item.description }) : null
                          ] })
                        ]
                      }
                    ) }, item.id);
                  }) })
                ] }, idx)),
                t.featured ? /* @__PURE__ */ jsx("aside", { className: "rounded-lg bg-muted/50 p-4", children: t.featured }) : null
              ]
            }
          )
        }
      ) : null
    ] }, t.id);
  }) });
}

// src/lib/oklch.ts
function oklch(l, c, h) {
  return { l, c, h };
}
function toCss({ l, c, h }) {
  return `oklch(${(l * 100).toFixed(2)}% ${c.toFixed(3)} ${h.toFixed(1)})`;
}
function toHex(color) {
  const rgb = toRgb(color);
  const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));
  const r = clamp(rgb.r * 255);
  const g = clamp(rgb.g * 255);
  const b = clamp(rgb.b * 255);
  return "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
}
function toRgb({ l, c, h }) {
  const a_ = c * Math.cos(h * Math.PI / 180);
  const b_ = c * Math.sin(h * Math.PI / 180);
  const l_ = (l + 0.3963377774 * a_ + 0.2158037573 * b_) ** 3;
  const m_ = (l - 0.1055613458 * a_ - 0.0638541728 * b_) ** 3;
  const s_ = (l - 0.0894841775 * a_ - 1.291485548 * b_) ** 3;
  const rl = 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_;
  const gl = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_;
  const bl = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_;
  const enc = (x) => x >= 31308e-7 ? 1.055 * Math.pow(Math.max(0, x), 1 / 2.4) - 0.055 : 12.92 * x;
  return { r: enc(rl), g: enc(gl), b: enc(bl) };
}
function luminance(color) {
  const { r, g, b } = toRgb(color);
  const lin = (v) => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrastRatio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [light, dark] = la > lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
}
function simulateColorBlind(color, type) {
  const shift = { protan: -20, deutan: 20, tritan: 40 }[type];
  const cReduction = { protan: 0.6, deutan: 0.6, tritan: 0.5 }[type];
  return { l: color.l, c: color.c * cReduction, h: (color.h + shift + 360) % 360 };
}
function harmony(base, kind) {
  switch (kind) {
    case "analogous":
      return [base, { ...base, h: (base.h + 30) % 360 }, { ...base, h: (base.h + 360 - 30) % 360 }];
    case "triadic":
      return [base, { ...base, h: (base.h + 120) % 360 }, { ...base, h: (base.h + 240) % 360 }];
    case "split-complement":
      return [base, { ...base, h: (base.h + 150) % 360 }, { ...base, h: (base.h + 210) % 360 }];
    case "monochromatic":
      return [
        { ...base, l: Math.min(0.95, base.l + 0.15) },
        base,
        { ...base, l: Math.max(0.15, base.l - 0.15) }
      ];
  }
}
function buildScale(base) {
  const targets = [0.97, 0.94, 0.87, 0.78, 0.68, 0.58, 0.48, 0.38, 0.28, 0.18, 0.13];
  return targets.map((l) => ({ ...base, l }));
}

// src/components/ThemeBuilderWizard/presets.ts
var STARTER_PRESETS = [
  {
    id: "corporate-strict",
    name: "Corporate Strict",
    mood: "Professional, conservative",
    description: "Navy + cyan accent. Inter + Source Serif. Minimal shadows.",
    primary: { l: 0.32, c: 0.16, h: 250 },
    secondary: { l: 0.6, c: 0.12, h: 200 },
    accent: { l: 0.7, c: 0.18, h: 195 },
    fontSans: "Inter",
    fontSerif: "Source Serif Pro",
    fontMono: "JetBrains Mono",
    borderRadius: "sharp",
    motionIntensity: "reduced",
    effects: ["shadow"],
    density: "comfortable"
  },
  {
    id: "playful-bright",
    name: "Playful Bright",
    mood: "Energetic, friendly",
    description: "Coral + mint, soft shadows + curves.",
    primary: { l: 0.65, c: 0.21, h: 25 },
    secondary: { l: 0.75, c: 0.15, h: 160 },
    accent: { l: 0.78, c: 0.18, h: 75 },
    fontSans: "Manrope",
    fontSerif: "Fraunces",
    fontMono: "Fira Code",
    borderRadius: "round",
    motionIntensity: "expressive",
    effects: ["shadow", "glow"],
    density: "comfortable"
  },
  {
    id: "minimal-mono",
    name: "Minimal Mono",
    mood: "Editorial, clean",
    description: "Black + gray scale. Sharp edges. Editorial feel.",
    primary: { l: 0.18, c: 0.01, h: 250 },
    secondary: { l: 0.5, c: 0.01, h: 250 },
    accent: { l: 0.7, c: 0.05, h: 250 },
    fontSans: "Inter",
    fontSerif: "Playfair Display",
    fontMono: "IBM Plex Mono",
    borderRadius: "sharp",
    motionIntensity: "reduced",
    effects: [],
    density: "spacious"
  },
  {
    id: "futuristic-neon",
    name: "Futuristic Neon",
    mood: "Tech, gaming",
    description: "Purple + electric lime. Glow + glassmorphism.",
    primary: { l: 0.55, c: 0.27, h: 295 },
    secondary: { l: 0.85, c: 0.22, h: 130 },
    accent: { l: 0.7, c: 0.25, h: 200 },
    fontSans: "Space Grotesk",
    fontSerif: "Space Grotesk",
    fontMono: "JetBrains Mono",
    borderRadius: "soft",
    motionIntensity: "expressive",
    effects: ["glass", "glow", "mesh"],
    density: "comfortable"
  },
  {
    id: "elegant-editorial",
    name: "Elegant Editorial",
    mood: "Premium, sophisticated",
    description: "Burgundy + cream. Soft contrast. Print-ready feel.",
    primary: { l: 0.42, c: 0.16, h: 15 },
    secondary: { l: 0.85, c: 0.06, h: 75 },
    accent: { l: 0.55, c: 0.13, h: 35 },
    fontSans: "Inter",
    fontSerif: "Playfair Display",
    fontMono: "IBM Plex Mono",
    borderRadius: "soft",
    motionIntensity: "normal",
    effects: ["shadow"],
    density: "spacious"
  },
  {
    id: "glassmorphism-pro",
    name: "Glassmorphism Pro",
    mood: "Modern, dynamic",
    description: "Gradient mesh background. Backdrop-blur cards. Vivid.",
    primary: { l: 0.6, c: 0.22, h: 270 },
    secondary: { l: 0.7, c: 0.18, h: 200 },
    accent: { l: 0.78, c: 0.18, h: 320 },
    fontSans: "Geist",
    fontSerif: "Geist",
    fontMono: "Geist Mono",
    borderRadius: "round",
    motionIntensity: "expressive",
    effects: ["glass", "mesh", "noise", "glow"],
    density: "comfortable"
  }
];
function findPreset(id) {
  return STARTER_PRESETS.find((p) => p.id === id);
}

// src/components/ThemeBuilderWizard/types.ts
var DEFAULT_THEME_STATE = {
  brand: { name: "Heuresys", tagline: "", mood: "corporate" },
  colors: {
    primary: { l: 0.55, c: 0.18, h: 264 },
    secondary: { l: 0.65, c: 0.05, h: 252 },
    accent: { l: 0.7, c: 0.18, h: 195 },
    success: { l: 0.65, c: 0.16, h: 145 },
    warning: { l: 0.78, c: 0.16, h: 80 },
    destructive: { l: 0.6, c: 0.22, h: 22 },
    info: { l: 0.65, c: 0.16, h: 240 },
    grayScale: "slate"
  },
  modes: { light: true, dark: true, highContrast: false, colorBlindSim: null },
  typography: {
    fontSans: "Inter",
    fontSerif: "Source Serif Pro",
    fontMono: "JetBrains Mono",
    scale: "fluid",
    baseSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0,
    weights: [400, 500, 600, 700]
  },
  spacing: { scale: "4-base", borderRadius: "soft", borderWidth: "thin" },
  motion: {
    intensity: "normal",
    durationFast: 120,
    durationBase: 200,
    durationSlow: 320,
    easing: "ease-in-out"
  },
  effects: {
    shadows: "subtle",
    glassmorphism: 0,
    neumorphism: false,
    glow: false,
    meshGradient: false,
    noiseOverlay: 0
  },
  iconography: { set: "lucide", weight: "regular", style: "linear" },
  density: "comfortable"
};

// src/components/ThemeBuilderWizard/export.ts
function exportTokensCss(state) {
  const c = state.colors;
  const scaleP = buildScale(c.primary).map(toCss);
  return `/* Generated by Theme Builder Wizard \u2014 ${(/* @__PURE__ */ new Date()).toISOString()} */
:root {
  --color-primary: ${toCss(c.primary)};
  --color-primary-fg: oklch(0.99 0 0);
  --color-secondary: ${toCss(c.secondary)};
  --color-accent: ${toCss(c.accent)};
  --color-success: ${toCss(c.success)};
  --color-warning: ${toCss(c.warning)};
  --color-destructive: ${toCss(c.destructive)};
  --color-info: ${toCss(c.info)};
  --color-primary-50: ${scaleP[0]};
  --color-primary-100: ${scaleP[1]};
  --color-primary-200: ${scaleP[2]};
  --color-primary-300: ${scaleP[3]};
  --color-primary-400: ${scaleP[4]};
  --color-primary-500: ${scaleP[5]};
  --color-primary-600: ${scaleP[6]};
  --color-primary-700: ${scaleP[7]};
  --color-primary-800: ${scaleP[8]};
  --color-primary-900: ${scaleP[9]};
  --color-primary-950: ${scaleP[10]};
  --font-sans: '${state.typography.fontSans}', system-ui, sans-serif;
  --font-serif: '${state.typography.fontSerif}', Georgia, serif;
  --font-mono: '${state.typography.fontMono}', monospace;
  --motion-duration-fast: ${state.motion.durationFast}ms;
  --motion-duration-base: ${state.motion.durationBase}ms;
  --motion-duration-slow: ${state.motion.durationSlow}ms;
  --radius-md: ${state.spacing.borderRadius === "sharp" ? "0.125rem" : state.spacing.borderRadius === "soft" ? "0.5rem" : "0.875rem"};
}
`;
}
function exportTailwindConfig(state) {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-fg': 'var(--color-primary-fg)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        destructive: 'var(--color-destructive)',
        info: 'var(--color-info)',
      },
      fontFamily: {
        sans: ['${state.typography.fontSans}'],
        serif: ['${state.typography.fontSerif}'],
        mono: ['${state.typography.fontMono}'],
      },
      transitionDuration: {
        fast: '${state.motion.durationFast}ms',
        base: '${state.motion.durationBase}ms',
        slow: '${state.motion.durationSlow}ms',
      },
    },
  },
};
`;
}
function exportTokensJson(state) {
  const c = state.colors;
  const tokens = {
    color: {
      primary: { value: toCss(c.primary), type: "color" },
      secondary: { value: toCss(c.secondary), type: "color" },
      accent: { value: toCss(c.accent), type: "color" },
      success: { value: toCss(c.success), type: "color" },
      warning: { value: toCss(c.warning), type: "color" },
      destructive: { value: toCss(c.destructive), type: "color" },
      info: { value: toCss(c.info), type: "color" }
    },
    typography: {
      fontFamily: {
        sans: { value: state.typography.fontSans, type: "fontFamily" },
        serif: { value: state.typography.fontSerif, type: "fontFamily" },
        mono: { value: state.typography.fontMono, type: "fontFamily" }
      },
      baseSize: { value: `${state.typography.baseSize}px`, type: "dimension" },
      lineHeight: { value: state.typography.lineHeight, type: "number" }
    },
    motion: {
      duration: {
        fast: { value: `${state.motion.durationFast}ms`, type: "duration" },
        base: { value: `${state.motion.durationBase}ms`, type: "duration" },
        slow: { value: `${state.motion.durationSlow}ms`, type: "duration" }
      }
    },
    radius: {
      md: {
        value: state.spacing.borderRadius === "sharp" ? "0.125rem" : state.spacing.borderRadius === "soft" ? "0.5rem" : "0.875rem",
        type: "dimension"
      }
    }
  };
  return JSON.stringify(tokens, null, 2);
}
function exportFigmaTokens(state) {
  return exportTokensJson(state);
}
function exportThemeProvider(state) {
  return `// Generated by Theme Builder Wizard
import { ThemeProvider } from '@heuresys/ui';

export const theme = ${JSON.stringify(state, null, 2)};

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}
`;
}
function downloadAsFile(filename, content, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
var STEPS = [
  { id: "brand", label: "Brand", description: "Identity basics" },
  { id: "colors", label: "Colors", description: "Primary + system" },
  { id: "modes", label: "Modes", description: "Light/dark/contrast" },
  { id: "typography", label: "Typography", description: "Fonts + scale" },
  { id: "spacing", label: "Spacing", description: "Scale + radius" },
  { id: "motion", label: "Motion", description: "Intensity + easing" },
  { id: "effects", label: "Effects", description: "Shadows + glass" },
  { id: "density", label: "Density", description: "Padding scale" },
  { id: "icons", label: "Iconography", description: "Set + weight" },
  { id: "export", label: "Export", description: "Save & download" }
];
function ThemeBuilderWizard({
  initial,
  onComplete,
  onChange,
  className
}) {
  const [state, setState] = React53.useState({
    ...DEFAULT_THEME_STATE,
    ...initial
  });
  const [step, setStep] = React53.useState(0);
  const onChangeRef = React53.useRef(onChange);
  React53.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  React53.useEffect(() => {
    onChangeRef.current?.(state);
  }, [state]);
  const update = (key, value) => setState((s) => ({ ...s, [key]: value }));
  function loadPreset(id) {
    const p = findPreset(id);
    if (!p) return;
    setState((s) => ({
      ...s,
      brand: { ...s.brand, mood: p.mood },
      colors: { ...s.colors, primary: p.primary, secondary: p.secondary, accent: p.accent },
      typography: {
        ...s.typography,
        fontSans: p.fontSans,
        fontSerif: p.fontSerif,
        fontMono: p.fontMono
      },
      spacing: { ...s.spacing, borderRadius: p.borderRadius },
      motion: { ...s.motion, intensity: p.motionIntensity },
      density: p.density,
      effects: {
        ...s.effects,
        shadows: p.effects.includes("shadow") ? "material" : "none",
        glassmorphism: p.effects.includes("glass") ? 70 : 0,
        glow: p.effects.includes("glow"),
        meshGradient: p.effects.includes("mesh"),
        noiseOverlay: p.effects.includes("noise") ? 10 : 0,
        neumorphism: p.effects.includes("neumorphism")
      }
    }));
  }
  function exportAll() {
    downloadAsFile("tokens.css", exportTokensCss(state), "text/css");
    downloadAsFile("tailwind.config.js", exportTailwindConfig(state), "text/javascript");
    downloadAsFile("tokens.json", exportTokensJson(state), "application/json");
    downloadAsFile("figma-tokens.json", exportFigmaTokens(state), "application/json");
    downloadAsFile("theme.tsx", exportThemeProvider(state), "text/typescript");
    onComplete?.(state);
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-6", className), children: [
    /* @__PURE__ */ jsx(
      Stepper,
      {
        steps: STEPS.map((s) => ({ id: s.id, label: s.label, description: s.description })),
        current: step,
        onStepClick: setStep
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: STEPS[step].label }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          step === 0 ? /* @__PURE__ */ jsx(BrandStep, { state, update }) : null,
          step === 1 ? /* @__PURE__ */ jsx(ColorsStep, { state, update }) : null,
          step === 2 ? /* @__PURE__ */ jsx(ModesStep, { state, update }) : null,
          step === 3 ? /* @__PURE__ */ jsx(TypographyStep, { state, update }) : null,
          step === 4 ? /* @__PURE__ */ jsx(SpacingStep, { state, update }) : null,
          step === 5 ? /* @__PURE__ */ jsx(MotionStep, { state, update }) : null,
          step === 6 ? /* @__PURE__ */ jsx(EffectsStep, { state, update }) : null,
          step === 7 ? /* @__PURE__ */ jsx(DensityStep, { state, update }) : null,
          step === 8 ? /* @__PURE__ */ jsx(IconsStep, { state, update }) : null,
          step === 9 ? /* @__PURE__ */ jsx(ExportStep, { state, onExport: exportAll }) : null
        ] }),
        /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => setStep((s) => Math.max(0, s - 1)),
              disabled: step === 0,
              children: [
                /* @__PURE__ */ jsx(ChevronLeft, { className: "mr-1 h-4 w-4" }),
                " Back"
              ]
            }
          ),
          step < STEPS.length - 1 ? /* @__PURE__ */ jsxs(Button, { onClick: () => setStep((s) => s + 1), children: [
            "Next ",
            /* @__PURE__ */ jsx(ChevronRight, { className: "ml-1 h-4 w-4" })
          ] }) : /* @__PURE__ */ jsxs(Button, { onClick: exportAll, children: [
            /* @__PURE__ */ jsx(Download, { className: "mr-1 h-4 w-4" }),
            " Export theme"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Live preview" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(LivePreview, { state }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Starter presets" }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "flex flex-col gap-1.5", children: STARTER_PRESETS.map((p) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => loadPreset(p.id),
              className: "flex items-center gap-2 rounded-md p-2 text-left text-xs transition-colors hover:bg-accent",
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: "h-6 w-6 shrink-0 rounded-full border border-border",
                    style: { background: toCss(p.primary) }
                  }
                ),
                /* @__PURE__ */ jsxs("span", { className: "flex-1", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-medium", children: p.name }),
                  /* @__PURE__ */ jsx("div", { className: "text-muted-fg", children: p.mood })
                ] })
              ]
            },
            p.id
          )) })
        ] })
      ] })
    ] })
  ] });
}
function BrandStep({ state, update }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(Field, { label: "Brand name", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: state.brand.name,
        onChange: (e) => update("brand", { ...state.brand, name: e.target.value })
      }
    ) }),
    /* @__PURE__ */ jsx(Field, { label: "Tagline (optional)", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: state.brand.tagline ?? "",
        onChange: (e) => update("brand", { ...state.brand, tagline: e.target.value })
      }
    ) }),
    /* @__PURE__ */ jsx(Field, { label: "Mood", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["corporate", "playful", "minimal", "futuristic", "elegant"].map((m) => /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: state.brand.mood === m ? "default" : "outline",
        onClick: () => update("brand", { ...state.brand, mood: m }),
        children: m
      },
      m
    )) }) }),
    /* @__PURE__ */ jsx(Field, { label: "Logo SVG (paste markup)", children: /* @__PURE__ */ jsx(
      "textarea",
      {
        value: state.brand.logoSvg ?? "",
        onChange: (e) => update("brand", { ...state.brand, logoSvg: e.target.value }),
        rows: 4,
        placeholder: "<svg>\u2026</svg>",
        className: "w-full rounded-md border border-input bg-background p-2 font-mono text-xs"
      }
    ) })
  ] });
}
function ColorsStep({ state, update }) {
  const [harmonyKind, setHarmonyKind] = React53.useState("analogous");
  const harmonyColors = harmony(state.colors.primary, harmonyKind);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(Field, { label: "Primary (OKLCH)", children: /* @__PURE__ */ jsx(
      OklchPicker,
      {
        color: state.colors.primary,
        onChange: (c) => update("colors", { ...state.colors, primary: c })
      }
    ) }),
    /* @__PURE__ */ jsxs(Field, { label: `Harmony \u2014 ${harmonyKind}`, children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["analogous", "triadic", "split-complement", "monochromatic"].map((k) => /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: harmonyKind === k ? "default" : "outline",
          onClick: () => setHarmonyKind(k),
          children: k
        },
        k
      )) }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 flex gap-1", children: harmonyColors.map((c, i) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            if (i === 1) update("colors", { ...state.colors, secondary: c });
            if (i === 2) update("colors", { ...state.colors, accent: c });
          },
          className: "h-10 flex-1 rounded-md border border-border",
          style: { background: toCss(c) },
          title: `Apply as ${i === 0 ? "primary" : i === 1 ? "secondary" : "accent"}`
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsx(Field, { label: "Semantic colors", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx(
        ColorRow,
        {
          label: "Success",
          color: state.colors.success,
          onChange: (c) => update("colors", { ...state.colors, success: c })
        }
      ),
      /* @__PURE__ */ jsx(
        ColorRow,
        {
          label: "Warning",
          color: state.colors.warning,
          onChange: (c) => update("colors", { ...state.colors, warning: c })
        }
      ),
      /* @__PURE__ */ jsx(
        ColorRow,
        {
          label: "Destructive",
          color: state.colors.destructive,
          onChange: (c) => update("colors", { ...state.colors, destructive: c })
        }
      ),
      /* @__PURE__ */ jsx(
        ColorRow,
        {
          label: "Info",
          color: state.colors.info,
          onChange: (c) => update("colors", { ...state.colors, info: c })
        }
      )
    ] }) })
  ] });
}
function ModesStep({ state, update }) {
  const fg = { l: 0.22, c: 0.018, h: 252 };
  const ratio = contrastRatio(state.colors.primary, fg);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(
      ToggleRow,
      {
        label: "Light mode",
        checked: state.modes.light,
        onChange: (v) => update("modes", { ...state.modes, light: v })
      }
    ),
    /* @__PURE__ */ jsx(
      ToggleRow,
      {
        label: "Dark mode",
        checked: state.modes.dark,
        onChange: (v) => update("modes", { ...state.modes, dark: v })
      }
    ),
    /* @__PURE__ */ jsx(
      ToggleRow,
      {
        label: "High contrast",
        checked: state.modes.highContrast,
        onChange: (v) => update("modes", { ...state.modes, highContrast: v })
      }
    ),
    /* @__PURE__ */ jsxs(Field, { label: "Color blindness simulation", children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["none", "protan", "deutan", "tritan"].map((t) => /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: (state.modes.colorBlindSim ?? "none") === t ? "default" : "outline",
          onClick: () => update("modes", { ...state.modes, colorBlindSim: t === "none" ? null : t }),
          children: t
        },
        t
      )) }),
      state.modes.colorBlindSim ? /* @__PURE__ */ jsx(
        "div",
        {
          className: "mt-3 h-10 rounded-md border border-border",
          style: {
            background: toCss(
              simulateColorBlind(state.colors.primary, state.modes.colorBlindSim)
            )
          }
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-border p-3 text-sm", children: [
      "WCAG contrast ratio (primary vs foreground): ",
      /* @__PURE__ */ jsx("strong", { children: ratio.toFixed(2) }),
      " ",
      /* @__PURE__ */ jsx(Badge, { variant: ratio >= 7 ? "success" : ratio >= 4.5 ? "secondary" : "destructive", children: ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "fail" })
    ] })
  ] });
}
function TypographyStep({ state, update }) {
  const fonts = [
    "Inter",
    "Manrope",
    "Space Grotesk",
    "Geist",
    "IBM Plex Sans",
    "Plus Jakarta Sans"
  ];
  const serifs = ["Source Serif Pro", "Playfair Display", "Fraunces", "Lora", "EB Garamond"];
  const monos = ["JetBrains Mono", "IBM Plex Mono", "Fira Code", "Geist Mono"];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(Field, { label: "Sans-serif", children: /* @__PURE__ */ jsx(
      "select",
      {
        className: "w-full rounded-md border border-input bg-background p-2",
        value: state.typography.fontSans,
        onChange: (e) => update("typography", { ...state.typography, fontSans: e.target.value }),
        children: fonts.map((f) => /* @__PURE__ */ jsx("option", { children: f }, f))
      }
    ) }),
    /* @__PURE__ */ jsx(Field, { label: "Serif", children: /* @__PURE__ */ jsx(
      "select",
      {
        className: "w-full rounded-md border border-input bg-background p-2",
        value: state.typography.fontSerif,
        onChange: (e) => update("typography", { ...state.typography, fontSerif: e.target.value }),
        children: serifs.map((f) => /* @__PURE__ */ jsx("option", { children: f }, f))
      }
    ) }),
    /* @__PURE__ */ jsx(Field, { label: "Mono", children: /* @__PURE__ */ jsx(
      "select",
      {
        className: "w-full rounded-md border border-input bg-background p-2",
        value: state.typography.fontMono,
        onChange: (e) => update("typography", { ...state.typography, fontMono: e.target.value }),
        children: monos.map((f) => /* @__PURE__ */ jsx("option", { children: f }, f))
      }
    ) }),
    /* @__PURE__ */ jsx(Field, { label: `Base size: ${state.typography.baseSize}px`, children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "range",
        min: 12,
        max: 20,
        value: state.typography.baseSize,
        onChange: (e) => update("typography", { ...state.typography, baseSize: Number(e.target.value) }),
        className: "w-full",
        "aria-label": "Base font size"
      }
    ) }),
    /* @__PURE__ */ jsx(Field, { label: `Line height: ${state.typography.lineHeight}`, children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "range",
        min: 1.2,
        max: 1.8,
        step: 0.05,
        value: state.typography.lineHeight,
        onChange: (e) => update("typography", { ...state.typography, lineHeight: Number(e.target.value) }),
        className: "w-full",
        "aria-label": "Line height"
      }
    ) }),
    /* @__PURE__ */ jsx(
      "p",
      {
        className: "rounded-md border border-border p-3 text-foreground",
        style: {
          fontFamily: state.typography.fontSans,
          fontSize: state.typography.baseSize,
          lineHeight: state.typography.lineHeight
        },
        children: "The quick brown fox jumps over the lazy dog. 1234567890."
      }
    )
  ] });
}
function SpacingStep({ state, update }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(Field, { label: "Scale base", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["4-base", "8-base", "fibonacci", "golden"].map((s) => /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: state.spacing.scale === s ? "default" : "outline",
        onClick: () => update("spacing", { ...state.spacing, scale: s }),
        children: s
      },
      s
    )) }) }),
    /* @__PURE__ */ jsx(Field, { label: "Border radius", children: /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["sharp", "soft", "round"].map((r) => /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: state.spacing.borderRadius === r ? "default" : "outline",
        onClick: () => update("spacing", { ...state.spacing, borderRadius: r }),
        children: r
      },
      r
    )) }) }),
    /* @__PURE__ */ jsx(Field, { label: "Border width", children: /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["thin", "medium", "thick"].map((w) => /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: state.spacing.borderWidth === w ? "default" : "outline",
        onClick: () => update("spacing", { ...state.spacing, borderWidth: w }),
        children: w
      },
      w
    )) }) })
  ] });
}
function MotionStep({ state, update }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(Field, { label: "Intensity", children: /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["reduced", "normal", "expressive"].map((m) => /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: state.motion.intensity === m ? "default" : "outline",
        onClick: () => update("motion", { ...state.motion, intensity: m }),
        children: m
      },
      m
    )) }) }),
    /* @__PURE__ */ jsx(Field, { label: `Fast: ${state.motion.durationFast}ms`, children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "range",
        min: 50,
        max: 300,
        value: state.motion.durationFast,
        onChange: (e) => update("motion", { ...state.motion, durationFast: Number(e.target.value) }),
        className: "w-full",
        "aria-label": "Fast duration"
      }
    ) }),
    /* @__PURE__ */ jsx(Field, { label: `Base: ${state.motion.durationBase}ms`, children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "range",
        min: 100,
        max: 500,
        value: state.motion.durationBase,
        onChange: (e) => update("motion", { ...state.motion, durationBase: Number(e.target.value) }),
        className: "w-full",
        "aria-label": "Base duration"
      }
    ) }),
    /* @__PURE__ */ jsx(Field, { label: `Slow: ${state.motion.durationSlow}ms`, children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "range",
        min: 200,
        max: 800,
        value: state.motion.durationSlow,
        onChange: (e) => update("motion", { ...state.motion, durationSlow: Number(e.target.value) }),
        className: "w-full",
        "aria-label": "Slow duration"
      }
    ) }),
    /* @__PURE__ */ jsx(Field, { label: "Easing", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["linear", "ease-in-out", "spring", "bounce", "anticipate"].map((e) => /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: state.motion.easing === e ? "default" : "outline",
        onClick: () => update("motion", { ...state.motion, easing: e }),
        children: e
      },
      e
    )) }) })
  ] });
}
function EffectsStep({ state, update }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(Field, { label: "Shadows", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["none", "subtle", "material", "elevated", "dramatic"].map((s) => /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: state.effects.shadows === s ? "default" : "outline",
        onClick: () => update("effects", { ...state.effects, shadows: s }),
        children: s
      },
      s
    )) }) }),
    /* @__PURE__ */ jsx(Field, { label: `Glassmorphism intensity: ${state.effects.glassmorphism}`, children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "range",
        min: 0,
        max: 100,
        value: state.effects.glassmorphism,
        onChange: (e) => update("effects", { ...state.effects, glassmorphism: Number(e.target.value) }),
        className: "w-full",
        "aria-label": "Glassmorphism intensity"
      }
    ) }),
    /* @__PURE__ */ jsx(
      ToggleRow,
      {
        label: "Neumorphism",
        checked: state.effects.neumorphism,
        onChange: (v) => update("effects", { ...state.effects, neumorphism: v })
      }
    ),
    /* @__PURE__ */ jsx(
      ToggleRow,
      {
        label: "Glow effects",
        checked: state.effects.glow,
        onChange: (v) => update("effects", { ...state.effects, glow: v })
      }
    ),
    /* @__PURE__ */ jsx(
      ToggleRow,
      {
        label: "Mesh gradient bg",
        checked: state.effects.meshGradient,
        onChange: (v) => update("effects", { ...state.effects, meshGradient: v })
      }
    ),
    /* @__PURE__ */ jsx(Field, { label: `Noise overlay: ${state.effects.noiseOverlay}`, children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "range",
        min: 0,
        max: 30,
        value: state.effects.noiseOverlay,
        onChange: (e) => update("effects", { ...state.effects, noiseOverlay: Number(e.target.value) }),
        className: "w-full",
        "aria-label": "Noise overlay"
      }
    ) })
  ] });
}
function DensityStep({ state, update }) {
  return /* @__PURE__ */ jsx(Field, { label: "Layout density", children: /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["compact", "comfortable", "spacious"].map((d) => /* @__PURE__ */ jsx(
    Button,
    {
      size: "sm",
      variant: state.density === d ? "default" : "outline",
      onClick: () => update("density", d),
      children: d
    },
    d
  )) }) });
}
function IconsStep({ state, update }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(Field, { label: "Icon set", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["lucide", "phosphor", "tabler", "heroicons"].map((s) => /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: state.iconography.set === s ? "default" : "outline",
        onClick: () => update("iconography", { ...state.iconography, set: s }),
        children: s
      },
      s
    )) }) }),
    /* @__PURE__ */ jsx(Field, { label: "Weight", children: /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["thin", "regular", "bold"].map((w) => /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: state.iconography.weight === w ? "default" : "outline",
        onClick: () => update("iconography", { ...state.iconography, weight: w }),
        children: w
      },
      w
    )) }) }),
    /* @__PURE__ */ jsx(Field, { label: "Style", children: /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["linear", "filled", "duotone"].map((s) => /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: state.iconography.style === s ? "default" : "outline",
        onClick: () => update("iconography", { ...state.iconography, style: s }),
        children: s
      },
      s
    )) }) })
  ] });
}
function ExportStep({ state, onExport }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-fg", children: [
      "Click ",
      /* @__PURE__ */ jsx("strong", { children: "Export" }),
      " to download all 5 artifacts (tokens.css, tailwind.config.js, tokens.json, figma-tokens.json, theme.tsx)."
    ] }),
    /* @__PURE__ */ jsx(ExportPreview, { filename: "tokens.css", content: exportTokensCss(state) }),
    /* @__PURE__ */ jsxs(Button, { onClick: onExport, className: "w-full", children: [
      /* @__PURE__ */ jsx(Download, { className: "mr-1 h-4 w-4" }),
      " Export theme bundle"
    ] })
  ] });
}
function Field({ label, children }) {
  return /* @__PURE__ */ jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsx("span", { className: "mb-1.5 block text-sm font-medium text-foreground", children: label }),
    children
  ] });
}
function ToggleRow({
  label,
  checked,
  onChange
}) {
  return /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between gap-3 text-sm", children: [
    /* @__PURE__ */ jsx("span", { children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "checkbox",
        checked,
        onChange: (e) => onChange(e.target.checked),
        className: "h-4 w-4 accent-primary"
      }
    )
  ] });
}
function ColorRow({
  label,
  color,
  onChange
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        "aria-hidden": "true",
        className: "h-8 w-8 rounded-md border border-border",
        style: { background: toCss(color) }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-fg", children: label }),
      /* @__PURE__ */ jsx("div", { className: "text-xs font-mono", children: toCss(color) })
    ] }),
    /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: "ghost",
        onClick: () => onChange({
          l: Math.random() * 0.5 + 0.4,
          c: Math.random() * 0.2 + 0.05,
          h: Math.floor(Math.random() * 360)
        }),
        "aria-label": `Randomize ${label}`,
        children: /* @__PURE__ */ jsx(RefreshCw, { className: "h-3.5 w-3.5", "aria-hidden": "true" })
      }
    )
  ] });
}
function OklchPicker({ color, onChange }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-12 rounded-md border border-border",
        style: { background: toCss(color) },
        "aria-label": `Current color ${toCss(color)}`
      }
    ),
    /* @__PURE__ */ jsx(
      Slider,
      {
        label: `Lightness ${color.l.toFixed(2)}`,
        min: 0,
        max: 1,
        step: 0.01,
        value: color.l,
        onChange: (v) => onChange({ ...color, l: v })
      }
    ),
    /* @__PURE__ */ jsx(
      Slider,
      {
        label: `Chroma ${color.c.toFixed(2)}`,
        min: 0,
        max: 0.4,
        step: 5e-3,
        value: color.c,
        onChange: (v) => onChange({ ...color, c: v })
      }
    ),
    /* @__PURE__ */ jsx(
      Slider,
      {
        label: `Hue ${color.h.toFixed(0)}\xB0`,
        min: 0,
        max: 360,
        step: 1,
        value: color.h,
        onChange: (v) => onChange({ ...color, h: v })
      }
    )
  ] });
}
function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxs("label", { className: "block text-xs text-muted-fg", children: [
    label,
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "range",
        min,
        max,
        step,
        value,
        onChange: (e) => onChange(Number(e.target.value)),
        className: "mt-1 w-full"
      }
    )
  ] });
}
function LivePreview({ state }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "space-y-3 rounded-md border border-border p-3 text-sm",
      style: {
        background: "oklch(0.99 0.005 264)",
        color: "oklch(0.22 0.018 252)",
        fontFamily: state.typography.fontSans
      },
      children: [
        /* @__PURE__ */ jsx(Button, { style: { background: toCss(state.colors.primary), color: "white" }, children: "Primary action" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "rounded-md p-3",
            style: {
              background: "oklch(0.96 0.005 252)",
              borderRadius: state.spacing.borderRadius === "sharp" ? "0.125rem" : state.spacing.borderRadius === "soft" ? "0.5rem" : "0.875rem"
            },
            children: "Card with current radius"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [
          state.colors.primary,
          state.colors.secondary,
          state.colors.accent,
          state.colors.success,
          state.colors.warning,
          state.colors.destructive
        ].map((c, i) => /* @__PURE__ */ jsx("span", { className: "h-6 flex-1 rounded", style: { background: toCss(c) } }, i)) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-success", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { children: "Saved" })
        ] })
      ]
    }
  );
}
function ExportPreview({ filename, content }) {
  return /* @__PURE__ */ jsxs("details", { className: "rounded-md border border-border", children: [
    /* @__PURE__ */ jsx("summary", { className: "cursor-pointer p-2 text-xs font-medium", children: filename }),
    /* @__PURE__ */ jsx("pre", { className: "overflow-x-auto bg-muted p-3 text-xs", children: /* @__PURE__ */ jsx("code", { children: content }) })
  ] });
}
var glassVariants = cva("rounded-lg border bg-background/40 backdrop-blur", {
  variants: {
    intensity: {
      light: "backdrop-blur-sm bg-background/60 border-border/40",
      medium: "backdrop-blur-md bg-background/40 border-border/30",
      heavy: "backdrop-blur-xl bg-background/20 border-border/20"
    },
    tint: {
      none: "",
      primary: "ring-1 ring-primary/30",
      accent: "ring-1 ring-accent/30"
    }
  },
  defaultVariants: { intensity: "medium", tint: "none" }
});
var GlassCard = React53.forwardRef(
  ({ className, intensity, tint, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn(glassVariants({ intensity, tint }), className), ...props })
);
GlassCard.displayName = "GlassCard";
var neuVariants = cva("rounded-2xl bg-muted p-4 transition-all", {
  variants: {
    elevation: {
      raised: "shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]",
      pressed: "shadow-[inset_4px_4px_8px_rgba(0,0,0,0.08),inset_-4px_-4px_8px_rgba(255,255,255,0.6)]",
      flat: ""
    }
  },
  defaultVariants: { elevation: "raised" }
});
var NeumorphicCard = React53.forwardRef(
  ({ className, elevation, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn(neuVariants({ elevation }), className), ...props })
);
NeumorphicCard.displayName = "NeumorphicCard";
function StatsCard({
  label,
  value,
  unit,
  trend,
  trendDirection,
  description,
  sparkline,
  icon,
  animate = true,
  className
}) {
  const numericValue = typeof value === "number" ? value : null;
  const [display, setDisplay] = React53.useState(animate && numericValue !== null ? 0 : value);
  React53.useEffect(() => {
    if (!animate || numericValue === null) return;
    let raf = 0;
    const start = performance.now();
    const duration = 800;
    const from = 0;
    const to = numericValue;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round((from + (to - from) * eased) * 100) / 100);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, numericValue]);
  const dir = trendDirection ?? (trend == null ? "flat" : trend > 0 ? "up" : trend < 0 ? "down" : "flat");
  const TrendIcon = dir === "up" ? TrendingUp : dir === "down" ? TrendingDown : Minus;
  const trendColor = dir === "up" ? "text-success" : dir === "down" ? "text-destructive" : "text-muted-fg";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col gap-2 rounded-lg border border-border bg-background p-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-muted-fg", children: label }),
          icon ? /* @__PURE__ */ jsx("span", { className: "text-muted-fg", children: icon }) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-3xl font-semibold tabular-nums", children: display }),
          unit ? /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-fg", children: unit }) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
          trend != null ? /* @__PURE__ */ jsxs("span", { className: cn("inline-flex items-center gap-0.5 font-medium", trendColor), children: [
            /* @__PURE__ */ jsx(TrendIcon, { className: "h-3 w-3", "aria-hidden": "true" }),
            Math.abs(trend).toFixed(1),
            "%"
          ] }) : null,
          description ? /* @__PURE__ */ jsx("span", { className: "text-muted-fg", children: description }) : null
        ] }),
        sparkline && sparkline.length > 1 ? /* @__PURE__ */ jsx(Sparkline, { data: sparkline }) : null
      ]
    }
  );
}
function Sparkline({ data, className }) {
  const w = 120;
  const h = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - (v - min) / range * h}`).join(" ");
  return /* @__PURE__ */ jsx(
    "svg",
    {
      viewBox: `0 0 ${w} ${h}`,
      className: cn("h-8 w-full text-primary", className),
      role: "img",
      "aria-label": `Sparkline trend`,
      children: /* @__PURE__ */ jsx("polyline", { points, fill: "none", stroke: "currentColor", strokeWidth: 2 })
    }
  );
}
function ActivityFeed({
  items,
  className,
  emptyMessage = "No activity yet."
}) {
  if (items.length === 0) {
    return /* @__PURE__ */ jsx("p", { className: cn("p-6 text-center text-sm text-muted-fg", className), children: emptyMessage });
  }
  return /* @__PURE__ */ jsx("ol", { className: cn("flex flex-col", className), children: items.map((it, idx) => /* @__PURE__ */ jsxs("li", { className: "relative flex gap-4 pb-6 last:pb-0", children: [
    idx < items.length - 1 ? /* @__PURE__ */ jsx(
      "span",
      {
        "aria-hidden": "true",
        className: "absolute left-5 top-10 -z-0 h-[calc(100%-2.5rem)] w-px bg-border"
      }
    ) : null,
    /* @__PURE__ */ jsxs(Avatar, { className: "h-10 w-10 shrink-0 ring-2 ring-background", children: [
      it.actor.avatar ? /* @__PURE__ */ jsx(AvatarImage, { src: it.actor.avatar, alt: it.actor.name }) : null,
      /* @__PURE__ */ jsx(AvatarFallback, { children: it.actor.name.slice(0, 2).toUpperCase() })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
        /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: it.actor.name }),
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-muted-fg", children: it.verb }),
        it.target ? /* @__PURE__ */ jsxs(Fragment, { children: [
          " ",
          /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: it.target })
        ] }) : null
      ] }),
      it.meta ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-fg", children: it.meta }) : null,
      /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-2 text-xs text-muted-fg", children: [
        /* @__PURE__ */ jsx("time", { dateTime: it.timestamp, children: formatRelative(it.timestamp) }),
        it.actions
      ] })
    ] })
  ] }, it.id)) });
}
function formatRelative(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const seconds = Math.floor(diff / 1e3);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}
function NotificationCenter({
  notifications,
  onMarkRead,
  onMarkAllRead,
  className
}) {
  const [open, setOpen] = React53.useState(false);
  const ref = React53.useRef(null);
  const unreadCount = notifications.filter((n) => !n.read).length;
  React53.useEffect(() => {
    function close(e) {
      if (open && ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  return /* @__PURE__ */ jsxs("div", { ref, className: cn("relative", className), children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((o) => !o),
        "aria-haspopup": "dialog",
        "aria-expanded": open,
        "aria-label": `Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`,
        className: "relative inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-fg hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ jsx(Bell, { className: "h-5 w-5", "aria-hidden": "true" }),
          unreadCount > 0 ? /* @__PURE__ */ jsx("span", { className: "absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-destructive px-1 text-[0.6rem] font-medium text-destructive-fg", children: unreadCount > 99 ? "99+" : unreadCount }) : null
        ]
      }
    ),
    open ? /* @__PURE__ */ jsxs(
      "div",
      {
        role: "dialog",
        "aria-label": "Notifications",
        className: "absolute right-0 top-full z-30 mt-2 w-80 rounded-md border border-border bg-background shadow-lg",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border p-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold", children: "Notifications" }),
            unreadCount > 0 && onMarkAllRead ? /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", onClick: onMarkAllRead, children: [
              /* @__PURE__ */ jsx(Check, { className: "mr-1 h-3 w-3" }),
              " Mark all read"
            ] }) : null
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "max-h-96 overflow-y-auto", children: notifications.length === 0 ? /* @__PURE__ */ jsx("li", { className: "p-6 text-center text-sm text-muted-fg", children: "No notifications." }) : notifications.map((n) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                if (!n.read) onMarkRead?.(n.id);
                n.onClick?.();
                if (n.href) window.location.href = n.href;
              },
              className: cn(
                "flex w-full items-start gap-3 border-b border-border p-3 text-left transition-colors last:border-0 hover:bg-accent",
                !n.read && "bg-primary/5"
              ),
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      !n.read ? "bg-primary" : "bg-transparent",
                      n.variant === "success" && "bg-success",
                      n.variant === "warning" && "bg-warning",
                      n.variant === "destructive" && "bg-destructive"
                    )
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-foreground", children: n.title }),
                  n.body ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-fg", children: n.body }) : null,
                  /* @__PURE__ */ jsx("time", { dateTime: n.timestamp, className: "text-[0.65rem] text-muted-fg", children: new Date(n.timestamp).toLocaleString() })
                ] })
              ]
            }
          ) }, n.id)) })
        ]
      }
    ) : null
  ] });
}
function useConfetti() {
  return React53.useCallback((options) => {
    confettiLib({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      ...options
    });
  }, []);
}
function ConfettiButton({
  children,
  onClick,
  ...props
}) {
  const fire = useConfetti();
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: (e) => {
        fire();
        onClick?.(e);
      },
      ...props,
      children
    }
  );
}
var tierVariants = cva(
  "inline-flex flex-col items-center gap-1 rounded-lg border p-3 transition-transform hover:scale-105",
  {
    variants: {
      tier: {
        bronze: "border-amber-600/40 bg-amber-100/50 text-amber-900 [.dark_&]:bg-amber-900/20",
        // eslint-disable-next-line no-restricted-syntax -- intentional gamification tier palette (silver = slate; decorative tier color, matches bronze/gold/platinum/legendary siblings, already uses class-based [.dark_&]:)
        silver: "border-slate-400/40 bg-slate-100/50 text-slate-700 [.dark_&]:bg-slate-800/40",
        gold: "border-yellow-500/50 bg-yellow-100/60 text-yellow-900 [.dark_&]:bg-yellow-900/30",
        platinum: "border-cyan-400/40 bg-cyan-50/50 text-cyan-900 [.dark_&]:bg-cyan-900/30",
        legendary: "border-fuchsia-500/40 bg-gradient-to-br from-fuchsia-100 to-purple-100 text-fuchsia-900 [.dark_&]:from-fuchsia-900/30 [.dark_&]:to-purple-900/30"
      }
    },
    defaultVariants: { tier: "bronze" }
  }
);
function AchievementBadge({
  title,
  description,
  icon,
  tier,
  unlocked = true,
  unlockedAt,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "img",
      "aria-label": `${unlocked ? "Unlocked" : "Locked"} ${tier} achievement: ${title}`,
      className: cn(tierVariants({ tier }), !unlocked && "opacity-40 grayscale", className),
      children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl", "aria-hidden": "true", children: icon ?? /* @__PURE__ */ jsx(Award, { className: "h-8 w-8" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: title }),
        description ? /* @__PURE__ */ jsx("span", { className: "text-center text-xs", children: description }) : null,
        unlockedAt ? /* @__PURE__ */ jsx("time", { dateTime: unlockedAt, className: "text-[0.65rem] opacity-70", children: new Date(unlockedAt).toLocaleDateString() }) : null
      ]
    }
  );
}
function OnboardingTour({
  steps,
  active,
  onDismiss,
  onComplete
}) {
  const [idx, setIdx] = React53.useState(0);
  const [rect, setRect] = React53.useState(null);
  const step = steps[idx];
  React53.useEffect(() => {
    if (!active || !step) return;
    const el = document.querySelector(step.targetSelector);
    if (el) {
      setRect(el.getBoundingClientRect());
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [active, step]);
  if (!active || !step || !rect) return null;
  const placement = step.placement ?? "bottom";
  const popoverStyle = {
    position: "fixed",
    zIndex: 60,
    ...placement === "bottom" && { top: rect.bottom + 12, left: rect.left },
    ...placement === "top" && {
      top: rect.top - 12,
      left: rect.left,
      transform: "translateY(-100%)"
    },
    ...placement === "right" && { top: rect.top, left: rect.right + 12 },
    ...placement === "left" && {
      top: rect.top,
      left: rect.left - 12,
      transform: "translateX(-100%)"
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-overlay/40", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none fixed z-50 rounded-md ring-4 ring-primary",
        style: {
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8
        }
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        role: "dialog",
        "aria-labelledby": `tour-title-${step.id}`,
        className: cn("w-80 rounded-md border border-border bg-background p-4 shadow-xl"),
        style: popoverStyle,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsx("h3", { id: `tour-title-${step.id}`, className: "text-sm font-semibold", children: step.title }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => onDismiss?.(),
                "aria-label": "Dismiss tour",
                className: "text-muted-fg hover:text-foreground",
                children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-fg", children: step.description }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-fg", children: [
              idx + 1,
              " / ",
              steps.length
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => setIdx((i) => Math.max(0, i - 1)),
                  disabled: idx === 0,
                  children: "Back"
                }
              ),
              idx < steps.length - 1 ? /* @__PURE__ */ jsx(Button, { size: "sm", onClick: () => setIdx((i) => i + 1), children: "Next" }) : /* @__PURE__ */ jsx(Button, { size: "sm", onClick: onComplete, children: "Finish" })
            ] })
          ] })
        ]
      }
    )
  ] });
}
function KeyboardShortcutsModal({
  groups,
  open,
  onOpenChange
}) {
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-xl", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Keyboard shortcuts" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Press Cmd+/ (Ctrl+/) to toggle this dialog." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-6 sm:grid-cols-2", children: groups.map((g) => /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-fg", children: g.heading }),
      /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-1.5", children: g.shortcuts.map((s, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "text-foreground", children: s.label }),
        /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1", children: s.keys.map((k, j) => /* @__PURE__ */ jsx(
          "kbd",
          {
            className: "rounded border border-border bg-muted px-1.5 py-0.5 text-[0.7rem] font-mono",
            children: k
          },
          j
        )) })
      ] }, i)) })
    ] }, g.heading)) })
  ] }) });
}
function useShortcutsModal() {
  const [open, setOpen] = React53.useState(false);
  React53.useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return { open, setOpen };
}
function MeshGradient({
  className,
  // eslint-disable-next-line no-restricted-syntax -- intentional decorative gradient palette (pure-visual mesh, palette-independent)
  colors = ["#a78bfa", "#60a5fa", "#34d399", "#f472b6"],
  intensity = 0.6
}) {
  const gradients = colors.map((c, i) => {
    const x = [10, 90, 80, 20][i % 4];
    const y = [20, 30, 80, 70][i % 4];
    return `radial-gradient(at ${x}% ${y}%, ${c} 0px, transparent 50%)`;
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      "aria-hidden": "true",
      className: cn("absolute inset-0 -z-10", className),
      style: {
        backgroundImage: gradients.join(","),
        opacity: intensity,
        filter: "blur(60px)"
      }
    }
  );
}
function AuroraBackground({ className }) {
  return /* @__PURE__ */ jsxs("div", { "aria-hidden": "true", className: cn("absolute inset-0 -z-10 overflow-hidden", className), children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute -inset-[10%] motion-safe:animate-[aurora_18s_ease-in-out_infinite_alternate]",
        style: {
          background: (
            // eslint-disable-next-line no-restricted-syntax -- intentional decorative gradient palette (pure-visual aurora, palette-independent)
            "conic-gradient(from 180deg at 50% 50%, #38bdf8 0deg, #818cf8 120deg, #f472b6 240deg, #38bdf8 360deg)"
          ),
          filter: "blur(80px)",
          opacity: 0.4
        }
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `@keyframes aurora { from { transform: rotate(0deg) scale(1); } to { transform: rotate(360deg) scale(1.2); } }` })
  ] });
}
function DotGrid({
  className,
  size = 24,
  dotSize = 1,
  color = "currentColor"
}) {
  const bg = `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`;
  return /* @__PURE__ */ jsx(
    "div",
    {
      "aria-hidden": "true",
      className: cn("absolute inset-0 -z-10 text-muted-fg/40", className),
      style: {
        backgroundImage: bg,
        backgroundSize: `${size}px ${size}px`
      }
    }
  );
}
function NoiseOverlay({
  className,
  opacity = 0.04
}) {
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/></filter><rect width="200" height="200" filter="url(#n)"/></svg>`
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      "aria-hidden": "true",
      className: cn("pointer-events-none absolute inset-0", className),
      style: {
        backgroundImage: `url("data:image/svg+xml,${svg}")`,
        mixBlendMode: "overlay",
        opacity
      }
    }
  );
}
function TiltCard({
  children,
  className,
  intensity = 12,
  ...props
}) {
  const ref = React53.useRef(null);
  function onMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg)`;
  }
  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      onMouseMove,
      onMouseLeave,
      className: cn("transition-transform duration-200 will-change-transform", className),
      ...props,
      children
    }
  );
}
var bannerVariants = cva("relative flex items-start gap-3 rounded-md border p-3 text-sm", {
  variants: {
    tone: {
      info: "border-info/40 bg-info/10 text-info",
      success: "border-success/40 bg-success/10 text-success",
      warning: "border-warning/40 bg-warning/10 text-warning",
      destructive: "border-destructive/40 bg-destructive/10 text-destructive",
      neutral: "border-border bg-muted/30 text-foreground"
    }
  },
  defaultVariants: { tone: "info" }
});
var ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  destructive: AlertCircle,
  neutral: Info
};
function Banner({
  tone = "info",
  title,
  dismissible,
  onDismiss,
  children,
  className,
  ...props
}) {
  const Icon = ICONS[tone ?? "info"];
  return /* @__PURE__ */ jsxs("div", { role: "status", className: cn(bannerVariants({ tone }), className), ...props, children: [
    /* @__PURE__ */ jsx(Icon, { className: "mt-0.5 h-4 w-4 shrink-0", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      title ? /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: title }) : null,
      /* @__PURE__ */ jsx("div", { className: "text-foreground/80", children })
    ] }),
    dismissible ? /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onDismiss,
        "aria-label": "Dismiss banner",
        className: "text-muted-fg hover:text-foreground",
        children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4", "aria-hidden": "true" })
      }
    ) : null
  ] });
}
function LottiePlayer({ src, data, ariaLabel, className, ...rest }) {
  const [animation, setAnimation] = React53.useState(data ?? null);
  const reducedMotion = React53.useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  React53.useEffect(() => {
    if (data || !src) return;
    let cancelled = false;
    fetch(src).then((r) => r.json()).then((j) => {
      if (!cancelled) setAnimation(j);
    }).catch(() => {
    });
    return () => {
      cancelled = true;
    };
  }, [data, src]);
  if (!animation) {
    return /* @__PURE__ */ jsx("div", { role: "img", "aria-label": ariaLabel, className: cn("animate-pulse bg-muted", className) });
  }
  return /* @__PURE__ */ jsx("div", { role: "img", "aria-label": ariaLabel, className, children: /* @__PURE__ */ jsx(Lottie, { animationData: animation, loop: !reducedMotion, autoplay: !reducedMotion, ...rest }) });
}
function EChartsCard({
  option,
  height = 320,
  loading,
  className,
  onEvents,
  ariaLabel = "Chart"
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "img",
      "aria-label": ariaLabel,
      className: cn("rounded-md border border-border bg-background p-2", className),
      children: /* @__PURE__ */ jsx(
        ReactECharts,
        {
          option,
          style: { height, width: "100%" },
          showLoading: loading,
          notMerge: true,
          lazyUpdate: true,
          onEvents
        }
      )
    }
  );
}
var echartsPresets = {
  line(data) {
    return {
      tooltip: { trigger: "axis" },
      legend: { data: data.series.map((s) => s.name) },
      xAxis: { type: "category", data: data.x },
      yAxis: { type: "value" },
      series: data.series.map((s) => ({
        name: s.name,
        type: "line",
        smooth: true,
        data: s.values
      }))
    };
  },
  bar(data) {
    return {
      tooltip: { trigger: "axis" },
      legend: {},
      xAxis: { type: "category", data: data.x },
      yAxis: { type: "value" },
      series: data.series.map((s) => ({ name: s.name, type: "bar", data: s.values }))
    };
  },
  pie(data) {
    return {
      tooltip: { trigger: "item" },
      legend: { orient: "vertical", right: 0 },
      series: [{ type: "pie", radius: ["40%", "70%"], data }]
    };
  },
  heatmap(data) {
    return {
      tooltip: { position: "top" },
      grid: { height: "70%" },
      xAxis: { type: "category", data: data.x },
      yAxis: { type: "category", data: data.y },
      visualMap: {
        min: 0,
        max: 100,
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: 0
      },
      series: [{ type: "heatmap", data: data.values, label: { show: true } }]
    };
  },
  sankey(data) {
    return {
      tooltip: {},
      series: [
        { type: "sankey", data: data.nodes, links: data.links, emphasis: { focus: "adjacency" } }
      ]
    };
  },
  funnel(data) {
    return {
      tooltip: { trigger: "item" },
      series: [{ type: "funnel", sort: "descending", data }]
    };
  },
  treemap(data) {
    return {
      tooltip: {},
      series: [
        {
          type: "treemap",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data,
          label: { show: true },
          breadcrumb: { show: true }
        }
      ]
    };
  },
  radar(data) {
    return {
      tooltip: {},
      legend: {},
      radar: { indicator: data.indicator },
      series: [{ type: "radar", data: data.series }]
    };
  },
  gauge(value, max = 100) {
    return {
      series: [
        {
          type: "gauge",
          progress: { show: true },
          detail: { valueAnimation: true, formatter: "{value}" },
          data: [{ value }],
          max
        }
      ]
    };
  }
};
function Sparkline2({
  data,
  width = 120,
  height = 32,
  stroke = "currentColor",
  fill = "none",
  showPoints = false,
  showMinMax = false,
  className,
  ariaLabel = "Sparkline trend"
}) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => ({ x: i * stepX, y: height - (v - min) / range * height }));
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `M0,${height} L${polyline} L${width},${height} Z`;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      role: "img",
      "aria-label": ariaLabel,
      viewBox: `0 0 ${width} ${height}`,
      className: cn("inline-block align-middle", className),
      width,
      height,
      children: [
        fill !== "none" ? /* @__PURE__ */ jsx("path", { d: area, fill, opacity: 0.2 }) : null,
        /* @__PURE__ */ jsx(
          "polyline",
          {
            points: polyline,
            fill: "none",
            stroke,
            strokeWidth: 2,
            strokeLinejoin: "round"
          }
        ),
        showPoints ? points.map((p, i) => /* @__PURE__ */ jsx("circle", { cx: p.x, cy: p.y, r: 1.5, fill: stroke }, i)) : null,
        showMinMax ? (() => {
          const minIdx = data.indexOf(min);
          const maxIdx = data.indexOf(max);
          return /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "circle",
              {
                cx: points[minIdx].x,
                cy: points[minIdx].y,
                r: 2.5,
                fill: "oklch(0.6 0.22 22)"
              }
            ),
            /* @__PURE__ */ jsx(
              "circle",
              {
                cx: points[maxIdx].x,
                cy: points[maxIdx].y,
                r: 2.5,
                fill: "oklch(0.65 0.16 145)"
              }
            )
          ] });
        })() : null
      ]
    }
  );
}
function WinLossSparkline({
  data,
  className,
  ariaLabel = "Win/loss"
}) {
  const W = 6;
  const H = 16;
  const gap = 1;
  return /* @__PURE__ */ jsx(
    "svg",
    {
      role: "img",
      "aria-label": ariaLabel,
      className: cn("inline-block", className),
      width: (W + gap) * data.length,
      height: H,
      children: data.map((d, i) => {
        const fill = d === "win" ? "oklch(0.65 0.16 145)" : d === "loss" ? "oklch(0.6 0.22 22)" : "oklch(0.7 0.012 252)";
        const y = d === "win" ? 0 : d === "loss" ? H / 2 : H / 4;
        const h = d === "tie" ? H / 2 : H / 2;
        return /* @__PURE__ */ jsx("rect", { x: i * (W + gap), y, width: W, height: h, fill }, i);
      })
    }
  );
}
var TONE_VAR = {
  primary: "oklch(0.55 0.18 264)",
  success: "oklch(0.65 0.16 145)",
  warning: "oklch(0.78 0.16 80)",
  destructive: "oklch(0.6 0.22 22)"
};
function RadialGauge({
  value,
  max = 100,
  min = 0,
  label,
  unit,
  size = 160,
  thickness = 14,
  variant = "semi",
  tone = "primary",
  className
}) {
  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = variant === "semi" ? size / 2 + r / 4 : size / 2;
  const startAngle = variant === "semi" ? 180 : 90;
  const endAngle = variant === "semi" ? 0 : 90 - 360;
  const sweepAngle = (endAngle - startAngle) * ratio;
  const trackAngle = endAngle - startAngle;
  const arcPath = (start, sweep) => {
    const startRad = start * Math.PI / 180;
    const endRad = (start + sweep) * Math.PI / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy - r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy - r * Math.sin(endRad);
    const largeArc = Math.abs(sweep) > 180 ? 1 : 0;
    const sweepFlag = sweep > 0 ? 0 : 1;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} ${sweepFlag} ${x2} ${y2}`;
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "img",
      "aria-label": `${label ?? "Gauge"}: ${value}${unit ? ` ${unit}` : ""}`,
      className: cn("inline-flex flex-col items-center", className),
      children: /* @__PURE__ */ jsxs("svg", { width: size, height: variant === "semi" ? size * 0.7 : size, children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: arcPath(startAngle, trackAngle),
            stroke: "oklch(0.92 0.008 252)",
            strokeWidth: thickness,
            fill: "none",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: arcPath(startAngle, sweepAngle),
            stroke: TONE_VAR[tone],
            strokeWidth: thickness,
            fill: "none",
            strokeLinecap: "round",
            style: { transition: "stroke-dasharray 0.6s ease-out" }
          }
        ),
        /* @__PURE__ */ jsxs(
          "text",
          {
            x: cx,
            y: cy + 8,
            textAnchor: "middle",
            className: "fill-foreground",
            style: { fontSize: size / 6, fontWeight: 600 },
            children: [
              value,
              unit ? /* @__PURE__ */ jsxs("tspan", { style: { fontSize: size / 12, opacity: 0.6 }, children: [
                " ",
                unit
              ] }) : null
            ]
          }
        ),
        label ? /* @__PURE__ */ jsx(
          "text",
          {
            x: cx,
            y: cy + 30,
            textAnchor: "middle",
            className: "fill-muted-fg",
            style: { fontSize: size / 14 },
            children: label
          }
        ) : null
      ] })
    }
  );
}
function ActivityRing({ rings, size = 140, thickness = 12, className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      role: "img",
      "aria-label": rings.map((r) => `${r.label ?? "Ring"}: ${Math.round(r.value / r.max * 100)}%`).join(", "),
      width: size,
      height: size,
      className: cn("inline-block", className),
      children: rings.map((ring, idx) => {
        const r = (size - thickness) / 2 - idx * (thickness + 2);
        const c = 2 * Math.PI * r;
        const ratio = Math.max(0, Math.min(1, ring.value / ring.max));
        return /* @__PURE__ */ jsxs("g", { transform: `rotate(-90 ${size / 2} ${size / 2})`, children: [
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: size / 2,
              cy: size / 2,
              r,
              fill: "none",
              stroke: ring.color,
              strokeOpacity: 0.18,
              strokeWidth: thickness
            }
          ),
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: size / 2,
              cy: size / 2,
              r,
              fill: "none",
              stroke: ring.color,
              strokeWidth: thickness,
              strokeLinecap: "round",
              strokeDasharray: `${c * ratio} ${c}`,
              style: { transition: "stroke-dasharray 0.6s ease-out" }
            }
          )
        ] }, idx);
      })
    }
  );
}
function LinearGauge({
  value,
  max = 100,
  label,
  segments,
  tone = "primary",
  className
}) {
  const ratio = Math.max(0, Math.min(1, value / max));
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "progressbar",
      "aria-valuenow": value,
      "aria-valuemin": 0,
      "aria-valuemax": max,
      "aria-label": label,
      className: cn("flex flex-col gap-1", className),
      children: [
        label ? /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs", children: [
          /* @__PURE__ */ jsx("span", { children: label }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            value,
            " / ",
            max
          ] })
        ] }) : null,
        /* @__PURE__ */ jsxs("div", { className: "relative h-2 w-full overflow-hidden rounded-full bg-muted", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full rounded-full transition-all duration-500",
              style: { width: `${ratio * 100}%`, background: TONE_VAR[tone] }
            }
          ),
          segments ? Array.from({ length: segments - 1 }).map((_, i) => /* @__PURE__ */ jsx(
            "span",
            {
              "aria-hidden": "true",
              className: "absolute top-0 h-full w-px bg-background",
              style: { left: `${(i + 1) / segments * 100}%` }
            },
            i
          )) : null
        ] })
      ]
    }
  );
}
function NetworkGraph({
  nodes,
  edges,
  layout = "cose",
  height = 400,
  className,
  ariaLabel = "Network graph"
}) {
  const elements = React53.useMemo(
    () => [
      ...nodes.map((n) => ({
        data: { id: n.id, label: n.label ?? n.id, group: n.group ?? "default" },
        ...n.size ? { style: { width: n.size, height: n.size } } : {}
      })),
      ...edges.map((e) => ({
        data: { id: e.id, source: e.source, target: e.target, label: e.label ?? "" }
      }))
    ],
    [nodes, edges]
  );
  const stylesheet = React53.useMemo(
    () => [
      {
        selector: "node",
        style: {
          "background-color": "oklch(0.55 0.18 264)",
          label: "data(label)",
          color: "oklch(0.99 0 0)",
          "text-valign": "center",
          "text-halign": "center",
          "font-size": 10,
          width: 32,
          height: 32
        }
      },
      {
        selector: "edge",
        style: {
          width: 2,
          "line-color": "oklch(0.65 0.05 252)",
          "curve-style": "bezier",
          "target-arrow-shape": "triangle",
          "target-arrow-color": "oklch(0.65 0.05 252)"
        }
      }
    ],
    []
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "img",
      "aria-label": ariaLabel,
      className: cn("rounded-md border border-border bg-background", className),
      children: /* @__PURE__ */ jsx(
        CytoscapeComponent,
        {
          elements,
          layout: { name: layout, animate: true },
          stylesheet,
          style: { width: "100%", height }
        }
      )
    }
  );
}
function FormWizard({
  steps,
  initial,
  onComplete,
  onSaveDraft,
  draft,
  className,
  title
}) {
  const [state, setState] = React53.useState(draft ?? initial);
  const [current, setCurrent] = React53.useState(0);
  const [errors, setErrors] = React53.useState({});
  const update = (patch) => setState((s) => ({ ...s, ...patch }));
  const step = steps[current];
  function next() {
    const err = step.validate?.(state);
    if (err) {
      setErrors((e) => ({ ...e, [current]: err }));
      return;
    }
    setErrors((e) => {
      const next2 = { ...e };
      delete next2[current];
      return next2;
    });
    if (current < steps.length - 1) setCurrent((c) => c + 1);
    else onComplete(state);
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-4", className), children: [
    /* @__PURE__ */ jsx(
      Stepper,
      {
        steps: steps.map((s) => ({
          id: s.id,
          label: s.label,
          description: s.description,
          optional: s.optional
        })),
        current,
        onStepClick: (i) => i < current && setCurrent(i)
      }
    ),
    /* @__PURE__ */ jsxs(Card, { children: [
      title ? /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: title }) }) : null,
      /* @__PURE__ */ jsxs(CardContent, { children: [
        step.render(state, update),
        errors[current] ? /* @__PURE__ */ jsx(
          "p",
          {
            role: "alert",
            className: "mt-2 rounded-md bg-destructive/10 p-2 text-sm text-destructive",
            children: errors[current]
          }
        ) : null
      ] }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setCurrent((c) => Math.max(0, c - 1)),
              disabled: current === 0,
              children: "Back"
            }
          ),
          onSaveDraft ? /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: () => onSaveDraft(state), children: "Save draft" }) : null
        ] }),
        /* @__PURE__ */ jsx(Button, { onClick: next, children: current < steps.length - 1 ? "Next" : "Submit" })
      ] })
    ] })
  ] });
}
function PhoneInputField({
  value,
  onChange,
  defaultCountry = "it",
  className
}) {
  return /* @__PURE__ */ jsx(
    PhoneInput,
    {
      defaultCountry,
      value,
      onChange: (v) => onChange(v),
      className: cn("phone-input-wrapper", className),
      inputClassName: "!h-10 !rounded-md !border !border-input !bg-background !px-3 !py-2 !text-sm"
    }
  );
}
function MoneyInput({
  value,
  onChange,
  currency = "EUR",
  locale = "it-IT",
  className,
  ...rest
}) {
  const [text, setText] = React53.useState(
    () => value != null ? formatMoney(value, locale, currency) : ""
  );
  function formatMoney(n, l, c) {
    return new Intl.NumberFormat(l, { style: "currency", currency: c }).format(n);
  }
  return /* @__PURE__ */ jsx(
    Input,
    {
      ...rest,
      type: "text",
      value: text,
      onChange: (e) => setText(e.target.value),
      onBlur: () => {
        const cleaned = text.replace(/[^\d,.-]/g, "").replace(",", ".");
        const num = parseFloat(cleaned);
        if (Number.isFinite(num)) {
          onChange(num);
          setText(formatMoney(num, locale, currency));
        } else {
          onChange(null);
        }
      },
      className: cn(className),
      inputMode: "decimal"
    }
  );
}
function IbanInput({
  value,
  onChange,
  className,
  ...rest
}) {
  const formatted = value.replace(/\s+/g, "").toUpperCase().replace(/(.{4})/g, "$1 ").trim();
  const isValid = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(value.replace(/\s+/g, ""));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        ...rest,
        value: formatted,
        onChange: (e) => onChange(e.target.value.replace(/\s+/g, "").toUpperCase()),
        className: cn("font-mono", className),
        "aria-invalid": value.length > 0 && !isValid
      }
    ),
    value.length > 0 && !isValid ? /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: "Invalid IBAN format" }) : null
  ] });
}
function TaxIdInput({
  value,
  onChange,
  variant = "cf",
  className,
  ...rest
}) {
  const cleaned = value.toUpperCase().replace(/\s+/g, "");
  const isValid = variant === "cf" ? /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/.test(cleaned) : /^IT\d{11}$/.test(cleaned);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        ...rest,
        value: cleaned,
        onChange: (e) => onChange(e.target.value.toUpperCase()),
        className: cn("font-mono uppercase", className),
        "aria-invalid": value.length > 0 && !isValid
      }
    ),
    value.length > 0 && !isValid ? /* @__PURE__ */ jsxs("p", { className: "text-xs text-destructive", children: [
      "Invalid ",
      variant === "cf" ? "codice fiscale" : "VAT",
      " format"
    ] }) : null
  ] });
}
function OtpInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled,
  className,
  ariaLabel = "One-time password"
}) {
  const refs = React53.useRef([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? "");
  function setChar(idx, ch) {
    const arr = chars.slice();
    arr[idx] = ch;
    const next = arr.join("").slice(0, length);
    onChange(next);
    if (next.length === length) onComplete?.(next);
  }
  return /* @__PURE__ */ jsx("div", { role: "group", "aria-label": ariaLabel, className: cn("flex gap-1.5", className), children: Array.from({ length }).map((_, i) => /* @__PURE__ */ jsx(
    "input",
    {
      ref: (el) => {
        refs.current[i] = el;
      },
      type: "text",
      inputMode: "numeric",
      autoComplete: "one-time-code",
      maxLength: 1,
      value: chars[i],
      disabled,
      onChange: (e) => {
        const ch = e.target.value.replace(/\D/g, "").slice(-1);
        setChar(i, ch);
        if (ch && i < length - 1) refs.current[i + 1]?.focus();
      },
      onKeyDown: (e) => {
        if (e.key === "Backspace" && !chars[i] && i > 0) {
          refs.current[i - 1]?.focus();
        }
        if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
        if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus();
      },
      onPaste: (e) => {
        const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        if (txt) {
          e.preventDefault();
          onChange(txt);
          if (txt.length === length) onComplete?.(txt);
          refs.current[Math.min(txt.length, length - 1)]?.focus();
        }
      },
      className: cn(
        "h-12 w-10 rounded-md border border-input bg-background text-center text-lg font-semibold",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        disabled && "opacity-50"
      ),
      "aria-label": `Digit ${i + 1}`
    },
    i
  )) });
}
function PasswordStrengthMeter({
  password,
  userInputs = [],
  className
}) {
  const result = React53.useMemo(() => {
    if (!password) return null;
    return zxcvbn(password, userInputs);
  }, [password, userInputs]);
  const score = result?.score ?? 0;
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "oklch(0.6 0.22 22)",
    "oklch(0.7 0.2 40)",
    "oklch(0.78 0.16 80)",
    "oklch(0.7 0.18 145)",
    "oklch(0.65 0.18 145)"
  ];
  if (!password) return null;
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-1", className), "aria-live": "polite", children: [
    /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx(
      "span",
      {
        "aria-hidden": "true",
        className: "h-1 flex-1 rounded-full transition-colors",
        style: {
          background: i <= score ? colors[score] : "oklch(0.92 0.008 252)"
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs", children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium", style: { color: colors[score] }, children: labels[score] }),
      result?.feedback.warning ? /* @__PURE__ */ jsx("span", { className: "text-muted-fg", children: result.feedback.warning }) : null
    ] }),
    result?.feedback.suggestions.length ? /* @__PURE__ */ jsx("ul", { className: "text-xs text-muted-fg", children: result.feedback.suggestions.map((s, i) => /* @__PURE__ */ jsx("li", { children: s }, i)) }) : null
  ] });
}
var SignaturePad = SignaturePadLib;
function SignaturePadField({
  onSave,
  width = 400,
  height = 160,
  className,
  ariaLabel = "Signature pad"
}) {
  const ref = React53.useRef(null);
  const [empty, setEmpty] = React53.useState(true);
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-2", className), role: "group", "aria-label": ariaLabel, children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-md border border-input bg-background", children: /* @__PURE__ */ jsx(
      SignaturePad,
      {
        ref,
        canvasProps: { width, height, className: "rounded-md", "aria-label": ariaLabel },
        onEnd: () => setEmpty(false)
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: "outline",
          type: "button",
          onClick: () => {
            ref.current?.clear();
            setEmpty(true);
          },
          children: "Clear"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          type: "button",
          disabled: empty,
          onClick: () => {
            const url = ref.current?.toDataURL("image/png");
            if (url) onSave?.(url);
          },
          children: "Save signature"
        }
      )
    ] })
  ] });
}
function FileDropzone({
  accept,
  multiple = true,
  maxSize,
  onFiles,
  files = [],
  onRemove,
  className,
  label = "Drop files here or click to browse"
}) {
  const [over, setOver] = React53.useState(false);
  const inputRef = React53.useRef(null);
  function handleFiles(list) {
    if (!list) return;
    const arr = Array.from(list);
    const ok = maxSize ? arr.filter((f) => f.size <= maxSize) : arr;
    onFiles(ok);
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-2", className), children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => inputRef.current?.click(),
        onDragOver: (e) => {
          e.preventDefault();
          setOver(true);
        },
        onDragLeave: () => setOver(false),
        onDrop: (e) => {
          e.preventDefault();
          setOver(false);
          handleFiles(e.dataTransfer.files);
        },
        className: cn(
          "flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 text-center text-sm transition-colors",
          over ? "border-primary bg-primary/5" : "border-border bg-muted/20 hover:bg-muted/40"
        ),
        "aria-label": label,
        children: [
          /* @__PURE__ */ jsx(Upload, { className: "h-8 w-8 text-muted-fg", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: label }),
          accept ? /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-fg", children: accept }) : null,
          maxSize ? /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-fg", children: [
            "Max ",
            (maxSize / 1024 / 1024).toFixed(0),
            " MB per file"
          ] }) : null
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: inputRef,
        type: "file",
        accept,
        multiple,
        onChange: (e) => handleFiles(e.target.files),
        className: "sr-only"
      }
    ),
    files.length > 0 ? /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-1.5", children: files.map(({ file, progress, error }) => /* @__PURE__ */ jsxs(
      "li",
      {
        className: "flex items-center gap-3 rounded-md border border-border p-2 text-sm",
        children: [
          /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 shrink-0 text-muted-fg", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "truncate", children: file.name }),
              /* @__PURE__ */ jsxs("span", { className: "shrink-0 text-xs text-muted-fg", children: [
                (file.size / 1024).toFixed(1),
                " KB"
              ] })
            ] }),
            progress != null ? /* @__PURE__ */ jsx("div", { className: "mt-1 h-1 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "h-full bg-primary transition-all",
                style: { width: `${progress}%` }
              }
            ) }) : null,
            error ? /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: error }) : null
          ] }),
          onRemove ? /* @__PURE__ */ jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              onClick: () => onRemove(file),
              "aria-label": `Remove ${file.name}`,
              children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
            }
          ) : null
        ]
      },
      `${file.name}-${file.size}`
    )) }) : null
  ] });
}
function KanbanBoard({
  columns: initialColumns,
  onChange,
  onAddCard,
  className
}) {
  const [columns, setColumns] = React53.useState(initialColumns);
  React53.useEffect(() => setColumns(initialColumns), [initialColumns]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  function handleDragEnd(e) {
    const activeId = e.active.id;
    const overId = e.over?.id;
    if (!overId || activeId === overId) return;
    const activeCol = columns.find((c) => c.cards.some((x) => x.id === activeId));
    const overCol = columns.find((c) => c.id === overId || c.cards.some((x) => x.id === overId));
    if (!activeCol || !overCol) return;
    if (activeCol.id === overCol.id) {
      const oldIdx = activeCol.cards.findIndex((x) => x.id === activeId);
      const newIdx = activeCol.cards.findIndex((x) => x.id === overId);
      const next = columns.map(
        (c) => c.id === activeCol.id ? { ...c, cards: arrayMove(c.cards, oldIdx, newIdx) } : c
      );
      setColumns(next);
      onChange(next);
    } else {
      const card = activeCol.cards.find((x) => x.id === activeId);
      const next = columns.map((c) => {
        if (c.id === activeCol.id) return { ...c, cards: c.cards.filter((x) => x.id !== activeId) };
        if (c.id === overCol.id) return { ...c, cards: [...c.cards, card] };
        return c;
      });
      setColumns(next);
      onChange(next);
    }
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex gap-4 overflow-x-auto pb-4", className),
      role: "list",
      "aria-label": "Kanban board",
      children: /* @__PURE__ */ jsx(DndContext, { sensors, collisionDetection: closestCorners, onDragEnd: handleDragEnd, children: columns.map((col) => /* @__PURE__ */ jsx(
        KanbanColumnView,
        {
          column: col,
          onAddCard: onAddCard ? () => onAddCard(col.id) : void 0
        },
        col.id
      )) })
    }
  );
}
function KanbanColumnView({ column, onAddCard }) {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      role: "listitem",
      "aria-label": `${column.title}, ${column.cards.length} cards`,
      className: "flex w-72 shrink-0 flex-col gap-2 rounded-md bg-muted/40 p-3",
      children: [
        /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs(
            "h3",
            {
              className: "text-sm font-semibold",
              style: column.color ? { color: column.color } : void 0,
              children: [
                column.title,
                /* @__PURE__ */ jsx("span", { className: "ml-2 rounded-full bg-background px-1.5 py-0.5 text-xs text-muted-fg", children: column.cards.length })
              ]
            }
          ),
          onAddCard ? /* @__PURE__ */ jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              onClick: onAddCard,
              "aria-label": `Add card to ${column.title}`,
              children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4", "aria-hidden": "true" })
            }
          ) : null
        ] }),
        /* @__PURE__ */ jsx(SortableContext, { items: column.cards.map((c) => c.id), strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-2", children: column.cards.map((c) => /* @__PURE__ */ jsx(SortableCardItem, { card: c }, c.id)) }) })
      ]
    }
  );
}
function SortableCardItem({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  return /* @__PURE__ */ jsx("li", { ref: setNodeRef, style, children: /* @__PURE__ */ jsx(Card, { className: "p-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        ...attributes,
        ...listeners,
        "aria-label": `Drag card: ${card.title}`,
        className: "cursor-grab text-muted-fg hover:text-foreground active:cursor-grabbing",
        children: /* @__PURE__ */ jsx(GripVertical, { className: "h-4 w-4", "aria-hidden": "true" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium", children: card.title }),
      card.description ? /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-fg", children: card.description }) : null,
      /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-2 text-xs", children: [
        card.badge,
        card.meta,
        card.assignee ? /* @__PURE__ */ jsx("span", { className: "ml-auto text-muted-fg", children: card.assignee.name }) : null
      ] })
    ] })
  ] }) }) });
}
var toneClass = {
  primary: "bg-primary text-primary-fg",
  success: "bg-success text-success-fg",
  warning: "bg-warning text-warning-fg",
  destructive: "bg-destructive text-destructive-fg",
  muted: "bg-muted text-muted-fg"
};
function Timeline({
  events,
  className,
  emptyMessage = "No events."
}) {
  if (events.length === 0) {
    return /* @__PURE__ */ jsx("p", { className: cn("p-6 text-center text-sm text-muted-fg", className), children: emptyMessage });
  }
  return /* @__PURE__ */ jsx("ol", { className: cn("relative ml-4 border-l border-border", className), children: events.map((e) => /* @__PURE__ */ jsxs("li", { className: "relative pb-6 pl-6", children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        "aria-hidden": "true",
        className: cn(
          "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-background",
          toneClass[e.tone ?? "primary"]
        ),
        children: e.icon ?? /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-current" })
      }
    ),
    /* @__PURE__ */ jsx("time", { dateTime: e.time, className: "text-xs text-muted-fg", children: new Date(e.time).toLocaleString() }),
    /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium", children: e.title }),
    e.description ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-fg", children: e.description }) : null
  ] }, e.id)) });
}
function CommentThread({
  comments,
  onReply,
  onReact,
  className,
  depth = 0
}) {
  return /* @__PURE__ */ jsx("ul", { className: cn("flex flex-col gap-3", className), children: comments.map((c) => /* @__PURE__ */ jsx(CommentItem, { comment: c, onReply, onReact, depth }, c.id)) });
}
function CommentItem({
  comment,
  onReply,
  onReact,
  depth
}) {
  const [replying, setReplying] = React53.useState(false);
  const [text, setText] = React53.useState("");
  return /* @__PURE__ */ jsxs("li", { className: cn("flex gap-3", depth > 0 && "ml-10"), children: [
    /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8 shrink-0", children: [
      comment.author.avatar ? /* @__PURE__ */ jsx(AvatarImage, { src: comment.author.avatar, alt: comment.author.name }) : null,
      /* @__PURE__ */ jsx(AvatarFallback, { children: comment.author.name.slice(0, 2).toUpperCase() })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2 text-sm", children: [
        /* @__PURE__ */ jsx("strong", { children: comment.author.name }),
        /* @__PURE__ */ jsx("time", { dateTime: comment.timestamp, className: "text-xs text-muted-fg", children: new Date(comment.timestamp).toLocaleString() })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 whitespace-pre-wrap text-sm", children: renderMentions(comment.body) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-2 text-xs", children: [
        onReact ? /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", onClick: () => onReact(comment.id, "\u2764\uFE0F"), children: [
          /* @__PURE__ */ jsx(Heart, { className: "mr-1 h-3 w-3" }),
          comment.reactions?.["\u2764\uFE0F"] ?? 0
        ] }) : null,
        onReact ? /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", onClick: () => onReact(comment.id, "\u{1F60A}"), children: [
          /* @__PURE__ */ jsx(Smile, { className: "mr-1 h-3 w-3" }),
          comment.reactions?.["\u{1F60A}"] ?? 0
        ] }) : null,
        onReply ? /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", onClick: () => setReplying((r) => !r), children: [
          /* @__PURE__ */ jsx(Reply, { className: "mr-1 h-3 w-3" }),
          "Reply"
        ] }) : null
      ] }),
      replying && onReply ? /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            if (text.trim()) {
              onReply(comment.id, text.trim());
              setText("");
              setReplying(false);
            }
          },
          className: "mt-2 flex gap-2",
          children: [
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: text,
                onChange: (e) => setText(e.target.value),
                placeholder: "Write a reply (use @ to mention)\u2026",
                className: "flex-1 rounded-md border border-input bg-background p-2 text-sm",
                rows: 2,
                "aria-label": "Reply"
              }
            ),
            /* @__PURE__ */ jsx(Button, { size: "sm", type: "submit", children: "Post" })
          ]
        }
      ) : null,
      comment.replies && comment.replies.length > 0 ? /* @__PURE__ */ jsx(
        CommentThread,
        {
          comments: comment.replies,
          onReply,
          onReact,
          depth: depth + 1,
          className: "mt-3"
        }
      ) : null
    ] })
  ] });
}
function renderMentions(body) {
  const parts = body.split(/(@\w+)/g);
  return parts.map(
    (p, i) => p.startsWith("@") ? /* @__PURE__ */ jsx("span", { className: "rounded bg-primary/10 px-1 font-medium text-primary", children: p }, i) : /* @__PURE__ */ jsx(React53.Fragment, { children: p }, i)
  );
}
function CalendarGrid({
  month,
  year,
  events = [],
  selected,
  onSelectDate,
  className
}) {
  const firstDay = new Date(year, month, 1);
  const startWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ iso, day: d });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  const eventsByIso = React53.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const e of events) {
      const arr = map.get(e.date) ?? [];
      arr.push(e);
      map.set(e.date, arr);
    }
    return map;
  }, [events]);
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("rounded-md border border-border bg-background p-3", className),
      role: "grid",
      "aria-label": `Calendar ${year}-${month + 1}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-fg", children: dayLabels.map((d) => /* @__PURE__ */ jsx("div", { children: d }, d)) }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 grid grid-cols-7 gap-1", children: cells.map((cell, i) => {
          if (!cell) return /* @__PURE__ */ jsx("div", {}, i);
          const evs = eventsByIso.get(cell.iso) ?? [];
          const isSelected = cell.iso === selected;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              role: "gridcell",
              "aria-selected": isSelected,
              onClick: () => onSelectDate?.(cell.iso),
              className: cn(
                "flex aspect-square flex-col items-center justify-center gap-1 rounded-md p-1 text-sm transition-colors",
                "hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected && "bg-primary text-primary-fg"
              ),
              children: [
                /* @__PURE__ */ jsx("span", { children: cell.day }),
                evs.length > 0 ? /* @__PURE__ */ jsx("span", { className: "flex gap-0.5", children: evs.slice(0, 3).map((e) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: cn(
                      "h-1 w-1 rounded-full",
                      e.tone === "success" && "bg-success",
                      e.tone === "warning" && "bg-warning",
                      e.tone === "destructive" && "bg-destructive",
                      (!e.tone || e.tone === "primary") && (isSelected ? "bg-primary-fg" : "bg-primary")
                    )
                  },
                  e.id
                )) }) : null
              ]
            },
            cell.iso
          );
        }) })
      ]
    }
  );
}
function VideoPlayer({
  src,
  poster,
  chapters,
  captions,
  className,
  ariaLabel = "Video player"
}) {
  const ref = React53.useRef(null);
  const [playing, setPlaying] = React53.useState(false);
  const [muted, setMuted] = React53.useState(false);
  const [time, setTime] = React53.useState(0);
  const [duration, setDuration] = React53.useState(0);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("rounded-md border border-border bg-background", className),
      role: "region",
      "aria-label": ariaLabel,
      children: [
        /* @__PURE__ */ jsx(
          "video",
          {
            ref,
            src,
            poster,
            className: "w-full rounded-t-md",
            onPlay: () => setPlaying(true),
            onPause: () => setPlaying(false),
            onTimeUpdate: (e) => setTime(e.target.currentTime),
            onLoadedMetadata: (e) => setDuration(e.target.duration),
            onVolumeChange: (e) => setMuted(e.target.muted),
            controls: false,
            children: captions?.map((c) => /* @__PURE__ */ jsx(
              "track",
              {
                kind: "captions",
                src: c.src,
                srcLang: c.srcLang,
                label: c.label,
                default: c.default
              },
              c.srcLang
            ))
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-t border-border p-2", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              onClick: () => playing ? ref.current?.pause() : ref.current?.play(),
              "aria-label": playing ? "Pause" : "Play",
              children: playing ? /* @__PURE__ */ jsx(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Play, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              onClick: () => {
                if (ref.current) ref.current.muted = !ref.current.muted;
              },
              "aria-label": muted ? "Unmute" : "Mute",
              children: muted ? /* @__PURE__ */ jsx(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Volume2, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: duration || 1,
              value: time,
              step: 0.1,
              onChange: (e) => {
                const t = Number(e.target.value);
                if (ref.current) ref.current.currentTime = t;
                setTime(t);
              },
              className: "flex-1",
              "aria-label": "Seek"
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs", children: [
            fmtTime(time),
            " / ",
            fmtTime(duration)
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              onClick: () => ref.current?.requestFullscreen(),
              "aria-label": "Fullscreen",
              children: /* @__PURE__ */ jsx(Maximize2, { className: "h-4 w-4" })
            }
          )
        ] }),
        chapters && chapters.length > 0 ? /* @__PURE__ */ jsx("ul", { className: "border-t border-border p-2 text-xs", children: chapters.map((ch, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              if (ref.current) ref.current.currentTime = ch.start;
            },
            className: "flex w-full items-center gap-2 rounded px-2 py-1 text-left hover:bg-accent",
            children: [
              /* @__PURE__ */ jsx("span", { className: "font-mono text-muted-fg", children: fmtTime(ch.start) }),
              /* @__PURE__ */ jsx("span", { children: ch.title })
            ]
          }
        ) }, i)) }) : null
      ]
    }
  );
}
function fmtTime(s) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}
function QRCodeView({
  value,
  size = 200,
  className,
  ariaLabel,
  level = "M"
}) {
  const [src, setSrc] = React53.useState(null);
  const [error, setError] = React53.useState(null);
  React53.useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(value, { errorCorrectionLevel: level, width: size, margin: 1 }).then((url) => {
      if (!cancelled) setSrc(url);
    }).catch((e) => {
      if (!cancelled) setError(String(e));
    });
    return () => {
      cancelled = true;
    };
  }, [value, level, size]);
  if (error)
    return /* @__PURE__ */ jsx("div", { role: "alert", className: cn("text-xs text-destructive", className), children: error });
  if (!src)
    return /* @__PURE__ */ jsx(
      "div",
      {
        role: "status",
        "aria-label": "Generating QR code",
        className: cn("animate-pulse bg-muted", className),
        style: { width: size, height: size }
      }
    );
  return /* @__PURE__ */ jsx(
    "img",
    {
      src,
      alt: ariaLabel ?? `QR code for ${value}`,
      width: size,
      height: size,
      className: cn("rounded-md", className)
    }
  );
}
function ImageGallery({
  images,
  className,
  columns = 3
}) {
  const [active, setActive] = React53.useState(null);
  React53.useEffect(() => {
    if (active == null) return;
    function onKey(e) {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowLeft") setActive((i) => i > 0 ? i - 1 : i);
      if (e.key === "ArrowRight") setActive((i) => i < images.length - 1 ? i + 1 : i);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length]);
  const colsClass = {
    2: "columns-2",
    3: "columns-2 md:columns-3",
    4: "columns-2 md:columns-4",
    5: "columns-2 md:columns-3 lg:columns-5"
  }[columns];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: cn(colsClass, "gap-3 [&>*]:mb-3 [&>*]:break-inside-avoid", className), children: images.map((img, i) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setActive(i),
        className: "block w-full overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "aria-label": `Open ${img.alt} in lightbox`,
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: img.src,
            alt: img.alt,
            className: "w-full transition-transform hover:scale-105",
            loading: "lazy"
          }
        )
      },
      img.src
    )) }),
    active !== null ? /* @__PURE__ */ jsxs(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": `Lightbox: ${images[active].alt}`,
        className: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-overlay/90 p-4",
        children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              onClick: () => setActive(null),
              "aria-label": "Close lightbox",
              className: "absolute right-4 top-4 text-white hover:bg-white/20",
              children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              onClick: () => setActive(active > 0 ? active - 1 : active),
              disabled: active === 0,
              "aria-label": "Previous image",
              className: "absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-40",
              children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-6 w-6" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              onClick: () => setActive(active < images.length - 1 ? active + 1 : active),
              disabled: active === images.length - 1,
              "aria-label": "Next image",
              className: "absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-40",
              children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-6 w-6" })
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: images[active].src,
              alt: images[active].alt,
              className: "max-h-[90vh] max-w-[90vw] object-contain"
            }
          ),
          images[active].caption ? (
            // eslint-disable-next-line no-restricted-syntax -- intentional text-white over lightbox black scrim (caption on dark overlay)
            /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-prose text-center text-sm text-white/80", children: images[active].caption })
          ) : null,
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-white/60", children: [
            active + 1,
            " / ",
            images.length
          ] })
        ]
      }
    ) : null
  ] });
}
function DiffViewer({
  lines,
  variant = "unified",
  className
}) {
  if (variant === "split") {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "grid grid-cols-2 overflow-hidden rounded-md border border-border font-mono text-xs",
          className
        ),
        children: [
          /* @__PURE__ */ jsx("div", { className: "border-r border-border", children: lines.map((l, i) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "flex gap-2 px-2 py-0.5",
                l.type === "remove" && "bg-destructive/10 text-destructive"
              ),
              children: [
                /* @__PURE__ */ jsx("span", { className: "w-8 select-none text-right text-muted-fg", children: l.oldLine ?? "" }),
                /* @__PURE__ */ jsx("span", { children: l.type !== "add" ? l.content : "" })
              ]
            },
            `a-${i}`
          )) }),
          /* @__PURE__ */ jsx("div", { children: lines.map((l, i) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "flex gap-2 px-2 py-0.5",
                l.type === "add" && "bg-success/10 text-success"
              ),
              children: [
                /* @__PURE__ */ jsx("span", { className: "w-8 select-none text-right text-muted-fg", children: l.newLine ?? "" }),
                /* @__PURE__ */ jsx("span", { children: l.type !== "remove" ? l.content : "" })
              ]
            },
            `b-${i}`
          )) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("overflow-hidden rounded-md border border-border font-mono text-xs", className),
      children: lines.map((l, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            "flex gap-2 px-2 py-0.5",
            l.type === "add" && "bg-success/10 text-success",
            l.type === "remove" && "bg-destructive/10 text-destructive"
          ),
          children: [
            /* @__PURE__ */ jsx("span", { className: "w-8 select-none text-right text-muted-fg", children: l.type === "add" ? "+" : l.type === "remove" ? "-" : " " }),
            /* @__PURE__ */ jsx("span", { className: "w-8 select-none text-right text-muted-fg", children: l.oldLine ?? "" }),
            /* @__PURE__ */ jsx("span", { className: "w-8 select-none text-right text-muted-fg", children: l.newLine ?? "" }),
            /* @__PURE__ */ jsx("span", { className: "flex-1", children: l.content })
          ]
        },
        i
      ))
    }
  );
}
function JsonTree({
  value,
  name,
  depth = 0,
  defaultOpen = true,
  className
}) {
  const [open, setOpen] = React53.useState(defaultOpen);
  if (value === null) {
    return /* @__PURE__ */ jsx(Leaf, { name, type: "null", content: "null", className });
  }
  const t = typeof value;
  if (t === "string")
    return /* @__PURE__ */ jsx(Leaf, { name, type: "string", content: `"${value}"`, className });
  if (t === "number")
    return /* @__PURE__ */ jsx(Leaf, { name, type: "number", content: String(value), className });
  if (t === "boolean")
    return /* @__PURE__ */ jsx(Leaf, { name, type: "boolean", content: String(value), className });
  if (Array.isArray(value)) {
    return /* @__PURE__ */ jsxs("div", { className: cn("font-mono text-xs", className), style: { paddingLeft: depth ? 16 : 0 }, children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setOpen((o) => !o),
          "aria-expanded": open,
          className: "inline-flex items-center gap-1 hover:bg-accent",
          children: [
            /* @__PURE__ */ jsx(
              ChevronRight,
              {
                className: cn("h-3 w-3 transition-transform", open && "rotate-90"),
                "aria-hidden": "true"
              }
            ),
            name ? /* @__PURE__ */ jsxs("span", { className: "text-muted-fg", children: [
              name,
              ": "
            ] }) : null,
            /* @__PURE__ */ jsxs("span", { className: "text-muted-fg", children: [
              "[",
              value.length,
              "]"
            ] })
          ]
        }
      ),
      open ? /* @__PURE__ */ jsx("ol", { className: "pl-4", children: value.map((v, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(JsonTree, { value: v, name: String(i), depth: depth + 1, defaultOpen: false }) }, i)) }) : null
    ] });
  }
  if (t === "object") {
    const entries = Object.entries(value);
    return /* @__PURE__ */ jsxs("div", { className: cn("font-mono text-xs", className), style: { paddingLeft: depth ? 16 : 0 }, children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setOpen((o) => !o),
          "aria-expanded": open,
          className: "inline-flex items-center gap-1 hover:bg-accent",
          children: [
            /* @__PURE__ */ jsx(
              ChevronRight,
              {
                className: cn("h-3 w-3 transition-transform", open && "rotate-90"),
                "aria-hidden": "true"
              }
            ),
            name ? /* @__PURE__ */ jsxs("span", { className: "text-muted-fg", children: [
              name,
              ": "
            ] }) : null,
            /* @__PURE__ */ jsx("span", { className: "text-muted-fg", children: `{${entries.length}}` })
          ]
        }
      ),
      open ? /* @__PURE__ */ jsx("ul", { className: "pl-4", children: entries.map(([k, v]) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(JsonTree, { value: v, name: k, depth: depth + 1, defaultOpen: false }) }, k)) }) : null
    ] });
  }
  return null;
}
function Leaf({
  name,
  type,
  content,
  className
}) {
  const colorClass = {
    string: "text-success",
    number: "text-info",
    boolean: "text-warning",
    null: "text-muted-fg"
  }[type];
  return /* @__PURE__ */ jsxs("span", { className: cn("font-mono text-xs", className), children: [
    name ? /* @__PURE__ */ jsxs("span", { className: "text-muted-fg", children: [
      name,
      ": "
    ] }) : null,
    /* @__PURE__ */ jsx("span", { className: colorClass, children: content })
  ] });
}
async function parseCSV(file, options) {
  const text = typeof file === "string" ? file : await file.text();
  return new Promise((resolve) => {
    Papa.parse(text, {
      header: options?.header ?? true,
      delimiter: options?.delimiter,
      skipEmptyLines: true,
      complete: (res) => resolve({ data: res.data, errors: res.errors.map((e) => e.message) })
    });
  });
}
function exportCSV(rows) {
  return Papa.unparse(rows);
}
async function parseExcel(file) {
  const buf = file instanceof File ? await file.arrayBuffer() : file;
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(buf);
  const out = {};
  wb.eachSheet((ws) => {
    const rows = [];
    let headers = [];
    ws.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      const values = row.values;
      if (rowNumber === 1) {
        headers = values.slice(1).map((v) => String(v ?? ""));
      } else {
        const obj = {};
        headers.forEach((h, i) => {
          obj[h] = values[i + 1];
        });
        rows.push(obj);
      }
    });
    out[ws.name] = rows;
  });
  return out;
}
async function exportExcel(sheets, filename) {
  const wb = new ExcelJS.Workbook();
  for (const [name, rows] of Object.entries(sheets)) {
    const ws = wb.addWorksheet(name);
    if (rows.length > 0) {
      const headers = Object.keys(rows[0]);
      ws.columns = headers.map((h) => ({ header: h, key: h }));
      ws.addRows(rows);
    }
  }
  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
async function parseJSON(file) {
  const text = typeof file === "string" ? file : await file.text();
  return JSON.parse(text);
}
async function parseTOML(file) {
  const text = typeof file === "string" ? file : await file.text();
  return TOML.parse(text);
}
async function parseXML(file) {
  const text = typeof file === "string" ? file : await file.text();
  const parser = new XMLParser({ ignoreAttributes: false });
  return parser.parse(text);
}
function MarkdownView({
  content,
  className,
  components
}) {
  return /* @__PURE__ */ jsx("div", { className: cn("prose prose-sm [.dark_&]:prose-invert max-w-none", className), children: /* @__PURE__ */ jsx(
    ReactMarkdown,
    {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex],
      components,
      children: content
    }
  ) });
}
mermaid.initialize({ startOnLoad: false, theme: "default", securityLevel: "strict" });
function MermaidDiagram({
  source,
  className,
  ariaLabel = "Mermaid diagram"
}) {
  const id = React53.useId().replace(/:/g, "_");
  const [src, setSrc] = React53.useState(null);
  const [error, setError] = React53.useState(null);
  React53.useEffect(() => {
    let cancelled = false;
    mermaid.render(`mmd-${id}`, source).then((res) => {
      if (cancelled) return;
      const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(res.svg)}`;
      setSrc(dataUrl);
    }).catch((e) => {
      if (!cancelled) setError(String(e?.message ?? e));
    });
    return () => {
      cancelled = true;
    };
  }, [id, source]);
  if (error) {
    return /* @__PURE__ */ jsx("pre", { role: "alert", className: "rounded-md bg-destructive/10 p-2 text-xs text-destructive", children: error });
  }
  if (!src) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        role: "status",
        "aria-label": "Rendering diagram",
        className: cn("h-32 animate-pulse rounded-md bg-muted", className)
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "img",
    {
      src,
      alt: ariaLabel,
      className: cn("w-full rounded-md border border-border bg-background p-2", className)
    }
  );
}
var VARIANTS = {
  info: { icon: Info, label: "Info", className: "border-info/40 bg-info/10 text-info" },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    className: "border-warning/40 bg-warning/10 text-warning"
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    className: "border-success/40 bg-success/10 text-success"
  },
  danger: {
    icon: AlertCircle,
    label: "Danger",
    className: "border-destructive/40 bg-destructive/10 text-destructive"
  },
  note: {
    icon: BookOpen,
    label: "Note",
    className: "border-border bg-muted/40 text-foreground"
  },
  quote: {
    icon: Quote,
    label: "Quote",
    className: "border-l-4 border-primary bg-primary/5 text-foreground"
  }
};
function Admonition({
  variant = "info",
  title,
  children,
  className
}) {
  const { icon: Icon, label, className: vClass } = VARIANTS[variant];
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      role: "note",
      className: cn("flex gap-3 rounded-md border p-3 text-sm", vClass, className),
      children: [
        /* @__PURE__ */ jsx(Icon, { className: "mt-0.5 h-4 w-4 shrink-0", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: title ?? label }),
          /* @__PURE__ */ jsx("div", { className: "text-foreground/80", children })
        ] })
      ]
    }
  );
}
function TableOfContents({
  containerSelector = "article",
  className
}) {
  const [items, setItems] = React53.useState([]);
  const [activeId, setActiveId] = React53.useState(null);
  React53.useEffect(() => {
    const el = document.querySelector(containerSelector);
    if (!el) return;
    const headings = el.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const arr = [];
    headings.forEach((h) => {
      if (!h.id) {
        h.id = h.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ?? "";
      }
      arr.push({ id: h.id, level: Number(h.tagName.slice(1)), text: h.textContent ?? "" });
    });
    setItems(arr);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [containerSelector]);
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsxs("nav", { "aria-label": "Table of contents", className: cn("text-sm", className), children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-fg", children: "On this page" }),
    /* @__PURE__ */ jsx("ol", { className: "flex flex-col gap-1", children: items.map((item) => /* @__PURE__ */ jsx("li", { style: { paddingLeft: (item.level - 1) * 8 }, children: /* @__PURE__ */ jsx(
      "a",
      {
        href: `#${item.id}`,
        "aria-current": activeId === item.id ? "true" : void 0,
        className: cn(
          "block py-0.5 text-muted-fg transition-colors hover:text-foreground",
          activeId === item.id && "font-medium text-primary"
        ),
        children: item.text
      }
    ) }, item.id)) })
  ] });
}
var ChatContext = React53.createContext(null);
function ChatProvider({
  adapter,
  initialMessages = [],
  children
}) {
  const [messages, setMessages] = React53.useState(initialMessages);
  const [isStreaming, setIsStreaming] = React53.useState(false);
  const abortRef = React53.useRef(null);
  async function send(text) {
    const userMsg = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    const next = [...messages, userMsg];
    setMessages(next);
    const assistantId = crypto.randomUUID();
    setMessages((m) => [
      ...m,
      { id: assistantId, role: "assistant", content: "", timestamp: (/* @__PURE__ */ new Date()).toISOString() }
    ]);
    setIsStreaming(true);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      for await (const evt of adapter.send(next, { signal: controller.signal })) {
        if (evt.type === "text-delta" && evt.delta) {
          setMessages(
            (m) => m.map(
              (msg) => msg.id === assistantId ? { ...msg, content: msg.content + evt.delta } : msg
            )
          );
        } else if (evt.type === "tool-call" && evt.toolCall) {
          setMessages(
            (m) => m.map(
              (msg) => msg.id === assistantId ? { ...msg, toolCalls: [...msg.toolCalls ?? [], evt.toolCall] } : msg
            )
          );
        } else if (evt.type === "tool-result" && evt.toolResult) {
          setMessages(
            (m) => m.map(
              (msg) => msg.id === assistantId ? { ...msg, toolResults: [...msg.toolResults ?? [], evt.toolResult] } : msg
            )
          );
        }
      }
    } catch (err) {
      setMessages(
        (m) => m.map(
          (msg) => msg.id === assistantId ? { ...msg, content: msg.content + `

[Error: ${err.message}]` } : msg
        )
      );
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }
  function abort() {
    abortRef.current?.abort();
    setIsStreaming(false);
  }
  function clear() {
    setMessages([]);
  }
  return /* @__PURE__ */ jsx(ChatContext.Provider, { value: { messages, send, isStreaming, abort, clear, adapter }, children });
}
function useChat() {
  const ctx = React53.useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
function ToolCallView({
  call,
  result,
  className
}) {
  const [open, setOpen] = React53.useState(false);
  return /* @__PURE__ */ jsxs("div", { className: cn("mt-2 rounded-md border border-border bg-background/50 text-xs", className), children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((o) => !o),
        "aria-expanded": open,
        className: "flex w-full items-center gap-2 p-2 text-left hover:bg-accent",
        children: [
          /* @__PURE__ */ jsx(
            ChevronRight,
            {
              className: cn("h-3 w-3 transition-transform", open && "rotate-90"),
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx(Wrench, { className: "h-3 w-3 text-primary", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: call.name }),
          result?.error ? /* @__PURE__ */ jsx("span", { className: "ml-auto text-destructive", children: "error" }) : result ? /* @__PURE__ */ jsx("span", { className: "ml-auto text-success", children: "ok" }) : /* @__PURE__ */ jsx("span", { className: "ml-auto text-muted-fg animate-pulse", children: "running\u2026" })
        ]
      }
    ),
    open ? /* @__PURE__ */ jsxs("div", { className: "border-t border-border p-2", children: [
      /* @__PURE__ */ jsxs("details", { children: [
        /* @__PURE__ */ jsx("summary", { className: "cursor-pointer text-muted-fg", children: "Input" }),
        /* @__PURE__ */ jsx("pre", { className: "mt-1 overflow-x-auto rounded bg-muted p-2 text-[0.65rem]", children: JSON.stringify(call.input, null, 2) })
      ] }),
      result ? /* @__PURE__ */ jsxs("details", { className: "mt-1", children: [
        /* @__PURE__ */ jsx("summary", { className: "cursor-pointer text-muted-fg", children: result.error ? "Error" : "Output" }),
        /* @__PURE__ */ jsx("pre", { className: "mt-1 overflow-x-auto rounded bg-muted p-2 text-[0.65rem]", children: result.error ?? JSON.stringify(result.output, null, 2) })
      ] }) : null
    ] }) : null
  ] });
}
function Chatbot({ className }) {
  const { messages, send, isStreaming, abort, clear, adapter } = useChat();
  const [input, setInput] = React53.useState("");
  const scrollRef = React53.useRef(null);
  React53.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex h-full flex-col rounded-md border border-border bg-background",
        className
      ),
      role: "region",
      "aria-label": "AI chat",
      children: [
        /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between border-b border-border p-3", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-fg", children: [
            "Provider: ",
            adapter.name
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: clear,
              disabled: messages.length === 0 || isStreaming,
              children: [
                /* @__PURE__ */ jsx(Trash, { className: "mr-1 h-3 w-3" }),
                "Clear"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { ref: scrollRef, className: "flex-1 overflow-y-auto p-4 space-y-4", "aria-live": "polite", children: [
          messages.map((m) => /* @__PURE__ */ jsxs(
            "article",
            {
              className: cn("flex flex-col gap-1", m.role === "user" && "items-end"),
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-[0.65rem] uppercase tracking-wider text-muted-fg", children: m.role }),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "max-w-[80%] rounded-md px-3 py-2 text-sm",
                      m.role === "user" ? "bg-primary text-primary-fg" : m.role === "assistant" ? "bg-muted text-foreground" : "bg-warning/10 text-warning border border-warning/30"
                    ),
                    children: [
                      m.role === "assistant" ? /* @__PURE__ */ jsx(MarkdownView, { content: m.content }) : /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap", children: m.content }),
                      m.toolCalls?.map((tc) => /* @__PURE__ */ jsx(
                        ToolCallView,
                        {
                          call: tc,
                          result: m.toolResults?.find((r) => r.toolCallId === tc.id)
                        },
                        tc.id
                      ))
                    ]
                  }
                )
              ]
            },
            m.id
          )),
          isStreaming ? /* @__PURE__ */ jsxs("div", { role: "status", className: "flex items-center gap-2 text-xs text-muted-fg", children: [
            /* @__PURE__ */ jsx("span", { className: "inline-block h-2 w-2 animate-pulse rounded-full bg-primary" }),
            "Streaming\u2026"
          ] }) : null
        ] }),
        /* @__PURE__ */ jsxs(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault();
              if (!input.trim() || isStreaming) return;
              const text = input.trim();
              setInput("");
              void send(text);
            },
            className: "flex items-end gap-2 border-t border-border p-3",
            children: [
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: input,
                  onChange: (e) => setInput(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (input.trim() && !isStreaming) {
                        const text = input.trim();
                        setInput("");
                        void send(text);
                      }
                    }
                  },
                  rows: 2,
                  placeholder: "Type a message \u2014 Enter to send, Shift+Enter for newline",
                  className: "flex-1 resize-none rounded-md border border-input bg-background p-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "aria-label": "Message input",
                  disabled: isStreaming
                }
              ),
              isStreaming ? /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", onClick: abort, "aria-label": "Stop streaming", children: /* @__PURE__ */ jsx(Square, { className: "h-4 w-4" }) }) : /* @__PURE__ */ jsx(Button, { type: "submit", disabled: !input.trim(), "aria-label": "Send message", children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }) })
            ]
          }
        )
      ]
    }
  );
}
function VoiceInput({
  onTranscript,
  language = "it-IT",
  className
}) {
  const [recording, setRecording] = React53.useState(false);
  const [supported, setSupported] = React53.useState(true);
  const [error, setError] = React53.useState(null);
  const recognitionRef = React53.useRef(null);
  const canvasRef = React53.useRef(null);
  const audioCtxRef = React53.useRef(null);
  const analyserRef = React53.useRef(null);
  const rafRef = React53.useRef(0);
  React53.useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
    }
  }, []);
  async function start() {
    setError(null);
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = language;
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        onTranscript(transcript, event.results[i].isFinal);
      }
    };
    rec.onerror = (e) => setError(e.error);
    rec.onend = () => setRecording(false);
    rec.start();
    recognitionRef.current = rec;
    setRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioCtxRef.current = new AudioContext();
      const source = audioCtxRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      drawWaveform();
    } catch {
    }
  }
  function stop() {
    recognitionRef.current?.stop();
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
    analyserRef.current = null;
    cancelAnimationFrame(rafRef.current);
    setRecording(false);
  }
  function drawWaveform() {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const render = () => {
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width / bufferLength * 2.5;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 255;
        const barHeight = v * canvas.height;
        ctx.fillStyle = `oklch(0.55 0.18 264 / ${0.4 + v * 0.6})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
      rafRef.current = requestAnimationFrame(render);
    };
    render();
  }
  if (!supported) {
    return /* @__PURE__ */ jsx("p", { role: "alert", className: cn("text-xs text-muted-fg", className), children: "Voice input not supported in this browser." });
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        variant: recording ? "destructive" : "outline",
        onClick: recording ? stop : start,
        "aria-label": recording ? "Stop recording" : "Start recording",
        "aria-pressed": recording,
        children: recording ? /* @__PURE__ */ jsx(MicOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Mic, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(
      "canvas",
      {
        ref: canvasRef,
        width: 200,
        height: 32,
        className: cn("rounded bg-muted", !recording && "opacity-30"),
        "aria-hidden": "true"
      }
    ),
    error ? /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: error }) : null
  ] });
}

// src/components/i18n/locale-formatters.ts
function formatCurrency(value, currency = "EUR", locale = "it-IT") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
}
function formatNumber(value, options, locale = "it-IT") {
  return new Intl.NumberFormat(locale, options).format(value);
}
function formatPercent(value, fractionDigits = 1, locale = "it-IT") {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value);
}
function formatDate(date, options = { dateStyle: "medium" }, locale = "it-IT") {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(d);
}
function formatDateTime(date, locale = "it-IT") {
  return formatDate(date, { dateStyle: "medium", timeStyle: "short" }, locale);
}
function formatRelativeTime(date, locale = "it-IT") {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = (d.getTime() - Date.now()) / 1e3;
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const units = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["week", 60 * 60 * 24 * 7],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
    ["second", 1]
  ];
  for (const [unit, seconds] of units) {
    if (Math.abs(diff) >= seconds) {
      return rtf.format(Math.round(diff / seconds), unit);
    }
  }
  return rtf.format(0, "second");
}
function formatList(items, locale = "it-IT", type = "conjunction") {
  const lf = new Intl.ListFormat(locale, { style: "long", type });
  return lf.format(items);
}
var SUPPORTED_LOCALES = [
  { code: "it-IT", label: "Italiano" },
  { code: "en-US", label: "English (US)" },
  { code: "en-GB", label: "English (UK)" },
  { code: "fr-FR", label: "Fran\xE7ais" },
  { code: "de-DE", label: "Deutsch" },
  { code: "es-ES", label: "Espa\xF1ol" },
  { code: "pt-PT", label: "Portugu\xEAs" }
];
function LanguagePicker({
  value,
  onChange,
  locales = SUPPORTED_LOCALES,
  className
}) {
  return /* @__PURE__ */ jsxs("label", { className: cn("inline-flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4 text-muted-fg", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Language" }),
    /* @__PURE__ */ jsx(
      "select",
      {
        value,
        onChange: (e) => {
          onChange(e.target.value);
          const rtl = ["ar", "he", "fa"].some((c) => e.target.value.startsWith(c));
          document.documentElement.dir = rtl ? "rtl" : "ltr";
          document.documentElement.lang = e.target.value;
        },
        className: "h-9 rounded-md border border-input bg-background px-2 text-sm",
        "aria-label": "Select language",
        children: locales.map((l) => /* @__PURE__ */ jsx("option", { value: l.code, children: l.label }, l.code))
      }
    )
  ] });
}
function SkipLink({
  href = "#main-content",
  label = "Skip to main content",
  className
}) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      className: cn(
        "sr-only fixed left-4 top-4 z-[60] rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-fg shadow-md",
        "focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-ring",
        className
      ),
      children: label
    }
  );
}
var DEFAULT_SETTINGS = {
  fontSize: "A",
  reducedMotion: false,
  highContrast: false,
  underlineLinks: false,
  readingMode: false,
  colorBlindSim: "none"
};
function AccessibilityPanel({ className }) {
  const [open, setOpen] = React53.useState(false);
  const [settings, setSettings] = React53.useState(DEFAULT_SETTINGS);
  React53.useEffect(() => {
    const stored = localStorage.getItem("heuresys-a11y");
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch {
      }
    }
  }, []);
  React53.useEffect(() => {
    const html = document.documentElement;
    const fontSizeMap = { A: "100%", "A+": "110%", "A++": "125%", "A+++": "140%" };
    html.style.fontSize = fontSizeMap[settings.fontSize];
    html.classList.toggle("high-contrast", settings.highContrast);
    html.classList.toggle("underline-links", settings.underlineLinks);
    html.classList.toggle("reading-mode", settings.readingMode);
    html.dataset.colorBlind = settings.colorBlindSim === "none" ? "" : settings.colorBlindSim;
    if (settings.reducedMotion) {
      html.style.setProperty("--motion-duration-fast", "0ms");
      html.style.setProperty("--motion-duration-base", "0ms");
      html.style.setProperty("--motion-duration-slow", "0ms");
    }
    localStorage.setItem("heuresys-a11y", JSON.stringify(settings));
  }, [settings]);
  function update(key, value) {
    setSettings((s) => ({ ...s, [key]: value }));
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        size: "icon",
        variant: "outline",
        onClick: () => setOpen(true),
        "aria-label": "Open accessibility settings",
        className: cn("fixed bottom-4 right-4 z-40", className),
        children: /* @__PURE__ */ jsx(Accessibility, { className: "h-4 w-4" })
      }
    ),
    open ? /* @__PURE__ */ jsx(
      "div",
      {
        role: "dialog",
        "aria-label": "Accessibility settings",
        className: "fixed inset-0 z-50 flex items-end justify-end bg-overlay/30 p-4",
        onClick: (e) => {
          if (e.target === e.currentTarget) setOpen(false);
        },
        children: /* @__PURE__ */ jsxs("div", { className: "w-80 rounded-md border border-border bg-background p-4 shadow-xl", children: [
          /* @__PURE__ */ jsxs("header", { className: "mb-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold", children: "Accessibility" }),
            /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", onClick: () => setOpen(false), "aria-label": "Close", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "mb-1 block font-medium", children: "Font size" }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: ["A", "A+", "A++", "A+++"].map((s) => /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: settings.fontSize === s ? "default" : "outline",
                  onClick: () => update("fontSize", s),
                  children: s
                },
                s
              )) })
            ] }),
            /* @__PURE__ */ jsx(
              ToggleRow2,
              {
                label: "Reduced motion",
                checked: settings.reducedMotion,
                onChange: (v) => update("reducedMotion", v)
              }
            ),
            /* @__PURE__ */ jsx(
              ToggleRow2,
              {
                label: "High contrast",
                checked: settings.highContrast,
                onChange: (v) => update("highContrast", v)
              }
            ),
            /* @__PURE__ */ jsx(
              ToggleRow2,
              {
                label: "Underline links",
                checked: settings.underlineLinks,
                onChange: (v) => update("underlineLinks", v)
              }
            ),
            /* @__PURE__ */ jsx(
              ToggleRow2,
              {
                label: "Reading mode",
                checked: settings.readingMode,
                onChange: (v) => update("readingMode", v)
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "mb-1 block font-medium", children: "Color blindness simulation" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: ["none", "protan", "deutan", "tritan"].map((t) => /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: settings.colorBlindSim === t ? "default" : "outline",
                  onClick: () => update("colorBlindSim", t),
                  children: t
                },
                t
              )) })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setSettings(DEFAULT_SETTINGS),
                className: "w-full",
                children: "Reset"
              }
            )
          ] })
        ] })
      }
    ) : null
  ] });
}
function ToggleRow2({
  label,
  checked,
  onChange
}) {
  return /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsx("span", { children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "checkbox",
        checked,
        onChange: (e) => onChange(e.target.checked),
        className: "h-4 w-4 accent-primary"
      }
    )
  ] });
}
var LiveRegionContext = React53.createContext(null);
function LiveRegionProvider({ children }) {
  const [polite, setPolite] = React53.useState("");
  const [assertive, setAssertive] = React53.useState("");
  const announce = React53.useCallback((msg, urgency = "polite") => {
    if (urgency === "assertive") {
      setAssertive(msg);
      setTimeout(() => setAssertive(""), 1e3);
    } else {
      setPolite(msg);
      setTimeout(() => setPolite(""), 1e3);
    }
  }, []);
  return /* @__PURE__ */ jsxs(LiveRegionContext.Provider, { value: announce, children: [
    children,
    /* @__PURE__ */ jsx("div", { "aria-live": "polite", "aria-atomic": "true", className: "sr-only", children: polite }),
    /* @__PURE__ */ jsx("div", { "aria-live": "assertive", "aria-atomic": "true", className: "sr-only", children: assertive })
  ] });
}
function useAnnounce() {
  const ctx = React53.useContext(LiveRegionContext);
  if (!ctx) throw new Error("useAnnounce must be used within LiveRegionProvider");
  return ctx;
}
function PerfMonitor({
  position = "bottom-left",
  className
}) {
  const [open, setOpen] = React53.useState(true);
  const [fps, setFps] = React53.useState(0);
  const [mem, setMem] = React53.useState(null);
  const [domNodes, setDomNodes] = React53.useState(0);
  React53.useEffect(() => {
    if (!open) return;
    let frames = 0;
    let last = performance.now();
    let raf = 0;
    function tick(now) {
      frames++;
      if (now - last >= 1e3) {
        setFps(Math.round(frames * 1e3 / (now - last)));
        frames = 0;
        last = now;
        const m = performance.memory;
        if (m) setMem(Math.round(m.usedJSHeapSize / 1024 / 1024));
        setDomNodes(document.querySelectorAll("*").length);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open]);
  if (!open) {
    return /* @__PURE__ */ jsx(
      Button,
      {
        size: "icon",
        variant: "outline",
        onClick: () => setOpen(true),
        "aria-label": "Open performance monitor",
        className: cn("fixed z-50", positionClass[position]),
        children: /* @__PURE__ */ jsx(Activity, { className: "h-4 w-4" })
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: cn(
        "fixed z-50 flex flex-col gap-1 rounded-md border border-border bg-background p-2 font-mono text-xs shadow-md",
        positionClass[position],
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx("strong", { className: "text-[0.65rem] uppercase tracking-wider text-muted-fg", children: "Perf" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setOpen(false),
              "aria-label": "Close performance monitor",
              className: "text-muted-fg hover:text-foreground",
              children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs(
          "span",
          {
            className: cn(
              "font-semibold",
              fps < 30 && "text-destructive",
              fps >= 50 && "text-success"
            ),
            children: [
              fps,
              " FPS"
            ]
          }
        ) }),
        mem != null ? /* @__PURE__ */ jsxs("div", { children: [
          "Mem: ",
          mem,
          " MB"
        ] }) : null,
        /* @__PURE__ */ jsxs("div", { children: [
          "DOM: ",
          domNodes
        ] })
      ]
    }
  );
}
var positionClass = {
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4"
};
function HeroSplit({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  className
}) {
  return /* @__PURE__ */ jsxs("section", { className: cn("grid items-center gap-8 py-16 lg:grid-cols-2 lg:py-24", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
      eyebrow ? /* @__PURE__ */ jsx("span", { className: "inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary", children: eyebrow }) : null,
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", children: title }),
      /* @__PURE__ */ jsx("p", { className: "max-w-prose text-lg text-muted-fg", children: description }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 pt-2", children: [
        primaryCta ? /* @__PURE__ */ jsx(CtaButton, { ...primaryCta, variant: "default" }) : null,
        secondaryCta ? /* @__PURE__ */ jsx(CtaButton, { ...secondaryCta, variant: "outline" }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsx("img", { src: imageSrc, alt: imageAlt, className: "rounded-lg shadow-xl" })
  ] });
}
function HeroCentered({
  title,
  description,
  primaryCta,
  secondaryCta,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: cn(
        "flex flex-col items-center justify-center gap-6 py-16 text-center lg:py-24",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("h1", { className: "max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", children: title }),
        /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-lg text-muted-fg", children: description }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-3 pt-2", children: [
          primaryCta ? /* @__PURE__ */ jsx(CtaButton, { ...primaryCta, variant: "default" }) : null,
          secondaryCta ? /* @__PURE__ */ jsx(CtaButton, { ...secondaryCta, variant: "outline" }) : null
        ] })
      ]
    }
  );
}
function HeroVideoBackground({
  videoSrc,
  poster,
  title,
  description,
  primaryCta,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: cn("relative isolate flex min-h-[80vh] items-center justify-center", className),
      children: [
        /* @__PURE__ */ jsx(
          "video",
          {
            src: videoSrc,
            poster,
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            "aria-hidden": "true",
            className: "absolute inset-0 -z-10 h-full w-full object-cover"
          }
        ),
        /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: "absolute inset-0 -z-10 bg-overlay/60" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-5 px-6 text-center text-white", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl", children: title }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-white/80", children: description }),
          primaryCta ? /* @__PURE__ */ jsx(CtaButton, { ...primaryCta, variant: "default" }) : null
        ] })
      ]
    }
  );
}
function CtaButton({
  label,
  onClick,
  href,
  variant
}) {
  if (href) {
    return /* @__PURE__ */ jsx(
      "a",
      {
        href,
        className: cn(
          "inline-flex h-10 items-center rounded-md px-6 text-sm font-medium transition-colors",
          variant === "default" ? "bg-primary text-primary-fg hover:bg-primary/90" : "border border-input bg-background text-foreground hover:bg-accent"
        ),
        children: label
      }
    );
  }
  return /* @__PURE__ */ jsx(Button, { variant, size: "lg", onClick, children: label });
}
function AnimatedNumber({
  value,
  duration = 800,
  decimals = 0,
  prefix,
  suffix,
  className
}) {
  const [display, setDisplay] = React53.useState(value);
  const fromRef = React53.useRef(0);
  React53.useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (value - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = value;
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return /* @__PURE__ */ jsxs("span", { className: cn("tabular-nums", className), children: [
    prefix,
    display.toFixed(decimals),
    suffix
  ] });
}
function Typewriter({
  text,
  speed = 50,
  className,
  onComplete
}) {
  const [out, setOut] = React53.useState("");
  React53.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      onComplete?.();
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, onComplete]);
  return /* @__PURE__ */ jsxs("span", { className, "aria-label": text, children: [
    out,
    /* @__PURE__ */ jsx("span", { className: "ml-0.5 inline-block w-0.5 animate-pulse bg-current", children: "\xA0" })
  ] });
}
function GradientText({
  children,
  from = "oklch(0.55 0.22 264)",
  to = "oklch(0.7 0.22 320)",
  className
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("inline-block bg-clip-text text-transparent", className),
      style: { backgroundImage: `linear-gradient(135deg, ${from}, ${to})` },
      children
    }
  );
}
function Marquee({
  children,
  speed = 30,
  reverse,
  pauseOnHover = true,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("relative flex w-full overflow-hidden [--gap:2rem]", className), children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "flex shrink-0 gap-[var(--gap)] motion-safe:animate-[marquee_var(--duration)_linear_infinite]",
          reverse && "motion-safe:[animation-direction:reverse]",
          pauseOnHover && "hover:[animation-play-state:paused]"
        ),
        style: { ["--duration"]: `${speed}s` },
        children: [
          children,
          /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: "flex shrink-0 gap-[var(--gap)]", children })
        ]
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(calc(-100% - var(--gap))); } }` })
  ] });
}
function ThreeScene({
  children,
  className,
  height = 400,
  cameraPosition = [3, 3, 3],
  ariaLabel = "3D scene"
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "img",
      "aria-label": ariaLabel,
      className: cn("rounded-md border border-border bg-background", className),
      style: { height },
      children: /* @__PURE__ */ jsxs(Canvas, { camera: { position: cameraPosition, fov: 50 }, children: [
        /* @__PURE__ */ jsx("ambientLight", { intensity: 0.6 }),
        /* @__PURE__ */ jsx("directionalLight", { position: [5, 10, 5], intensity: 0.8 }),
        /* @__PURE__ */ jsx(OrbitControls, { makeDefault: true, enableDamping: true }),
        children ?? /* @__PURE__ */ jsx(DemoCube, {})
      ] })
    }
  );
}
function DemoCube() {
  const [hovered, setHovered] = React53.useState(false);
  return /* @__PURE__ */ jsxs("mesh", { onPointerOver: () => setHovered(true), onPointerOut: () => setHovered(false), children: [
    /* @__PURE__ */ jsx("boxGeometry", { args: [1, 1, 1] }),
    /* @__PURE__ */ jsx("meshStandardMaterial", { color: hovered ? "#a78bfa" : "#60a5fa" })
  ] });
}
var pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider",
  {
    variants: {
      tone: {
        ok: "border-success bg-success/15 text-success",
        warn: "border-warning bg-warning/15 text-warning",
        down: "border-destructive bg-destructive/15 text-destructive",
        info: "border-primary bg-primary/15 text-primary"
      }
    },
    defaultVariants: { tone: "ok" }
  }
);
var dotVariants = cva("inline-block h-1.5 w-1.5 rounded-full", {
  variants: {
    tone: {
      ok: "bg-success",
      warn: "bg-warning",
      down: "bg-destructive",
      info: "bg-primary"
    },
    pulse: {
      true: "animate-pulse",
      false: ""
    }
  },
  defaultVariants: { tone: "ok", pulse: false }
});
var DEFAULT_LABEL = {
  ok: "OK",
  warn: "WARN",
  down: "DOWN",
  info: "INFO"
};
function IntegrationHealthPill({
  tone = "ok",
  label,
  pulse = false,
  showDot = true,
  className,
  ...props
}) {
  const resolvedTone = tone ?? "ok";
  const text = label ?? DEFAULT_LABEL[resolvedTone];
  return /* @__PURE__ */ jsxs(
    "span",
    {
      role: "status",
      "aria-label": `Integration health: ${text}`,
      className: cn(pillVariants({ tone: resolvedTone }), className),
      ...props,
      children: [
        showDot ? /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: dotVariants({ tone: resolvedTone, pulse }) }) : null,
        /* @__PURE__ */ jsx("span", { children: text })
      ]
    }
  );
}
function resolveTone(value, thresholds) {
  if (!thresholds) return "primary";
  const { goodAt, warnAt } = thresholds;
  if (goodAt != null && value >= goodAt) return "success";
  if (warnAt != null && value >= warnAt) return "warning";
  if (warnAt != null || goodAt != null) return "destructive";
  return "primary";
}
function KpiRing({
  value,
  max = 100,
  min = 0,
  label,
  sublabel,
  unit,
  trend,
  thresholds,
  tone,
  size = 160,
  thickness = 14,
  variant = "semi",
  className
}) {
  const resolvedTone = tone ?? resolveTone(value, thresholds);
  const trendDir = trend == null ? null : trend > 0 ? "up" : trend < 0 ? "down" : "flat";
  const TrendIcon = trendDir === "up" ? TrendingUp : trendDir === "down" ? TrendingDown : trendDir === "flat" ? Minus : null;
  const trendColor = trendDir === "up" ? "text-success" : trendDir === "down" ? "text-destructive" : "text-muted-fg";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "group",
      "aria-label": `KPI ${label}: ${value}${unit ? " " + unit : ""}`,
      className: cn("flex flex-col items-center gap-1", className),
      children: [
        /* @__PURE__ */ jsx(
          RadialGauge,
          {
            value,
            max,
            min,
            unit,
            size,
            thickness,
            variant,
            tone: resolvedTone
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-wider text-muted-fg", children: label }),
          sublabel ? /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-xs text-muted-fg", children: sublabel }) : null,
          trend != null && TrendIcon ? /* @__PURE__ */ jsxs(
            "span",
            {
              className: cn(
                "mt-1 inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
                trendColor
              ),
              children: [
                /* @__PURE__ */ jsx(TrendIcon, { className: "h-3 w-3", "aria-hidden": "true" }),
                Math.abs(trend).toFixed(1),
                "%"
              ]
            }
          ) : null
        ] })
      ]
    }
  );
}
var RISK_VARIANT = {
  low: "success",
  medium: "secondary",
  high: "warning",
  critical: "destructive"
};
var RISK_LABEL = {
  low: "Low risk",
  medium: "Medium risk",
  high: "High risk",
  critical: "Critical"
};
var READINESS_LABEL = {
  "ready-now": "Ready now",
  "1-2y": "Ready 1-2y",
  "3-5y": "Ready 3-5y",
  "not-ready": "Not ready"
};
var READINESS_TONE = {
  "ready-now": "success",
  "1-2y": "primary",
  "3-5y": "warning",
  "not-ready": "destructive"
};
function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}
function SuccessionCard({
  candidateName,
  candidateAvatarUrl,
  currentRole,
  targetRole,
  readinessPercent,
  readiness,
  risk = "medium",
  readyBy,
  className
}) {
  const clamped = Math.max(0, Math.min(100, readinessPercent));
  const tone = readiness ? READINESS_TONE[readiness] : clamped >= 80 ? "success" : clamped >= 50 ? "primary" : "warning";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "article",
      "aria-label": `Succession candidate ${candidateName}`,
      className: cn(
        "flex flex-col gap-3 rounded-lg border border-border bg-background p-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "h-10 w-10", children: [
            candidateAvatarUrl ? /* @__PURE__ */ jsx(AvatarImage, { src: candidateAvatarUrl, alt: candidateName }) : null,
            /* @__PURE__ */ jsx(AvatarFallback, { children: initials(candidateName) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-semibold", children: candidateName }),
            /* @__PURE__ */ jsx("div", { className: "truncate font-mono text-[11px] text-muted-fg", children: currentRole })
          ] }),
          /* @__PURE__ */ jsx(Badge, { variant: RISK_VARIANT[risk], children: RISK_LABEL[risk] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] uppercase tracking-wider text-muted-fg", children: "Target" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: targetRole })
        ] }),
        /* @__PURE__ */ jsx(
          LinearGauge,
          {
            value: clamped,
            max: 100,
            label: readiness ? READINESS_LABEL[readiness] : "Readiness",
            tone
          }
        ),
        readyBy ? /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] uppercase tracking-wider text-muted-fg", children: [
          "Ready by \xB7 ",
          /* @__PURE__ */ jsx("span", { className: "text-foreground", children: readyBy })
        ] }) : null
      ]
    }
  );
}
var STATUS_DOT = {
  past: "bg-success text-success-fg border-success",
  current: "bg-primary text-primary-fg border-primary ring-4 ring-primary/20",
  future: "bg-background text-muted-fg border-border"
};
var STATUS_LINE = {
  past: "bg-success",
  current: "bg-gradient-to-r from-success to-primary",
  future: "bg-border"
};
function resolveStatuses(stages, currentIndex) {
  if (stages.every((s) => s.status)) return stages.map((s) => s.status);
  const idx = currentIndex ?? 0;
  return stages.map((s, i) => s.status ?? (i < idx ? "past" : i === idx ? "current" : "future"));
}
function CareerArc({ stages, currentIndex, className }) {
  if (stages.length === 0) {
    return /* @__PURE__ */ jsx("p", { className: cn("p-4 text-sm text-muted-fg", className), children: "No career stages." });
  }
  const statuses = resolveStatuses(stages, currentIndex);
  return /* @__PURE__ */ jsx("ol", { role: "list", "aria-label": "Career arc", className: cn("flex w-full items-start", className), children: stages.map((stage, i) => {
    const status = statuses[i] ?? "future";
    const nextStatus = statuses[i + 1] ?? "future";
    const isLast = i === stages.length - 1;
    return /* @__PURE__ */ jsxs(
      "li",
      {
        role: "listitem",
        "aria-current": status === "current" ? "step" : void 0,
        className: "flex flex-1 flex-col items-center",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                "aria-hidden": "true",
                className: cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-bold",
                  STATUS_DOT[status]
                ),
                children: status === "past" ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) : i + 1
              }
            ),
            !isLast ? /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: cn("h-1 flex-1", STATUS_LINE[nextStatus]) }) : null
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold", children: stage.label }),
            stage.year ? /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-muted-fg", children: stage.year }) : null,
            stage.description ? /* @__PURE__ */ jsx("div", { className: "mt-1 max-w-[140px] text-[11px] text-muted-fg", children: stage.description }) : null
          ] })
        ]
      },
      stage.id
    );
  }) });
}
function KgMiniGraph({
  nodes,
  edges,
  height = 200,
  layout = "cose",
  legend,
  ariaLabel = "Knowledge graph mini",
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-2", className), children: [
    /* @__PURE__ */ jsx(
      NetworkGraph,
      {
        nodes,
        edges,
        height,
        layout,
        ariaLabel
      }
    ),
    legend && legend.length > 0 ? /* @__PURE__ */ jsx("ul", { role: "list", className: "flex flex-wrap items-center gap-3", children: legend.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          "aria-hidden": "true",
          className: "inline-block h-2.5 w-2.5 rounded-full",
          style: { background: item.color }
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] uppercase tracking-wider text-muted-fg", children: item.label })
    ] }, item.group)) }) : null
  ] });
}
var DEFAULT_BUCKETS = [
  { min: 80, cls: "bg-primary/40 text-foreground" },
  { min: 60, cls: "bg-primary/30 text-foreground" },
  { min: 40, cls: "bg-primary/20 text-foreground" },
  { min: 20, cls: "bg-primary/10 text-muted-fg" },
  { min: 0, cls: "bg-muted/40 text-muted-fg" }
];
function defaultScale(value) {
  for (const b of DEFAULT_BUCKETS) if (value >= b.min) return b.cls;
  return DEFAULT_BUCKETS[DEFAULT_BUCKETS.length - 1].cls;
}
function SkillHeatmap({
  rows,
  cols,
  cells,
  caption,
  showValue = true,
  colorScale,
  onCellClick,
  className
}) {
  const cellMap = React53.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const c of cells) m.set(`${c.rowId}|${c.colId}`, c);
    return m;
  }, [cells]);
  const scale = colorScale ?? defaultScale;
  return /* @__PURE__ */ jsx("div", { className: cn("overflow-auto rounded-md border border-border", className), children: /* @__PURE__ */ jsxs("table", { className: "min-w-full border-collapse text-xs", children: [
    caption ? /* @__PURE__ */ jsx("caption", { className: "sr-only", children: caption }) : null,
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx(
        "th",
        {
          scope: "col",
          className: "sticky left-0 top-0 z-20 border-b border-r border-border bg-muted px-3 py-2 text-left font-mono text-[10px] uppercase tracking-wider text-muted-fg",
          children: "\xA0"
        }
      ),
      cols.map((c) => /* @__PURE__ */ jsx(
        "th",
        {
          scope: "col",
          className: "sticky top-0 z-10 border-b border-r border-border bg-muted px-2 py-2 text-center font-mono text-[10px] uppercase tracking-wider text-muted-fg",
          children: c.label
        },
        c.id
      ))
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: rows.map((r) => /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx(
        "th",
        {
          scope: "row",
          className: "sticky left-0 z-10 border-b border-r border-border bg-background px-3 py-2 text-left text-xs font-semibold",
          children: r.label
        }
      ),
      cols.map((c) => {
        const cell = cellMap.get(`${r.id}|${c.id}`);
        const value = cell?.value ?? 0;
        const cls = scale(value);
        const display = cell?.display ?? (showValue ? value.toFixed(0) : "");
        const interactive = !!onCellClick && !!cell;
        return /* @__PURE__ */ jsx(
          "td",
          {
            "aria-label": `${r.label} \xD7 ${c.label}: ${value}`,
            className: cn(
              "border-b border-r border-border px-2 py-2 text-center font-mono text-[11px] tabular-nums transition-colors",
              cls,
              interactive && "cursor-pointer hover:brightness-125"
            ),
            onClick: interactive ? () => onCellClick(cell) : void 0,
            role: interactive ? "button" : void 0,
            tabIndex: interactive ? 0 : void 0,
            onKeyDown: interactive ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onCellClick(cell);
              }
            } : void 0,
            children: display
          },
          c.id
        );
      })
    ] }, r.id)) })
  ] }) });
}
var DEFAULT_COLORS = [
  "oklch(0.55 0.18 264)",
  // primary blue
  "oklch(0.58 0.22 305)",
  // accent purple
  "oklch(0.65 0.16 145)",
  // success
  "oklch(0.78 0.16 80)"
  // warning
];
function polar(cx, cy, r, angleDeg) {
  const a = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
function CapabilityRadar({
  axes,
  series,
  max = 100,
  size = 280,
  rings = 4,
  showLegend = true,
  className
}) {
  if (axes.length < 3) {
    return /* @__PURE__ */ jsx("p", { className: cn("p-4 text-sm text-muted-fg", className), children: "Radar requires at least 3 axes." });
  }
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 * 0.78;
  const step = 360 / axes.length;
  return /* @__PURE__ */ jsxs("div", { className: cn("inline-flex flex-col items-center gap-3", className), children: [
    /* @__PURE__ */ jsxs(
      "svg",
      {
        width: size,
        height: size,
        role: "img",
        "aria-label": `Capability radar with ${axes.length} axes and ${series.length} series`,
        children: [
          Array.from({ length: rings }).map((_, i) => {
            const r = radius * (i + 1) / rings;
            const points = axes.map((_2, a) => polar(cx, cy, r, a * step)).map((p) => `${p.x},${p.y}`).join(" ");
            return /* @__PURE__ */ jsx(
              "polygon",
              {
                points,
                fill: "none",
                stroke: "oklch(0.85 0.01 252)",
                strokeOpacity: i === rings - 1 ? 0.5 : 0.25,
                strokeWidth: 1
              },
              `ring-${i}`
            );
          }),
          axes.map((ax, i) => {
            const p = polar(cx, cy, radius, i * step);
            return /* @__PURE__ */ jsx(
              "line",
              {
                x1: cx,
                y1: cy,
                x2: p.x,
                y2: p.y,
                stroke: "oklch(0.85 0.01 252)",
                strokeOpacity: 0.4,
                strokeWidth: 1
              },
              `axis-${ax.id}`
            );
          }),
          axes.map((ax, i) => {
            const p = polar(cx, cy, radius + 14, i * step);
            return /* @__PURE__ */ jsx(
              "text",
              {
                x: p.x,
                y: p.y,
                textAnchor: "middle",
                dominantBaseline: "middle",
                className: "fill-muted-fg",
                style: { fontSize: 11, fontWeight: 500 },
                children: ax.label
              },
              `label-${ax.id}`
            );
          }),
          series.map((s, si) => {
            const color = s.color ?? DEFAULT_COLORS[si % DEFAULT_COLORS.length];
            const pts = axes.map((_, i) => {
              const ratio = Math.max(0, Math.min(1, (s.values[i] ?? 0) / max));
              return polar(cx, cy, radius * ratio, i * step);
            });
            const points = pts.map((p) => `${p.x},${p.y}`).join(" ");
            return /* @__PURE__ */ jsxs("g", { children: [
              /* @__PURE__ */ jsx(
                "polygon",
                {
                  points,
                  fill: color,
                  fillOpacity: 0.18,
                  stroke: color,
                  strokeWidth: 2,
                  strokeLinejoin: "round"
                }
              ),
              pts.map((p, i) => /* @__PURE__ */ jsx("circle", { cx: p.x, cy: p.y, r: 3, fill: color }, `pt-${s.id}-${i}`))
            ] }, s.id);
          })
        ]
      }
    ),
    showLegend && series.length > 0 ? /* @__PURE__ */ jsx("ul", { role: "list", className: "flex flex-wrap items-center gap-3", children: series.map((s, si) => {
      const color = s.color ?? DEFAULT_COLORS[si % DEFAULT_COLORS.length];
      return /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": "true",
            className: "inline-block h-2.5 w-2.5 rounded-sm",
            style: { background: color }
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: s.label })
      ] }, s.id);
    }) }) : null
  ] });
}
var LEVEL_ORDER = ["none", "read", "write", "admin", "owner"];
var LEVEL_CLS = {
  none: "bg-muted/30 text-muted-fg",
  read: "bg-primary/10 text-foreground",
  write: "bg-primary/25 text-foreground",
  admin: "bg-primary/45 text-foreground font-semibold",
  owner: "bg-primary/65 text-primary-fg font-bold"
};
var LEVEL_GLYPH = {
  none: "\xB7",
  read: "R",
  write: "W",
  admin: "A",
  owner: "O"
};
function nextLevel(current) {
  const i = LEVEL_ORDER.indexOf(current);
  return LEVEL_ORDER[(i + 1) % LEVEL_ORDER.length];
}
function RbacMatrix({
  roles,
  areas,
  assignments,
  readonly = false,
  onChange,
  className
}) {
  const map = React53.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const a of assignments) m.set(`${a.roleId}|${a.areaId}`, a.level);
    return m;
  }, [assignments]);
  const interactive = !readonly && !!onChange;
  return /* @__PURE__ */ jsx("div", { className: cn("overflow-auto rounded-md border border-border", className), children: /* @__PURE__ */ jsxs("table", { className: "min-w-full border-collapse text-xs", children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx(
        "th",
        {
          scope: "col",
          className: "sticky left-0 top-0 z-20 border-b border-r border-border bg-muted px-3 py-2 text-left font-mono text-[10px] uppercase tracking-wider text-muted-fg",
          children: "Area / Role"
        }
      ),
      roles.map((r) => /* @__PURE__ */ jsxs(
        "th",
        {
          scope: "col",
          className: "sticky top-0 z-10 border-b border-r border-border bg-muted px-2 py-2 text-center font-mono text-[10px] uppercase tracking-wider text-muted-fg",
          children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-foreground", children: r.label }),
            r.level != null ? /* @__PURE__ */ jsxs("div", { className: "text-[9px]", children: [
              "L",
              r.level
            ] }) : null
          ]
        },
        r.id
      ))
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: areas.map((area) => /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx(
        "th",
        {
          scope: "row",
          className: "sticky left-0 z-10 border-b border-r border-border bg-background px-3 py-2 text-left text-xs font-semibold",
          children: area.label
        }
      ),
      roles.map((role) => {
        const level = map.get(`${role.id}|${area.id}`) ?? "none";
        const handleClick = () => {
          if (!interactive) return;
          onChange({ roleId: role.id, areaId: area.id, level: nextLevel(level) });
        };
        return /* @__PURE__ */ jsx(
          "td",
          {
            "aria-label": `${role.label} \xD7 ${area.label}: ${level}`,
            className: cn(
              "border-b border-r border-border px-2 py-2 text-center font-mono text-[11px] tabular-nums",
              LEVEL_CLS[level],
              interactive && "cursor-pointer hover:brightness-125"
            ),
            onClick: interactive ? handleClick : void 0,
            role: interactive ? "button" : void 0,
            tabIndex: interactive ? 0 : void 0,
            onKeyDown: interactive ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            } : void 0,
            children: LEVEL_GLYPH[level]
          },
          role.id
        );
      })
    ] }, area.id)) })
  ] }) });
}
var SIZE_MAP = {
  sm: 16,
  md: 20,
  lg: 28,
  xl: 40,
  hero: 60
};
var LETTER_SPACING_MAP = {
  sm: "-0.4px",
  md: "-0.6px",
  lg: "-0.9px",
  xl: "-1.6px",
  hero: "-2.5px"
};
function resolveSize(size) {
  if (typeof size === "number") {
    const spacing = -Math.max(0.4, size * 0.04);
    return { fontSize: size, letterSpacing: `${spacing.toFixed(1)}px` };
  }
  return { fontSize: SIZE_MAP[size], letterSpacing: LETTER_SPACING_MAP[size] };
}
var BRAND_BLUE = "hsl(221 83% 53%)";
var BRAND_PURPLE = "#a855f7";
var VARIANT_STYLES = {
  default: {
    fontFamily: '"Exo 2", Inter, ui-sans-serif, system-ui, sans-serif',
    color: BRAND_BLUE
  },
  brand: {
    fontFamily: '"Exo 2", Inter, ui-sans-serif, system-ui, sans-serif',
    color: BRAND_BLUE
  },
  relative: {
    fontFamily: '"Exo 2", Inter, ui-sans-serif, system-ui, sans-serif',
    color: BRAND_BLUE
  }
};
function HeuresysWordmark({
  variant = "default",
  size = "md",
  as = "span",
  className,
  style,
  "aria-label": ariaLabel = "heuresys",
  ...rest
}) {
  const { fontSize, letterSpacing } = resolveSize(size);
  const variantStyle = VARIANT_STYLES[variant];
  const yWeight = variant === "brand" ? 700 : 500;
  const props = {
    role: "img",
    "aria-label": ariaLabel,
    className: cn("inline-flex items-baseline leading-none", className),
    style: {
      fontWeight: 700,
      textTransform: "lowercase",
      fontSize,
      letterSpacing,
      ...variantStyle,
      ...style
    },
    ...rest
  };
  const inner = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "heures" }),
    /* @__PURE__ */ jsx(
      "span",
      {
        "aria-hidden": "true",
        className: "wm-y",
        style: { color: BRAND_PURPLE, fontWeight: yWeight },
        children: "y"
      }
    ),
    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "s" })
  ] });
  switch (as) {
    case "h1":
      return /* @__PURE__ */ jsx("h1", { ...props, children: inner });
    case "h2":
      return /* @__PURE__ */ jsx("h2", { ...props, children: inner });
    case "div":
      return /* @__PURE__ */ jsx("div", { ...props, children: inner });
    case "p":
      return /* @__PURE__ */ jsx("p", { ...props, children: inner });
    case "span":
    default:
      return /* @__PURE__ */ jsx("span", { ...props, children: inner });
  }
}
function buildForest(flat) {
  const byUri = /* @__PURE__ */ new Map();
  for (const n of flat) byUri.set(n.uri, { ...n, children: [] });
  const roots = [];
  for (const node of byUri.values()) {
    if (node.parentUri && byUri.has(node.parentUri)) {
      byUri.get(node.parentUri).children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
function ESCOTreeNavigator({ nodes, onExpand, onSelect }) {
  const [expanded, setExpanded] = useState(/* @__PURE__ */ new Set());
  const [loading, setLoading] = useState(/* @__PURE__ */ new Set());
  const [extra, setExtra] = useState([]);
  async function handleExpand(node) {
    if (expanded.has(node.uri)) {
      const next = new Set(expanded);
      next.delete(node.uri);
      setExpanded(next);
      return;
    }
    if (onExpand && !nodes.some((n) => n.parentUri === node.uri) && !extra.some((n) => n.parentUri === node.uri)) {
      const nextLoading = new Set(loading);
      nextLoading.add(node.uri);
      setLoading(nextLoading);
      try {
        const children = await onExpand(node.uri);
        setExtra((prev) => [...prev, ...children]);
      } finally {
        const doneLoading = new Set(loading);
        doneLoading.delete(node.uri);
        setLoading(doneLoading);
      }
    }
    const nextExpanded = new Set(expanded);
    nextExpanded.add(node.uri);
    setExpanded(nextExpanded);
  }
  const allNodes = [...nodes, ...extra];
  const forest = buildForest(allNodes);
  function renderNode(node, depth) {
    const isExpanded = expanded.has(node.uri);
    const isLoading = loading.has(node.uri);
    return /* @__PURE__ */ jsxs("li", { className: "leading-tight", "data-testid": "esco-tree-node", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 py-1", style: { paddingLeft: depth * 16 }, children: [
        node.hasChildren ? /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => handleExpand(node),
            className: "h-5 w-5 rounded text-xs hover:bg-accent hover:text-accent-foreground",
            "aria-expanded": isExpanded,
            "data-testid": "esco-tree-toggle",
            children: isLoading ? "\u2026" : isExpanded ? "\u25BE" : "\u25B8"
          }
        ) : /* @__PURE__ */ jsx("span", { className: "inline-block w-5" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => onSelect?.(node),
            className: "rounded px-2 py-0.5 text-left text-sm hover:bg-accent hover:text-accent-foreground",
            "data-testid": "esco-tree-label",
            children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: node.label }),
              node.code && /* @__PURE__ */ jsx("span", { className: "ml-2 font-mono text-xs text-muted-foreground", children: node.code })
            ]
          }
        )
      ] }),
      isExpanded && node.children.length > 0 && /* @__PURE__ */ jsx("ul", { children: node.children.map((c) => renderNode(c, depth + 1)) })
    ] }, node.uri);
  }
  return /* @__PURE__ */ jsx("ul", { "data-testid": "esco-tree-navigator", children: forest.map((n) => renderNode(n, 0)) });
}
function KGGraphCanvas({ nodes, edges, emptyState }) {
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const adj = useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const e of edges) {
      if (!m.has(e.source)) m.set(e.source, []);
      m.get(e.source).push(e);
    }
    return m;
  }, [edges]);
  if (nodes.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "rounded-md border border-dashed border-border p-6 text-sm text-muted-foreground", children: emptyState ?? "No graph data" });
  }
  return /* @__PURE__ */ jsxs("div", { "data-testid": "kg-graph-canvas", className: "rounded-md border border-border", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between border-b border-border px-3 py-2 text-xs font-mono uppercase tracking-wide text-muted-foreground", children: [
      /* @__PURE__ */ jsx("span", { children: "Knowledge graph" }),
      /* @__PURE__ */ jsxs("span", { children: [
        nodes.length,
        " nodes \xB7 ",
        edges.length,
        " edges"
      ] })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "divide-y divide-border", children: nodes.map((n) => {
      const out = adj.get(n.id) ?? [];
      return /* @__PURE__ */ jsxs("li", { className: "px-3 py-2", "data-testid": "kg-graph-node", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: n.label }),
          n.group && /* @__PURE__ */ jsx("span", { className: "rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground", children: n.group })
        ] }),
        out.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mt-1 space-y-0.5 pl-4 text-xs text-muted-foreground", children: out.map((e) => {
          const target = byId.get(e.target);
          return /* @__PURE__ */ jsxs("li", { "data-testid": "kg-graph-edge", children: [
            "\u2192 ",
            target?.label ?? e.target,
            e.label && /* @__PURE__ */ jsxs("span", { className: "ml-1 text-muted-foreground", children: [
              "(",
              e.label,
              ")"
            ] })
          ] }, e.id);
        }) })
      ] }, n.id);
    }) })
  ] });
}
var STATUS_BADGE = {
  pending: { label: "Pending", className: "bg-muted text-muted-foreground" },
  running: { label: "Running", className: "bg-blue-100 text-blue-800" },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-800" },
  failed: { label: "Failed", className: "bg-red-100 text-red-800" },
  cancelled: { label: "Cancelled", className: "bg-amber-100 text-amber-800" },
  rolled_back: { label: "Rolled back", className: "bg-purple-100 text-purple-800" }
};
function StatusBadge({ status }) {
  const cfg = STATUS_BADGE[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground"
  };
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `rounded px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wide ${cfg.className}`,
      "data-testid": "sap-status-badge",
      children: cfg.label
    }
  );
}
function SAPSyncPanel({ jobs, delta, emptyJobsLabel }) {
  const lastJob = jobs[0] ?? null;
  const totalSuccess = delta.filter((d) => d.kind === "success").reduce((a, b) => a + b.count, 0);
  const totalErrors = delta.filter((d) => d.kind === "error").reduce((a, b) => a + b.count, 0);
  return /* @__PURE__ */ jsxs("div", { "data-testid": "sap-sync-panel", className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 rounded-md border border-border p-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-mono uppercase text-muted-foreground", children: "Last job" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: lastJob ? lastJob.jobName : "\u2014" }),
        lastJob && /* @__PURE__ */ jsx(StatusBadge, { status: lastJob.status })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-mono uppercase text-muted-foreground", children: "\u0394 success (recent)" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold text-emerald-700", children: totalSuccess })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-mono uppercase text-muted-foreground", children: "\u0394 errors (recent)" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold text-red-700", children: totalErrors })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-2 text-sm font-medium", children: "Migration jobs" }),
      jobs.length === 0 ? /* @__PURE__ */ jsx("p", { className: "rounded-md border border-dashed border-border p-3 text-sm text-muted-foreground", children: emptyJobsLabel ?? "No SAP migration jobs yet." }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "text-[10px] font-mono uppercase text-muted-foreground", children: /* @__PURE__ */ jsxs("tr", { className: "text-left", children: [
          /* @__PURE__ */ jsx("th", { className: "pb-2 pr-4", children: "Name" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 pr-4", children: "Type" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 pr-4", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 pr-4", children: "Progress" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 pr-4", children: "Started" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: jobs.map((j) => /* @__PURE__ */ jsxs("tr", { "data-testid": "sap-job-row", children: [
          /* @__PURE__ */ jsx("td", { className: "py-2 pr-4 font-medium", children: j.jobName }),
          /* @__PURE__ */ jsx("td", { className: "py-2 pr-4", children: j.jobType }),
          /* @__PURE__ */ jsx("td", { className: "py-2 pr-4", children: /* @__PURE__ */ jsx(StatusBadge, { status: j.status }) }),
          /* @__PURE__ */ jsx("td", { className: "py-2 pr-4", children: j.progressPercent !== null ? `${j.progressPercent}%` : "\u2014" }),
          /* @__PURE__ */ jsx("td", { className: "py-2 pr-4 text-xs text-muted-foreground", children: j.startedAt ? new Date(j.startedAt).toLocaleString() : "\u2014" })
        ] }, j.id)) })
      ] })
    ] })
  ] });
}
function HeuresysMark({
  size = 32,
  color = "var(--accent)",
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      width: size,
      height: size,
      role: "img",
      "aria-label": "Heuresys mark",
      className: cn(className),
      ...rest,
      children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("style", { children: `.hm-y{font-family:'Exo 2',Inter,system-ui,sans-serif;font-weight:700;font-size:32px;letter-spacing:0;fill:${color};}` }) }),
        /* @__PURE__ */ jsx("text", { x: "16", y: "26", textAnchor: "middle", className: "hm-y", children: "y" })
      ]
    }
  );
}
function HeuresysLogoBadge({ children, className, ...rest }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
        className
      ),
      ...rest,
      children
    }
  );
}
var TONE_CLASS = {
  neutral: "text-muted-foreground",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
  disabled: "text-muted-foreground/40"
};
function StatusIcon({
  icon: Icon,
  tone = "neutral",
  size = 20,
  className
}) {
  return /* @__PURE__ */ jsx(Icon, { size, className: cn(TONE_CLASS[tone], className) });
}
function DashboardShell({
  header,
  sidebar,
  footer,
  children,
  initialSidebarWidth = 260,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "h-screen grid grid-rows-[64px_1fr_44px] overflow-hidden bg-background text-foreground",
        className
      ),
      children: [
        header,
        /* @__PURE__ */ jsxs(
          "div",
          {
            "data-shell": "grid",
            className: "grid min-h-0",
            style: { gridTemplateColumns: `${initialSidebarWidth}px 1fr` },
            children: [
              sidebar,
              /* @__PURE__ */ jsx("main", { tabIndex: 0, className: "min-h-0 overflow-y-auto p-6", children })
            ]
          }
        ),
        footer
      ]
    }
  );
}
var PALETTES = [
  { name: "Default \xB7 balanced", vars: ["222 80% 50%", "188 75% 45%", "262 65% 60%", "38 90% 55%"] },
  { name: "Cool ocean", vars: ["178 75% 42%", "195 85% 48%", "215 85% 55%", "245 78% 60%"] },
  { name: "Warm sunset", vars: ["0 80% 55%", "22 92% 55%", "38 90% 55%", "52 92% 60%"] },
  { name: "Brand mono", vars: ["221 83% 35%", "221 75% 48%", "221 65% 60%", "221 55% 72%"] }
];
var STORAGE_KEY2 = "heuresys-palette";
function applyPalette(idx) {
  const p = PALETTES[idx];
  if (!p) return;
  const html = document.documentElement;
  p.vars.forEach((value, i) => html.style.setProperty(`--palette-${i + 1}`, value));
}
function readSavedIdx() {
  if (typeof window === "undefined") return 0;
  const raw = parseInt(window.localStorage.getItem(STORAGE_KEY2) || "0", 10);
  if (!Number.isFinite(raw) || raw < 0 || raw >= PALETTES.length) return 0;
  return raw;
}
function PaletteDropdown() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const rootRef = useRef(null);
  useEffect(() => {
    const saved = readSavedIdx();
    setIdx(saved);
    applyPalette(saved);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  function selectPalette(next) {
    setIdx(next);
    applyPalette(next);
    window.localStorage.setItem(STORAGE_KEY2, String(next));
    setOpen(false);
  }
  return /* @__PURE__ */ jsxs("div", { ref: rootRef, className: "relative", "data-palette-menu-root": true, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        id: "js-palette-trigger",
        type: "button",
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        "aria-controls": "js-palette-menu",
        "aria-label": "Cambia palette accent (apri menu)",
        onClick: (e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        },
        className: "inline-flex h-9 items-center gap-1.5 rounded-control border border-border px-2 transition hover:bg-accent hover:border-foreground/30",
        children: [
          /* @__PURE__ */ jsxs("span", { className: "flex gap-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "h-4 w-4 rounded-sm bg-palette-1" }),
            /* @__PURE__ */ jsx("span", { className: "h-4 w-4 rounded-sm bg-palette-2" }),
            /* @__PURE__ */ jsx("span", { className: "h-4 w-4 rounded-sm bg-palette-3" }),
            /* @__PURE__ */ jsx("span", { className: "h-4 w-4 rounded-sm bg-palette-4" })
          ] }),
          /* @__PURE__ */ jsx("svg", { "data-palette-chevron": true, className: "h-3.5 w-3.5 text-muted-foreground transition-transform", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        id: "js-palette-menu",
        role: "listbox",
        "aria-label": "Palette disponibili",
        hidden: !open,
        className: "absolute right-0 top-full z-50 mt-1.5 w-64 overflow-hidden rounded-card border border-border bg-card shadow-card",
        children: [
          /* @__PURE__ */ jsx("div", { className: "border-b border-border bg-muted/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground", children: "Accent palette" }),
          /* @__PURE__ */ jsx("ul", { className: "py-1", children: PALETTES.map((p, i) => {
            const selected = i === idx;
            return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "button",
              {
                role: "option",
                type: "button",
                "aria-selected": selected,
                onClick: () => selectPalette(i),
                className: "flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-accent",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "flex gap-0.5 shrink-0", children: p.vars.map((v, k) => /* @__PURE__ */ jsx("span", { className: "h-4 w-4 rounded-sm", style: { background: `hsl(${v})` } }, k)) }),
                  /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 text-xs font-medium text-foreground", children: p.name }),
                  /* @__PURE__ */ jsx("svg", { className: `h-3.5 w-3.5 shrink-0 text-primary ${selected ? "" : "hidden"}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) })
                ]
              }
            ) }, p.name);
          }) })
        ]
      }
    )
  ] });
}
var STORAGE_THEME = "heuresys-theme";
function applyTheme2(theme) {
  const html = document.documentElement;
  if (theme === "dark") html.classList.add("dark");
  else html.classList.remove("dark");
}
function DashboardHeader({
  breadcrumb,
  user,
  language = "IT",
  onToggleLanguage,
  onOpenMenu,
  onOpenCommandPalette,
  className,
  logo,
  logoBadge,
  leftExtras,
  rightExtras
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_THEME);
    if (saved === "light" || saved === "dark") applyTheme2(saved);
  }, []);
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    window.localStorage.setItem(STORAGE_THEME, isDark ? "dark" : "light");
  }
  return /* @__PURE__ */ jsxs(
    "header",
    {
      role: "banner",
      className: cn(
        "z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/75",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "Apri menu contesto globale",
              onClick: onOpenMenu,
              className: "inline-flex h-9 w-9 items-center justify-center rounded-control border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30",
              children: /* @__PURE__ */ jsxs("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                /* @__PURE__ */ jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
                /* @__PURE__ */ jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
                /* @__PURE__ */ jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs("a", { href: "/app", "aria-label": "Heuresys \u2014 pagina iniziale autenticata", className: "flex items-center gap-2.5", children: [
            logo ?? /* @__PURE__ */ jsx(HeuresysWordmark, { variant: "brand", size: "md" }),
            logoBadge
          ] }),
          breadcrumb && breadcrumb.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/40", children: "/" }),
            /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: "flex items-center gap-2 text-sm text-muted-foreground", children: breadcrumb.map((b, i) => {
              const isLast = i === breadcrumb.length - 1;
              return /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                isLast ? /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: b.label }) : /* @__PURE__ */ jsx("a", { href: b.href ?? "#", children: b.label }),
                !isLast && /* @__PURE__ */ jsx("svg", { className: "h-3 w-3 opacity-50", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "9 18 15 12 9 6" }) })
              ] }, i);
            }) })
          ] }),
          leftExtras
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              id: "js-command-palette-trigger",
              type: "button",
              "aria-label": "Apri command palette",
              onClick: onOpenCommandPalette,
              className: "hidden md:inline-flex h-9 items-center gap-2 rounded-control border border-border bg-card px-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30",
              children: [
                /* @__PURE__ */ jsxs("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
                  /* @__PURE__ */ jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
                ] }),
                /* @__PURE__ */ jsx("span", { children: "Cerca tenant, log, audit\u2026" }),
                /* @__PURE__ */ jsx("kbd", { className: "ml-2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground", children: "\u2318 K" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              "aria-label": "Cambia lingua tra italiano e inglese",
              onClick: onToggleLanguage,
              className: "inline-flex h-9 items-center gap-2 rounded-control border border-border px-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30",
              children: [
                /* @__PURE__ */ jsxs("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
                  /* @__PURE__ */ jsx("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
                  /* @__PURE__ */ jsx("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: language })
              ]
            }
          ),
          /* @__PURE__ */ jsx(PaletteDropdown, {}),
          /* @__PURE__ */ jsxs(
            "button",
            {
              id: "js-theme-toggle",
              type: "button",
              "aria-label": "Alterna tema chiaro/scuro",
              onClick: toggleTheme,
              className: "inline-flex h-9 w-9 items-center justify-center rounded-control border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30",
              children: [
                /* @__PURE__ */ jsxs("svg", { className: "h-4 w-4 [.dark_&]:hidden", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "5" }),
                  /* @__PURE__ */ jsx("line", { x1: "12", y1: "1", x2: "12", y2: "3" }),
                  /* @__PURE__ */ jsx("line", { x1: "12", y1: "21", x2: "12", y2: "23" }),
                  /* @__PURE__ */ jsx("line", { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" }),
                  /* @__PURE__ */ jsx("line", { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78" }),
                  /* @__PURE__ */ jsx("line", { x1: "1", y1: "12", x2: "3", y2: "12" }),
                  /* @__PURE__ */ jsx("line", { x1: "21", y1: "12", x2: "23", y2: "12" }),
                  /* @__PURE__ */ jsx("line", { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36" }),
                  /* @__PURE__ */ jsx("line", { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22" })
                ] }),
                /* @__PURE__ */ jsx("svg", { className: "hidden h-4 w-4 [.dark_&]:block", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" }) })
              ]
            }
          ),
          user && /* @__PURE__ */ jsxs("div", { className: "ml-1 flex items-center gap-2 rounded-control border border-border bg-card px-2 py-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: `relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-${user.roleTone ?? "palette-3"}/20 text-xs font-semibold text-${user.roleTone ?? "palette-3"}`, children: user.initials }),
            /* @__PURE__ */ jsxs("div", { className: "hidden flex-col leading-tight sm:flex", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: user.username }),
              /* @__PURE__ */ jsx("span", { className: `font-mono text-[10px] uppercase tracking-wider text-${user.roleTone ?? "warning"}`, children: user.role })
            ] })
          ] }),
          rightExtras
        ] })
      ]
    }
  );
}
var STORAGE_SIDEBAR = "heuresys-sidebar";
var STORAGE_GROUPS = "heuresys-sidebar-groups";
function applySidebarState(collapsed) {
  const body = document.body;
  const grid = document.querySelector('[data-shell="grid"]');
  if (collapsed) {
    body.setAttribute("data-sidebar", "collapsed");
    if (grid) grid.style.setProperty("grid-template-columns", "72px 1fr", "important");
  } else {
    body.removeAttribute("data-sidebar");
    if (grid) grid.style.setProperty("grid-template-columns", "260px 1fr", "important");
  }
}
function DashboardSidebar({ groups, footerSlot, className }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_SIDEBAR);
    applySidebarState(saved === "collapsed");
  }, []);
  function toggleSidebar() {
    const isCollapsed = document.body.getAttribute("data-sidebar") === "collapsed";
    applySidebarState(!isCollapsed);
    window.localStorage.setItem(STORAGE_SIDEBAR, !isCollapsed ? "collapsed" : "expanded");
  }
  return /* @__PURE__ */ jsx(
    "aside",
    {
      "aria-label": "Navigazione principale",
      className: cn("min-h-0 overflow-hidden border-r border-border bg-sidebar text-sidebar-foreground", className),
      children: /* @__PURE__ */ jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex h-11 shrink-0 items-center justify-between border-b border-border px-3", children: [
          /* @__PURE__ */ jsx("span", { className: "sidebar-section-label text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground", children: "Navigation" }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              id: "js-sidebar-toggle",
              type: "button",
              "aria-label": "Comprimi/espandi sidebar",
              onClick: toggleSidebar,
              className: "inline-flex h-8 w-8 items-center justify-center rounded-control text-muted-foreground transition hover:bg-accent hover:text-foreground",
              children: [
                /* @__PURE__ */ jsxs("svg", { className: "sidebar-icon-collapse h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
                  /* @__PURE__ */ jsx("line", { x1: "9", y1: "3", x2: "9", y2: "21" }),
                  /* @__PURE__ */ jsx("polyline", { points: "14 9 11 12 14 15" })
                ] }),
                /* @__PURE__ */ jsxs("svg", { className: "sidebar-icon-expand hidden h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
                  /* @__PURE__ */ jsx("line", { x1: "9", y1: "3", x2: "9", y2: "21" }),
                  /* @__PURE__ */ jsx("polyline", { points: "11 9 14 12 11 15" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("nav", { className: "min-h-0 flex-1 overflow-y-auto px-2 py-3", children: groups.map((group) => /* @__PURE__ */ jsx(SidebarGroup, { group }, group.id)) }),
        footerSlot ?? /* @__PURE__ */ jsx(DefaultSidebarFooter, {})
      ] })
    }
  );
}
function SidebarGroup({ group }) {
  const [expanded, setExpanded] = React53.useState(group.defaultExpanded ?? true);
  React53.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const state = JSON.parse(window.localStorage.getItem(STORAGE_GROUPS) || "{}");
      if (state[group.id] === false) setExpanded(false);
    } catch {
    }
  }, [group.id]);
  function toggle() {
    setExpanded((prev) => {
      const next = !prev;
      try {
        const state = JSON.parse(window.localStorage.getItem(STORAGE_GROUPS) || "{}");
        state[group.id] = next;
        window.localStorage.setItem(STORAGE_GROUPS, JSON.stringify(state));
      } catch {
      }
      return next;
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: "sidebar-group mb-3", "data-group": group.id, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        "data-group-toggle": group.id,
        "aria-expanded": expanded,
        onClick: toggle,
        className: "sidebar-group-toggle flex w-full items-center justify-between gap-2 rounded-control px-2 py-1 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70 transition hover:text-foreground",
        children: [
          /* @__PURE__ */ jsx("span", { children: group.label }),
          /* @__PURE__ */ jsx("svg", { "data-group-chevron": true, className: "h-3 w-3 transition-transform", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
        ]
      }
    ),
    group.customContent ? /* @__PURE__ */ jsx("ul", { className: "sidebar-group-content mt-0.5 space-y-0.5", children: group.customContent }) : /* @__PURE__ */ jsx("ul", { className: "sidebar-group-content mt-0.5 space-y-0.5", children: (group.items ?? []).map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: item.href,
        "aria-current": item.active ? "page" : void 0,
        className: cn(
          "nav-link flex items-center justify-between gap-2 rounded-control px-2 py-2 text-sm transition",
          item.active ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground"
        ),
        style: item.active ? { boxShadow: "inset 2px 0 0 var(--primary)" } : void 0,
        children: [
          /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [
            item.icon && /* @__PURE__ */ jsx("span", { className: "shrink-0", children: item.icon }),
            /* @__PURE__ */ jsx("span", { className: "nav-label truncate", children: item.label })
          ] }),
          item.aux && /* @__PURE__ */ jsx("span", { className: "nav-aux", children: item.aux })
        ]
      }
    ) }, item.id)) })
  ] });
}
function DefaultSidebarFooter() {
  return /* @__PURE__ */ jsx("div", { className: "sidebar-footer-card shrink-0 border-t border-border p-3", children: /* @__PURE__ */ jsxs("div", { className: "rounded-control border border-border bg-card px-2.5 py-1.5 leading-tight", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px] text-foreground", children: "v5.0.0-mvp3" }),
      /* @__PURE__ */ jsx("span", { className: "inline-flex h-1.5 w-1.5 rounded-full bg-success", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-muted-foreground", children: "production \xB7 build \u2014" })
  ] }) });
}
var DEFAULT_SOCIALS = [
  { id: "linkedin", href: "#", label: "Open Heuresys on LinkedIn" },
  { id: "github", href: "#", label: "Open Heuresys on GitHub" },
  { id: "discord", href: "#", label: "Join Heuresys on Discord" },
  { id: "facebook", href: "#", label: "Open Heuresys on Facebook" },
  { id: "x", href: "#", label: "Open Heuresys on X (Twitter)" }
];
function DashboardFooter({
  rightSlot,
  socials = DEFAULT_SOCIALS,
  websiteHref = "https://www.heuresys.com",
  className
}) {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      role: "contentinfo",
      className: cn(
        "z-30 flex h-11 items-center justify-between border-t border-border bg-background px-4 text-xs text-muted-foreground",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("span", { className: "tabular-nums", children: [
            "\xA9 ",
            currentYear
          ] }),
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "text-border", children: "\xB7" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: websiteHref,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": "Open Heuresys public website",
              className: "font-medium text-muted-foreground transition hover:text-foreground hover:underline",
              children: "heuresys.com"
            }
          ),
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "text-border", children: "\xB7" }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0.5", children: socials.map((s) => /* @__PURE__ */ jsx(SocialAnchor, { link: s }, s.id)) })
        ] }),
        rightSlot && /* @__PURE__ */ jsx("div", { className: "hidden items-center gap-3 font-mono text-[10px] md:flex", children: rightSlot })
      ]
    }
  );
}
function SocialAnchor({ link }) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: link.href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": link.label,
      className: "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground",
      children: renderIcon(link.id)
    }
  );
}
function renderIcon(id) {
  switch (id) {
    case "linkedin":
      return /* @__PURE__ */ jsxs("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }),
        /* @__PURE__ */ jsx("rect", { x: "2", y: "9", width: "4", height: "12" }),
        /* @__PURE__ */ jsx("circle", { cx: "4", cy: "4", r: "2" })
      ] });
    case "github":
      return /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" }) });
    case "discord":
      return /* @__PURE__ */ jsxs("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("path", { d: "M19.27 5.33A16.5 16.5 0 0 0 15 4l-.5 1.05a14.5 14.5 0 0 0-5 0L9 4a16.5 16.5 0 0 0-4.27 1.33C2.13 9.21 1.6 13.04 1.92 16.81c1.86 1.4 3.66 2.24 5.42 2.79c.4-.55.77-1.13 1.07-1.73a10.5 10.5 0 0 1-1.65-.78c.14-.1.27-.2.4-.3a11.6 11.6 0 0 0 9.55 0c.13.1.26.2.4.3c-.53.31-1.08.57-1.65.79c.3.6.66 1.18 1.07 1.73c1.77-.55 3.57-1.4 5.43-2.79c.32-3.77-.21-7.6-2.81-11.48z" }),
        /* @__PURE__ */ jsx("circle", { cx: "8.5", cy: "13", r: "1.5" }),
        /* @__PURE__ */ jsx("circle", { cx: "15.5", cy: "13", r: "1.5" })
      ] });
    case "facebook":
      return /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" }) });
    case "x":
      return /* @__PURE__ */ jsx("svg", { className: "h-3.5 w-3.5", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M18.244 2H21.5l-7.11 8.13L22.75 22h-6.54l-5.12-6.69L5.23 22H1.97l7.6-8.69L1.55 2h6.7l4.63 6.12L18.244 2Zm-1.14 17.91h1.8L7.27 3.98H5.34l11.764 15.93Z" }) });
  }
}
var STORAGE_KEY3 = "heuresys-sidebar-groups";
function readGroupState() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY3) || "{}");
  } catch {
    return {};
  }
}
function writeGroupState(state) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY3, JSON.stringify(state));
}
function GroupToggle({ groupId, label, children, className }) {
  const [expanded, setExpanded] = useState(true);
  useEffect(() => {
    const state = readGroupState();
    if (state[groupId] === false) setExpanded(false);
  }, [groupId]);
  function toggle() {
    const next = !expanded;
    setExpanded(next);
    const state = readGroupState();
    state[groupId] = next;
    writeGroupState(state);
  }
  return /* @__PURE__ */ jsxs("div", { className: `sidebar-group ${className ?? ""}`.trim(), "data-group": groupId, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        "data-group-toggle": groupId,
        "aria-expanded": expanded,
        onClick: toggle,
        className: "sidebar-group-toggle flex w-full items-center justify-between gap-2 rounded-control px-2 py-1 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70 transition hover:text-foreground",
        children: [
          /* @__PURE__ */ jsx("span", { children: label }),
          /* @__PURE__ */ jsx("svg", { "data-group-chevron": true, className: "h-3 w-3 transition-transform", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("ul", { className: "sidebar-group-content mt-0.5 space-y-0.5", children })
  ] });
}
var VARIANT_STYLES2 = {
  warning: {
    border: "border-l-warning border-y-warning/30 border-r-warning/30",
    bg: "bg-warning/5",
    iconBg: "bg-warning/15",
    iconColor: "text-warning"
  },
  danger: {
    border: "border-l-danger border-y-danger/30 border-r-danger/30",
    bg: "bg-danger/5",
    iconBg: "bg-danger/15",
    iconColor: "text-danger"
  },
  info: {
    border: "border-l-info border-y-info/30 border-r-info/30",
    bg: "bg-info/5",
    iconBg: "bg-info/15",
    iconColor: "text-info"
  },
  success: {
    border: "border-l-success border-y-success/30 border-r-success/30",
    bg: "bg-success/5",
    iconBg: "bg-success/15",
    iconColor: "text-success"
  }
};
function AlertBanner({ variant = "warning", icon, title, meta, details, actions, onDismiss }) {
  const s = VARIANT_STYLES2[variant];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "alert",
      "aria-live": "polite",
      className: `flex items-start gap-3 rounded-card border-l-4 border-y border-r ${s.border} ${s.bg} px-4 py-3 shadow-card`,
      children: [
        /* @__PURE__ */ jsx("span", { className: `mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${s.iconBg} ${s.iconColor}`, children: icon ?? /* @__PURE__ */ jsxs("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
          /* @__PURE__ */ jsx("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
          /* @__PURE__ */ jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-baseline gap-x-3 gap-y-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-foreground", children: title }),
            meta
          ] }),
          details && /* @__PURE__ */ jsx("div", { className: "mt-1 flex items-center gap-2 font-mono text-[10px] text-muted-foreground", children: details })
        ] }),
        (actions || onDismiss) && /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [
          actions?.map((a, i) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: a.onClick,
              className: a.variant === "primary" ? `inline-flex h-8 items-center gap-1.5 rounded-control border border-${variant}/40 bg-${variant}/10 px-3 text-xs font-medium text-${variant} transition hover:bg-${variant}/20` : "inline-flex h-8 items-center gap-1.5 rounded-control border border-border bg-card px-3 text-xs font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30",
              children: a.label
            },
            i
          )),
          onDismiss && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "Chiudi banner",
              onClick: onDismiss,
              className: "inline-flex h-8 w-8 items-center justify-center rounded-control text-muted-foreground transition hover:bg-accent hover:text-foreground",
              children: /* @__PURE__ */ jsxs("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] })
            }
          )
        ] })
      ]
    }
  );
}

// src/lib/table-cursor.ts
function attachCrossHair(table) {
  const headerCells = Array.from(table.querySelectorAll("thead th"));
  const bodyRows = Array.from(table.querySelectorAll("tbody tr"));
  const listeners = [];
  function on(el, type, handler) {
    el.addEventListener(type, handler);
    listeners.push({ el, type, handler });
  }
  function clearTableCross() {
    table.querySelectorAll(".col-cross").forEach((el) => el.classList.remove("col-cross"));
    table.querySelectorAll(".cell-cross").forEach((el) => el.classList.remove("cell-cross"));
    table.querySelectorAll(".col-hover-header").forEach((el) => el.classList.remove("col-hover-header"));
  }
  headerCells.forEach((th, colIdx) => {
    on(th, "mouseenter", () => {
      clearTableCross();
      th.classList.add("col-hover-header");
      bodyRows.forEach((row) => {
        const cell = row.children[colIdx];
        if (cell) cell.classList.add("col-cross");
      });
    });
    on(th, "mouseleave", clearTableCross);
  });
  bodyRows.forEach((row) => {
    Array.from(row.children).forEach((td, colIdx) => {
      on(td, "mouseenter", () => {
        clearTableCross();
        const header = headerCells[colIdx];
        if (header) header.classList.add("col-hover-header");
        bodyRows.forEach((r) => {
          const c = r.children[colIdx];
          if (c) c.classList.add("col-cross");
        });
        td.classList.add("cell-cross");
      });
      on(td, "mouseleave", clearTableCross);
    });
  });
  return function unbind() {
    listeners.forEach(({ el, type, handler }) => el.removeEventListener(type, handler));
    clearTableCross();
  };
}
function DataTableWithCrossHair({
  caption,
  enableCrossHair = true,
  children,
  className
}) {
  const tableRef = useRef(null);
  useEffect(() => {
    if (!enableCrossHair || !tableRef.current) return;
    const unbind = attachCrossHair(tableRef.current);
    return unbind;
  }, [enableCrossHair]);
  const regionLabel = typeof caption === "string" && caption.trim() ? caption : "Data table";
  return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", tabIndex: 0, role: "region", "aria-label": regionLabel, children: /* @__PURE__ */ jsxs("table", { ref: tableRef, className: `w-full text-sm ${className ?? ""}`.trim(), children: [
    caption && /* @__PURE__ */ jsx("caption", { className: "sr-only", children: caption }),
    children
  ] }) });
}
var DEFAULT_OPTIONS = [
  { value: "15m", label: "15m" },
  { value: "1h", label: "1h" },
  { value: "24h", label: "24h" },
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" }
];
function TimeRangeSelector({
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  className,
  ariaLabel = "Time range"
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "radiogroup",
      "aria-label": ariaLabel,
      className: cn(
        "inline-flex items-center rounded-control border border-border bg-card p-0.5",
        className
      ),
      children: options.map((opt) => {
        const active = opt.value === value;
        return /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": active,
            onClick: () => onChange?.(opt.value),
            className: cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition",
              active ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
            ),
            children: opt.label
          },
          opt.value
        );
      })
    }
  );
}
function RefreshGlyph() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: "h-4 w-4",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("polyline", { points: "23 4 23 10 17 10" }),
        /* @__PURE__ */ jsx("polyline", { points: "1 20 1 14 7 14" }),
        /* @__PURE__ */ jsx("path", { d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" })
      ]
    }
  );
}
function ExportGlyph() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: "h-4 w-4",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
        /* @__PURE__ */ jsx("polyline", { points: "7 10 12 15 17 10" }),
        /* @__PURE__ */ jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
      ]
    }
  );
}
function PageActions({
  onRefresh,
  onExport,
  refreshLabel = "Aggiorna",
  exportLabel = "Export report",
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-2", className), children: [
    onRefresh !== void 0 ? /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        "aria-label": refreshLabel,
        onClick: onRefresh,
        className: "inline-flex h-9 items-center gap-2 rounded-control border border-border bg-card px-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30",
        children: [
          /* @__PURE__ */ jsx(RefreshGlyph, {}),
          refreshLabel
        ]
      }
    ) : null,
    onExport !== void 0 ? /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: onExport,
        className: "inline-flex h-9 items-center gap-2 rounded-control bg-primary px-3 text-sm font-medium text-background transition hover:opacity-90",
        style: { color: "var(--background)" },
        children: [
          /* @__PURE__ */ jsx(ExportGlyph, {}),
          exportLabel
        ]
      }
    ) : null
  ] });
}
function KPIStrip({ items }) {
  return /* @__PURE__ */ jsx("section", { "aria-label": "Indicatori principali", className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5", children: items.map((kpi, i) => /* @__PURE__ */ jsx(KpiCard, { ...kpi }, i)) });
}
function KpiCard(props) {
  const {
    label,
    value,
    unit,
    icon,
    iconTone = "success",
    sparkline,
    sparklineTone = "success",
    footerLeft,
    footerRight,
    body
  } = props;
  return /* @__PURE__ */ jsxs("article", { className: "rounded-card border border-border bg-card p-4 shadow-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-baseline gap-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "num text-2xl font-semibold text-foreground", children: value }),
          unit && /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: unit })
        ] })
      ] }),
      icon && /* @__PURE__ */ jsx("span", { className: `inline-flex h-7 w-7 items-center justify-center rounded-control bg-${iconTone}/10 text-${iconTone}`, children: icon })
    ] }),
    body ?? (sparkline && /* @__PURE__ */ jsx(SparklineMini, { values: sparkline, tone: sparklineTone })),
    (footerLeft || footerRight) && /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center justify-between text-[11px] text-muted-foreground", children: [
      /* @__PURE__ */ jsx("span", { children: footerLeft }),
      /* @__PURE__ */ jsx("span", { children: footerRight })
    ] })
  ] });
}
function SparklineMini({ values, tone }) {
  if (values.length < 2) return null;
  const W = 120, H = 28;
  const step = W / (values.length - 1);
  const points = values.map((v, i) => `${i * step},${H - v * (H - 4) - 2}`).join(" ");
  const areaPoints = `${points} ${W},${H} 0,${H}`;
  const stroke = `var(--${tone})`;
  const areaFill = `color-mix(in srgb, var(--${tone}) 12%, transparent)`;
  return /* @__PURE__ */ jsxs("svg", { viewBox: `0 0 ${W} ${H}`, className: "mt-3 h-7 w-full", "aria-hidden": "true", preserveAspectRatio: "none", children: [
    /* @__PURE__ */ jsx("polyline", { points, fill: "none", stroke, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx("polyline", { points: areaPoints, fill: areaFill, stroke: "none" })
  ] });
}
function LogStream({
  entries,
  title = "Live log stream",
  sourceLabel = "fastify \xB7 pino",
  activeFilter = "info",
  totalCount,
  windowLabel = "last 15m",
  connected = true,
  onFilterChange,
  onPauseToggle,
  paused
}) {
  return /* @__PURE__ */ jsxs("article", { className: "rounded-card border border-border bg-card shadow-card lg:col-span-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border px-5 py-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex h-1.5 w-1.5 rounded-full bg-info pulse-dot", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-foreground", children: title }),
        /* @__PURE__ */ jsx("span", { className: "rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground", children: sourceLabel })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        ["all", "info", "warn", "error"].map((f) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => onFilterChange?.(f),
            className: `rounded-control px-2 py-1 text-[11px] font-medium transition ${f === activeFilter ? "bg-accent text-foreground" : f === "warn" ? "text-warning hover:bg-accent" : f === "error" ? "text-danger hover:bg-accent" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`,
            children: f
          },
          f
        )),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": paused ? "Riprendi stream" : "Pausa stream",
            onClick: onPauseToggle,
            className: "ml-1 inline-flex h-7 w-7 items-center justify-center rounded-control text-muted-foreground hover:bg-accent hover:text-foreground",
            children: /* @__PURE__ */ jsx("svg", { className: "h-3.5 w-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: paused ? /* @__PURE__ */ jsx("polygon", { points: "5 3 19 12 5 21 5 3" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("rect", { x: "6", y: "4", width: "4", height: "16" }),
              /* @__PURE__ */ jsx("rect", { x: "14", y: "4", width: "4", height: "16" })
            ] }) })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("ol", { className: "max-h-[420px] divide-y divide-border/60 overflow-y-auto", "aria-live": "polite", children: entries.map((e, i) => /* @__PURE__ */ jsxs("li", { className: "log-line flex items-start gap-3 px-5 py-2", children: [
      /* @__PURE__ */ jsx("span", { className: "ts shrink-0 whitespace-nowrap font-mono", children: e.timestamp }),
      /* @__PURE__ */ jsx("span", { className: `lvl-${e.level} shrink-0 font-mono font-semibold`, children: e.level.toUpperCase().padEnd(5) }),
      /* @__PURE__ */ jsx("span", { className: `shrink-0 rounded-sm bg-${e.sourceTone ?? "palette-1"}/15 px-1.5 font-mono text-[10px] text-${e.sourceTone ?? "palette-1"}`, children: e.source }),
      /* @__PURE__ */ jsxs("span", { className: "text-foreground", children: [
        e.message,
        " ",
        e.meta && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: e.meta })
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-border px-5 py-2.5 font-mono text-[10px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "tailing \xB7 ",
        entries.length,
        totalCount != null ? ` / ${totalCount}` : "",
        " lines \xB7 ",
        windowLabel
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-full bg-${connected ? "success" : "danger"} pulse-dot` }),
        connected ? "connected" : "disconnected"
      ] })
    ] })
  ] });
}
function AuditFeed({
  events,
  title = "Audit feed",
  subtitle = "RBAC changes \xB7 auth events \xB7 migrations \xB7 last 24h",
  onViewAll
}) {
  return /* @__PURE__ */ jsxs("article", { className: "rounded-card border border-border bg-card shadow-card lg:col-span-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border px-5 py-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-foreground", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: subtitle })
      ] }),
      onViewAll && /* @__PURE__ */ jsx("button", { type: "button", onClick: onViewAll, className: "text-xs font-medium text-primary transition hover:underline", children: "view all \u2192" })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "max-h-[420px] divide-y divide-border/60 overflow-y-auto", children: events.map((ev, i) => /* @__PURE__ */ jsx("li", { className: "px-5 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: `mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-${ev.tone}/15 text-${ev.tone}`, children: ev.icon }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-foreground", children: /* @__PURE__ */ jsx("span", { className: "font-medium", children: ev.title }) }),
        ev.description && /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-xs text-muted-foreground", children: ev.description }),
        ev.meta && /* @__PURE__ */ jsx("div", { className: "mt-1 flex items-center gap-2 font-mono text-[10px] text-muted-foreground", children: ev.meta })
      ] })
    ] }) }, i)) })
  ] });
}
var SEVERITY_TONE = { P1: "danger", P2: "warning", P3: "info" };
var STATUS_TONE = { ACTIVE: "warning", ACKNOWLEDGED: "info", RESOLVED: "success" };
function IncidentTimeline({
  items,
  title = "Incident timeline",
  subtitle = "Last 24h \xB7 severity tracked",
  counts,
  onViewFullLog
}) {
  return /* @__PURE__ */ jsxs("article", { className: "rounded-card border border-border bg-card p-5 shadow-card lg:col-span-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-foreground", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: subtitle })
      ] }),
      counts && /* @__PURE__ */ jsxs("div", { className: "flex gap-1 text-[11px]", children: [
        /* @__PURE__ */ jsx(SeverityPill, { sev: "P1", count: counts.p1 ?? 0 }),
        /* @__PURE__ */ jsx(SeverityPill, { sev: "P2", count: counts.p2 ?? 0 }),
        /* @__PURE__ */ jsx(SeverityPill, { sev: "P3", count: counts.p3 ?? 0 })
      ] })
    ] }),
    /* @__PURE__ */ jsx("ol", { className: "relative mt-5 space-y-4 border-l border-border pl-5", children: items.map((it, i) => {
      const sevTone = SEVERITY_TONE[it.severity];
      const statusTone2 = STATUS_TONE[it.status];
      const isResolved = it.status === "RESOLVED";
      return /* @__PURE__ */ jsxs("li", { className: "relative", children: [
        /* @__PURE__ */ jsx("span", { className: `absolute -left-[27px] mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-${sevTone} ring-4 ring-${sevTone}/20`, children: isResolved ? /* @__PURE__ */ jsx("svg", { className: "h-2.5 w-2.5 text-card", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }) : /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-card pulse-dot" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-foreground", children: it.title }),
          /* @__PURE__ */ jsxs("span", { className: `rounded-sm bg-${statusTone2}/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-${statusTone2}`, children: [
            it.severity,
            " \xB7 ",
            it.status
          ] })
        ] }),
        it.description && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: it.description }),
        it.meta && /* @__PURE__ */ jsx("div", { className: "mt-1 font-mono text-[10px] text-muted-foreground", children: it.meta })
      ] }, i);
    }) }),
    onViewFullLog && /* @__PURE__ */ jsx("div", { className: "mt-4 border-t border-border pt-3 text-center", children: /* @__PURE__ */ jsx("button", { type: "button", onClick: onViewFullLog, className: "inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline", children: "view full incident log \u2192" }) })
  ] });
}
function SeverityPill({ sev, count }) {
  const tone = SEVERITY_TONE[sev];
  return /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1 rounded-full bg-${tone}/15 px-2 py-0.5 font-mono font-medium text-${tone}`, children: [
    sev,
    "\xB7",
    count
  ] });
}
function SQLSlowQueryTable({
  rows,
  totalTracked,
  sampleSince,
  totalCaptured,
  onResetStats,
  onOpenExplain
}) {
  return /* @__PURE__ */ jsx("section", { "aria-label": "SQL slow queries top", children: /* @__PURE__ */ jsxs("article", { className: "overflow-hidden rounded-card border border-border bg-card shadow-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex h-8 w-8 items-center justify-center rounded-control bg-palette-3/15 text-palette-3", children: /* @__PURE__ */ jsxs("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
          /* @__PURE__ */ jsx("polyline", { points: "12 6 12 12 16 14" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-sm font-semibold text-foreground", children: [
            "SQL slow query \xB7 top ",
            rows.length
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "pg_stat_statements \xB7 threshold p95 > 100ms \xB7 last 24h \xB7 ranked by total time" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        onResetStats && /* @__PURE__ */ jsx("button", { type: "button", onClick: onResetStats, className: "inline-flex h-9 items-center gap-2 rounded-control border border-border px-3 text-xs font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30", children: "Reset stats" }),
        onOpenExplain && rows[0] && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => onOpenExplain(rows[0]), className: "inline-flex h-9 items-center gap-2 rounded-control bg-palette-3/10 px-3 text-xs font-medium text-palette-3 transition hover:bg-palette-3/20", children: "Open EXPLAIN" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(DataTableWithCrossHair, { enableCrossHair: true, children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border bg-muted/30 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground", children: [
        /* @__PURE__ */ jsx("th", { className: "w-10 px-3 py-2.5 text-right", children: "#" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2.5", children: "Query" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2.5", children: "Tenant" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2.5 text-right", children: "Calls" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2.5 text-right", children: "p95" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2.5 text-right", children: "Mean" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2.5", children: "Total time" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2.5", children: "Last seen" }),
        /* @__PURE__ */ jsx("th", { className: "w-12 px-3 py-2.5" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: rows.map((r) => {
        const p95Tone = r.p95Ms >= 1e3 ? "text-danger" : r.p95Ms >= 300 ? "text-warning" : "text-foreground";
        return /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "num px-3 py-2.5 text-right font-mono text-[10px] text-muted-foreground", children: String(r.rank).padStart(2, "0") }),
          /* @__PURE__ */ jsxs("td", { className: "px-3 py-2.5", children: [
            /* @__PURE__ */ jsx("div", { className: "font-mono text-[12px] text-foreground", children: r.query }),
            r.queryNote && /* @__PURE__ */ jsx("div", { className: "mt-0.5 font-mono text-[10px] text-muted-foreground", children: r.queryNote })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center gap-1.5 rounded-md bg-${r.tenantTone ?? "muted"}/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-${r.tenantTone ?? "muted-foreground"}`, children: r.tenant }) }),
          /* @__PURE__ */ jsx("td", { className: "num px-3 py-2.5 text-right tabular-nums text-foreground", children: r.calls.toLocaleString() }),
          /* @__PURE__ */ jsx("td", { className: "num px-3 py-2.5 text-right tabular-nums", children: /* @__PURE__ */ jsxs("span", { className: `font-mono font-medium ${p95Tone}`, children: [
            r.p95Ms.toLocaleString(),
            " ms"
          ] }) }),
          /* @__PURE__ */ jsxs("td", { className: "num px-3 py-2.5 text-right tabular-nums font-mono text-muted-foreground", children: [
            r.meanMs.toLocaleString(),
            " ms"
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-1.5 w-24 overflow-hidden rounded-full bg-border", children: /* @__PURE__ */ jsx("div", { className: `h-full bg-${r.totalTimeTone ?? "palette-2"}`, style: { width: `${r.totalTimeBarPct}%` } }) }),
            /* @__PURE__ */ jsx("span", { className: "num font-mono text-[10px] text-foreground", children: r.totalTimeLabel })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2.5 font-mono text-[11px] text-muted-foreground", children: r.lastSeen }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-2.5 text-right", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "EXPLAIN plan",
              onClick: () => onOpenExplain?.(r),
              className: "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground",
              children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "9 18 15 12 9 6" }) })
            }
          ) })
        ] }, r.rank);
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-border px-5 py-2.5 text-[10px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
        "showing ",
        rows.length,
        totalTracked != null ? ` / ${totalTracked} tracked queries` : ""
      ] }),
      (totalCaptured || sampleSince) && /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
        totalCaptured ? `total time captured \xB7 ${totalCaptured}` : "",
        sampleSince ? ` \xB7 sample since ${sampleSince}` : ""
      ] })
    ] })
  ] }) });
}
function RBACMatrix({
  roles,
  rows,
  lastReload,
  totalMappings,
  totalRoles,
  totalPermissions,
  onExportCsv,
  onViewFull
}) {
  return /* @__PURE__ */ jsx("section", { "aria-label": "RBAC permissions matrix", children: /* @__PURE__ */ jsxs("article", { className: "overflow-hidden rounded-card border border-border bg-card shadow-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex h-8 w-8 items-center justify-center rounded-control bg-palette-1/15 text-palette-1", children: /* @__PURE__ */ jsxs("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
          /* @__PURE__ */ jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-foreground", children: "RBAC permissions matrix" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
            totalRoles ?? roles.length,
            " roles \xD7 ",
            totalMappings ?? "\u2014",
            " mappings \xB7 cached in memory",
            lastReload ? ` \xB7 last reload ${lastReload}` : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Legend, {}),
        onExportCsv && /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onExportCsv,
            className: "inline-flex h-9 items-center gap-2 rounded-control border border-border px-3 text-xs font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30",
            children: [
              /* @__PURE__ */ jsxs("svg", { className: "h-3.5 w-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                /* @__PURE__ */ jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                /* @__PURE__ */ jsx("polyline", { points: "7 10 12 15 17 10" }),
                /* @__PURE__ */ jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
              ] }),
              "Export CSV"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(DataTableWithCrossHair, { enableCrossHair: true, children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border bg-muted/30 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground", children: [
        /* @__PURE__ */ jsx("th", { className: "sticky left-0 bg-muted/30 px-5 py-3 text-left", children: "Permission" }),
        roles.map((role) => {
          const lines = (role.label ?? role.code).split(/[_\s]+/);
          return /* @__PURE__ */ jsx("th", { className: "px-2 py-3 text-center", children: /* @__PURE__ */ jsx("span", { className: `block text-${role.tone}`, children: lines.map((l, i) => /* @__PURE__ */ jsx("span", { className: "block", children: l }, i)) }) }, role.code);
        })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: rows.map((row) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsxs("td", { className: "sticky left-0 bg-card px-5 py-2.5", children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-[12px] text-foreground", children: row.permission }),
          /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-muted-foreground", children: row.description })
        ] }),
        row.states.map((state, i) => /* @__PURE__ */ jsx("td", { className: "px-2 py-2.5", children: /* @__PURE__ */ jsx(Cell, { state, title: row.scopeTitles?.[i] }) }, i))
      ] }, row.permission)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-border px-5 py-2.5 text-[10px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
        "showing ",
        rows.length,
        totalPermissions != null ? ` / ${totalPermissions} permission codes` : ""
      ] }),
      onViewFull && /* @__PURE__ */ jsx("button", { type: "button", onClick: onViewFull, className: "font-medium text-primary hover:underline", children: "view full matrix \u2192" })
    ] })
  ] }) });
}
function Legend() {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[11px]", children: [
    /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-success/20 text-success", children: /* @__PURE__ */ jsx("svg", { className: "h-2.5 w-2.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "granted" })
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-warning/20 text-warning font-mono text-[9px] font-bold", children: "\u25D0" }),
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "scoped" })
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-muted text-muted-foreground/60", children: "\xB7" }),
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "denied" })
    ] })
  ] });
}
function Cell({ state, title }) {
  if (state === "granted") return /* @__PURE__ */ jsx("span", { className: "mx-auto flex h-5 w-5 items-center justify-center rounded-sm bg-success/20 text-success", children: /* @__PURE__ */ jsx("svg", { className: "h-3 w-3", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }) });
  if (state === "scoped") return /* @__PURE__ */ jsx("span", { className: "mx-auto flex h-5 w-5 items-center justify-center rounded-sm bg-warning/20 text-warning", title, children: /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] font-bold", children: "\u25D0" }) });
  return /* @__PURE__ */ jsx("span", { className: "mx-auto flex h-5 w-5 items-center justify-center rounded-sm bg-muted text-muted-foreground/60", children: "\xB7" });
}
var STATUS_TONE2 = {
  healthy: { tone: "success", label: "Healthy" },
  degraded: { tone: "warning", label: "Degraded" },
  down: { tone: "danger", label: "Down" }
};
function poolTone(pct) {
  if (pct >= 85) return "danger";
  if (pct >= 60) return "warning";
  if (pct >= 20) return "success";
  return "palette-1";
}
function errorsTone(n) {
  if (n >= 50) return "text-danger";
  if (n >= 10) return "text-warning";
  return "text-muted-foreground";
}
function TenantFleetTable({
  rows,
  title = "Tenant fleet",
  subtitle = "Cross-tenant operational status \u2014 schema metrics, brownfield import state, last activity",
  onOpenDetail,
  onSearch,
  onOpenFilters
}) {
  return /* @__PURE__ */ jsx("section", { "aria-label": "Tenant fleet operativo", children: /* @__PURE__ */ jsxs("article", { className: "overflow-hidden rounded-card border border-border bg-card shadow-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-foreground", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: subtitle })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs("svg", { className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
            /* @__PURE__ */ jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "search",
              placeholder: "Filter tenant\u2026",
              "aria-label": "Filtra tenant per nome o codice",
              onChange: (e) => onSearch?.(e.target.value),
              className: "h-9 rounded-control border border-border bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onOpenFilters,
            className: "inline-flex h-9 items-center gap-2 rounded-control border border-border px-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground hover:border-foreground/30",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
              "Filters"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(DataTableWithCrossHair, { enableCrossHair: true, children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border bg-muted/30 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground", children: [
        /* @__PURE__ */ jsx("th", { className: "px-5 py-2.5", children: "Tenant" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2.5", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2.5 text-right", children: "Users" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2.5 text-right", children: "Tables" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2.5 text-right", children: "Errors \xB7 1h" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2.5", children: "Last activity" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2.5", children: "Pool util." }),
        /* @__PURE__ */ jsx("th", { className: "px-5 py-2.5" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: rows.map((r) => {
        const st = STATUS_TONE2[r.status];
        const pt = poolTone(r.poolUtilPct);
        return /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: `inline-flex h-8 w-8 items-center justify-center rounded-md bg-${r.initialsTone}/15 font-mono text-xs font-semibold text-${r.initialsTone}`, children: r.initials }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium text-foreground", children: r.code }),
              /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] text-muted-foreground", children: [
                "tenant_id \xB7 ",
                r.tenantId
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full bg-${st.tone}/10 px-2 py-0.5 text-xs font-medium text-${st.tone}`, children: [
            /* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-full bg-${st.tone}` }),
            st.label
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "num px-3 py-3 text-right tabular-nums text-foreground", children: r.users }),
          /* @__PURE__ */ jsx("td", { className: "num px-3 py-3 text-right tabular-nums text-foreground", children: r.tables }),
          /* @__PURE__ */ jsx("td", { className: `num px-3 py-3 text-right tabular-nums ${errorsTone(r.errors1h)}`, children: r.errors1h }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: r.lastActivity }) }),
          /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-1.5 w-20 overflow-hidden rounded-full bg-border", children: /* @__PURE__ */ jsx("div", { className: `h-full bg-${pt}`, style: { width: `${r.poolUtilPct}%` } }) }),
            /* @__PURE__ */ jsxs("span", { className: "num font-mono text-[10px] text-muted-foreground", children: [
              r.poolUtilPct,
              "%"
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-5 py-3 text-right", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "Apri dettaglio tenant",
              onClick: () => onOpenDetail?.(r),
              className: "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground",
              children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "9 18 15 12 9 6" }) })
            }
          ) })
        ] }, r.code);
      }) })
    ] })
  ] }) });
}
var METHOD_TONE = {
  GET: "text-info",
  POST: "text-warning",
  PATCH: "text-warning",
  DELETE: "text-danger",
  PUT: "text-warning"
};
var STATUS_TONE_BG = {
  "2xx": "bg-success",
  "3xx": "bg-info",
  "4xx": "bg-warning",
  "5xx": "bg-danger"
};
function ErrorRateBreakdown({
  overallRate,
  overallUnit = "%",
  overallDelta,
  overallDeltaTone = "warning",
  totalRequests,
  distribution,
  endpoints,
  onViewAll
}) {
  const total = (distribution["2xx"] ?? 0) + (distribution["3xx"] ?? 0) + (distribution["4xx"] ?? 0) + (distribution["5xx"] ?? 0);
  const pct = (n) => total > 0 ? n / total * 100 : 0;
  return /* @__PURE__ */ jsxs("article", { className: "rounded-card border border-border bg-card p-5 shadow-card lg:col-span-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Error rate breakdown" }),
        /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "HTTP status mix + top erroring endpoints \xB7 last 1h" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-3 text-right", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.14em] text-muted-foreground", children: "overall" }),
          /* @__PURE__ */ jsxs("div", { className: "num text-xl font-semibold text-foreground", children: [
            overallRate,
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: overallUnit })
          ] })
        ] }),
        overallDelta && /* @__PURE__ */ jsx("div", { className: `rounded-control bg-${overallDeltaTone}/10 px-2 py-1 font-mono text-[10px] font-medium text-${overallDeltaTone}`, children: overallDelta })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between text-[11px] text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Status distribution",
          totalRequests != null ? ` \xB7 ${totalRequests.toLocaleString()} req` : ""
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
          pct(distribution["2xx"]).toFixed(1),
          "% / ",
          pct(distribution["3xx"]).toFixed(1),
          "% / ",
          (pct(distribution["4xx"]) + pct(distribution["5xx"])).toFixed(1),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-1.5 flex h-2 overflow-hidden rounded-full bg-border", children: ["2xx", "3xx", "4xx", "5xx"].map((b) => /* @__PURE__ */ jsx("div", { className: STATUS_TONE_BG[b], style: { width: `${pct(distribution[b])}%` }, title: `${b} \xB7 ${distribution[b]}` }, b)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 grid grid-cols-4 gap-2 text-[11px]", children: ["2xx", "3xx", "4xx", "5xx"].map((b) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-sm ${STATUS_TONE_BG[b]}` }),
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: b }),
        /* @__PURE__ */ jsx("span", { className: "num ml-auto font-mono text-foreground", children: distribution[b]?.toLocaleString() ?? 0 })
      ] }, b)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 border-t border-border pt-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground", children: "Top erroring endpoints" }),
        onViewAll && /* @__PURE__ */ jsx("button", { type: "button", onClick: onViewAll, className: "text-[11px] font-medium text-primary hover:underline", children: "view all \u2192" })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-2.5 text-sm", children: endpoints.map((e, i) => /* @__PURE__ */ jsxs("li", { className: "grid grid-cols-[1fr_auto_80px_auto] items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs text-foreground", children: [
            /* @__PURE__ */ jsx("span", { className: METHOD_TONE[e.method], children: e.method }),
            " ",
            e.path
          ] }),
          e.scope && /* @__PURE__ */ jsx("span", { className: "ml-2 font-mono text-[10px] text-muted-foreground", children: e.scope })
        ] }),
        /* @__PURE__ */ jsx("span", { className: `rounded-sm bg-${e.statusTone}/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-${e.statusTone}`, children: e.statusBadge }),
        /* @__PURE__ */ jsx(EndpointSparkline, { values: e.sparkline, tone: e.sparklineTone }),
        e.delta && /* @__PURE__ */ jsx("span", { className: `num text-right font-mono text-[10px] text-${e.deltaTone ?? "muted-foreground"}`, children: e.delta })
      ] }, i)) })
    ] })
  ] });
}
function EndpointSparkline({ values, tone }) {
  if (values.length < 2) return /* @__PURE__ */ jsx("span", {});
  const W = 80, H = 14;
  const step = W / (values.length - 1);
  const points = values.map((v, i) => `${i * step},${H - v * (H - 2) - 1}`).join(" ");
  return /* @__PURE__ */ jsx("svg", { viewBox: `0 0 ${W} ${H}`, className: "h-3.5 w-full", "aria-hidden": "true", preserveAspectRatio: "none", children: /* @__PURE__ */ jsx("polyline", { points, fill: "none", stroke: `var(--${tone})`, strokeWidth: "1.4", strokeLinejoin: "round" }) });
}
var DB_SUBITEMS = [
  { label: "Schemas", count: "5" },
  { label: "Tables", count: "576" },
  { label: "Views & MViews", count: "42" },
  { label: "Indexes", count: "1 284" },
  { label: "Functions & Proc.", count: "118" },
  { label: "Triggers", count: "63" },
  { label: "Sequences", count: "189" },
  { label: "Constraints & FKs", count: "950" },
  { label: "Roles & Grants", count: "14" },
  { label: "Extensions", count: "9" },
  { label: "Connection Pools", count: "3" },
  { label: "Backups & PITR", count: "14d" },
  { label: "Vacuum & Bloat", count: "ok" }
];
function DBSupervisorSidebar() {
  return /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsxs("a", { href: "#", className: "nav-link flex items-center justify-between gap-2 rounded-control border border-palette-2/30 bg-palette-2/5 px-2 py-2 text-sm font-medium text-foreground transition hover:bg-palette-2/10 hover:border-palette-2/50", children: [
      /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [
        /* @__PURE__ */ jsxs("svg", { className: "h-4 w-4 shrink-0 text-palette-2", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }),
          /* @__PURE__ */ jsx("path", { d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" }),
          /* @__PURE__ */ jsx("path", { d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "nav-label truncate", children: "DB Supervisor" })
      ] }),
      /* @__PURE__ */ jsxs(
        "span",
        {
          className: "nav-aux inline-flex items-center gap-0.5 rounded-sm bg-palette-2/15 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-palette-2",
          title: "Apre pagina con tabs dedicate per ogni oggetto DBMS",
          children: [
            /* @__PURE__ */ jsxs("svg", { className: "h-2.5 w-2.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsx("rect", { x: "3", y: "4", width: "18", height: "4" }),
              /* @__PURE__ */ jsx("rect", { x: "3", y: "10", width: "18", height: "4" }),
              /* @__PURE__ */ jsx("rect", { x: "3", y: "16", width: "18", height: "4" })
            ] }),
            "tabs"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "sidebar-subtree mt-1 ml-3 space-y-0.5 border-l border-border/60 pl-2.5", children: DB_SUBITEMS.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center justify-between gap-2 rounded-control px-2 py-1 text-[12px] text-muted-foreground transition hover:bg-accent hover:text-foreground", children: [
      /* @__PURE__ */ jsx("span", { children: item.label }),
      /* @__PURE__ */ jsx("span", { className: "num font-mono text-[10px] text-muted-foreground/70", children: item.count })
    ] }) }, item.label)) })
  ] });
}
var TONE_CLASS2 = {
  success: "border-green-200 bg-green-100 text-green-800",
  warning: "border-amber-200 bg-amber-100 text-amber-800",
  danger: "border-red-200 bg-red-100 text-red-800",
  info: "border-blue-200 bg-blue-100 text-blue-800",
  neutral: "border-border bg-muted text-muted-foreground"
};
function statusTone(value) {
  const v = (value ?? "").toUpperCase();
  if (["ACTIVE", "FILLED", "APPROVED", "COMPLETED", "DONE", "SUCCESS", "PUBLISHED", "ENABLED", "RESOLVED", "PASSED"].includes(v)) return "success";
  if (["OPEN", "PENDING", "PROPOSED", "DRAFT", "IN_PROGRESS", "RUNNING", "QUEUED", "SCHEDULED", "INFO"].includes(v)) return "info";
  if (["AT_RISK", "AT RISK", "WARNING", "HIGH", "MEDIUM", "REVIEW", "PARTIAL", "DEGRADED", "STALE"].includes(v)) return "warning";
  if (["INACTIVE", "SUSPENDED", "CRITICAL", "FAILED", "ERROR", "REJECTED", "BLOCKED", "EXPIRED", "REVOKED"].includes(v)) return "danger";
  return "neutral";
}
function StatusPill({
  tone,
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx("span", { className: `inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${TONE_CLASS2[tone]} ${className}`, children });
}
function StatusBadge2({ value, className }) {
  if (!value) return /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "\u2014" });
  return /* @__PURE__ */ jsx(StatusPill, { tone: statusTone(value), className, children: value });
}

export { AccessibilityPanel, Accordion, AccordionContent, AccordionItem, AccordionTrigger, AchievementBadge, ActivityFeed, ActivityRing, Admonition, AlertBanner, AnimatedNumber, AppShell, AppSwitcher, AuditFeed, AuroraBackground, Avatar, AvatarFallback, AvatarGroup, AvatarImage, Badge, Banner, BentoCell, BentoGrid, Breadcrumbs, Button, CalendarGrid, CapabilityRadar, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CareerArc, Center, ChatProvider, Chatbot, Checkbox, Cluster, CommandPalette, CommentThread, ConfettiButton, Cover, DBSupervisorSidebar, DB_SUBITEMS, DEFAULT_THEME_STATE, DashboardFooter, DashboardHeader, DashboardShell, DashboardSidebar, DataTable, DataTableWithCrossHair, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DiffViewer, DotGrid, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EChartsCard, ESCOTreeNavigator, EmptyState, ErrorRateBreakdown, ErrorState, FAB, FadeIn, FileDropzone, FilterBar, FormWizard, Frame, GlassCard, GradientText, Grid, GroupToggle, HeroCentered, HeroSplit, HeroVideoBackground, HeuresysLogoBadge, HeuresysMark, HeuresysWordmark, IbanInput, ImageGallery, IncidentTimeline, Input, IntegrationHealthPill, JsonTree, KGGraphCanvas, KPIStrip, KanbanBoard, KeyboardShortcutsModal, KgMiniGraph, KpiCard, KpiRing, LanguagePicker, LinearGauge, LiveRegionProvider, LogStream, LottiePlayer, MarkdownView, Marquee, MegaMenu, MermaidDiagram, MeshGradient, MobileBottomNav, MoneyInput, NetworkGraph, NeumorphicCard, NoiseOverlay, NotificationCenter, OnboardingTour, OtpInput, PALETTES, PageActions, PageHeader, Pagination, PaletteDropdown, PasswordStrengthMeter, PerfMonitor, PhoneInputField, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, QRCodeView, RBACMatrix, RadialGauge, RbacMatrix, SAPSyncPanel, SQLSlowQueryTable, STARTER_PRESETS, SUPPORTED_LOCALES, ScaleIn, SignaturePadField, Skeleton, SkillHeatmap, SkipLink, SlideIn, Sparkline2 as Sparkline, Spinner, Stack, StaggerChildren, StaggerItem, StatsCard, StatusBadge2 as StatusBadge, StatusIcon, StatusPill, Stepper, SuccessionCard, Switch, Switcher, TableOfContents, Tabs, TabsContent, TabsList, TabsOverflow, TabsTrigger, TaxIdInput, TenantFleetTable, ThemeBuilderWizard, ThemeProvider, ThemeToggle, ThreeScene, TiltCard, TimeRangeSelector, Timeline, Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, ToolCallView, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Typewriter, VideoPlayer, VoiceInput, WinLossSparkline, applyPalette, attachCrossHair, badgeVariants, buttonVariants, cn, downloadAsFile, echartsPresets, exportCSV, exportExcel, exportFigmaTokens, exportTailwindConfig, exportThemeProvider, exportTokensCss, exportTokensJson, findPreset, formatCurrency, formatDate, formatDateTime, formatList, formatNumber, formatPercent, formatRelativeTime, oklch, buildScale as oklchBuildScale, contrastRatio as oklchContrast, harmony as oklchHarmony, luminance as oklchLuminance, simulateColorBlind as oklchSimulateColorBlind, toCss as oklchToCss, toHex as oklchToHex, toRgb as oklchToRgb, parseCSV, parseExcel, parseJSON, parseTOML, parseXML, statusTone, toastVariants, useAnnounce, useChat, useConfetti, useGlobalCmdK, useShortcutsModal, useTheme };
