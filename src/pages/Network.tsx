import DashboardLayout from "@/components/DashboardLayout";
// Network.tsx
import {
  Users,
  Activity,
  Award,
  Building2,
  Stethoscope,
  BarChart3,
  HeartHandshake,
  Trophy,
} from "lucide-react";
import networkMap from "@/assets/network-map.png";
import operatorLogo from "@/assets/workday.png";
import opBrookdale from "@/assets/brookdale.png";
import opCare from "@/assets/care.png";
import opOptalis from "@/assets/optalise.png";
import opPruitt from "@/assets/pruitt.png";
import opSunrise from "@/assets/sunrise.png";
import mapdetails from "@/assets/mapdetails.png"
import defaultAvatar from "@/assets/profile-avatar.jpg";
import RegionMap from "./RegionMap";
import StaticRegionMap from "./StaticRegionMap";


const operators = [
  { name: "Brookdale Senior Living", logo: opBrookdale },
  { name: "Care Initiatives", logo: opCare },
  { name: "Optalis Health & Rehabilitation", logo: opOptalis },
  { name: "PruittHealth", logo: opPruitt },
  { name: "Sunrise Senior Living", logo: opSunrise },
];

const stats = [
  { icon: Users, title: "200K+ patients served annually", description: "in 1,500+ facilities" },
  { icon: Stethoscope, title: "2,200 Associates", description: "APPS, physicians, admin & shared services" },
  { icon: Activity, title: "$1.5B Medicare risk managed", description: "ACOs + MA" },
  { icon: BarChart3, title: "MSSP ACO: #2 in nation", description: "High Needs REACH in top 3%" },
  { icon: Building2, title: "Nationwide footprint", description: "Coast-to-coast care network" },
  { icon: HeartHandshake, title: "Leading operator partners", description: "Deep, long-term relationships" },
  { icon: Award, title: "Quality & outcomes focused", description: "Clinical excellence initiatives" },
  { icon: Trophy, title: "Top Medicare Advantage", description: "High-performing I-SNPs" },
];

const regions: {
  name: string;
  people: { name: string; title: string; avatar?: string }[];
}[] = [
    {
      name: "West Region",
      people: [
        { name: "Kelly Hamilton", title: "Senior Vice President of Operations", avatar: defaultAvatar },
        { name: "Paula Requeijo", title: "Chief Medical Officer - ELT", avatar: defaultAvatar },
      ],
    },
    {
      name: "Midwest Region",
      people: [
        { name: "Tasha Janssen", title: "Vice President of Operations", avatar: defaultAvatar },
        { name: "Brian Whyms", title: "Regional Medical Director (VP Level)", avatar: defaultAvatar },
      ],
    },
    {
      name: "Northeast Region",
      people: [
        { name: "Amy Young", title: "Senior Vice President of Operations", avatar: defaultAvatar },
        { name: "Val Smetka", title: "Regional Medical Director (VP Level)", avatar: defaultAvatar },
      ],
    },
    {
      name: "Southeast Region",
      people: [
        { name: "Stephanie Bell", title: "Vice President of Operations", avatar: defaultAvatar },
        { name: "Greg Bugaj", title: "Regional Medical Director (VP Level)", avatar: defaultAvatar },
      ],
    },
    {
      name: "South Region",
      people: [
        { name: "Tara Jones", title: "Vice President of Operations", avatar: defaultAvatar },
        { name: "Brian Cooper", title: "Regional Medical Director (VP Level)", avatar: defaultAvatar },
      ],
    },
  ];

const Network = () => {

  return (
    <DashboardLayout>
      <section className="w-full bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
              Curana Network
            </h2>
           
          </div>

          {/* Row 1 — Map + Operators */}
          <div className="grid gap-8 lg:grid-cols-2 items-start mb-10">
            {/* Map */}
            <div className="w-full">
              <div className="relative rounded-2xl bg-card overflow-hidden shadow-sm border border-border/40 aspect-[16/10] hover:shadow-md transition-shadow">
                <img
                  src={networkMap}
                  alt="Curana network coverage map"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Operators */}
            <div className="w-full space-y-4">
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground text-center lg:text-left">
                We work with leading operators
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {operators.map((op) => (
                  <div
                    key={op.name}
                    className="group flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card px-4 py-5 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all text-center duration-200 will-change-transform hover:-translate-y-0.5"
                  >
                    <img
                      src={op.logo || operatorLogo}
                      alt={`${op.name} logo`}
                      className="h-12 sm:h-16 mb-3 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    <p className="text-xs sm:text-sm font-medium text-foreground/90 leading-snug group-hover:text-foreground">
                      {op.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 — FULL-WIDTH Stats */}
          <div className="w-full">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.title}
                    className="flex items-start gap-3 rounded-xl bg-card px-3 py-3 sm:px-4 sm:py-4 border border-border/30 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 will-change-transform hover:-translate-y-0.5"
                  >
                    <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold leading-snug">
                        {stat.title}
                      </p>
                      {stat.description && (
                        <p className="text-xs text-muted-foreground leading-snug">
                          {stat.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 3 — Regional Leadership */}
          <div className="w-full mt-12">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-6">
              Regional Leadership
            </h3>
            <StaticRegionMap regions={regions} />
          </div>

          <div className="w-full mt-12">
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-6">
                Regional Leadership (option 2)
              </h3>

              <div className="order-1 lg:order-2">
                <RegionMap regions={regions as any} />
              </div>
            </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Network;
