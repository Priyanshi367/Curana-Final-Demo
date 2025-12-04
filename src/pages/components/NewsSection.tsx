import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Newspaper } from "lucide-react";
import React from "react";
import NewsCard from "./NewsCard";

interface NewsItem {
  title: string;
  snippet: string;
  time: string;
  image: string;
  category: string;
}

interface NewsSectionProps {
  newsItems: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ newsItems }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <Newspaper className="h-4 w-4 text-accent" />
            </div>
            <h2 className="text-lg font-semibold">Latest News</h2>
          </div>
          <Button variant="link" className="text-accent hover:text-accent/80 text-sm p-0">
            View All
          </Button>
        </div>

        <div className="hidden sm:block">
          <div className="space-y-4 sm:space-y-5 flex-1">
            {newsItems.map((news, index) => (
              <div 
                key={index} 
                className="group cursor-pointer rounded-xl overflow-hidden border border-border/50 hover:border-accent/40 hover:shadow-lg transition-all duration-300 bg-card/50 hover:bg-card/80"
              >
                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-[120px,1fr] gap-4 items-start">
                    <div className="w-full h-28 overflow-hidden rounded-md">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        loading="lazy" 
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">{news.time}</span>
                        <span className="text-xs text-muted-foreground hidden lg:inline">
                          {news.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-base text-foreground group-hover:text-accent transition-colors mb-2 line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {news.snippet}
                      </p>
                      <div className="mt-3 flex items-center text-accent text-sm font-medium group-hover:underline">
                        Read more
                        <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile horizontal scroller */}
        <div className="sm:hidden -mx-6 px-6">
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
            {newsItems.map((news, idx) => (
              <div key={idx} className="snap-start min-w-[280px] max-w-[280px] flex-shrink-0">
                <NewsCard news={news} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsSection;
