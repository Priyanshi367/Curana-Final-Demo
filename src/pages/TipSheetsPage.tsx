import React, { useState, useMemo } from 'react';
import SidebarCategoryList from './components/SidebarCategoryList';
import TipSheetGrid from './components/TipSheetGrid';
import { cn } from '@/lib/utils';

interface TipSheetDocument {
  id: string;
  title: string;
  fileName: string;
  category: string;
  thumbnail?: string;
}

// Sample data for the specified categories
const sampleDocuments: TipSheetDocument[] = [
  // Annual Wellness Visit
  {
    id: '1',
    title: 'Annual Wellness Visit Overview 2025',
    fileName: 'AWV_Overview_2025.pdf',
    category: 'Annual Wellness Visit',
  },
  {
    id: '2',
    title: 'Preventative Screenings Guide',
    fileName: 'Preventative_Screenings_2024.pdf',
    category: 'Annual Wellness Visit',
  },
  {
    id: '3',
    title: 'Vaccine Schedule 2024–2025',
    fileName: 'Vaccine_Guide_2024_2025.pdf',
    category: 'Annual Wellness Visit',
  },
  // Behavioral Health
  {
    id: '4',
    title: 'Depression Screening Tool',
    fileName: 'Depression_Screening_Tip_Sheet.pdf',
    category: 'Behavioral Health',
  },
  {
    id: '5',
    title: 'Anxiety Assessment Flowchart',
    fileName: 'Anxiety_Assessment_Flow.pdf',
    category: 'Behavioral Health',
  },
  // Cardiology
  {
    id: '6',
    title: 'Heart Failure Management Overview',
    fileName: 'Heart_Failure_Management_Overview.pdf',
    category: 'Cardiology',
  },
  // APCM
  {
    id: '7',
    title: 'Advanced Primary Care Management Guide',
    fileName: 'APCM_Implementation_Guide.pdf',
    category: 'APCM',
  },
  // HCC
  {
    id: '8',
    title: 'HCC Coding Best Practices',
    fileName: 'HCC_Coding_Best_Practices.pdf',
    category: 'HCCs',
  },
  // CDI
  {
    id: '9',
    title: 'Clinical Documentation Improvement',
    fileName: 'CDI_Guidelines_2024.pdf',
    category: 'CDI',
  },
  // Clinical Pathways
  {
    id: '10',
    title: 'Diabetes Care Pathway',
    fileName: 'Diabetes_Care_Pathway.pdf',
    category: 'Clinical Pathways',
  },
  // E&M/CPT
  {
    id: '11',
    title: 'Evaluation & Management Coding Guide',
    fileName: 'EM_CPT_Coding_Guide.pdf',
    category: 'E&M/CPT',
  },
  // Population Health
  {
    id: '12',
    title: 'Population Health Management Strategies',
    fileName: 'Population_Health_Strategies.pdf',
    category: 'Population Health',
  },
];

// Exact categories as specified by the user
const categories = [
  "Advance Care Planning",
  "Annual Wellness Visit",
  "APCM",
  "Behavioral Health",
  "Cardiology",
  "CDI",
  "Clinical Pathways",
  "Coaching",
  "Dermatology",
  "Diabetes",
  "E&M/CPT",
  "Endocrinology",
  "Fall Prevention",
  "Gastroenterology",
  "Geriatrics",
  "HCCs",
  "Hospitalist",
  "Immunizations",
  "Infectious Disease",
  "Labs",
  "Medication Management",
  "Nephrology",
  "Neurology",
  "OB/GYN",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pain Management",
  "Patient Education",
  "Podiatry",
  "Population Health",
  "Preventative Care",
  "Pulmonology",
  "Quality",
  "Radiology",
  "Referrals",
  "Rheumatology",
  "Screenings",
  "Senior Living",
  "Social Determinants of Health",
  "Surgery",
  "Transitions of Care",
  "Urgent Care",
  "Urology",
  "Vaccines",
];

const TipSheetsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());

  const filteredDocuments = useMemo(() => {
    if (!selectedCategory) return [];
    return sampleDocuments.filter(doc => doc.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setIsLoading(true);
    // Simulate loading for better UX
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleCardSelect = (cardId: string) => {
    setSelectedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    const displayDocuments = selectedCategory ? filteredDocuments : sampleDocuments;
    const allIds = new Set(displayDocuments.map(doc => doc.id));
    setSelectedCards(allIds);
  };

  const handleClearSelection = () => {
    setSelectedCards(new Set());
  };

  const displayCount = selectedCategory ? filteredDocuments.length : sampleDocuments.length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-4">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

    <div className="flex items-center gap-3">
      <div className="h-5 w-1.5 rounded-full bg-primary/70" />
      <p className="text-sm sm:text-base text-muted-foreground flex items-center gap-2">
        {selectedCategory ? (
          <>
            Showing results for
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
              {selectedCategory}
            </span>
          </>
        ) : (
          <>Browse tip sheet categories</>
        )}
      </p>
    </div>

    <div className="flex items-end gap-2">
      <span className="text-3xl font-bold text-primary leading-none">{displayCount}</span>
      <span className="text-xs sm:text-sm text-muted-foreground mb-1">
        {selectedCategory ? 'matched' : 'available'}
      </span>
    </div>

  </div>
</div>


      {/* Main Content */}
      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
        {/* Sidebar */}
        <div className="xl:w-80 flex-shrink-0">
          <SidebarCategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <TipSheetGrid
            documents={sampleDocuments}
            filteredDocuments={filteredDocuments}
            isLoading={isLoading}
            selectedCards={selectedCards}
            onCardSelect={handleCardSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default TipSheetsPage;
