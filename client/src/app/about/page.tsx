import { Bug, Droplet, Mail, Sprout, Wheat } from "lucide-react";
import type { Metadata } from "next";

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
  { name: "Member 5", position: "OCM", photo: "" },
];
export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="shadow-brand-shadow rounded-xl bg-white p-6 shadow-md sm:p-8">
          <p className="text-brand-green text-sm/5 font-semibold uppercase tracking-widest">
            Our purpose
          </p>
          <h1 className="text-brand-text-dark mt-2 text-xl/6 font-bold sm:text-2xl/7">
            Growing resilient food systems through collaboration
          </h1>
          <p className="text-brand-text mt-4 text-base font-normal">
            The Agronomy Club is a student-led community supporting excellence
            in agronomic sciences. Through study tours, competitions, coaching,
            case study discussions, study groups, learning resources, and
            hands-on practice, the club helps members build practical knowledge
            and professional connections. Originally founded in UWA, we aim to
            grow this community to connect all the green thumbs across the
            world.
          </p>
        </div>

        <div className="shadow-brand-shadow rounded-xl bg-white p-6 shadow-md sm:p-8">
          <p className="text-brand-green text-sm/5 font-semibold uppercase tracking-widest">
            Crop Adviser Competencies
          </p>
          <h3 className="text-brand-text-dark mt-2 text-xl/6 font-bold">
            These competencies support four main pillars of agronomic sciences
            through practical learning, field-based activities, and student-led
            collaboration.
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-brand-green shadow-brand-shadow w-full rounded-xl p-7 shadow-md">
              <div className="flex items-center gap-2">
                <Sprout
                  className="text-brand-surface h-4 w-4"
                  aria-hidden="true"
                />
                <h3 className="text-brand-surface text-base/5 font-bold">
                  Crop Management
                </h3>
              </div>
              <p className="text-brand-surface mt-2 text-sm/5 font-normal">
                Develop practical knowledge of cropping systems, variety
                selection, crop establishment, crop growth, technology use,
                harvest, storage, and production economics.
              </p>
            </div>

            <div className="bg-brand-yellow w-full rounded-xl p-7">
              <div className="flex items-center gap-2">
                <Wheat
                  className="text-brand-text-dark h-4 w-4"
                  aria-hidden="true"
                />
                <h3 className="text-brand-text-dark text-base/5 font-bold">
                  Nutrient Management
                </h3>
              </div>
              <p className="text-brand-text-dark mt-2 text-sm/5 font-normal">
                Explore plant nutrition, soil fertility, soil testing, nutrient
                sources, placement, timing, diagnostics, and nutrient management
                planning.
              </p>
            </div>

            <div className="bg-brand-text w-full rounded-xl p-7">
              <div className="flex items-center gap-2">
                <Droplet
                  className="text-brand-surface h-4 w-4"
                  aria-hidden="true"
                />
                <h3 className="text-brand-surface text-base/5 font-bold">
                  Soil and Water Management
                </h3>
              </div>
              <p className="text-brand-surface mt-2 text-sm/5 font-normal">
                Learn how soil health, water use, and irrigation practices shape
                sustainable field management.
              </p>
            </div>

            <div className="bg-brand-brown w-full rounded-xl p-7">
              <div className="flex items-center gap-2">
                <Bug
                  className="text-brand-surface h-4 w-4"
                  aria-hidden="true"
                />
                <h3 className="text-brand-surface text-base/5 font-bold">
                  Pest Management
                </h3>
              </div>
              <p className="text-brand-surface mt-2 text-sm/5 font-normal">
                Build skills in pest identification, sampling, monitoring,
                decision-making, management strategies, environmental
                stewardship, and health and safety.
              </p>
            </div>
          </div>
        </div>

        <div className="shadow-brand-shadow rounded-xl bg-white p-6 shadow-md sm:p-8">
          <p className="text-brand-green text-sm/5 font-semibold uppercase tracking-widest">
            Current Agronomy Club Committee
          </p>
          <p className="text-brand-text-dark mt-2 text-sm/5 font-semibold">
            Meet the current committee supporting the club, its members, and
            student-led activities.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
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

        <div className="shadow-brand-shadow flex flex-col items-center justify-between gap-6 rounded-xl bg-white p-6 shadow-md sm:p-8 md:flex-row">
          <div className="max-w-xl">
            <p className="text-brand-green text-sm/5 font-semibold uppercase tracking-widest">
              CONTACT
            </p>
            <h2 className="text-brand-text-dark mt-2 text-xl/6 font-bold">
              Contact the Club
            </h2>
            <p className="text-brand-brown mt-2 text-sm/5 font-normal">
              Interested in the Agronomy Club or looking to connect with the
              committee? Reach out to learn more about activities, chapters,
              resources, and opportunities to get involved.
            </p>
          </div>

          <div className="bg-brand-yellow-light w-full rounded-xl p-5 md:w-96">
            <div className="flex items-center gap-2">
              <Mail
                className="text-brand-text-dark h-4 w-4"
                aria-hidden="true"
              />
              <h3 className="text-brand-text-dark text-base/5 font-bold">
                Email us:
              </h3>
            </div>
            <p className="mt-2 text-sm/5">
              <a
                href="mailto:agronomy-club@uwa.edu.au"
                className="text-brand-text-dark hover:text-brand-green-dark"
              >
                agronomy-club@uwa.edu.au
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
