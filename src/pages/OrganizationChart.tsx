// OrganizationChartWithSVG.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import DashboardLayout from "@/components/DashboardLayout";
import bannerOrgChart from "@/assets/banner-org-chart.jpg";
import PageBanner from "@/components/PageBanner";
import { Filter, Users, Building2, Laptop2, Megaphone, ShoppingCart, Settings, UserCog, Scale, Server, Package, BookOpen, ChevronDown } from "lucide-react";
import * as Select from '@radix-ui/react-select';

interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  photo: string;
  managerId: string | null;
}

/* ----------------------
   DATA (same expanded sample)
   ---------------------- */
const users: User[] = [
  { id: "1", name: "Sarah Johnson", role: "CEO", department: "Executive", photo: "https://i.pravatar.cc/150?img=1", managerId: null },
  { id: "2", name: "Michael Chen", role: "CTO", department: "Technology", photo: "https://i.pravatar.cc/150?img=2", managerId: "1" },
  { id: "3", name: "Emily Davis", role: "VP Engineering", department: "Technology", photo: "https://i.pravatar.cc/150?img=3", managerId: "2" },
  { id: "4", name: "Lukas Reed", role: "VP of Marketing and Sales", department: "Marketing", photo: "https://i.pravatar.cc/150?img=4", managerId: "2" },
  { id: "5", name: "Jackie Brown", role: "Ops Support Manager", department: "Operations", photo: "https://i.pravatar.cc/150?img=5", managerId: "4" },
  { id: "6", name: "Colleen Daniels", role: "Assistant to CEO", department: "Executive", photo: "https://i.pravatar.cc/150?img=6", managerId: "1" },
  { id: "7", name: "Kelly Thompson", role: "Chief HR Officer", department: "HR", photo: "https://i.pravatar.cc/150?img=7", managerId: "1" },
  { id: "8", name: "Jane Williams", role: "CFO", department: "Finance", photo: "https://i.pravatar.cc/150?img=8", managerId: "1" },
  { id: "9", name: "Nancy Black", role: "Head of Legal", department: "Legal", photo: "https://i.pravatar.cc/150?img=9", managerId: "1" },
  { id: "10", name: "Brad Cording", role: "CIO", department: "IT", photo: "https://i.pravatar.cc/150?img=10", managerId: "1" },
  { id: "11", name: "David Wilson", role: "Engineering Manager", department: "Technology", photo: "https://i.pravatar.cc/150?img=11", managerId: "3" },
  { id: "12", name: "Sana Patel", role: "Engineering Manager", department: "Technology", photo: "https://i.pravatar.cc/150?img=12", managerId: "3" },
  { id: "13", name: "Arjun Mehta", role: "Senior Backend Engineer", department: "Technology", photo: "https://i.pravatar.cc/150?img=13", managerId: "11" },
  { id: "14", name: "Maya Verma", role: "Senior Frontend Engineer", department: "Technology", photo: "https://i.pravatar.cc/150?img=14", managerId: "11" },
  { id: "15", name: "John Smith", role: "Backend Developer", department: "Technology", photo: "https://i.pravatar.cc/150?img=15", managerId: "13" },
  { id: "16", name: "Amy Lee", role: "Frontend Developer", department: "Technology", photo: "https://i.pravatar.cc/150?img=16", managerId: "14" },
  { id: "17", name: "Zoe Carter", role: "Junior QA", department: "Technology", photo: "https://i.pravatar.cc/150?img=17", managerId: "12" },
  { id: "18", name: "Priya Nair", role: "Head of Product", department: "Product", photo: "https://i.pravatar.cc/150?img=18", managerId: "2" },
  { id: "19", name: "Carlos Gomez", role: "Product Manager", department: "Product", photo: "https://i.pravatar.cc/150?img=19", managerId: "18" },
  { id: "20", name: "Anna White", role: "UX Designer", department: "Product", photo: "https://i.pravatar.cc/150?img=20", managerId: "18" },
  { id: "21", name: "Mike Johnson", role: "Sales Manager", department: "Sales", photo: "https://i.pravatar.cc/150?img=21", managerId: "4" },
  // Team under Mike Johnson
  { id: "37", name: "Alex Turner", role: "Senior Sales Rep", department: "Sales", photo: "https://i.pravatar.cc/150?img=37", managerId: "21" },
  { id: "38", name: "Sarah Miller", role: "Account Manager", department: "Sales", photo: "https://i.pravatar.cc/150?img=38", managerId: "21" },
  { id: "39", name: "David Kim", role: "Sales Executive", department: "Sales", photo: "https://i.pravatar.cc/150?img=39", managerId: "21" },
  { id: "40", name: "Emma Wilson", role: "Customer Success", department: "Sales", photo: "https://i.pravatar.cc/150?img=40", managerId: "21" },
  { id: "22", name: "Sophie Turner", role: "Marketing Lead", department: "Marketing", photo: "https://i.pravatar.cc/150?img=22", managerId: "4" },
  { id: "23", name: "Olivia Park", role: "Growth Marketer", department: "Marketing", photo: "https://i.pravatar.cc/150?img=23", managerId: "22" },
  { id: "24", name: "Ethan Brown", role: "Sales Executive", department: "Sales", photo: "https://i.pravatar.cc/150?img=24", managerId: "21" },
  { id: "25", name: "Harish Rao", role: "Operations Lead", department: "Operations", photo: "https://i.pravatar.cc/150?img=25", managerId: "5" },
  { id: "26", name: "Linda White", role: "QA Engineer", department: "Technology", photo: "https://i.pravatar.cc/150?img=26", managerId: "11" },
  { id: "27", name: "Kevin Moore", role: "Support Specialist", department: "Operations", photo: "https://i.pravatar.cc/150?img=27", managerId: "25" },
  { id: "28", name: "Rina Shah", role: "Customer Success Manager", department: "Operations", photo: "https://i.pravatar.cc/150?img=28", managerId: "25" },
  { id: "29", name: "Victor Hugo", role: "Accounting Manager", department: "Finance", photo: "https://i.pravatar.cc/150?img=29", managerId: "8" },
  { id: "30", name: "Fiona Gallagher", role: "Legal Counsel", department: "Legal", photo: "https://i.pravatar.cc/150?img=30", managerId: "9" },
  { id: "31", name: "Samir Khan", role: "Intern - Backend", department: "Technology", photo: "https://i.pravatar.cc/150?img=31", managerId: "15" },
  { id: "32", name: "Priya Sharma", role: "Design Intern", department: "Product", photo: "https://i.pravatar.cc/150?img=32", managerId: "20" },
  { id: "33", name: "Ben Turner", role: "Security Engineer (dotted to CIO)", department: "IT", photo: "https://i.pravatar.cc/150?img=33", managerId: "10" },
  { id: "34", name: "Rachel Adams", role: "HR Generalist", department: "HR", photo: "https://i.pravatar.cc/150?img=34", managerId: "7" },
  { id: "35", name: "Omar Ali", role: "DevOps Engineer", department: "IT", photo: "https://i.pravatar.cc/150?img=35", managerId: "10" },
  { id: "36", name: "Natalie Gomez", role: "Content Strategist", department: "Marketing", photo: "https://i.pravatar.cc/150?img=36", managerId: "22" },
];

