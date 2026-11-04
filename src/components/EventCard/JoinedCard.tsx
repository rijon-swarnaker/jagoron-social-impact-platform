import Image from "next/image";
import Link from "next/link";

import { ArrowRight, CalendarDays, Heart, Mail, MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EventProps } from "@/Types/EventsType";

const JoinedCard = ({event}:{event: EventProps}) => {
  console.log(event);
  

    const formatDate = (date: string) => {
    return new Date(date + "T00:00:00").toLocaleDateString(
      "en-US",
      {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };
  return (
    <div>
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

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

          {/* Category Badge */}
          <Badge className="absolute left-3 top-3 gap-1 rounded-full border-0 bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-md hover:bg-white/95">
            <Heart size={14} className="text-red-500" />
            {event.eventType}
          </Badge>

          {/* Date Badge */}
          <Badge className="absolute right-3 top-3 flex max-w-[65%] items-center gap-1.5 truncate rounded-full border-0 bg-emerald-950/90 px-3 py-1.5 text-[10px] font-semibold text-white shadow-md hover:bg-emerald-950/90 sm:text-xs">
            <CalendarDays size={13} className="shrink-0" />

            <span className="truncate">{formatDate(event.eventDate)}</span>
          </Badge>
        </div>

        {/* Card Content */}
        <CardContent className="flex flex-1 flex-col p-4">
          {/* Event Title */}
          <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
            {event.title}
          </h3>

          {/* Location */}
          <div className="mb-2 flex items-start gap-2 text-sm font-medium text-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />

            <span className="line-clamp-1">{event.location}</span>
          </div>

          {/* Description */}
          <p className="mb-4 line-clamp-3 min-h-[60px] text-sm leading-5 text-muted-foreground">
            {event.description}
          </p>

          {/* Organizer */}
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
              <p className="text-[11px] text-muted-foreground">Organized by</p>

              <p className="truncate text-sm font-bold text-foreground">
                {event.organizerEmail?.split("@")[0] || "Organizer"}
              </p>

              <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                <Mail size={12} className="shrink-0" />

                <span className="truncate">{event.organizerEmail}</span>
              </div>
            </div>
          </div>

          {/* View Event Button */}
          <Link
            href={`/upcoming-events/${event.eventId}`}
            className="group flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 px-4 py-2.5 text-sm font-bold leading-none text-white shadow-sm transition-all duration-300 hover:from-emerald-700 hover:to-green-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            <span>View Event</span>

            <ArrowRight
              size={18}
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinedCard;
