import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import teams from "@/assets/microsoft.png";
import outlook from "@/assets/outlook.png";
import workdaylogo from "@/assets/workdaylogo.png";
import epiclogo from "@/assets/epiclogo.png";
import uptodatelog from "@/assets/uptodatelog.png";
import navanlogo from "@/assets/navanlogo.png";
import perkspotlogo from "@/assets/perkspotlogo.png";
import hrconnectlogo from "@/assets/hrconnectlogo.png";

type Application = {
  id: string;
  name: string;
  logo: string;
  url: string;
};

const defaultApplications: Application[] = [
  { id: "teams", name: "Microsoft Teams", logo: teams, url: "#" },
  { id: "outlook", name: "Outlook", logo: outlook, url: "#" },
  { id: "workday", name: "Workday", logo: workdaylogo, url: "#" },
  { id: "epic", name: "Epic EHR", logo: epiclogo, url: "#" },
  { id: "uptodate", name: "UpToDate", logo: uptodatelog, url: "#" },
  { id: "navan", name: "Navan Travel", logo: navanlogo, url: "#" },
  { id: "perkspot", name: "PerkSpot", logo: perkspotlogo, url: "#" },
  { id: "hrconnect", name: "HR Connect", logo: hrconnectlogo, url: "#" },
];

const FavoriteAppsCarousel = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favoriteApps");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFavorites(parsed);
          return;
        }
      }
      // If we get here, either stored is null/undefined or not a valid array
      const defaultFavorites = ["teams", "outlook", "epic", "workday", "uptodate"];
      setFavorites(defaultFavorites);
      localStorage.setItem("favoriteApps", JSON.stringify(defaultFavorites));
    } catch (error) {
      console.error('Error parsing favorites from localStorage:', error);
      const defaultFavorites = ["teams", "outlook", "epic", "workday", "uptodate"];
      setFavorites(defaultFavorites);
      localStorage.setItem("favoriteApps", JSON.stringify(defaultFavorites));
    }
  }, []);

  const favoriteApps = defaultApplications.filter(app => favorites.includes(app.id));

  if (favoriteApps.length === 0) return null;

  return (
    <Card className="p-4 sm:p-6 h-[180px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Star className="h-4 w-4 sm:h-4 sm:w-4 text-accent fill-accent" />
        </div>
        <h2 className="text-base sm:text-lg font-semibold">Favorite Apps</h2>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 flex-1">
        {favoriteApps.map((app) => (
          <a
            key={app.id}
            href={app.url}
            className="group flex flex-col items-center gap-2"
          >
            <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 p-2.5 flex items-center justify-center group-hover:scale-110 transition-all shadow-sm border border-gray-200 dark:border-gray-500">
              {/* Star badge on top right with gradient */}
              <div 
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center shadow-md z-20" 
                style={{ background: 'var(--header-gradient)' }}
              >
                <Star className="h-2 w-2 text-white fill-white" />
              </div>
              <img
                src={app.logo}
                alt={app.name}
                className="h-full w-full object-contain relative z-10"
              />
            </div>
            <p className="text-[10px] text-foreground text-center line-clamp-1 w-full font-medium">
              {app.name}
            </p>
          </a>
        ))}
      </div>
    </Card>
  );
};

export default FavoriteAppsCarousel;
