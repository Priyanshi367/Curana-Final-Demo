// import { Card } from "@/components/ui/card";
// import { Calendar, Clock, MapPin, ArrowRight, Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { format, parseISO, parse } from "date-fns";   // ⬅️ added `parse`
// import { useEvents } from "@/hooks/useEvents";
// import { Skeleton } from "@/components/ui/skeleton";

// const getDynamicColor = (index: number) => {
//   const colors = [
//     "hsl(var(--accent))",
//     "hsl(142 76% 36%)",
//     "hsl(221 83% 53%)",
//     "hsl(30 95% 64%)",
//     "hsl(262 83% 58%)",
//     "hsl(0 84% 60%)",
//     "hsl(120 61% 50%)",
//     "hsl(280 84% 65%)"
//   ];
//   return colors[index % colors.length];
// };

// // ⬇️ updated helper to also handle StartTime / EndTime
// const formatEventTime = (
//   dateString: string,
//   startTime?: string | null,
//   endTime?: string | null
// ) => {
//   const date = parseISO(dateString);

//   let timeLabel = "";

//   if (startTime) {
//     const start = parse(startTime, "HH:mm:ss.SSS", date);
//     timeLabel = format(start, "h:mm a");

//     if (endTime) {
//       const end = parse(endTime, "HH:mm:ss.SSS", date);
//       timeLabel += ` - ${format(end, "h:mm a")}`;
//     }
//   }

//   return {
//     date: format(date, "MMM d, yyyy"),
//     time: timeLabel, // e.g. "12:45 AM - 1:15 AM"
//     month: format(date, "MMM").toUpperCase(),
//     day: format(date, "dd"),
//   };
// };

// const EventsBlock = () => {
//   const { data: events = [], isLoading, isError } = useEvents();

//   if (isError) {
//     return (
//       <Card className="p-6">
//         <div className="text-center text-red-500">
//           Failed to load events. Please try again later.
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <Card className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-semibold">Upcoming Events</h2>
//         <Button variant="ghost" size="sm" className="text-accent">
//           View All <ArrowRight className="h-4 w-4 ml-1" />
//         </Button>
//       </div>

//       <div className="space-y-4">
//         {isLoading ? (
//           Array(3)
//             .fill(0)
//             .map((_, i) => (
//               <div key={i} className="flex items-start gap-4 p-3 rounded-lg border">
//                 <Skeleton className="h-12 w-12 rounded-md" />
//                 <div className="flex-1 space-y-2">
//                   <Skeleton className="h-4 w-3/4" />
//                   <Skeleton className="h-3 w-1/2" />
//                 </div>
//               </div>
//             ))
//         ) : events?.length === 0 ? (
//           <div className="text-center py-8 text-muted-foreground">
//             No upcoming events
//           </div>
//         ) : (
//           events?.slice(0, 3).map((event: any, index: number) => {
//             const { time, month, day } = formatEventTime(
//               event.EventDate,
//               event.StartTime,
//               event.EndTime
//             );
//             const eventType = event.type || "Company Wide";
//             const color = getDynamicColor(index);

//             return (
//               <div
//                 key={event.id}
//                 className="group rounded-md transition-all bg-card border border-border p-3 sm:p-4 hover:shadow-sm"
//               >
//                 <div className="flex items-start gap-4">
//                   <div
//                     className="flex flex-col items-center justify-center w-12 h-12 rounded-md text-white p-2"
//                     style={{ backgroundColor: color }}
//                   >
//                     <span className="text-xs font-medium">{month}</span>
//                     <span className="text-lg font-bold leading-none">{day}</span>
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-1">
//                       {event.Title}
//                     </h3>
//                     <div className="flex items-center text-xs text-muted-foreground">
//                       <Clock className="h-3 w-3 mr-1" />
//                       {/* ⬇️ shows StartTime - EndTime */}
//                       <span className="mr-3">
//                         {time || "Time not specified"}
//                       </span>
//                       {event.location && (
//                         <>
//                           <MapPin className="h-3 w-3 mr-1" />
//                           <span>{event.location}</span>
//                         </>
//                       )}
//                     </div>
//                   </div>

