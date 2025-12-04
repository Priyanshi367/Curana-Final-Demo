import DashboardLayout from "@/components/DashboardLayout";
import PageBanner from "@/components/PageBanner";
import { Card } from "@/components/ui/card";
import bannerImg from "@/assets/about.jfif";

const About = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <PageBanner title="About Curana Hub" backgroundImage={bannerImg} />
        <h1 className="text-4xl font-semibold mb-8">About Curana Hub</h1>

        <Card className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Curana Hub is committed to providing exceptional healthcare through innovation,
            collaboration, and compassionate care. We empower our healthcare professionals
            with cutting-edge tools and resources to deliver the best possible patient outcomes.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            To be the leading healthcare organization recognized for excellence in patient care,
            medical innovation, and employee development. We strive to create a culture where
            every team member feels valued, supported, and inspired to make a difference.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-accent font-semibold">•</span>
              <span><strong>Compassion:</strong> We treat every patient with dignity, respect, and empathy.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-semibold">•</span>
              <span><strong>Excellence:</strong> We pursue the highest standards in everything we do.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-semibold">•</span>
              <span><strong>Innovation:</strong> We embrace change and continuously improve our services.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-semibold">•</span>
              <span><strong>Collaboration:</strong> We work together as one team to achieve our goals.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-semibold">•</span>
              <span><strong>Integrity:</strong> We act with honesty and transparency in all our interactions.</span>
            </li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default About;
