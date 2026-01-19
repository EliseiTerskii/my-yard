import { cn } from "@/lib/utils";
import { tags } from "@/data/lectures";
import { X } from "lucide-react";

interface TagFilterProps {
  selectedTag: string | null;
  onTagChange: (tag: string | null) => void;
}

const TagFilter = ({ selectedTag, onTagChange }: TagFilterProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground mr-1">Темы:</span>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(selectedTag === tag ? null : tag)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
            selectedTag === tag
              ? "bg-primary/10 text-primary border-primary/30"
              : "bg-transparent text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
          )}
        >
          {tag}
          {selectedTag === tag && (
            <X className="w-3 h-3 ml-1.5 inline-block" />
          )}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
