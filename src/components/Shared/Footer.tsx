import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, Home, Leaf, Users } from "lucide-react";
import CurrentYear from "../Date/CurrentYear";
import { Suspense } from "react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
] as const;

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Contact Us", href: "/contact" },
] as const;

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    path: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.08.78 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z",
  },
] as const;

export default async function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-[#f2fff9] dark:bg-[#04120b]">
      {/* Background Image */}
      <Image
        src="/Images/Footer-Background.png"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="pointer-events-none object-cover  dark:opacity-20 xl:object-cover"
      />

      <div className="relative z-10">
        {/* Main Footer */}
        <div className="mx-auto max-w-[1600px] px-5 py-4 sm:px-8 sm:py-5 md:px-10 lg:px-12 lg:py-9 xl:px-16">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3  lg:grid-cols-[1.15fr_0.75fr_1fr] lg:gap-0">
            {/* Brand Section */}
            <div className=" lg:col-span-1 lg:pr-8 xl:pr-16">
              <Link
                href="/"
                aria-label="Jagoron home"
                className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong focus-visible:ring-offset-4"
              >
                <Image
                  src="/Images/Jagoron Social Impact Logo.png"
                  alt="Jagoron — Social Impact Platform"
                  width={2145}
                  height={733}
                  sizes="(max-width: 640px) 180px, 240px"
                  className="h-12 w-auto object-contain sm:h-14 lg:h-16 dark:brightness-150"
                />
              </Link>

              <p className="mt-5 max-w-95 text-sm leading-7 text-[#1c4233] dark:text-emerald-100/75">
                Together for a better tomorrow. Join, create and support
                community development events in your area.
              </p>

              <div className="mt-5 hidden md:block h-px w-full max-w-82 bg-[#c7ead6] dark:bg-emerald-900" />

              <div className="mt-4 hidden md:inline-flex max-w-full items-center gap-2 border-b border-[#9ad9b5] pb-2 text-sm font-semibold text-brand dark:border-emerald-700 dark:text-emerald-300">
                <Leaf
                  className="size-4 shrink-0"
                  fill="currentColor"
                  strokeWidth={1.8}
                />
                <span>Stronger Community. Brighter Future.</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="hidden border-t border-[#b7e5cc] pt-8 md:block md:border-t-0 md:pt-0 lg:border-l lg:px-6 xl:px-8 dark:border-emerald-800">
              <h2 className="flex items-center gap-2.5 text-lg font-bold text-[#01592d] dark:text-emerald-300">
                <Home className="size-5" fill="currentColor" strokeWidth={2} />
                Quick Links
              </h2>

              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2.5 text-sm font-medium text-[#183b2b] transition-colors hover:text-[#01592d] dark:text-emerald-100/80 dark:hover:text-emerald-300"
                    >
                      <ChevronRight
                        className="size-3.5 shrink-0 text-[#0b7a47] transition-transform group-hover:translate-x-1 dark:text-emerald-400"
                        strokeWidth={2.5}
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className=" border-[#b7e5cc] pt-8  md:col-span-1 md:border-t-0 md:pt-0 lg:border-l lg:px-6 xl:px-8 dark:border-emerald-800">
              <h2 className="flex items-center gap-2.5 text-lg font-bold text-[#01592d] dark:text-emerald-300">
                <Users className="size-5" fill="currentColor" strokeWidth={2} />
                Follow Us
              </h2>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Jagoron on ${social.label}`}
                    className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#ccebd9] bg-white/85 text-[#01592d] shadow-[0_2px_8px_rgba(1,89,45,0.08)] transition-all hover:-translate-y-0.5 hover:bg-[#01592d] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b7a47] focus-visible:ring-offset-2 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200 dark:hover:bg-emerald-400 dark:hover:text-emerald-950 dark:focus-visible:ring-emerald-300"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4.5"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>

              <p className="mt-5 hidden md:block max-w-70 text-sm leading-6 font-medium text-[#1c4233] dark:text-emerald-100/80">
                Let&apos;s build a stronger community together!
              </p>

              <div className="mt-3 hidden md:block h-0.5 w-40 max-w-full rounded-full bg-[#0b7a47]/70 dark:bg-emerald-500/70" />
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="relative z-10 border-t border-white/15 bg-[#01583D] dark:border-emerald-900 dark:bg-[#03100a]">
          <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-5 py-5 text-center text-xs font-medium text-white/95 sm:px-8 md:px-10 lg:flex-row lg:gap-5 lg:px-12 lg:text-left xl:px-16">
            {/* Copyright */}
            <p className="order-1">
              &copy;{" "}
              <Suspense fallback="2026">
                <CurrentYear />
              </Suspense>
              <Link
                href="/"
                className="font-bold text-[#8ef0bd] transition-colors hover:text-white"
              >
                Jagoron
              </Link>
              . All rights reserved.
            </p>

            {/* Made With */}
            <p className="order-2 flex items-center gap-1.5">
              Made with
              <Heart
                aria-hidden="true"
                className="size-3.5 fill-[#5ee89c] text-[#5ee89c]"
              />
              for a better community
            </p>

            {/* Legal Links */}
            <div className="order-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              {legalLinks.map((link, index) => (
                <span key={link.href} className="flex items-center gap-3">
                  {index > 0 && (
                    <span aria-hidden="true" className="h-3 w-px bg-white/30" />
                  )}

                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[#8ef0bd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ef0bd]"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
