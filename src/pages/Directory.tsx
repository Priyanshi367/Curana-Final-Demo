import DashboardLayout from "@/components/DashboardLayout";
import PageBanner from "@/components/PageBanner";
import { Card } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import bannerImg from "@/assets/banner-directory.jpg";

const employees = [
  { name: "Dr. Emily Chen", role: "Chief Medical Officer", department: "Clinical", email: "emily.chen@curana.health", phone: "+1 (555) 123-4567" },
  { name: "Dr. Michael Rodriguez", role: "Senior Physician", department: "Clinical", email: "michael.rodriguez@curana.health", phone: "+1 (555) 234-5678" },
  { name: "Sarah Johnson", role: "Director of HR", department: "Human Resources", email: "sarah.johnson@curana.health", phone: "+1 (555) 345-6789" },
  { name: "David Kim", role: "Chief Technology Officer", department: "IT", email: "david.kim@curana.health", phone: "+1 (555) 456-7890" },
  { name: "Dr. Lisa Thompson", role: "Lead Surgeon", department: "Clinical", email: "lisa.thompson@curana.health", phone: "+1 (555) 567-8901" },
  { name: "James Wilson", role: "Finance Director", department: "Finance", email: "james.wilson@curana.health", phone: "+1 (555) 678-9012" },
];

const Directory = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <PageBanner title="Employee Directory" backgroundImage={bannerImg} />
        
        <div className="mb-6">
          <Input
            placeholder="Search by name, department, or role..."
            className="max-w-xl"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {employees.map((employee) => (
            <Card key={employee.email} className="p-6 hover:shadow-hover transition-all">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-semibold text-accent">
                    {employee.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{employee.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{employee.role}</p>
                  <p className="text-xs text-muted-foreground mb-3">{employee.department}</p>
                  <div className="space-y-1">
                    <a href={`mailto:${employee.email}`} className="flex items-center gap-2 text-sm text-accent hover:underline">
                      <Mail className="h-4 w-4" />
                      {employee.email}
                    </a>
                    <a href={`tel:${employee.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent">
                      <Phone className="h-4 w-4" />
                      {employee.phone}
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Directory;
