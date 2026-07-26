import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign Up | Agronomy Club",
  description: "Create an Agronomy Club member account.",
};

const inputStyles =
  "mt-1 block w-full rounded-lg border border-brand-green-light px-4 py-3 text-sm text-brand-text-dark placeholder:text-brand-brown/80 focus:border-brand-green focus:outline-none";

const labelStyles = "block text-base/5 font-medium text-brand-text-dark";

const graduationYears = [2025, 2026, 2027, 2028, 2029];

export default function SignUpPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <p className="font-ui text-sm/5 font-semibold uppercase tracking-widest text-brand-green">
          Join the club
        </p>

        <h1 className="mt-2 text-center text-2xl/7 font-bold text-brand-text-dark sm:text-3xl/9">
          Create your Agronomy Club account
          <span className="text-brand-yellow">.</span>
        </h1>

        <div className="mt-6 w-full max-w-4xl rounded-xl bg-white px-6 py-8 shadow-md shadow-brand-shadow sm:px-12">
          <form>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="full-name" className={labelStyles}>
                  Full Name<span className="text-red-600">*</span>
                </label>
                <input
                  id="full-name"
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  required
                  className={inputStyles}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelStyles}>
                  Email<span className="text-red-600">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="youremail@example.com"
                  required
                  className={inputStyles}
                />
              </div>

              <div>
                <label htmlFor="graduation-year" className={labelStyles}>
                  Graduation Year<span className="text-red-600">*</span>
                </label>
                <select
                  id="graduation-year"
                  name="graduationYear"
                  defaultValue=""
                  required
                  className={`mt-1 block w-full rounded-lg border border-brand-green-light bg-white px-4 py-3 text-sm valid:text-brand-text-dark invalid:text-brand-brown/80 focus:border-brand-green focus:outline-none`}
                >
                  <option value="" disabled>
                    Year
                  </option>
                  {graduationYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="discipline" className={labelStyles}>
                  Discipline<span className="text-red-600">*</span>
                </label>
                <input
                  id="discipline"
                  name="discipline"
                  type="text"
                  placeholder="Soil Science"
                  required
                  className={inputStyles}
                />
              </div>

              <div>
                <label htmlFor="password" className={labelStyles}>
                  Password<span className="text-red-600">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  minLength={8}
                  required
                  className={inputStyles}
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className={labelStyles}>
                  Confirm Password<span className="text-red-600">*</span>
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  minLength={8}
                  required
                  className={inputStyles}
                />
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-md">
              <Button
                type="submit"
                className="w-full rounded-lg bg-brand-green px-4 py-3 text-base font-medium text-brand-surface hover:bg-brand-yellow hover:text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
              >
                Create Account
              </Button>
            </div>

            <p className="mt-4 text-center font-ui text-sm font-medium text-brand-text-light">
              Already part of the community?{" "}
              <Link
                href="/sign-in"
                className="font-ui font-bold text-brand-green underline hover:text-brand-yellow"
              >
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
