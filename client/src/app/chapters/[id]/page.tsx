import type { Metadata } from "next";

import ChapterClient from "./chapter-client";

export const metadata: Metadata = {
  title: "Chapter | Agronomy Club",
  description:
    "View chapter details, location, and committee members for Agronomy Club.",
};

export default function ChapterPage() {
  return <ChapterClient />;
}
