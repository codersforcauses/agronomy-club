import { Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { CommitteeMemberCard } from "@/components/committee-member-card";
import { Button } from "@/components/ui/button";

type CommitteeMember = { name: string; position: string; photo: string };
type Chapter = {
  id: string;
  name: string;
  description: string;
  bannerColour: string;
  location: string;
  contactEmail: string;
  committee: CommitteeMember[];
};

// ── Temporary mock data ──
const MOCK_CHAPTERS: Record<string, Chapter> = {
  "1": {
    id: "1",
    name: "UWA Agronomy Club",
    description:
      "A student-led group helping students feel prepared for the agricultural industry through learning resources, events, and opportunities to connect with peers and alumni across the agronomy community. This paragraph is intentionally a little long so you can check how the text wraps and how the section stretches at different widths.",
    bannerColour: "#3F7D27",
    location: "Perth, Western Australia",
    contactEmail: "hello@agronomyclub.org",
    committee: [
      { name: "Ben Jerry", position: "President", photo: "" },
      { name: "Lily Chen", position: "Vice-President", photo: "" },
      { name: "David Smith", position: "Tech Lead", photo: "" },
    ],
  },
};

async function getChapter(id: string): Promise<Chapter | null> {
  return MOCK_CHAPTERS[id] ?? null;
  // Real version later:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chapters/${id}/`, { cache: "no-store" });
  // if (!res.ok) return null; return res.json();
}

function SectionHeading({
  children,
  colour,
}: {
  children: ReactNode;
  colour: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-brand-text-dark">{children}</h2>
      <div
        className="mt-1 h-1 w-20 rounded-full"
        style={{ backgroundColor: colour }}
      />
    </div>
  );
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chapter = await getChapter(id);
  if (!chapter) notFound();

  // Initials for the logo placeholder
  const initials = chapter.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/chapters"
        className="mb-6 inline-flex items-center gap-1 text-sm text-brand-green hover:text-brand-green-dark"
      >
        &larr; All chapters
      </Link>

      {/* Responsive */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        {/* identity card + reserved join button */}
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border">
            {/* coloured banner strip */}
            <div
              className="h-16 w-full"
              style={{ backgroundColor: chapter.bannerColour }}
            />

            <div className="flex flex-col items-center bg-brand-surface px-6 pb-6 text-center">
              <div className="-mt-10 flex h-16 w-16 items-center justify-center rounded-xl border-4 border-white bg-brand-green text-sm font-semibold text-white">
                {initials}
              </div>

              <p className="mt-3 font-semibold text-brand-text-dark">
                {chapter.name}
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-brand-text">
                <MapPin size={14} /> {chapter.location}
              </p>
              <a
                href={`mailto:${chapter.contactEmail}`}
                className="mt-1 flex items-center gap-1.5 text-sm text-brand-green hover:text-brand-green-dark"
              >
                <Mail size={14} /> {chapter.contactEmail}
              </a>
            </div>
          </div>

          {/* Reserved for the join button */}
          <Button disabled className="w-full">
            Join this chapter
          </Button>
        </div>

        {/* about + committee */}
        <div className="space-y-10">
          <section>
            <SectionHeading colour={chapter.bannerColour}>About</SectionHeading>
            <p className="leading-relaxed text-brand-text">
              {chapter.description}
            </p>
          </section>

          <section>
            <SectionHeading colour={chapter.bannerColour}>
              Committee
            </SectionHeading>
            {/* committee-member-card component */}
            <div className="flex flex-wrap gap-4">
              {chapter.committee.map((member) => (
                <CommitteeMemberCard
                  key={member.name}
                  name={member.name}
                  position={member.position}
                  photo={member.photo}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
