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
  /** the quiz's download url. */
  downloadUrl: string;
};

/**
 * Displays a quiz as a card with its name, chapter, upload date, and a download button.
 *
 *
 * @example
 * ```tsx
 * <QuizListItem
 *   quizName="Name of Quiz"
 *   chapter="Name of Chapter"
 *   chapterColor="#800851"
 *   uploadDate="27/6/2026"
 *   downloadUrl=""
 * />
 * ```
 *
 */
function QuizListItem({
  quizName,
  chapter,
  chapterColor,
  uploadDate,
  downloadUrl,
}: QuizListItemProps) {
  return (
    <div className="flex w-full flex-col rounded-md bg-white shadow-md shadow-brand-shadow">
      <Item size="default" className="w-full p-0">
        <div
          style={{ "--chapter-color": chapterColor } as React.CSSProperties}
          className="m-0 w-2 self-stretch rounded-l-md bg-[var(--chapter-color)]"
        />
        <ItemContent className="p-3 pb-4 pt-4">
          <ItemTitle className="text-base font-semibold text-brand-text-dark">
            {quizName}
          </ItemTitle>
          <ItemDescription className="flex flex-col break-normal lg:flex-row lg:justify-between">
            <span className="text-left text-brand-green">
              <span className="italic">created by </span>
              {chapter}
            </span>
            <span className="text-nowrap text-left text-muted-foreground lg:self-end lg:text-right">
              <span className="italic">uploaded on </span>
              {uploadDate}
            </span>
          </ItemDescription>
        </ItemContent>
        <ItemActions className="pr-5">
          {/* <Button
            className="bg-brand-green text-brand-surface"
            onClick={onDownload}
          >
            Download
          </Button> */}
          <Button
            asChild
            className="bg-brand-green text-brand-surface transition-opacity hover:bg-brand-green hover:text-white hover:opacity-80"
          >
            <a href={downloadUrl}>Download</a>
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}

export { QuizListItem };
