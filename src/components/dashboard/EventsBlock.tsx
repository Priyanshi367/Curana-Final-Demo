
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, Plus, Link2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface EventItem {
  id: number;
  title: string;
  date: string; // ISO date string or yyyy-MM-dd
  time: string;
  location?: string;
  role: 'PROVIDER' | 'NON_PROVIDER' | 'ALL';
  subRoles?: string[];
  meetingLink?: string;
}

const PROVIDER_SUBROLES = ['LEADERSHIP', 'CLINICAL', 'ADMINISTRATIVE'];
const NON_PROVIDER_SUBROLES = ['IT', 'LEGAL', 'HR', 'FINANCE', 'NON_PROVIDER_LEADERSHIP'];
const ALL_SUBROLES = [...PROVIDER_SUBROLES, ...NON_PROVIDER_SUBROLES];

const initialEvents: EventItem[] = [
  { id: 1, title: "Weekly Updates", date: "2025-01-10", time: "09:00 AM - 10:00 AM", role: 'ALL', meetingLink: 'https://meet.example.com/weekly' },
  { id: 2, title: "Town hall Meeting", date: "2025-01-15", time: "02:00 PM - 03:00 PM", role: 'ALL', meetingLink: 'https://meet.example.com/townhall' },
  { id: 3, title: "HR Updates", date: "2025-01-18", time: "11:00 AM - 12:00 PM", role: 'NON_PROVIDER', subRoles: ['LEGAL', 'HR'], meetingLink: 'https://meet.example.com/hr' },
  { id: 4, title: "Leadership Meeting", date: "2025-01-23", time: "09:00 AM - 10:00 AM", role: 'PROVIDER', subRoles: ['LEADERSHIP'], meetingLink: 'https://meet.example.com/leadership' },
];

