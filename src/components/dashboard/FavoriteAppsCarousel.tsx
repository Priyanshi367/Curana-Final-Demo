import { useState, useEffect, useRef, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import gehrimedImg from "@/assets/gehrimed.png";
import pearlImg from "@/assets/pearl.png";
import goToImg from "@/assets/goto.png";
import inCareImg from "@/assets/incare.png";
import vitalCheckImg from "@/assets/vitalcheck.png";
import defirstImg from "@/assets/defirst.png";
import sutureHealthImg from "@/assets/suturehealth.png";
import curanaHealthLogo from "@/assets/curanahealth.png";

type Application = {
  id: string;
  name: string;
  logo: string;
  url: string;
};

const defaultApplications: Application[] = [
  { id: "gehrimed", name: "GEHRIMED", logo: gehrimedImg, url: "#" },
  { id: "pearl", name: "Pearl", logo: pearlImg, url: "#" },
  { id: "goto", name: "GoTo", logo: goToImg, url: "#" },
  { id: "incare", name: "InCare", logo: inCareImg, url: "#" },
  { id: "vitalcheck", name: "VitalCheck", logo: vitalCheckImg, url: "#" },
  // { id: "drfirst", name: "DrFirst", logo: defirstImg, url: "#" },
  { id: "suturehealth", name: "SutureHealth", logo: sutureHealthImg, url: "#" },
  { id: "umdi", name: "UM Document Intelligence", logo: curanaHealthLogo, url: "#" },
  { id: "docwrangler", name: "Document Wrangler", logo: curanaHealthLogo, url: "#" }
];

const FavoriteAppsCarousel = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Initialize state with default values first to prevent flash of empty state
    const defaultFavorites = defaultApplications.map(app => app.id);
    
    // Try to load from localStorage, but don't block initial render
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem("favoriteApps");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
        // If no valid stored data, set default and save to localStorage
        localStorage.setItem("favoriteApps", JSON.stringify(defaultFavorites));
        return defaultFavorites;
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        return defaultFavorites;
      }
    }
    return defaultFavorites;
  });

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favoriteApps", JSON.stringify(favorites));
    }
  }, [favorites]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [hasFavorites, setHasFavorites] = useState(false);

  // Filter favorite apps and update hasFavorites state
  const favoriteApps = useMemo(() => 
    defaultApplications.filter(app => favorites.includes(app.id)),
    [favorites]
  );

  useEffect(() => {
    setHasFavorites(favoriteApps.length > 0);
  }, [favoriteApps]);

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = direction === 'left' ? -200 : 200;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Initial check
    checkScroll();
    
    // Setup event listeners
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    
    // Cleanup function
    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [favorites]);

  return (
    <Card className="pt-4 px-3 pb-3 sm:pt-5 sm:px-4 md:pt-6 md:px-6 min-h-[180px] sm:min-h-[220px] flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 relative z-20">
            <Star className="h-4 w-4 sm:h-4 sm:w-4 text-accent fill-accent" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold">Favorite Apps</h2>
        </div>
        <div className="flex gap-2 sm:hidden">
          <button 
            onClick={() => scroll('left')}
            className={`p-1 rounded-full transition-all z-10 ${
              showLeftArrow 
                ? 'bg-accent shadow-md' 
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className={`p-1 rounded-full transition-all z-10 ${
              showRightArrow 
                ? 'bg-accent shadow-md' 
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>

      {/* Apps Grid */}
      <div 
        ref={containerRef}
        className="w-full flex-1 flex items-center gap-5 sm:gap-6 overflow-x-auto pb-3 sm:pb-0 scrollbar-hide relative px-4"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        {/* Custom scrollbar for WebKit */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `
        }} />
        {favoriteApps.map((app) => (
          <div key={app.id} className="flex-shrink-0 w-18 sm:w-24">
            <a
              href={app.url}
              className="group flex flex-col items-center justify-center gap-1.5 sm:gap-2 w-full"
              aria-label={`Open ${app.name}`}
            >
              <div className="relative h-16 w-16 sm:h-18 sm:w-18 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 p-1 flex items-center justify-center group-hover:scale-105 active:scale-95 transition-transform duration-200 shadow-sm border border-gray-200 dark:border-gray-500 z-10">
                <div 
                  className="absolute -top-1.5 -right-1.5 h-4 w-4 sm:h-5 sm:w-5 rounded-full flex items-center justify-center shadow-md z-30" 
                  style={{ background: 'var(--header-gradient)' }}
                >
                  <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white fill-white" />
                </div>
                <img
                  src={app.logo}
                  alt=""
                  className="h-12 w-12 sm:h-14 sm:w-14 object-contain relative z-10"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] xs:text-xs text-foreground text-center line-clamp-2 w-full font-medium leading-tight">
                {app.name}
              </p>
            </a>
          </div>
        ))}
      </div>
      
      {/* Desktop arrows */}
      <div className="hidden sm:flex absolute inset-y-0 left-0 right-0 px-2 items-center justify-between pointer-events-none">
        <button 
          onClick={() => scroll('left')}
          className={`p-2 rounded-full bg-accent shadow-lg pointer-events-auto transition-all z-10 ${
            showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className={`p-2 rounded-full bg-accent shadow-lg pointer-events-auto transition-all z-10 ${
            showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>
    </Card>
  );
};

export default FavoriteAppsCarousel;
