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
};

function QuizListItem({
  quizName,
  chapter,
  chapterColor,
  uploadDate,
}: QuizListItemProps) {
  return (
    <div className="flex w-full flex-col">
      <Item className="shadow-md">
        <div
          style={{ "--chapter-color": chapterColor } as React.CSSProperties}
          className="h-full w-2 rounded-l-md bg-[var(--chapter-color)]"
        ></div>
        <ItemContent>
          <ItemTitle>{quizName}</ItemTitle>
          <div className="justify-between">
            <ItemDescription className="text-left">
              created by {chapter}
            </ItemDescription>
            <div className="text-right">uploaded on {uploadDate}</div>
          </div>
        </ItemContent>
        <ItemActions>
          <Button>Download</Button>
        </ItemActions>
      </Item>
    </div>
  );
}

export { QuizListItem };
