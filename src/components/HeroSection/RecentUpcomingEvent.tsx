
import { connection } from "next/server";

import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";



import { EventProps } from "@/Types/EventsType";
import EventCard from "../EventCard/EventCard";

export default async function RecentUpcomingEvent() {
  // Wait until request time before fetching data
  await connection();

  let data: EventProps[] = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      throw new Error("API URL is not configured");
    }

    const res = await fetch(
      `${baseUrl}/recent-upcoming-events`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch upcoming events: ${res.status}`
      );
    }

    data = await res.json();
  } catch (error) {
    console.error("Recent upcoming events fetch error:", error);
  }

  

  return (
    <section className="bg-background px-4 py-10 transition-colors duration-300 sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:mb-9 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Take Action
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Recent Upcoming Events
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Be part of something meaningful. Join our upcoming
              events and make a positive impact in your community.
            </p>
          </div>

          <Link
            href="/events"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-700 transition-all hover:gap-3 dark:text-emerald-400"
          >
            View All Events
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Events Grid */}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {data.slice(0, 6).map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="rounded-2xl border-dashed bg-card py-14 text-center shadow-none">
            <CardContent>
              <CalendarDays className="mx-auto mb-4 size-10 text-emerald-600 dark:text-emerald-400" />

              <h3 className="text-lg font-bold text-foreground">
                No Upcoming Events
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                There are no upcoming events at the moment.
                Please check back later!
              </p>

              <Link
                href="/create-event"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Create an Event
                <ArrowRight size={16} />
              </Link>
            </CardContent>
          </Card>
        )}

      </div>
    </section>
  );
}
