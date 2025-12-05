import DashboardLayout from "@/components/DashboardLayout";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import QuickLinks from "@/components/dashboard/QuickLinks";
import NewsBlock from "@/components/dashboard/NewsBlock";
import EventsBlock from "@/components/dashboard/EventsBlock";
import EssentialTools from "@/components/dashboard/EssentialTools";
import FavoriteAppsCarousel from "@/components/dashboard/FavoriteAppsCarousel";
import AnnouncementShowcase from "@/components/dashboard/AnnouncementShowcase";
import MyFiles from "@/components/dashboard/MyFiles";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleOpenAnnouncement = (id: number) => {
    console.log("Opening announcement:", id);
    navigate("/announcements");
  };

  const handleMarkAsRead = (id: number) => {
    console.log("Marking announcement as read:", id);
    // Update announcement read status in global state/API
  };

  const handleViewAllAnnouncements = () => {
    navigate("/announcements");
  };

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
            <AnnouncementShowcase
              onOpen={handleOpenAnnouncement}
              onMarkAsRead={handleMarkAsRead}
              onViewAll={handleViewAllAnnouncements}
            />
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
