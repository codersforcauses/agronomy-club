import { ResourceListItem } from "@/components/resource-list-item";

import ResourcesClient from "./resources-client";

export default function ResourcesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-xl bg-white shadow-md shadow-brand-shadow">
        <div className="flex flex-col lg:flex-row">
          <ResourcesClient />
        </div>
      </div>
    </section>
  );
}
