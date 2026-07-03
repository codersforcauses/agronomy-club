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
    <Card className="w-[200px] shrink-0 overflow-hidden rounded-xl border border-[#dcfce7] pt-0 shadow-sm">
      <div className="relative aspect-square w-full bg-[#dcfce7]">
        {photo && (
          <Image src={photo} alt={name} fill className="object-cover" />
        )}
      </div>
      <CardHeader className="bg-[#fcfbf7] px-3 py-2">
        <CardTitle className="text-sm font-semibold text-[#1d110a]">
          {name}
        </CardTitle>
        <CardDescription className="text-xs text-[#166534]">
          {position}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
