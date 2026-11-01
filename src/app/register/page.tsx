
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Leaf,
  Lock,
  Mail,
  User,
  UserPlus,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Email validation
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Image URL validation
const URL_PATTERN = /^https?:\/\/\S+\.\S+$/i;

type FieldErrors = {
  fullName?: string;
  email?: string;
  photoUrl?: string;
  password?: string;
};

// Form validation
function validate({
  fullName,
  email,
  photoUrl,
  password,
}: {
  fullName: string;
  email: string;
  photoUrl: string;
  password: string;
}) {
  const errors: FieldErrors = {};

  const trimmedName = fullName.trim();
  const trimmedEmail = email.trim();
  const trimmedPhotoUrl = photoUrl.trim();

  if (!trimmedName) {
    errors.fullName = "Full name is required.";
  } else if (trimmedName.length < 2) {
    errors.fullName = "Name must be at least 2 characters.";
  }

  if (!trimmedEmail) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = "Enter a valid email address.";
  }

  if (trimmedPhotoUrl && !URL_PATTERN.test(trimmedPhotoUrl)) {
    errors.photoUrl = "Enter a valid image URL (http or https).";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  } else if (password.length > 128) {
    errors.password = "Password cannot exceed 128 characters.";
  }

  return errors;
}

// Input styles
const fieldClassName = cn(
  "h-14 rounded-2xl border-[#dbe9e2]",
  "bg-white pr-5 pl-14 text-sm text-[#10233f]",
  "placeholder:text-[#93a89e]",
  "focus-visible:border-[#0b7a47]",
  "focus-visible:ring-[#0b7a47]/20",
  "dark:border-[#365344]",
  "dark:bg-[#1d3327]",
  "dark:text-white",
  "dark:placeholder:text-gray-400",
  "dark:focus-visible:border-emerald-500",
  "dark:focus-visible:ring-emerald-500/20"
);

