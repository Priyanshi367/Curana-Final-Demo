import React, { useState } from "react";
import {
  ChevronDown,
  Home,
  FileText,
  BookOpen,
  Stethoscope,
  ClipboardList,
  CheckCircle,
  Calendar,
  LifeBuoy,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: string[];
}

interface TopNavProps {
  selectedTop: string | null;
  selectedChild: string | null;
  onSelectTop: (id: string) => void;
  onSelectChild: (topId: string, child: string) => void;
}

const menu: MenuItem[] = [
  { id: "Home", label: "Home", icon: Home },
  {
    id: "Tip Sheets",
    label: "Tip Sheets",
    icon: FileText,
  },
  {
    id: "Resource Hub",
    label: "Resource Hub",
    icon: BookOpen,
    children: [
      "Advance Primary Care Management (APCM)",
      "HCCs",
      "Quality Incentive Program",
      "Behavioral Health",
      "Senior Living",
    ]
  },

  {
    id: "Clinical Tools",
    label: "Clinical Tools",
    icon: Stethoscope,
    children: ["Ambience", "InNote/InCare", "GEHRIMED", "PEARL"],
  },
  { id: "Clinical Education", label: "Clinical Education", icon: ClipboardList },
  { id: "CDI", label: "CDI", icon: CheckCircle },
  { id: "Quality", label: "Quality", icon: CheckCircle },
  {
    id: "Events",
    label: "Events",
    icon: Calendar,
    children: ["Town Halls", "Office Hours"],
  },
  { id: "Support Center", label: "Support Center", icon: LifeBuoy },
  // { id: "Edit", label: "Edit", icon: Edit3 },
];

const TopNav: React.FC<TopNavProps> = ({ selectedTop, selectedChild, onSelectTop, onSelectChild }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleTopClick = (m: MenuItem) => {
    if (m.children) {
      setOpenDropdown(openDropdown === m.id ? null : m.id);
      // Don't navigate to the parent if it has children
    } else {
      onSelectTop(m.id);
      setOpenDropdown(null);
      setMobileOpen(false);
    }
  };

  const handleChildClick = (topId: string, child: string) => {
    onSelectChild(topId, child);
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <nav className="bg-secondary shadow-elegant px-3 md:px-4 top-[56px] border-b border-border">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center gap-1">
            {menu.map((m) => {
              const Icon = m.icon;
              const isTopSelected = selectedTop === m.id;
              const hasChildren = Array.isArray(m.children) && m.children.length > 0;
              const isOpen = openDropdown === m.id;

              return (
                <div key={m.id} className="relative" data-dropdown>
                  <button
                    onClick={() => handleTopClick(m)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 relative whitespace-nowrap",
                      "border-b-[3px] -mb-[1px] rounded-lg",
                      isTopSelected
                        ? "bg-primary/5 border-b-primary text-primary"
                        : "border-b-transparent text-muted-foreground hover:bg-primary/5 hover:text-primary",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{m.label}</span>
                    {hasChildren && (
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          isOpen && "rotate-180"
                        )}
                      />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {hasChildren && isOpen && (
                    <div className="absolute top-full left-0 mt-1 min-w-[220px] bg-background border border-border rounded-lg shadow-elegant overflow-hidden z-[60]">
                      <div className="py-1">
                        {m.children?.map((child) => {
                          const isActiveChild = selectedChild === child;
                          return (
                            <button
                              key={child}
                              onClick={() => handleChildClick(m.id, child)}
                              className={cn(
                                "w-full text-left px-4 py-2 text-sm transition-colors",
                                isActiveChild
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                              )}
                            >
                              {child}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tablet Navigation */}
      <div className="hidden md:block lg:hidden">
        <div className="flex items-center justify-between px-4 overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max">
            {menu.map((m) => {
              const Icon = m.icon;
              const isTopSelected = selectedTop === m.id;
              const hasChildren = Array.isArray(m.children) && m.children.length > 0;
              const isOpen = openDropdown === m.id;

              return (
                <div key={m.id} className="relative" data-dropdown>
                  <button
                    onClick={() => handleTopClick(m)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 text-xs font-medium transition-all duration-200 relative whitespace-nowrap",
                      "border-b-[3px] -mb-[1px] rounded-lg",
                      isTopSelected
                        ? "bg-primary/5 border-b-primary text-primary"
                        : "border-b-transparent text-muted-foreground hover:bg-primary/5 hover:text-primary",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{m.label}</span>
                    <span className="sm:hidden">{m.label.split(' ')[0]}</span>
                    {hasChildren && (
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform",
                          isOpen && "rotate-180"
                        )}
                      />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {hasChildren && isOpen && (
                    <div className="absolute top-full left-0 mt-1 min-w-[180px] bg-background border border-border rounded-lg shadow-lg overflow-hidden z-[60] max-h-[60vh] overflow-y-auto">
                      <div className="py-1">
                        {m.children?.map((child) => {
                          const isActiveChild = isTopSelected && selectedChild === child;
                          return (
                            <button
                              key={child}
                              onClick={() => handleChildClick(m.id, child)}
                              className={cn(
                                "w-full text-left px-3 py-2 text-xs transition-colors",
                                isActiveChild
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              )}
                            >
                              {child}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden relative">
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-1.5 rounded-full bg-primary/70" />
            <span className="font-semibold text-sm">Navigation</span>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-2 rounded-lg p-2 hover:bg-muted/50 transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu Backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-border bg-background relative z-50 md:hidden">
            <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
              {menu.map((m) => {
                const Icon = m.icon;
                const isTopSelected = selectedTop === m.id;
                const hasChildren = Array.isArray(m.children) && m.children.length > 0;
                const isOpen = openDropdown === m.id;

                return (
                  <div key={m.id} className="space-y-1">
                    <button
                      onClick={() => handleTopClick(m)}
                      className={cn(
                        "flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isTopSelected
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span>{m.label}</span>
                      {hasChildren && (
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform ml-auto",
                            isOpen && "rotate-180"
                          )}
                        />
                      )}
                    </button>

                    {/* Mobile Submenu */}
                    {hasChildren && isOpen && (
                      <div className="ml-7 space-y-1">
                        {m.children?.map((child) => {
                          const isActiveChild = isTopSelected && selectedChild === child;
                          return (
                            <button
                              key={child}
                              onClick={() => handleChildClick(m.id, child)}
                              className={cn(
                                "w-full text-left rounded-lg px-3 py-2 text-sm transition-colors",
                                isActiveChild
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                              )}
                            >
                              {child}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNav;
