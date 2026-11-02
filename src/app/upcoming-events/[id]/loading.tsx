
import { Skeleton } from "@/components/ui/skeleton";

export default function UpcomingEventsLoading() {
  return (
    <main className="min-h-screen bg-[#F7FAF7] dark:bg-[#071A10]">

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16">

        {/* Heading & Search Skeleton */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          {/* Left Heading */}

          <div className="space-y-3">

            <Skeleton className="h-3 w-48 rounded-md" />

            <Skeleton className="h-9 w-64 rounded-lg" />

            <Skeleton className="h-4 w-72 max-w-full rounded-md" />

          </div>

          {/* Right Search */}

          <div className="flex w-full flex-col items-start gap-2 sm:w-auto sm:items-end">

            <Skeleton className="h-10 w-full rounded-lg sm:w-64" />

            <Skeleton className="h-3 w-24 rounded-md" />

          </div>

        </div>

        {/* Category Filter Skeleton */}

        <div className="mb-9 flex gap-2 overflow-hidden pb-2">

          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className={`h-9 shrink-0 rounded-full ${
                index === 0 ? "w-16" : "w-24"
              }`}
            />
          ))}

        </div>

        {/* Event Cards Skeleton */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {Array.from({ length: 6 }).map((_, index) => (

            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm dark:border-emerald-900/60 dark:bg-[#0B2115]"
            >

              {/* Event Image */}

              <div className="relative">

                <Skeleton className="h-44 w-full rounded-none sm:h-40 lg:h-44" />

                {/* Category Badge */}

                <Skeleton className="absolute left-3 top-3 h-7 w-24 rounded-full" />

                {/* Date Badge */}

                <Skeleton className="absolute right-3 top-3 h-7 w-28 rounded-full" />

              </div>

              {/* Card Content */}

              <div className="flex flex-1 flex-col p-4">

                {/* Event Title */}

                <div className="mb-3 space-y-2">

                  <Skeleton className="h-5 w-4/5 rounded-md" />

                  <Skeleton className="h-5 w-3/5 rounded-md" />

                </div>

                {/* Location */}

                <Skeleton className="mb-3 h-4 w-2/3 rounded-md" />

                {/* Description */}

                <div className="mb-5 space-y-2">

                  <Skeleton className="h-4 w-full rounded-md" />

                  <Skeleton className="h-4 w-full rounded-md" />

                  <Skeleton className="h-4 w-4/5 rounded-md" />

                </div>

                {/* Organizer */}

                <div className="mb-4 mt-auto flex items-center gap-3 border-t border-gray-100 pt-3 dark:border-green-900/50">

                  <Skeleton className="h-11 w-11 shrink-0 rounded-full" />

                  <div className="flex-1 space-y-2">

                    <Skeleton className="h-3 w-20 rounded-md" />

                    <Skeleton className="h-4 w-32 rounded-md" />

                    <Skeleton className="h-3 w-40 max-w-full rounded-md" />

                  </div>

                </div>

                {/* View Event Button */}

                <Skeleton className="h-11 w-full rounded-full" />

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}
