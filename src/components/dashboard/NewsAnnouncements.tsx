import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

const newsItems = [
  {
    title: "New Healthcare Initiative Launch",
    snippet: "Curana Hub announces innovative patient care program...",
    time: "2 hours ago",
    image: news1,
  },
  {
    title: "Q1 Performance Excellence Awards",
    snippet: "Congratulations to our outstanding team members...",
    time: "5 hours ago",
    image: news2,
  },
  {
    title: "Updated Safety Protocols",
    snippet: "Review the latest safety and compliance guidelines...",
    time: "1 day ago",
    image: news3,
  },
];

const NewsAnnouncements = ({ fromDashboard }) => {
  return (
    <div>
      {
        fromDashboard ?
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">News & Announcements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((news) => (
                <Card
                  key={news.title}
                  className="overflow-hidden hover:shadow-hover transition-all cursor-pointer group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-accent font-medium mb-2">{news.time}</p>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{news.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{news.snippet}</p>
                    <button className="text-accent font-medium text-sm flex items-center gap-2 hover:gap-3 transition-all">
                      Read More <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          :
          <div className="space-y-6">
            {newsItems.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-hover transition-shadow">
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full md:w-64 h-48 object-cover flex-shrink-0"
                  />
                  <div className="p-5 flex-1">
                    <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-3">
                      Achievements
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{item.time}</div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.snippet}</p>
                    <button className="text-sm text-accent hover:underline flex items-center gap-1 font-medium">
                      Read More <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
      }

    </div>
  );
};

export default NewsAnnouncements;
