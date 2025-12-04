import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Megaphone, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Announcement = {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
};

const announcements: Announcement[] = [
  {
    id: 1,
    title: "New Office Policy Update",
    content: "Starting next week, we will implement a hybrid work model.",
    date: "2 hours ago",
    author: "HR Department",
  },
  {
    id: 2,
    title: "Holiday Schedule Announced",
    content: "Office will be closed on December 25th for Christmas.",
    date: "1 day ago",
    author: "Admin Team",
  },
  {
    id: 3,
    title: "System Maintenance Notice",
    content: "Scheduled maintenance this weekend. System may be down for 2 hours.",
    date: "3 days ago",
    author: "IT Support",
  },
  {
    id: 4,
    title: "New Training Program",
    content: "Enroll in our new leadership development program starting next Monday.",
    date: "5 days ago",
    author: "Learning & Development",
  },
];

const AnnouncementShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-rotate announcements every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const currentAnnouncement = announcements[currentIndex];

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
    <Card className="relative overflow-hidden shadow-lg" style={{ background: 'var(--header-gradient)' }}>
      {/* Subtle texture grid */}
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(transparent_23px,rgba(255,255,255,0.18)_24px),linear-gradient(90deg,transparent_23px,rgba(255,255,255,0.18)_24px)] [background-size:24px_24px]" />
      
      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Megaphone className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-base font-semibold text-white">Announcements</h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              className="h-7 w-7 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="h-7 w-7 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {/* Carousel Content */}
        <div className="relative h-24 overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
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
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">
                    {currentAnnouncement.title}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2">
                    {currentAnnouncement.content}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-white/70 mt-2">
                  <span>{currentAnnouncement.author}</span>
                  <span>{currentAnnouncement.date}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {announcements.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === currentIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AnnouncementShowcase;
