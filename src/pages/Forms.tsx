import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageBanner from "@/components/PageBanner";
import bannerImg from "@/assets/forms.webp";

const forms = [
  { name: "Time Off Request", description: "Request vacation or sick leave" },
  { name: "Expense Reimbursement", description: "Submit business expenses" },
  { name: "IT Support Ticket", description: "Report technical issues" },
  { name: "Training Request", description: "Request professional development" },
  { name: "Patient Incident Report", description: "Report safety incidents" },
  { name: "Equipment Request", description: "Request medical equipment" },
];

const Forms = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <PageBanner title="Forms" backgroundImage={bannerImg} />
        <h1 className="text-4xl font-semibold mb-8">Forms</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <Card key={form.name} className="p-6 hover:shadow-hover transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-xl bg-lime-500/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-lime-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{form.name}</h3>
                  <p className="text-sm text-muted-foreground">{form.description}</p>
                </div>
              </div>
              <Button className="w-full">Open Form</Button>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Forms;
