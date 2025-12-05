import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Megaphone, ArrowLeft, Search, Check, Clock, Calendar, User, X } from "lucide-react";
import { Eye, Clock, User, Calendar, Megaphone, Check, CheckCircle, RotateCcw, ArrowLeft, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type Announcement = {
  id: number;
  title: string;
  content: string;
  fullContent?: string;
  date: string;
  author: string;
  isExpired: boolean;
  isRead: boolean;
  color: string;
};

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "New Office Policy Update",
    content: "Starting next week, we will implement a hybrid work model.",
    fullContent: "Starting next week, we will implement a hybrid work model. All employees are required to attend office 3 days per week. Please coordinate with your team leads for scheduling.",
    date: "2 hours ago",
    author: "HR Department",
    isExpired: false,
    isRead: false,
    color: "bg-rose-400",
  },
  {
    id: 2,
    title: "Holiday Schedule Announced",
    content: "Office will be closed on December 25th for Christmas.",
    fullContent: "Office will be closed on December 25th for Christmas. Emergency contacts will be available. Please plan your work accordingly.",
    date: "1 day ago",
    author: "Admin Team",
    isExpired: false,
    isRead: false,
    color: "bg-emerald-400",
  },
  {
    id: 3,
    title: "System Maintenance Notice",
    content: "Scheduled maintenance this weekend. System may be down for 2 hours.",
    fullContent: "Scheduled maintenance this weekend. System may be down for 2 hours on Saturday night starting at 10 PM. Please save your work before this time.",
    date: "3 days ago",
    author: "IT Support",
    isExpired: false,
    isRead: false,
    color: "bg-sky-400",
  },
  {
    id: 4,
    title: "New Training Program",
    content: "Enroll in our new leadership development program starting next Monday.",
    fullContent: "Enroll in our new leadership development program starting next Monday. This 6-week program will help you develop essential leadership skills. Limited seats available.",
    date: "5 days ago",
    author: "Learning & Development",
    isExpired: false,
    isRead: false,
    color: "bg-purple-400",
  },
  {
    id: 5,
    title: "Q3 Results Published",
    content: "Company exceeded quarterly targets. Great work team!",
    fullContent: "Company exceeded quarterly targets. Great work team! We achieved 125% of our revenue goals and expanded our customer base by 40%. Thank you for your hard work.",
    date: "1 week ago",
    author: "Finance Team",
    isExpired: true,
    isRead: false,
    color: "bg-amber-400",
  },
  {
    id: 6,
    title: "Summer Party Photos",
    content: "Check out the photos from our summer celebration event.",
    fullContent: "Check out the photos from our summer celebration event. Photos are now available on the company portal. Tag yourself and share your favorite moments!",
    date: "2 weeks ago",
    author: "Social Committee",
    isExpired: true,
    isRead: false,
    color: "bg-teal-400",
  },
];

