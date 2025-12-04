import React from "react";
import { 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Mail, 
  HelpCircle, 
  ChevronRight,
  Users,
  Target,
  Award,
  TrendingUp,
  Heart,
  Brain,
  Activity
} from "lucide-react";

const HCCsComponent: React.FC = () => {
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
          HCC Resources
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Risk adjustment is a method used to ensure that the care provided to
          patients is both acknowledged and adequately supported. It links a
          patient's medical complexity to the appropriate allocation of
          resources and reimbursement necessary to deliver that care.
        </p>
      </section>

      {/* HCC Explanation Cards */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight flex items-center justify-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            Understanding HCCs
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-primary/20 rounded-xl p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">What are HCCs?</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              These models rely on{" "}
              <span className="font-semibold text-primary">
                Hierarchical Condition Categories (HCCs)
              </span>{" "}
              to group diagnoses based on the severity of illness and anticipate
              healthcare costs. The more accurately diagnoses are documented, the
              better the system can represent a patient's true health needs.
            </p>
          </div>

          <div className="bg-card border border-primary/20 rounded-xl p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">Your Role as Provider</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Assess and appropriately document chronic conditions</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Utilize InNote and Pearl to identify HCC gap opportunities</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Feel comfortable diagnosing conditions that exist in your patients</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-6 border border-primary/20">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-background rounded-lg border hover:border-primary/50 transition-colors">
            <span className="text-sm">Access InNote FAQs</span>
            <ChevronRight className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-center gap-3 p-3 bg-background rounded-lg border hover:border-primary/50 transition-colors">
            <Mail className="w-4 h-4 text-primary" />
            <div className="flex-1">
              <p className="text-sm">
                For more questions, reach out to{" "}
                <a
                  href="mailto:CDI@Curanahealth.com"
                  className="font-medium text-primary hover:underline"
                >
                  CDI@Curanahealth.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools and Resources */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          Tools and Resources
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "PEARL Training", icon: Award, color: "bg-blue-500" },
            { title: "InNote Resources", icon: BookOpen, color: "bg-green-500" },
            { title: "CDI Tip Sheets", icon: FileText, color: "bg-purple-500" },
          ].map((resource) => (
            <a
              key={resource.title}
              href="#"
              className="group flex items-center gap-4 p-4 bg-card border border-primary/20 rounded-xl hover:shadow-lg hover:border-primary/40 transition-all hover:-translate-y-1"
            >
              <div className={`p-3 ${resource.color} text-white rounded-lg group-hover:scale-110 transition-transform`}>
                <resource.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium group-hover:text-primary transition-colors">
                  {resource.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Click to access resource
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </section>

      {/* HCC Workday Course Links */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary" />
          HCC Workday Course Links
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Curana Pocket Guide", icon: BookOpen, quarter: "Guide" },
            { title: "HCCs and InNote", icon: Activity, quarter: "Basics" },
            { title: "HCC Q1 2025: Major Depressive Disorder", icon: Brain, quarter: "Q1 2025" },
            { title: "HCC Q2 2025: Four Top Conditions", icon: Heart, quarter: "Q2 2025" },
            { title: "HCC Q3 2025: Chronic Comprehensive Visits (CCVs)", icon: Users, quarter: "Q3 2025" },
            { title: "HCC Q4 2025: Crack the Code", icon: Award, quarter: "Q4 2025" },
          ].map((course) => (
            <a
              key={course.title}
              href="#"
              className="group flex items-start gap-4 p-4 bg-gradient-to-br from-card to-primary/5 border border-primary/20 rounded-xl hover:shadow-lg hover:border-primary/40 transition-all hover:-translate-y-1"
            >
              <div className="p-2 bg-primary text-primary-foreground rounded-lg group-hover:scale-110 transition-transform">
                <course.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                  {course.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {course.quarter}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HCCsComponent;
