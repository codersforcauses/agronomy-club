import {
  ArrowRight,
  CircleCheck,
  CircleX,
  PartyPopper,
  Timer,
  Zap,
} from "lucide-react";

import { QuizListItem } from "@/components/quiz-list-item";

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
        <div className="mb-12 overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
              <h2 className="mb-4 text-3xl font-bold">
                Ready to Test Your Knowledge?
              </h2>
              <p className="mb-6 text-brand-text">
                Join live quiz sessions with other members. Answer questions in
                real-time, get instant feedback, and climb the leaderboard!
              </p>
              <a
                href={quizMateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-brand-green-dark px-8 py-4 font-semibold text-brand-surface transition hover:bg-brand-yellow"
              >
                Open Quiz-Mate
                <ArrowRight size={20} />
              </a>
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
                    Which planet has the most moons?
                  </h3>

                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex h-10 items-center justify-between rounded-xl bg-brand-brown/10 px-4 text-sm font-medium text-brand-brown">
                      Jupiter
                      <CircleX className="size-4 text-brand-brown" />
                    </div>
                    <div className="flex h-10 items-center justify-between rounded-xl bg-brand-green-dark px-4 text-sm font-semibold text-brand-surface">
                      Saturn
                      <CircleCheck className="size-4" />
                    </div>
                    <div className="flex h-10 items-center rounded-xl bg-brand-green-light px-4 text-sm font-medium text-brand-text-light">
                      Mars
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

        {/* How It Works */}
        <div className="mb-12 rounded-lg bg-white p-8 shadow">
          <h3 className="mb-6 text-2xl font-bold text-brand-green-dark">
            How It Works
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-2xl font-bold text-white">
                1
              </div>
              <h4 className="mb-2 font-bold text-brand-text">
                Host Creates Quiz
              </h4>
              <p className="text-sm text-brand-text-dark">
                Host uploads or creates a quiz with multiple choice questions
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-2xl font-bold text-white">
                2
              </div>
              <h4 className="mb-2 font-bold text-brand-text">Players Join</h4>
              <p className="text-sm text-brand-text-dark">
                Players scan QR code or enter code to join the quiz session
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-2xl font-bold text-white">
                3
              </div>
              <h4 className="mb-2 font-bold text-brand-text">
                Live Competition
              </h4>
              <p className="text-sm text-brand-text-dark">
                Answer questions in real-time and see results on the leaderboard
              </p>
            </div>
          </div>
        </div>

        <h2 className="mb-6 text-3xl font-bold">Quizzes</h2>
        <QuizListItem
          quizName="Name of Quiz"
          chapter="Name of Chapter"
          chapterColor="#800851"
          uploadDate="27/6/2026"
          downloadUrl=""
        />
      </div>
    </main>
  );
}
