
import UpcomingEventsClient from "@/components/UpcomingEventsClient";
import { EventProps } from "@/Types/EventsType";


export default async function UpcomingEventsPage() {
  let events: EventProps[] = [];
  let categories: string[] = [];
  let error = "";

  try {
    const [eventsRes, categoriesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upcoming-events`),

      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/event-categories`),
    ]);

    if (!eventsRes.ok || !categoriesRes.ok) {
      throw new Error("Failed to fetch initial data");
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
