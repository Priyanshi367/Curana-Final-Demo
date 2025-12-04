import DashboardLayout from "@/components/DashboardLayout";
import PageBanner from "@/components/PageBanner";
import { Card } from "@/components/ui/card";
import { List, FileText, Users, Wallet, IdCard, Globe, HeartPulse, BookOpen, Network } from "lucide-react";
import bannerImg from "@/assets/banner-help.jpg";

const helpCategories = [
  { title: "Compliance", icon: List },
  { title: "CDI (Clinical Documentation Integrity)", icon: FileText },
  { title: "GEHRIMED Support", icon: HeartPulse },
  { title: "Human Resources", icon: Users },
  { title: "Quality", icon: Network },
  { title: "Provider Compensation", icon: Wallet },
  { title: "Payroll", icon: Wallet },
  { title: "Credentialing", icon: IdCard },
  { title: "Technology Support", icon: Globe },
  { title: "Learning/Education", icon: BookOpen },
  { title: "Population Health", icon: HeartPulse },
];

const Help = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <PageBanner title="Help Center" backgroundImage={bannerImg} />
        
        <h2 className="text-2xl font-semibold mb-6">How can we help you?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.title}
                className="p-6 hover:shadow-hover transition-all cursor-pointer group bg-card"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-accent flex items-center justify-center group-hover:scale-105 transition-transform">
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base flex-1">{category.title}</h3>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Help;
