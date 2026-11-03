
import { EventProps } from "@/Types/EventsType";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Heart,
  Mail,
  MapPin,
  ShieldCheck,
  HandHeart,
  Package,
  Smile,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import JoinEvent from "@/components/JoinEvent";

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/upcoming-event/${id}`,
  );

  if (!res.ok) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <CalendarDays size={28} />
        </div>

        <h2 className="text-2xl font-bold">
          Event Not Found!
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Sorry, this event is not available.
        </p>

        <Link
          href="/upcoming-events"
          className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  const data: EventProps = await res.json();

  const formattedDate = new Date(
    data.eventDate,
  ).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const guidelines = [
    {
      icon: Clock,
      title: "Be On Time",
      description:
        "Please arrive at least 15 minutes before the event starts so we can organize everything smoothly.",
    },
    {
      icon: ShieldCheck,
      title: "Follow Safety Rules",
      description:
        "Follow the organizer's instructions and maintain a safe, responsible environment throughout the event.",
    },
    {
      icon: Package,
      title: "Come Prepared",
      description:
        "Bring necessary supplies or materials if requested. Be ready to contribute your time and effort.",
    },
    {
      icon: HandHeart,
      title: "Respect Everyone",
      description:
        "Treat every participant with kindness, respect and compassion. Work together as one team.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f8f7] py-6 dark:bg-background sm:py-9">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Back Navigation */}
        <Link
          href="/upcoming-events"
          className="group mb-5 inline-flex items-center gap-2 text-xs font-medium text-gray-500 transition hover:text-emerald-600"
        >
          <span className="flex size-7 items-center justify-center rounded-full border bg-white transition group-hover:border-emerald-200 group-hover:bg-emerald-50 dark:bg-card">
            <ArrowLeft size={13} />
          </span>
          Back to Upcoming Events
        </Link>

        {/* Main Event Card */}
        <Card className="overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-[0_10px_35px_-15px_rgba(0,0,0,0.15)] dark:bg-card">
          {/* Hero Banner */}
          <div className="group relative h-[230px] w-full overflow-hidden border-0 sm:h-[290px]">
            <Image
              src={data.thumbnailImage}
              alt={data.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              className="border-0 object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

            {/* Category Badge */}
            <Badge className="absolute left-5 top-5 rounded-full border-0 bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-emerald-700 shadow-md backdrop-blur-md hover:bg-white">
              <Heart size={12} className="mr-1.5" />
              {data.eventType}
            </Badge>

            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Making a Difference Together
              </p>

              <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {data.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/90">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-emerald-400" />
                  {data.location}
                </span>

                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-emerald-400" />
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>

          <CardContent className="p-4 sm:p-6">
            {/* Join Event Section */}
            <JoinEvent key={data._id} data={data} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-7 md:grid-cols-[minmax(0,1fr)_250px]">
              {/* Left Content */}
              <section className="min-w-0 space-y-7">
                {/* About Section */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-5 w-1 rounded-full bg-emerald-500" />

                    <h2 className="text-sm font-bold tracking-tight">
                      About This Social Initiative
                    </h2>
                  </div>

                  {/* Event Description */}
                  <p className="whitespace-pre-line break-words text-[12px] leading-7 text-gray-500 dark:text-muted-foreground">
                    {data.description?.trim() ||
                      "No event description available."}
                  </p>
                </div>

                <Separator />

                {/* Volunteer Guidelines */}
                <div>
                  <div className="mb-4">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="h-5 w-1 rounded-full bg-emerald-500" />

                      <h2 className="text-sm font-bold tracking-tight">
                        Volunteer Guidelines
                      </h2>
                    </div>

                    <p className="pl-3 text-[10px] text-muted-foreground">
                      A few simple guidelines to make our initiative successful.
                    </p>
                  </div>

                  {/* Guideline Cards */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {guidelines.map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={index}
                          className="group flex gap-3 rounded-xl border border-gray-100 bg-[#fafcfb] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50/60 hover:shadow-sm dark:border-border dark:bg-muted/20 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/20"
                        >
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100/80 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950 dark:text-emerald-400">
                            <Icon size={17} />
                          </div>

                          <div className="min-w-0">
                            <div className="mb-1 flex items-center gap-2">
                              <span className="text-[9px] font-bold text-emerald-600">
                                0{index + 1}
                              </span>

                              <h3 className="text-[11px] font-bold text-gray-800 dark:text-foreground">
                                {item.title}
                              </h3>
                            </div>

                            <p className="text-[10px] leading-[1.7] text-gray-500 dark:text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Note */}
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50/80 px-3 py-2.5 dark:bg-emerald-950/30">
                    <Smile size={15} className="shrink-0 text-emerald-600" />

                    <p className="text-[10px] leading-5 text-emerald-800 dark:text-emerald-300">
                      Your kindness, time and effort can create a lasting
                      positive impact.
                    </p>
                  </div>
                </div>
              </section>

              {/* Right Sidebar */}
              <aside className="min-w-0 space-y-4">
                {/* Organizer Card */}
                <Card className="overflow-hidden rounded-xl border border-gray-200/80 shadow-none dark:border-border">
                  <CardContent className="p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-[9px] font-bold uppercase tracking-[0.13em] text-gray-500">
                        Initiative Organizer
                      </h3>

                      <ShieldCheck size={15} className="text-emerald-600" />
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-10 shrink-0 border-0">
                        <AvatarImage
                          src={data.organizerPhoto}
                          alt={data.organizerName}
                        />

                        <AvatarFallback className="bg-emerald-50 text-sm font-bold text-emerald-700">
                          {data.organizerName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <h4 className="truncate text-[11px] font-bold">
                          {data.organizerName}
                        </h4>

                        <p className="mt-1 flex items-center gap-1 truncate text-[9px] text-gray-500">
                          <Mail size={10} />
                          {data.organizerEmail}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-3" />

                    <div className="flex items-center gap-1.5 text-[9px] font-medium text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 size={12} />
                      Verified Platform Member
                    </div>
                  </CardContent>
                </Card>

                {/* Event Information */}
                <Card className="rounded-xl border border-gray-200/80 shadow-none dark:border-border">
                  <CardContent className="p-4">
                    <h3 className="mb-4 text-xs font-bold">
                      Event Information
                    </h3>

                    <div className="space-y-4">
                      {/* Event Date */}
                      <div className="flex items-start gap-2.5">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950">
                          <CalendarDays size={15} />
                        </div>

                        <div>
                          <p className="text-[9px] text-gray-500">
                            Event Date
                          </p>

                          <p className="mt-1 text-[10px] font-semibold">
                            {formattedDate}
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-2.5">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950">
                          <MapPin size={15} />
                        </div>

                        <div>
                          <p className="text-[9px] text-gray-500">
                            Location
                          </p>

                          <p className="mt-1 text-[10px] font-semibold leading-5">
                            {data.location}
                          </p>
                        </div>
                      </div>

                      {/* Category */}
                      <div className="flex items-start gap-2.5">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950">
                          <Heart size={15} />
                        </div>

                        <div>
                          <p className="text-[9px] text-gray-500">
                            Category
                          </p>

                          <p className="mt-1 text-[10px] font-semibold">
                            {data.eventType}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default EventDetailsPage;
