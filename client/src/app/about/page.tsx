import { Bug, Droplet, Mail, Sprout, Wheat } from "lucide-react";
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
        <div className="rounded-xl bg-white p-8 shadow-md shadow-brand-shadow">
          <p className="text-sm/5 font-semibold uppercase tracking-widest text-brand-green">
            Our purpose
          </p>
          <h1 className="mt-2 text-2xl/6 font-bold text-brand-text-dark">
            Growing resilient food systems through collaboration
          </h1>
          <p className="mt-4 text-base/5 font-normal text-brand-text">
            The Agronomy Club is a student-led community supporting excellence
            in agronomic sciences. Through study tours, competitions, coaching,
            case study discussions, study groups, learning resources, and
            hands-on practice, the club helps members build practical knowledge
            and professional connections. Originally founded in UWA, we aim to
            grow this community to connect all the green thumbs across the
            world.
          </p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-md shadow-brand-shadow">
          <p className="text-sm/5 font-semibold uppercase tracking-widest text-brand-green">
            Crop Adviser Competencies
          </p>
          <h3 className="mt-2 text-xl/6 font-bold text-brand-text-dark">
            These competencies support four main pillars of agronomic sciences
            through practical learning, field-based activities, and student-led
            collaboration.
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="w-full rounded-xl bg-brand-green p-7 shadow-md shadow-brand-shadow">
              <div className="flex items-center gap-2">
                <Sprout
                  className="h-4 w-4 text-brand-surface"
                  aria-hidden="true"
                />
                <h3 className="text-base/5 font-bold text-brand-surface">
                  Crop Management
                </h3>
              </div>
              <p className="mt-2 text-sm/5 font-normal text-brand-surface">
                Develop practical knowledge of cropping systems, variety
                selection, crop establishment, crop growth, technology use,
                harvest, storage, and production economics.
              </p>
            </div>

            <div className="w-full rounded-xl bg-brand-yellow p-7">
              <div className="flex items-center gap-2">
                <Wheat
                  className="h-4 w-4 text-brand-text-dark"
                  aria-hidden="true"
                />
                <h3 className="text-base/5 font-bold text-brand-text-dark">
                  Nutrient Management
                </h3>
              </div>
              <p className="mt-2 text-sm/5 font-normal text-brand-text-dark">
                Explore plant nutrition, soil fertility, soil testing, nutrient
                sources, placement, timing, diagnostics, and nutrient management
                planning.
              </p>
            </div>

            <div className="w-full rounded-xl bg-brand-text p-7">
              <div className="flex items-center gap-2">
                <Droplet
                  className="h-4 w-4 text-brand-surface"
                  aria-hidden="true"
                />
                <h3 className="text-base/5 font-bold text-brand-surface">
                  Soil and Water Management
                </h3>
              </div>
              <p className="mt-2 text-sm/5 font-normal text-brand-surface">
                Learn how soil health, water use, and irrigation practices shape
                sustainable field management.
              </p>
            </div>

            <div className="w-full rounded-xl bg-brand-brown p-7">
              <div className="flex items-center gap-2">
                <Bug
                  className="h-4 w-4 text-brand-surface"
                  aria-hidden="true"
                />
                <h3 className="text-base/5 font-bold text-brand-surface">
                  Pest Management
                </h3>
              </div>
              <p className="mt-2 text-sm/5 font-normal text-brand-surface">
                Build skills in pest identification, sampling, monitoring,
                decision-making, management strategies, environmental
                stewardship, and health and safety.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-md shadow-brand-shadow">
          <p className="text-sm/5 font-semibold uppercase tracking-widest text-brand-green">
            Current Agronomy Club Committee
          </p>
          <p className="mt-2 text-sm/5 font-semibold text-brand-text-dark">
            Meet the current committee supporting the club, its members, and
            student-led activities.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 rounded-xl bg-white p-8 shadow-md shadow-brand-shadow md:flex-row">
          <div className="max-w-xl">
            <p className="text-sm/5 font-semibold uppercase tracking-widest text-brand-green">
              CONTACT
            </p>
            <h2 className="mt-2 text-xl/6 font-bold text-brand-text-dark">
              Contact the Club
            </h2>
            <p className="mt-2 text-sm/5 font-normal text-brand-brown">
              Interested in the Agronomy Club or looking to connect with the
              committee? Reach out to learn more about activities, chapters,
              resources, and opportunities to get involved.
            </p>
          </div>

          <div className="w-full rounded-xl bg-brand-yellow-light p-5 md:w-96">
            <div className="flex items-center gap-2">
              <Mail
                className="h-4 w-4 text-brand-text-dark"
                aria-hidden="true"
              />
              <h3 className="text-base/5 font-bold text-brand-text-dark">
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
