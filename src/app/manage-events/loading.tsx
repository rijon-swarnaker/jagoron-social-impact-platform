
import { Card, CardContent } from "@/components/ui/card";

const ManageEventsSkeleton = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50/80 py-8 dark:bg-background sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header Skeleton */}
        <section className="mb-8 rounded-2xl border border-green-100 bg-white p-5 shadow-sm dark:border-green-900/40 dark:bg-card sm:p-7 lg:p-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1 space-y-4">
              <div className="h-7 w-48 animate-pulse rounded-full bg-slate-200 dark:bg-muted" />

              <div className="h-9 w-64 max-w-full animate-pulse rounded-lg bg-slate-200 dark:bg-muted sm:w-80" />

              <div className="space-y-2">
                <div className="h-4 w-full max-w-xl animate-pulse rounded bg-slate-200 dark:bg-muted" />
                <div className="h-4 w-full max-w-lg animate-pulse rounded bg-slate-200 dark:bg-muted" />
              </div>
            </div>

            <div className="h-11 w-full animate-pulse rounded-xl bg-green-100 dark:bg-green-950 sm:w-48" />
          </div>
        </section>

        {/* Statistics Skeleton */}
        <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

          {/* Total Events */}
          <Card className="overflow-hidden rounded-2xl border-slate-200/80 shadow-sm dark:border-border">
            <CardContent className="flex items-center justify-between gap-4 p-5 sm:p-6">
              <div className="min-w-0 flex-1 space-y-3">
                <div className="h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-muted" />
                <div className="h-9 w-12 animate-pulse rounded bg-slate-200 dark:bg-muted" />
                <div className="h-3 w-36 animate-pulse rounded bg-slate-200 dark:bg-muted" />
              </div>

              <div className="size-12 shrink-0 animate-pulse rounded-xl bg-green-100 dark:bg-green-950 sm:size-14" />
            </CardContent>
          </Card>

          {/* Organizer Information */}
          <Card className="overflow-hidden rounded-2xl border-slate-200/80 shadow-sm dark:border-border">
            <CardContent className="flex items-center justify-between gap-4 p-5 sm:p-6">
              <div className="min-w-0 flex-1 space-y-3">
                <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-muted" />
                <div className="h-7 w-40 max-w-full animate-pulse rounded bg-slate-200 dark:bg-muted" />
                <div className="h-3 w-48 max-w-full animate-pulse rounded bg-slate-200 dark:bg-muted" />
              </div>

              <div className="size-12 shrink-0 animate-pulse rounded-xl bg-emerald-100 dark:bg-emerald-950 sm:size-14" />
            </CardContent>
          </Card>

        </section>

        {/* Events Section */}
        <section>

          {/* Section Heading */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-7 w-56 max-w-full animate-pulse rounded bg-slate-200 dark:bg-muted sm:w-64" />
              <div className="h-4 w-72 max-w-full animate-pulse rounded bg-slate-200 dark:bg-muted" />
            </div>

            <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-muted" />
          </div>

          {/* Event Cards Skeleton */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-2xl border-slate-200/80 shadow-sm dark:border-border"
              >
                {/* Thumbnail */}
                <div className="aspect-[16/9] w-full animate-pulse bg-slate-200 dark:bg-muted" />

                <CardContent className="space-y-4 p-5">

                  {/* Category and Date */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-6 w-24 animate-pulse rounded-full bg-green-100 dark:bg-green-950" />
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-muted" />
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <div className="h-6 w-full animate-pulse rounded bg-slate-200 dark:bg-muted" />
                    <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-muted" />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <div className="h-3.5 w-full animate-pulse rounded bg-slate-200 dark:bg-muted" />
                    <div className="h-3.5 w-full animate-pulse rounded bg-slate-200 dark:bg-muted" />
                    <div className="h-3.5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-muted" />
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2">
                    <div className="size-4 shrink-0 animate-pulse rounded bg-slate-200 dark:bg-muted" />
                    <div className="h-4 w-40 max-w-[80%] animate-pulse rounded bg-slate-200 dark:bg-muted" />
                  </div>

                  {/* Organizer */}
                  <div className="flex items-center gap-3">
                    <div className="size-9 shrink-0 animate-pulse rounded-full bg-slate-200 dark:bg-muted" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-muted" />
                      <div className="h-3 w-36 max-w-full animate-pulse rounded bg-slate-200 dark:bg-muted" />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 border-t pt-4 dark:border-border">
                    <div className="h-9 flex-1 animate-pulse rounded-lg bg-slate-200 dark:bg-muted" />
                    <div className="h-9 flex-1 animate-pulse rounded-lg bg-slate-200 dark:bg-muted" />
                    <div className="size-9 shrink-0 animate-pulse rounded-lg bg-slate-200 dark:bg-muted" />
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default ManageEventsSkeleton;
