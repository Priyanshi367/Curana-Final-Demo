import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import HorizontalSidebar from "./HorizontalSidebar";
import { useSidebar } from "@/contexts/SidebarContext";
import { useLayout } from "@/contexts/LayoutContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isCollapsed } = useSidebar();
  const { layoutType } = useLayout();

  return (
    <div className="min-h-screen w-full bg-background">
      <Header />
      
      {layoutType === "horizontal" ? (
        <>
          <HorizontalSidebar />
          <main className="pt-[110px] px-2 sm:px-4 pb-8">
            {children}
          </main>
          
        </>
      ) : (
        <>
          <Sidebar />
          <main
            className={`pt-[56px] transition-all duration-300 ${isCollapsed ? "md:pl-[76px]" : "md:pl-[296px]"
              } px-2 sm:px-4 pb-8`}
          >
            {children}
          </main>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
