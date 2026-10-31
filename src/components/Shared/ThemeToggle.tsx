
"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="size-10 animate-pulse rounded-full bg-emerald-50 dark:bg-emerald-950"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "size-10 rounded-full transition-all duration-300",
        "border-emerald-100 bg-emerald-50/80",
        "text-emerald-800 shadow-sm",
        "hover:bg-emerald-100 hover:text-emerald-900",
        "dark:border-emerald-900 dark:bg-emerald-950/70",
        "dark:text-emerald-200 dark:hover:bg-emerald-900"
      )}
    >
      {isDark ? (
        <Sun className="size-5" strokeWidth={2.2} />
      ) : (
        <Moon className="size-5" strokeWidth={2.2} />
      )}
    </Button>
  );
}
