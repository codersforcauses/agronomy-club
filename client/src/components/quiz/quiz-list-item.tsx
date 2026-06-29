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
  quizName: string;
  chapter: string;
  chapterColor: string;
  uploadDate: string;
  onDownload: () => void;
};

function QuizListItem({
  quizName,
  chapter,
  chapterColor,
  uploadDate,
  onDownload,
}: QuizListItemProps) {
  return (
    <div className="flex w-full flex-col rounded-md shadow-md">
      <Item size="default" className="pb-0 pl-0 pt-0">
        <div
          style={{ "--chapter-color": chapterColor } as React.CSSProperties}
          className="m-0 w-2 self-stretch rounded-l-md bg-[var(--chapter-color)]"
        />
        <ItemContent className="p-3 pb-4 pt-4">
          <ItemTitle className="text-base font-semibold">{quizName}</ItemTitle>
          <div className="flex flex-col">
            <ItemDescription className="text-(--accent) break-normal text-left">
              <span className="italic">created by </span>
              {chapter}
            </ItemDescription>
            <div className="ml-8 mt-1 text-right align-text-bottom text-xs text-muted-foreground">
              <span className="italic">uploaded on </span>
              {uploadDate}
            </div>
          </div>
        </ItemContent>
        <ItemActions>
          <Button onClick={onDownload}>Download</Button>
        </ItemActions>
      </Item>
    </div>
  );
}

export { QuizListItem };
