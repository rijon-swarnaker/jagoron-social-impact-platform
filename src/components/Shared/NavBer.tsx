"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, LogIn, Menu, X, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { useSession } from "@/lib/auth-client";
import UserMenu from "./UserMenu";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  {
    label: "Upcoming Events",
    href: "/upcoming-events",
    icon: CalendarDays,
  },
] as const;

export default function NavBer() {
  const { data: session } = useSession();
  const user = session?.user;

  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close menu with Escape key
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 px-3 bg-[#BDEFC9]/80 dark:bg-[#13251A]/80  pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary navigation"
        className={cn(
          "relative mx-auto flex min-h-16 py-5 sm:h-19 sm:py-0 lg:h-21",
          "max-w-375 items-center justify-between",
          "rounded-2xl border border-emerald-100/80",
          "bg-white/90 px-3  sm:px-5 lg:px-8 xl:px-10",
          "shadow-[0_8px_35px_-18px_rgba(1,89,45,0.25)]",
          "backdrop-blur-xl",
          "dark:border-emerald-900/70 dark:bg-[#071a10]/90",
          "dark:shadow-black/20",
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Jagoron home"
          className="relative z-10  shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
        >
          <Image
            src="/Images/Jagoron Social Impact Logo.png"
            alt="Jagoron — Social Impact Platform"
            width={2145}
            height={733}
            priority
            sizes="(max-width: 640px) 150px, (max-width: 1024px) 175px, 210px"
            className="h-10 mb-1 w-auto object-contain sm:h-11 lg:h-12 dark:brightness-150"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="relative z-10 hidden flex-1 items-center justify-center px-3 md:flex lg:px-5">
          <div className="flex items-center gap-1 rounded-full border border-emerald-100/80 bg-emerald-50/70 p-1.5 shadow-sm shadow-emerald-950/5 dark:border-emerald-900/70 dark:bg-emerald-950/40">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex h-10 items-center gap-2 rounded-full",
                    "whitespace-nowrap px-3 lg:px-4 xl:px-5",
                    "text-xs lg:text-sm font-semibold",
                    "transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-emerald-600",
                    isActive
                      ? "bg-emerald-700 text-white shadow-md shadow-emerald-900/15 dark:bg-emerald-500 dark:text-emerald-950"
                      : "text-slate-600 hover:bg-white hover:text-emerald-800 dark:text-slate-300 dark:hover:bg-emerald-900/60 dark:hover:text-emerald-200",
                  )}
                >
                  <Icon
                    size={18}
                    strokeWidth={2.2}
                    fill={
                      isActive && item.href === "/" ? "currentColor" : "none"
                    }
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Desktop Actions */}
        <div
          className={`${
            user
              ? "relative z-10 flex items-center gap-3 lg:gap-4"
              : "relative z-10 hidden md:flex items-center gap-3 lg:gap-4"
          }`}
        >
          <ThemeToggle />

          <div className=" h-9 w-px bg-emerald-100 dark:bg-emerald-900" />

          {user ? (
            <>
              <UserMenu />
            </>
          ) : (
            <>
              <div>
                <Link
                  href="/login"
                  className={cn(
                    "group inline-flex h-10 lg:h-12 items-center gap-2",
                    "rounded-full bg-linear-to-r from-[#087a46] to-brand",
                    "px-4 lg:px-6 text-xs lg:text-sm font-semibold text-white",
                    "shadow-lg shadow-emerald-900/15",
                    "transition-all duration-300",
                    "hover:-translate-y-0.5 hover:shadow-xl",
                    "hover:shadow-emerald-900/25",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
                  )}
                >
                  <LogIn size={18} />
                  Login
                  <ChevronRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div
          className={`${user ? "hidden" : "relative  z-10 flex items-center gap-2 md:hidden"}`}
        >
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className={cn(
              "inline-flex size-10 items-center justify-center",
              " rounded-2xl border border-emerald-100",
              "bg-emerald-50/70 text-emerald-800",
              "transition-all duration-200 hover:bg-emerald-100",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-emerald-600",
              "dark:border-emerald-900 dark:bg-emerald-950",
              "dark:text-emerald-200 dark:hover:bg-emerald-900",
            )}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={cn(
          "absolute inset-x-3  top-full z-50 mt-2 sm:inset-x-5",
          "origin-top overflow-hidden rounded-2xl",
          "border border-emerald-100 bg-white/95 p-3",
          "shadow-[0_20px_50px_-15px_rgba(1,89,45,0.25)]",
          "backdrop-blur-xl transition-all duration-300",
          "md:hidden",
          "dark:border-emerald-900 dark:bg-[#071a10]/95",
          mobileOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible pointer-events-none -translate-y-2 scale-[0.98] opacity-0",
        )}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex h-12 items-center gap-3  rounded-2xl px-4",
                  "text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-emerald-700 text-white shadow-sm dark:bg-emerald-500 dark:text-emerald-950"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 dark:text-slate-300 dark:hover:bg-emerald-950",
                )}
              >
                <Icon size={19} />
                {item.label}

                {isActive && (
                  <span className="ml-auto size-2 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="my-3 h-px bg-emerald-100 dark:bg-emerald-900" />

        {/* Mobile Actions */}
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-emerald-200/70">
            Appearance
          </span>
        </div>

        <Link
          href="/login"
          onClick={() => setMobileOpen(false)}
          className={cn(
            "mt-2 flex h-12 w-full items-center justify-center gap-2.5",
            " rounded-2xl bg-linear-to-r from-[#087a46] to-brand",
            "text-sm font-semibold text-white shadow-md",
            "transition-all duration-200 hover:brightness-110",
          )}
        >
          <LogIn size={18} />
          Login to Jagoron
          <ChevronRight size={16} />
        </Link>
      </div>
    </header>
  );
}
