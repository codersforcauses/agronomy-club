"use client";

import { Check, Eye, EyeOff, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  getPasswordRequirements,
  getPasswordStrength,
  isPasswordValid,
  type PasswordStrength,
} from "@/lib/password-validation";
import { cn } from "@/lib/utils";

const strengthConfig: Record<
  PasswordStrength,
  { label: string; color: string; bars: number }
> = {
  weak: { label: "Weak", color: "bg-red-500", bars: 1 },
  fair: { label: "Fair", color: "bg-yellow-400", bars: 2 },
  strong: { label: "Strong", color: "bg-brand-green", bars: 3 },
  "very-strong": {
    label: "Very strong",
    color: "bg-brand-green-dark",
    bars: 4,
  },
};

export default function SignUpPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const requirements = getPasswordRequirements(password);
  const strength = getPasswordStrength(password);
  const config = strengthConfig[strength];
  const passwordValid = isPasswordValid(password);
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-brand-green-light bg-brand-surface p-8 shadow-card">
        <h1 className="text-2xl font-bold text-brand-text-dark">
          Join the club
        </h1>
        <p className="mt-1 text-sm text-brand-text-light">
          Already a member?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-brand-green hover:underline"
          >
            Sign in
          </Link>
        </p>

        <form className="mt-6 space-y-4" noValidate>
          {/* Password */}
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-brand-green-light bg-white px-3 py-2 pr-10 text-sm text-brand-text-dark placeholder-brand-text-light outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                placeholder="Create a password"
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

            {/* Strength meter */}
            {password.length > 0 && (
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        className={cn(
                          "h-1.5 w-12 rounded-full transition-colors duration-300",
                          bar <= config.bars
                            ? config.color
                            : "bg-brand-green-light",
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-brand-text-light">
                    {config.label}
                  </span>
                </div>

                {/* Requirements checklist */}
                <ul className="mt-3 space-y-1">
                  {requirements.map((req) => (
                    <li
                      key={req.label}
                      className={cn(
                        "flex items-center gap-1.5 text-xs",
                        req.met
                          ? "text-brand-green-dark"
                          : "text-brand-text-light",
                      )}
                    >
                      {req.met ? (
                        <Check className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <X className="h-3.5 w-3.5 shrink-0" />
                      )}
                      {req.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="mb-1 block text-sm font-medium text-brand-text"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={cn(
                  "w-full rounded-lg border bg-white px-3 py-2 pr-10 text-sm text-brand-text-dark placeholder-brand-text-light outline-none focus:ring-1",
                  confirmPassword.length > 0 && !passwordsMatch
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                    : "border-brand-green-light focus:border-brand-green focus:ring-brand-green",
                )}
                placeholder="Repeat your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-light hover:text-brand-text"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {confirmPassword.length > 0 && !passwordsMatch && (
              <p className="mt-1 text-xs text-red-500">
                Passwords do not match.
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!passwordValid || !passwordsMatch}
            className="mt-2 w-full bg-brand-green-dark text-brand-surface hover:bg-brand-green"
          >
            Create account
          </Button>
        </form>
      </div>
    </main>
  );
}
