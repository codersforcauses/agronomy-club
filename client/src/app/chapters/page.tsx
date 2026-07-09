import type { Metadata } from "next";

import ChapterCard from "@/components/chapters/chapter-card";

export const metadata: Metadata = {
  title: "Chapters | Agronomy Club",
  description:
    "Discover Agronomy Club chapters, launch new student groups, and collaborate across regions.",
};

export default function ChaptersPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="font-bold text-brand-green">OUR COMMUNITY</h1>

        <h2 className="text-3xl font-bold tracking-tight text-brand-text-dark sm:text-4xl">
          Chapters &amp; Field Alliances
        </h2>
      </header>

      {/* TEMP TEST BLOCK CARD COMPONENT */}
      <div className="mt-12 grid justify-items-center gap-10 sm:grid-cols-2 xl:grid-cols-3">
        <ChapterCard
          abbreviation="Chapter Abbreviation"
          name="Midwest Tennessee Chapter"
          location="Midwest, Tennessee, USA"
          description="A one-line description of this chapter."
          color="#2e7d32"
        />

        <ChapterCard
          abbreviation="Chapter Abbreviation"
          name="Midwest Tennessee Chapter"
          location="Midwest, Tennessee, USA"
          description="A one-line description of this chapter."
          color="#2e7d32"
        />

        <ChapterCard
          abbreviation="Chapter Abbreviation"
          name="Midwest Tennessee Chapter"
          location="Midwest, Tennessee, USA"
          description="A one-line description of this chapter."
          color="#2e7d32"
        />

        <ChapterCard
          abbreviation="Chapter Abbreviation"
          name="Midwest Tennessee Chapter"
          location="Midwest, Tennessee, USA"
          description="A one-line description of this chapter."
          color="#2e7d32"
        />

        <ChapterCard
          abbreviation="Chapter Abbreviation"
          name="Midwest Tennessee Chapter"
          location="Midwest, Tennessee, USA"
          description="A one-line description of this chapter."
          color="#2e7d32"
        />

        <ChapterCard
          abbreviation="Chapter Abbreviation"
          name="Midwest Tennessee Chapter"
          location="Midwest, Tennessee, USA"
          description="A one-line description of this chapter."
          color="#2e7d32"
        />
      </div>
      {/* END TEMP TEST BLOCK */}
    </section>
  );
}
