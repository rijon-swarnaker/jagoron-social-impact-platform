"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Calendar,
  ChevronRight,
  LogOut,
  Settings,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "@/lib/auth-client";

const accountLinks = [
  { label: "Create Event", href: "/create-event", icon: Calendar },
  { label: "Manage Events", href: "/manage-events", icon: Settings },
  { label: "Joined Events", href: "/joined-events", icon: Users },
] as const;

const rowClassName = cn(
  "group flex items-center gap-3 rounded-xl px-2.5 py-2.5",
  "text-sm font-medium text-white/95",
  "transition-colors duration-200",
  "hover:bg-white/10 focus-visible:bg-white/10",
  "focus-visible:outline-none"
);



export default function UserMenu() {

  
  const [open, setOpen] = useState(false);

  const { data: session } = useSession()
  const user = session?.user

  const HandleSignOut = async () => {
  const toastId = toast.loading("Signing out...", {
    description: "Please wait a moment.",
  });

  try {
    const { error } = await signOut();

    if (error) {
      toast.error("Sign out failed!", {
        id: toastId,
        description: error.message || "Please try again.",
      });
      return;
    }

    toast.success("Signed out successfully!", {
      id: toastId,
      description: "You have been securely logged out.",
    });
  } catch {
    toast.error("Something went wrong!", {
      id: toastId,
      description: "Unable to sign out. Please try again.",
    });
  }
};

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        aria-label="Open account menu"
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center rounded-full",
          "ring-2 ring-emerald-100 transition-all duration-200",
          "hover:ring-emerald-300",
          "focus-visible:ring-emerald-500 focus-visible:outline-none",
          "dark:ring-emerald-900 dark:hover:ring-emerald-700",
          "dark:focus-visible:ring-emerald-500"
        )}
      >
        <Avatar size="lg" className="size-10">
          {user?.image ? <AvatarImage src={user?.image} alt={user?.name} /> : <AvatarFallback>{user?.name.charAt(0).toLocaleUpperCase()}</AvatarFallback> }

          {/* <AvatarFallback className="bg-[#d3f6e1]">
            <Image
              src="/Images/jagoron-logo.png"
              alt=""
              width={1536}
              height={1024}
              className="size-8 object-contain"
            />
          </AvatarFallback> */}
        </Avatar>

        <span
          aria-hidden="true"
          className="absolute right-0 bottom-0 z-10 size-3 rounded-full border-2 border-white bg-[#22c55e] dark:border-[#071a10]"
        />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={12}
        className={cn(
          "w-[288px] gap-0 overflow-hidden rounded-[20px] p-0",
          "border border-white/15 bg-[#06170f] text-white",
          "shadow-[0_30px_70px_-25px_rgba(0,0,0,0.75)] ring-white/10"
        )}
      >
        <div className="relative">
          {/* Dark green backdrop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,#0f3323_0%,#071b12_48%,#04120b_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-12 size-40 rounded-full bg-emerald-400/15 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-14 -left-10 size-36 rounded-full bg-emerald-500/10 blur-2xl"
          />

          <div className="relative">
            {/* Profile */}
            <div className="flex items-center gap-3.5 px-4 py-4">
              <div className="relative shrink-0">
                <Avatar size="lg" className="size-14">
                  {user?.image ? <AvatarImage src={user?.image} alt={user?.name} /> : <AvatarFallback >{user?.name.charAt(0).toLocaleUpperCase()}</AvatarFallback>}

                  {/* <AvatarFallback className="bg-[#d3f6e1]">
                    <Image
                      src="/Images/jagoron-logo.png"
                      alt=""
                      width={1536}
                      height={1024}
                      className="size-11 object-contain"
                    />
                  </AvatarFallback> */}
                </Avatar>

                <span
                  aria-hidden="true"
                  className="absolute right-0.5 bottom-0.5 size-3.5 rounded-full border-[3px] border-[#0a2518] bg-[#22c55e]"
                />
              </div>

              <PopoverHeader className="min-w-0">
                <PopoverTitle className="truncate text-[15px] font-bold text-white">
                  {user?.name}
                </PopoverTitle>
                <PopoverDescription className="truncate text-[13px] text-[#a7c0b4]">
                  {user?.email}
                </PopoverDescription>
              </PopoverHeader>
            </div>

            <Separator className="bg-white/10" />

            {/* Account links */}
            <nav aria-label="Account" className="p-2">
              {accountLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={rowClassName}
                  >
                    <Icon
                      className="size-5 shrink-0 text-white/90"
                      strokeWidth={1.9}
                    />
                    <span className="truncate">{item.label}</span>
                    <ChevronRight
                      aria-hidden="true"
                      className="ml-auto size-4 shrink-0 text-white/60 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                );
              })}
            </nav>

            <Separator className="bg-white/10" />

            {/* Sign out (UI only) */}
            <div className="p-2">
              <button
                type="button"
                onClick={HandleSignOut}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5",
                  "text-sm font-medium text-[#ff4d4d]",
                  "transition-colors duration-200",
                  "hover:bg-red-500/10 focus-visible:bg-red-500/10",
                  "focus-visible:outline-none"
                )}
              >
                <LogOut
                  aria-hidden="true"
                  className="size-5 shrink-0"
                  strokeWidth={2}
                />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
