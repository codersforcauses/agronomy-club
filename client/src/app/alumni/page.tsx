import type { Metadata } from "next";

import AlumniClient from "./alumni-client";

export const metadata: Metadata = {
  title: "Alumni Network | Agronomy Club",
  description: "Reconnect with Agronomy Club Alumni.",
};

export default function AlumniPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-brand-text-dark">
          Alumni Network
        </h1>
        {/* single-sentence description, as the issue asks */}
        <p className="mt-2 text-brand-text">
          Reconnect with graduates of the Agronomy Club community.
        </p>
      </header>

      <AlumniClient />
    </main>
  );
}
