import { Mail } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export type Alumni = {
  id: string;
  name: string;
  degree: string; // discipline tag
  chapter: string; // chapter tag
  email: string; // contact
  gradYear: number; // used by the page to group into year sections
  chapterColour?: string; // stroke colour for the chapter badge (from the chapter)
};

export function AlumniCard({ alumni }: { alumni: Alumni }) {
  const colour = alumni.chapterColour ?? "#3f7d27";

  // "Jordan Lee" -> "JL"
  const initials = alumni.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <Card className="w-[200px] overflow-hidden pt-0">
      {/* Green avatar area on top */}
      <div className="flex justify-center bg-brand-100 py-6">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="bg-brand-200 text-brand-900">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>

      <CardContent className="p-4">
        {/* Name + contact icon */}
        <div className="flex items-center justify-between">
          <p className="font-semibold text-soil-900">{alumni.name}</p>
          <a
            href={`mailto:${alumni.email}`}
            aria-label={`Email ${alumni.name}`}
            className="text-brand-700 hover:text-brand-900"
          >
            <Mail size={16} />
          </a>
        </div>

        {/* Discipline (static fill) + chapter (outline, recolours per chapter) */}
        <div className="mt-2 flex flex-col items-start gap-1.5">
          <Badge variant="secondary">{alumni.degree}</Badge>
          <Badge
            variant="outline"
            style={{ borderColor: colour, color: colour }}
          >
            {alumni.chapter}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
