import React from 'react';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TipSheetDocument {
  id: string;
  title: string;
  fileName: string;
  category: string;
  thumbnail?: string;
}

interface TipSheetCardProps {
  document: TipSheetDocument;
  isSelected?: boolean;
  onSelect?: (cardId: string) => void;
}

const TipSheetCard: React.FC<TipSheetCardProps> = ({ document, isSelected = false, onSelect }) => {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer relative transform hover:scale-[1.02]">
      {/* Checkbox */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.(document.id);
          }}
          className={cn(
            "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
            isSelected
              ? "bg-primary border-primary text-primary-foreground"
              : "bg-background/80 backdrop-blur-sm border-gray-300 hover:border-gray-400"
          )}
        >
          {isSelected && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Thumbnail Section */}
      <div className="aspect-[5/4] bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center p-3 border-b border-border/50 group-hover:from-muted/40 group-hover:to-muted/20 transition-all duration-300">
        <div className="relative">
          <div className="bg-gradient-to-br from-white to-gray-50 p-2 rounded-md shadow-sm border border-gray-200/50 group-hover:shadow-md group-hover:border-gray-300 transition-all duration-300">
            <FileText className="h-5 w-5 text-gray-600" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-primary to-primary/80 text-white text-xs px-1.5 py-0.5 rounded font-medium shadow-sm">
            PDF
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-3">
        <h3 className="font-semibold text-xs text-foreground mb-1 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {document.title}
        </h3>
        {/* <p className="text-[10px] text-muted-foreground truncate mb-2 opacity-70">
          {document.fileName}
        </p> */}
        <div className="flex items-center justify-between mt-2">
          <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-[10px] rounded-full font-medium">
            {document.category}
          </span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipSheetCard;
