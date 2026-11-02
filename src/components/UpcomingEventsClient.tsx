
// "use client";

// import { useMemo, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// import {
//   ArrowRight,
//   CalendarDays,
//   Heart,
//   Leaf,
//   MapPin,
//   Search,
//   Mail,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";

// import {
//   Card,
//   CardContent,
// } from "@/components/ui/card";

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar";

// import { EventProps } from "@/Types/EventsType";


// interface UpcomingEventsClientProps {
//   initialEvents: EventProps[];
//   initialCategories: string[];
//   initialError: string;
// }


// export default function UpcomingEventsClient({
//   initialEvents,
//   initialCategories,
//   initialError,
// }: UpcomingEventsClientProps) {


//   const [events, setEvents] = useState<EventProps[]>(initialEvents);

//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const [search, setSearch] = useState("");

//   const [error, setError] = useState(initialError);

//   const categories = initialCategories;


//   const fetchEvents = async (category = "All") => {
//     try {
//       setError("");

//       const url =
//         category === "All"
//           ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/upcoming-events`
//           : `${process.env.NEXT_PUBLIC_API_BASE_URL}/upcoming-events?category=${encodeURIComponent(category)}`;

//       const res = await fetch(url);

//       if (!res.ok) {
//         throw new Error("Failed to fetch events");
//       }

//       const data: EventProps[] = await res.json();

//       setEvents(data);

//     } catch (err) {
//       console.error("Events fetch error:", err);

//       setError("Unable to load events. Please try again.");

//       setEvents([]);
//     }
//   };


//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     fetchEvents(category);
//   };

//   const filteredEvents = useMemo(() => {
//     const searchTerm = search.toLowerCase().trim();

//     return events.filter((event) => {
//       return (
//         event.title?.toLowerCase().includes(searchTerm) ||
//         event.location?.toLowerCase().includes(searchTerm) ||
//         event.eventType?.toLowerCase().includes(searchTerm)
//       );
//     });
//   }, [events, search]);

//   const formatDate = (date: string) => {
//     if (!date) return "Date unavailable";

//     const parsedDate = new Date(date);

//     if (Number.isNaN(parsedDate.getTime())) {
//       return "Date unavailable";
//     }

//     return parsedDate.toLocaleDateString("en-US", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };



//   return (
//     <main className="min-h-screen bg-[#F7FAF7] dark:bg-[#071A10]">

//       <section className="mx-auto max-w-7xl px-4 py-14 md:py-16">
//         <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <p className="mb-2 text-xs font-bold tracking-widest text-emerald-600">
//               BE PART OF SOMETHING GOOD
//             </p>

//             <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
//               Explore All Events
//             </h2>

//             <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//               Find opportunities to contribute to your community.
//             </p>

//           </div>

//           <div className="flex flex-col items-start gap-2 sm:items-end">

//             <div className="relative w-full sm:w-64">

//               <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

//               <Input
//                 placeholder="Search events..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="h-10 rounded-lg border-gray-200 bg-white pl-10 text-sm shadow-sm transition-all focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/10 dark:border-green-900 dark:bg-[#102A1B]"
//               />

//             </div>

//             <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
//               {filteredEvents.length} Events Found
//             </p>

//           </div>

//         </div>

//         <div className="mb-9 flex gap-2 overflow-x-auto pb-2">

//           {/* All Category */}

//           <Button
//             variant={selectedCategory === "All" ? "default" : "outline"}
//             onClick={() => handleCategoryChange("All")}
//             className={`shrink-0 rounded-full ${
//               selectedCategory === "All"
//                 ? "bg-green-600 text-white hover:bg-green-700"
//                 : "border-gray-200 bg-white text-gray-600 dark:border-green-900 dark:bg-[#102A1B] dark:text-gray-300"
//             }`}
//           >
//             All
//           </Button>

//           {/* Dynamic Categories */}

//           {categories.map((category) => (
//             <Button
//               key={category}
//               variant={
//                 selectedCategory === category
//                   ? "default"
//                   : "outline"
//               }
//               onClick={() => handleCategoryChange(category)}
//               className={`shrink-0 rounded-full ${
//                 selectedCategory === category
//                   ? "bg-green-600 text-white hover:bg-green-700"
//                   : "border-gray-200 bg-white text-gray-600 dark:border-green-900 dark:bg-[#102A1B] dark:text-gray-300"
//               }`}
//             >
//               {category}
//             </Button>
//           ))}

//         </div>

//         {error ? (

