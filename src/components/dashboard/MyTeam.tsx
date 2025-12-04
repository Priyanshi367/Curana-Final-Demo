import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Lead Physician',
    avatar: '/avatars/sarah.jpg',
    status: 'online'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    role: 'Cardiologist',
    avatar: '/avatars/michael.jpg',
    status: 'in-meeting'
  },
  {
    id: 3,
    name: 'Natalie Rivera',
    role: 'Head Nurse',
    avatar: '/avatars/natalie.jpg',
    status: 'online'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Radiology Tech',
    avatar: '/avatars/david.jpg',
    status: 'offline'
  },
  {
    id: 5,
    name: 'Dr. Lisa Wong',
    role: 'Pediatrician',
    avatar: '',
    status: 'online'
  },
 
];

const MyTeam = () => {
  return (
    <Card className="h-full flex flex-col p-6">
      {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-xl font-semibold">My Team</h2>
          </div>
          <Button variant="ghost" size="sm" className="text-accent hover:text-white h-8">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

      {/* Team Members List */}
      <div className="space-y-2">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center p-2 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors group"
          >
            <div className="relative mr-3">
              <div className="h-10 w-10 rounded-full bg-accent/10 group-hover:bg-accent/15 transition-colors">
                <Avatar className="h-full w-full">
                  <AvatarImage
                    src={member.avatar}
                    alt={member.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-accent/10 text-accent text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
              <p className="text-xs text-muted-foreground truncate">{member.role}</p>
            </div>
            {/* <div className="ml-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div> */}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MyTeam;
