import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Agronomy Club",
  description:
    "Showcase your agronomy expertise in research challenges, pitch contests, and field diagnostics.",
};

export default function EventsPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900">Events</h1>
      <div className="mt-10">
        <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Info</h2>
          <p className="mt-3">Short info on what the events page is.</p>
        </div>
      </div>
      <p className="mt-4 text-lg text-gray-600">
        Events calender here, possibly with info modals upon selecting a
        specific events
      </p>
    </section>
  );
}
