import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DepartmentTopNav from "@/pages/components/DepartmentTopNav";
import { Card } from "@/components/ui/card";
import { Building2, Mail, Users as UsersIcon } from "lucide-react";

const itTeamMembers = [
  { name: "Amanda Cohrs", role: "Director Program Management - SHR and Practice M..." },
  { name: "Andrew Kang", role: "Vice President, AI and Software Development" },
  { name: "Andrew Kang (Alternate)", role: "Vice President, AI and Software Development" },
  { name: "Brenden Soos", role: "VP, Infrastructure and Operations" },
  { name: "David Meditz", role: "Vice President, Data Strategy and Governance" },
  { name: "Jacob Rubin", role: "SVP Chief Security Officer" },
];

const DepartmentIT = () => {
  const [selectedTop, setSelectedTop] = useState("Home");
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  const handleSelectTop = (id: string) => {
    setSelectedTop(id);
    setSelectedChild(null);
  };

  const handleSelectChild = (topId: string, child: string) => {
    setSelectedTop(topId);
    setSelectedChild(child);
  };

  const HomeContent = () => (
    <div className="space-y-8">
      <Card className="p-8 border-l-4 border-l-blue-500">
        <div className="flex items-start gap-6">
          <div className="h-16 w-16 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">Information Technology</h2>
            <p className="text-muted-foreground mb-6">
              Managing digital infrastructure, security, and innovation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <UsersIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Department Head</p>
                  <p className="font-semibold">Michael Chen</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <UsersIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                  <p className="font-semibold">85</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-semibold">it@curana.health</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-4">Department Overview</h3>
        <Card className="p-6">
          <p className="text-muted-foreground leading-relaxed">
            The Information Technology department is responsible for managing and maintaining 
            Curana Health's digital infrastructure, ensuring security, and driving innovation 
            through technology solutions. Our team works to provide reliable, secure, and 
            efficient technology services to support all departments and clinical operations.
          </p>
        </Card>
      </div>
    </div>
  );

  const OurTeamContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Our Team</h2>
        <p className="text-muted-foreground">
          Meet the talented professionals in our IT department
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {itTeamMembers.map((member, index) => (
          <Card key={index} className="p-4 hover:shadow-hover transition-shadow cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-semibold text-blue-600 flex-shrink-0">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-semibold text-sm mb-1">{member.name}</h5>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {member.role}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    if (selectedTop === "Home") {
      return <HomeContent />;
    }
    if (selectedTop === "Our Team") {
      return <OurTeamContent />;
    }
    return <HomeContent />;
  };

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sticky top-[56px] z-40 bg-card rounded-t-2xl shadow-xl border-b border-border/50">
            <DepartmentTopNav
              selectedTop={selectedTop}
              selectedChild={selectedChild}
              onSelectTop={handleSelectTop}
              onSelectChild={handleSelectChild}
            />
          </div>

          <div className="bg-background/95 backdrop-blur-sm border-b border-border/50">
            <div className="grid grid-cols-1 gap-8 items-start px-10 py-6">
              <main className="w-full space-y-8">
                {renderContent()}
              </main>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DepartmentIT;
