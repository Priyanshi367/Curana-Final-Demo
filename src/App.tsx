import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { LayoutProvider } from "./contexts/LayoutContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Network from "./pages/Network";
import Departments from "./pages/Departments";
import DepartmentIT from "./pages/DepartmentIT";
import DepartmentLegal from "./pages/DepartmentLegal";
import DepartmentPeople from "./pages/DepartmentPeople";
import Policies from "./pages/Policies";
import Directory from "./pages/Directory";
import Help from "./pages/Help";
import Workspace from "./pages/Workspace";
import OrganizationChart from "./pages/OrganizationChart";
import Resources from "./pages/Resources";
import Reports from "./pages/Reports";
import Forms from "./pages/Forms";
import CalendarPage from "./pages/Calendar";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Providers from "./pages/Providers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SidebarProvider>
        <LayoutProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/about/network" element={<Network />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/departments/people-(hr)" element={<DepartmentPeople />} />
                <Route path="/departments/people" element={<DepartmentPeople />} />
                <Route path="/departments/it" element={<DepartmentIT />} />
                <Route path="/departments/legal" element={<DepartmentLegal />} />
                <Route path="/policies" element={<Policies />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/help" element={<Help />} />
                <Route path="/workspace" element={<Workspace />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/providers" element={<Providers />} />
                <Route path="/organization-chart" element={<OrganizationChart />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LayoutProvider>
      </SidebarProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
