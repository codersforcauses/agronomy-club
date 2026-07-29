"use client";

import { AxiosError } from "axios";
import { useRouter,useSearchParams } from "next/navigation";
import { useEffect,useState } from "react";

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
      console.log("param", page);
    } else {
      // redirect to first page
      setPage(1);
    }
  }, [params.get("page")]);

  const pageSize = 1;

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

  return (
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
  );
}
