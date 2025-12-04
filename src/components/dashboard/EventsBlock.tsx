
import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface EventItem {
  id: number;
  title: string;
  date: string; // ISO date string or yyyy-MM-dd
  time: string;
  location?: string;
}

const initialEvents: EventItem[] = [
  { id: 1, title: "Weekly Updates", date: "2025-01-10", time: "09:00 AM - 10:00 AM" },
  { id: 2, title: "Town hall Meeting", date: "2025-01-15", time: "09:00 AM - 10:00 AM" },
  { id: 3, title: "HR Updates", date: "2025-01-18", time: "09:00 AM - 10:00 AM" },
  { id: 4, title: "Leadership Meeting", date: "2025-01-23", time: "09:00 AM - 10:00 AM" },
];

const EventsBlock: React.FC<{ events?: EventItem[] }> = ({ events = initialEvents }) => {
  return (
    <Card className="p-4 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-accent" />
          </div>
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-accent hover:text-accent hover:font-semibold hover:text-white"
          aria-label="View all events"
        >
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="mb-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted/30 text-sm">January</span>
      </div>

      <div className="space-y-3 flex-1">
        {events.map((ev) => {
          const dt = new Date(ev.date);
          const weekday = format(dt, "EEE");
          const day = format(dt, "d");

          return (
            <div
              key={ev.id}
              className="p-3 rounded-lg border border-border hover:border-accent/30 hover:bg-accent/5 transition-all cursor-pointer flex items-start gap-4 group"
            >
              <div
                className="flex-shrink-0 h-12 w-12 rounded-lg flex flex-col items-center justify-center font-semibold bg-accent/10 text-accent"
              >
                <span className="text-xs opacity-90">{weekday.toUpperCase()}</span>
                <span className="text-lg leading-none">{day}</span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                  {ev.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{ev.time}</span>
                  </div>
                  {ev.location && (
                    <div className="flex items-center gap-1">
                      <span className="truncate">{ev.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 sm:hidden">
        <Button variant="ghost" size="sm" className="w-full text-accent">
          View All Events
        </Button>
      </div>
    </Card>
  );
};

export default EventsBlock;
