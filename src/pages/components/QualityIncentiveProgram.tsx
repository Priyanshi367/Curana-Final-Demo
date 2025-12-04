import React from "react";
import { 
  Target, 
  TrendingUp, 
  Award, 
  Calendar, 
  DollarSign, 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  Heart, 
  Activity, 
  Brain,
  Shield,
  Star,
  ChevronRight,
  Lightbulb,
  Building,
  HandHeart,
  Stethoscope
} from "lucide-react";

const QualityIncentiveProgram: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary text-primary-foreground rounded-xl">
            <Award className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Quality Incentive Program
        </h1>
        <h2 className="text-2xl font-semibold text-primary">
          Our 2025 Program Goals
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Building a stronger foundation for value-based care through aligned incentives and measurable outcomes
        </p>
      </section>

      {/* Program Goals Blocks */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight flex items-center justify-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Strategic Program Goals
          </h2>
        </div>

        <div className="space-y-6">
          {/* Build from clinical goals */}
          <div className="group bg-card border border-primary/20 rounded-xl overflow-hidden hover:shadow-lg transition-all">
            <div className="grid md:grid-cols-[300px,1fr]">
              <div className="bg-gradient-to-br bg-primary text-primary-foreground p-8 flex items-center">
                <div className="space-y-3">
                  <div className="p-3 bg-white/20 rounded-lg inline-block">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl">Build from clinical goals</h3>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Define clinical impact we wish to achieve</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Outline the metric that we will use as proxy/measurement of our results</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Design metrics and program that are the same for all value-based payment arrangements as much as practical</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Establish incentives aligned with goals */}
          <div className="group bg-card border border-primary/20 rounded-xl overflow-hidden hover:shadow-lg transition-all">
            <div className="grid md:grid-cols-[300px,1fr]">
              <div className="bg-gradient-to-br bg-primary text-primary-foreground p-8 flex items-center">
                <div className="space-y-3">
                  <div className="p-3 bg-white/20 rounded-lg inline-block">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl">Establish incentives aligned with goals</h3>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Increase financial opportunity for meeting metrics with most value for patients, providers and Curana</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Provide mix of activities / outcomes and individual / team metrics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Align bonus amount for different patients with potential clinical value creation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Start from where we are today */}
          <div className="group bg-card border border-primary/20 rounded-xl overflow-hidden hover:shadow-lg transition-all">
            <div className="grid md:grid-cols-[300px,1fr]">
              <div className="bg-gradient-to-br bg-primary text-primary-foreground p-8 flex items-center">
                <div className="space-y-3">
                  <div className="p-3 bg-white/20 rounded-lg inline-block">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl">Start from where we are today</h3>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Adjust mix of outcomes and bonuses for activities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Continue to focus on metrics and goals that are familiar to providers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Expand to a limited set of additional metrics that are key to our MA value-based care agreements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight flex items-center justify-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Program Overview
          </h2>
        </div>

        {/* Table 1: Accurate documentation */}
        <div className="bg-card border border-primary/20 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r bg-primary text-primary-foreground p-4">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Accurate Documentation Metrics
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-primary/10 border-b border-primary/20">
                  <th className="px-4 py-3 text-left font-semibold text-primary w-64">
                    Metric
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-primary">2025 Amounts</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary w-40">Time</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary w-80">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* 1. Assess and Document HCCs - per condition */}
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 font-medium" rowSpan={2}>
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-primary" />
                      1. Assess and Document HCCs
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <span className="font-semibold text-primary">$5 to $15</span>
                      <p className="text-xs text-muted-foreground">per condition based on training</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Quarterly</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-2 text-xs">
                      <p>Applies to all VBC Patients as prompted in InNote. Earned by individual providers.</p>
                      <div className="bg-primary/5 rounded p-2">
                        <p className="font-semibold mb-1">Per condition bonus:</p>
                        <ul className="space-y-1">
                          <li className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            $5 – no training
                          </li>
                          <li className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            $10 – 50% group training
                          </li>
                          <li className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            $15 – 100% group + individual trainings
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
                {/* 1. Assess and Document HCCs - definitely chronic */}
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-primary">$60</span>
                    <p className="text-xs text-muted-foreground">per definitely chronic condition</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Annually</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <p>Earned by individual providers. Bonus threshold &gt;85% recapture.</p>
                  </td>
                </tr>

                {/* 2. AWV */}
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-primary" />
                      2. AWV
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">$60</span>
                        <span className="text-xs text-muted-foreground">&lt;60 days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">$30</span>
                        <span className="text-xs text-muted-foreground">other visits</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Quarterly</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <p>Earned by individual providers on visits prompted in InNote. Primary Care VBC patients only.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footnotes for table 1 */}
        <div className="bg- primary/5 rounded-lg p-4 text-xs space-y-2 border border-primary/20">
          <div className="flex items-start gap-2">
            <span className="text-primary font-semibold">1.</span>
            <p>The list of definitely chronic conditions has been determined by Curana clinical leadership and is available on cHello.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-semibold">2.</span>
            <p>ICD10 codes may contain acute + chronic conditions; underlying chronic condition persistence counts for recapture.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-semibold">3.</span>
            <p>Not all providers will be asked to complete individual training; if none requested, considered 100% completion.</p>
          </div>
        </div>

        {/* Table 2: Medical Expense Mgmt */}
        <div className="bg-card border border-primary/20 rounded-xl overflow-hidden mt-8">
          <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-4">
            <h3 className="font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Medical Expense Management Metrics
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-primary/10 border-b border-primary/20">
                  <th className="px-4 py-3 text-left font-semibold text-primary w-64">
                    Metric
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-primary">2025 Amounts</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary w-40">Time</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary w-80">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* 3. Reduce unnecessary IP APK */}
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-primary" />
                      3. Reduce unnecessary IP APK
                    </div>
                    <ol className="list-decimal list-inside mt-2 space-y-1 text-xs text-muted-foreground ml-6">
                      <li>Timely Post Discharge Visits</li>
                      <li>2025 Region Specific Initiative</li>
                    </ol>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">$1,000</span>
                        <span className="text-xs">post discharge visits</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">$1,000</span>
                        <span className="text-xs">region initiatives</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs">
                        <Calendar className="w-3 h-3 text-primary" />
                        <span>Quarterly (1)</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Calendar className="w-3 h-3 text-primary" />
                        <span>H2 2025 (2)</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <p className="mb-2">Based on group performance. Primary care providers eligible.</p>
                    <div className="bg-primary/5 rounded p-2 space-y-1">
                      <p className="font-semibold">Requirements:</p>
                      <ul className="space-y-1">
                        <li className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          90% Post Discharge within 7 days
                        </li>
                        <li className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          Regional Initiative TBD Q3
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>

                {/* 4. ACP completion */}
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      <HandHeart className="w-4 h-4 text-primary" />
                      4. ACP completion
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">*All providers</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">$10/$15</span>
                        <span className="text-xs">skilled/primary care</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">$30</span>
                        <span className="text-xs">with training</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Quarterly</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <ul className="space-y-1">
                      <li className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-primary" />
                        GM ACP Template only
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-primary" />
                        3 trainings for higher amount
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-primary" />
                        Once per patient/year
                      </li>
                    </ul>
                  </td>
                </tr>

                {/* 5. Depression Screen */}
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-primary" />
                      5. Depression Screen
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">*All providers</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">$5/$10</span>
                        <span className="text-xs">skilled/specialty</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">$20/$30</span>
                        <span className="text-xs">primary care</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Quarterly</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <p>Screen completed prior to 2/1 or on 1st/2nd visit after 2/1.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footnotes for table 2 */}
        <div className="bg-primary/5 rounded-lg p-4 text-xs space-y-2 border border-primary/20">
          <div className="flex items-start gap-2">
            <span className="text-primary font-semibold">*</span>
            <p>Available to all providers.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-semibold">1.</span>
            <p>AMSAD completion earns same bonus as PHQ9 completion.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-semibold">2.</span>
            <p>Practice refers to individual medical entities such as Curana Health of Iowa PC.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-semibold">3.</span>
            <p>One-month grace period added to DPS for program communication.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-semibold">4.</span>
            <p>2023 performance on this metric was over 85%.</p>
          </div>
        </div>
      </section>

      {/* Table 3: ACO + Specific Metrics */}
      <section className="space-y-8">
        <div className="bg-card border border-primary/20 rounded-xl overflow-hidden mt-8">
          <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5" />
              ACO + Specific Metrics
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-primary/10 border-b border-primary/20">
                  <th className="px-4 py-3 text-left font-semibold text-primary w-64">
                    Metric
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-primary">2025 Amounts</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary w-40">Time</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary w-80">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* 6. A1c control */}
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      6. A1c control
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary">$500</span>
                      <span className="text-xs">per provider</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Annually</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <p>80% of all primary care patients<sup>1</sup> in practice<sup>2</sup> under control.</p>
                    <p className="mt-1">Providers eligible if they care for primary care patients<sup>1</sup> during year.</p>
                  </td>
                </tr>

                {/* 7. BP control */}
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-primary" />
                      7. BP control
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary">$500</span>
                      <span className="text-xs">per provider</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Annually</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <p>80% of all primary care patients<sup>1</sup> in practice<sup>2</sup> under control.</p>
                    <p className="mt-1">Providers eligible if they care for primary care patients<sup>1</sup> during year.</p>
                  </td>
                </tr>

                {/* 8. SDOH */}
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      8. SDOH
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary">$20</span>
                      <span className="text-xs">per assessment</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Quarterly</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <p>REACH Patients only; moving to simpler assessment for 2025.</p>
                  </td>
                </tr>

                {/* 9. Full-risk Care Coordination */}
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-primary" />
                      9. Full-risk Care Coordination
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Curana as PCP only</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">$15</span>
                        <span className="text-xs">PMPM base</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">$5</span>
                        <span className="text-xs">PMPM quality bonus</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs">
                        <Calendar className="w-3 h-3 text-primary" />
                        <span>Quarterly</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Award className="w-3 h-3 text-primary" />
                        <span>Annual adjustment</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <p>Earned by individual provider. Metrics: KED, Diabetic Eye Exam, Breast Cancer, Colorectal Cancer.</p>
                  </td>
                </tr>

                {/* 10. Citizenship */}
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary" />
                      10. Citizenship
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">$0</span>
                      <span className="text-xs">required for eligibility</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Annual only</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <p>Required to be eligible for group outcome metrics (A1C, BP, regional APK initiatives).</p>
                    <div className="bg-primary/5 rounded p-2 mt-2 space-y-1">
                      <p className="font-semibold">Requirements:</p>
                      <ul className="space-y-1">
                        <li className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          Town Halls (11/12)
                        </li>
                        <li className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          Affinity Modules (4)
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footnotes for table 3 */}
        <div className="bg-primary/5 rounded-lg p-4 text-xs space-y-2 border border-primary/20">
          <div className="flex items-start gap-2">
            <span className="text-primary font-semibold">1.</span>
            <p>All primary care patients include MA patients in value-based contracts; ACO REACH attributed/potential to be attributed patients; and MSSP likely to be attributed patients.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-semibold">2.</span>
            <p>Practice refers to individual medical entities such as Curana Health of Iowa PC.</p>
          </div>
        </div>
      </section>

      {/* Notes on Program */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight flex items-center justify-center gap-2">
            <Lightbulb className="w-6 h-6 text-primary" />
            Notes on 2025 Curana Quality Incentive Program
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-primary">25% Increase in Opportunity</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Total opportunity in quality program is 25% greater than in 2024. Individual provider bonus opportunity will vary based on patient panel.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-primary">Employed Provider Focus</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>All employed providers eligible for individual metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Annual group bonuses for longitudinal primary care providers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>1099 contractors not eligible for bonus program</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-primary">Payment Timing</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Must be employed on date of bonus payment to receive bonus</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Providers hired during year eligible for pro-rated group bonuses</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Activity-based bonuses paid in quarter completed</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-primary">Clinical Judgment</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              As is always the case, providers must use their clinical judgment to only provide services that are medically necessary.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};


export default QualityIncentiveProgram;
