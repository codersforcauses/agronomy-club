import "@/styles/globals.css";

import type { Metadata } from "next";
import { Merriweather, Roboto_Slab } from "next/font/google";

import Providers from "@/components/main/providers";
import Navbar from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "Agronomy Club - Agricultural Excellence",
  description: "Home Page",
};

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
});
const roboto_slab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${merriweather.variable} ${roboto_slab.variable}`}
    >
      <body>
        <main className={`font-content text-brand-text`}>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
