import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, CheckSquare, BookOpen, LayoutDashboard, ArrowRight } from "lucide-react";

const workspaceItems = [
  {
    title: "Team Standup Meeting",
    subtitle: "Today at 10:00 AM • Conference Room A",
    icon: Calendar,
  },
  {
    title: "Q4 Clinical Report.docx",
    subtitle: "Modified 2 hours ago • Documents",
    icon: FileText,
  },
  {
    title: "Budget Approval Request",
    subtitle: "Pending your approval • Finance Dept",
    icon: CheckSquare,
  },
  {
    title: "1:1 with Dr. Martinez",
    subtitle: "Today at 2:30 PM • Microsoft Teams",
    icon: Calendar,
  },
  {
    title: "HIPAA Compliance Training",
    subtitle: "Due by Friday • 30 minutes remaining",
    icon: BookOpen,
  },
];

const MyWorkspace = () => {
  return (
    <Card className="h-full flex flex-col p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <LayoutDashboard className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold">My Workspace</h2>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:font-semibold hover:text-white text-xs sm:text-sm">
            View All <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
          </Button>
        </div>
      
      <div className="pb-4 sm:pb-6 flex-1 overflow-y-auto max-h-[350px] sm:max-h-[400px]">
        <div className="space-y-2">
          {workspaceItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className="p-2.5 sm:p-3 hover:bg-primary/5 rounded-lg transition-colors cursor-pointer group border border-transparent hover:border-border/50"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform mt-0.5">
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-medium text-foreground mb-1 leading-tight line-clamp-1">{item.title}</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default MyWorkspace;
