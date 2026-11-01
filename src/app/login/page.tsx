"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { ArrowRight, Eye, EyeOff, Leaf, Lock, LogIn, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type FieldErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: FieldErrors = {};
    const trimmedEmail = email.trim();

    // Email validation
    if (!trimmedEmail) {
      newErrors.email = "Email address is required.";
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (password.length > 128) {
      newErrors.password = "Password cannot exceed 128 characters.";
    }

    setErrors(newErrors);

    // Show validation errors
    if (Object.keys(newErrors).length > 0) {
      toast.error("Validation failed", {
        description: "Please check your email and password.",
      });
      return;
    }

    const user = {
      email: trimmedEmail,
      password: password,
    };

    // Loading toast
    const toastId = toast.loading("Signing you in...", {
      description: "Please wait while we verify your credentials.",
    });

    try {
      const { data, error } = await signIn.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error("Login failed", {
          id: toastId,
          description:
            error.message || "Invalid email or password. Please try again.",
        });
        return;
      }

      toast.success("Welcome back!", {
        id: toastId,
        description: "You have successfully logged in to Jagoron.",
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        id: toastId,
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    }
  }

  return (
    <div
      className={cn(
        "relative flex min-h-screen items-center justify-center",
        "overflow-hidden bg-[#f2fbf6] px-4 py-8 sm:py-12",
        "dark:bg-[#08150f]",
      )}
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={cn(
            "absolute inset-0",
            "bg-[linear-gradient(155deg,#e6f7ef_0%,#f7fdfa_45%,#e0f6ea_100%)]",
            "dark:bg-[linear-gradient(155deg,#102b1e_0%,#08150f_45%,#142d20_100%)]",
          )}
        />

        <div className="absolute -left-28 -top-32 size-72 rotate-45 rounded-[3rem] bg-emerald-200/70 dark:bg-emerald-900/30" />

        <div className="absolute -right-28 -top-32 size-72 -rotate-45 rounded-[3rem] bg-emerald-200/70 dark:bg-emerald-900/30" />

        <div className="absolute -bottom-32 -left-24 size-80 rounded-full bg-emerald-300/45 blur-2xl dark:bg-emerald-700/20" />

        <div className="absolute -bottom-32 -right-24 size-80 rounded-full bg-emerald-300/45 blur-2xl dark:bg-emerald-700/20" />

        <div className="absolute right-2 top-2 size-24 rounded-4xl bg-emerald-400/25 dark:bg-emerald-700/20" />
      </div>

      {/* Login Card */}
      <section
        aria-labelledby="login-heading"
        className={cn(
          "relative z-10 w-full max-w-108",
          "rounded-4xl border border-white bg-white p-6",
          "shadow-[0_35px_80px_-35px_rgba(1,89,45,0.45)] sm:p-9",
          "dark:border-[#263b30] dark:bg-[#14251c]",
          "dark:shadow-[0_35px_80px_-35px_rgba(0,0,0,0.8)]",
        )}
      >
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/Images/jagoron-logo.png"
            alt="Jagoron Social Impact Platform"
            width={1536}
            height={1024}
            priority
            sizes="160px"
            className="h-19 w-auto object-contain sm:h-20"
          />
        </div>

        {/* Badge */}
        <div className="mt-5 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e6f8ee] px-3 py-1.5 text-[11px] font-bold text-[#04713f] dark:bg-emerald-900/40 dark:text-emerald-300">
            <Leaf className="size-3.5" strokeWidth={2.4} />
            Social Impact Platform
          </span>
        </div>

        {/* Heading */}
        <h1
          id="login-heading"
          className="mt-4 text-center text-[1.75rem] leading-tight font-extrabold tracking-tight text-ink dark:text-white sm:text-[2rem]"
        >
          Login to{" "}
          <span className="text-brand dark:text-emerald-400">Jagoron</span>
        </h1>

        <p className="mt-2 text-center text-sm text-[#5b7267] dark:text-gray-300">
          Enter your email and password to access your account.
        </p>

        {/* Form */}
        <form noValidate onSubmit={handleSubmit} className="mt-7 space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-[#5b7267] dark:text-gray-400" />

              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email Address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (errors.email) {
                    setErrors((previous) => ({
                      ...previous,
                      email: undefined,
                    }));
                  }
                }}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={cn(
                  "h-13 rounded-2xl border-[#dbe9e2]",
                  "bg-white pr-4 pl-11 text-sm text-ink",
                  "placeholder:text-[#93a89e]",
                  "focus-visible:border-brand-strong focus-visible:ring-brand-strong/20",
                  "dark:border-[#365344] dark:bg-[#1d3327]",
                  "dark:text-white dark:placeholder:text-gray-400",
                  errors.email &&
                    "border-destructive focus-visible:border-destructive",
                )}
              />
            </div>

            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="text-xs font-medium text-destructive"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>

            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-[#5b7267] dark:text-gray-400" />

              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);

                  if (errors.password) {
                    setErrors((previous) => ({
                      ...previous,
                      password: undefined,
                    }));
                  }
                }}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={cn(
                  "h-13 rounded-2xl border-[#dbe9e2]",
                  "bg-white pr-12 pl-11 text-sm text-ink",
                  "placeholder:text-[#93a89e]",
                  "focus-visible:border-brand-strong focus-visible:ring-brand-strong/20",
                  "dark:border-[#365344] dark:bg-[#1d3327]",
                  "dark:text-white dark:placeholder:text-gray-400",
                  errors.password &&
                    "border-destructive focus-visible:border-destructive",
                )}
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute right-2.5 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#5b7267] hover:bg-[#f1faf6] hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong/40 dark:text-gray-400 dark:hover:bg-[#294535] dark:hover:text-emerald-400"
              >
                {showPassword ? (
                  <Eye className="size-4.5" />
                ) : (
                  <EyeOff className="size-4.5" />
                )}
              </button>
            </div>

            {errors.password && (
              <p
                id="password-error"
                role="alert"
                className="text-xs font-medium text-destructive"
              >
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember & Forgot */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-brand-strong hover:text-brand hover:underline dark:text-emerald-400"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="h-12 w-full rounded-2xl cursor-pointer bg-brand text-sm font-semibold text-white hover:bg-[#014a25] focus-visible:ring-brand-strong/40 dark:bg-emerald-700 dark:hover:bg-emerald-600"
          >
            <LogIn className="size-4.5" />
            Login
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 pt-1">
            <Separator className="flex-1 bg-[#e2eee8] dark:bg-[#365344]" />

            <span className="text-[11px] font-semibold tracking-wider text-[#7c9388] uppercase dark:text-gray-400">
              OR
            </span>

            <Separator className="flex-1 bg-[#e2eee8] dark:bg-[#365344]" />
          </div>

          {/* Google Login */}
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full rounded-2xl border-[#dbe9e2] bg-white text-sm font-semibold text-ink hover:border-[#bfdcca] hover:bg-[#f6fcf9] dark:border-[#365344] dark:bg-[#1d3327] dark:text-white dark:hover:bg-[#294535]"
          >
            <FcGoogle className="size-7.5" />
            Continue with Google
          </Button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-[#5b7267] dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="inline-flex items-center gap-1 font-semibold text-brand-strong hover:text-brand hover:underline dark:text-emerald-400"
          >
            Register here
            <ArrowRight className="size-3.5" />
          </Link>
        </p>
      </section>
    </div>
  );
}
