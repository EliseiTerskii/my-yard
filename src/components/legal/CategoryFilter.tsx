import { cn } from "@/lib/utils";
import {useMaterialsFilters} from "@/hooks/useMaterialsFilters.ts";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterSkeleton = () => (
    <section className="">
      <div className="mx-auto">
        <div className="">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 w-24 bg-muted rounded-lg animate-pulse"/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
);

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const {data, isLoading} = useMaterialsFilters()
  const categories = data?.topics

  if (isLoading) {
    return <FilterSkeleton/>
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
          onClick={() => onCategoryChange('')}
          className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
              !selectedCategory
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
          )}
      >
        Все
      </button>
      {categories.map((category) => (
        <button
          key={`category-${category}`}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
            selectedCategory === category
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-transparent text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
