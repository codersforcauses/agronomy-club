import "@/styles/globals.css";

import type { Metadata } from "next";
import { IBM_Plex_Mono,Merriweather, Roboto_Slab } from "next/font/google";

import Providers from "@/components/main/providers";
import { Footer } from "@/components/ui/footer";
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
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${merriweather.variable} ${roboto_slab.variable} ${plexMono.variable}`}
    >
      <body>
        <main className={`font-content text-brand-text`}>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
