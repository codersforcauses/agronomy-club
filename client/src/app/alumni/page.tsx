import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni Network | Agronomy Club",
  description:
    "Reconnect with Agronomy Club alumni mentors working across the agricultural value chain.",
};

export default function AlumniPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900">Alumni Network</h1>
      <p className="mt-4 text-lg text-gray-600">
        The Agronomy Club alumni network bridges current members with
        professionals in agribusiness, research labs, sustainability
        organizations, and government agencies. The directory will launch with
        searchable profiles, mentorship pairings, and speaking opportunities.
      </p>

      <div className="mt-10 rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">On the roadmap</h2>
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          <li>
            • Alumni spotlights featuring career pathways and field insights
          </li>
          <li>• Mentorship matchmaking aligned with member interests</li>
        </ul>
      </div>
    </section>
  );
}
