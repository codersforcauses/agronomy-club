import type { Metadata } from "next";

import EventsClient from "./events-client";

export const metadata: Metadata = {
  title: "Events | Agronomy Club",
  description:
    "Showcase your agronomy expertise in research challenges, pitch contests, and field diagnostics.",
};

export default function EventsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-1 text-center">
        <p className="font-ui font-medium text-brand-green">JOIN THE ACTION</p>
        <h1 className="text-3xl font-bold tracking-tight text-brand-text-dark sm:text-4xl">
          Events
        </h1>
      </header>
      <EventsClient />
    </section>
  );
}
