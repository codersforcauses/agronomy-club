import { Mail, MapPinned } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chapters | Agronomy Club",
  description:
    "Discover Agronomy Club chapters, launch new student groups, and collaborate across regions.",
};

export default function ChaptersPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="text-center">
        <p className="text-sm uppercase tracking-widest text-brand-green">
          Global network
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Chapters &amp; Field Alliances
        </h1>

        <p className="mt-4 text-lg text-brand-text">
          Chapters empower local leaders to adapt agronomic solutions to their
          region's climate, crops, and community needs. This directory will grow
          as new universities and partner farms come online.
        </p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
          {
            name: "UWA Agronomy Club",
            region: "Perth, Australia",
            focus:
              "Dryland farming systems, regenerative agriculture, and student-led field trials.",
            email: "wa@agronomyclub.org",
          },
          {
            name: "Midwest Research Collective",
            region: "Iowa, United States",
            focus:
              "Crop rotation studies, soil health education, and agritech collaboration.",
            email: "midwest@agronomyclub.org",
          },
          {
            name: "Nordic Sustainability Group",
            region: "Copenhagen, Denmark",
            focus:
              "Climate-resilient growing systems and sustainable food production research.",
            email: "nordic@agronomyclub.org",
          },
        ].map((chapter) => (
          <article
            key={chapter.name}
            className="flex h-full flex-col justify-between rounded-2xl border border-brand-green-light bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-card"
          >
            <div>
              <h2 className="text-xl font-semibold">{chapter.name}</h2>

              <div className="mt-3 flex items-center gap-2 text-sm text-brand-green-dark">
                <MapPinned className="h-4 w-4" aria-hidden="true" />
                <span>{chapter.region}</span>
              </div>

              <p className="mt-3 text-sm leading-6 text-brand-text">
                {chapter.focus}
              </p>
            </div>

            <div className="mt-6">
              <Link
                href={`mailto:${chapter.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-green-light px-3 py-2 font-ui text-sm font-semibold text-brand-green-dark transition hover:bg-brand-green-light"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact chapter
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-dashed border-brand-green bg-brand-green-light p-8 text-sm text-brand-green-dark">
        <h2 className="text-lg font-semibold">Start a new chapter</h2>

        <p className="mt-2">
          We provide starter resources, collaboration frameworks, and mentorship
          opportunities for students and agricultural communities interested in
          launching a local chapter.
        </p>

        <Link
          href="/account"
          className="mt-4 inline-flex items-center font-semibold text-brand-green-dark hover:text-brand-green"
        >
          Apply for chapter starter kit →
        </Link>
      </div>

      <aside className="mt-12 rounded-2xl bg-white/80 p-6 text-sm text-brand-text shadow-sm">
        <p className="font-semibold text-brand-text-dark">
          Looking to collaborate?
        </p>

        <p className="mt-2">
          Universities, nonprofits, growers, and agricultural organizations are
          encouraged to collaborate with local chapters through research
          projects, educational programs, and regional initiatives.
        </p>
      </aside>
    </section>
  );
}
