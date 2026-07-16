import type { Metadata } from "next";

import EventCard from "@/components/event-card";

export const metadata: Metadata = {
  title: "Events | Agronomy Club",
  description:
    "Showcase your agronomy expertise in research challenges, pitch contests, and field diagnostics.",
};

export default function EventsPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold">Events</h1>
      <div className="mt-10">
        <div className="rounded-xl border border-brand-green-light bg-brand-surface p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Info</h2>
          <p className="mt-3">Short info on what the events page is.</p>
        </div>
      </div>
      <EventCard
        title="Event Title"
        chapter="Chapter Name"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ante rhoncus, hendrerit dui eget, pulvinar purus. Donec rutrum euismod consequat."
        location="32 Street, Big Suburb, Wisconsisn, UK"
        date={new Date("2026-07-02T16:00:00")}
        chapterColor="#2e7d32"
        eventUrl="#"
      />
    </section>
  );
}
