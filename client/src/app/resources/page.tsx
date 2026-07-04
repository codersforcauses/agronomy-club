import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study Materials | Agronomy Club",
  description:
    "Access agronomy study guides, toolkits, and multimedia resources curated by experts.",
};

export default function ResourcesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <p className="text-sm uppercase tracking-widest text-brand-green-dark">
              Resource library
            </p>
            <h1 className="mt-2 text-4xl font-bold">Study Materials</h1>
            <p className="mt-4 text-lg text-brand-text">
              We are curating a searchable knowledge base featuring lecture
              decks, lab protocols, field data sheets, and case studies
              contributed by Agronomy Club chapters and partners.
            </p>
          </div>

          <div className="space-y-4 text-sm text-brand-text">
            <p>Coming soon:</p>
            <ul className="space-y-2">
              <li>• Climate-smart cropping guides organized by region</li>
              <li>
                • Soil testing templates and nutrient management calculators
              </li>
              <li>
                • Data visualization dashboards for precision agriculture
                projects
              </li>
              <li>• Recorded webinars and alumni career spotlights</li>
            </ul>
          </div>
        </div>
        <div className="rounded-xl border border-brand-green-light bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Contribute materials</h2>
          <p className="mt-3 text-sm text-brand-text">
            Chapters and partners can upload resources once authentication
            launches. We&apos;ll review submissions for accuracy, accessibility,
            and licensing.
          </p>
          <Link
            href="/account"
            className="mt-4 inline-flex items-center text-sm font-semibold text-brand-green-dark hover:text-brand-yellow"
          >
            Join the contributor waitlist →
          </Link>
        </div>
      </div>
    </section>
  );
}
