import { Skeleton } from "@/components/ui/skeleton";

const JoinedEventsSkeleton = () => {
  return (
    <main className="min-h-screen bg-gray-50/70 py-10 dark:bg-background sm:py-14">
      <div className="container mx-auto max-w-7xl px-5">

        {/* Header Skeleton */}
        <div className="mb-10">
          <Skeleton className="mb-4 h-7 w-40 rounded-full" />

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="space-y-3">
              <Skeleton className="h-9 w-64 sm:h-11 sm:w-80" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-full max-w-xl" />
                <Skeleton className="h-4 w-72 max-w-full" />
              </div>
            </div>

            {/* Joined Events Count */}
            <div className="flex w-fit items-center gap-3 rounded-xl border bg-white px-5 py-3 shadow-sm dark:bg-card">
              <Skeleton className="size-11 rounded-lg" />

              <div className="space-y-2">
                <Skeleton className="h-7 w-10" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>

          <Skeleton className="hidden h-5 w-28 sm:block" />
        </div>

        {/* Event Cards Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-card"
            >
              {/* Event Image */}
              <Skeleton className="h-52 w-full rounded-none" />

              <div className="space-y-4 p-5">

                {/* Event Title */}
                <div className="space-y-2">
                  <Skeleton className="h-6 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Event Information */}
                <div className="flex flex-wrap gap-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>

                {/* Event Footer */}
                <div className="flex items-center justify-between border-t pt-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-9 w-24 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
};

export default JoinedEventsSkeleton;