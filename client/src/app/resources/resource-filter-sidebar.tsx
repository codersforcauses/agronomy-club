"use client";

import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

const resourceTypes = [
  "Lecture Deck",
  "Lab Protocol",
  "Field Data Sheet",
  "Case Study",
  "Video",
  "Video Game",
];

export default function ResourceFilterSidebar() {
  const [sortOrder, setSortOrder] = useState("latest");
  const [selectedType, setSelectedType] = useState("");

  return (
    <aside className="w-full rounded-xl border border-brand-green-light bg-white p-6 shadow-sm lg:w-[250px]">
      <div className="space-y-6">
        {/* Sort By */}
        <div className="space-y-2">
          <label
            htmlFor="sort-order"
            className="block text-lg font-semibold text-brand-text-dark"
          >
            Sort By
          </label>

          <div className="relative">
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="h-10 w-full appearance-none rounded-md border border-brand-green-light bg-white px-3 pr-10 text-sm text-brand-text-dark outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green-light"
            >
              <option value="latest">Latest Upload</option>
              <option value="oldest">Oldest Upload</option>
            </select>

            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-green-dark"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Resource Type */}
        <div className="space-y-2">
          <label
            htmlFor="resource-type"
            className="block text-lg font-semibold text-brand-text-dark"
          >
            Resource Type
          </label>

          <div className="relative">
            <select
              id="resource-type"
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
              className="h-10 w-full appearance-none rounded-md border border-brand-green-light bg-white px-3 pr-10 text-sm text-brand-text-dark outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green-light"
            >
              <option value="">All</option>

              {resourceTypes.map((resourceType) => (
                <option key={resourceType} value={resourceType}>
                  {resourceType}
                </option>
              ))}
            </select>

            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-green-dark"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Selected Filter Tag */}
        {selectedType && (
          <button
            type="button"
            onClick={() => setSelectedType("")}
            className="inline-flex items-center gap-2 rounded-md bg-brand-green-light px-3 py-2 text-sm text-brand-text-dark transition hover:opacity-80"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            {selectedType}
          </button>
        )}
      </div>
    </aside>
  );
}
