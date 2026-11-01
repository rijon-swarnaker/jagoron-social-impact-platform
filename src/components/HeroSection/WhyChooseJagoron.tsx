
"use client";

import {
  Users,
  ShieldCheck,
  Send,
  ChartNoAxesCombined,
  Heart,
} from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    number: "01",
    title: "Community Driven",
    description:
      "Empowering communities through collective action, local participation, and meaningful collaboration.",
    icon: Users,
  },
  {
    number: "02",
    title: "Trusted Initiatives",
    description:
      "Discover meaningful events and initiatives from organizers and community partners.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Local Engagement",
    description:
      "Connect with changemakers, volunteer locally, and build stronger communities.",
    icon: Send,
  },
  {
    number: "04",
    title: "Transparent Tracking",
    description:
      "Stay informed with event updates, progress reports, and community impact.",
    icon: ChartNoAxesCombined,
  },
];

export default function WhyChooseJagoron() {
  return (
    <section className="relative overflow-hidden bg-[#F6FBF7] py-20 sm:py-24 lg:py-28 dark:bg-[#071A10]">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-200/30 blur-[100px] dark:bg-emerald-500/10" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-green-200/30 blur-[100px] dark:bg-green-500/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
            <Heart size={14} fill="currentColor" />
            Why Choose Jagoron
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Together, We Create{" "}
            <span className="bg-linear-to-r from-emerald-600 to-green-800 bg-clip-text text-transparent dark:from-emerald-400 dark:to-green-300">
              Lasting Impact.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
            Connecting passionate people, meaningful initiatives,
            and communities to build a better tomorrow.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.number}
                className={cn(
                  "group relative overflow-hidden rounded-2xl",
                  "border border-emerald-100/80",
                  "bg-white/80 p-6 sm:p-7",
                  "shadow-[0_5px_25px_-15px_rgba(5,150,105,0.18)]",
                  "backdrop-blur-xl",
                  "transition-all duration-300",
                  "hover:-translate-y-2",
                  "hover:border-emerald-300",
                  "hover:shadow-[0_20px_40px_-18px_rgba(5,150,105,0.28)]",
                  "dark:border-emerald-900/70",
                  "dark:bg-[#0C2418]/80",
                  "dark:hover:border-emerald-700"
                )}
              >
                {/* Decorative Number */}
                <span className="absolute right-5 top-4 text-4xl font-black text-emerald-100/70 transition-colors duration-300 group-hover:text-emerald-200/80 dark:text-emerald-900/40 dark:group-hover:text-emerald-800/50">
                  {feature.number}
                </span>

                {/* Icon */}
                <div className="relative mb-7 flex size-14 items-center justify-center rounded-2xl border border-emerald-200/70 bg-linear-to-br from-emerald-100 to-green-50 text-emerald-700 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md dark:border-emerald-800 dark:from-emerald-900 dark:to-green-950 dark:text-emerald-300">
                  <Icon size={25} strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-emerald-500 to-green-700 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}

        </div>

        

      </div>
    </section>
  );
}
