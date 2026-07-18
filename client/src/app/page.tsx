"use client";

import { Inter as FontSans } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

import { Button } from "../components/ui/button";

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-brand-surface">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 w-full min-w-[1440px] max-w-[1920px] -translate-x-1/2">
          <svg
            className="h-auto w-full"
            viewBox="0 0 1433 989"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M485.659 8.82178C518.374 76.4251 582.571 123.56 657.143 134.729L701.818 141.42C746.657 148.136 806.488 140.195 861.063 124.023C928.721 103.975 981.547 54.3412 1026.95 0.321777M1437.95 542.822L1401.6 591.751C1349.32 662.128 1275.13 713.126 1190.69 736.718L1173.73 741.455C1158.59 745.688 1143.04 748.332 1127.34 749.345L1099.78 751.123C1053.41 754.115 1007.94 737.343 974.615 704.957C950.736 681.748 934.467 651.835 927.963 619.177L916.938 563.82C910.466 531.323 899.635 499.705 881.175 472.189C849.304 424.682 790.683 351.476 719.639 328.176L712.24 325.749C651.667 305.883 587.03 301.571 524.334 313.212L428.991 330.915C404.661 333.118 382.615 335.115 361.877 336.993C222.134 349.648 85.6775 289.747 0.396973 178.322"
              stroke="#F4B643"
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center pt-12 md:flex-row md:items-center md:pt-0">
        <div className="flex w-full flex-col gap-6 px-6 py-12 sm:px-12 md:w-3/5 md:py-0 md:pl-12 lg:pl-16 lg:pr-8 xl:pl-24">
          <h1 className="font-serif text-6xl font-bold text-brand-green-dark lg:text-7xl xl:text-8xl">
            Agronomy Club<span className="text-brand-yellow">.</span>
          </h1>

          <p className="max-w-xl pt-9 font-serif text-lg text-brand-brown">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <div className="mt-4 flex gap-6">
            <Button className="h-12 rounded-xl bg-brand-green-dark px-8 font-serif text-base font-semibold text-brand-surface hover:bg-brand-yellow hover:text-brand-brown">
              Sign Up
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-2 border-brand-green-dark bg-transparent px-8 font-serif text-base font-semibold text-brand-green hover:bg-brand-green/30 hover:text-brand-green"
            >
              Explore
            </Button>
          </div>

          <div className="flex w-fit items-center gap-3 self-start text-brand-text">
            <svg
              className="animate-bounce"
              viewBox="0 0 40 24"
              width="32"
              height="32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a5 5 0 00-5 5v10a5 5 0 005 5h0a5 5 0 005-5V7a5 5 0 00-5-5z" />
              <path d="M12 6v4" />
            </svg>
            <span className="pt-1 text-sm font-medium tracking-wide">
              Scroll to Explore
            </span>
          </div>
        </div>

        <div className="relative mt-12 flex w-full justify-end md:w-2/5">
          <svg className="absolute h-0 w-0">
            <defs>
              <clipPath
                id="figma-mask"
                clipPathUnits="objectBoundingBox"
                transform="scale(0.0017094, 0.0011792)"
              >
                <path d="M583.907 685.5V731.5V820.5C583.907 823.053 334.276 838.381 199.253 846.485C145.536 849.708 93.199 829.587 55.3366 791.346C-5.55713 729.843 -16.3837 634.629 29.1475 561.025L63.1796 506.01C104.321 439.503 97.0485 353.898 45.2773 295.284C-55.8609 180.778 25.4379 0.5 178.214 0.5H583.907V685.5Z" />
              </clipPath>
            </defs>
          </svg>

          <div className="relative aspect-[585/848] w-full max-w-[360px] md:max-w-[410px] lg:max-w-[440px] xl:max-w-[510px]">
            <div
              className="absolute inset-0 z-10"
              style={{ clipPath: "url(#figma-mask)" }}
            >
              <Image
                src="/PlantPhotoAgronomy.jpeg"
                alt="Agronomy Plants"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="pointer-events-none absolute -left-[10%] top-[2%] z-10 h-[110%] w-[40%]">
              <svg
                className="h-full w-full"
                viewBox="0 0 220 730"
                preserveAspectRatio="xMaxYMid meet"
                fill="none"
              >
                <path
                  d="M66.0305 5.00146C2.79761 33.395 -13.7204 115.576 33.6311 166.196L92.8571 229.511C151.477 292.178 151.466 389.564 92.8319 452.218L37.7316 511.096C-1.43937 552.952 -5.95604 616.518 26.9031 663.492C52.5331 700.132 96.2436 719.698 140.644 714.406L196.031 707.804"
                  stroke="#F4B643"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center gap-4 py-24 font-sans">
        <h1 className="text-3xl font-bold text-gray-900">Test title</h1>
        <Button
          onClick={() => setClicked(true)}
          className="bg-gray-900 text-white hover:bg-gray-800"
        >
          {isLoading ? "Loading" : "Ping"}
        </Button>
        <p className="text-gray-600">
          Response from server: <span>{data as string}</span>
        </p>
      </section>
    </main>
  );
}