//                   <span
//                     className="inline-block px-2 py-0.5 rounded text-xs font-medium text-white"
//                     style={{
//                       backgroundColor: `${color}`,
//                       color: "white",
//                     }}
//                   >
//                     {eventType}
//                   </span>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </Card>
//   );
// };

// export default EventsBlock;

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, ArrowRight, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

const eventTypes = [
  { label: "Company Wide", value: "Company Wide", color: "hsl(var(--accent))" },
  { label: "Industry Event", value: "Industry Event", color: "hsl(142 76% 36%)" },
  { label: "Onboarding", value: "Onboarding", color: "hsl(221 83% 53%)" },
  { label: "Training", value: "Training", color: "hsl(30 95% 64%)" },
  { label: "Team Meeting", value: "Team Meeting", color: "hsl(262 83% 58%)" },
];

const initialEvents = [
  {
    id: 1,
    title: "Monthly Town Hall Meeting",
    date: "Mar 28, 2024",
    time: "10:00 AM - 11:30 AM",
    location: "Main Auditorium",
    type: "Company Wide",
    color: "hsl(var(--accent))",
  },
  {
    id: 2,
    title: "Healthcare Innovation Summit",
    date: "Apr 05, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Conference Center",
    type: "Industry Event",
    color: "hsl(142 76% 36%)",
  },
  {
    id: 3,
    title: "New Staff Orientation",
    date: "Apr 12, 2024",
    time: "2:00 PM - 4:00 PM",
    location: "Training Room B",
    type: "Onboarding",
    color: "hsl(221 83% 53%)",
  },
  {
    id: 4,
    title: "Quarterly Strategy Review",
    date: "Apr 20, 2024",
    time: "1:00 PM - 3:00 PM",
    location: "Executive Boardroom",
    type: "Team Meeting",
    color: "hsl(262 83% 58%)",
  },
];

const EventsBlock = () => {
  const [events, setEvents] = useState(initialEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    type: eventTypes[0].value,
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const eventType = eventTypes.find(type => type.value === newEvent.type);
    
    const newEventObj = {
      id: events.length + 1,
      title: newEvent.title,
      date: format(new Date(newEvent.date), 'MMM dd, yyyy'),
      time: newEvent.time,
      location: newEvent.location,
      type: newEvent.type,
      color: eventType?.color || "hsl(var(--accent))"
    };

    setEvents([...events, newEventObj]);
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      type: eventTypes[0].value,
    });
    setIsDialogOpen(false);
  };
  return (
    <Card className="p-4 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold">Upcoming Events</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-accent hover:text-accent hover:font-semibold hover:text-white hidden sm:inline-flex text-xs sm:text-sm"
          aria-label="View all events"
        >
          View All <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
        </Button>
      </div>

      {/* Add Event Button with Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full mb-4 justify-center gap-2 border-dashed text-sm py-2 hover:bg-accent/10 hover:border-accent/50 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Add New Event
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Title</label>
              <Input
                placeholder="Enter event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="Enter location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Type</label>
              <div className="grid grid-cols-2 gap-2">
                {eventTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md border ${
                      newEvent.type === type.value 
                        ? 'border-accent bg-accent/10 text-accent' 
                        : 'border-border hover:bg-accent/5'
                    } transition-colors`}
                    onClick={() => setNewEvent({...newEvent, type: type.value})}
                  >
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: type.color }}
                    />
                    <span className="text-sm">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-accent hover:bg-accent/90">
                Add Event
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="space-y-2 flex-1">
        {events.map((event, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-border hover:border-accent/30 hover:bg-accent/5 transition-all cursor-pointer group"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div
                  className="h-12 w-12 rounded-lg flex flex-col items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: event.color }}
                >
                  <span className="text-xs opacity-90">
                    {event.date.split(" ")[0]}
                  </span>
                  <span className="text-lg leading-none">
                    {event.date.split(" ")[1].replace(",", "")}
                  </span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                  {event.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span
                    className="inline-block px-2 py-0.5 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.type}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View All button (visible on small screens) */}
      <div className="mt-4 sm:hidden">
        <Button variant="ghost" size="sm" className="w-full text-accent hover:font-semibold hover:text-white">
          View All Events
        </Button>
      </div>
    </Card>
  );
};

export default EventsBlock;
