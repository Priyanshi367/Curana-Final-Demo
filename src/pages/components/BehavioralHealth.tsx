import React from "react";
import { Mail, FileText, ExternalLink, User2, Heart, Users, Shield, Stethoscope, Brain, Activity } from "lucide-react";

const BehavioralHealth: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Header Section with Gradient */}
      <section className="text-center space-y-6 py-12 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary text-primary-foreground rounded-xl">
            <Heart className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Behavioral Health
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Curana&apos;s mission is to improve the{" "}
          <span className="font-semibold text-primary">
            health, happiness, and dignity
          </span>{" "}
          of senior living residents. Proactively identifying patients for
          specialty services, including behavioral health, is an essential
          part of meeting that commitment—ensuring every individual receives
          the right care, at the right time, for the best possible
          outcomes.
        </p>
      </section>

      {/* About Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight flex items-center justify-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            Our Behavioral Health Team
          </h2>
        </div>

        <div className="bg-card border border-primary/20 rounded-xl p-6 space-y-4 hover:shadow-lg transition-shadow">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our Behavioral Health team includes Board Certified Psychiatrists
            (MDs), Psychiatric Mental Health Nurse Practitioners (PMHNPs) and
            Physician Assistants (PAs) as well as psychotherapists which
            includes; Psychologists (PsyD/PhD), Licensed Clinical Social
            Workers (LCSW/LISW), Licensed Mental Health Counselors
            (LMHC/LCMHC), Licensed Professional Counselors (LPC/LCPC), and
            Licensed Marriage and Family Therapists (LMFT).
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Meet Our Team
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Karen Cando",
              role: "National Director of Psychology",
            },
            {
              name: "Connor Buckley",
              role: "Director of Clinical Operations",
            },
            {
              name: "Carol Gibbs",
              role: "Regional Medical Director",
            },
          ].map((member) => (
            <div
              key={member.name}
              className="bg-card border border-primary/20 rounded-xl p-6 hover:shadow-lg transition-shadow hover:border-primary/40"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">
                    {member.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platforms Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Our Platforms
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Ambience", icon: Shield, color: "bg-blue-500" },
            { title: "GEHRIMED", icon: Stethoscope, color: "bg-green-500" },
            { title: "Mentalyc", icon: Brain, color: "bg-purple-500" },
            { title: "Pearl", icon: Activity, color: "bg-orange-500" },
          ].map((platform) => (
            <div
              key={platform.title}
              className="group flex items-center gap-4 p-4 bg-card border border-primary/20 rounded-xl hover:shadow-lg hover:border-primary/40 transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className={`p-3 ${platform.color} text-white rounded-lg group-hover:scale-110 transition-transform`}>
                <platform.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium group-hover:text-primary transition-colors">
                  {platform.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Click to access platform
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-6 border border-primary/20">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Get in Touch</h3>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            If you are interested in learning more about our behavioral
            health program, reach out to our team.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold shadow hover:shadow-md transition-shadow hover:bg-primary/80"
          >
            <Mail className="h-4 w-4" />
            Email us
          </button>
        </div>
      </section>

      {/* Documents Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight flex items-center justify-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Documents & Resources
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Aid To Capacity Evaluation (ACE) Form.pdf",
            "Behavioral Health Crisis Response Procedure.pdf",
            "Behavioral Health Team.url",
            "Behavioral Health Hospice Tip Sheet.pdf",
          ].map((doc) => (
            <div
              key={doc}
              className="group flex items-start gap-4 p-4 bg-card border border-primary/20 rounded-xl hover:shadow-lg hover:border-primary/40 transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:scale-110 transition-transform mt-1">
                {doc.toLowerCase().endsWith(".url") ? (
                  <ExternalLink className="w-4 h-4" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                  {doc}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {doc.toLowerCase().endsWith(".url") ? "External link" : "PDF document"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BehavioralHealth;