const Announcements = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "active" | "expired" | "read">("all");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const handleMarkAsRead = (id: number) => {
    const announcement = announcements.find((a) => a.id === id);
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
    toast({
      title: "Announcement dismissed",
      description: `"${announcement?.title}" has been marked as read.`,
      duration: 3000,
    });
  };

  const handleMarkAsUnread = (id: number) => {
    const announcement = announcements.find((a) => a.id === id);
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: false } : a))
    );
    toast({
      title: "Marked as unread",
      description: `"${announcement?.title}" has been marked as unread.`,
      duration: 3000,
    });
  };

  // Filter announcements
  const filteredAnnouncements = announcements.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterType === "all" ? true :
        filterType === "active" ? !a.isExpired && !a.isRead :
          filterType === "expired" ? a.isExpired :
            filterType === "read" ? a.isRead : true;

    return matchesSearch && matchesFilter;
  });

  // Separate by status
  const activeAnnouncements = filteredAnnouncements.filter((a) => !a.isExpired && !a.isRead);
  const expiredAnnouncements = filteredAnnouncements.filter((a) => a.isExpired && !a.isRead);
  const readAnnouncements = filteredAnnouncements.filter((a) => a.isRead);

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-4 mb-6">
            <div
              className="h-14 w-14 rounded-xl flex items-center justify-center shadow-lg text-white"
              style={{ background: 'var(--header-gradient)' }}
            >
              <Megaphone className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">All Announcements</h1>
              <p className="text-sm text-muted-foreground">
                {activeAnnouncements.length} active • {expiredAnnouncements.length} expired • {readAnnouncements.length} read
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
                className={cn(filterType === "all" && "text-white shadow-md")}
                style={filterType === "all" ? { background: 'var(--header-gradient)' } : {}}
              >
                All
              </Button>
              <Button
                variant={filterType === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("active")}
                className={cn(filterType === "active" && "text-white shadow-md")}
                style={filterType === "active" ? { background: 'var(--header-gradient)' } : {}}
              >
                Active
              </Button>
              <Button
                variant={filterType === "expired" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("expired")}
                className={cn(filterType === "expired" && "text-white shadow-md")}
                style={filterType === "expired" ? { background: 'var(--header-gradient)' } : {}}
              >
                Expired
              </Button>
              <Button
                variant={filterType === "read" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("read")}
                className={cn(filterType === "read" && "text-white shadow-md")}
                style={filterType === "read" ? { background: 'var(--header-gradient)' } : {}}
              >
                Read
              </Button>
            </div>
          </div>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAsUnread={handleMarkAsUnread}
                  onClick={() => setSelectedAnnouncement(announcement)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <div
                  className="h-20 w-20 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20"
                  style={{ background: 'var(--header-gradient)' }}
                >
                  <Megaphone className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No announcements found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Detail Modal */}
        {selectedAnnouncement && (
          <AnnouncementDetailModal
            announcement={selectedAnnouncement}
            onClose={() => setSelectedAnnouncement(null)}
            onMarkAsRead={handleMarkAsRead}
            onMarkAsUnread={handleMarkAsUnread}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

// Announcement Card Component
const AnnouncementCard: React.FC<{
  announcement: Announcement;
  onMarkAsRead: (id: number) => void;
  onMarkAsUnread: (id: number) => void;
  onClick: () => void;
}> = ({ announcement, onMarkAsRead, onMarkAsUnread, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Card
        className={cn(
          "p-5 cursor-pointer transition-all hover:shadow-xl relative overflow-hidden group",
          announcement.isRead
            ? "bg-muted/20"
            : announcement.isExpired
              ? "bg-gradient-to-br from-muted/30 to-muted/10"
              : "",
          "hover:bg-muted/10"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {/* Subtle gradient overlay on hover */}
        {isHovered && !announcement.isRead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--accent) / 0.03) 0%, transparent 50%)'
            }}
          />
        )}

        <div className="flex items-start gap-4 relative">
          <div
            className={cn(
              "h-11 w-11 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0 transition-all",
              announcement.isRead && "opacity-70 grayscale-[20%]",
              isHovered && !announcement.isRead && "scale-110 shadow-md"
            )}
            style={{ background: 'var(--header-gradient)' }}
          >
            <Megaphone className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className={cn(
                    "text-base font-semibold transition-colors inline-flex items-center",
                    announcement.isRead ? "text-muted-foreground" : "text-foreground"
                  )}>
                    {announcement.title}
                  </h3>
                  {announcement.isExpired && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                      <Clock className="h-3 w-3" />
                      Expired
                    </span>
                  )}
                  {announcement.isRead && !announcement.isExpired && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                      <Check className="h-3 w-3" />
                      Read
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
              {announcement.content}
            </p>

            <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
              <span className="flex items-center gap-1.5">
                <User className="h-3 w-3" />
                {announcement.author}
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {announcement.date}
              </span>
            </div>
          </div>

          {/* Dismiss Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 right-0"
          >
            <Button
              variant="outline"
              className={cn(
                "h-7 px-2.5 text-xs font-medium rounded-md flex items-center gap-1.5 border transition-all duration-150 hover:text-inherit",

                announcement.isRead
                  ? "bg-[#EEF2FF] text-[#3A4E95] border-[#D4DAF8] hover:bg-[#EEF2FF]/80"
                  : "bg-[#E9F9EF] text-[#1B8A3D] border-[#CDEBD7] hover:bg-[#E9F9EF]/80"
              )}
            >
              {announcement.isRead ? (
                <>
                  <RotateCcw className="h-3.5 w-3.5" />
                  Mark Unread
                </>
              ) : (
                <>
                  <CheckCircle className="h-3.5 w-3.5" />
                  Mark as Read
                </>
              )}
            </Button>



          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

// Detail Modal Component
const AnnouncementDetailModal: React.FC<{
  announcement: Announcement;
  onClose: () => void;
  onMarkAsRead: (id: number) => void;
  onMarkAsUnread: (id: number) => void;
}> = ({ announcement, onClose, onMarkAsRead, onMarkAsUnread }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="bg-card rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="p-6 border-b"
          style={{ background: 'linear-gradient(to bottom right, hsl(var(--accent) / 0.05), transparent)' }}
        >
          <div className="flex items-start gap-4">
            <div
              className="h-14 w-14 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
              style={{ background: 'var(--header-gradient)' }}
            >
              <Megaphone className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                {announcement.title}
              </h2>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {announcement.author}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {announcement.date}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <p className="text-base text-foreground leading-relaxed">
            {announcement.fullContent || announcement.content}
          </p>
        </div>

        <div className="p-6 border-t bg-muted/20 flex items-center justify-between">
          <div className="flex gap-2">
            {announcement.isExpired && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted text-muted-foreground border border-border">
                <Clock className="h-3.5 w-3.5" />
                Expired
              </span>
            )}
            {announcement.isRead && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted text-muted-foreground border border-border">
                <Check className="h-3.5 w-3.5" />
                Read
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {announcement.isRead ? (
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  onMarkAsUnread(announcement.id);
                  onClose();
                }}
              >
                Mark as Unread
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={() => {
                  onMarkAsRead(announcement.id);
                  onClose();
                }}
                className="text-white shadow-md hover:shadow-lg transition-all"
                style={{ background: 'var(--header-gradient)' }}
              >
                <CheckCircle  className="h-4 w-4 mr-2" />
                Mark as read
              </Button>
            )}
            <Button variant="ghost" size="lg" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Announcements;
