import type { Metadata } from "next";
import Link from "next/link";

import ResourceFilterSidebar from "@/app/resources/resource-filter-sidebar";

export const metadata: Metadata = {
  title: "Study Materials | Agronomy Club",
  description:
    "Access agronomy study guides, toolkits, and multimedia resources curated by experts.",
};

export default function ResourcesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div>
        <h1 className="mt-2 text-4xl font-bold text-brand-text-dark">
          Resources
        </h1>
      </div>

      <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start">
        <ResourceFilterSidebar />
      </div>
    </section>
  );
}
