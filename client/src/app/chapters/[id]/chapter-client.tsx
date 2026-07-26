"use client";

import { Mail, MapPin } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import type { ReactNode } from "react";

import { CommitteeMemberCard } from "@/components/committee-member-card";
import { Button } from "@/components/ui/button";
import { type ApiCommitteeMember, useChapter } from "@/hooks/useChapter";

const POSITION_LABELS: Record<ApiCommitteeMember["position"], string> = {
  pres: "President",
  vpres: "Vice-President",
  sec: "Secretary",
  treas: "Treasurer",
  mark: "Marketing Officer",
  ocm: "Ordinary Committee Member",
};

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

export default function ChapterClient() {
  const { id } = useParams();
  const { data: chapter, isPending, error } = useChapter(id, "exec");

  if (isPending) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <p>Loading chapter...</p>
      </main>
    );
  }

  if (error?.response?.status === 404) {
    notFound();
  }

  if (error || !chapter) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <p>Error loading chapter. Please try again later.</p>
      </main>
    );
  }

  const initials = chapter.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[330px_1fr]">
      <div className="flex flex-col gap-4">
        <div className="overflow-hidden rounded-2xl border shadow-md shadow-brand-shadow">
          <div
            className="h-16 w-full"
            style={{ backgroundColor: chapter.colour }}
          />

          <div className="flex min-w-0 flex-col items-center bg-brand-surface px-6 pb-6 text-center">
            {chapter.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={chapter.logo}
                alt={`${chapter.name} logo`}
                className="-mt-10 h-16 w-16 rounded-xl border-4 border-white object-cover"
              />
            ) : (
              <div className="-mt-10 flex h-16 w-16 items-center justify-center rounded-xl border-4 border-white bg-brand-green text-sm font-semibold text-white">
                {initials}
              </div>
            )}

            <p className="mt-3 text-xl font-bold text-brand-text-dark">
              {chapter.abbrev}
            </p>
            <p className="mt-1 font-semibold text-brand-text-dark">
              {chapter.name}
            </p>
            <p className="mt-3 flex items-start gap-1.5 text-sm text-brand-text">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              {chapter.location}
            </p>
            <a
              href={`mailto:${chapter.email}`}
              className="mt-1 flex min-w-0 items-start gap-1.5 text-sm text-brand-green hover:text-brand-green-dark"
            >
              <Mail size={16} className="mt-0.5 shrink-0" />
              <span className="break-all">{chapter.email}</span>
            </a>
          </div>
        </div>

        <Button disabled className="w-full">
          Join this chapter
        </Button>
      </div>

      <div className="space-y-10">
        <section>
          <SectionHeading colour={chapter.colour}>About</SectionHeading>
          <p className="leading-relaxed text-brand-text">{chapter.desc}</p>
        </section>

        <section>
          <SectionHeading colour={chapter.colour}>Committee</SectionHeading>
          <div className="flex flex-wrap gap-4">
            {chapter.committee.map((member) => (
              <CommitteeMemberCard
                key={member.id}
                name={member.full_name}
                position={POSITION_LABELS[member.position]}
                photo=""
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
