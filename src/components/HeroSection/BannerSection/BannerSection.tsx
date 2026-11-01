import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CalendarDaysIcon,
  Heart,
  Leaf,
  Plus,
  UserGroup,
} from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  { icon: UserGroup, Number: "10k", caption: "Active Member", solid: true },
  { icon: CalendarDaysIcon, Number: "400+", caption: "Event Hosted", solid: true },
  { icon: Heart, Number: "99%", caption: "Positive", solid: false },
] as const;

export default function BannerSection() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-[#f9fffc] via-[#f4fffa] to-[#e9faf0] transition-colors duration-300 dark:from-[#04120b] dark:via-[#05170f] dark:to-[#072013]">
      {/* Full-bleed background (desktop / tablet landscape) */}
      <Image
        src="/Images/Hero-Bagckground-img.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 1024px) 100vw, 1px"
        className="pointer-events-none -z-20 hidden object-cover object-bottom lg:block dark:opacity-[0.08]"
      />

      {/* Skyline strip (mobile / tablet portrait) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-36 overflow-hidden mask-[linear-gradient(to_bottom,transparent_0%,black_42%)] sm:h-48 lg:hidden dark:opacity-[0.14]"
      >
        <Image
          src="/Images/Hero-Bagckground-img.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Decorative leaves (mobile only — desktop art already has them) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-3 right-3 -z-10 lg:hidden"
      >
        <Leaf
          className="size-10 rotate-12 text-emerald-500/30"
          fill="currentColor"
          strokeWidth={1}
        />
        <Leaf
          className="mt-[-0.35rem] ml-6 size-6 -rotate-12 text-emerald-600/25"
          fill="currentColor"
          strokeWidth={1}
        />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] items-center gap-9 px-5 pt-6 pb-40 sm:px-8 sm:pt-10 sm:pb-52 lg:grid-cols-[1.02fr_1fr] lg:gap-6 lg:px-12 lg:pt-12 lg:pb-32 xl:gap-10 xl:px-16 xl:pb-40">
        {/* Copy */}
        <div className="relative z-10 w-full max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/90 bg-white/80 px-3.5 py-1.5 text-[0.7rem] font-semibold text-brand shadow-sm shadow-emerald-900/5 backdrop-blur sm:px-4 sm:py-2 sm:text-sm dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200">
            <Leaf
              className="size-4 shrink-0"
              fill="currentColor"
              strokeWidth={1.6}
            />
            Together, We Can Make a Difference
          </span>

          <h1 className="mt-5 text-5xl  leading-[1.05] font-extrabold tracking-[-0.035em] text-ink sm:text-5xl lg:mt-6 lg:text-[3.25rem] xl:text-[4rem] dark:text-white">
            <span className="block ">Small Actions.</span>
            <span className="block text-brand dark:text-emerald-400">
              Big Changes.
            </span>
            <span className="block">A Better Tomorrow.</span>
          </h1>

          <p className="mt-4 max-w-136 text-[0.95rem] leading-relaxed text-[#3d5248] sm:text-base lg:mt-5 lg:text-lg dark:text-emerald-100/75">
            Join a community of changemakers, discover meaningful events, and
            turn your passion into action.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-8">
            <Link
              href="/upcoming-events"
              className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-[#0b8a52] to-brand px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-900/25 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:outline-none sm:h-13 sm:px-7 lg:text-base dark:shadow-black/40 dark:focus-visible:ring-emerald-400 dark:focus-visible:ring-offset-[#04120b]"
            >
              <CalendarDays className="size-5" strokeWidth={2.1} />
              Explore Upcoming Events
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/create-event"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-brand/35 bg-white/70 px-6 text-sm font-semibold text-brand shadow-sm shadow-emerald-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-white focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:outline-none sm:h-13 sm:px-7 lg:text-base dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:border-emerald-400 dark:hover:bg-emerald-950/70 dark:focus-visible:ring-emerald-400 dark:focus-visible:ring-offset-[#04120b]"
            >
              <Plus
                className="size-5 transition-transform duration-300 group-hover:rotate-90"
                strokeWidth={2.4}
              />
              Create Event
            </Link>
          </div>

          {/* Feature trio — desktop */}
          <div className="mt-8 hidden items-center lg:mt-10 lg:flex xl:gap-1">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div key={feature.Number} className="flex items-center">
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="mx-4 h-10 w-px bg-emerald-900/10 xl:mx-6 dark:bg-emerald-100/15"
                    />
                  )}

                  <Icon
                    className="mr-2.5 size-7 shrink-0 text-brand dark:text-emerald-400"
                    strokeWidth={feature.solid ? 1.5 : 2}
                    fill={feature.solid ? "currentColor" : "none"}
                  />

                  <div>
                    <p className="text-lg font-bold text-ink dark:text-white">
                      {feature.Number}
                    </p>
                    <p className="text-xs text-[#5b7267] dark:text-emerald-100/60">
                      {feature.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual */}
        <div className="relative z-10 mx-auto w-full max-w-136 lg:max-w-none">
          {/* Organic halo behind the photo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-6 -left-6 -z-10 hidden h-[92%] w-[92%] rounded-[45%_55%_40%_60%/55%_45%_60%_40%] bg-emerald-300/45 blur-2xl sm:block dark:bg-emerald-500/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -bottom-8 -z-10 size-40 rounded-full bg-emerald-200/50 blur-3xl dark:bg-emerald-500/10"
          />

          <div className="relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-4xl shadow-[0_35px_70px_-35px_rgba(1,89,45,0.5)] ring-1 ring-white/70 sm:aspect-5/4 sm:rounded-[2.75rem] lg:aspect-6/5 lg:rounded-[3.5rem] dark:shadow-black/50 dark:ring-emerald-900/60">
              <Image
                src="/Images/Hero-img.png"
                alt="Jagoron volunteers planting a sapling together in a green field"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover object-[62%_45%]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-emerald-950/25 via-transparent to-transparent"
              />
            </div>

            {/* Floating card — top right */}
            <Link
              href="/upcoming-events"
              className="group absolute -top-3 -right-1 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white/95 px-3 py-2.5 shadow-[0_18px_40px_-20px_rgba(1,89,45,0.55)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:outline-none sm:-top-4 sm:-right-3 sm:gap-3 sm:px-4 sm:py-3 lg:-top-6 lg:-right-5 dark:border-emerald-900 dark:bg-[#0a2115]/95 dark:focus-visible:ring-emerald-400 dark:focus-visible:ring-offset-[#04120b]"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-brand sm:size-10 dark:bg-emerald-950 dark:text-emerald-300">
                <Leaf
                  className="size-4 sm:size-5"
                  fill="currentColor"
                  strokeWidth={1.6}
                />
              </span>

              <span className="block">
                <span className="block text-xs font-bold text-ink sm:text-sm dark:text-white">
                  Make an Impact
                </span>
                <span className="flex items-center gap-1 text-[0.65rem] font-medium text-[#5b7267] sm:text-xs dark:text-emerald-100/60">
                  Start Today
                  <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>

            {/* Floating card — bottom right (desktop / tablet) */}
            <Link
              href="/register"
              className="group absolute -right-2 -bottom-5 hidden items-center gap-3 rounded-2xl border border-emerald-100 bg-white/95 px-4 py-3 shadow-[0_18px_40px_-20px_rgba(1,89,45,0.55)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:outline-none sm:flex lg:-right-5 lg:-bottom-7 lg:px-5 lg:py-4 dark:border-emerald-900 dark:bg-[#0a2115]/95 dark:focus-visible:ring-emerald-400 dark:focus-visible:ring-offset-[#04120b]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-brand lg:size-11 dark:bg-emerald-950 dark:text-emerald-300">
                <Heart
                  className="size-4.5 lg:size-5"
                  fill="currentColor"
                  strokeWidth={1.6}
                />
              </span>

              <span className="block">
                <span className="block text-xs font-bold text-ink sm:text-sm dark:text-white">
                  Be the Reason for Change
                </span>
                <span className="block text-[0.65rem] font-medium text-[#5b7267] sm:text-xs dark:text-emerald-100/60">
                  Your contribution matters.
                </span>
              </span>

              <ArrowRight className="ml-1 size-4 shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-0.5 dark:text-emerald-300" />
            </Link>
          </div>

          {/* Feature trio — mobile card */}
          <ul className="mt-5 grid grid-cols-3 rounded-3xl border border-emerald-100 bg-white/95 p-3 shadow-[0_16px_35px_-25px_rgba(1,89,45,0.45)] backdrop-blur sm:mt-8 lg:hidden dark:border-emerald-900 dark:bg-[#0a2115]/95">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <li
                  key={feature.Number}
                  className={cn(
                    "flex flex-col items-center gap-1 px-1 text-center",
                    index > 0 &&
                      "border-l border-emerald-900/10 dark:border-emerald-100/10",
                  )}
                >
                  <Icon
                    className="size-5 text-brand sm:size-6 dark:text-emerald-400"
                    strokeWidth={feature.solid ? 1.5 : 2}
                    fill={feature.solid ? "currentColor" : "none"}
                  />
                  <span className="text-lg leading-tight font-bold text-ink sm:text-sm dark:text-white">
                    {feature.Number}
                  </span>
                  <span className="text-[0.6rem] text-[#5b7267] sm:text-xs dark:text-emerald-100/60">
                    {feature.caption}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
