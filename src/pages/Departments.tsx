import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import PageBanner from "@/components/PageBanner";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, DollarSign, Users, Scale, GraduationCap, Stethoscope } from "lucide-react";
import bannerImg from "@/assets/banner-departments.jpg";

const departments = [
  {
    name: "Information Technology",
    description: "Managing digital infrastructure, security, and innovation.",
    icon: Building2,
    color: "#3b82f6",
    contact: "it@curana.health",
    head: "Michael Chen",
    members: 85,
    route: "/departments/it",
    employees: [
      { name: "Amanda Cohrs", role: "Director Program Management - SHR and Practice M..." },
      { name: "Andrew Kang", role: "Vice President, AI and Software Development" },
      { name: "Andrew Kang (Alternate)", role: "Vice President, AI and Software Development" },
      { name: "Brenden Soos", role: "VP, Infrastructure and Operations" },
      { name: "David Meditz", role: "Vice President, Data Strategy and Governance" },
      { name: "Jacob Rubin", role: "SVP Chief Security Officer" },
    ],
  },
  {
    name: "Finance",
    description: "Financial planning, budgeting, and resource management.",
    icon: DollarSign,
    color: "#f59e0b",
    contact: "finance@curana.health",
    head: "David Park",
    members: 45,
    route: null,
    employees: [
      { name: "Sarah Johnson", role: "VP Financial Planning" },
      { name: "Michael Torres", role: "Director of Budgeting" },
      { name: "Emily Zhang", role: "Senior Financial Analyst" },
    ],
  },
  {
    name: "People (HR)",
    description: "Talent acquisition, development, and employee support.",
    icon: Users,
    color: "#06b6d4",
    contact: "hr@curana.health",
    head: "Lisa Williams",
    members: 32,
    route: "/departments/people",
    employees: [
      { name: "Jessica Brown", role: "Talent Acquisition Manager" },
      { name: "Robert Lee", role: "HR Business Partner" },
      { name: "Maria Garcia", role: "Benefits Coordinator" },
    ],
  },
  {
    name: "Legal",
    description: "Compliance, contracts, and regulatory affairs.",
    icon: Scale,
    color: "#f43f5e",
    contact: "legal@curana.health",
    head: "Amanda Roberts",
    members: 18,
    route: "/departments/legal",
    employees: [
      { name: "Thomas Wilson", role: "Chief Compliance Officer" },
      { name: "Jennifer Adams", role: "Legal Counsel" },
    ],
  },
  {
    name: "Learning & Development",
    description: "Training, professional development, and education programs.",
    icon: GraduationCap,
    color: "#84cc16",
    contact: "learning@curana.health",
    head: "Dr. James Martinez",
    members: 24,
    route: null,
    employees: [
      { name: "Patricia Moore", role: "Director of Learning" },
      { name: "Kevin Taylor", role: "Training Specialist" },
    ],
  },
  {
    name: "Operations",
    description: "Facility management and operational excellence.",
    icon: Stethoscope,
    color: "#8b5cf6",
    contact: "operations@curana.health",
    head: "Robert Johnson",
    members: 67,
    route: null,
    employees: [
      { name: "Daniel White", role: "Operations Manager" },
      { name: "Laura Martinez", role: "Facilities Coordinator" },
    ],
  },
];

const Departments = () => {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState<typeof departments[0] | null>(null);

  const handleDeptClick = (dept: typeof departments[0]) => {
    if (dept.route) {
      navigate(dept.route);
    } else {
      setSelectedDept(dept);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <PageBanner title="Departments" backgroundImage={bannerImg} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const IconComponent = dept.icon;
            return (
              <Card
                key={dept.name}
                className="p-6 hover:shadow-hover transition-all cursor-pointer border-l-4"
                style={{ borderLeftColor: dept.color }}
                onClick={() => handleDeptClick(dept)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: dept.color }}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{dept.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{dept.description}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">Department Head:</span>
                    <span className="text-muted-foreground">{dept.head}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Team Members:</span>
                    <span className="text-muted-foreground">{dept.members}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Department Modal */}
        <Dialog open={!!selectedDept} onOpenChange={() => setSelectedDept(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            {selectedDept && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-accent mb-4">
                    {selectedDept.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Department Head:</span>
                        <span className="ml-2 text-muted-foreground">{selectedDept.head}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Team Members:</span>
                        <span className="ml-2 text-muted-foreground">{selectedDept.members}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-1">
                      People reporting to {selectedDept.head} ({selectedDept.employees.length})
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedDept.employees.map((employee, index) => (
                      <Card key={index} className="p-4 hover:shadow-hover transition-shadow cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-lg font-semibold text-accent flex-shrink-0">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-sm mb-1">{employee.name}</h5>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {employee.role}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Departments;
