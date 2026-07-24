"use client";

import { type Alumni, AlumniCard } from "@/components/alumni-card";
import { type ApiAlumni, useAlumni } from "@/hooks/useAlumni";

export default function AlumniClient() {
  const { data, isPending, isError } = useAlumni();

  // TODO: implement something if pending or error
  const alumni: Alumni[] =
    !isPending && !isError && data
      ? (data as ApiAlumni[]).map((item) => ({
          id: item.id.toString(),
          name: item.full_name,
          degree: item.discipline,
          chapter: item.chapters.abbrev,
          email: item.email,
          gradYear: item.grad_yr,
          chapterColour: item.chapters.colour,
          imageURL: item.photo,
        }))
      : [];

  const byYear: Record<number, Alumni[]> = {};
  for (const person of alumni) {
    if (!byYear[person.gradYear]) byYear[person.gradYear] = [];
    byYear[person.gradYear].push(person);
  }

  // Years newest first
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      {/* ── Jump-to-year nav ── */}
      <nav aria-label="Jump to year" className="mb-8 flex flex-wrap gap-2">
        {years.map((year) => (
          <a
            key={year}
            href={`#year-${year}`}
            className="rounded-md border-2 border-brand-green bg-white px-3 py-1 text-sm text-brand-green transition hover:bg-brand-green-light"
          >
            {year}
          </a>
        ))}
      </nav>

      <div className="space-y-12">
        {years.map((year) => (
          <section key={year} id={`year-${year}`} className="scroll-mt-24">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-brand-text-dark">
                {year}
              </h2>
              <div className="mt-1 h-1 w-11 rounded-full bg-brand-green" />
            </div>

            <div className="flex flex-wrap gap-4">
              {byYear[year].map((person) => (
                <AlumniCard key={person.id} alumni={person} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
