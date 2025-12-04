import { Home, Briefcase, FolderOpen, Building2, Users, BarChart3, FileText, Calendar, Newspaper, Scale, HelpCircle, Info, Network, Stethoscope, ChevronDown, Globe } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useSidebar } from "@/contexts/SidebarContext";
import { useLayout } from "@/contexts/LayoutContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import profileImg from "@/assets/profile-avatar.jpg";
import { useEffect, useState } from "react";
import { useMenuItems } from "@/hooks/useMenuItems";
import { useLocation } from "react-router-dom";

export const navItems = [
  { title: "Home", url: "/dashboard", icon: Home, color: "teal-500" },
  { title: "My Resources", url: "/resources", icon: FolderOpen, color: "violet-500" },
  { title: "Calendar", url: "/calendar", icon: Calendar, color: "pink-500" },
  { title: "News & Updates", url: "/news", icon: Newspaper, color: "sky-500" },
  { title: "Providers", url: "/providers", icon: Stethoscope, color: "green-500" },
  { title: "Departments", url: "/departments", icon: Building2, color: "indigo-500" },
  { title: "Departments Another", url: "/departments", icon: Building2, color: "indigo-500", subItems: [
    "People (HR)",
    "IT",
    "Legal"
  ] },
  { title: "Directory", url: "/directory", icon: Users, color: "cyan-500" },
  { title: "Organization Chart", url: "/organization-chart", icon: Network, color: "emerald-500" },
  { title: "My Workspace", url: "/workspace", icon: Briefcase, color: "blue-500" },
  { title: "Reports", url: "/reports", icon: BarChart3, color: "amber-500" },
  { title: "Forms", url: "/forms", icon: FileText, color: "lime-500" },
  { title: "Policies", url: "/policies", icon: Scale, color: "rose-500" },
  { title: "Help", url: "/help", icon: HelpCircle, color: "gray-500" },
  { title: "About", url: "/about", icon: Info, color: "purple-600", subItems: [
    "Network",
    { title: "Leadership", subItems: [
      { title: "Clinical Leadership", href: "https://curanahealth.com/about-us-clinical-leadership/#clinical-section" },
      { title: "Administrative Leadership", href: "https://curanahealth.com/about-us-administrative-leadership/#administrative-section" }
    ] }
  ] },
];

