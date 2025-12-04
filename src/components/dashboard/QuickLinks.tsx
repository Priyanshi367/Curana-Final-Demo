import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Laptop, DollarSign, Scale, CalendarDays, Link2, ArrowRight } from "lucide-react";

const quickLinks = [
  { title: "Employee Handbook", icon: BookOpen, url: "#" },
  { title: "IT Helpdesk", icon: Laptop, url: "#" },
  { title: "Benefits", icon: DollarSign, url: "#" },
  { title: "Compliance", icon: Scale, url: "#" },
  { title: "Time Off", icon: CalendarDays, url: "#" },
];

const QuickLinks = () => {
  return (
    <Card className="p-4 sm:p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Link2 className="h-5 w-5 text-accent" />
          </div>
          <h2 className="text-xl font-semibold">Quick Links</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-accent hover:text-accent hover:font-semibold hover:text-white">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>


      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.title}
              href={link.url}
              className="flex flex-col items-center justify-center bg-accent/5 rounded-xl p-3 sm:p-4 transition-all hover:bg-accent/10 hover:shadow-md group"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl bg-accent/15 group-hover:bg-accent transition-all mb-2">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent group-hover:text-white transition-colors" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-center text-foreground/90 leading-snug line-clamp-2">
                {link.title}
              </p>
            </a>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickLinks;
