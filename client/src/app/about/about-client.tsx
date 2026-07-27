"use client";

import { CommitteeMemberCard } from "@/components/committee-member-card";
import { ApiChapter, ApiCommitteeMember, useChapter } from "@/hooks/useChapter";

// **This is hardcoded, will need to be changed if the ID of the national/base chapter has its ID change**
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
  } = useChapter(AGRONOMY_CHAPTER_ID, "all");

  if (isLoading) {
    return <p className="mt-3">Loading committee members...</p>;
  }

  if (isError || !chapter) {
    console.log(error);

    return (
      <p className="mt-3">
        Error loading committee members. If refreshing does not fix this issue,
        contact an administrator.
      </p>
    );
  }

  const comm = ["pres", "vpres", "sec", "treas", "mark", "ocm"];

  let curComm: number[] = [-1, -1, -1, -1, -1, -1];

  //check for all committee cases
  for (const [index, member] of chapter.committee.entries()) {
    for (let i = 0; i < 6; i++) {
      if (comm[i] === member.position) {
        if (curComm[i] !== -1) {
          curComm.splice(i, 0, index);
        } else {
          curComm[i] = index;
        }
      }
    }
  }
  //remove empty slots, but is still sorted in expected order
  curComm = curComm.filter((entry) => entry !== -1);

  const committee: ApiCommitteeMember[] = curComm.map(
    (member) => chapter.committee[member],
  );

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-4">
      {committee.length ? (
        committee.map((member) => {
          const fullPosition = roleDictionary[member.position];
          return (
            <CommitteeMemberCard
              key={member.id}
              name={member.full_name}
              position={fullPosition}
              photo={member.photo}
            />
          );
        })
      ) : (
        <p className="mt-3">
          No current committee members. Will be elected soon!
        </p>
      )}
    </div>
  );
}
