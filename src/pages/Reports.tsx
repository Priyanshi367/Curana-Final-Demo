import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";
import bannerImg from "@/assets/reports.png";
import PageBanner from "@/components/PageBanner";

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <PageBanner title="Reports & Analytics" backgroundImage={bannerImg} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Patient Volume</h3>
                <p className="text-sm text-muted-foreground">Monthly trends</p>
              </div>
            </div>
            <p className="text-3xl font-semibold mb-2">1,248</p>
            <p className="text-sm text-teal-500 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              +12.5% from last month
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Staff Utilization</h3>
                <p className="text-sm text-muted-foreground">Current period</p>
              </div>
            </div>
            <p className="text-3xl font-semibold mb-2">87%</p>
            <p className="text-sm text-teal-500 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              +3.2% from last month
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-violet-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Patient Satisfaction</h3>
                <p className="text-sm text-muted-foreground">Average score</p>
              </div>
            </div>
            <p className="text-3xl font-semibold mb-2">4.8/5.0</p>
            <p className="text-sm text-teal-500 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              +0.3 from last quarter
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-teal-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Revenue Growth</h3>
                <p className="text-sm text-muted-foreground">Year over year</p>
              </div>
            </div>
            <p className="text-3xl font-semibold mb-2">+18.4%</p>
            <p className="text-sm text-teal-500 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Exceeding targets
            </p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
