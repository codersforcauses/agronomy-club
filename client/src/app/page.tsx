"use client";

import { Inter as FontSans } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

import { Button } from "../components/ui/button";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-brand-surface pb-32">
      <svg className="absolute h-0 w-0">
        <defs>
          <clipPath id="wavy-mask" clipPathUnits="objectBoundingBox">
            <path d="M 0.15,0 C 0.5,0.3 -0.1,0.7 0.15,1 L 1,1 L 1,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-8 lg:flex-row lg:items-center">
        <div className="flex w-full flex-col gap-6 lg:w-1/2">
          <h1 className="font-serif text-5xl font-bold text-brand-green-dark lg:text-7xl">
            Agronomy Club<span className="text-brand-yellow">.</span>
          </h1>

          <p className="max-w-md text-lg text-brand-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <div className="mt-4 flex gap-4">
            <Button className="h-12 rounded-xl bg-brand-green px-8 text-base text-white hover:bg-brand-green-dark">
              Sign Up
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-2 border-brand-green bg-transparent px-8 text-base text-brand-green hover:bg-brand-green-light hover:text-brand-green-dark"
            >
              Explore
            </Button>
          </div>
        </div>

        <div className="relative mt-12 flex w-full justify-center lg:mt-0 lg:w-1/2">
          <div className="relative z-10 h-[500px] w-full max-w-md overflow-hidden rounded-[60px] rounded-br-[120px] rounded-tl-[120px] bg-brand-green-light shadow-xl">
            <Image
              src="/PlantPhotoAgronomy.jpeg"
              alt="Agronomy Plants"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <section className="flex min-h-screen flex-col items-center justify-center gap-4 p-24 font-sans">
        <h1 className="text-3xl text-primary">Test title</h1>
        <Button onClick={() => setClicked(true)}>
          {isLoading ? "Loading" : "Ping"}
        </Button>
        <p>
          Response from server: <span>{data as string}</span>
        </p>
      </section>
    </main>
  );
}
