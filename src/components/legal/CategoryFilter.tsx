import { cn } from "@/lib/utils";
import { categories } from "@/data/legalArticles";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
            selectedCategory === category.id
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-transparent text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