// Input icon styles
const fieldIconClassName = cn(
  "pointer-events-none absolute top-1/2 left-5",
  "size-5 -translate-y-1/2 text-[#10233f]",
  "dark:text-gray-400"
);

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  // Clear individual field errors
  function clearError(field: keyof FieldErrors) {
    setErrors((previous) =>
      previous[field]
        ? { ...previous, [field]: undefined }
        : previous
    );
  }

  // Form submission
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.currentTarget);

    const {
      fullName: formName,
      email: formEmail,
      photoUrl: formPhotoUrl,
      password: formPassword,
    } = Object.fromEntries(formData.entries());

    const nameValue = String(formName || "").trim();
    const emailValue = String(formEmail || "").trim();
    const photoValue = String(formPhotoUrl || "").trim();
    const passwordValue = String(formPassword || "");

    // Validate form
    const nextErrors = validate({
      fullName: nameValue,
      email: emailValue,
      photoUrl: photoValue,
      password: passwordValue,
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    // Registration data
    const registerData = {
      fullName: nameValue,
      email: emailValue,
      photoUrl: photoValue,
      password: passwordValue,
    };

    console.log("Registration form validated", {
      fullName: registerData.fullName,
      email: registerData.email,
      photoUrl: registerData.photoUrl,
      password: registerData.password
    });
  }

  return (
    <div
      className={cn(
        "relative flex min-h-[100dvh] items-center justify-center",
        "overflow-hidden bg-[#f2fbf6] px-3 py-6 sm:px-4 sm:py-10",
        "dark:bg-[#08150f]"
      )}
    >
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className={cn(
            "absolute inset-0",
            "bg-[linear-gradient(155deg,#e6f7ef_0%,#f7fdfa_45%,#e0f6ea_100%)]",
            "dark:bg-[linear-gradient(155deg,#102b1e_0%,#08150f_45%,#142d20_100%)]"
          )}
        />

        <div className="absolute -top-32 -left-28 size-72 rotate-45 rounded-[3rem] bg-emerald-200/70 dark:bg-emerald-900/30" />

        <div className="absolute -top-44 -left-8 h-80 w-20 rotate-45 bg-white/80 dark:bg-emerald-800/20" />

        <div className="absolute -top-24 -left-52 size-64 rotate-45 rounded-[2.5rem] bg-emerald-300/40 dark:bg-emerald-800/20" />

        <div className="absolute -top-32 -right-28 size-72 -rotate-45 rounded-[3rem] bg-emerald-200/70 dark:bg-emerald-900/30" />

        <div className="absolute -top-44 -right-8 h-80 w-20 -rotate-45 bg-white/80 dark:bg-emerald-800/20" />

        <div className="absolute -top-24 -right-52 size-64 -rotate-45 rounded-[2.5rem] bg-emerald-300/40 dark:bg-emerald-800/20" />

        <div className="absolute -bottom-32 -left-24 size-80 rounded-full bg-emerald-300/45 blur-2xl dark:bg-emerald-700/20" />

        <div className="absolute -right-24 -bottom-32 size-80 rounded-full bg-emerald-300/45 blur-2xl dark:bg-emerald-700/20" />

        <div className="absolute right-2 bottom-2 size-24 rounded-[2rem] bg-emerald-400/25 dark:bg-emerald-700/20" />
      </div>

      {/* Register Card */}
      <section
        aria-labelledby="register-heading"
        className={cn(
          "relative z-10 w-full max-w-[30rem]",
          "rounded-[2rem] border border-white bg-white p-5",
          "shadow-[0_35px_80px_-35px_rgba(1,89,45,0.45)] sm:p-8",
          "dark:border-[#263b30] dark:bg-[#14251c]",
          "dark:shadow-[0_35px_80px_-35px_rgba(0,0,0,0.8)]"
        )}
      >
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/Images/jagoron-logo.png"
            alt="Jagoron — Social Impact Platform"
            width={1536}
            height={1024}
            priority
            sizes="180px"
            className="h-[76px] w-auto object-contain sm:h-24"
          />
        </div>

        {/* Platform Badge */}
        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e6f8ee] px-3 py-1.5 text-[11px] font-bold text-[#04713f] dark:bg-emerald-900/40 dark:text-emerald-300">
            <Leaf className="size-3.5" strokeWidth={2.4} />
            Social Impact Platform
          </span>
        </div>

        {/* Heading */}
        <h1
          id="register-heading"
          className="mt-3 text-center text-[1.75rem] leading-tight font-extrabold tracking-tight text-[#10233f] dark:text-white min-[480px]:text-[2.3rem]"
        >
          Create Your{" "}
          <span className="text-[#01592d] dark:text-emerald-400">
            Account
          </span>
        </h1>

        <p className="mt-1.5 text-center text-sm text-[#5b7267] dark:text-gray-300">
          Join Jagoron and be a part of positive change
        </p>

        {/* Register Form */}
        <form
          noValidate
          onSubmit={handleSubmit}
          className="mt-6 space-y-3.5"
        >
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName" className="sr-only">
              Full name
            </Label>

            <div className="relative">
              <User
                aria-hidden="true"
                className={fieldIconClassName}
              />

              <Input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Full Name"
                value={fullName}
                onChange={(event) => {
                  setFullName(event.target.value);
                  clearError("fullName");
                }}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
                className={cn(
                  fieldClassName,
                  errors.fullName &&
                    "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                )}
              />
            </div>

            {errors.fullName && (
              <p
                id="fullName-error"
                role="alert"
                className="mt-1.5 pl-5 text-xs font-medium text-red-600 dark:text-red-400"
              >
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>

            <div className="relative">
              <Mail
                aria-hidden="true"
                className={fieldIconClassName}
              />

              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email Address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearError("email");
                }}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "email-error" : undefined
                }
                className={cn(
                  fieldClassName,
                  errors.email &&
                    "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                )}
              />
            </div>

            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-1.5 pl-5 text-xs font-medium text-red-600 dark:text-red-400"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <Label htmlFor="photoUrl" className="sr-only">
              Photo URL
            </Label>

            <div className="relative">
              <ImageIcon
                aria-hidden="true"
                className={fieldIconClassName}
              />

              <Input
                id="photoUrl"
                name="photoUrl"
                type="url"
                placeholder="Photo URL"
                value={photoUrl}
                onChange={(event) => {
                  setPhotoUrl(event.target.value);
                  clearError("photoUrl");
                }}
                aria-invalid={Boolean(errors.photoUrl)}
                aria-describedby={
                  errors.photoUrl ? "photoUrl-error" : undefined
                }
                className={cn(
                  fieldClassName,
                  errors.photoUrl &&
                    "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                )}
              />
            </div>

            {errors.photoUrl && (
              <p
                id="photoUrl-error"
                role="alert"
                className="mt-1.5 pl-5 text-xs font-medium text-red-600 dark:text-red-400"
              >
                {errors.photoUrl}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>

            <div className="relative">
              <Lock
                aria-hidden="true"
                className={fieldIconClassName}
              />

              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  clearError("password");
                }}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={cn(
                  fieldClassName,
                  "pr-14",
                  errors.password &&
                    "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                )}
              />

              {/* Show / Hide Password */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                aria-pressed={showPassword}
                className="absolute top-1/2 right-3.5 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-[#10233f] transition-colors hover:bg-[#f1faf6] hover:text-[#01592d] focus-visible:ring-2 focus-visible:ring-[#0b7a47]/40 focus-visible:outline-none dark:text-gray-400 dark:hover:bg-[#294535] dark:hover:text-emerald-400"
              >
                {showPassword ? (
                  <Eye className="size-5" />
                ) : (
                  <EyeOff className="size-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <p
                id="password-error"
                role="alert"
                className="mt-1.5 pl-5 text-xs font-medium text-red-600 dark:text-red-400"
              >
                {errors.password}
              </p>
            )}
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            className="mt-2 h-14 w-full rounded-full bg-gradient-to-r from-[#0a7a43] via-[#12a04f] to-[#22b555] text-base font-semibold text-white shadow-[0_12px_25px_-12px_rgba(1,89,45,0.65)] transition-all hover:brightness-[1.06] hover:shadow-[0_16px_30px_-12px_rgba(1,89,45,0.7)] focus-visible:ring-[#0b7a47]/40 dark:from-emerald-700 dark:via-emerald-600 dark:to-green-500"
          >
            <UserPlus className="size-5" />
            Register
            <ArrowRight className="size-5" />
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 pt-2 pb-1">
            <Separator className="flex-1 bg-[#e2eee8] dark:bg-[#365344]" />

            <span className="text-[11px] font-semibold tracking-wider text-[#7c9388] uppercase dark:text-gray-400">
              OR
            </span>

            <Separator className="flex-1 bg-[#e2eee8] dark:bg-[#365344]" />
          </div>

          {/* Google Register */}
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full rounded-2xl border-[#dbe9e2] bg-white text-sm font-semibold text-[#10233f] hover:border-[#bfdcca] hover:bg-[#f6fcf9] focus-visible:ring-[#0b7a47]/30 dark:border-[#365344] dark:bg-[#1d3327] dark:text-white dark:hover:border-[#52715e] dark:hover:bg-[#294535]"
          >
            <FcGoogle className="size-7" />
            Continue with Google
          </Button>

          {/* Login Link */}
          <p className="pt-2 text-center text-sm text-[#5b7267] dark:text-gray-300">
            Already have an account?{" "}
            <Link
              href="/login"
              className="inline-flex items-center gap-1 rounded-sm font-semibold text-[#0b7a47] transition-colors hover:text-[#01592d] hover:underline focus-visible:ring-2 focus-visible:ring-[#0b7a47]/40 focus-visible:outline-none dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Login here
              <ArrowRight className="size-3.5" />
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
