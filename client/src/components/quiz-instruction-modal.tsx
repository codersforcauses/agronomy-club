"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function QuizInstructionModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex w-fit items-center border-2 border-brand-green bg-white px-8 py-4 text-sm font-semibold text-brand-green-dark transition-colors hover:bg-brand-green-light hover:text-brand-green"
      >
        Quick Instructions
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            aria-modal="true"
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-brand-text-dark hover:bg-brand-green-light"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            <h3 className="mb-6 text-2xl font-bold text-brand-green-dark">
              How It Works
            </h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-2xl font-bold text-white">
                  1
                </div>
                <h4 className="mb-2 font-bold text-brand-text">
                  Host Creates Quiz
                </h4>
                <p className="text-sm text-brand-text-dark">
                  Host uploads or creates a quiz with multiple choice questions
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-2xl font-bold text-white">
                  2
                </div>
                <h4 className="mb-2 font-bold text-brand-text">Players Join</h4>
                <p className="text-sm text-brand-text-dark">
                  Players scan QR code or enter code to join the quiz session
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-2xl font-bold text-white">
                  3
                </div>
                <h4 className="mb-2 font-bold text-brand-text">
                  Live Competition
                </h4>
                <p className="text-sm text-brand-text-dark">
                  Answer questions in real-time and see results on the
                  leaderboard
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
