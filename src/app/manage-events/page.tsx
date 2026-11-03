
import Link from "next/link";
import Image from "next/image";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import {
  CalendarDays,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Eye,
  LayoutDashboard,
  Users,
  CalendarCheck,

  Leaf,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";
import { EventProps } from "@/Types/EventsType";
import ManageCard from "@/components/EventCard/ManageCard";

// Format event date safely
const formatEventDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const ManageEventsPage = async () => {
  // Get current user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // Authentication check
  if (!user?.email) {
    redirect("/login");
  }

  // Fetch organizer events
  let events: EventProps[] = [];
  let error = false;

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/manage-events/${encodeURIComponent(user.email)}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status}`);
    }

    events = await res.json();
  } catch (err) {
    console.error("Manage Events Error:", err);
    error = true;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50/80 py-8 dark:bg-background sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <section className="mb-8 rounded-2xl border border-green-100 bg-gradient-to-br from-white via-green-50/60 to-emerald-50/80 p-5 shadow-sm dark:border-green-900/40 dark:from-card dark:via-card dark:to-green-950/20 sm:p-7 lg:p-9">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="min-w-0 flex-1">
              <Badge
                variant="secondary"
                className="mb-4 gap-2 rounded-full border border-green-200 bg-green-100 px-3 py-1.5 text-green-800 hover:bg-green-100 dark:border-green-900 dark:bg-green-950 dark:text-green-400"
              >
                <LayoutDashboard size={14} />
                ORGANIZER DASHBOARD
              </Badge>

              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-foreground sm:text-3xl lg:text-4xl">
                Manage My Events
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-muted-foreground sm:text-base">
                Manage your social initiatives, track your
                published events, and continue making a
                positive impact in your community with Jagoron.
              </p>
            </div>

            {/* Create Event Button */}
            <div className="w-full shrink-0 sm:w-auto">
              <Button
                
                className="h-11 w-full gap-2 rounded-xl bg-green-700 px-5 font-semibold text-white shadow-sm transition hover:bg-green-800 sm:w-auto"
              >
                <Link href="/create-event">
                  <Plus size={19} />
                  Create New Event
                </Link>
              </Button>
            </div>

          </div>
        </section>

        {/* ================= STATISTICS ================= */}
        <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

          {/* Total Events */}
          <Card className="overflow-hidden rounded-2xl border-slate-200/80 shadow-sm transition-shadow hover:shadow-md dark:border-border">
            <CardContent className="flex items-center justify-between gap-4 p-5 sm:p-6">

              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Published Events
                </p>

                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-foreground">
                  {events.length}
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Events created by you
                </p>
              </div>

              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 sm:size-14">
                <CalendarCheck size={26} />
              </div>

            </CardContent>
          </Card>

          {/* Organizer Information */}
          <Card className="overflow-hidden rounded-2xl border-slate-200/80 shadow-sm transition-shadow hover:shadow-md dark:border-border">
            <CardContent className="flex items-center justify-between gap-4 p-5 sm:p-6">

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Event Organizer
                </p>

                <h2 className="mt-2 break-words text-xl font-bold text-slate-900 dark:text-foreground">
                  {user.name || "Organizer"}
                </h2>

                <p className="mt-1 break-all text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>

              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 sm:size-14">
                <Users size={26} />
              </div>

            </CardContent>
          </Card>

        </section>

        {/* ================= EVENTS SECTION ================= */}
        <section>

          {/* Section Heading */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Leaf size={19} className="shrink-0 text-green-700 dark:text-green-400" />

                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-foreground sm:text-2xl">
                  Your Published Events
                </h2>
              </div>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                View and manage all your community initiatives.
              </p>
            </div>

            <Badge
              variant="secondary"
              className="w-fit shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold"
            >
              {events.length} {events.length === 1 ? "Event" : "Events"}
            </Badge>

          </div>

          {/* Error State */}
          {error ? (

            <Card className="rounded-2xl border-red-200 shadow-sm dark:border-red-900">
              <CardContent className="flex flex-col items-center px-5 py-14 text-center">

                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950">
                  <CalendarDays size={26} />
                </div>

                <h3 className="text-lg font-bold text-red-600">
                  Something Went Wrong!
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  We couldn&apos;t load your events.
                  Please try again later.
                </p>

              </CardContent>
            </Card>

          ) : events.length === 0 ? (

            /* Empty State */
            <Card className="overflow-hidden rounded-2xl border-dashed border-slate-300 shadow-none dark:border-border">
              <CardContent className="flex flex-col items-center px-5 py-14 text-center sm:py-20">

                <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
                  <CalendarDays size={36} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-foreground sm:text-2xl">
                  No Events Created Yet!
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                  You haven&apos;t published any events yet.
                  Start your first social initiative and
                  inspire others to make a difference.
                </p>

                <Button
                  
                  className="mt-7 h-11 w-full gap-2 rounded-xl bg-green-700 px-6 font-semibold text-white hover:bg-green-800 sm:w-auto"
                >
                  <Link href="/create-event">
                    <Plus size={18} />
                    Create Your First Event
                  </Link>
                </Button>

              </CardContent>
            </Card>

          ) : (

            /* ================= EVENT CARDS ================= */
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">

              {events.map((event) => <ManageCard key={event._id} event={event}/> )}

            </div>

          )}

        </section>

      </div>
    </main>
  );
};

export default ManageEventsPage;
