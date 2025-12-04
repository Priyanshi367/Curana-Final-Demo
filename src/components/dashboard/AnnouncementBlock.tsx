import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, Clock, Megaphone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const announcements = [
  {
    id: 1,
    title: "New Office Policy",
    content: "Starting next week, we will implement a hybrid work model.",
    date: "2 hours ago",
    author: "HR Department",
    isNew: true,
    color: "bg-rose-400",
  },
  {
    id: 2,
    title: "Holiday Schedule",
    content: "Office will be closed on December 25th for Christmas.",
    date: "1 day ago",
    author: "Admin Team",
    isNew: true,
    color: "bg-emerald-400",
  },
  {
    id: 3,
    title: "System Maintenance",
    content: "Scheduled maintenance this weekend. System may be down for 2 hours.",
    date: "3 days ago",
    author: "IT Support",
    isNew: false,
    color: "bg-sky-400",
  },
];

const AnnouncementItem: React.FC<{ item: typeof announcements[0] }> = ({ item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{ scale: 1.01 }}
      className="group flex items-start gap-3 p-4 rounded-lg hover:bg-accent/5 transition-all border border-transparent hover:border-accent/10"
    >
      <div className="flex-shrink-0 mt-1">
        <div className={`h-9 w-9 rounded-lg flex items-center justify-center text-white ${item.color}`}>
          <span className="text-sm font-medium">
            {item.author
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-medium text-foreground group-hover:text-accent">
            {item.title}
          </h3>
          {item.isNew && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-accent/10 text-accent">
              New
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.content}
        </p>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <span className="text-foreground/80">{item.author}</span>
          <span className="w-1 h-1 rounded-full bg-muted" />
          <span>{item.date}</span>
        </div>
      </div>
    </motion.div>
  );
};

const AnnouncementBlock: React.FC = () => {
  return (
    <Card className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      <div className="p-5 sm:p-6 flex-1">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Megaphone className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Announcements</h2>
              <p className="text-xs text-muted-foreground">Latest updates & news</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-accent hover:bg-accent/10 hidden sm:inline-flex"
            aria-label="View all announcements"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Content List */}
        <div className="space-y-3">
          {announcements.map((a) => (
            <AnnouncementItem key={a.id} item={a} />
          ))}
        </div>
      </div>

      {/* View All Footer */}
      <div className="p-4 border-t bg-white/50 dark:bg-black/20">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-accent hover:bg-accent/10 font-medium"
        >
          View All Announcements
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default AnnouncementBlock;