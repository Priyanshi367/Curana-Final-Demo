import React from "react";
import { cn } from "@/lib/utils";

interface SidebarCategoryListProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const SidebarCategoryList: React.FC<SidebarCategoryListProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-2 sm:p-3">
        {/* ALL DOCUMENTS */}
        <button
          onClick={() => onCategorySelect(null)}
          className={cn(
            "w-full flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-xl transition",
            !selectedCategory
              ? "bg-primary/10 text-primary font-medium border-l-4 border-primary"
              : "text-foreground hover:bg-muted"
          )}
        >
          All Documents
        </button>

        {/* CATEGORY LIST */}
        {categories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={cn(
                "w-full flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-xl transition-all",
                isSelected
                  ? "bg-primary/10 text-primary font-medium border-l-4 border-primary"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarCategoryList;
