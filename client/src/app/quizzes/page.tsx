import {
  ArrowRight,
  CircleCheck,
  CircleX,
  PartyPopper,
  Timer,
  Zap,
} from "lucide-react";

import { QuizInstructionModal } from "@/components/quiz-instruction-modal";
import QuizList from "@/components/quiz-list";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Quizzes | Agronomy Club",
  description:
    "Interactive quizzes to test your agricultural knowledge in real-time",
};

export default function QuizzesPage() {
  const quizMateUrl =
    process.env.NEXT_PUBLIC_QUIZ_MATE_URL ||
    "https://quiz-mate-q7uvfi4yhq-uc.a.run.app";

  return (
    <main className="min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4">
        {/* Main CTA Card */}
        <div className="mb-12 overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
              <h2 className="mb-4 text-3xl font-bold">
                Ready to Test Your Knowledge?
              </h2>
              <p className="mb-6 text-brand-text">
                Join live quiz sessions with other members. Answer questions in
                real-time, get instant feedback, and climb the leaderboard!
              </p>
              <Button
                asChild
                variant="default"
                className="w-fit bg-brand-green px-8 py-6 text-lg font-semibold text-brand-surface hover:bg-brand-yellow"
              >
                <a href={quizMateUrl} target="_blank" rel="noopener noreferrer">
                  Open Quiz-Mate
                  <ArrowRight size={24} strokeWidth={3} />
                </a>
              </Button>
              <QuizInstructionModal />
            </div>

            <div
              className="relative flex min-h-[22rem] w-full items-center justify-center overflow-hidden bg-brand-green-light md:min-h-[26rem] md:w-1/2"
              aria-hidden="true"
            >
              <span className="absolute left-[58%] top-12 size-2 rounded-full bg-brand-green/50" />
              <span className="absolute bottom-14 right-16 size-3 rounded-full bg-brand-green-dark/40" />
              <span className="absolute right-12 top-1/2 size-2.5 rounded-full bg-brand-yellow" />

              <div className="relative w-[min(80%,18rem)] rotate-[4deg]">
                <div className="absolute -left-4 -top-4 z-10 flex size-12 items-center justify-center rounded-full bg-brand-green-dark text-brand-surface shadow-md">
                  <PartyPopper className="size-5" />
                </div>

                <div className="absolute -right-5 -top-2 z-10 flex h-10 items-center gap-2 rounded-full bg-brand-text-dark px-4 text-sm font-semibold text-brand-surface shadow-md">
                  <Timer className="size-4 text-brand-yellow" />
                  0:07
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-green-dark">
                    Question 4 of 10
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-brand-text-dark">
                    Which nutrient promotes leaf growth?
                  </h3>

                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex h-10 items-center justify-between rounded-xl bg-brand-brown/10 px-4 text-sm font-medium text-brand-brown">
                      Phosphorus
                      <CircleX className="size-4 text-brand-brown" />
                    </div>
                    <div className="flex h-10 items-center justify-between rounded-xl bg-brand-green-dark px-4 text-sm font-semibold text-brand-surface">
                      Nitrogen
                      <CircleCheck className="size-4" />
                    </div>
                    <div className="flex h-10 items-center rounded-xl bg-brand-green-light px-4 text-sm font-medium text-brand-text-light">
                      Potassium
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 left-2 z-10 flex h-9 items-center gap-1.5 rounded-full bg-brand-yellow px-4 text-sm font-bold text-brand-text-dark shadow-md">
                  <Zap size={16} strokeWidth={2} />
                  +100 pts
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="mb-6 text-3xl font-bold">Quizzes</h2>
        <QuizList />
      </div>
    </main>
  );
}
