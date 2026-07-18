"use client";

import { ChevronDown, FileText, Gamepad2, X } from "lucide-react";
import { useMemo, useState } from "react";

type SortOrder = "latest" | "oldest";

type Resource = {
  id: number;
  name: string;
  chapter: string;
  type: string;
  uploadDate: string;
  color: string;
};

const resourceTypes = ["Field Guide", "Video Game"];

const resources: Resource[] = [
  {
    id: 1,
    name: "Resource Name",
    chapter: "Chapter Name",
    type: "Video Game",
    uploadDate: "2026-07-02",
    color: "#3F7D27",
  },
  {
    id: 2,
    name: "Field Guide",
    chapter: "University of Queensland",
    type: "Field Guide",
    uploadDate: "2026-07-02",
    color: "#9B2C2C",
  },
];

export default function ResourcesPage() {
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [selectedType, setSelectedType] = useState("");

  const visibleResources = useMemo(() => {
    const filteredResources = selectedType
      ? resources.filter((resource) => resource.type === selectedType)
      : resources;

    return [...filteredResources].sort((first, second) => {
      const firstDate = new Date(first.uploadDate).getTime();
      const secondDate = new Date(second.uploadDate).getTime();

      return sortOrder === "latest"
        ? secondDate - firstDate
        : firstDate - secondDate;
    });
  }, [selectedType, sortOrder]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-xl border border-brand-green-light bg-white shadow-sm">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full border-b border-brand-green-light p-6 lg:w-[230px] lg:border-b-0 lg:border-r">
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="sort-order"
                  className="block text-base font-semibold text-brand-text-dark"
                >
                  Sort By
                </label>

                <div className="relative">
                  <select
                    id="sort-order"
                    value={sortOrder}
                    onChange={(event) =>
                      setSortOrder(event.target.value as SortOrder)
                    }
                    className="h-10 w-full appearance-none rounded-md border border-brand-green-light bg-white px-3 pr-10 text-sm text-brand-text-dark outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green-light"
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

              <div className="space-y-2">
                <label
                  htmlFor="resource-type"
                  className="block text-base font-semibold text-brand-text-dark"
                >
                  Resource Type
                </label>

                <div className="relative">
                  <select
                    id="resource-type"
                    value={selectedType}
                    onChange={(event) => setSelectedType(event.target.value)}
                    className="h-10 w-full appearance-none rounded-md border border-brand-green-light bg-white px-3 pr-10 text-sm text-brand-text-dark outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green-light"
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

          {/* Resource table */}
          <main className="min-w-0 flex-1 p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-brand-text-dark">
              Resources
            </h1>

            <div className="mt-4 border-t border-brand-green-light">
              {visibleResources.map((resource) => (
                <div
                  key={resource.id}
                  className="grid gap-3 border-b border-brand-green-light py-4 sm:grid-cols-[1.4fr_1.3fr_120px] sm:items-center"
                >
                  <div className="flex items-center gap-3 font-semibold text-brand-text-dark">
                    {resource.type === "Video Game" ? (
                      <Gamepad2 className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <FileText className="h-5 w-5" aria-hidden="true" />
                    )}

                    <span>{resource.name}</span>
                  </div>

                  <div className="flex items-center gap-3 text-brand-text">
                    <span
                      className="h-8 w-2"
                      style={{ backgroundColor: resource.color }}
                      aria-hidden="true"
                    />
                    <span>{resource.chapter}</span>
                  </div>

                  <time
                    dateTime={resource.uploadDate}
                    className="text-brand-text"
                  >
                    {new Date(resource.uploadDate).toLocaleDateString("en-AU")}
                  </time>
                </div>
              ))}

              {visibleResources.length === 0 && (
                <p className="py-6 text-sm text-brand-text">
                  No resources match the selected filter.
                </p>
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
