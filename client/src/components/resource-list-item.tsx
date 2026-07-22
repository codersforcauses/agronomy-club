import { DynamicIcon } from "lucide-react/dynamic";

type ResourceListItemProps = {
  ResourceName: string;
  ChapterName: string;
  UploadDate: string;
  type: string;
  chapterColour: string;
  link: string;
};

export function ResourceListItem({
  ResourceName,
  ChapterName,
  UploadDate,
  type,
  chapterColour,
  link,
}: ResourceListItemProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col border-b border-brand-green-light py-4 transition-colors hover:bg-brand-green-light/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-light sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex w-full items-center gap-3 sm:w-1/2">
        <DynamicIcon
          className="h-5 w-5 shrink-0 text-brand-text-dark"
          name={type ? type : "grid-3x3"}
        />
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
    </a>
  );
}
