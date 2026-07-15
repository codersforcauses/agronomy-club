type ResourceListItemProps = {
  ResourceName: string;
  ChapterName: string;
  UploadDate: string;
  type: "Video Game" | "Article" | "Website" | "Other";
};

const Icon = {
  "Video Game": "🎮",
  Article: "📝",
  Website: "🌐",
  Other: "📦",
};

const ChapterColour = {
  default: "bg-brand-700",
};

export function ResourceListItem({
  ResourceName,
  ChapterName,
  UploadDate,
  type,
}: ResourceListItemProps) {
  return (
    <div className="border-brand-100 flex items-center justify-between border-b py-4">
      {/* Resource name with icon */}
      <div className="flex w-1/3 items-center gap-3">
        <span className="text-soil-900">{Icon[type]}</span>
        <span className="text-soil-900 font-medium">{ResourceName}</span>
      </div>
      {/* Chapter name with coloured bar */}
      <div className="flex w-1/3 items-center gap-2">
        <div className={`h-5 w-1 rounded-sm ${ChapterColour.default}`} />
        <span className="text-soil-700 font-medium">{ChapterName}</span>
      </div>
      {/* Upload date */}
      <span className="text-soil-700 w-1/3 text-right">{UploadDate}</span>
    </div>
  );
}
