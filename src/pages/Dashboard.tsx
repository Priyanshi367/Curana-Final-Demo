import DashboardLayout from "@/components/DashboardLayout";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import QuickLinks from "@/components/dashboard/QuickLinks";
import NewsBlock from "@/components/dashboard/NewsBlock";
import NewsBlockCompact from "@/components/dashboard/NewsBlockCompact";
import NewsBlockGrid from "@/components/dashboard/NewsBlockGrid";
import NewsBlockVertical from "@/components/dashboard/NewsBlockVertical";
import NewsBlockMinimal from "@/components/dashboard/NewsBlockMinimal";
import NewsBlockMagazine from "@/components/dashboard/NewsBlockMagazine";
import EventsBlock from "@/components/dashboard/EventsBlock";
import ApplicationsGrid from "@/components/dashboard/ApplicationsGrid";
import EssentialTools from "@/components/dashboard/EssentialTools";
import FavoriteAppsCarousel from "@/components/dashboard/FavoriteAppsCarousel";
import AnnouncementShowcase from "@/components/dashboard/AnnouncementShowcase";
import MyTeam from "@/components/dashboard/MyTeam";
import MyFiles from "@/components/dashboard/MyFiles";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto px-4 space-y-6 mt-5">
        {/* Compact Welcome Banner */}
        <WelcomeBanner />

        {/* Favorite Apps Carousel & Announcements Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="md:col-span-1 xl:col-span-2">
            <FavoriteAppsCarousel />
          </div>
          <div className="md:col-span-1 xl:col-span-1">
            <AnnouncementShowcase />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* News & Events */}
          <div className="lg:col-span-1 xl:col-span-2">
            <NewsBlock />
          </div>
          <div className="lg:col-span-1 xl:col-span-1">
            <EventsBlock />
          </div>

          {/* Quick Access & Tools */}
          <div className="lg:col-span-1">
            <QuickLinks />
          </div>
          <div className="lg:col-span-1">
            <MyFiles />
          </div>
          <div className="lg:col-span-1">
            <EssentialTools />
          </div>

          {/* All Applications & Team Section */}
          <div className="lg:col-span-1 xl:col-span-2">
            {/* <ApplicationsGrid /> */}
          </div>
          <div className="lg:col-span-1 xl:col-span-1">
            {/* <MyTeam /> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
