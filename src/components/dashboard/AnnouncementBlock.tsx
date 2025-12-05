import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, ArrowRight, Check, List, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  isNew: boolean;
  isExpired: boolean;
  isRead: boolean;
  color: string;
}

interface AnnouncementBlockProps {
  onOpen?: (announcementId: number) => void;
  onMarkAsRead?: (announcementId: number) => void;
  onViewAll?: () => void;
  maxVisible?: number;
}

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "New Office Policy",
    content: "Starting next week, we will implement a hybrid work model. All employees are required to attend office 3 days per week.",
    date: "2 hours ago",
    author: "HR Department",
    isNew: true,
    isExpired: false,
    isRead: false,
    color: "bg-rose-400",
  },
  {
    id: 2,
    title: "Holiday Schedule",
    content: "Office will be closed on December 25th for Christmas. Emergency contacts will be available.",
    date: "1 day ago",
    author: "Admin Team",
    isNew: true,
    isExpired: false,
    isRead: false,
    color: "bg-emerald-400",
  },
  {
    id: 3,
    title: "System Maintenance",
    content: "Scheduled maintenance this weekend. System may be down for 2 hours on Saturday night.",
    date: "3 days ago",
    author: "IT Support",
    isNew: false,
    isExpired: false,
    isRead: false,
    color: "bg-sky-400",
  },
  {
    id: 4,
    title: "Q4 Town Hall Meeting",
    content: "Join us for the quarterly town hall meeting to discuss company performance and future plans.",
    date: "5 days ago",
    author: "Leadership Team",
    isNew: false,
    isExpired: false,
    isRead: false,
    color: "bg-purple-400",
  },
  {
    id: 5,
    title: "Benefits Enrollment Deadline",
    content: "Reminder: Benefits enrollment closes this Friday. Make sure to review and submit your selections.",
    date: "1 week ago",
    author: "HR Department",
    isNew: false,
    isExpired: true,
    isRead: false,
    color: "bg-amber-400",
  },
  {
    id: 6,
    title: "Office Renovation Complete",
    content: "The 3rd floor renovation is now complete. New collaborative spaces are available for booking.",
    date: "2 weeks ago",
    author: "Facilities",
    isNew: false,
    isExpired: true,
    isRead: false,
    color: "bg-teal-400",
  },
];

const AnnouncementItem: React.FC<{
  item: Announcement;
  onOpen: (id: number) => void;
  onMarkAsRead: (id: number) => void;
}> = ({ item, onOpen, onMarkAsRead }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onOpen(item.id);
  };

  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkAsRead(item.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(item.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, height: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "group relative",
        item.isExpired && "opacity-60"
      )}
    >
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "w-full flex items-start gap-3 p-3 rounded-xl transition-all border text-left",
          "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
          item.isExpired
            ? "border-border/50 hover:bg-muted/30"
            : "border-transparent hover:bg-accent/5 hover:border-accent/10"
        )}
        aria-label={`${item.title}. ${item.isExpired ? "Expired. " : ""}${item.isNew ? "New announcement. " : ""}Click to view details.`}
      >
        <div className="flex-shrink-0 mt-0.5">
          <div
            className={cn(
              "h-9 w-9 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform",
              item.color,
              isHovered && !item.isExpired && "scale-110",
              item.isExpired && "opacity-50 grayscale"
            )}
          >
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
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3
              className={cn(
                "text-sm font-semibold transition-colors",
                item.isExpired
                  ? "text-muted-foreground"
                  : "text-foreground group-hover:text-accent"
              )}
            >
              {item.title}
            </h3>
            {item.isNew && !item.isExpired && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent text-white">
                NEW
              </span>
            )}
            {item.isExpired && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">
                <Clock className="h-3 w-3" />
                Expired
              </span>
            )}
          </div>
          <p
            className={cn(
              "text-xs leading-relaxed line-clamp-2",
              item.isExpired ? "text-muted-foreground/70" : "text-muted-foreground"
            )}
          >
            {item.content}
          </p>
          <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground">
            <span className={cn(item.isExpired ? "opacity-70" : "opacity-90")}>
              {item.author}
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span className={cn(item.isExpired ? "opacity-70" : "opacity-90")}>
              {item.date}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center gap-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <ArrowRight
              className={cn(
                "h-4 w-4 transition-colors",
                item.isExpired ? "text-muted-foreground" : "text-accent"
              )}
            />
          </motion.div>
        </div>
      </button>

      {/* Mark as Read Button */}
      {!item.isExpired && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.15 }}
          onClick={handleMarkAsRead}
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-lg bg-card border shadow-sm",
            "hover:bg-accent hover:text-white hover:border-accent transition-all",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1"
          )}
          aria-label={`Mark ${item.title} as read`}
          title="Mark as read"
        >
          <Check className="h-3.5 w-3.5" />
        </motion.button>
      )}
    </motion.div>
  );
};

