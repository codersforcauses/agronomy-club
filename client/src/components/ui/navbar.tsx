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
    <header className="sticky top-0 z-50 flex h-16 w-full items-center border-b border-green-700 bg-green-800 px-6 text-white lg:px-10">
      <div className="flex flex-1 items-center">
        <Link
          href="/"
          className="mr-6 flex items-center gap-2 text-xl font-bold"
        >
          <Sprout className="h-8 w-8 text-green-200" />
          <span className="sr-only">Agronomy Club</span>
          <span aria-hidden="true" className="whitespace-nowrap md:hidden">
            Agronomy
          </span>
          <span
            aria-hidden="true"
            className="hidden whitespace-nowrap md:inline"
          >
            Agronomy Club
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 text-sm font-medium lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-md px-3 py-2 transition-colors duration-150 ${
                isActive(item.href)
                  ? "bg-green-700 text-white"
                  : "text-green-100 hover:bg-green-700 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="ml-4 flex items-center gap-3 border-l border-green-700 pl-4">
            <Link
              href="/auth/signin"
              className="text-sm text-green-100 transition-colors hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-900 transition-colors hover:bg-white"
            >
              Join the club
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className="flex items-center lg:hidden">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center p-2 text-green-100 hover:text-white"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 flex-col rounded border border-green-700 bg-green-800 shadow-lg">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsDropdownOpen(false)}
                  className={`block whitespace-nowrap px-4 py-3 text-sm transition-colors duration-150 ${
                    isActive(item.href)
                      ? "bg-green-700 text-white"
                      : "text-green-100 hover:bg-green-700 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="space-y-2 border-t border-green-700 px-4 py-3">
                <Link
                  href="/auth/signin"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block text-sm text-green-100 transition-colors hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block text-sm text-green-100 transition-colors hover:text-white"
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