//           <div className="py-16 text-center">

//             <p className="text-sm text-red-500">
//               {error}
//             </p>

//             <Button
//               onClick={() => fetchEvents(selectedCategory)}
//               className="mt-5 bg-green-600 hover:bg-green-700"
//             >
//               Try Again
//             </Button>

//           </div>

//         ) : filteredEvents.length > 0 ? (



//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

//             {filteredEvents.map((event) => (

//               <Card
//                 key={event._id}
//                 className="group flex flex-col gap-0 overflow-hidden rounded-2xl border border-emerald-100 bg-card py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-emerald-900/60"
//               >

//                 <div className="relative h-44 w-full overflow-hidden sm:h-40 lg:h-44">

//                   <Image
//                     src={event.thumbnailImage}
//                     alt={event.title}
//                     fill
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     className="object-cover transition-transform duration-700 group-hover:scale-105"
//                   />

//                   <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/10" />

//                   <Badge className="absolute left-3 top-3 gap-1 rounded-full border-0 bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-md hover:bg-white/95">

//                     <Heart
//                       size={14}
//                       className="text-red-500"
//                     />

//                     {event.eventType}

//                   </Badge>
//                   <Badge className="absolute right-3 top-3 flex max-w-[65%] items-center gap-1.5 truncate rounded-full border-0 bg-emerald-950/90 px-3 py-1.5 text-[10px] font-semibold text-white shadow-md hover:bg-emerald-950/90 sm:text-xs">

//                     <CalendarDays
//                       size={13}
//                       className="shrink-0"
//                     />

//                     <span className="truncate">
//                       {formatDate(event.eventDate)}
//                     </span>
//                   </Badge>

//                 </div>

//                 <CardContent className="flex flex-1 flex-col p-4">

//                   <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
//                     {event.title}
//                   </h3>

//                   <div className="mb-2 flex items-start gap-2 text-sm font-medium text-foreground">
//                     <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
//                     <span className="line-clamp-1">
//                       {event.location}
//                     </span>
//                   </div>

//                   <p className="mb-4 line-clamp-3 min-h-15 text-sm leading-5 text-muted-foreground">
//                     {event.description}
//                   </p>

//                   <div className="mb-4 mt-auto flex min-w-0 items-center gap-3 border-t border-border pt-3">
//                     <Avatar className="size-11 shrink-0 border-2 border-emerald-100 dark:border-emerald-800">

//                       <AvatarImage
//                         src={event.organizerPhoto || ""}
//                         alt="Event organizer"
//                         className="object-cover"
//                       />
//                       <AvatarFallback className="bg-emerald-100 text-sm font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
//                         {event.organizerEmail
//                           ?.split("@")[0]
//                           ?.slice(0, 2)
//                           .toUpperCase() || "OR"}
//                       </AvatarFallback>
//                     </Avatar>

//                     <div className="min-w-0 flex-1">
//                       <p className="text-[11px] text-muted-foreground">
//                         Organized by
//                       </p>
//                       <p className="truncate text-sm font-bold text-foreground">
//                         {event.organizerEmail?.split("@")[0] || "Organizer"}
//                       </p>
//                       <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
//                         <Mail
//                           size={12}
//                           className="shrink-0"
//                         />
//                         <span className="truncate">
//                           {event.organizerEmail}
//                         </span>
//                       </div>
//                     </div>

//                   </div>


//                   <Link
//                     href={`/upcoming-events/${event._id}`}
//                     className="group flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-emerald-600 to-green-700 px-4 py-2.5 text-sm font-bold leading-none text-white shadow-sm transition-all duration-300 hover:from-emerald-700 hover:to-green-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
//                   >
//                     <span>View Event</span>
//                     <ArrowRight
//                       size={18}
//                       className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
//                     />
//                   </Link>
//                 </CardContent>
//               </Card>

//             ))}

//           </div>

//         ) : (


//           <div className="rounded-2xl border border-dashed border-green-200 py-16 text-center dark:border-green-900">
//             <Leaf className="mx-auto h-10 w-10 text-green-500" />
//             <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
//               No Events Found
//             </h3>
//             <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//               Try searching with another keyword or category.
//             </p>
//             <Button
//               variant="outline"
//               className="mt-5 border-green-200 text-green-700 hover:bg-green-50"
//               onClick={() => {
//                 setSearch("");
//                 handleCategoryChange("All");
//               }}
//             >
//               Clear Filters
//             </Button>

//           </div>

//         )}

//       </section>

//     </main>
//   );
// }
