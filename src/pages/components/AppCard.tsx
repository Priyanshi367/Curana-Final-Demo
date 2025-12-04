import { Card } from "@/components/ui/card";
import { Sparkles, Star, ImageIcon } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface App {
  id: string;
  name: string;
  description: string;
  image?: string;
  popular?: boolean;
  category?: string;
  lastUsed?: string;
}

interface AppCardProps {
  app: App;
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!app) return null;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite);
    onFavoriteToggle?.(app.id, newFavorite);
  };

  const lastUsedLabel = app.lastUsed
    ? `Last used • ${new Date(app.lastUsed).toLocaleDateString()}`
    : undefined;

  return (
    <div className="group relative cursor-pointer">
      <Card className="h-full flex flex-col p-0 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary/70"></div>
        <div className="p-3">
          <div className="relative h-40 rounded-lg overflow-hidden bg-gradient-to-br from-muted/10 to-muted/5 flex items-center justify-center">
            {app.image && !imgError ? (
              <img
                src={app.image}
                alt={app.name}
                className="h-40 w-40 object-contain transition-transform duration-200 group-hover:scale-110"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <div className="h-32 w-32 rounded-full bg-muted/10 flex items-center justify-center">
                  <ImageIcon className="h-16 w-16" />
                </div>
                <span className="text-[11px]">No logo</span>
              </div>
            )}

            <button
              onClick={handleFavoriteClick}
              className={cn(
                "absolute top-1 right-1 h-7 w-7 rounded-full flex items-center justify-center transition-all z-10 shadow-sm",
                isFavorite
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              )}
              style={isFavorite ? { background: 'var(--header-gradient)' } : {}}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={isFavorite}
            >
              <Star
                className={cn(
                  "h-3 w-3 transition-colors",
                  isFavorite ? "fill-white text-white" : "text-muted-foreground"
                )}
              />
            </button>

            {app.popular && (
              <span className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white font-medium flex items-center gap-1 shadow">
                <Sparkles className="w-3 h-3" /> Popular
              </span>
            )}
          </div>

          <div className="px-1">
            <h3 className="font-medium text-sm md:text-base text-foreground line-clamp-1 leading-tight">
              {app.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5">
              {app.description}
            </p>
            {/* {app.category && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted/10 text-muted-foreground font-medium whitespace-nowrap">
                {app.category}
              </span>
            )} */}
          </div>

          {lastUsedLabel && (
            <div className="mt-2 text-[11px] text-muted-foreground">{lastUsedLabel}</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AppCard;
