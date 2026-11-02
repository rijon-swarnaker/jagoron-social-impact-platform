
"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Heart,
  Share2,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { EventProps } from "@/Types/EventsType";
import { toast } from "sonner";

const JoinEvent = ({ data }: { data: EventProps }) => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [isJoined, setIsJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const HandleJoinEvent = async () => {
    if (isPending || isJoining) return;

    if (!user) {
      toast.error("Please login first!");
      return;
    }

    if (isJoined) {
      toast.warning("Already Exists!");
      return;
    }

    try {
      setIsJoining(true);

      const fromData = {
        userId: user.id,
        eventId: data._id,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/join-event`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fromData),
        }
      );

      const result = await res.json();

      if (res.status === 409 || result.alreadyJoined) {
        setIsJoined(true);
        toast.warning("Already Exists!");
        return;
      }

      if (!res.ok || !result.success) {
        toast.error(result.message || "Failed to join event!");
        return;
      }

      setIsJoined(true);
      toast.success("Successfully Joined!");

    } catch (error) {
      console.error("Join Event Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsJoining(false);
    }
  };

  const HandleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Event link copied!");
    } catch {
      toast.error("Unable to share event!");
    }
  };

  return (
    <div>
      <div className="relative mb-7 overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-teal-50 p-3.5 dark:border-emerald-900 dark:from-emerald-950/40 dark:via-card dark:to-teal-950/30 sm:px-5 sm:py-4">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          {/* Left Content */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900">
              <Users size={21} />
            </div>

            <div className="min-w-0">
              <h3 className="text-xs font-bold text-gray-900 dark:text-foreground">
                Join Our Community
              </h3>

              <p className="mt-1 text-[10px] text-gray-500 dark:text-muted-foreground">
                Be part of something meaningful. Make a difference!
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex w-full items-center gap-2 sm:w-auto sm:shrink-0">

            {/* Share Button */}
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Share event"
              onClick={HandleShare}
              className="size-10 shrink-0 rounded-lg border-gray-200 bg-white hover:border-emerald-200 hover:bg-emerald-50 dark:bg-card"
            >
              <Share2 size={15} />
            </Button>

            {/* Join Button */}
            <Button
              type="button"
              onClick={HandleJoinEvent}
              disabled={isPending || isJoining || isJoined}
              className={`inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-[11px] font-semibold text-white shadow-sm transition-colors sm:flex-none sm:px-5 ${
                isJoined
                  ? "cursor-not-allowed bg-gray-500 hover:bg-gray-500"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              <Heart size={13} className="shrink-0" />

              <span>
                {isPending
                  ? "Loading..."
                  : isJoining
                  ? "Joining..."
                  : isJoined
                  ? "Joined"
                  : "Join Event"}
              </span>

              {!isJoined && (
                <ArrowUpRight size={13} className="shrink-0" />
              )}
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinEvent;
