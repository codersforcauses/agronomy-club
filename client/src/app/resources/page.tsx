import type { Metadata } from "next";
import Link from "next/link";

import { ResourceListItem } from "@/components/ui/ResourceListItem";

export const metadata: Metadata = {
  title: "Study Materials | Agronomy Club",
  description:
    "Access agronomy study guides, toolkits, and multimedia resources curated by experts.",
};

const resources = [
  {
    ResourceName: "Field Guide",
    ChapterName: "University of Queensland",
    UploadDate: "2/7/2026",
    type: "Article" as const,
    chapterColour: "#166534",
  },
  {
    ResourceName: "Soil Management Simulator",
    ChapterName: "University of Western Australia",
    UploadDate: "1/7/2026",
    type: "Video Game" as const,
    chapterColour: "#7b2d2d",
  },
  {
    ResourceName: "Crop Rotation Toolkit",
    ChapterName: "University of Melbourne",
    UploadDate: "28/6/2026",
    type: "Website" as const,
    chapterColour: "#8b5a3c",
  },
];

export default function ResourcesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <p className="text-sm uppercase tracking-widest text-green-600">
              Resource library
            </p>
            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Study Materials
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              We are curating a searchable knowledge base featuring lecture
              decks, lab protocols, field data sheets, and case studies
              contributed by Agronomy Club chapters and partners.
            </p>
          </div>

          <div className="space-y-4 text-sm text-gray-700">
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
        <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Contribute materials
          </h2>
          <p className="mt-3 text-sm text-gray-700">
            Chapters and partners can upload resources once authentication
            launches. We'll review submissions for accuracy, accessibility, and
            licensing.
          </p>
          <Link
            href="/account"
            className="mt-4 inline-flex items-center text-sm font-semibold text-green-700 hover:text-green-800"
          >
            Join the contributor waitlist →
          </Link>
        </div>
      </div>

      <div className="mt-12 flex gap-8">
        \
        <div className="w-48 shrink-0 space-y-6">
          <div>
            <p className="font-semibold text-soil-900">Sort By</p>
            <select className="border-brand-green-light text-brand-text-dark mt-2 w-full rounded-md border px-3 py-2 text-sm">
              <option>Latest Upload</option>
              <option>Oldest Upload</option>
            </select>
          </div>
          <div>
            <p className="font-semibold text-soil-900">Resource Type</p>
            <select className="border-brand-green-light text-brand-text-dark mt-2 w-full rounded-md border px-3 py-2 text-sm">
              <option>All</option>
              <option>Article</option>
              <option>Video Game</option>
              <option>Website</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        \
        <div className="flex-1">
          {/* Header row */}
          <div className="border-brand-green-light text-brand-text-dark flex items-center justify-between border-b pb-3 text-sm">
            <div className="flex w-1/3 items-center gap-3">
              <span>🎮</span>
              <span>Resource Name</span>
            </div>
            <div className="flex w-1/3 items-center gap-2">
              <div className="h-5 w-1 rounded-sm bg-brand-600" />
              <span>Chapter Name</span>
            </div>
            <span className="w-1/3 text-right">Upload Date</span>
          </div>

          {resources.map((resource) => (
            <ResourceListItem
              key={resource.ResourceName}
              ResourceName={resource.ResourceName}
              ChapterName={resource.ChapterName}
              UploadDate={resource.UploadDate}
              type={resource.type}
              chapterColour={resource.chapterColour}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
