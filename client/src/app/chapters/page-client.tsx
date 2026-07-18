"use client";

import ChapterCard from "@/components/chapter-card";
import { useChapters } from "@/hooks/useChapters";

export default function ChaptersClient() {
  const { data: chapters = [], isLoading, isError, error } = useChapters();

  if (isLoading) {
    return <p>Loading all Chapters...</p>;
  }

  if (isError) {
    console.log(error);

    return (
      <p>
        Error loading chapters. If refreshing doesn't work, please contact an
        administrator.
      </p>
    );
  }

  return (
    <div className="mt-12 grid flex-row justify-items-center gap-10 sm:grid-cols-2 xl:grid-cols-3">
      {chapters?.length > 0 ? (
        chapters.map((chapter) => {
          if (!chapter.logo) {
            return (
              <ChapterCard
                key={chapter.id}
                abbreviation={chapter.abbrev}
                name={chapter.name}
                location={chapter.location}
                description={chapter.desc}
                color={chapter.colour}
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
              />
            );
          }
        })
      ) : (
        <p>No Chapters available for viewing.</p>
      )}
    </div>
  );
}
