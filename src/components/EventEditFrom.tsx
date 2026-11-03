"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CalendarDays, Image as ImageIcon, MapPin, Pencil } from "lucide-react";

import { EventProps } from "@/Types/EventsType";
import { useRouter } from "next/navigation";

// Form Data Type
type EventFormData = {
  title: string;
  description: string;
  eventType: string;
  eventDate: string;
  thumbnailImage: string;
  location: string;
};

const EventEditFrom = ({ event }: { event: EventProps }) => {
  // Form State
  const [formData, setFormData] = useState<EventFormData>({
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    eventDate: event.eventDate,
    thumbnailImage: event.thumbnailImage,
    location: event.location,
  });

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
  };
  const router = useRouter();

  // Handle Submit

  const HandleOnSubmit = async () => {
    try {
      const updatedEvent: EventFormData = {
        title: formData.title,
        description: formData.description,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        thumbnailImage: formData.thumbnailImage,
        location: formData.location,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/manage-event/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Event update failed!");
        return;
      }

      toast.success("Event updated successfully! 🎉");

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog>
      {/* Dialog Trigger */}
      <DialogTrigger>
        <Button className="flex min-h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-2 text-xs font-bold text-white transition hover:bg-blue-700 sm:text-sm">
          <Pencil size={16} />
          Edit
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-[#081c14] border border-emerald-900/70 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Event
          </DialogTitle>

          <DialogDescription className="text-emerald-200/70">
            Update your event information.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Title */}
          <div className="space-y-2">
            <Label>Event Title</Label>

            <Input
              name="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
              className="h-16 rounded-2xl border-emerald-900 bg-[#102b1e] text-emerald-100 placeholder:text-emerald-300/70"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              name="description"
              placeholder="Describe your event..."
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="min-h-44 resize-y rounded-2xl border-emerald-900 bg-[#102b1e] text-emerald-100 placeholder:text-emerald-300/70"
            />
          </div>

          {/* Event Type & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Event Type */}
            <div className="space-y-2">
              <Label>Event Type</Label>

              <Select
                value={formData.eventType}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    eventType: value ?? "",
                  }))
                }
              >
                <SelectTrigger className="h-16 rounded-2xl border-emerald-900 bg-[#102b1e] text-emerald-200">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>

                <SelectContent className="border-emerald-900 bg-[#102b1e] text-white">
                  <SelectItem value="Awareness">Awareness</SelectItem>
                  <SelectItem value="Cleanup">Cleanup</SelectItem>
                  <SelectItem value="Donation">Donation</SelectItem>
                  <SelectItem value="Fundraising">Fundraising</SelectItem>
                  <SelectItem value="Plantation">Plantation</SelectItem>
                  <SelectItem value="Volunteering">Volunteering</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Event Date */}
            <div className="space-y-2">
              <Label>Event Date</Label>

              <div className="relative">
                <CalendarDays
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200/70 pointer-events-none"
                />

                <Input
                  name="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="h-16 rounded-2xl border-emerald-900 bg-[#102b1e] pl-12 text-emerald-100 [color-scheme:dark]"
                />
              </div>

              <p className="text-sm text-emerald-300/80">
                Event date must be after today.
              </p>
            </div>
          </div>

          {/* Thumbnail Image URL */}
          <div className="space-y-2">
            <Label>Thumbnail Image URL</Label>

            <div className="relative">
              <ImageIcon
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200/70"
              />

              <Input
                name="thumbnailImage"
                type="url"
                value={formData.thumbnailImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="h-16 rounded-2xl border-emerald-900 bg-[#102b1e] pl-12 text-emerald-100 placeholder:text-emerald-300/70"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location</Label>

            <div className="relative">
              <MapPin
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200/70"
              />

              <Input
                name="location"
                placeholder="Enter event location"
                value={formData.location}
                onChange={handleChange}
                className="h-16 rounded-2xl border-emerald-900 bg-[#102b1e] pl-12 text-emerald-100 placeholder:text-emerald-300/70"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-emerald-900/70 pt-5">
            <DialogClose>
              <Button
                type="button"
                variant="outline"
                className="border-emerald-800 bg-transparent text-white hover:bg-emerald-900"
              >
                Cancel
              </Button>
            </DialogClose>

            <DialogClose>
              <Button
                type="button"
                onClick={HandleOnSubmit}
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Save Changes
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventEditFrom;
