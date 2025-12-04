import { useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PageBanner from "@/components/PageBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import bannerImg from "@/assets/banner-calendar.jpg";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Sample events
const events = [
  { day: 10, time: "10:00 AM", title: "Team Meeting", color: "#0078d4" },
  { day: 15, time: "10:00 AM", title: "Team Meeting", color: "#0078d4" },
  { day: 18, time: "2:00 PM", title: "Project Review", color: "#862c8f" },
  { day: 22, time: "9:00 AM", title: "Training Session", color: "#10b981" },
  { day: 25, time: "3:30 PM", title: "Department Sync", color: "#f59e0b" },
];

function getDaysGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: { day: number | null; date: Date | null }[] = [];

  for (let i = 0; i < firstDay; i++) days.push({ day: null, date: null });
  for (let d = 1; d <= daysInMonth; d++)
    days.push({ day: d, date: new Date(year, month, d) });

  // pad to complete weeks (42 cells)
  while (days.length % 7 !== 0) days.push({ day: null, date: null });
  return { days, daysInMonth, firstDay };
}

const CalendarPage = () => {
  const now = new Date();
  const [viewDate, setViewDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const isToday = (d?: Date | null) =>
    !!d &&
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();

  const { days } = useMemo(() => getDaysGrid(currentYear, currentMonth), [currentMonth, currentYear]);

  const dayEvents = (d?: number | null) => (d ? events.filter((e) => e.day === d) : []);

  const goPrev = () => setViewDate(new Date(currentYear, currentMonth - 1, 1));
  const goNext = () => setViewDate(new Date(currentYear, currentMonth + 1, 1));
  const goToday = () => setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <PageBanner title="Calendar" backgroundImage={bannerImg} />

        <Card className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                {months[currentMonth]} {currentYear}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9" onClick={goPrev} aria-label="Previous month">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={goToday}>Today</Button>
              <Button variant="outline" size="icon" className="h-9 w-9" onClick={goNext} aria-label="Next month">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button className="ml-1 gap-2 bg-accent text-white hover:bg-accent/90">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Event</span>
              </Button>
            </div>
          </div>

          {/* Mobile agenda view (<= sm) */}
          <div className="sm:hidden space-y-3">
            {days
              .filter((c) => c.day !== null)
              .map((c, idx) => (
                <div
                  key={`m-${idx}`}
                  className={`rounded-xl border p-3 flex items-start gap-3 ${
                    isToday(c.date) ? "bg-accent/5 border-accent/40" : "bg-card"
                  }`}
                >
                  <div className="shrink-0 w-12 h-12 grid place-items-center rounded-lg border text-sm font-semibold">
                    <div className="text-muted-foreground -mb-0.5">{daysOfWeek[c.date!.getDay()]}</div>
                    <div className={`text-lg leading-none ${isToday(c.date) ? "text-accent" : "text-foreground"}`}>
                      {c.day}
                    </div>
                  </div>

                  <div className="grow">
                    {dayEvents(c.day).length ? (
                      <ul className="space-y-2">
                        {dayEvents(c.day).map((ev, i) => (
                          <li key={i} className="text-sm">
                            <span
                              className="inline-flex items-center px-2 py-1 rounded font-medium text-white"
                              style={{ backgroundColor: ev.color }}
                            >
                              {ev.time}
                            </span>
                            <span className="ml-2 font-medium text-foreground/90 truncate inline-block align-middle max-w-[12rem]">
                              {ev.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-muted-foreground">No events</div>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Desktop / tablet month grid (>= sm) */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-7 gap-0 border rounded-lg overflow-hidden">
              {/* Day headers */}
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-xs md:text-sm text-muted-foreground py-2 md:py-3 border-b bg-muted/30"
                >
                  {day}
                </div>
              ))}

              {/* Days */}
              {days.map((cell, index) => (
                <div
                  key={index}
                  className={`min-h-[84px] md:min-h-[110px] p-1.5 md:p-2 border-t -mt-px -ml-px ${
                    cell.day === null
                      ? "bg-muted/10"
                      : isToday(cell.date)
                      ? "bg-accent/5 ring-1 ring-inset ring-accent/40"
                      : "hover:bg-muted/20"
                  }`}
                >
                  {cell.day !== null && (
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-1">
                        <div className={`text-xs md:text-sm font-medium ${isToday(cell.date) ? "text-accent" : "text-foreground"}`}>
                          {cell.day}
                        </div>
                      </div>

                      <div className="space-y-1 overflow-hidden">
                        {dayEvents(cell.day).map((ev, i) => (
                          <div
                            key={i}
                            className="text-[10px] md:text-xs px-1.5 md:px-2 py-1 rounded text-white font-medium truncate"
                            style={{ backgroundColor: ev.color }}
                            title={`${ev.time} - ${ev.title}`}
                          >
                            {ev.time} — {ev.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
