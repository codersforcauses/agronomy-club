"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import EventCard from "@/components/event-card";
import { useEvents } from "@/hooks/useEvents";

export default function EventsClient() {
  const [page, setPage] = useState(1);

  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    router.push(`/events?page=${page}`);
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

  const pageSize = 20;

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useEvents(page, pageSize);

  if (isLoading) {
    return <p className="mt-4 px-6">Loading all Events...</p>;
  }

  if (isError) {
    if (error.status === 404) {
      // redirect to first page
      setPage(1);
      return;
    }
    console.log(error);
    return (
      <p className="mt-4 px-6">
        Error loading events. If refreshing doesn't work, please contact an
        administrator.
      </p>
    );
  }

  const events = response?.results;

  if (!events) {
    return (
      <p className="mt-4 px-6">
        Error loading events. If refreshing doesn't work, please contact an
        administrator.
      </p>
    );
  }

  const pageCount = Math.ceil(response.count / pageSize);

  const pageButton = (pageNum: number) => (
    <Link href={`/events?page=${pageNum}`}>
      <button
        className={`aspect-3/4 rounded-xl border-2 p-5 ${pageNum === page ? "bg-white text-brand-green" : "bg-brand-green text-white"} `}
      >
        {pageNum}
      </button>
    </Link>
  );
  return (
    <>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {events.length ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              chapterName={event.chapterName}
              description={event.description}
              thumbnail={event.thumbnail}
              location={event.location}
              date={event.date}
              chapterColour={event.chapterColour}
              link={event.link}
            />
          ))
        ) : (
          <p className="mt-4 px-6">No Events currently listed.</p>
        )}
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
  );
}
