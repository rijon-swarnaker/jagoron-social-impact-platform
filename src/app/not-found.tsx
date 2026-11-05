
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Home,
  Leaf,
  SearchX,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-background px-5 py-16">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-2xl text-center">

        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-green-500/20 bg-green-500/10 shadow-sm">
          <SearchX className="h-10 w-10 text-green-600" />
        </div>

        {/* 404 */}
        <div className="relative mb-5">
          <h1 className="select-none text-[120px] leading-none font-black tracking-tighter text-green-600/15 sm:text-[180px]">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Page Not Found
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mx-auto max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          Oops! The page you&apos;re looking for doesn&apos;t exist,
          may have been moved, or is temporarily unavailable.
          Let&apos;s get you back on track and keep making a
          positive difference together.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
          
            className="h-11 w-full bg-green-600 px-6 text-white hover:bg-green-700 sm:w-auto"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Button
            
            variant="outline"
            className="h-11 w-full border-green-600/30 hover:border-green-600 hover:bg-green-600/5 sm:w-auto"
          >
            <Link href="/upcoming-events">
              Explore Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Bottom Branding */}
        <div className="mt-16 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Leaf className="h-4 w-4 text-green-600" />
          <span>
            Lost your way? <span className="font-semibold text-foreground">Jagoron</span> is here to help.
          </span>
        </div>

        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green-600 transition-colors hover:text-green-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to homepage
        </Link>
      </div>
    </main>
  );
}
