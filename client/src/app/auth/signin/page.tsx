"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-brand-green-light bg-brand-surface p-8 shadow-card">
        <h1 className="text-2xl font-bold text-brand-text-dark">Sign in</h1>
        <p className="mt-1 text-sm text-brand-text-light">
          New here?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-brand-green hover:underline"
          >
            Join the club
          </Link>
        </p>

        <form className="mt-6 space-y-4" noValidate>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-brand-text"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border border-brand-green-light bg-white px-3 py-2 text-sm text-brand-text-dark placeholder-brand-text-light outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-brand-text"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="w-full rounded-lg border border-brand-green-light bg-white px-3 py-2 pr-10 text-sm text-brand-text-dark placeholder-brand-text-light outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-light hover:text-brand-text"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="mt-2 w-full bg-brand-green-dark text-brand-surface hover:bg-brand-green"
          >
            Sign in
          </Button>
        </form>
      </div>
    </main>
  );
}
