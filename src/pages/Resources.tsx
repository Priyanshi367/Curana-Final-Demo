import DashboardLayout from "@/components/DashboardLayout";
import PageBanner from "@/components/PageBanner";
import bannerImg from "@/assets/banner-resources.jpg";
import ApplicationsSection from "./components/ApplicationsSection";
import { clinicalApps, administrativeApps } from "./data";

const Resources = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <PageBanner title="My Resources" backgroundImage={bannerImg}  />

        {/* Quick Links Grid */}
        {/* <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Card
                  key={link.name}
                  className="p-4 hover:shadow-hover transition-all cursor-pointer group"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div
                      className="h-12 w-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${link.color}15` }}
                    >
                      <IconComponent className="h-6 w-6" style={{ color: link.color }} />
                    </div>
                    <p className="text-sm font-medium text-foreground">{link.name}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div> */}

        {/* Applications Sections */}
        <div className="space-y-8">
          <ApplicationsSection
            title="Clinical Applications"
            description="Quick access to clinical tools"
            apps={clinicalApps}
            icon="stethoscope"
          />

          <ApplicationsSection
            title="Administrative Applications"
            description="Business & operational tools"
            apps={administrativeApps}
            icon="users"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Resources;
