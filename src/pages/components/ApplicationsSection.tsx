import React from "react";
import AppCard, { App } from "./AppCard";
import { ImageIcon, Stethoscope, Users } from "lucide-react";

interface ApplicationsSectionProps {
  title: string;
  description?: string;
  apps: App[];
  icon?: "stethoscope" | "users" | React.ReactNode;
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void;
}

const ApplicationsSection: React.FC<ApplicationsSectionProps> = ({
  title,
  description,
  apps,
  icon,
  onFavoriteToggle,
}) => {
  const renderIcon = () => {
    if (typeof icon === "string") {
      switch (icon) {
        case "stethoscope":
          return <Stethoscope className="h-4 w-4 text-primary" />;
        case "users":
          return <Users className="h-4 w-4 text-primary" />;
        default:
          return <ImageIcon className="h-4 w-4 text-primary" />;
      }
    }
    return icon || <ImageIcon className="h-4 w-4 text-primary" />;
  };

  return (
    <section className="mb-8 last:mb-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
            {renderIcon()}
          </div>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

        {description && <div className="text-sm text-muted-foreground">{description}</div>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-6">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} onFavoriteToggle={onFavoriteToggle} />
        ))}
      </div>
    </section>
  );
};

export default ApplicationsSection;
