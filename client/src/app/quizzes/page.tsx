import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Interactive Quizzes</h1>
          <p className="text-lg text-brand-text">
            Challenge your agricultural knowledge with real-time interactive
            quizzes. Test yourself, compete with others, and see where you stand
            on the leaderboard!
          </p>
        </div>

        {/* Main CTA Card */}
        <div className="mb-12 rounded-lg border-2 border-brand-green-light bg-white p-8 shadow-lg md:p-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex-1">
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
                className="inline-flex items-center gap-2 rounded-lg bg-brand-green-dark px-8 py-4 font-semibold text-brand-surface transition hover:bg-brand-yellow"
              >
                Open Quiz-Mate
                <ArrowRight size={20} />
              </a>
            </div>
            <div className="flex-1 text-center">
              <div className="rounded-lg bg-brand-yellow-light p-8">
                <div className="mb-4 text-5xl">🎯</div>
                <p className="font-semibold text-brand-text">
                  Live Interactive Quizzes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          {/* For Hosts */}
          <div className="rounded-lg border-l-4 border-brand-green bg-white p-8 shadow">
            <h3 className="mb-4 text-2xl font-bold text-brand-green">
              For Quiz Hosts
            </h3>
            <ul className="space-y-3 text-brand-text">
              <li className="flex items-start gap-3">
                <span className="font-bold text-brand-green">✓</span>
                <span>Create custom quizzes about agriculture</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-brand-green">✓</span>
                <span>Host real-time quiz sessions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-brand-green">✓</span>
                <span>View answer statistics and insights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-brand-green">✓</span>
                <span>Share QR codes for easy joining</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-brand-green">✓</span>
                <span>Add images to questions (host view only)</span>
              </li>
            </ul>
          </div>

          {/* For Players */}
          <div className="rounded-lg border-l-4 border-brand-yellow bg-white p-8 shadow">
            <h3 className="mb-4 text-2xl font-bold text-brand-yellow">
              For Quiz Players
            </h3>
            <ul className="space-y-3 text-brand-text">
              <li className="flex items-start gap-3">
                <span className="font-bold text-brand-yellow">✓</span>
                <span>Join quizzes with access code or QR code</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-brand-yellow">✓</span>
                <span>Answer questions in real-time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-brand-yellow">✓</span>
                <span>Get instant feedback on your answers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-brand-yellow">✓</span>
                <span>See the leaderboard and rankings</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-brand-yellow">✓</span>
                <span>Track your score as the quiz progresses</span>
              </li>
            </ul>
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

        {/* Tips */}
        <div className="border-green-light rounded-lg border-2 bg-brand-green-light p-8">
          <h3 className="mb-4 text-xl font-bold text-brand-text">💡 Tips</h3>
          <ul className="space-y-2 text-brand-text">
            <li>
              • <strong>For Hosts:</strong> Set a time limit for each question
              to increase engagement
            </li>
            <li>
              • <strong>For Players:</strong> Answer as quickly and accurately
              as possible to win
            </li>
            <li>
              • <strong>Everyone:</strong> Check out the leaderboard to see how
              you compare
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
