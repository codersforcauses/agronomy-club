import type { Metadata } from "next";

import { type Alumni, AlumniCard } from "@/components/ui/alumnicard";

export const metadata: Metadata = {
  title: "Alumni Network | Agronomy Club",
  description:
    "Reconnect with Agronomy Club alumni mentors working across the agricultural value chain.",
};

// ── Temporary mock data ──
const MOCK_ALUMNI: Alumni[] = [
  {
    id: "1",
    name: "Jordan Lee",
    degree: "Agricultural science",
    chapter: "UWA",
    email: "jordan.lee@example.com",
    gradYear: 2026,
  },
  {
    id: "2",
    name: "Priya Nair",
    degree: "Agribusiness",
    chapter: "UWA",
    email: "priya.nair@example.com",
    gradYear: 2026,
  },
  {
    id: "3",
    name: "Sam Wu",
    degree: "Plant science",
    chapter: "Perth",
    email: "sam.wu@example.com",
    gradYear: 2026,
    chapterColour: "#7C3AED",
  },
  {
    id: "4",
    name: "Tom Becker",
    degree: "Soil science",
    chapter: "Adelaide",
    email: "tom.becker@example.com",
    gradYear: 2025,
    chapterColour: "#1E3A8A",
  },
  {
    id: "5",
    name: "Mia Chen",
    degree: "Agronomy",
    chapter: "Melbourne",
    email: "mia.chen@example.com",
    gradYear: 2025,
    chapterColour: "#B45309",
  },
  {
    id: "6",
    name: "Leah Park",
    degree: "Horticulture",
    chapter: "UWA",
    email: "leah.park@example.com",
    gradYear: 2024,
  },
];

async function getAlumni(): Promise<Alumni[]> {
  return MOCK_ALUMNI;
  // Real version later:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/alumni/`, { cache: "no-store" });
  // if (!res.ok) return []; return res.json();
}

export default async function AlumniPage() {
  const alumni = await getAlumni();

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
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900">Alumni Network</h1>
      <p className="mt-4 max-w-3xl text-lg text-gray-600">
        The Agronomy Club alumni network bridges current members with
        professionals in agribusiness, research labs, sustainability
        organizations, and government agencies. The directory will launch with
        searchable profiles, mentorship pairings, and speaking opportunities.
      </p>

      <div className="mt-10 rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">On the roadmap</h2>
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          <li>
            • Alumni spotlights featuring career pathways and field insights
          </li>
          <li>• Mentorship matchmaking aligned with member interests</li>
        </ul>
      </div>

      {/* ── Alumni directory ── */}
      <nav
        aria-label="Jump to year"
        className="mb-8 mt-14 flex flex-wrap gap-2"
      >
        {years.map((year) => (
          <a
            key={year}
            href={`#year-${year}`}
            className="rounded-full border border-brand-green px-3 py-1 text-sm text-brand-green transition hover:bg-brand-green-light"
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
    </main>
  );
}
