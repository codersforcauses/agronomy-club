import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-green-dark px-6 pb-20 pt-14 text-brand-surface sm:px-16 sm:pb-10">
      <div className="mx-auto max-w-6xl space-y-14">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold text-brand-surface">
              Agronomy Club
            </h2>
            <p className="mt-6 max-w-xs text-sm/6 text-brand-surface">
              Dedicated to the science of soil management and crop production
              for a sustainable world.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-widest text-brand-surface">
              Menu
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm/6 text-brand-surface hover:text-brand-yellow"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/chapters"
                  className="text-sm/6 text-brand-surface hover:text-brand-yellow"
                >
                  Chapters
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-sm/6 text-brand-surface hover:text-brand-yellow"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/quizzes"
                  className="text-sm/6 text-brand-surface hover:text-brand-yellow"
                >
                  Quizzes
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-sm/6 text-brand-surface hover:text-brand-yellow"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/alumni"
                  className="text-sm/6 text-brand-surface hover:text-brand-yellow"
                >
                  Alumni
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-widest text-brand-surface">
              Connect
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="mailto:agronomy-club@uwa.edu.au"
                  className="text-sm/6 text-brand-surface hover:text-brand-yellow"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-surface/30 pt-4">
          <div className="flex flex-col gap-6 text-sm/6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-brand-surface">
                © 2026 Agronomy Club. Cultivating Excellence.
              </p>
              <div className="hidden h-4 w-px bg-brand-surface sm:block" />
              <Link
                href="/privacy-policy"
                className="text-sm/6 text-brand-surface hover:text-brand-yellow"
              >
                Privacy Policy
              </Link>
              <div className="hidden h-4 w-px bg-brand-surface sm:block" />
              <Link
                href="/terms-of-service"
                className="text-sm/6 text-brand-surface hover:text-brand-yellow"
              >
                Terms of Service
              </Link>
            </div>
            <p>
              Website by
              <a
                href="https://codersforcauses.org/"
                className="whitespace-nowrap font-plex-mono font-semibold hover:text-brand-yellow"
              >
                {" "}
                ./Coders for Causes
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
