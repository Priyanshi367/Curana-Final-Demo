import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, FileText, GraduationCap, Laptop, Wrench, ArrowRight } from "lucide-react";

const tools = [
  {
    title: "Expense Tracker",
    description: "Submit and track expenses",
    icon: DollarSign,
    color: "#f59e0b",
  },
  {
    title: "Policy Center",
    description: "Company policies & guidelines",
    icon: FileText,
    color: "#f43f5e",
  },
  {
    title: "Learning Portal",
    description: "Training & development",
    icon: GraduationCap,
    color: "#84cc16",
  },
  {
    title: "IT Helpdesk",
    description: "Technical support",
    icon: Laptop,
    color: "#06b6d4",
  },
];

const EssentialTools = () => {
  
  return (
    <Card className="p-4 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Wrench className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold">Essential Tools</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-accent hover:text-accent hover:font-semibold hover:text-white text-xs sm:text-sm">
          View All <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 place-items-center">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <div
              key={tool.title}
              className="p-4 hover:bg-accent/5 rounded-lg transition-all cursor-pointer group w-full max-w-[180px] text-center"
            >
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform mx-auto"
                style={{ backgroundColor: tool.color }}
              >
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-semibold mb-1">{tool.title}</h3>
              <p className="text-xs text-muted-foreground">{tool.description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default EssentialTools;
