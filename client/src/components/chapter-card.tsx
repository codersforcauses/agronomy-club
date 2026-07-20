"use client";

import { ArrowRight, ImageIcon, MapPinned } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export type ChapterCardProps = {
  abbreviation: string;
  name: string;
  location: string;
  description: string;
  color: string;
  imageUrl?: string;
  initials?: string;
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
  initials,
  onJoin,
  onView,
}: ChapterCardProps) {
  return (
    <Card className="w-full max-w-[430px] overflow-hidden rounded-xl p-0 shadow-md shadow-brand-shadow">
      <div className="h-3 w-full" style={{ backgroundColor: color }} />

      <CardContent className="flex flex-col p-6">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${name} chapter`}
            width={70}
            height={70}
            className="rounded-md object-cover"
          />
        ) : (
          <div className="-mt-2 flex h-16 w-16 items-center justify-center rounded-xl border-4 border-white bg-brand-green text-sm font-semibold text-white">
            {initials}
          </div>
        )}

        <div className="mt-[10px] space-y-[10px]">
          <CardTitle className="text-xl font-bold leading-tight text-brand-text-dark">
            {abbreviation}
          </CardTitle>

          <p className="text-base font-semibold leading-tight text-brand-text-dark">
            {name}
          </p>
        </div>

        <div className="mt-[10px] flex items-center gap-2 text-brand-green">
          <MapPinned className="h-4 w-4" />
          <span className="text-sm">{location}</span>
        </div>

        <p className="mt-[10px] line-clamp-2 text-sm leading-5 text-brand-text">
          {description}
        </p>

        <div className="mt-6 flex w-full flex-col gap-4 md:flex-row md:gap-5">
          <Button
            className="group relative h-10 w-full bg-brand-green text-white transition-opacity hover:bg-brand-green hover:opacity-80 md:flex-[2]"
            onClick={onJoin}
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-2">
              Join
            </span>

            <ArrowRight className="absolute right-4 h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </Button>

          <Button
            variant="outline"
            className="group relative h-10 w-full border-2 border-brand-green bg-transparent text-brand-green transition-colors hover:bg-brand-green-light hover:text-brand-green md:flex-1"
            onClick={onView}
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-2">
              View
            </span>

            <ArrowRight className="absolute right-4 h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
