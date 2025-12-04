import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Home,
  FileText,
  BookOpen,
  Stethoscope,
  ClipboardList,
  CheckCircle,
  Calendar,
  LifeBuoy,
  Edit3,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: string[];
}

interface SidebarProps {
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
    children: [
      "Advance Primary Care Management (APCM)",
      "HCCs",
      "Quality Incentive Program",
      "Behavioral Health",
      "Senior Living",
    ],
  },
  { id: "Resource Hub", label: "Resource Hub", icon: BookOpen },
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
  { id: "Edit", label: "Edit", icon: Edit3 },
];

const Sidebar: React.FC<SidebarProps> = ({
  selectedTop,
  selectedChild,
  onSelectTop,
  onSelectChild,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    return selectedTop && menu.some((m) => m.id === selectedTop && m.children)
      ? { [selectedTop]: true }
      : {};
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!mobileOpen) return;
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [mobileOpen]);

  useEffect(() => {
    if (selectedTop) {
      setOpen((prev) => ({ ...prev, [selectedTop]: true }));
    }
  }, [selectedTop]);

  const toggleGroup = (id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
    onSelectTop(id);
  };

  const handleTopClick = (m: MenuItem) => {
    if (collapsed && m.children) {
      setCollapsed(false);
      setTimeout(() => toggleGroup(m.id), 140);
      return;
    }

    if (m.children) toggleGroup(m.id);
    else onSelectTop(m.id);
  };

  return (
    <>
      {/* Mobile: hamburger */}
      <div className="md:hidden mb-1 flex items-center justify-between">
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-md p-1.5 text-sm focus-visible:ring-2"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span className="font-medium">Menu</span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden transition-opacity",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <aside
          ref={drawerRef}
          className={cn(
            "absolute left-0 top-0 h-full w-[92%] max-w-xs bg-card shadow-2xl p-2.5",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
            "transition-transform"
          )}
        >
          <nav aria-label="Mobile primary">
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-9 w-9 rounded-full bg-muted/30 flex items-center justify-center text-xs font-semibold">
                  PR
                </div>
                <div>
                  <div className="text-xs font-semibold">Providers</div>
                  <div className="text-[11px] text-muted-foreground">
                    Navigation
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-1.5 overflow-y-auto">
                {menu.map((m) => {
                  const Icon = m.icon;
                  const isTopSelected = selectedTop === m.id;
                  const hasChildren =
                    Array.isArray(m.children) && m.children.length > 0;
                  return (
                    <div key={m.id}>
                      <button
                        onClick={() => handleTopClick(m)}
                        className={cn(
                          "flex items-center gap-2.5 w-full text-left rounded-lg px-2.5 py-2 transition-all duration-150",
                          isTopSelected
                            ? "bg-accent/10 text-accent font-medium"
                            : "text-foreground",
                          "hover:bg-muted/50 text-sm"
                        )}
                        aria-expanded={hasChildren ? !!open[m.id] : undefined}
                      >
                        <div
                          className={cn(
                            "p-1.5 rounded-lg",
                            isTopSelected
                              ? "bg-accent/20 text-accent"
                              : "bg-muted/50 text-muted-foreground"
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="flex-1 text-sm">{m.label}</span>
                        {hasChildren &&
                          (open[m.id] ? (
                            <ChevronDown className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronRight className="h-3.5 w-3.5" />
                          ))}
                      </button>

                      {hasChildren && open[m.id] && (
                        <div className="mt-0.5 ml-3 pl-3 border-l border-muted/40 flex flex-col gap-0.5">
                          {m.children?.map((child) => {
                            const isActiveChild =
                              isTopSelected && selectedChild === child;
                            return (
                              <button
                                key={child}
                                onClick={() => {
                                  onSelectChild(m.id, child);
                                  setMobileOpen(false);
                                }}
                                className={cn(
                                  "text-left w-full rounded-md py-1.5 px-2.5 transition-all duration-150 text-xs",
                                  isActiveChild
                                    ? "bg-accent/10 text-accent font-medium"
                                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
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

              <div className="mt-2 flex items-center justify-between">
                <small className="text-[11px] text-muted-foreground">
                  v1.0 • Navigation
                </small>
                <button
                  className="text-[11px] px-2 py-1 rounded-md bg-muted/50"
                  onClick={() => setMobileOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </nav>
        </aside>
      </div>

      {/* Desktop / tablet sidebar */}
      <aside className={cn("hidden md:block")}>
        <div
          className={cn(
            "bg-card/95 backdrop-blur-sm rounded-xl shadow-lg border border-border/50 h-full flex flex-col transition-all duration-300 overflow-hidden",
            collapsed ? "w-14" : "w-56"
          )}
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-border/30">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-[11px] font-semibold text-primary border border-primary/20">
                PR
              </div>
              <div
                className={cn(
                  collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                )}
              >
                <div className="text-xs font-semibold">Providers</div>
                <div className="text-[11px] text-muted-foreground">
                  Navigation
                </div>
              </div>
            </div>

            <button
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setCollapsed((c) => !c)}
              className="rounded-lg p-1.5 hover:bg-muted/50 transition-colors focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              <ChevronLeft
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  collapsed && "rotate-180"
                )}
              />
            </button>
          </div>

          <div className="px-2.5 pt-3 pb-2.5 flex-1 overflow-hidden">
            <ul className="space-y-1.5 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-border/20 scrollbar-track-transparent">
              {menu.map((m) => {
                const Icon = m.icon;
                const isTopSelected = selectedTop === m.id;
                const hasChildren =
                  Array.isArray(m.children) && m.children.length > 0;

                return (
                  <li key={m.id} className="group">
                    <button
                      title={collapsed ? m.label : undefined}
                      onClick={() => handleTopClick(m)}
                      className={cn(
                        "flex items-center gap-2.5 w-full text-left rounded-lg px-2.5 py-2 leading-5 transition-all duration-200 group",
                        isTopSelected
                          ? "bg-primary/10 text-primary font-medium shadow-sm"
                          : "text-foreground hover:bg-muted/50",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 text-sm"
                      )}
                      aria-expanded={hasChildren ? !!open[m.id] : undefined}
                      aria-current={
                        isTopSelected && !selectedChild ? "page" : undefined
                      }
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 p-1.5 rounded-lg transition-all",
                          isTopSelected
                            ? "bg-primary/20 text-primary shadow-sm"
                            : "bg-muted/50 text-muted-foreground group-hover:bg-muted/70"
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>

                      <span
                        className={cn(
                          "flex-1 text-sm font-medium transition-opacity",
                          collapsed
                            ? "opacity-0 w-0 overflow-hidden"
                            : "opacity-100"
                        )}
                      >
                        {m.label}
                      </span>

                      {hasChildren && (
                        <span
                          className={cn(
                            "flex items-center transition-transform",
                            open[m.id] ? "rotate-180" : "rotate-0"
                          )}
                        >
                          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                        </span>
                      )}
                    </button>

                    {hasChildren && open[m.id] && !collapsed && (
                      <div className="mt-0.5 ml-3 pl-3 border-l border-muted/30 flex flex-col gap-0.5">
                        {m.children?.map((child) => {
                          const isActiveChild =
                            isTopSelected && selectedChild === child;
                          return (
                            <button
                              key={child}
                              onClick={() => onSelectChild(m.id, child)}
                              className={cn(
                                "text-left w-full rounded-md py-1.5 px-3 transition-all duration-200 text-xs font-medium",
                                isActiveChild
                                  ? "bg-primary/10 text-primary shadow-sm"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                              )}
                              aria-current={isActiveChild ? "page" : undefined}
                            >
                              {child}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
