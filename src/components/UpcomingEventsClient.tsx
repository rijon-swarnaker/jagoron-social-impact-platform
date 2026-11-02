"use client";

import { useMemo, useState } from "react";
import { Leaf, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventProps } from "@/Types/EventsType";
import EventCard from "./EventCard/EventCard";

interface UpcomingEventsClientProps {
  initialEvents: EventProps[];
  initialCategories: string[];
  initialError: string;
}

export default function UpcomingEventsClient({
  initialEvents,
  initialCategories,
  initialError,
}: UpcomingEventsClientProps) {
  const [events, setEvents] = useState<EventProps[]>(initialEvents);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [search, setSearch] = useState("");

  const [error, setError] = useState(initialError);

  const categories = initialCategories;

  const fetchEvents = async (category = "All") => {
    try {
      setError("");

      const url =
        category === "All"
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/upcoming-events`
          : `${process.env.NEXT_PUBLIC_API_BASE_URL}/upcoming-events?category=${encodeURIComponent(category)}`;

      const res = await fetch(url ,{
        next:{ revalidate:100}
      });

      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }

      const data: EventProps[] = await res.json();

      setEvents(data);
    } catch (err) {
      console.error("Events fetch error:", err);

      setError("Unable to load events. Please try again.");

      setEvents([]);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    fetchEvents(category);
  };

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

  return (
    <main className="min-h-screen bg-[#F7FAF7] dark:bg-[#071A10]">
      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-widest text-emerald-600">
              BE PART OF SOMETHING GOOD
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
              Explore All Events
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Find opportunities to contribute to your community.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
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

        <div className="mb-9 flex gap-2 overflow-x-auto pb-2">
          {/* All Category */}

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

          {/* Dynamic Categories */}

          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
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

        {error ? (
          <div className="py-16 text-center">
            <p className="text-sm text-red-500">{error}</p>

            <Button
              onClick={() => fetchEvents(selectedCategory)}
              className="mt-5 bg-green-600 hover:bg-green-700"
            >
              Try Again
            </Button>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-green-200 py-16 text-center dark:border-green-900">
            <Leaf className="mx-auto h-10 w-10 text-green-500" />
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
