import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, ArrowRight, Star, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import teams from "@/assets/microsoft.png";
import outlook from "@/assets/outlook.png";
import workdaylogo from "@/assets/workdaylogo.png";
import epiclogo from "@/assets/epiclogo.png";
import uptodatelog from "@/assets/uptodatelog.png";
import navanlogo from "@/assets/navanlogo.png";
import perkspotlogo from "@/assets/perkspotlogo.png";
import hrconnectlogo from "@/assets/hrconnectlogo.png";
import financelog from "@/assets/financelog.png";
import supportdesk from "@/assets/supportdesk.png";

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
  { id: "finance", name: "Finance Tracker", logo: financelog, url: "#" },
  { id: "compliance", name: "Compliance Portal", logo: "https://curana-connect-portal.lovable.app/assets/compliance-logo-CUCUm5LO.png", url: "#" },
  { id: "support", name: "Support Desk", logo: supportdesk, url: "#" },
];

const ApplicationsGrid = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem("favoriteApps");
    return stored ? JSON.parse(stored) : [];
  });

  const [appOrder, setAppOrder] = useState<string[]>(() => {
    const stored = localStorage.getItem("appOrder");
    return stored ? JSON.parse(stored) : defaultApplications.map(app => app.id);
  });

  const [favoriteOrder, setFavoriteOrder] = useState<string[]>(() => {
    const stored = localStorage.getItem("favoriteOrder");
    return stored ? JSON.parse(stored) : [];
  });

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("favoriteApps", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("appOrder", JSON.stringify(appOrder));
  }, [appOrder]);

  useEffect(() => {
    localStorage.setItem("favoriteOrder", JSON.stringify(favoriteOrder));
  }, [favoriteOrder]);

  const toggleFavorite = (appId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const newFavorites = prev.includes(appId) 
        ? prev.filter((id) => id !== appId) 
        : [...prev, appId];
      
      if (newFavorites.includes(appId) && !favoriteOrder.includes(appId)) {
        setFavoriteOrder([...favoriteOrder, appId]);
      } else if (!newFavorites.includes(appId)) {
        setFavoriteOrder(favoriteOrder.filter(id => id !== appId));
      }
      
      return newFavorites;
    });
  };

  const handleDragStart = (appId: string, e: React.DragEvent, isFavoriteSection: boolean) => {
    setDraggedItem(appId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("appId", appId);
    e.dataTransfer.setData("isFavoriteSection", String(isFavoriteSection));
    
    // Create a custom drag image
    const dragElement = e.currentTarget as HTMLElement;
    const clone = dragElement.cloneNode(true) as HTMLElement;
    clone.style.position = "absolute";
    clone.style.top = "-9999px";
    clone.style.width = dragElement.offsetWidth + "px";
    clone.style.opacity = "0.8";
    clone.style.transform = "rotate(3deg)";
    clone.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    document.body.appendChild(clone);
    e.dataTransfer.setDragImage(clone, dragElement.offsetWidth / 2, dragElement.offsetHeight / 2);
    setTimeout(() => document.body.removeChild(clone), 0);
  };

  const handleDragOver = (appId: string, e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedItem !== appId) {
      setDraggedOverItem(appId);
    }
  };

  const handleDragLeave = () => {
    setDraggedOverItem(null);
  };

  const handleDrop = (targetAppId: string, e: React.DragEvent, isFavoriteSection: boolean) => {
    e.preventDefault();
    const draggedAppId = e.dataTransfer.getData("appId");
    const fromFavoriteSection = e.dataTransfer.getData("isFavoriteSection") === "true";

    if (draggedAppId === targetAppId) {
      setDraggedItem(null);
      setDraggedOverItem(null);
      return;
    }

    if (isFavoriteSection && fromFavoriteSection) {
      // Reorder within favorites
      const newOrder = [...favoriteOrder];
      const draggedIndex = newOrder.indexOf(draggedAppId);
      const targetIndex = newOrder.indexOf(targetAppId);
      
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedAppId);
      
      setFavoriteOrder(newOrder);
    } else if (!isFavoriteSection && !fromFavoriteSection) {
      // Reorder within main apps
      const newOrder = [...appOrder];
      const draggedIndex = newOrder.indexOf(draggedAppId);
      const targetIndex = newOrder.indexOf(targetAppId);
      
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedAppId);
      
      setAppOrder(newOrder);
    }

    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  const getOrderedApps = (appIds: string[]): Application[] => {
    return appIds
      .map(id => defaultApplications.find(app => app.id === id))
      .filter((app): app is Application => app !== undefined);
  };

  const favoriteApps = getOrderedApps(favoriteOrder.filter(id => favorites.includes(id)));
  const regularApps = getOrderedApps(appOrder);

  const AppCard = ({ 
    app, 
    showFavorite = true, 
    isFavoriteSection = false 
  }: { 
    app: Application; 
    showFavorite?: boolean; 
    isFavoriteSection?: boolean;
  }) => {
    const isFavorite = favorites.includes(app.id);
    const isDragging = draggedItem === app.id;
    const isDraggedOver = draggedOverItem === app.id;
    
    return (
      <div
        draggable
        onDragStart={(e) => handleDragStart(app.id, e, isFavoriteSection)}
        onDragOver={(e) => handleDragOver(app.id, e)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(app.id, e, isFavoriteSection)}
        onDragEnd={handleDragEnd}
        className={cn(
          "block group relative cursor-move transition-all duration-200",
          isDragging && "opacity-30 scale-95",
          isDraggedOver && !isDragging && "scale-105 ring-2 ring-accent ring-offset-2"
        )}
      >
        <a href={app.url} onClick={(e) => e.preventDefault()} className="block">
          <div className={cn(
            "p-3 sm:p-4 rounded-lg transition-all text-center h-24 sm:h-28 flex flex-col items-center justify-center border-2 relative",
            isDragging ? "border-dashed border-accent/50 bg-accent/5" : "border-transparent hover:border-accent/20 hover:bg-accent/5",
            isDraggedOver && !isDragging && "bg-accent/10 border-accent"
          )}>
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                <GripVertical className="h-6 w-6 text-accent animate-pulse" />
              </div>
            )}
            <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            {showFavorite && (
              <button
                onClick={(e) => toggleFavorite(app.id, e)}
                className={cn(
                  "absolute top-1 right-1 h-6 w-6 rounded-full flex items-center justify-center transition-all z-10 shadow-sm",
                  isFavorite ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
                style={isFavorite ? { background: 'var(--header-gradient)' } : {}}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star
                  className={cn(
                    "h-3 w-3 transition-colors",
                    isFavorite ? "fill-white text-white" : "text-muted-foreground"
                  )}
                />
              </button>
            )}
            <img
              src={app.logo}
              alt={app.name}
              className={cn(
                "h-8 w-8 sm:h-10 sm:w-10 object-contain mb-2 transition-transform pointer-events-none",
                !isDragging && "group-hover:scale-110"
              )}
            />
            <p className="text-xs font-medium text-foreground line-clamp-2 pointer-events-none">{app.name}</p>
          </div>
        </a>
      </div>
    );
  };

  return (
    <Card className="p-4 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
            <LayoutGrid className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">All Applications</h2>
            <p className="text-xs text-muted-foreground hidden sm:block">Drag to reorder</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-accent hover:text-accent hover:font-semibold hover:text-white hidden sm:inline-flex text-xs sm:text-sm"
        >
          View All <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 flex-1">
        {regularApps.map((app) => (
          <AppCard key={app.id} app={app} isFavoriteSection={false} />
        ))}

        {/* Add More Apps */}
        <div className="p-4 border-2 border-dashed border-border hover:border-accent hover:bg-accent/5 rounded-xl transition-all text-center h-24 sm:h-28 flex flex-col items-center justify-center cursor-pointer group">
          <div className="h-10 w-10 rounded-lg bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-2 transition-colors">
            <Plus className="h-5 w-5 text-accent" />
          </div>
          <p className="text-xs font-medium text-muted-foreground group-hover:text-accent transition-colors">Add App</p>
        </div>
      </div>

      {/* Mobile View All button */}
      <div className="mt-4 sm:hidden">
        <Button variant="ghost" size="sm" className="w-full text-accent hover:font-semibold hover:text-white">
          View All Apps <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
};

export default ApplicationsGrid;
