"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import ChapterCard from "@/components/chapter-card";
import { useChapters } from "@/hooks/useChapters";

export default function ChaptersClient() {
  const [page, setPage] = useState(1);

  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    router.push(`/chapters?page=${page}`);
  }, [page]);

  // effectively normalise page param to a valid number
  useEffect(() => {
    const pageAsNum = Number(params.get("page"));
    if (pageAsNum !== null && !isNaN(pageAsNum) && pageAsNum !== 0) {
      setPage(pageAsNum);
    } else {
      // redirect to first page
      setPage(1);
    }
  }, [params.get("page")]);

  const pageSize = 15;

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useChapters(page, pageSize);

  if (isLoading) {
    return <p className="mt-12">Loading all Chapters...</p>;
  }

  if (isError) {
    if (error.status === 404) {
      // redirect to first page
      setPage(1);
      return;
    }
    console.log(error);

    return (
      <p className="mt-12">
        Error loading chapters. If refreshing doesn't work, please contact an
        administrator.
      </p>
    );
  }

  const chapters = response?.results;

  if (!chapters) {
    return (
      <p className="mt-4 px-6">
        Error loading chapters. If refreshing doesn't work, please contact an
        administrator.
      </p>
    );
  }

  const pageCount = Math.ceil(response.count / pageSize);

  const pageButton = (pageNum: number) => (
    <Link
      href={`/chapters?page=${pageNum}`}
      className={`aspect-3/4 rounded-xl border-2 p-5 ${pageNum === page ? "bg-white text-brand-green" : "border-brand-green bg-brand-green text-white"} hover:text-brand-yellow`}
    >
      {pageNum}
    </Link>
  );

  return chapters?.length > 0 ? (
    <>
      <div className="mt-12 grid items-start justify-items-center gap-10 sm:grid-cols-2 xl:grid-cols-3">
        {chapters.map((chapter) => {
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
      <div className="flex justify-center gap-4 pt-16">
        {pageCount === 1 ? (
          <></>
        ) : pageCount === 2 ? (
          <>
            {pageButton(1)}
            {pageButton(2)}
          </>
        ) : pageCount < 4 ? (
          //render all pages if less than 5
          [
            ...Array(pageCount)
              .keys()
              .map((key) => key + 1),
          ].map((pageNum) => <div key={pageNum}>{pageButton(pageNum)}</div>)
        ) : (
          // dynamic page button generation
          // always includes pages 1 and pageCount and removes/adds buttons to only include those adjacent to the current page
          [
            1,
            page - 1 > 1 ? page - 1 : -1,
            page === 1 || page === pageCount ? -1 : page,
            page + 1 < pageCount ? page + 1 : -1,
            pageCount,
          ].map((pageNum) => {
            if (pageNum !== -1) {
              return <div key={pageNum}>{pageButton(pageNum)}</div>;
            }
          })
        )}
      </div>
    </>
  ) : (
    <p className="mt-12">No Chapters available for viewing.</p>
  );
}