const getReports = (id: string, userList: User[] = users) =>
  userList.filter((u) => u.managerId === id);
const getManagerId = (id: string, userList: User[] = users) =>
  userList.find((u) => u.id === id)?.managerId ?? null;

/* ----------------------
   Position registry context
   Each Node registers its DOM ref so the top-level can draw lines between them.
   ---------------------- */
type NodeRect = {
  id: string;
  rect: DOMRect;
  visible: boolean;
};

type RegistryContextType = {
  register: (id: string, el: HTMLElement | null) => void;
  unregister: (id: string) => void;
  getRects: () => NodeRect[];
};

const RegistryContext = createContext<RegistryContextType | null>(null);

const useRegistry = () => {
  const ctx = useContext(RegistryContext);
  if (!ctx) throw new Error("useRegistry must be used inside RegistryProvider");
  return ctx;
};

/* ----------------------
   Node component renders card and registers its DOM
   ---------------------- */
const NodeCard: React.FC<{
  user: User;
  highlighted?: boolean;
}> = ({ user, highlighted }) => {
  const { register, unregister } = useRegistry();
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    register(user.id, ref.current);
    return () => {
      unregister(user.id);
    };
  }, [user.id, register, unregister]);

  return (
    <div ref={ref} className="flex flex-col items-center relative z-10">
      <div
        className={
          "bg-white rounded-xl shadow border p-4 w-48 text-center transition-transform " +
          (highlighted ? "ring-2 ring-primary scale-105" : "")
        }
      >
        <img
          src={user.photo}
          alt={user.name}
          className="w-16 h-16 rounded-full mx-auto shadow-sm object-cover"
        />
        <h3 className="font-semibold text-sm mt-2">{user.name}</h3>
        <p className="text-xs text-gray-500">{user.role}</p>
        <p className="text-xxs bg-primary/10 text-primary px-2 py-0.5 rounded-full inline-block mt-1">
          {user.department}
        </p>
      </div>
    </div>
  );
};

