import { ArrowRight, Radio, Target, Trophy } from "lucide-react";

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
            <div className="flex flex-1 flex-col items-center justify-center bg-brand-green-light px-6 py-10 text-center md:py-12">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-brand-green-dark text-brand-surface shadow-sm">
                <Target className="size-8" aria-hidden="true" />
              </div>
              <p className="text-lg font-bold text-brand-text-dark">
                Live Interactive Quizzes
              </p>
              <ul className="mt-6 flex flex-wrap justify-center gap-2">
                <li className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-green-dark shadow-sm">
                  <Radio className="size-3.5" aria-hidden="true" />
                  Live sessions
                </li>
                <li className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-green-dark shadow-sm">
                  <Trophy className="size-3.5" aria-hidden="true" />
                  Leaderboard
                </li>
              </ul>
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
