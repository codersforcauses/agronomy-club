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
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Interactive Quizzes
          </h1>
          <p className="text-lg text-gray-700">
            Challenge your agricultural knowledge with real-time interactive
            quizzes. Test yourself, compete with others, and see where you stand
            on the leaderboard!
          </p>
        </div>

        {/* Main CTA Card */}
        <div className="mb-12 rounded-lg border-2 border-green-200 bg-white p-8 shadow-lg md:p-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex-1">
              <h2 className="mb-4 text-3xl font-bold text-green-800">
                Ready to Test Your Knowledge?
              </h2>
              <p className="mb-6 text-gray-700">
                Join live quiz sessions with other members. Answer questions in
                real-time, get instant feedback, and climb the leaderboard!
              </p>
              <a
                href={quizMateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
              >
                Open Quiz-Mate
                <ArrowRight size={20} />
              </a>
            </div>
            <div className="flex-1 text-center">
              <div className="rounded-lg bg-green-100 p-8">
                <div className="mb-4 text-5xl">🎯</div>
                <p className="font-semibold text-green-800">
                  Live Interactive Quizzes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          {/* For Hosts */}
          <div className="rounded-lg border-l-4 border-green-600 bg-white p-8 shadow">
            <h3 className="mb-4 text-2xl font-bold text-green-800">
              For Quiz Hosts
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="font-bold text-green-600">✓</span>
                <span>Create custom quizzes about agriculture</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-green-600">✓</span>
                <span>Host real-time quiz sessions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-green-600">✓</span>
                <span>View answer statistics and insights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-green-600">✓</span>
                <span>Share QR codes for easy joining</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-green-600">✓</span>
                <span>Add images to questions (host view only)</span>
              </li>
            </ul>
          </div>

          {/* For Players */}
          <div className="rounded-lg border-l-4 border-blue-600 bg-white p-8 shadow">
            <h3 className="mb-4 text-2xl font-bold text-blue-800">
              For Quiz Players
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-600">✓</span>
                <span>Join quizzes with access code or QR code</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-600">✓</span>
                <span>Answer questions in real-time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-600">✓</span>
                <span>Get instant feedback on your answers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-600">✓</span>
                <span>See the leaderboard and rankings</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-600">✓</span>
                <span>Track your score as the quiz progresses</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12 rounded-lg bg-white p-8 shadow">
          <h3 className="mb-6 text-2xl font-bold text-green-800">
            How It Works
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white">
                1
              </div>
              <h4 className="mb-2 font-bold text-gray-800">
                Host Creates Quiz
              </h4>
              <p className="text-sm text-gray-600">
                Host uploads or creates a quiz with multiple choice questions
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white">
                2
              </div>
              <h4 className="mb-2 font-bold text-gray-800">Players Join</h4>
              <p className="text-sm text-gray-600">
                Players scan QR code or enter code to join the quiz session
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white">
                3
              </div>
              <h4 className="mb-2 font-bold text-gray-800">Live Competition</h4>
              <p className="text-sm text-gray-600">
                Answer questions in real-time and see results on the leaderboard
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-lg border-2 border-green-200 bg-green-50 p-8">
          <h3 className="mb-4 text-xl font-bold text-green-800">💡 Tips</h3>
          <ul className="space-y-2 text-gray-700">
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
