import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Agronomy Club",
  description:
    "Discover the purpose, values, and impact strategy guiding the Agronomy Club.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-6 text-gray-700">
        <div className="rounded-xl border border-green-100 bg-white p-8 shadow-sm">
          <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.08em] text-[#15803D]">
            Our purpose
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-[36px] text-[#111827]">
            Growing resilient food systems through collaboration
          </h1>
          <p className="mt-2 text-[15px] font-normal leading-[24px] text-[#374151]">
            The Agronomy Club is a student-led community supporting excellence
            in agronomic sciences. Through study tours, competitions, coaching,
            case study discussions, study groups, learning resources, and
            hands-on practice, the club helps members build practical knowledge
            and professional connections.
          </p>
        </div>

        <div className="rounded-xl border border-green-100 bg-white p-8 shadow-sm">
          <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.08em] text-[#15803D]">
            Crop Adviser Competencies
          </p>
          <h3 className="mt-2 text-[20px] font-bold leading-[30px] text-[#111827]">
            These competencies support four main pillars of agronomic sciences
            through practical learning, field-based activities, and student-led
            collaboration.
          </h3>

          <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="w-full rounded-[20px] border border-[#D7F3DF] bg-white p-7 shadow-[0_8px_24px_rgba(22,101,52,0.05)]">
              <h3 className="text-[16px] font-bold leading-[22px] text-[#15803D]">
                Nutrient Management
              </h3>
              <p className="mt-2 text-[14px] font-normal leading-[20px] text-[#374151]">
                Explore plant nutrition, soil fertility, soil testing, nutrient
                sources, placement, timing, diagnostics, and nutrient management
                planning.
              </p>
            </div>

            <div className="w-full rounded-[20px] border border-[#D7F3DF] bg-white p-7 shadow-[0_8px_24px_rgba(22,101,52,0.05)]">
              <h3 className="text-[16px] font-bold leading-[22px] text-[#15803D]">
                Soil and Water Management
              </h3>
              <p className="mt-2 text-[14px] font-normal leading-[20px] text-[#374151]">
                Learn how soil health, water use, and irrigation practices shape
                sustainable field management
              </p>
            </div>

            <div className="w-full rounded-[20px] border border-[#D7F3DF] bg-white p-7 shadow-[0_8px_24px_rgba(22,101,52,0.05)]">
              <h3 className="text-[16px] font-bold leading-[22px] text-[#15803D]">
                Pest Management
              </h3>
              <p className="mt-2 text-[14px] font-normal leading-[20px] text-[#374151]">
                Build skills in pest identification, sampling, monitoring,
                decision-making, management strategies, environmental
                stewardship, and health and safety.
              </p>
            </div>

            <div className="w-full rounded-[20px] border border-[#D7F3DF] bg-white p-7 shadow-[0_8px_24px_rgba(22,101,52,0.05)]">
              <h3 className="text-[16px] font-bold leading-[22px] text-[#15803D]">
                Crop Management
              </h3>
              <p className="mt-2font-normal text-[14px] leading-[20px] text-[#374151]">
                Develop practical knowledge of cropping systems, variety
                selection, crop establishment, crop growth, technology use,
                harvest, storage, and production economics.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-green-100 bg-white p-8 shadow-sm">
          <p className="text-[14px] font-semibold uppercase leading-[20px] tracking-[0.08em] text-[#15803D]">
            Current Agronomy Club Committees
          </p>
          <p className="mt-2 text-[14px] text-lg leading-[20px]">
            Meet the current committee supporting the club, its members, and
            student-led activities.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 rounded-[20px] border border-[#D7F3DF] bg-white p-8 shadow-[0_8px_24px_rgba(22,101,52,0.05)] md:flex-row">
          <div className="max-w-[560px]">
            <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.08em] text-[#15803D]">
              CONTACT
            </p>
            <h2 className="mt-2 text-[22px] font-bold leading-[36px] text-[#111827]">
              Contact the Club
            </h2>
            <p className="fond-normal mt-2 text-[14px] leading-[18px] text-[#374151]">
              Interested in the Agronomy Club or looking to connect with the
              committee? Reach out to learn more about activities, chapters,
              resources, and opportunities to get involved.
            </p>
          </div>

          <div className="md:w-[360px]shadow-sm w-full rounded-[16px] border border-[#BBF7D0] bg-[#ECFDF5] p-4">
            <p>
              <span className="mt-2 text-[14px] font-bold leading-[18px] text-[#166534]">
                Email:
              </span>{" "}
              agronomyclub@example.com
            </p>
            <p>
              <span className="mt-2 text-[14px] font-bold leading-[18px] text-[#166534]">
                Website:
              </span>{" "}
              agronomyclub.org
            </p>
            <p>
              <span className="mt-2 text-[14px] font-bold leading-[18px] text-[#166534]">
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
