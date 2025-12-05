import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, ChevronLeft, ChevronRight, ArrowRight, Check, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Announcement = {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  isExpired: boolean;
  isRead: boolean;
};

interface AnnouncementShowcaseProps {
  onOpen?: (announcementId: number) => void;
  onMarkAsRead?: (announcementId: number) => void;
  onViewAll?: () => void;
}

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "New Office Policy Update",
    content: "Starting next week, we will implement a hybrid work model.",
    date: "2 hours ago",
    author: "HR Department",
    isExpired: false,
    isRead: false,
  },
  {
    id: 2,
    title: "Holiday Schedule Announced",
    content: "Office will be closed on December 25th for Christmas.",
    date: "1 day ago",
    author: "Admin Team",
    isExpired: false,
    isRead: false,
  },
  {
    id: 3,
    title: "System Maintenance Notice",
    content: "Scheduled maintenance this weekend. System may be down for 2 hours.",
    date: "3 days ago",
    author: "IT Support",
    isExpired: false,
    isRead: false,
  },
  {
    id: 4,
    title: "New Training Program",
    content: "Enroll in our new leadership development program starting next Monday.",
    date: "5 days ago",
    author: "Learning & Development",
    isExpired: false,
    isRead: false,
  },
  {
    id: 5,
    title: "Q3 Results Published",
    content: "Company exceeded quarterly targets. Great work team!",
    date: "1 week ago",
    author: "Finance Team",
    isExpired: true,
    isRead: false,
  },
  {
    id: 6,
    title: "Summer Party Photos",
    content: "Check out the photos from our summer celebration event.",
    date: "2 weeks ago",
    author: "Social Committee",
    isExpired: true,
    isRead: false,
  },
];

const AnnouncementShowcase: React.FC<AnnouncementShowcaseProps> = ({
  onOpen = (id) => console.log("Open announcement:", id),
  onMarkAsRead = (id) => console.log("Mark as read:", id),
  onViewAll = () => console.log("View all announcements"),
}) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Only show active announcements (not read and not expired) in slider
  const activeAnnouncements = announcements.filter((a) => !a.isRead && !a.isExpired);
  
  // Always show at least one item (placeholder if empty)
  const hasAnnouncements = activeAnnouncements.length > 0;
  const displayAnnouncements = hasAnnouncements ? activeAnnouncements : [];

  // Auto-rotate announcements every 5 seconds (only if not hovered)
  useEffect(() => {
    if (!hasAnnouncements || isHovered) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % displayAnnouncements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [displayAnnouncements.length, hasAnnouncements, isHovered]);

  // Reset index if it's out of bounds
  useEffect(() => {
    if (currentIndex >= displayAnnouncements.length && displayAnnouncements.length > 0) {
      setCurrentIndex(0);
    }
  }, [displayAnnouncements.length, currentIndex]);

  const nextSlide = () => {
    if (!hasAnnouncements) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % displayAnnouncements.length);
  };

  const prevSlide = () => {
    if (!hasAnnouncements) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + displayAnnouncements.length) % displayAnnouncements.length);
  };

  const handleMarkAsRead = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
    onMarkAsRead(id);
  };

  const handleOpenAnnouncement = (id: number) => {
    onOpen(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(id);
    }
  };

  const currentAnnouncement = hasAnnouncements ? displayAnnouncements[currentIndex] : null;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <Card 
      className="relative overflow-hidden shadow-lg h-[220px] flex flex-col" 
      style={{ background: 'var(--header-gradient)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle texture grid */}
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(transparent_23px,rgba(255,255,255,0.18)_24px),linear-gradient(90deg,transparent_23px,rgba(255,255,255,0.18)_24px)] [background-size:24px_24px]" />
      
      <div className="relative p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Megaphone className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Announcements</h2>
              {hasAnnouncements && (
                <p className="text-[10px] text-white/70">
                  {activeAnnouncements.length} active
                </p>
              )}
            </div>
          </div>

          {/* Navigation & View All */}
          <div className="flex items-center gap-1">
            <button
              onClick={onViewAll}
              className="h-7 w-7 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="View all announcements"
              title="View all announcements"
            >
              <List className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={prevSlide}
              disabled={!hasAnnouncements}
              className="h-7 w-7 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous announcement"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={nextSlide}
              disabled={!hasAnnouncements}
              className="h-7 w-7 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Next announcement"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {/* Carousel Content */}
        <div className="relative h-28 overflow-hidden">
          {hasAnnouncements ? (
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <button
                  onClick={() => handleOpenAnnouncement(currentAnnouncement!.id)}
                  onKeyDown={(e) => handleKeyDown(e, currentAnnouncement!.id)}
                  className="w-full h-full bg-white/10 backdrop-blur-sm rounded-lg p-3 flex flex-col justify-between text-left transition-all hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label={`${currentAnnouncement?.title}. Click to view details.`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-sm font-semibold text-white line-clamp-1">
                        {currentAnnouncement?.title}
                      </h3>
                    </div>
                    <p className="text-xs text-white/80 line-clamp-2">
                      {currentAnnouncement?.content}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-white/70 mt-2">
                    <span>{currentAnnouncement?.author}</span>
                    <span>{currentAnnouncement?.date}</span>
                  </div>
                  
                  {/* Arrow indicator on hover */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-3 right-3"
                  >
                    <ArrowRight className="h-4 w-4 text-white" />
                  </motion.div>
                </button>

                {/* Dismiss Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => handleMarkAsRead(e, currentAnnouncement!.id)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-foreground backdrop-blur-sm transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 flex items-center gap-1.5 text-xs font-medium border border-white/20"
                  aria-label={`Dismiss ${currentAnnouncement?.title}`}
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Mark as read</span>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-3"
            >
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mb-2">
                <Check className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm font-medium text-white text-center mb-1">
                You're all caught up!
              </p>
              <p className="text-xs text-white/70 text-center mb-3">
                No new announcements at the moment
              </p>
              <Button
                onClick={onViewAll}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 text-xs h-7 border border-white/30"
              >
                View All
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Pagination Dots */}
        {hasAnnouncements && displayAnnouncements.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4 flex-shrink-0">
            {displayAnnouncements.map((announcement, idx) => (
              <button
                key={announcement.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all focus:outline-none focus:ring-1 focus:ring-white/50",
                  idx === currentIndex
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Go to announcement ${idx + 1}: ${announcement.title}`}
              />
            ))}
          </div>
        )}

        {/* View All Footer
        <div className="mt-3 pt-3 border-t border-white/20">
          <Button
            onClick={onViewAll}
            variant="ghost"
            size="sm"
            className="w-full text-white hover:bg-white/20 font-semibold text-xs h-8"
          >
            View All Announcements
            <ArrowRight className="h-3.5 w-3.5 ml-2" />
          </Button>
        </div> */}
      </div>
    </Card>
  );
};

export default AnnouncementShowcase;
