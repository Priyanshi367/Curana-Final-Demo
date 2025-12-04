import { Card } from "@/components/ui/card";
import { Newspaper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

const newsItems = [
  {
    id: "1",
    title: "New Healthcare Initiative Launch",
    snippet: "Curana Hub announces innovative patient care program...",
    time: "2 hours ago",
    image: news1,
    category: "Healthcare",
  },
  {
    id: "2",
    title: "Q1 Performance Excellence Awards",
    snippet: "Congratulations to our outstanding team members...",
    time: "5 hours ago",
    image: news2,
    category: "Recognition",
  },
  {
    id: "3",
    title: "Updated Safety Protocols",
    snippet: "Review the latest safety and compliance guidelines...",
    time: "1 day ago",
    image: news3,
    category: "Policy",
  },
];

const NewsBlock = () => {
  const navigate = useNavigate();

  const handleNewsClick = (newsId: string) => {
    navigate(`/news/${newsId}`);
  };

  const handleViewAll = () => {
    navigate("/news");
  };

  return (
    <Card className="p-4 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Newspaper className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold">Latest News</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAll}
          className="text-accent hover:text-accent hover:font-semibold hover:text-white hidden sm:inline-flex text-xs sm:text-sm"
        >
          View All <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-3 sm:space-y-4 flex-1">
        {newsItems.map((news, index) => (
          <div
            key={index}
            onClick={() => handleNewsClick(news.id)}
            className="group cursor-pointer rounded-xl overflow-hidden border border-border hover:border-accent/40 hover:shadow-md transition-all duration-300 bg-card/60"
          >
            <div className="flex flex-col sm:flex-row sm:items-stretch gap-0 sm:gap-4">
              <div className="w-full aspect-video sm:aspect-auto h-44 sm:h-auto sm:w-44 lg:w-56 lg:h-auto flex-shrink-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
                  loading="lazy"
                />
                <span className="absolute bottom-2 left-2 bg-accent/90 text-white text-[11px] px-2.5 py-0.5 rounded-full z-20 shadow-sm">
                  {news.category}
                </span>
              </div>

              <div className="flex-1 p-4 sm:p-5 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">
                    {news.time}
                  </span>
                </div>
                <h3 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-accent transition-colors mb-2 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 leading-relaxed">
                  {news.snippet}
                </p>
                <div className="mt-3 flex items-center text-accent text-sm font-medium group-hover:underline">
                  Read more
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View All button (visible on small screens) */}
      <div className="mt-4 sm:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAll}
          className="w-full text-accent hover:font-semibold hover:text-white"
        >
          View All News <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
};

export default NewsBlock;