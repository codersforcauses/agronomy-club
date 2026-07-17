"use client";

import { QuizListItem } from "@/components/quiz-list-item";
import { useQuizzes } from "@/hooks/useQuizzes";

export default function QuizzesClient() {
  const { data: quizzes = [], isLoading, isError, error } = useQuizzes();

  if (isLoading) {
    return <p>Quizzes are loading...</p>;
  }

  if (isError) {
    console.log(error);

    return (
      <p>
        Error loading quizzes. If refreshing doesn't work, please contact an
        administrator.
      </p>
    );
  }

  return (
    <div className="mb-2">
      {quizzes?.length > 0 ? (
        quizzes.map((quiz) => (
          <div className="mb-2" key={quiz.id}>
            <QuizListItem
              quizName={quiz.name}
              chapter={quiz.chapterName}
              chapterColor={quiz.chapterColour}
              uploadDate={quiz.upload_date}
              downloadUrl={`/quizzes/download/${quiz.id}`}
            />
          </div>
        ))
      ) : (
        <p>No quizzes available.</p>
      )}
    </div>
  );
}
