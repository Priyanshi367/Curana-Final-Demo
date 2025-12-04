import { Card } from "@/components/ui/card";
import { Calendar, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  { title: "Annual Health Summit", month: "FEB", day: "01", time: "Tuesday 9:00 AM - 5:00 PM" },
  { title: "Department Team Meeting", month: "FEB", day: "05", time: "Friday 2:00 PM - 3:30 PM" },
  { title: "Clinical Training Workshop", month: "FEB", day: "12", time: "Monday 10:00 AM - 12:00 PM" },
  { title: "Staff Recognition Ceremony", month: "FEB", day: "18", time: "Thursday 4:00 PM - 6:00 PM" },
];

const dynamicColors = [
  "hsl(var(--accent))",
  "hsl(142 76% 36%)",
  "hsl(221 83% 53%)",
  "hsl(30 95% 64%)",
  "hsl(262 83% 58%)",
  "hsl(0 84% 60%)",
];

const UpcomingEvents = () => {
  return (
    <Card className="p-4 sm:p-6 h-auto sm:h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold">Upcoming Events</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-accent hover:text-accent hidden sm:inline-flex text-xs sm:text-sm"
        >
          See all
        </Button>
      </div>

      {/* Add Event Button (compact on mobile) */}
      <Button
        variant="outline"
        className="w-full mb-3 sm:mb-5 justify-center gap-2 border-dashed text-sm py-2 hover:bg-accent/10 hover:border-accent/50"
      >
        <Plus className="h-4 w-4" />
        Add Event
      </Button>

      {/* Events List — don't force grow on mobile, allow scroll if very tall */}
      <div className="flex-none sm:flex-1 space-y-2 sm:space-y-3 overflow-auto sm:overflow-visible max-h-[52vh] sm:max-h-none">
        {events.map((event, index) => (
          <article
            key={index}
            className="group rounded-md transition-all bg-card border border-border p-3 sm:p-4 hover:border-accent/30 hover:bg-accent/5 cursor-pointer"
            aria-labelledby={`event-title-${index}`}
          >
            <div className="flex items-start gap-3">
              {/* Date */}
              <div className="flex-shrink-0">
                <div
                  className="h-12 w-12 rounded-lg flex flex-col items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: dynamicColors[index % dynamicColors.length] }}
                >
                  <span className="text-xs opacity-90">{event.month}</span>
                  <span className="text-lg leading-none">{event.day}</span>
                </div>
              </div>

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <h3
                  id={`event-title-${index}`}
                  className="font-semibold text-foreground group-hover:text-accent transition-colors text-sm sm:text-base mb-1 line-clamp-2"
                >
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                  {event.time}
                </p>
              </div>

              {/* Optional small action (desktop only) */}
              <div className="mt-2 sm:mt-0 sm:ml-3">
                <Button variant="ghost" className="text-accent p-0 text-sm hidden sm:inline-flex">
                  Details
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile See All button (visible on small screens) */}
      <div className="mt-4 sm:hidden">
        <Button variant="ghost" size="sm" className="w-full text-accent hover:font-semibold">
          View All Events <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
};

export default UpcomingEvents;
