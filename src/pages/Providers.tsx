// src/pages/Providers.tsx
import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import TopNav from "@/pages/components/TopNav";
import ApplicationsSection from "@/pages/components/ApplicationsSection";
import NewsSection from "@/pages/components/NewsSection";
import AskAida from "@/pages/components/AskAida";
import TipSheetsPage from "./TipSheetsPage";
import bannerImg from "@/assets/banner-departments.jpg";

// Import data
import { clinicalApps, administrativeApps, newsItems } from "./data";
import PageBanner from "@/components/PageBanner";
import HCCsComponent from "./components/HCCsComponent";
import QualityIncentiveProgram from "./components/QualityIncentiveProgram";
import BehavioralHealth from "./components/BehavioralHealth";

const Providers = () => {
  const [showAida, setShowAida] = useState(false);
  const [selectedTop, setSelectedTop] = useState("Home");
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  const handleSelectTop = (id: string) => {
    setSelectedTop(id);
    setSelectedChild(null);
  };

  const handleSelectChild = (topId: string, child: string) => {
    setSelectedTop(topId);
    setSelectedChild(child);
  };

  const HomeContent = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] xl:grid-cols-[4fr_2fr] gap-8">
        <div className="lg:space-y-8 order-2 lg:order-1">
          <ApplicationsSection
            title="Clinical Applications"
            description="Quick access to clinical tools"
            apps={clinicalApps}
            icon="stethoscope"
          />

          <ApplicationsSection
            title="Administrative Applications"
            description="Business & operational tools"
            apps={administrativeApps}
            icon="users"
          />
        </div>
        
        <div className="lg:sticky lg:top-[126px] lg:h-[calc(100vh-166px)] lg:overflow-y-auto order-1 lg:order-2">
          <NewsSection newsItems={newsItems} />
        </div>
      </div>
    </div>
  );

  const Placeholder = ({ title }: { title: string }) => (
    <div className="space-y-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg border p-8">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <p className="text-muted-foreground">
            This is a placeholder for the <strong>{title}</strong> section.
            Content will be added here later.
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                setSelectedTop("Home");
                setSelectedChild(null);
              }}
              className="text-accent hover:underline"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    console.log(selectedTop,selectedChild,'selectedTop');
    if (selectedTop === "Home") {
      return <HomeContent />;
    }
    if (selectedTop === "Tip Sheets") {
      return <TipSheetsPage />;
    }
    if (selectedTop === "Resource Hub") {
      if (selectedChild === "HCCs") {
        return <HCCsComponent />;
      }
      if (selectedChild === "Quality Incentive Program") {
        return <QualityIncentiveProgram />;
      }
      if (selectedChild === "Behavioral Health") {
        return <BehavioralHealth />;
      }
    } 
    return <Placeholder title={selectedChild || selectedTop} />;
  };  

  return (
    <DashboardLayout>
      

      <div className="w-full min-h-screen pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* <PageBanner title="Providers" backgroundImage={bannerImg} /> */}

          {/* 🔥 Sticky Top Nav INSIDE the scroll container */}
          <div className="sticky top-[56px] z-40 bg-card rounded-t-2xl shadow-xl border-b border-border/50">
            <TopNav
              selectedTop={selectedTop}
              selectedChild={selectedChild}
              onSelectTop={handleSelectTop}
              onSelectChild={handleSelectChild}
            />
          </div>

          <div className="bg-background/95 backdrop-blur-sm border-b border-border/50">
            <div className="grid grid-cols-1 gap-8 items-start px-10 py-6">
              {/* MAIN CONTENT */}
              <main className="w-full space-y-8">
                {renderContent()}
              </main>
            </div>
          </div>
        </div>
      </div>

      <button
        aria-label="Open Ask Aida chat"
        onClick={() => setShowAida(true)}
        className="fixed right-4 bottom-4 z-40 flex items-center gap-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 shadow-2xl hover:scale-105 transition-all"
      >
        <Sparkles className="h-5 w-5" />
        <span className="hidden sm:inline">Ask Aida</span>
      </button>

      <AskAida open={showAida} onClose={() => setShowAida(false)} />
    </DashboardLayout>
  );
};

export default Providers;
