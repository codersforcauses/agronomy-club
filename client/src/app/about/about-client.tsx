import { CommitteeMemberCard } from "@/components/committee-member-card";
import { ApiChapter,ApiCommitteeMember, useChapter } from "@/hooks/useChapter";

"use client";

const AGRONOMY_CHAPTER_ID = 1;

// Shorthand dictionary mapping
const roleDictionary: Record<string, string> = {
  pres: "President",
  vpres: "Vice President",
  sec: "Secretary",
  treas: "Treasurer",
  mark: "Marketing Officer",
  ocm: "Ordinary Committee Member",
};

export default function AboutClient() {
  const {
    data: chapter,
    isLoading,
    isError,
    error,
  } = useChapter(AGRONOMY_CHAPTER_ID);

  if (isLoading) {
    return <p>"Loading committee members..."</p>;
  }

  if (isError || !chapter) {
    console.log(error);

    return (
      <p>
        "Error loading committee members. If refreshing does not fix this issue,
        contact an administrator."
      </p>
    );
  }

  const committeeMembers = chapter.committee;

  return (
    <div className="mt-6 flex justify-evenly">
      {committeeMembers.map((member) => {
        const fullPosition = roleDictionary[member.position];

        return (
          <CommitteeMemberCard
            key={member.id}
            name={member.full_name}
            position={fullPosition}
            photo=""
          />
        );
      })}
    </div>
  );
}
