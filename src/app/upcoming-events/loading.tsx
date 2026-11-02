
import { Skeleton } from "@/components/ui/skeleton";

export default function UpcomingEventsSkeleton() {
  return (
    <main className="min-h-screen bg-[#F7FAF7] dark:bg-[#071A10]">
      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-3 w-44 bg-emerald-100 dark:bg-emerald-950" />

            <Skeleton className="h-9 w-64 bg-gray-200 dark:bg-gray-800" />

            <Skeleton className="h-4 w-72 bg-gray-200 dark:bg-gray-800" />
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-64 sm:items-end">
            <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />

            <Skeleton className="h-3 w-24 bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-9 flex gap-2 overflow-hidden">
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton
              key={item}
              className="h-9 w-20 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-emerald-100 bg-white dark:border-emerald-900/60 dark:bg-[#102A1B]"
            >
              {/* Image */}
              <Skeleton className="h-44 w-full rounded-none bg-gray-200 dark:bg-gray-800" />

              <div className="flex min-h-[290px] flex-col p-4">

                {/* Title */}
                <Skeleton className="mb-3 h-6 w-4/5 bg-gray-200 dark:bg-gray-800" />

                {/* Location */}
                <Skeleton className="mb-3 h-4 w-2/3 bg-gray-200 dark:bg-gray-800" />

                {/* Description */}
                <div className="mb-5 space-y-2">
                  <Skeleton className="h-3.5 w-full bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="h-3.5 w-full bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="h-3.5 w-3/4 bg-gray-200 dark:bg-gray-800" />
                </div>

                {/* Organizer */}
                <div className="mt-auto flex items-center gap-3 border-t border-gray-100 pt-3 dark:border-green-900">
                  <Skeleton className="size-11 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-20 bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-4 w-28 bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-3 w-36 bg-gray-200 dark:bg-gray-800" />
                  </div>
                </div>

                {/* View Event Button */}
                <Skeleton className="mt-4 h-11 w-full rounded-full bg-emerald-100 dark:bg-emerald-950" />

              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
