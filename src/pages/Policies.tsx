import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageBanner from "@/components/PageBanner";
import bannerImg from "@/assets/policy.jpg";

const policies = [
  { title: "Code of Conduct", version: "v2.1", date: "2025-01-15" },
  { title: "HIPAA Compliance Policy", version: "v3.0", date: "2024-12-20" },
  { title: "Information Security Policy", version: "v2.5", date: "2025-01-10" },
  { title: "Workplace Safety Guidelines", version: "v1.8", date: "2024-11-30" },
  { title: "Anti-Discrimination Policy", version: "v2.0", date: "2024-10-15" },
  { title: "Remote Work Policy", version: "v1.5", date: "2024-12-01" },
  { title: "Professional Development Policy", version: "v1.2", date: "2024-09-10" },
  { title: "Patient Privacy Standards", version: "v4.0", date: "2025-01-05" },
];

const Policies = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <PageBanner title="Policies & Guidelines" backgroundImage={bannerImg} />
        <h1 className="text-4xl font-semibold mb-8">Policies & Guidelines</h1>

        <div className="space-y-4">
          {policies.map((policy) => (
            <Card key={policy.title} className="p-6 hover:shadow-hover transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{policy.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {policy.version} • Last updated {policy.date}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Policies;
