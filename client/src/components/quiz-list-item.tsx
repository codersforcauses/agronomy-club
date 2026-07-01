"use client";

import { StringToBoolean } from "class-variance-authority/types";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

type QuizListItemProps = {
  /** The name of the quiz. */
  quizName: string;
  /** The chapter that uploaded the quiz. */
  chapter: string;
  /** The chapter's colour hex. */
  chapterColor: string;
  /** The quiz's upload date. */
  uploadDate: string;
  /** Called when the user clicks the Download button. */
  onDownload: () => void;
};

/**
 * Displays a quiz as a card with its name, chapter, upload date, and a download button.
 *
 * The `onDownload` callback is invoked when the user clicks the Download button.
 *
 * @example
 * ```tsx
 * <QuizListItem
 *   quizName="Name of Quiz"
 *   chapter="Name of Chapter"
 *   chapterColor="#800851"
 *   uploadDate="27/6/2026"
 *   onDownload={() => downloadQuiz()}
 * />
 * ```
 *
 */
function QuizListItem({
  quizName,
  chapter,
  chapterColor,
  uploadDate,
  onDownload,
}: QuizListItemProps) {
  return (
    <div className="flex w-full flex-col rounded-md shadow-md shadow-brand-shadow">
      <Item size="default" className="pb-0 pl-0 pt-0">
        <div
          style={{ "--chapter-color": chapterColor } as React.CSSProperties}
          className="m-0 w-2 self-stretch rounded-l-md bg-[var(--chapter-color)]"
        />
        <ItemContent className="p-3 pb-4 pt-4">
          <ItemTitle className="text-base font-semibold text-brand-text-dark">
            {quizName}
          </ItemTitle>
          <ItemDescription className="flex flex-row justify-between break-normal">
            <span className="text-left text-brand-green">
              <span className="italic">created by </span>
              {chapter}
            </span>
            <span className="self-end text-nowrap text-right text-muted-foreground">
              <span className="italic">uploaded on </span>
              {uploadDate}
            </span>
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            className="bg-brand-green text-brand-surface"
            onClick={onDownload}
          >
            Download
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}

export { QuizListItem };