const Sidebar = () => { 
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { toggleLayout } = useLayout();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const [useDynamicMenu, setUseDynamicMenu] = useState(false);
  const { menuItems: dynamicMenuItems, loading, error } = useMenuItems(useDynamicMenu);

  // Auto-open dropdown if current path matches a submenu item
  useEffect(() => {
    const currentPath = location.pathname;
    
    navItems.forEach((item) => {
      const hasSubItems = (item as any).subItems && (item as any).subItems.length > 0;
      if (hasSubItems) {
        (item as any).subItems.forEach((sub: any) => {
          if (typeof sub === "string") {
            const subPath = `${(item as any).url}/${sub.toLowerCase().replace(/\s+/g, "-")}`;
            if (currentPath === subPath) {
              setOpenDropdown(item.title);
            }
          } else if (sub.subItems) {
            sub.subItems.forEach((leaf: any) => {
              if (typeof leaf === "string") {
                const leafPath = `${(item as any).url}/${sub.title.toLowerCase().replace(/\s+/g, "-")}/${leaf?.toLowerCase().replace(/\s+/g, "-")}`;
                if (currentPath === leafPath) {
                  setOpenDropdown(item.title);
                  setOpenSubDropdown(`${item.title}-${sub.title}`);
                }
              }
            });
          }
        });
      }
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-vertical-sidebar-root]")) {
        setOpenDropdown(null);
        setOpenSubDropdown(null);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Determine which menu items to use
  const displayMenuItems = useDynamicMenu ? dynamicMenuItems : navItems;

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed left-0 md:left-2 top-[70px] md:top-[86px] bottom-0 md:bottom-4 bg-sidebar md:rounded-[35px] shadow-elegant transition-all duration-300 flex flex-col overflow-hidden z-50 ${isCollapsed ? "w-0 md:w-[60px] -translate-x-full md:translate-x-0" : "w-[280px]"
          }`}
        data-vertical-sidebar-root
      >
        {/* Profile Section at Top */}
        <div className={`flex items-center gap-3 py-4 ${isCollapsed ? "justify-center px-2" : "px-4"}`}>
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
            <img src={profileImg} alt="Profile" className="h-full w-full object-cover" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-sidebar-foreground">Dr. Emily Chen</p>
              <p className="text-xs text-muted-foreground">Chief Medical Officer</p>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className={`flex-1 flex flex-col gap-3 px-2 py-2 overflow-y-auto ${isCollapsed ? 'scrollbar-none' : 'scrollbar-none scrollbar-thumb-gray-300 scrollbar-track-gray-100'}`}>
          {/* Loading/Error States for Dynamic Menu */}
          {useDynamicMenu && loading && !isCollapsed && (
            <div className="px-4 py-2 text-sm text-muted-foreground">Loading menu...</div>
          )}
          {useDynamicMenu && error && !isCollapsed && (
            <div className="px-4 py-2 text-sm text-red-500">Error: {error}</div>
          )}

          <TooltipProvider delayDuration={100}>
            {useDynamicMenu ? (
              // Dynamic Menu Rendering
              dynamicMenuItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = openDropdown === item.title;

                if (!hasChildren) {
                  return (
                    <Tooltip key={item.id}>
                      <TooltipTrigger asChild>
                        <NavLink
                          to={item.url}
                          className={`flex items-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${isCollapsed ? "justify-center p-0" : "gap-3 px-4 py-2.5 hover:bg-accent/10"}`}
                          activeClassName={isCollapsed ? "" : "bg-primary/10 text-primary font-medium"}
                        >
                          {({ isActive }) => (
                            <>
                              <div
                                className={`flex items-center justify-center rounded-full transition-all duration-200 relative ${isCollapsed ? `h-9 w-9 ${isActive ? `bg-primary ring-2 ring-primary scale-105` : `bg-gray-200 hover:scale-105`}` : ""}`}
                              >
                                <Home
                                  className={`h-5 w-5 ${isCollapsed ? (isActive ? "text-primary-foreground" : "text-gray-600") : isActive ? "text-primary" : "text-sidebar-foreground"}`}
                                />
                              </div>
                              {!isCollapsed && (
                                <span className={`text-sm ${isActive ? "text-primary" : "text-sidebar-foreground"}`}>{item.title}</span>
                              )}
                            </>
                          )}
                        </NavLink>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="ml-2 z-[100] " hidden={!isCollapsed}>
                        <p>{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                }

                // With children
                return (
                  <div key={item.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setOpenDropdown(isOpen ? null : item.title)}
                          className={`w-full flex items-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${isCollapsed ? "justify-center p-0" : "gap-3 px-4 py-2.5 hover:bg-primary/10"}`}
                        >
                          <div
                            className={`flex items-center justify-center rounded-full transition-all duration-200 relative ${isCollapsed ? "h-9 w-9 bg-gray-200" : ""}`}
                          >
                            <Home className={`h-5 w-5 ${isCollapsed ? "text-gray-600" : "text-sidebar-foreground"}`} />
                          </div>
                          {!isCollapsed && (
                            <>
                              <span className="text-sm text-sidebar-foreground flex-1 text-left">{item.title}</span>
                              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                            </>
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="ml-2 z-[100] p-0" hidden={!isCollapsed}>
                        <div className="w-56 p-2">
                          <div className="px-2 py-1.5 text-sm font-medium text-foreground">{item.title}</div>
                          <div className="mt-1 space-y-1">
                            {item.children?.map((child) => (
                              <NavLink
                                key={child.id}
                                to={child.url}
                                className="flex items-center rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                                activeClassName="bg-primary/10 text-primary font-medium"
                              >
                                {child.title}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>

                    {/* Submenu (expanded mode only) */}
                    {!isCollapsed && isOpen && (
                      <div className="mt-1 ml-12 space-y-1">
                        {item.children?.map((child) => (
                          <NavLink
                            key={child.id}
                            to={child.url}
                            className="flex items-center rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                            activeClassName="bg-primary/10 text-primary font-medium"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.title}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              // Static Menu Rendering (Original)
              navItems.map((item) => {
              const IconComponent = item.icon;
              const hasSubItems = (item as any).subItems && (item as any).subItems.length > 0;
              const isOpen = openDropdown === item.title;
              if (!hasSubItems) {
                return (
                  <Tooltip key={item.url}>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={item.url}
                        className={`flex items-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${isCollapsed ? "justify-center p-0" : "gap-3 px-4 py-2.5 hover:bg-accent/10"}`}
                        activeClassName={isCollapsed ? "" : "bg-primary/10 text-primary font-medium"}
                      >
                        {({ isActive }) => (
                          <>
                            <div
                              className={`flex items-center justify-center rounded-full transition-all duration-200 relative ${isCollapsed ? `h-9 w-9 ${isActive ? `bg-primary ring-2 ring-primary scale-105` : `bg-gray-200 hover:scale-105`}` : ""}`}
                            >
                              <IconComponent
                                className={`h-5 w-5 ${isCollapsed ? (isActive ? "text-primary-foreground" : "text-gray-600") : isActive ? "text-primary" : "text-sidebar-foreground"}`}
                              />
                            </div>
                            {!isCollapsed && (
                              <span className={`text-sm ${isActive ? "text-primary" : "text-sidebar-foreground"}`}>{item.title}</span>
                            )}
                          </>
                        )}
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="ml-2 z-[100]" hidden={!isCollapsed}>
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              // With subitems (Static Menu)
              return (
                <div key={item.url}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(isOpen ? null : item.title)}
                        className={`w-full flex items-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${isCollapsed ? "justify-center p-0" : "gap-3 px-4 py-2.5 hover:bg-primary/10"}`}
                      >
                        <div
                          className={`flex items-center justify-center rounded-full transition-all duration-200 relative ${isCollapsed ? "h-9 w-9 bg-gray-200" : ""}`}
                        >
                          <IconComponent className={`h-5 w-5 ${isCollapsed ? "text-gray-600" : "text-sidebar-foreground"}`} />
                        </div>
                        {!isCollapsed && (
                          <>
                            <span className="text-sm text-sidebar-foreground flex-1 text-left">{item.title}</span>
                            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          </>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="ml-2 z-[100] p-0" hidden={!isCollapsed}>
                      <div className="w-56 p-2">
                        <div className="px-2 py-1.5 text-sm font-medium text-foreground">{item.title}</div>
                        <div className="mt-1 space-y-1">
                          {(item as any).subItems.map((sub: any) => {
                            if (typeof sub === "string") {
                              return (
                                <NavLink
                                  key={sub}
                                  to={`${(item as any).url}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                                  className="flex items-center rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                                  activeClassName="bg-primary/10 text-primary font-medium"
                                >
                                  {sub}
                                </NavLink>
                              );
                            }
                            const subKey = `${(item as any).title}-${sub.title}`;
                            return (
                              <div key={subKey} className="space-y-1">
                                <div className="px-3 py-1.5 text-sm text-muted-foreground">{sub.title}</div>
                                <div className="ml-3 space-y-1">
                                  {sub.subItems.map((leaf: any) => {
                                    if (typeof leaf === "string") {
                                      return (
                                        <NavLink
                                          key={leaf}
                                          to={`${(item as any).url}/${sub.title.toLowerCase().replace(/\s+/g, "-")}/${leaf?.toLowerCase().replace(/\s+/g, "-")}`}
                                          className="flex items-center rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                                          activeClassName="bg-primary/10 text-primary font-medium"
                                        >
                                          {leaf}
                                        </NavLink>
                                      );
                                    }
                                    return (
                                      <a
                                        key={leaf.title}
                                        href={leaf.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                                      >
                                        {leaf.title}
                                      </a>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>

                  {/* Submenu (expanded mode only) */}
                  {!isCollapsed && isOpen && (
                    <div className="mt-1 ml-12 space-y-1">
                      {(item as any).subItems.map((sub: any) => {
                        if (typeof sub === "string") {
                          return (
                            <NavLink
                              key={sub}
                              to={`${(item as any).url}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                              className="flex items-center rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                              activeClassName="bg-primary/10 text-primary font-medium"
                            >
                              {sub}
                            </NavLink>
                          );
                        }

                        const subKey = `${(item as any).title}-${sub.title}`;
                        const isSubOpen = openSubDropdown === subKey;
                        return (
                          <div key={subKey} className="space-y-1">
                            <button
                              type="button"
                              onClick={() => setOpenSubDropdown(isSubOpen ? null : subKey)}
                              className="w-full flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                            >
                              <span className="flex-1 text-left">{sub.title}</span>
                              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isSubOpen ? "rotate-180" : ""}`} />
                            </button>
                            {isSubOpen && (
                              <div className="ml-6 space-y-1">
                                {sub.subItems.map((leaf: any) => {
                                  if (typeof leaf === "string") {
                                    return (
                                      <NavLink
                                        key={leaf}
                                        to={`${(item as any).url}/${sub.title.toLowerCase().replace(/\s+/g, "-")}/${leaf?.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="flex items-center rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                                        activeClassName="bg-primary/10 text-primary font-medium"
                                        onClick={() => {
                                          setOpenSubDropdown(null);
                                          setOpenDropdown(null);
                                        }}
                                      >
                                        {leaf}
                                      </NavLink>
                                    );
                                  }
                                  return (
                                    <a
                                      key={leaf.title}
                                      href={leaf.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                                      onClick={() => {
                                        setOpenSubDropdown(null);
                                        setOpenDropdown(null);
                                      }}
                                    >
                                      {leaf.title}
                                    </a>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
            )}
          </TooltipProvider>
        </nav>

        {/* Dynamic Menu Toggle & Layout Toggle Buttons */}
        <div className="p-2 border-t border-border/30 space-y-1">
          <TooltipProvider delayDuration={0}>
            {/* Dynamic Menu Toggle */}
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setUseDynamicMenu(!useDynamicMenu)}
                  className={`w-full flex items-center justify-center rounded-lg p-2.5 transition-colors ${
                    useDynamicMenu ? "bg-primary/20 hover:bg-primary/30" : "hover:bg-primary/10"
                  } ${isCollapsed ? "justify-center" : "justify-start gap-3"}`}
                  title={useDynamicMenu ? "Switch to static menu" : "Switch to dynamic menu"}
                >
                  <Globe className={`h-5 w-5 ${useDynamicMenu ? "text-primary" : "text-sidebar-foreground"}`} />
                  {!isCollapsed && (
                    <span className={`text-sm font-medium ${useDynamicMenu ? "text-primary" : "text-sidebar-foreground"}`}>
                      {useDynamicMenu ? "Dynamic Menu" : "Static Menu"}
                    </span>
                  )}
                </button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="ml-2 z-[100]">
                  <p>{useDynamicMenu ? "Switch to static menu" : "Switch to dynamic menu"}</p>
                </TooltipContent>
              )}
            </Tooltip> */}

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleLayout}
                  className={`w-full flex items-center justify-center rounded-lg p-2.5 transition-colors hover:bg-primary/10 ${
                    isCollapsed ? "justify-center" : "justify-start gap-3"
                  }`}
                  title="Switch to horizontal layout"
                >
                  <svg className="h-5 w-5 text-sidebar-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  {!isCollapsed && (
                    <span className="text-sm font-medium text-sidebar-foreground">Horizontal Layout</span>
                  )}
                </button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="ml-2 z-[100]">
                  <p>Switch to horizontal layout</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