/* ----------------------
   Recursive Node that shows toggles and children
   ---------------------- */
const OrgNodeRecursive: React.FC<{
  userId: string;
  expandedIds: Set<string>;
  onToggle?: (id: string, open: boolean) => void;
  highlightId?: string;
  userList?: User[];
}> = ({ userId, expandedIds, onToggle, highlightId, userList = users }) => {
  const user = userList.find((u) => u.id === userId)!;
  const reports = getReports(user.id, userList);
  const [open, setOpen] = useState<boolean>(expandedIds.has(userId));

  useEffect(() => {
    setOpen(expandedIds.has(userId));
  }, [userId, expandedIds]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    onToggle?.(userId, next);
  };

  return (
    <div className="flex flex-col items-center">
      <NodeCard user={user} highlighted={highlightId === userId} />
      {reports.length > 0 && (
        <button
          onClick={toggle}
          className="mt-3 text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full shadow relative z-10"
        >
          {open ? `Hide ${reports.length}` : `View ${reports.length}`}
        </button>
      )}

      {open && reports.length > 0 && (
        <div className="mt-6 flex flex-col items-center w-full">
          <div className="w-full max-w-[1100px] px-4">
            <div className="relative">
              <div className="flex justify-center gap-8 mt-6">
                {reports.map((child) => (
                  <div key={child.id} className="flex flex-col items-center">
                    <OrgNodeRecursive
                      userId={child.id}
                      expandedIds={expandedIds}
                      onToggle={onToggle}
                      highlightId={highlightId}
                      userList={userList}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ----------------------
   Top-level OrganizationChart that provides registry + draws connectors using SVG
   ---------------------- */
export default function OrganizationChart() {
  // Department filter state
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  // Get unique departments
  const departments = useMemo(() => {
    const depts = new Set(users.map((u) => u.department));
    return Array.from(depts).sort();
  }, []);

  const departmentStats = useMemo(
    () =>
      departments.map((dept) => ({
        name: dept,
        count: users.filter((u) => u.department === dept).length,
      })),
    [departments]
  );

  const currentDeptStats = useMemo(
    () =>
      selectedDepartment === "all"
        ? null
        : departmentStats.find((d) => d.name === selectedDepartment),
    [departmentStats, selectedDepartment]
  );

  // Filter users based on selected department
  const filteredUsers = useMemo(() => {
    if (selectedDepartment === "all") return users;

    const deptUsers = users.filter((u) => u.department === selectedDepartment);
    const deptUserIds = new Set(deptUsers.map((u) => u.id));

    const usersToInclude = new Set<string>(deptUserIds);
    deptUsers.forEach((user) => {
      let currentId: string | null = user.managerId;
      while (currentId) {
        usersToInclude.add(currentId);
        const manager = users.find((u) => u.id === currentId);
        currentId = manager?.managerId ?? null;
      }
    });

    return users.filter((u) => usersToInclude.has(u.id));
  }, [selectedDepartment]);

  // Find root user (CEO or top-level user)
  const rootUser = useMemo(() => {
    return filteredUsers.find((u) => u.managerId === null) ?? filteredUsers[0];
  }, [filteredUsers]);

  const CENTER_USER_ID = rootUser?.id ?? "1";
  const managerId = useMemo(
    () => getManagerId(CENTER_USER_ID),
    [CENTER_USER_ID]
  );
  const rootToRender = managerId ?? CENTER_USER_ID;

  // By default expand
  const expandedIds = useMemo(() => {
    const s = new Set<string>();
    if (selectedDepartment === "all") {
      s.add(CENTER_USER_ID);
      if (managerId) s.add(managerId);
    } else {
      filteredUsers.forEach((u) => s.add(u.id));
    }
    return s;
  }, [CENTER_USER_ID, managerId, selectedDepartment, filteredUsers]);

  // Registry: map of id -> element
  const nodesRef = useRef<Map<string, HTMLElement | null>>(new Map());
  const [rects, setRects] = useState<NodeRect[]>([]);

  const register = useCallback((id: string, el: HTMLElement | null) => {
    nodesRef.current.set(id, el);
  }, []);
  const unregister = useCallback((id: string) => {
    nodesRef.current.delete(id);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  // measure function
  const measure = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const scrollLeft = containerRef.current.scrollLeft;
    const scrollTop = containerRef.current.scrollTop;

    const arr: NodeRect[] = [];
    nodesRef.current.forEach((el, id) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const adjustedRect = new DOMRect(
        rect.left - containerRect.left + scrollLeft,
        rect.top - containerRect.top + scrollTop,
        rect.width,
        rect.height
      );
      arr.push({ id, rect: adjustedRect, visible: true });
    });
    setRects(arr);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const update = () => {
      requestAnimationFrame(measure);
    };

    update();

    const container = containerRef.current;
    container.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      resizeObserver.disconnect();
    };
  }, [measure]);

  useEffect(() => {
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        measure();
        window.scrollTo(0, scrollY);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [expandedIds, measure]);

  // connectors
  const connectors = useMemo(() => {
    const lines: {
      fromId: string;
      toId: string;
      points: { x: number; y: number }[];
      type: "vertical" | "horizontal";
    }[] = [];

    const rectById = new Map<string, DOMRect>();
    rects.forEach((r) => rectById.set(r.id, r.rect));

    filteredUsers.forEach((u) => {
      const reports = getReports(u.id, filteredUsers);
      if (reports.length === 0) return;
      const parentRect = rectById.get(u.id);
      if (!parentRect) return;

      const childRects = reports
        .map((c) => ({ id: c.id, rect: rectById.get(c.id) }))
        .filter((c) => c.rect) as { id: string; rect: DOMRect }[];

      if (childRects.length === 0) return;

      const startY = parentRect.bottom + 40;
      const firstChildY = childRects[0].rect.top;
      const horizontalY = startY + (firstChildY - startY) / 2;

      if (childRects.length > 1) {
        const leftmostX = Math.min(
          ...childRects.map((c) => c.rect.left + c.rect.width / 2)
        );
        const rightmostX = Math.max(
          ...childRects.map((c) => c.rect.left + c.rect.width / 2)
        );
        lines.push({
          fromId: u.id,
          toId: "horizontal",
          type: "horizontal",
          points: [
            { x: leftmostX, y: horizontalY },
            { x: rightmostX, y: horizontalY },
          ],
        });
      }

      const parentX = parentRect.left + parentRect.width / 2;
      lines.push({
        fromId: u.id,
        toId: "parent-to-horizontal",
        type: "vertical",
        points: [
          { x: parentX, y: startY },
          { x: parentX, y: horizontalY },
        ],
      });

      childRects.forEach((c) => {
        const childX = c.rect.left + c.rect.width / 2;
        const childY = c.rect.top;
        lines.push({
          fromId: u.id,
          toId: c.id,
          type: "vertical",
          points: [
            { x: childX, y: horizontalY },
            { x: childX, y: childY },
          ],
        });
      });
    });

    return lines;
  }, [rects, filteredUsers]);

  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const updateSvgSize = () => {
      if (containerRef.current && svgRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        svgRef.current.setAttribute("width", `${rect.width}px`);
        svgRef.current.setAttribute("height", `${rect.height}px`);
      }
    };

    const resizeObserver = new ResizeObserver(updateSvgSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    updateSvgSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [rects]);

  const registryValue = useMemo(
    () => ({
      register,
      unregister,
      getRects: () => rects,
    }),
    [register, unregister, rects]
  );

  // Helper function to get department icon
  const getDepartmentIcon = (deptName: string) => {
    const iconClass = "h-4 w-4 text-muted-foreground flex-shrink-0";
    switch(deptName.toLowerCase()) {
      case 'executive':
        return <UserCog className={iconClass} />;
      case 'technology':
        return <Laptop2 className={iconClass} />;
      case 'marketing':
        return <Megaphone className={iconClass} />;
      case 'sales':
        return <ShoppingCart className={iconClass} />;
      case 'operations':
        return <Settings className={iconClass} />;
      case 'hr':
        return <Users className={iconClass} />;
      case 'finance':
        return <Scale className={iconClass} />;
      case 'it':
        return <Server className={iconClass} />;
      case 'product':
        return <Package className={iconClass} />;
      case 'legal':
        return <BookOpen className={iconClass} />;
      default:
        return <Users className={iconClass} />;
    }
  };

  const handleToggle = (id: string, open: boolean) => {
    setTimeout(() => {
      measure();
    }, 40);
  };

  return (
    <RegistryContext.Provider value={registryValue}>
      <DashboardLayout>
        <div className="p-4">
          <PageBanner title="Organization Chart" backgroundImage={bannerOrgChart} />

          {/* Theme-based Department Filter */}
          <div className="mb-6 flex justify-end">
            <div className="inline-flex items-center gap-4 rounded-2xl bg-primary/5 p-1.5 shadow-md ring-1 ring-primary/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 rounded-xl bg-background/90 px-4 py-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-sm">
                  {selectedDepartment === 'all' ? (
                    <Building2 className="h-4 w-4 text-white" />
                  ) : (
                    <div className="text-white">
                      {React.cloneElement(getDepartmentIcon(selectedDepartment), { className: 'h-4 w-4 text-white' })}
                    </div>
                  )}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary/80">
                    Department
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-base font-semibold text-foreground">
                      {selectedDepartment === "all" ? "All Departments" : selectedDepartment}
                    </span>
                    {currentDeptStats && (
                      <span className="ml-2 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors px-2 py-0.5 rounded-full">
                        {currentDeptStats.count} {currentDeptStats.count === 1 ? 'member' : 'members'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="h-8 w-px bg-gradient-to-b from-border/50 via-muted/30 to-border/50" />

              <div className="relative">
                <Select.Root value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <Select.Trigger className="inline-flex h-10 min-w-[280px] items-center justify-between rounded-xl border-0 bg-background/80 px-4 py-2.5 text-sm font-medium text-foreground outline-none ring-1 ring-border transition-all hover:bg-background focus:ring-2 focus:ring-primary/50 focus:ring-offset-1">
                    <Select.Value>
                      <div className="flex items-center gap-2">
                        {selectedDepartment === 'all' ? (
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          getDepartmentIcon(selectedDepartment)
                        )}
                        <span>
                          {selectedDepartment === 'all' ? 'All Departments' : selectedDepartment}
                        </span>
                      </div>
                    </Select.Value>
                    <Select.Icon className="ml-2">
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Select.Icon>
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content 
                      className="z-50 min-w-[280px] overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-lg"
                      position="popper"
                      sideOffset={8}
                      align="end"
                    >
                      <Select.Viewport className="p-1">
                        <Select.Item value="all" className="group relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                          <div className="flex w-full items-center gap-2">
                            <Building2 className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-white transition-colors" />
                            <Select.ItemText>All Departments (Full Hierarchy)</Select.ItemText>
                          </div>
                        </Select.Item>

                        <Select.Group className="py-1">
                          <Select.Label className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                            Departments
                          </Select.Label>
                          {departmentStats.map((dept) => (
                            <Select.Item 
                              key={dept.name} 
                              value={dept.name}
                              className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="group-hover:text-white transition-colors">
                                    {React.cloneElement(getDepartmentIcon(dept.name), { 
                                      className: 'h-4 w-4 text-muted-foreground group-hover:text-white transition-colors' 
                                    })}
                                  </div>
                                  <span className="whitespace-nowrap">{dept.name}</span>
                                </div>
                                <span className="text-xs text-muted-foreground bg-muted/50 hover:bg-muted/80 transition-colors px-2 py-0.5 rounded-full">
                                  {dept.count} {dept.count === 1 ? 'member' : 'members'}
                                </span>
                              </div>
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative w-full h-[calc(100vh-260px)] border rounded-lg overflow-auto bg-gray-50"
            style={{
              backgroundImage:
                "linear-gradient(to right, #f3f4f6 1px, transparent 1px), linear-gradient(to bottom, #f3f4f6 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          >
            <div className="relative min-w-max min-h-full p-8">
              <svg
                ref={svgRef}
                width="100%"
                height="100%"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              >
                <defs>
                  <marker
                    id="arrow"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L6,3 L0,6 z" fill="#d8b4fe" />
                  </marker>
                </defs>

                {connectors.map((c, idx) => {
                  const pts = c.points;
                  const ptsStr = pts.map((p) => `${p.x},${p.y}`).join(" ");
                  const hasArrow =
                    c.type === "vertical" && c.toId !== "parent-to-horizontal";
                  return (
                    <polyline
                      key={idx}
                      points={ptsStr}
                      fill="none"
                      stroke="#d8b4fe"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      markerEnd={hasArrow ? "url(#arrow)" : undefined}
                    />
                  );
                })}
              </svg>

              <div className="flex flex-col items-center w-full">
                <OrgNodeRecursive
                  userId={rootToRender}
                  expandedIds={expandedIds}
                  onToggle={handleToggle}
                  highlightId={selectedDepartment === "all" ? CENTER_USER_ID : undefined}
                  userList={filteredUsers}
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RegistryContext.Provider>
  );
}
