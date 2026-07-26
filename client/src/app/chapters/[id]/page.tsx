import type { Metadata } from "next";
import Link from "next/link";

import ChapterClient from "./chapter-client";

export const metadata: Metadata = {
  title: "Chapter | Agronomy Club",
  description:
    "View chapter details, location, and committee members for Agronomy Club.",
};

export default function ChapterPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/chapters"
        className="mb-6 inline-flex items-center gap-1 text-sm text-brand-green hover:text-brand-green-dark"
      >
        &larr; All chapters
      </Link>
      <ChapterClient />
    </main>
  );
}
