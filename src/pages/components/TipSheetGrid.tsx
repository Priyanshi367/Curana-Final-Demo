import React from 'react';
import TipSheetCard from './TipSheetCard';
import { cn } from '@/lib/utils';

interface TipSheetDocument {
  id: string;
  title: string;
  fileName: string;
  category: string;
  thumbnail?: string;
}

interface TipSheetGridProps {
  documents: TipSheetDocument[];
  filteredDocuments: TipSheetDocument[];
  isLoading?: boolean;
  selectedCards?: Set<string>;
  onCardSelect?: (cardId: string) => void;
}

const TipSheetGrid: React.FC<TipSheetGridProps> = ({ 
  documents, 
  filteredDocuments, 
  isLoading = false,
  selectedCards = new Set(),
  onCardSelect
}) => {
  const displayDocuments = filteredDocuments.length > 0 ? filteredDocuments : documents;
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="bg-card rounded-lg shadow-sm border border-border overflow-hidden animate-pulse">
            <div className="aspect-[5/4] bg-muted"></div>
            <div className="p-3 space-y-2">
              <div className="h-2.5 bg-muted rounded w-full"></div>
              <div className="h-2 bg-muted rounded w-3/4"></div>
              <div className="h-3.5 bg-muted rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (displayDocuments.length === 0) {
    return (
      <div className="text-center py-8 sm:py-16">
        <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">No documents found</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto px-4">
          Try adjusting your filters or check back later for more documents.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
      {displayDocuments.map((document) => (
        <TipSheetCard 
          key={document.id} 
          document={document} 
          isSelected={selectedCards.has(document.id)}
          onSelect={onCardSelect}
        />
      ))}
    </div>
  );
};

export default TipSheetGrid;
