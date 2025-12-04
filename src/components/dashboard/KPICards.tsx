import { Users, SmilePlus, Calendar, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const kpiData = [
  { title: "Patients Today", value: "24", icon: Users },
  { title: "Satisfaction Rate", value: "96%", icon: SmilePlus },
  { title: "Meetings Today", value: "5", icon: Calendar },
  { title: "Pending Approvals", value: "3", icon: CheckCircle },
];

const KPICards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi) => {
        const IconComponent = kpi.icon;
        return (
          <Card
            key={kpi.title}
            className="p-6 hover:shadow-hover transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
                <IconComponent className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <p className="text-3xl font-semibold mb-1">{kpi.value}</p>
            <p className="text-sm text-muted-foreground">{kpi.title}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default KPICards;
