"use client";

import ChapterCard from "@/components/chapter-card";
import { useChapters } from "@/hooks/useChapters";

export default function ChaptersClient() {
  const { data: chapters = [], isLoading, isError, error } = useChapters();

  if (isLoading) {
    return <p className="mt-12">Loading all Chapters...</p>;
  }

  if (isError) {
    console.log(error);

    return (
      <p className="mt-12">
        Error loading chapters. If refreshing doesn't work, please contact an
        administrator.
      </p>
    );
  }

  return chapters?.length > 0 ? (
    <div className="mt-12 grid items-start justify-items-center gap-10 sm:grid-cols-2 xl:grid-cols-3">
      {chapters.map((chapter) => {
        console.log(chapter.logo);
        if (!chapter.logo) {
          // Initials for the logo placeholder
          const initials = chapter.name
            .split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

          return (
            <ChapterCard
              key={chapter.id}
              abbreviation={chapter.abbrev}
              name={chapter.name}
              location={chapter.location}
              description={chapter.desc}
              color={chapter.colour}
              initials={initials}
              onView={() => (location.href = `/chapters/${chapter.id}`)}
            />
          );
        } else {
          return (
            <ChapterCard
              key={chapter.id}
              abbreviation={chapter.abbrev}
              name={chapter.name}
              location={chapter.location}
              description={chapter.desc}
              color={chapter.colour}
              imageUrl={chapter.logo}
              onView={() => (location.href = `/chapters/${chapter.id}`)}
            />
          );
        }
      })}
    </div>
  ) : (
    <p className="mt-12">No Chapters available for viewing.</p>
  );
}
