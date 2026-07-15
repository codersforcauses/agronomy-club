import { ImageIcon } from "lucide-react";
import Image from "next/image";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

export type EventCardProps = {
  title: string;
  description: string;
  location: string;
  date: Date;
  chapter: string;
  chapterColor: string;
  thumbnailUrl?: string;
};

export default function EventCard({
  title,
  description,
  location,
  date,
  chapter,
  chapterColor,
  thumbnailUrl,
}: EventCardProps) {
  return (
    <Card>
      <div className="h-3 w-full" style={{ backgroundColor: chapterColor }} />
      <CardContent>
        // TODO: figure out layering of date blocks on top
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={`${name} event thumbnail TBD`}
            width={70}
            height={70}
            className="rounded-md object-cover"
          />
        ) : (
          <ImageIcon className="" />
        )}
        <CardTitle className="">{title}</CardTitle>
        <p>{chapter}</p>
        <p>{description}</p>
        <p>{location}</p>
      </CardContent>
    </Card>
  );
}
