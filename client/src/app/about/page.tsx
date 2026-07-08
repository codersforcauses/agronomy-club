import { Bug, Droplet, Sprout, Wheat } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Agronomy Club",
  description:
    "Discover the purpose, values, and impact strategy guiding the Agronomy Club.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-6 text-gray-700">
        <div className="rounded-xl border border-brand-green-light bg-white p-8 shadow-sm">
          <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.08em] text-brand-green">
            Our purpose
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-[36px] text-brand-text-dark">
            Growing resilient food systems through collaboration
          </h1>
          <p className="mt-2 text-[15px] font-normal leading-[24px] text-brand-text">
            The Agronomy Club is a student-led community supporting excellence
            in agronomic sciences. Through study tours, competitions, coaching,
            case study discussions, study groups, learning resources, and
            hands-on practice, the club helps members build practical knowledge
            and professional connections.
          </p>
        </div>

        <div className="rounded-xl border border-brand-green-light bg-white p-8 shadow-sm">
          <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.08em] text-brand-green">
            Crop Adviser Competencies
          </p>
          <h3 className="mt-2 text-[20px] font-bold leading-[30px] text-brand-text-dark">
            These competencies support four main pillars of agronomic sciences
            through practical learning, field-based activities, and student-led
            collaboration.
          </h3>

          <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="w-full rounded-[20px] border border-brand-green bg-brand-green p-7 shadow-[0_8px_24px_rgba(22,101,52,0.05)]">
              <div className="flex items-center gap-2">
                <Sprout
                  className="h-4 w-4 text-brand-surface"
                  aria-hidden="true"
                />
                <h3 className="text-[16px] font-bold leading-[22px] text-brand-surface">
                  Crop Management
                </h3>
              </div>
              <p className="mt-2 text-[14px] font-normal leading-[20px] text-brand-surface">
                Develop practical knowledge of cropping systems, variety
                selection, crop establishment, crop growth, technology use,
                harvest, storage, and production economics.
              </p>
            </div>

            <div className="w-full rounded-[20px] border border-brand-yellow bg-brand-yellow p-7 shadow-[0_8px_24px_rgba(22,101,52,0.05)]">
              <div className="flex items-center gap-2">
                <Wheat
                  className="h-4 w-4 text-brand-text-dark"
                  aria-hidden="true"
                />
                <h3 className="text-[16px] font-bold leading-[22px] text-brand-text-dark">
                  Nutrient Management
                </h3>
              </div>
              <p className="mt-2 text-[14px] font-normal leading-[20px] text-brand-text-dark">
                Explore plant nutrition, soil fertility, soil testing, nutrient
                sources, placement, timing, diagnostics, and nutrient management
                planning.
              </p>
            </div>

            <div className="w-full rounded-[20px] border border-brand-text bg-brand-text p-7 shadow-[0_8px_24px_rgba(22,101,52,0.05)]">
              <div className="flex items-center gap-2">
                <Droplet
                  className="h-4 w-4 text-brand-surface"
                  aria-hidden="true"
                />
                <h3 className="text-[16px] font-bold leading-[22px] text-brand-surface">
                  Soil and Water Management
                </h3>
              </div>
              <p className="mt-2 text-[14px] font-normal leading-[20px] text-brand-surface">
                Learn how soil health, water use, and irrigation practices shape
                sustainable field management
              </p>
            </div>

            <div className="w-full rounded-[20px] border border-brand-brown bg-brand-brown p-7 shadow-[0_8px_24px_rgba(22,101,52,0.05)]">
              <div className="flex items-center gap-2">
                <Bug
                  className="h-4 w-4 text-brand-surface"
                  aria-hidden="true"
                />
                <h3 className="text-[16px] font-bold leading-[22px] text-brand-surface">
                  Pest Management
                </h3>
              </div>
              <p className="mt-2 text-[14px] font-normal leading-[20px] text-brand-surface">
                Build skills in pest identification, sampling, monitoring,
                decision-making, management strategies, environmental
                stewardship, and health and safety.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-brand-green-light bg-white p-8 shadow-sm">
          <p className="text-[14px] font-semibold uppercase leading-[20px] tracking-[0.08em] text-brand-green">
            Current Agronomy Club Committee
          </p>
          <p className="mt-2 text-[14px] font-semibold leading-[20px] text-brand-text-dark">
            Meet the current committee supporting the club, its members, and
            student-led activities.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 rounded-[20px] border border-brand-green-light bg-white p-8 shadow-[0_8px_24px_rgba(22,101,52,0.05)] md:flex-row">
          <div className="max-w-[560px]">
            <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.08em] text-brand-green">
              CONTACT
            </p>
            <h2 className="mt-2 text-[22px] font-bold leading-[36px] text-brand-text-dark">
              Contact the Club
            </h2>
            <p className="mt-2 text-[14px] font-normal leading-[18px] text-brand-brown">
              Interested in the Agronomy Club or looking to connect with the
              committee? Reach out to learn more about activities, chapters,
              resources, and opportunities to get involved.
            </p>
          </div>

          <div className="w-full rounded-[16px] border border-brand-yellow-light bg-brand-yellow-light p-4 shadow-sm md:w-[360px]">
            <p>
              <span className="mt-2 text-[14px] font-bold leading-[18px] text-brand-text-dark">
                Email:
              </span>{" "}
              agronomyclub@example.com
            </p>
            <p>
              <span className="mt-2 text-[14px] font-bold leading-[18px] text-brand-text-dark">
                Website:
              </span>{" "}
              agronomyclub.org
            </p>
            <p>
              <span className="mt-2 text-[14px] font-bold leading-[18px] text-brand-text-dark">
                Socials:
              </span>{" "}
              Instagram / LinkedIn coming soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
