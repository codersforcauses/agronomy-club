import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "@/components/main/providers";
import Navbar from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "Agronomy Club - Agricultural Excellence",
  description: "Home Page",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className={`${inter.variable} font-sans text-soil-800`}>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
