import type { Metadata } from "next";
import Link from "next/link";

import { CommitteeMemberCard } from "@/components/committee-member-card";

export const metadata: Metadata = {
  title: "About | Agronomy Club",
  description:
    "Discover the purpose, values, and impact strategy guiding the Agronomy Club.",
};
const committeeMembers = [
  { name: "Member 1", position: "President", photo: "" },
  { name: "Member 2", position: "Vice-President", photo: "" },
  { name: "Member 3", position: "Secretary", photo: "" },
  { name: "Member 4", position: "Treasurer", photo: "" },
];
export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-6 text-gray-700">
        <div>
          <p className="text-sm uppercase tracking-widest text-green-600">
            Our purpose
          </p>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Growing resilient food systems through collaboration
          </h1>
          <p className="mt-4 text-lg leading-relaxed">
            The Agronomy Club empowers students, researchers, and professionals
            to collaborate on solutions that strengthen global food security. We
            blend scientific exploration with community-driven field work to
            accelerate sustainable agricultural impact.
          </p>
        </div>
        <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Our pillars</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              ⚙️ Research Innovation — Translating agronomic science into
              applied solutions.
            </li>
            <li>
              🤝 Community Engagement — Connecting chapters and partners across
              regions.
            </li>
            <li>
              🌱 Sustainability — Championing climate-smart practices and
              regenerative agriculture.
            </li>
            <li>
              🎓 Education — Building leadership and technical skills in the
              agri-food workforce.
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-green-600">
            The Committee
          </p>
          {/*<h2 className = "text-2xl font-bold text-gray-900">The Committee</h2>*/}
          <div className="rounded-xl border border-green-100 bg-white p-4 shadow-sm">
            <h2 className="text-brand-700 px-4 text-lg font-semibold">
              Current Agronomy Club Committee
            </h2>
            <p className="text-soil-900 mt-1 px-4 font-semibold">
              Meet the current committee supporting the club, its members, and
              student-led activities.
            </p>
            <div className="mt-6 flex justify-evenly">
              {committeeMembers.map((member) => (
                <CommitteeMemberCard
                  key={member.name}
                  name={member.name}
                  position={member.position}
                  photo={member.photo}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
