import DashboardLayout from "@/components/DashboardLayout";
import PageBanner from "@/components/PageBanner";
import MyWorkspace from "@/components/dashboard/MyWorkspace";
import bannerImg from "@/assets/myworkspace.webp";
const Workspace = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <PageBanner title="My Workspace" backgroundImage={bannerImg} />
        <MyWorkspace />
      </div>
    </DashboardLayout>
  );
};

export default Workspace;
