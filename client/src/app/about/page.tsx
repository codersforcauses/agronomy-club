import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Agronomy Club",
  description:
    "Discover the purpose, values, and impact strategy guiding the Agronomy Club.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-brand-green-dark">
            Our purpose
          </p>
          <h1 className="mt-2 text-4xl font-bold">
            Growing resilient food systems through collaboration
          </h1>
          <p className="mt-4 text-lg leading-relaxed">
            The Agronomy Club empowers students, researchers, and professionals
            to collaborate on solutions that strengthen global food security. We
            blend scientific exploration with community-driven field work to
            accelerate sustainable agricultural impact.
          </p>
        </div>
        <div className="rounded-xl border border-brand-green-light bg-brand-surface p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Our Pillars</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              ⚙️ Research &amp; Innovation — Translating agronomic science into
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
      </div>
    </section>
  );
}
