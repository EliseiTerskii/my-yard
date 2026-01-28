import {cn} from "@/lib/utils";
import {X} from "lucide-react";
import {useLecturesFilters} from "@/hooks/useLecturesFilters.ts";
import {Simulate} from "react-dom/test-utils";

interface TagFilterProps {
    selectedTags: string[];
    onTagChange: (tag: string) => void;
}

const FilterSkeleton = () => (
    <section className="pb-8">
        <div className="mx-auto">
            <div className="">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-5 w-16 bg-muted rounded-lg animate-pulse"/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const TagFilter = ({selectedTags, onTagChange}: TagFilterProps) => {
    const {data, isLoading} = useLecturesFilters()
    const tags = data?.tags

    if (isLoading) {
        return <FilterSkeleton/>
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground mr-1">Темы:</span>
            {tags && tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => onTagChange(tag)}
                    className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
                        selectedTags.includes(tag)
                            ? "bg-primary/10 text-primary border-primary/30"
                            : "bg-transparent text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                    )}
                >
                    {tag}
                    {selectedTags.includes(tag) && (
                        <X className="w-3 h-3 ml-1.5 inline-block"/>
                    )}
                </button>
            ))}
        </div>
    );
};

export default TagFilter;
