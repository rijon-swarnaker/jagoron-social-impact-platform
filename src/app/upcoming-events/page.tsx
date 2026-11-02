
import { connection } from "next/server";
import UpcomingEventsClient from "@/components/UpcomingEventsClient";
import { EventProps } from "@/Types/EventsType";

export default async function UpcomingEventsPage() {
  await connection();

  let events: EventProps[] = [];
  let categories: string[] = [];
  let error = "";

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      throw new Error("API URL is not configured");
    }

    const [eventsRes, categoriesRes] = await Promise.all([
      fetch(`${baseUrl}/upcoming-events`, {
        cache: "no-store",
      }),
      fetch(`${baseUrl}/event-categories`, {
        cache: "no-store",
      }),
    ]);

    if (!eventsRes.ok) {
      throw new Error(`Events API failed: ${eventsRes.status}`);
    }

    if (!categoriesRes.ok) {
      throw new Error(`Categories API failed: ${categoriesRes.status}`);
    }

    const [eventsData, categoriesData] = await Promise.all([
      eventsRes.json(),
      categoriesRes.json(),
    ]);

    events = eventsData;
    categories = categoriesData;
  } catch (err) {
    console.error("Upcoming events fetch error:", err);
    error = "Unable to load events. Please try again.";
  }

  return (
    <UpcomingEventsClient
      initialEvents={events}
      initialCategories={categories}
      initialError={error}
    />
  );
}
