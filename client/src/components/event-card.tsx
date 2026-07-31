import { ImageIcon, Link as LinkIcon, MapPinned } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ApiEventList } from "@/hooks/useEvents";

// Temp Task List:
// - try to get the icons to follow font sizes

export default function EventCard({
  id,
  title,
  description,
  location,
  date,
  chapterName,
  chapterColour,
  thumbnail,
  link,
}: ApiEventList) {
  return (
    <Card className="relative h-full w-[364px] overflow-hidden rounded-xl border-0 pt-0 shadow-md shadow-brand-shadow">
      <div className="h-3 w-full" style={{ backgroundColor: chapterColour }} />
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="relative h-56 items-center justify-center">
          {thumbnail ? (
            <Image
              fill={true}
              src={thumbnail}
              alt={`Event thumbnail for ${title}`}
              className="relative w-full rounded-md object-cover"
            />
          ) : (
            <ImageIcon
              strokeWidth={1}
              className="h-56 w-full text-brand-green-light"
            />
          )}
          <div className="absolute bottom-2 left-2 line-clamp-1 rounded-sm bg-brand-surface p-1 font-ui text-xs font-medium uppercase text-brand-green">
            {new Date(date).toLocaleDateString([], {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            {new Date(date).toLocaleTimeString("en-AU", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xl font-bold leading-tight text-brand-text-dark">
            {title}
          </CardTitle>
          <h6>{chapterName}</h6>
          <p className="line-clamp-4 w-full text-brand-text">{description}</p>
        </div>
        <div className="flex w-full flex-col gap-2 align-bottom font-ui text-sm font-medium text-brand-brown">
          <div className="flex flex-row">
            <MapPinned className="flex-initia max-h-[24px] min-w-5" />{" "}
            <p className="pl-2">{location}</p>
          </div>
          {!link?.trim() || (
            <div className="flex flex-row">
              <LinkIcon className="max-h-[24px] flex-initial" />{" "}
              <Link href={`${link}`} className="pl-2 text-brand-brown">
                Event Details
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
