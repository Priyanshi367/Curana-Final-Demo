import { ArrowRight } from "lucide-react";
import React from "react";

interface NewsCardProps {
  news: {
    title: string;
    snippet: string;
    time: string;
    image: string;
    category: string;
  };
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => (
  <article className="group flex flex-col sm:flex-row gap-4 items-stretch w-full">
    <div className="relative flex-shrink-0 w-full sm:w-36 lg:w-44 h-44 sm:h-28 lg:h-24 overflow-hidden rounded-lg bg-muted/10">
      <img 
        src={news.image} 
        alt={news.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        loading="lazy" 
      />
      <span className="absolute bottom-2 left-2 bg-accent/95 text-white text-xs px-2 py-1 rounded-md z-20">
        {news.category}
      </span>
    </div>

    <div className="flex-1 min-w-0 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>{news.time}</span>
        </div>

        <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-accent transition-colors mb-1 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {news.snippet}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2 text-accent text-sm font-medium">
        <span className="flex items-center gap-2 group-hover:underline cursor-pointer">
          Read more <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </article>
);

export default NewsCard;
