import DashboardLayout from "@/components/DashboardLayout";
import PageBanner from "@/components/PageBanner";
import NewsAnnouncements from "@/components/dashboard/NewsAnnouncements";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import bannerImg from "@/assets/banner-news.jpg";

const News = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <PageBanner title="News & Updates" backgroundImage={bannerImg} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <NewsAnnouncements fromDashboard={false} />
          </div>
          <div>
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default News;
