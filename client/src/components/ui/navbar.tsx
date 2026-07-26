"use client";

import { Menu, Sprout } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  name: string;
  href: string;
};

const navigationItems: NavItem[] = [
  { name: "About", href: "/about" },
  { name: "Chapters", href: "/chapters" },
  { name: "Events", href: "/events" },
  { name: "Quizzes", href: "/quizzes" },
  { name: "Resources", href: "/resources" },
  { name: "Alumni", href: "/alumni" },
];

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center border-b border-brand-green-dark bg-brand-green-dark px-6 text-brand-surface lg:px-10">
      <div className="flex flex-1 items-center">
        <Link
          href="/"
          className="mr-6 flex items-center gap-2 text-lg font-bold xl:text-xl"
        >
          <Sprout className="size-7 text-[#54c612] xl:size-8" />
          <span className="sr-only text-brand-surface">Agronomy Club</span>
          <span
            aria-hidden="true"
            className="whitespace-nowrap text-[#54c612] md:inline"
          >
            Agronomy Club
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 text-sm font-medium xl:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-md px-3 py-2 transition-colors duration-150 ${
                isActive(item.href)
                  ? "bg-brand-yellow text-brand-brown"
                  : "text-brand-surface hover:text-brand-green"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="ml-4 flex items-center gap-3 border-l border-brand-green-light pl-4">
            <Link
              href="/auth/signin"
              className="hover:brand-surface whitespace-nowrap text-sm text-brand-surface transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full bg-brand-surface px-4 py-1.5 text-sm font-semibold text-brand-green-dark transition-colors hover:bg-brand-yellow hover:text-brand-text"
            >
              Join the club
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className="flex items-center xl:hidden">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center p-2 text-brand-green-light hover:text-brand-surface"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 flex-col rounded border border-brand-green bg-brand-green-dark shadow-lg">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsDropdownOpen(false)}
                  className={`block whitespace-nowrap px-4 py-3 text-sm transition-colors duration-150 ${
                    isActive(item.href)
                      ? "bg-brand-yellow text-brand-brown"
                      : "text-brand-surface hover:bg-brand-green hover:text-brand-surface"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="space-y-2 border-t border-brand-green-dark px-4 py-3">
                <Link
                  href="/auth/signin"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block text-sm text-brand-surface transition-colors hover:text-brand-surface"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block text-sm text-brand-surface transition-colors hover:text-brand-surface"
                >
                  Join the club
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
