"use client";

import EventCard from "@/components/event-card";
import { useEvents } from "@/hooks/useEvents";

export default function EventsClient() {
  const { data: events = [], isLoading, isError, error } = useEvents();

  if (isLoading) {
    return <p>Loading all Events...</p>;
  }

  if (isError) {
    console.log(error);
    return (
      <p>
        Error loading events. If refreshing doesn't work, please contact an
        administrator.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap">
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
        <p>No Events currently listed.</p>
      )}
    </div>
  );
}
