import type { Metadata } from "next";

import ChaptersClient from "./page-client";

export const metadata: Metadata = {
  title: "Chapters | Agronomy Club",
  description:
    "Discover Agronomy Club chapters, launch new student groups, and collaborate across regions.",
};

export default function ChaptersPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-1 text-center">
        <p className="font-semibold text-brand-green">OUR COMMUNITY</p>
        <h1 className="text-3xl font-bold tracking-tight text-brand-text-dark sm:text-4xl">
          Chapters &amp; Field Alliances
        </h1>
      </header>

      {/* TEMP TEST BLOCK CARD COMPONENT */}
      <ChaptersClient />
      {/* END TEMP TEST BLOCK */}
    </section>
  );
}
