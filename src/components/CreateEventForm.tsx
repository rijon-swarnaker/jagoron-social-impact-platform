
"use client";

import { useState, type FormEvent } from "react";
import {
  CalendarDays,
  Image as ImageIcon,
  Loader2,
  Mail,
  MapPin,
  UserRound,
} from "lucide-react";

import { toast } from "sonner";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect, useRouter } from "next/navigation";

// Types
type EventFormData = {
  title: string;
  description: string;
  eventType: string;
  thumbnailImage: string;
  location: string;
  eventDate: string;
  organizerEmail: string;
  organizerPhoto: string;
};

type CreateEventFormProps = {
  tomorrow: string;
};

// Event categories
const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Volunteering",
  "Fundraising",
  "Awareness",
  "Other",
];

// Initial form data
const initialFormData: EventFormData = {
  title: "",
  description: "",
  eventType: "",
  thumbnailImage: "",
  location: "",
  eventDate: "",
  organizerEmail: "",
  organizerPhoto: "",
};

export default function CreateEventForm({
  tomorrow,
}: CreateEventFormProps) {
  // Logged-in user
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const router = useRouter();

  // Form states
  const [formData, setFormData] =
    useState<EventFormData>(initialFormData);

  const [errors, setErrors] = useState<
    Partial<Record<keyof EventFormData, string>>
  >({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (
    field: keyof EventFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Partial<
      Record<keyof EventFormData, string>
    > = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Event description is required.";
    }

    if (!formData.eventType) {
      newErrors.eventType =
        "Please select an event type.";
    }

    // Validate thumbnail URL
    if (!formData.thumbnailImage.trim()) {
      newErrors.thumbnailImage =
        "Thumbnail image URL is required.";
    } else {
      try {
        const url = new URL(formData.thumbnailImage);

        if (!["http:", "https:"].includes(url.protocol)) {
          newErrors.thumbnailImage =
            "Enter a valid image URL.";
        }
      } catch {
        newErrors.thumbnailImage =
          "Enter a valid image URL.";
      }
    }

    if (!formData.location.trim()) {
      newErrors.location =
        "Event location is required.";
    }

    // Validate future date
    if (!formData.eventDate) {
      newErrors.eventDate =
        "Event date is required.";
    } else if (
      tomorrow &&
      formData.eventDate < tomorrow
    ) {
      newErrors.eventDate =
        "Event date must be in the future.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Reset form
  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  // Submit form
  const handleSubmit = async (
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!user) {
    toast.error("Please login to create an event.");
    return;
  }

  if (!validateForm()) {
    toast.error("Please check all required fields.");
    return;
  }

  try {
    setIsSubmitting(true);

    const eventData: EventFormData = {
      ...formData,
      organizerEmail: user.email || "",
      organizerPhoto: user.image || "",
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/add-events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      }
    );

    const data = await res.json();

    if (!res.ok || data.acknowledged !== true) {
      throw new Error(
        data.message || "Failed to create event."
        
      );
    }

    toast.success("Event created successfully!", {
      description: "Your event has been added.",
    });

    console.log("Created event:", data);

    handleReset();

    router.push("/upcoming-events");

  } catch (error) {
    console.error("Event submission failed:", error);

    toast.error("Event creation failed!", {
      description:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    });

  } finally {
    setIsSubmitting(false);
  }
};

  // Session loading
  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  // Authentication check
  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Please login to create an event.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full px-3 py-6 sm:px-5 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto w-full max-w-6xl">

        <Card className="overflow-hidden rounded-2xl border-emerald-100 shadow-xl shadow-emerald-900/5 dark:border-emerald-900/60 dark:bg-[#0B1F15]">

          {/* Header */}
          <CardHeader className="border-b border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-[#102B1D] sm:p-6 md:p-8">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-5 sm:text-left">

              <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-sm sm:size-16">
                <Image
                  src="/Images/jagoron-logo.png"
                  alt="Jagoron logo"
                  width={400}
                  height={400}
                  priority
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <CardTitle className="text-xl font-bold text-emerald-950 dark:text-white sm:text-2xl md:text-3xl">
                  Create New Event
                </CardTitle>

                <CardDescription className="mt-1 text-sm text-emerald-800/70 dark:text-emerald-200/65 sm:text-base">
                  Share your initiative and inspire your community.
                </CardDescription>
              </div>

            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 md:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >

              {/* Responsive Grid */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">

                {/* Event Information */}
                <section className="space-y-5 lg:col-span-3">

                  <div className="border-b border-border pb-3">
                    <h3 className="text-lg font-semibold sm:text-xl">
                      Event Information
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Provide the basic details of your event.
                    </p>
                  </div>

                  {/* Event Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Event Title
                    </Label>

                    <Input
                      id="title"
                      placeholder="Enter event title"
                      value={formData.title}
                      onChange={(e) =>
                        handleChange("title", e.target.value)
                      }
                      aria-invalid={!!errors.title}
                      className="h-11"
                    />

                    {errors.title && (
                      <p className="text-sm text-destructive">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Description
                    </Label>

                    <Textarea
                      id="description"
                      placeholder="Describe your event..."
                      rows={5}
                      value={formData.description}
                      onChange={(e) =>
                        handleChange(
                          "description",
                          e.target.value
                        )
                      }
                      aria-invalid={!!errors.description}
                      className="min-h-32 resize-y"
                    />

                    {errors.description && (
                      <p className="text-sm text-destructive">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Event Type and Date */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    {/* Event Type */}
                    <div className="space-y-2">
                      <Label>Event Type</Label>

                      <Select
                        value={formData.eventType}
                        onValueChange={(value) =>
                          handleChange("eventType", value as string)
                        }
                      >
                        <SelectTrigger
                          className="h-11 w-full"
                          aria-invalid={!!errors.eventType}
                        >
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>

                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {errors.eventType && (
                        <p className="text-sm text-destructive">
                          {errors.eventType}
                        </p>
                      )}
                    </div>

                    {/* Event Date */}
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">
                        Event Date
                      </Label>

                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                          id="eventDate"
                          type="date"
                          min={tomorrow}
                          value={formData.eventDate}
                          onChange={(e) =>
                            handleChange(
                              "eventDate",
                              e.target.value
                            )
                          }
                          aria-invalid={!!errors.eventDate}
                          className="h-11 pl-10"
                        />
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Event date must be after today.
                      </p>

                      {errors.eventDate && (
                        <p className="text-sm text-destructive">
                          {errors.eventDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="space-y-2">
                    <Label htmlFor="thumbnailImage">
                      Thumbnail Image URL
                    </Label>

                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="thumbnailImage"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="h-11 pl-10"
                        value={formData.thumbnailImage}
                        onChange={(e) =>
                          handleChange(
                            "thumbnailImage",
                            e.target.value
                          )
                        }
                        aria-invalid={!!errors.thumbnailImage}
                      />
                    </div>

                    {errors.thumbnailImage && (
                      <p className="text-sm text-destructive">
                        {errors.thumbnailImage}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Location
                    </Label>

                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="location"
                        placeholder="Enter event location"
                        className="h-11 pl-10"
                        value={formData.location}
                        onChange={(e) =>
                          handleChange(
                            "location",
                            e.target.value
                          )
                        }
                        aria-invalid={!!errors.location}
                      />
                    </div>

                    {errors.location && (
                      <p className="text-sm text-destructive">
                        {errors.location}
                      </p>
                    )}
                  </div>

                </section>

                {/* Organizer Information */}
                <section className="h-fit space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-900/70 dark:bg-[#102B1D]/60 sm:p-4 lg:col-span-2">

                  <div>
                    <h3 className="flex items-center gap-2 text-base font-semibold">
                      <UserRound className="size-4 text-emerald-600 dark:text-emerald-400" />
                      Organizer Information
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Account information is automatically added.
                    </p>
                  </div>

                  {/* Organizer Avatar */}
                  <div className="flex items-center gap-3 rounded-lg border border-emerald-100 bg-white/70 p-2 dark:border-emerald-900/50 dark:bg-black/10">

                    <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-900">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt="Organizer"
                          width={40}
                          height={40}
                          className="size-10 rounded-full object-cover"
                        />
                      ) : (
                        <UserRound className="size-5 text-emerald-700 dark:text-emerald-300" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {user.name || "Event Organizer"}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Logged-in account
                      </p>
                    </div>

                  </div>

                  {/* Organizer Email */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="organizerEmail"
                      className="text-xs"
                    >
                      Organizer Email
                    </Label>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="organizerEmail"
                        type="email"
                        value={user.email || ""}
                        readOnly
                        className="h-9 cursor-not-allowed bg-muted/70 pl-9 text-xs"
                      />
                    </div>
                  </div>

                  {/* Organizer Photo */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="organizerPhoto"
                      className="text-xs"
                    >
                      Organizer Photo URL
                    </Label>

                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="organizerPhoto"
                        type="url"
                        value={user.image || ""}
                        readOnly
                        className="h-9 cursor-not-allowed bg-muted/70 pl-9 text-xs"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-muted-foreground">
                    Organizer details are read-only.
                  </p>

                </section>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">

                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full rounded-xl sm:w-auto"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  Reset Form
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 w-full rounded-xl bg-emerald-600 px-8 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Creating Event...
                    </>
                  ) : (
                    "Create Event"
                  )}
                </Button>

              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
