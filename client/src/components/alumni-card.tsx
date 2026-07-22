import { Mail } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export type Alumni = {
  id: string;
  name: string;
  degree: string;
  chapter: string;
  email: string;
  gradYear: number;
  chapterColour?: string;
  imageURL?: string | null;
};

export function AlumniCard({ alumni }: { alumni: Alumni }) {
  const colour = alumni.chapterColour ?? "#3F7D27";

  const initials = alumni.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <Card className="w-[220px] overflow-hidden border-0 pt-0 shadow-md shadow-brand-shadow">
      {/* Avatar area */}
      <div className="relative flex aspect-square w-full items-center justify-center bg-brand-green-light py-6">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={alumni.imageURL ?? undefined}
            alt={`${alumni.name}'s profile picture`}
          />
          <AvatarFallback className="bg-brand-green text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
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

        {/* Discipline + chapter */}
        <div className="mt-2 flex flex-col items-start gap-1.5">
          <Badge className="bg-brand-green text-white hover:bg-brand-green">
            {alumni.degree}
          </Badge>
          <Badge
            variant="outline"
            className="border-2 text-brand-text-dark"
            style={{ borderColor: colour }}
          >
            {alumni.chapter}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
