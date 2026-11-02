
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  Heart,
  MapPin,
  Search,
  Mail,
  RefreshCw,
  CalendarX,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { EventProps } from "@/Types/EventsType";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch Upcoming Events and Categories
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError("");

      if (!baseUrl) {
        throw new Error("API URL is not configured");
      }

      const [eventsRes, categoriesRes] = await Promise.all([
        fetch(`${baseUrl}/upcoming-events`),
        fetch(`${baseUrl}/event-categories`),
      ]);

      if (!eventsRes.ok) {
        throw new Error("Failed to fetch upcoming events");
      }

      if (!categoriesRes.ok) {
        throw new Error("Failed to fetch event categories");
      }

      const [eventsData, categoriesData] = await Promise.all([
        eventsRes.json(),
        categoriesRes.json(),
      ]);

      setEvents(eventsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Upcoming events fetch error:", err);
      setError("Unable to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Fetch Events by Category
  const handleCategoryChange = async (category: string) => {
    try {
      setSelectedCategory(category);
      setError("");
      setLoading(true);

      if (!baseUrl) {
        throw new Error("API URL is not configured");
      }

      const url =
        category === "All"
          ? `${baseUrl}/upcoming-events`
          : `${baseUrl}/upcoming-events?category=${encodeURIComponent(category)}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }

      const data: EventProps[] = await res.json();

      setEvents(data);
    } catch (err) {
      console.error("Events fetch error:", err);
      setError("Unable to load events. Please try again.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Search Filter
  const filteredEvents = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return events.filter((event) => {
      return (
        event.title?.toLowerCase().includes(searchTerm) ||
        event.location?.toLowerCase().includes(searchTerm) ||
        event.eventType?.toLowerCase().includes(searchTerm)
      );
    });
  }, [events, search]);

  // Date Formatter
  const formatDate = (date: string) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#F7FAF7] dark:bg-[#071A10]">
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">

        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-widest text-emerald-600">
              BE PART OF SOMETHING GOOD
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
              Explore All Events
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Find opportunities to contribute to your community.
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-2 sm:w-auto sm:items-end">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <Input
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 rounded-lg border-gray-200 bg-white pl-10 text-sm shadow-sm transition-all focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/10 dark:border-green-900 dark:bg-[#102A1B]"
              />
            </div>

            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {filteredEvents.length} Events Found
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-9 flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === "All" ? "default" : "outline"}
            onClick={() => handleCategoryChange("All")}
            className={`shrink-0 rounded-full ${
              selectedCategory === "All"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "border-gray-200 bg-white text-gray-600 dark:border-green-900 dark:bg-[#102A1B] dark:text-gray-300"
            }`}
          >
            All
          </Button>

          {categories.map((category) => (
            <Button
              key={category}
              variant={
                selectedCategory === category ? "default" : "outline"
              }
              onClick={() => handleCategoryChange(category)}
              className={`shrink-0 rounded-full ${
                selectedCategory === category
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "border-gray-200 bg-white text-gray-600 dark:border-green-900 dark:bg-[#102A1B] dark:text-gray-300"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[390px] animate-pulse rounded-2xl border border-green-100 bg-white dark:border-green-900 dark:bg-[#102A1B]"
              >
                <div className="h-44 rounded-t-2xl bg-gray-200 dark:bg-green-950" />
                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-green-950" />
                  <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-green-950" />
                  <div className="h-12 rounded bg-gray-200 dark:bg-green-950" />
                  <div className="h-10 rounded-full bg-gray-200 dark:bg-green-950" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="py-16 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30">
              <RefreshCw className="size-7 text-red-500" />
            </div>

            <p className="mt-4 text-sm font-medium text-red-500">
              {error}
            </p>

            <Button
              onClick={fetchInitialData}
              className="mt-5 bg-green-600 hover:bg-green-700"
            >
              <RefreshCw className="mr-2 size-4" />
              Try Again
            </Button>
          </div>
        ) : filteredEvents.length > 0 ? (
          /* Events Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <Card
                key={event._id}
                className="group flex flex-col gap-0 overflow-hidden rounded-2xl border border-emerald-100 bg-card py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-emerald-900/60"
              >
                {/* Event Image */}
                <div className="relative h-44 w-full overflow-hidden sm:h-40 lg:h-44">
                  <Image
                    src={event.thumbnailImage}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/10" />

                  <Badge className="absolute left-3 top-3 gap-1 rounded-full border-0 bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-md hover:bg-white/95">
                    <Heart size={14} className="text-red-500" />
                    {event.eventType}
                  </Badge>

                  <Badge className="absolute right-3 top-3 flex max-w-[65%] items-center gap-1.5 truncate rounded-full border-0 bg-emerald-950/90 px-3 py-1.5 text-[10px] font-semibold text-white shadow-md hover:bg-emerald-950/90 sm:text-xs">
                    <CalendarDays size={13} className="shrink-0" />

                    <span className="truncate">
                      {formatDate(event.eventDate)}
                    </span>
                  </Badge>
                </div>

                {/* Event Details */}
                <CardContent className="flex flex-1 flex-col p-4">
                  <h2 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    {event.title}
                  </h2>

                  <div className="mb-2 flex items-start gap-2 text-sm font-medium text-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />

                    <span className="line-clamp-1">
                      {event.location}
                    </span>
                  </div>

                  <p className="mb-4 line-clamp-3 min-h-15 text-sm leading-5 text-muted-foreground">
                    {event.description}
                  </p>

                  {/* Organizer Information */}
                  <div className="mb-4 mt-auto flex min-w-0 items-center gap-3 border-t border-border pt-3">
                    <Avatar className="size-11 shrink-0 border-2 border-emerald-100 dark:border-emerald-800">
                      <AvatarImage
                        src={event.organizerPhoto || ""}
                        alt="Event organizer"
                        className="object-cover"
                      />

                      <AvatarFallback className="bg-emerald-100 text-sm font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                        {event.organizerEmail
                          ?.split("@")[0]
                          ?.slice(0, 2)
                          .toUpperCase() || "OR"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-muted-foreground">
                        Organized by
                      </p>

                      <p className="truncate text-sm font-bold text-foreground">
                        {event.organizerEmail?.split("@")[0] || "Organizer"}
                      </p>

                      <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail size={12} className="shrink-0" />

                        <span className="truncate">
                          {event.organizerEmail}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* View Event Button */}
                  <Link
                    href={`/upcoming-events/${event._id}`}
                    className="group flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-emerald-600 to-green-700 px-4 py-2.5 text-sm font-bold leading-none text-white shadow-sm transition-all duration-300 hover:from-emerald-700 hover:to-green-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  >
                    <span>View Event</span>

                    <ArrowRight
                      size={18}
                      className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-green-200 py-16 text-center dark:border-green-900">
            <CalendarX className="mx-auto size-10 text-green-500" />

            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              No Events Found
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Try searching with another keyword or category.
            </p>

            <Button
              variant="outline"
              className="mt-5 border-green-200 text-green-700 hover:bg-green-50"
              onClick={() => {
                setSearch("");
                handleCategoryChange("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
