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
    <Card className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-[#dcfce7] pt-0 shadow-md">
      <div className="relative h-64 w-full">
        <Image
          src={photo || "/placeholder.jpg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="bg-[#fcfbf7]">
        <CardTitle className="text-[#1d110a]">{name}</CardTitle>
        <CardDescription className="text-[#166534]">{position}</CardDescription>
      </CardHeader>
    </Card>
  );
}
