import { FileText, Gamepad2, Globe, Package } from "lucide-react";

type ResourceListItemProps = {
  ResourceName: string;
  ChapterName: string;
  UploadDate: string;
  type: "Video Game" | "Article" | "Website" | "Other";
  chapterColour: string;
};

const Icon = {
  "Video Game": Gamepad2,
  Article: FileText,
  Website: Globe,
  Other: Package,
};

export function ResourceListItem({
  ResourceName,
  ChapterName,
  UploadDate,
  type,
  chapterColour,
}: ResourceListItemProps) {
  const ResourceIcon = Icon[type];

  return (
    <div className="flex flex-col border-b border-brand-green-light py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full items-center gap-3 sm:w-1/2">
        <ResourceIcon className="h-5 w-5 shrink-0 text-brand-text-dark" />
        <span className="truncate font-medium text-brand-text-dark">
          {ResourceName}
        </span>
      </div>

      <div className="mt-2 flex w-full items-center gap-2 sm:mt-0 sm:w-1/4">
        <div
          className="h-5 w-1 shrink-0 rounded-sm"
          style={{ backgroundColor: chapterColour }}
        />
        <span className="truncate font-medium text-brand-text">
          {ChapterName}
        </span>
      </div>

      <span className="mt-2 w-full text-brand-text sm:mt-0 sm:w-1/4 sm:text-right">
        {UploadDate}
      </span>
    </div>
  );
}
