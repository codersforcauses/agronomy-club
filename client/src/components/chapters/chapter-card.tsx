"use client";

import { ImageIcon, MapPinned } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export type ChapterCardProps = {
  abbreviation: string;
  name: string;
  location: string;
  description: string;
  color: string;
  imageUrl?: string;
  onJoin?: () => void;
  onView?: () => void;
};

export default function ChapterCard({
  abbreviation,
  name,
  location,
  description,
  color,
  imageUrl,
  onJoin,
  onView,
}: ChapterCardProps) {
  return (
    <Card className="w-full max-w-md overflow-hidden rounded-xl p-0 shadow-md">
      {/* Top colour bar */}
      <div className="h-3 w-full" style={{ backgroundColor: color }} />

      <CardContent className="space-y-5 p-6">
        {/* Chapter Image */}
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={`${name} chapter`}
            className="h-16 w-16 rounded-md object-cover"
          />
        ) : (
          <ImageIcon className="h-16 w-16 text-card-foreground" />
        )}

        {/* Chapter Name */}
        <div>
          <CardTitle className="text-2xl font-bold">{abbreviation}</CardTitle>

          <p className="mt-1 text-lg font-semibold text-card-foreground">
            {name}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-green-600">
          <MapPinned className="h-4 w-4" />

          <span className="text-base font-medium">{location}</span>
        </div>

        {/* Description */}
        <p className="text-base text-muted-foreground">{description}</p>

        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <Button
            className="flex-1 bg-green-600 text-white hover:bg-green-700"
            onClick={onJoin}
          >
            Join
          </Button>

          <Button
            variant="outline"
            className="flex-1 border-green-700 bg-transparent text-green-700 hover:bg-green-50 hover:text-green-700"
            onClick={onView}
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
