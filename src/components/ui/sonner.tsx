"use client";

import type { ReactNode } from "react";
import {
  CheckCheck,
  Info,
  Loader2,
  TriangleAlert,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import { cn } from "@/lib/utils";

// Icon badge
function IconBadge({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <span
      className={cn(
        "flex size-10 items-center justify-center rounded-xl text-white",
        "shadow-lg ring-4 ring-white/60 dark:ring-white/5",
        className
      )}
    >
      {children}
    </span>
  );
}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "light" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      duration={4000}
      closeButton
      richColors={false}
      icons={{
        success: (
          <IconBadge className="bg-linear-to-br from-[#0a7a43] to-[#22b555] shadow-emerald-500/40">
            <CheckCheck className="size-5" strokeWidth={2.6} />
          </IconBadge>
        ),
        error: (
          <IconBadge className="bg-linear-to-br from-rose-600 to-red-400 shadow-red-500/40">
            <X className="size-5" strokeWidth={2.8} />
          </IconBadge>
        ),
        warning: (
          <IconBadge className="bg-linear-to-br from-amber-500 to-yellow-400 shadow-amber-500/40">
            <TriangleAlert className="size-5" strokeWidth={2.4} />
          </IconBadge>
        ),
        info: (
          <IconBadge className="bg-linear-to-br from-sky-600 to-cyan-400 shadow-sky-500/40">
            <Info className="size-5" strokeWidth={2.4} />
          </IconBadge>
        ),
        loading: (
          <IconBadge className="bg-linear-to-br from-[#0a7a43] to-[#22b555] shadow-emerald-500/40">
            <Loader2 className="size-5 animate-spin" />
          </IconBadge>
        ),
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          // Base layout
          toast: cn(
            "group relative flex w-full items-center gap-3.5 overflow-hidden",
            "rounded-2xl border p-4 pr-10",
            "shadow-[0_18px_45px_-18px_rgba(1,89,45,0.35)]",
            "dark:shadow-black/40",
            // decorative diamond (top-right)
            "before:pointer-events-none before:absolute before:-top-7 before:-right-7",
            "before:size-20 before:rotate-45 before:rounded-3xl before:content-['']",
            // progress bar (bottom)
            "after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full",
            "after:origin-left after:content-['']",
            "after:animate-[toast-progress_4s_linear_forwards]",
            "hover:after:[animation-play-state:paused]"
          ),

          icon: "!m-0 !size-auto shrink-0",
          content: "flex-1 min-w-0",

          title:
            "text-sm font-bold tracking-tight text-[#10233f] dark:text-white",
          description:
            "mt-0.5 text-xs leading-relaxed text-[#5b7267] dark:text-gray-300",

          actionButton:
            "rounded-full bg-[#0b7a47] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#01592d]",
          cancelButton:
            "rounded-full bg-black/5 px-3.5 py-1.5 text-xs font-semibold text-[#10233f] transition hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
          closeButton:
            "!absolute !top-3 !right-3 !left-auto !size-6 !translate-x-0 !translate-y-0 rounded-full !border-0 !bg-transparent text-gray-400 transition hover:!bg-black/5 hover:text-gray-700 dark:hover:!bg-white/10 dark:hover:text-white",

          // Per-type colors
          default:
            "border-[#dcece3] bg-white before:bg-emerald-400/10 after:bg-emerald-500 dark:border-[#365344] dark:bg-[#14251c]",
          success:
            "border-emerald-200 bg-linear-to-br from-white via-white to-emerald-50 before:bg-emerald-400/15 after:bg-gradient-to-r after:from-[#0a7a43] after:to-[#22b555] dark:border-emerald-900 dark:from-[#14251c] dark:via-[#14251c] dark:to-[#0f2f1f]",
          error:
            "border-red-200 bg-linear-to-br from-white via-white to-red-50 before:bg-red-400/15 after:bg-gradient-to-r after:from-rose-600 after:to-red-400 dark:border-red-950 dark:from-[#14251c] dark:via-[#14251c] dark:to-[#2d1618]",
          warning:
            "border-amber-200 bg-linear-to-br from-white via-white to-amber-50 before:bg-amber-400/15 after:bg-gradient-to-r after:from-amber-500 after:to-yellow-400 dark:border-amber-950 dark:from-[#14251c] dark:via-[#14251c] dark:to-[#2d2512]",
          info:
            "border-sky-200 bg-linear-to-br from-white via-white to-sky-50 before:bg-sky-400/15 after:bg-gradient-to-r after:from-sky-600 after:to-cyan-400 dark:border-sky-950 dark:from-[#14251c] dark:via-[#14251c] dark:to-[#112634]",
          loading:
            "border-[#dcece3] bg-white before:bg-emerald-400/10 after:hidden dark:border-[#365344] dark:bg-[#14251c]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };