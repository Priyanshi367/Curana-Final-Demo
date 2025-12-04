import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, MoreHorizontal } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLayout } from "@/contexts/LayoutContext";
import { navItems } from "./Sidebar";

const HorizontalSidebar = () => {
  const { toggleLayout } = useLayout();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(navItems.length);

  const navRef = useRef<HTMLDivElement | null>(null);
  const moreBtnRef = useRef<HTMLButtonElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const measureRowRef = useRef<HTMLDivElement | null>(null);
  const measureItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleDropdownToggle = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  const handleNavItemClick = () => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
  };

  // Click outside → close dropdowns & menus
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-horizontal-header-root]")) {
        setOpenDropdown(null);
        setOpenSubDropdown(null);
        setIsMobileMenuOpen(false);
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Calculate how many items fit in one line (desktop/tablet only)
  useEffect(() => {
    const calculateVisibleItems = () => {
      if (!navRef.current) return;

      // Only do this for desktop/tablet
      if (window.innerWidth < 768) {
        setVisibleCount(navItems.length);
        return;
      }

      const containerWidth = navRef.current.offsetWidth;
      if (!containerWidth) return;

      const moreWidth = moreBtnRef.current?.offsetWidth ?? 56;

      // Measure total width of all items
      // Use hidden measurement row so widths are available even for overflowed items
      const widths = navItems.map((_, index) => {
        const el = measureItemRefs.current[index];
        return el?.offsetWidth ?? 0;
      });

      const gap = 4; // matches gap-1 (0.25rem) assuming 16px base
      const totalWidth = widths.reduce((sum, w) => sum + w, 0) + Math.max(0, navItems.length - 1) * gap;

      // If everything fits, show all & hide More
      if (totalWidth <= containerWidth) {
        setVisibleCount(navItems.length);
        return;
      }

      // Otherwise, fill until space is left for "More" button
      let used = 0;
      let count = 0;

      for (let i = 0; i < navItems.length; i++) {
        const w = widths[i];
        const extraGap = i > 0 ? gap : 0;
        if (used + extraGap + w + moreWidth > containerWidth) break;
        used += extraGap + w;
        count++;
      }

      // Show as many as fit while reserving space for More
      setVisibleCount(Math.max(0, count));
      // Close the More menu if visibleCount changes
      setIsMoreOpen(false);
    };

    // Delay to ensure DOM has rendered sizes
    const handleResize = () => {
      window.requestAnimationFrame(calculateVisibleItems);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    let observer: ResizeObserver | null = null;
    if (navRef.current) {
      observer = new ResizeObserver(() => handleResize());
      observer.observe(navRef.current);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
    };
  }, []);

  const visibleItems = navItems.slice(0, visibleCount);
  const overflowItems = navItems.slice(visibleCount);

  return (
    <div
      className="fixed top-[56px] left-0 right-0 h-12 md:h-14 bg-secondary shadow-elegant z-40 flex items-center px-3 md:px-4"
      data-horizontal-header-root
    >
      {/* Left: Mobile menu button */}
      <div className="flex items-center gap-2 mr-2 md:mr-4">
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-1.5 text-sidebar-foreground hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Desktop / tablet nav with "More" menu */}
      <nav
        ref={navRef}
        className="hidden md:flex flex-1 min-w-0 items-center gap-1 flex-nowrap"
      >
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isOpen = openDropdown === item.title;

          // Only render items that are visible
          if (index >= visibleCount) return null;

          if (hasSubItems) {
            return (
              <div
                key={item.url}
                className="relative"
                ref={(el) => (itemRefs.current[index] = el)}
              >
                <button
                  onClick={() => handleDropdownToggle(item.title)}
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 text-secondary-foreground hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 whitespace-nowrap"
                >
                  <IconComponent className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-medium">{item.title}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-1 min-w-[220px] md:min-w-[240px] bg-background border border-border rounded-lg shadow-elegant overflow-hidden z-[60]">
                    <div className="py-1">
                      {item.subItems?.map((sub: any) => {
                        if (typeof sub === "string") {
                          return (
                            <NavLink
                              key={sub}
                              to={`${item.url}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                              className="flex items-center rounded-none px-3 py-2 text-sm transition-colors text-muted-foreground hover:text-foreground hover:bg-accent/10"
                              activeClassName="bg-accent/10 font-medium"
                              onClick={handleNavItemClick}
                            >
                              {sub}
                            </NavLink>
                          );
                        }
                        const subKey = `${item.title}-${sub.title}`;
                        const isSubOpen = openSubDropdown === subKey;
                        return (
                          <div key={subKey} className="px-1 py-1">
                            <button
                              onClick={() => setOpenSubDropdown(isSubOpen ? null : subKey)}
                              className="flex w-full items-start justify-between gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-sidebar-foreground hover:bg-muted/60 text-left"
                            >
                              <span className="flex-1 text-left break-words whitespace-normal">{sub.title}</span>
                              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isSubOpen ? "rotate-180" : ""}`} />
                            </button>
                            {isSubOpen && (
                              <div className="ml-5 mt-1 mb-1 space-y-1 w-[calc(100%-1.25rem)] whitespace-normal break-words">
                                {sub.subItems.map((leaf: any) => {
                                  if (typeof leaf === "string") {
                                    return (
                                      <NavLink
                                        key={leaf}
                                        to={`${item.url}/${sub.title.toLowerCase().replace(/\s+/g, "-")}/${leaf.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="flex items-start rounded-none px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/10 text-left whitespace-normal break-words"
                                        activeClassName="bg-accent/10 font-medium"
                                        onClick={() => {
                                          handleNavItemClick();
                                          setOpenSubDropdown(null);
                                        }}
                                      >
                                        <span className="text-left">{leaf}</span>
                                      </NavLink>
                                    );
                                  }
                                  return (
                                    <a
                                      key={leaf.title}
                                      href={leaf.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-start rounded-none px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/10 text-left whitespace-normal break-words"
                                      onClick={() => {
                                        handleNavItemClick();
                                        setOpenSubDropdown(null);
                                      }}
                                    >
                                      <span className="text-left">{leaf.title}</span>
                                    </a>
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
            );
          }

          return (
            <div
              key={item.url}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <NavLink
                to={item.url}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 text-secondary-foreground hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 whitespace-nowrap"
                activeClassName="bg-primary text-primary-foreground shadow-sm"
                onClick={handleNavItemClick}
              >
                {({ isActive }) => (
                  <>
                    <IconComponent className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </>
                )}
              </NavLink>
            </div>
          );
        })}

        {/* More button for overflow items */}
        {overflowItems.length > 0 && (
          <div className="relative">
            <button
              ref={moreBtnRef}
              onClick={() => {
                setIsMoreOpen((prev) => !prev);
                setOpenDropdown(null);
              }}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 text-secondary-foreground hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 whitespace-nowrap"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>

            {isMoreOpen && (
              <div className="absolute right-0 mt-1 min-w-[180px] bg-background border border-border rounded-lg shadow-elegant overflow-hidden z-[60]">
                <div className="py-1">
                  {overflowItems.map((item) => {
                    const IconComponent = item.icon;
                    const hasSubItems =
                      item.subItems && item.subItems.length > 0;

                    if (hasSubItems) {
                      const isSubOpen = openDropdown === item.title;
                      return (
                        <div key={item.url} className="px-1 py-1">
                          <button
                            onClick={() => handleDropdownToggle(item.title)}
                            className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-foreground hover:bg-primary/10"
                          >
                            <span className="inline-flex items-center gap-2">
                              <IconComponent className="h-4 w-4" />
                              {item.title}
                            </span>
                            <ChevronDown
                              className={`h-3.5 w-3.5 transition-transform ${
                                isSubOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isSubOpen && (
                            <div className="ml-7 mt-1 mb-1 space-y-1 w-[calc(100%-1.75rem)] whitespace-normal break-words">
                              {item.subItems?.map((sub: any) => {
                                if (typeof sub === "string") {
                                  return (
                                    <NavLink
                                      key={sub}
                                      to={`${item.url}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                                      className="flex items-start rounded-none px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/10 text-left whitespace-normal break-words"
                                      activeClassName="bg-accent/10 font-medium"
                                      onClick={handleNavItemClick}
                                    >
                                      <span className="text-left">{sub}</span>
                                    </NavLink>
                                  );
                                }
                                const nestedKey = `${item.title}-${sub.title}`;
                                const nestedOpen = openSubDropdown === nestedKey;
                                return (
                                  <div key={nestedKey}>
                                    <button
                                      onClick={() => setOpenSubDropdown(nestedOpen ? null : nestedKey)}
                                      className="flex w-full items-start justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-muted/60 text-left"
                                    >
                                      <span className="flex-1 text-left break-words whitespace-normal">{sub.title}</span>
                                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${nestedOpen ? "rotate-180" : ""}`} />
                                    </button>
                                    {nestedOpen && (
                                      <div className="ml-5 mt-1 mb-1 space-y-1 w-[calc(100%-1.25rem)] whitespace-normal break-words">
                                        {sub.subItems.map((leaf: any) => {
                                          if (typeof leaf === "string") {
                                            return (
                                              <NavLink
                                                key={leaf}
                                                to={`${item.url}/${sub.title.toLowerCase().replace(/\s+/g, "-")}/${leaf.toLowerCase().replace(/\s+/g, "-")}`}
                                                className="flex items-start rounded-none px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/10 text-left whitespace-normal break-words"
                                                activeClassName="bg-accent/10 font-medium"
                                                onClick={() => {
                                                  handleNavItemClick();
                                                  setOpenSubDropdown(null);
                                                }}
                                              >
                                                <span className="text-left">{leaf}</span>
                                              </NavLink>
                                            );
                                          }
                                          return (
                                            <a
                                              key={leaf.title}
                                              href={leaf.href}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="flex items-start rounded-none px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/10 text-left whitespace-normal break-words"
                                              onClick={() => {
                                                handleNavItemClick();
                                                setOpenSubDropdown(null);
                                              }}
                                            >
                                              <span className="text-left">{leaf.title}</span>
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
                    }

                    return (
                      <NavLink
                        key={item.url}
                        to={item.url}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-foreground hover:bg-primary/10"
                        activeClassName="bg-primary/10 text-primary font-medium"
                        onClick={handleNavItemClick}
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Hidden measurement row for accurate width calculation */}
      <div
        ref={measureRowRef}
        aria-hidden
        className="invisible absolute -z-10 pointer-events-none top-[-9999px] left-0 md:flex gap-1"
      >
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          const hasSubItems = item.subItems && item.subItems.length > 0;
          if (hasSubItems) {
            return (
              <div
                key={`measure-${item.url}`}
                ref={(el) => (measureItemRefs.current[index] = el)}
                className="relative"
              >
                <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap">
                  <IconComponent className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-medium">{item.title}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </div>
              </div>
            );
          }
          return (
            <div
              key={`measure-${item.url}`}
              ref={(el) => (measureItemRefs.current[index] = el)}
            >
              <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap">
                <IconComponent className="h-4 w-4 shrink-0" />
                <span className="text-sm font-medium">{item.title}</span>
              </div>
            </div>
          );
        })}
        {/* space for More button */}
        <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border-t border-border shadow-lg md:hidden z-50">
          <div className="flex flex-col py-2 max-h-[70vh] overflow-y-auto">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isOpen = openDropdown === item.title;

              if (hasSubItems) {
                return (
                  <div key={item.url} className="px-3">
                    <button
                      onClick={() => handleDropdownToggle(item.title)}
                      className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-primary/10"
                    >
                      <span className="inline-flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        {item.title}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="ml-7 mt-1 mb-2 space-y-1 w-[calc(100%-1.75rem)] whitespace-normal break-words">
                        {item.subItems?.map((sub: any) => {
                          if (typeof sub === "string") {
                            return (
                              <NavLink
                                key={sub}
                                to={`${item.url}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                                className="block text-sm text-muted-foreground hover:text-foreground hover:underline whitespace-normal break-words"
                                activeClassName="text-primary font-medium"
                                onClick={handleNavItemClick}
                              >
                                {sub}
                              </NavLink>
                            );
                          }
                          const nestedKey = `${item.title}-${sub.title}-mobile`;
                          const nestedOpen = openSubDropdown === nestedKey;
                          return (
                            <div key={nestedKey}>
                              <button
                                onClick={() => setOpenSubDropdown(nestedOpen ? null : nestedKey)}
                                className="flex w-full items-start justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-muted/60 text-left"
                              >
                                <span className="flex-1 text-left break-words whitespace-normal">{sub.title}</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${nestedOpen ? "rotate-180" : ""}`} />
                              </button>
                              {nestedOpen && (
                                <div className="ml-5 mt-1 mb-1 space-y-1 whitespace-normal break-words">
                                  {sub.subItems.map((leaf: any) => {
                                    if (typeof leaf === "string") {
                                      return (
                                        <NavLink
                                          key={leaf}
                                          to={`${item.url}/${sub.title.toLowerCase().replace(/\s+/g, "-")}/${leaf.toLowerCase().replace(/\s+/g, "-")}`}
                                          className="block text-sm text-muted-foreground hover:text-foreground hover:underline whitespace-normal break-words"
                                          activeClassName="text-primary font-medium"
                                          onClick={() => {
                                            handleNavItemClick();
                                            setOpenSubDropdown(null);
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
                                        className="block text-sm text-muted-foreground hover:text-foreground hover:underline whitespace-normal break-words"
                                        onClick={() => {
                                          handleNavItemClick();
                                          setOpenSubDropdown(null);
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
              }

              return (
                <NavLink
                  key={item.url}
                  to={item.url}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-sidebar-foreground hover:bg-muted/60"
                  activeClassName="bg-primary/10 text-primary"
                  onClick={handleNavItemClick}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.title}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}

      {/* Right side: Layout toggle */}
      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={toggleLayout}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 text-secondary-foreground hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
          title="Switch to vertical layout"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="hidden sm:inline">Vertical layout</span>
        </button>
      </div>
    </div>
  );
};

export default HorizontalSidebar;
