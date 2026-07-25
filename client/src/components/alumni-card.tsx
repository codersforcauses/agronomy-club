import { Mail } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export type Alumni = {
  id: string;
  name: string;
  degree: string;
  chapterAbbrev: string[];
  chapterColour: string[];
  email: string;
  gradYear: number;
  imageURL?: string | null;
};

export function AlumniCard({ alumni }: { alumni: Alumni }) {
  const initials = alumni.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <Card className="w-[220px] overflow-hidden border-0 pt-0 shadow-md shadow-brand-shadow">
      {/* Avatar area */}
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-brand-green-light">
        {alumni.imageURL ? (
          <Image
            src={alumni.imageURL}
            alt={`${alumni.name}'s profile picture`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green font-semibold text-white">
            {initials}
          </div>
        )}
      </div>

      <CardContent className="bg-white p-4">
        {/* Name + mail icon */}
        <div className="flex items-center justify-between">
          <p className="font-semibold text-brand-text-dark">{alumni.name}</p>
          <a
            href={`mailto:${alumni.email}`}
            aria-label={`Email ${alumni.name}`}
            className="text-brand-green hover:text-brand-green-dark"
          >
            <Mail size={20} className="text-brand-green-dark" />
          </a>
        </div>

        {/* Discipline + chapters */}
        <div className="mt-2 flex flex-col items-start gap-1.5">
          <Badge className="bg-brand-green text-white hover:bg-brand-green">
            {alumni.degree}
          </Badge>
          <div className="flex flex-wrap gap-1.5">
            {alumni.chapterAbbrev.slice(0, 3).map((chapter, index) => (
              <Badge
                key={chapter}
                variant="outline"
                className="border-2 text-brand-text-dark"
                style={{
                  borderColor: alumni.chapterColour[index],
                }}
              >
                {chapter}
              </Badge>
            ))}
            {alumni.chapterAbbrev.length > 3 && (
              <Badge
                variant="outline"
                className="border-2 border-brand-green-light text-brand-text-dark"
              >
                +{alumni.chapterAbbrev.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
