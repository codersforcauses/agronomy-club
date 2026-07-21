"use client";

import { ChevronDown, TargetIcon, X } from "lucide-react";
import { useMemo, useState } from "react";

import { ResourceListItem } from "@/components/resource-list-item";
import {
  resourceType,
  resourceTypes,
  typenameToId,
  useResources,
} from "@/hooks/useResources";

type SortOrder = "latest" | "oldest";

export default function ResourcesClient() {
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [selectedTypes, setSelectedTypes] = useState<resourceType[]>([]);

  const addType = (type: resourceType) => {
    if (!type || selectedTypes.includes(type)) return;

    setSelectedTypes((current) => [...current, type]);
  };

  const removeType = (type: resourceType) => {
    setSelectedTypes((current) => current.filter((item) => item !== type));
  };

  const {
    data: resources = [],
    isLoading,
    isError,
    error,
  } = useResources(selectedTypes.map((type) => typenameToId[type]));

  const visibleResources = useMemo(() => {
    const filteredResources = selectedTypes.length
      ? resources.filter((resource) =>
          resource.type_tags.some((tag) =>
            selectedTypes.includes(tag.name as resourceType),
          ),
        )
      : resources;

    return [...filteredResources].sort((first, second) => {
      const firstDate = new Date(first.upload_date).getTime();
      const secondDate = new Date(second.upload_date).getTime();

      return sortOrder === "latest"
        ? secondDate - firstDate
        : firstDate - secondDate;
    });
  }, [selectedTypes, sortOrder, resources]);

  if (isLoading) {
    return <p>Resources are loading...</p>;
  }

  if (isError) {
    console.log(error);

    return (
      <p>
        Error loading resources. If refreshing doesn't work, please contact an
        administrator.
      </p>
    );
  }

  return (
    <>
      {/* Sidebar */}
      <aside className="w-full border-b border-brand-green-light p-6 lg:w-[250px] lg:border-b-0 lg:border-r">
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
                value=""
                onChange={(event) =>
                  addType(event.target.value as resourceType)
                }
                className="h-10 w-full appearance-none rounded-md border border-brand-green-light bg-white px-3 pr-10 text-sm text-brand-text-dark outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green-light"
              >
                <option value="">Select type</option>

                {resourceTypes.map((resourceType) => (
                  <option
                    key={resourceType}
                    value={resourceType}
                    disabled={selectedTypes.includes(resourceType)}
                  >
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

          {selectedTypes.length > 0 && (
            <div className="flex flex-wrap items-start gap-2 xl:flex-col">
              {selectedTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => removeType(type)}
                  className="inline-flex w-fit items-center gap-2 rounded-md bg-brand-green-light px-3 py-2 text-sm text-brand-text-dark transition hover:opacity-80"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Resource table */}
      <main className="min-w-0 flex-1 p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-brand-text-dark">Resources</h1>

        <div className="mt-4 border-t border-brand-green-light">
          {visibleResources.map((resource) => (
            <ResourceListItem
              key={resource.id}
              ResourceName={resource.name}
              ChapterName={resource.chapter_name}
              link={resource.link}
              UploadDate={new Date(resource.upload_date).toLocaleDateString(
                "en-AU",
              )}
              type={
                resource.type_tags.length > 0
                  ? resource.type_tags[0].lucide_name
                    ? resource.type_tags[0].lucide_name
                    : "grid-3x3"
                  : "grid-3x3"
              }
              chapterColour={resource.chapter_colour}
            />
          ))}

          {visibleResources.length === 0 && (
            <p className="py-6 text-sm text-brand-text">
              No resources match the selected filter.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
