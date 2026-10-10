const categoryStyles = {
  "Chin News": "bg-[#2f8175] text-white",
  "Myanmar News": "bg-[#e7efec] text-[#286a5d]",
  "International News": "bg-[#e8edf2] text-[#31485c]",
  Sports: "bg-[#e7efec] text-[#286a5d]",
  Business: "bg-[#eee9df] text-[#6d5327]",
  Editorial: "bg-[#e8edf2] text-[#31485c]",
  Cahram: "bg-[#eee9df] text-[#6d5327]",
};

export default function CategoryBadge({ category }) {
  if (!category) return null;
  return <span className="story-category-label inline-flex items-stretch gap-2"><span className="w-[3px] rounded-full bg-[#2f8175] xl:hidden" aria-hidden="true"/><span className={`inline-flex w-fit rounded-[5px] px-2.5 py-1.5     sm:px-3  ${categoryStyles[category] || "bg-[#e7efec] text-[#286a5d]"}`}>{category}</span></span>;
}
