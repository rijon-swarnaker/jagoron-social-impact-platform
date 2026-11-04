import EventCard from "@/components/EventCard/EventCard";
import { auth } from "@/lib/auth";
import { EventProps } from "@/Types/EventsType";
import { headers } from "next/headers";
import { connection } from "next/server";
import Link from "next/link";

import { CalendarDays, Heart, ArrowRight, Leaf } from "lucide-react";
import { redirect } from "next/navigation";
import JoinedCard from "@/components/EventCard/JoinedCard";

const JoinedEventsPage = async () => {
  await connection();

  // Get current user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  const token = jwtToken?.token;

  if (!user?.email) {
    redirect("/login");
  }

  // Fetch joined events
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/joined-events/${encodeURIComponent(user.email)}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    console.error("API Error:", res.status);

    return (
      <div className="flex min-h-[50vh] items-center justify-center px-5 text-center">
        <p className="text-red-500">Failed to load joined events!</p>
      </div>
    );
  }

  const data: EventProps[] = await res.json();

  return (
    <main className="min-h-screen bg-gray-50/70 py-10 dark:bg-background sm:py-14">
      <div className="container mx-auto max-w-7xl px-5">
        {/* Page Header */}
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400">
            <Leaf size={14} />
            YOUR SOCIAL IMPACT
          </div>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                My Joined Events
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Every small action creates a big impact. Track the events you
                have joined and continue making a difference with Jagoron.
              </p>
            </div>

            {/* Joined Events Count */}
            <div className="flex w-fit items-center gap-3 rounded-xl border bg-white px-5 py-3 shadow-sm dark:bg-card">
              <div className="flex size-11 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                <Heart size={21} />
              </div>

              <div>
                <p className="text-2xl font-bold">{data.length}</p>

                <p className="text-xs text-muted-foreground">Joined Events</p>
              </div>
            </div>
          </div>
        </div>

        {/* Conditional Rendering */}
        {data.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-white px-5 py-16 text-center dark:bg-card">
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
              <CalendarDays size={35} />
            </div>

            <h2 className="text-xl font-bold sm:text-2xl">
              No Joined Events Yet!
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              You haven&apos;t joined any events yet. Discover upcoming social
              development events and become a part of something meaningful.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              Explore Events
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          /* Joined Events Grid */
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Your Participations</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Events you are currently participating in.
                </p>
              </div>

              <Link
                href="/upcoming-events"
                className="hidden items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-800 dark:text-green-400 sm:flex"
              >
                Explore More
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((event) => (
                <JoinedCard key={event._id} event={event} />
              ))}
            </div>

            <div className="mt-10 text-center sm:hidden">
              <Link
                href="/upcoming-events"
                className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400"
              >
                Explore More Events
                <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default JoinedEventsPage;
