
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  Heart,
  Sparkles,
  Leaf,
} from "lucide-react";

import { cn } from "@/lib/utils";

export default function StayConnected() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-[#F5FAF6] to-[#EAF5ED] px-4 py-10 dark:from-[#06130D] dark:via-[#081B11] dark:to-[#06150D] sm:py-14">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 size-80 rounded-full bg-emerald-300/20 blur-[100px] dark:bg-emerald-500/[0.07]" />

        <div className="absolute -right-32 bottom-0 size-96 rounded-full bg-green-300/20 blur-[110px] dark:bg-green-500/[0.07]" />

        <div className="absolute left-1/2 top-1/2 size-112 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200/30 dark:border-emerald-400/6" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* Main Card */}
        <div
          className={cn(
            "relative overflow-hidden rounded-4xl",
            "border border-emerald-700/20 dark:border-emerald-400/15",
            "bg-linear-to-br from-[#064E32] via-[#086B43] to-[#06452D]",
            "dark:from-[#0B3020] dark:via-[#073B27] dark:to-[#092719]",
            "px-6 py-6 sm:px-10 sm:py-8 lg:py-10",
            "shadow-[0_25px_70px_-25px_rgba(5,100,55,0.25)]",
            "dark:shadow-[0_25px_80px_-25px_rgba(0,0,0,0.8)]"
          )}
        >

          {/* Decorative Elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <div className="absolute -right-20 -top-32 size-96 rounded-full border border-white/10 dark:border-emerald-200/8" />

            <div className="absolute -right-10 -top-20 size-72 rounded-full border border-white/10 dark:border-emerald-200/8" />

            <div className="absolute -bottom-40 -left-20 size-96 rounded-full bg-emerald-300/10 blur-3xl dark:bg-emerald-400/8" />

            <Leaf className="absolute left-[8%] top-[15%] size-20 rotate-[-30deg] text-white/[0.07] sm:size-28" />

            <Sparkles className="absolute bottom-[20%] right-[12%] size-12 text-emerald-200/20 dark:text-emerald-200/15" />

            <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-emerald-200/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-2xl text-center">

            {/* Mail Icon */}
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl border border-emerald-200/20 bg-white/10 text-emerald-200 shadow-xl backdrop-blur-xl dark:border-emerald-200/15 dark:bg-white/6">
              <Mail size={30} strokeWidth={1.8} />
            </div>

            {/* Badge */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200/25 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-100 backdrop-blur-md dark:border-emerald-200/15 dark:bg-emerald-200/6">
              <Heart size={13} fill="currentColor" />
              The Jagoron Community
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Stay Connected to{" "}
              <span className="bg-linear-to-r from-emerald-200 to-green-300 bg-clip-text text-transparent dark:from-[#A7F3D0] dark:via-[#6EE7B7] dark:to-[#86EFAC]">
                Our Cause.
              </span>
            </h2>

            <p className="mt-2 text-xl font-semibold text-emerald-200 dark:text-emerald-200/90 sm:text-2xl">
              Be the Voice of Positive Change.
            </p>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-emerald-50/80 dark:text-emerald-50/75 sm:text-base sm:leading-8">
              Get inspiring stories, upcoming events, volunteer opportunities
              and updates on the impact we&apos;re creating together.
            </p>

            {/* Newsletter UI */}
            <div className="mx-auto mt-6 max-w-xl">

              <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-xl dark:border-emerald-100/12 dark:bg-black/20 sm:flex-row sm:rounded-full">

                {/* Email Input */}
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 transition-all duration-300 hover:bg-white/10 focus-within:border-emerald-200/50 dark:border-white/8 dark:bg-white/4 dark:hover:bg-white/8 dark:focus-within:border-emerald-300/40">

                  <Mail size={19} className="shrink-0 text-emerald-200" />

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-emerald-100/55"
                  />
                </div>

                {/* Subscribe Button */}
                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-emerald-800 shadow-lg transition-all duration-300 hover:bg-emerald-50 hover:shadow-xl active:scale-95 dark:bg-[#D1FAE5] dark:text-[#064E32] dark:hover:bg-white"
                >
                  Subscribe Now
                  <ArrowRight size={17} />
                </button>
              </div>

              {/* Privacy Message */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-emerald-100/75 dark:text-emerald-100/65">
                <ShieldCheck size={15} />
                <span>We respect your privacy. Unsubscribe anytime.</span>
              </div>
            </div>

            {/* Trust Elements */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/15 pt-6 dark:border-emerald-100/10 sm:mt-8 sm:pt-7">

              <div className="flex items-center gap-2 text-xs font-medium text-emerald-100/80 dark:text-emerald-100/70">
                <ShieldCheck size={15} />
                Trusted Community
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-emerald-100/80 dark:text-emerald-100/70">
                <Heart size={15} />
                Community First
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-emerald-100/80 dark:text-emerald-100/70">
                <Sparkles size={15} />
                Positive Impact
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