const PlaceholderCard: React.FC<{ onViewAll: () => void }> = ({ onViewAll }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/10"
    >
      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg">
        <Megaphone className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No Active Announcements</h3>
      <p className="text-sm text-muted-foreground text-center mb-4">
        You're all caught up! Check the full list for archived announcements.
      </p>
      <Button
        onClick={onViewAll}
        variant="outline"
        size="sm"
        className="text-accent border-accent hover:bg-accent hover:text-white"
      >
        View All Announcements
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </motion.div>
  );
};

const AnnouncementBlock: React.FC<AnnouncementBlockProps> = ({
  onOpen = (id) => console.log("Open announcement:", id),
  onMarkAsRead = (id) => console.log("Mark as read:", id),
  onViewAll = () => console.log("View all announcements"),
  maxVisible = 4,
}) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [currentPage, setCurrentPage] = useState(0);

  // Filter out read announcements
  const visibleAnnouncements = announcements.filter((a) => !a.isRead);

  // Separate active and expired
  const activeAnnouncements = visibleAnnouncements.filter((a) => !a.isExpired);
  const expiredAnnouncements = visibleAnnouncements.filter((a) => a.isExpired);

  // Combine: active first, then expired
  const sortedAnnouncements = [...activeAnnouncements, ...expiredAnnouncements];

  // Pagination
  const totalPages = Math.ceil(sortedAnnouncements.length / maxVisible);
  const startIndex = currentPage * maxVisible;
  const endIndex = startIndex + maxVisible;
  const displayedAnnouncements = sortedAnnouncements.slice(startIndex, endIndex);

  const handleMarkAsRead = (id: number) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
    onMarkAsRead(id);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const hasAnnouncements = sortedAnnouncements.length > 0;
  const showPagination = totalPages > 1;

  return (
    <Card className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Megaphone className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">Announcements</h2>
              <p className="text-[11px] sm:text-xs text-muted-foreground">
                {hasAnnouncements
                  ? `${activeAnnouncements.length} active, ${expiredAnnouncements.length} expired`
                  : "No announcements"}
              </p>
            </div>
          </div>
          <Button
            onClick={onViewAll}
            variant="ghost"
            size="icon"
            className="text-accent hover:bg-accent/10 rounded-xl"
            aria-label="View all announcements in full list"
            title="View all announcements"
          >
            <List className="h-5 w-5" />
          </Button>
        </div>

        {/* Content List with Virtualized Scrolling */}
        <div className="flex-1 overflow-hidden">
          {hasAnnouncements ? (
            <div className="h-full overflow-y-auto pr-1 space-y-2 scrollbar-thin">
              <AnimatePresence mode="popLayout">
                {displayedAnnouncements.map((announcement) => (
                  <AnnouncementItem
                    key={announcement.id}
                    item={announcement}
                    onOpen={onOpen}
                    onMarkAsRead={handleMarkAsRead}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <PlaceholderCard onViewAll={onViewAll} />
          )}
        </div>

        {/* Pagination Controls */}
        {showPagination && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mt-4 pt-3 border-t"
          >
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              variant="ghost"
              size="sm"
              className="text-xs"
              aria-label="Previous page"
            >
              ← Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              variant="ghost"
              size="sm"
              className="text-xs"
              aria-label="Next page"
            >
              Next →
            </Button>
          </motion.div>
        )}
      </div>

      {/* View All Footer */}
      <div className="p-3 sm:p-4 border-t bg-white/50 dark:bg-black/20">
        <Button
          onClick={onViewAll}
          variant="ghost"
          size="sm"
          className="w-full text-accent hover:bg-accent/10 font-semibold rounded-xl"
          aria-label="View all announcements"
        >
          View All Announcements
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default AnnouncementBlock;