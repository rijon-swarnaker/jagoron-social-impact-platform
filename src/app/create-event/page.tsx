
import { Suspense } from "react";
import { connection } from "next/server";

import { Loader2 } from "lucide-react";
import CreateEventForm from "@/components/CreateEventForm";

async function CreateEventContent() {
  await connection();

  const date = new Date();
  date.setDate(date.getDate() + 1);

  const tomorrow = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

  return <CreateEventForm tomorrow={tomorrow} />;
}

export default function CreateEventPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="size-8 animate-spin text-emerald-600" />
        </div>
      }
    >
      <CreateEventContent />
    </Suspense>
  );
}
