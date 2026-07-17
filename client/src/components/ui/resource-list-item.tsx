type ResourceListItemProps = {
  ResourceName: string;
  ChapterName: string;
  UploadDate: string;
  type: "Video Game" | "Article" | "Website" | "Other";
  chapterColour: string;
};

const Icon = {
  "Video Game": "🎮",
  Article: "📝",
  Website: "🌐",
  Other: "📦",
};

export function ResourceListItem({
  ResourceName,
  ChapterName,
  UploadDate,
  type,
  chapterColour,
}: ResourceListItemProps) {
  return (
    <div className="border-brand-green-light flex flex-col border-b py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full items-center gap-3 sm:w-1/3">
        <span className="text-brand-text-dark">{Icon[type]}</span>
        <span className="text-brand-text-dark font-medium">{ResourceName}</span>
      </div>

      <div className="flex w-full items-center gap-2 sm:w-1/3">
        <div
          className="h-5 w-1 rounded-sm"
          style={{ backgroundColor: chapterColour }}
        />
        <span className="text-brand-text-dark font-medium">{ChapterName}</span>
      </div>

      <span className="text-brand-text-dark w-full sm:w-1/3 sm:text-right">
        {UploadDate}
      </span>
    </div>
  );
}
