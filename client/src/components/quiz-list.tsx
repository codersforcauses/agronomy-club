"use client";

import { useQuizzes } from "@/hooks/useQuizzes";

import { QuizListItem } from "./quiz-list-item";

export default function QuizList() {
  const { data, isLoading } = useQuizzes();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {data?.map((quiz) => (
        <QuizListItem
          key={quiz.id}
          quizName={quiz.name}
          chapter={quiz.chapterName}
          chapterColor={quiz.chapterColour}
          uploadDate={quiz.upload_date}
          downloadUrl={`/quizzes/download/${quiz.id}`}
        />
      ))}
    </div>
  );
}
