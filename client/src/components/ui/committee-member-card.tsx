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
    <Card
      className="w-[220px] shrink-0 overflow-hidden rounded-xl border-0 pt-0"
      style={{ boxShadow: "0 4px 12px -4px rgba(22, 101, 52, 0.4)" }}
    >
      <div className="relative aspect-square w-full bg-green-100">
        {photo && (
          <Image src={photo} alt={name} fill className="object-cover" />
        )}
      </div>
      <CardHeader className="bg-surface px-3 py-3">
        <CardTitle className="text-soil-900 text-sm font-semibold">
          {name}
        </CardTitle>
        <CardDescription className="text-brand-700 text-xs">
          {position}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
