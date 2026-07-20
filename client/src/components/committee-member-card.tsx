import Image from "next/image";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CommitteeMemberCardProps {
  name: string;
  position: string;
  photo: string;
}

export function CommitteeMemberCard({
  name,
  position,
  photo,
}: CommitteeMemberCardProps) {
  return (
    <Card className="w-[220px] shrink-0 overflow-hidden rounded-xl border-0 pt-0 shadow-md shadow-brand-shadow">
      <div className="relative aspect-square w-full bg-brand-green-light">
        {photo && (
          <Image src={photo} alt={name} fill className="object-cover" />
        )}
      </div>
      <CardHeader className="bg-surface px-4 py-4">
        <CardTitle className="text-sm font-semibold text-brand-text-dark">
          {name}
        </CardTitle>
        <CardDescription className="text-xs text-brand-green">
          {position}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