const EventsBlock: React.FC<{ events?: EventItem[] }> = ({ events: initialPropsEvents = initialEvents }) => {
  const [events, setEvents] = useState<EventItem[]>(initialPropsEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<EventItem, 'id'>>({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '09:00 AM - 10:00 AM',
    role: 'ALL',
    subRoles: [],
    meetingLink: ''
  });

  // Auto-select all subroles when main role changes
  useEffect(() => {
    if (newEvent.role === 'ALL') {
      setNewEvent(prev => ({ ...prev, subRoles: [...ALL_SUBROLES] }));
    } else if (newEvent.role === 'PROVIDER') {
      setNewEvent(prev => ({ ...prev, subRoles: [...PROVIDER_SUBROLES] }));
    } else if (newEvent.role === 'NON_PROVIDER') {
      setNewEvent(prev => ({ ...prev, subRoles: [...NON_PROVIDER_SUBROLES] }));
    }
  }, [newEvent.role]);

  const getAvailableSubRoles = () => {
    if (newEvent.role === 'ALL') return { provider: PROVIDER_SUBROLES, nonProvider: NON_PROVIDER_SUBROLES };
    if (newEvent.role === 'PROVIDER') return { provider: PROVIDER_SUBROLES, nonProvider: [] };
    if (newEvent.role === 'NON_PROVIDER') return { provider: [], nonProvider: NON_PROVIDER_SUBROLES };
    return { provider: [], nonProvider: [] };
  };

  const toggleSubRole = (subRole: string) => {
    setNewEvent(prev => ({
      ...prev,
      subRoles: prev.subRoles?.includes(subRole)
        ? prev.subRoles.filter(sr => sr !== subRole)
        : [...(prev.subRoles || []), subRole]
    }));
  };

  const filteredEvents = events;

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(0, ...events.map(e => e.id)) + 1;
    setEvents([...events, { ...newEvent, id: newId }]);
    setIsModalOpen(false);
    setNewEvent({
      title: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '09:00 AM - 10:00 AM',
      role: 'ALL',
      subRoles: [],
      meetingLink: ''
    });
  };
  return (
    <Card className="p-4 sm:p-6 h-full flex flex-col">
      <div className="flex flex-col gap-4 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
          </div>
          <div className="flex gap-2">

            <Button
              variant="ghost"
              size="sm"
              className="text-accent hover:text-accent hover:font-semibold hover:text-white"
              aria-label="View all events"
            >
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>


      </div>

      <div className="mb-3 flex items-center gap-2 justify-between">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted/30 text-sm">January</span>

        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" /> Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] p-0 flex flex-col overflow-hidden">
            <DialogHeader className="pb-4 px-6 pt-6 bg-gradient-to-br from-accent/5 via-background to-background">
              <DialogTitle className="text-2xl bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                Add New Event
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddEvent} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 space-y-6 pb-6">
                {/* Event Details Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-base">Event Title *</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Enter event title"
                      className="h-11"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-base">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="h-11"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-base">Time *</Label>
                      <Input
                        id="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        placeholder="e.g., 09:00 AM - 10:00 AM"
                        className="h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meetingLink" className="text-base">Meeting Link</Label>
                    <div className="relative">
                      <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="meetingLink"
                        type="url"
                        value={newEvent.meetingLink || ''}
                        onChange={(e) => setNewEvent({ ...newEvent, meetingLink: e.target.value })}
                        placeholder="https://meet.example.com/event"
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base">Location</Label>
                    <Input
                      id="location"
                      value={newEvent.location || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="Enter location (optional)"
                      className="h-11"
                    />
                  </div>
                </div>

                <Separator />

                {/* Role Selection Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base">Main Role *</Label>
                    <Select
                      value={newEvent.role}
                      onValueChange={(value: 'ALL' | 'PROVIDER' | 'NON_PROVIDER') => {
                        setNewEvent({
                          ...newEvent,
                          role: value
                        });
                      }}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select main role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">All Roles</SelectItem>
                        <SelectItem value="PROVIDER">Provider</SelectItem>
                        <SelectItem value="NON_PROVIDER">Non-Provider</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sub-Roles Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">Sub-Roles (Multiple Select)</Label>
                      <span className="text-xs text-muted-foreground">
                        {newEvent.subRoles?.length || 0} selected
                      </span>
                    </div>
                    
                    <div className="border rounded-lg p-5 space-y-4 bg-gradient-to-br from-accent/5 via-muted/20 to-muted/30">
                      {/* Selected Badges */}
                      {newEvent.subRoles && newEvent.subRoles.length > 0 && (
                        <div className="flex flex-wrap gap-2 pb-3 border-b border-border/50">
                          {newEvent.subRoles.map(subRole => (
                            <Badge 
                              key={subRole} 
                              variant="secondary" 
                              className="gap-1.5 py-1 px-3 bg-gradient-to-r from-accent/20 to-accent/10 border-accent/30"
                            >
                              {subRole.replace(/_/g, ' ')}
                              <X
                                className="h-3.5 w-3.5 cursor-pointer hover:text-destructive transition-colors"
                                onClick={() => toggleSubRole(subRole)}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Provider Sub-Roles */}
                      {getAvailableSubRoles().provider.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                            Provider Roles
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {getAvailableSubRoles().provider.map(subRole => (
                              <label
                                key={subRole}
                                className="flex items-center gap-3 p-3 rounded-md border border-border/50 hover:border-accent/50 hover:bg-gradient-to-br hover:from-accent/10 hover:to-accent/5 cursor-pointer transition-all group"
                              >
                                <div className="relative flex items-center justify-center">
                                  <input
                                    type="checkbox"
                                    checked={newEvent.subRoles?.includes(subRole) || false}
                                    onChange={() => toggleSubRole(subRole)}
                                    className="sr-only peer"
                                  />
                                  <div className="h-5 w-5 rounded border-2 border-muted-foreground/30 peer-checked:border-accent peer-checked:bg-gradient-to-br peer-checked:from-accent peer-checked:to-accent/80 transition-all flex items-center justify-center">
                                    {newEvent.subRoles?.includes(subRole) && (
                                      <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                                    )}
                                  </div>
                                </div>
                                <span className="text-sm font-medium group-hover:text-accent transition-colors">
                                  {subRole.replace(/_/g, ' ')}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Non-Provider Sub-Roles */}
                      {getAvailableSubRoles().nonProvider.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                            Non-Provider Roles
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {getAvailableSubRoles().nonProvider.map(subRole => (
                              <label
                                key={subRole}
                                className="flex items-center gap-3 p-3 rounded-md border border-border/50 hover:border-accent/50 hover:bg-gradient-to-br hover:from-accent/10 hover:to-accent/5 cursor-pointer transition-all group"
                              >
                                <div className="relative flex items-center justify-center">
                                  <input
                                    type="checkbox"
                                    checked={newEvent.subRoles?.includes(subRole) || false}
                                    onChange={() => toggleSubRole(subRole)}
                                    className="sr-only peer"
                                  />
                                  <div className="h-5 w-5 rounded border-2 border-muted-foreground/30 peer-checked:border-accent peer-checked:bg-gradient-to-br peer-checked:from-accent peer-checked:to-accent/80 transition-all flex items-center justify-center">
                                    {newEvent.subRoles?.includes(subRole) && (
                                      <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                                    )}
                                  </div>
                                </div>
                                <span className="text-sm font-medium group-hover:text-accent transition-colors">
                                  {subRole.replace(/_/g, ' ')}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground italic">
                      All sub-roles are selected by default. Uncheck to exclude specific sub-roles.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sticky Footer with Buttons */}
              <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-background/95 border-t px-6 py-4 mt-auto">
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="px-6">
                    Cancel
                  </Button>
                  <Button type="submit" className="px-6 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70">
                    Save Event
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3 flex-1">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No events found for the selected filters.
          </div>
        ) : (
          filteredEvents.map((ev) => {
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

                {ev.meetingLink && (
                  <a
                    href={ev.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 h-9 w-9 rounded-lg flex items-center justify-center bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all"
                    onClick={(e) => e.stopPropagation()}
                    title="Join Meeting"
                  >
                    <Link2 className="h-4 w-4" />
                  </a>
                )}
              </div>
            );
          }))}
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
