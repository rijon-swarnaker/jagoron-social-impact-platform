
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentUpcomingEventSkeleton() {
  return (
    <section className="bg-background px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Heading Skeleton */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:mb-9 sm:flex-row sm:items-end">
          <div className="space-y-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-9 w-64 max-w-full" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>

          <Skeleton className="h-5 w-32" />
        </div>

        {/* Event Cards Skeleton */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              {/* Image */}
              <Skeleton className="h-44 w-full rounded-none sm:h-40 lg:h-44" />

              {/* Content */}
              <div className="space-y-4 p-4">

                {/* Title */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-4/5" />
                  <Skeleton className="h-5 w-2/5" />
                </div>

                {/* Location */}
                <Skeleton className="h-4 w-3/4" />

                {/* Description */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Organizer */}
                <div className="flex items-center gap-3 border-t border-border pt-3">
                  <Skeleton className="size-11 shrink-0 rounded-full" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-36 max-w-full" />
                  </div>
                </div>

                {/* Button */}
                <Skeleton className="h-11 w-full rounded-full" />

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
