import defirst from "@/assets/defirst.png";
import pearl from "@/assets/pearl.png";
import goTo from "@/assets/goto.png";
import inCare from "@/assets/incare.png";
import vitalCheck from "@/assets/vitalcheck.png";
import sutureHealth from "@/assets/suturehealth.png";
import gehrimed from "@/assets/gehrimed.png";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import team from "@/assets/teams.png";
import helpdesk from "@/assets/helpdesk.png";
import navan from "@/assets/navan.png";
import workday from "@/assets/workday.png";

export const clinicalApps = [
  { 
    id: 'gehrimed',
    name: "GEHRIMED", 
    description: "Electronic Health Records", 
    image: gehrimed, 
    popular: true,
    category: 'clinical'
  },
  { 
    id: 'pearl',
    name: "Pearl", 
    description: "Clinical Documentation", 
    image: pearl,
    category: 'clinical'
  },
  { 
    id: 'goto',
    name: "GoTo", 
    description: "Patient Portal Access", 
    image: goTo,
    category: 'clinical'
  },
  { 
    id: 'innote',
    name: "InNote", 
    description: "Clinical Notes Management", 
    image: inCare,
    category: 'clinical'
  },
  { 
    id: 'incare',
    name: "InCare", 
    description: "Care Coordination Platform", 
    image: inCare,
    category: 'clinical'
  },
  { 
    id: 'vitalcheck',
    name: "VitalCheck", 
    description: "Vital Signs Monitoring", 
    image: vitalCheck,
    category: 'clinical'
  },
  { 
    id: 'drfirst',
    name: "DrFirst", 
    description: "ePrescribing Solutions", 
    image: defirst,
    category: 'clinical'
  },
  { 
    id: 'suturehealth',
    name: "SutureHealth", 
    description: "Surgical Care Management", 
    image: sutureHealth,
    category: 'clinical'
  },
];

export const administrativeApps = [
  { 
    id: 'hrconnect',
    name: "HR Connect", 
    description: "Human Resources Management", 
    image: team, 
    popular: true,
    category: 'administrative'
  },
  { 
    id: 'itsupport',
    name: "IT Support", 
    description: "Technical Assistance", 
    image: helpdesk,
    category: 'administrative'
  },
  { 
    id: 'navan',
    name: "Navan", 
    description: "Travel & Expense Management", 
    image: navan,
    category: 'administrative'
  },
  { 
    id: 'workday',
    name: "Workday", 
    description: "HR & Payroll System", 
    image: workday, 
    popular: true,
    category: 'administrative'
  },
];

export const newsItems = [
  { 
    title: "New Healthcare Initiative Launch", 
    snippet: "Curana Hub announces innovative patient care program...", 
    time: "2 hours ago", 
    image: news1, 
    category: "Healthcare" 
  },
  { 
    title: "Q1 Performance Excellence Awards", 
    snippet: "Congratulations to our outstanding team members...", 
    time: "5 hours ago", 
    image: news2, 
    category: "Recognition" 
  },
  { 
    title: "Updated Safety Protocols", 
    snippet: "Review the latest safety and compliance guidelines...", 
    time: "1 day ago", 
    image: news3, 
    category: "Policy" 
  },
];

export const menu = [
  { 
    id: "Home", 
    label: "Home", 
    icon: "Home"
  },
  { 
    id: "Tip Sheets", 
    label: "Tip Sheets", 
    icon: "FileText",
    children: [
      "Advance Primary Care Management (APCM)",
      "HCCs",
      "Quality Incentive Program",
      "Behavioral Health",
      "Senior Living"
    ] 
  },
  { 
    id: "Resource Hub", 
    label: "Resource Hub", 
    icon: "BookOpen" 
  },
  { 
    id: "Clinical Tools", 
    label: "Clinical Tools", 
    icon: "Stethoscope",
    children: [
      "Ambience",
      "InNote/InCare",
      "GEHRIMED",
      "PEARL"
    ] 
  },
  { 
    id: "Clinical Education", 
    label: "Clinical Education", 
    icon: "ClipboardList" 
  },
  { 
    id: "CDI", 
    label: "CDI", 
    icon: "CheckCircle" 
  },
  { 
    id: "Quality", 
    label: "Quality", 
    icon: "CheckCircle" 
  },
  { 
    id: "Events", 
    label: "Events", 
    icon: "Calendar", 
    children: ["Town Halls", "Office Hours"] 
  },
  { 
    id: "Support Center", 
    label: "Support Center", 
    icon: "LifeBuoy" 
  },
  { 
    id: "Edit", 
    label: "Edit", 
    icon: "Edit3" 
  },
];
