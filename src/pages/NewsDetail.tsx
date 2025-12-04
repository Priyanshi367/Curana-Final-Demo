import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Calendar, Tag, Share2, User } from "lucide-react";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import "@/styles/article.css";

// This would typically come from an API or context
const newsData = {
  "1": {
    id: "1",
    title: "New Healthcare Initiative Launch",
    snippet: "Curana Hub announces innovative patient care program...",
    fullContent: `
      <p>We are excited to announce the launch of our new Healthcare Initiative, designed to revolutionize patient care and improve outcomes across all our facilities.</p>
      
      <h3>Key Highlights</h3>
      <ul>
        <li>Enhanced patient monitoring systems with real-time data analytics</li>
        <li>Integrated care coordination across departments</li>
        <li>Advanced telemedicine capabilities for remote consultations</li>
        <li>Personalized treatment plans powered by AI-driven insights</li>
      </ul>
      
      <h3>Implementation Timeline</h3>
      <p>The initiative will be rolled out in three phases over the next six months:</p>
      <ul>
        <li><strong>Phase 1 (Months 1-2):</strong> Pilot program in select departments</li>
        <li><strong>Phase 2 (Months 3-4):</strong> Expansion to all clinical areas</li>
        <li><strong>Phase 3 (Months 5-6):</strong> Full integration and optimization</li>
      </ul>
      
      <h3>Expected Benefits</h3>
      <p>This comprehensive initiative is expected to deliver significant improvements in patient satisfaction, reduce wait times by up to 30%, and enhance overall care quality. Our team has worked tirelessly to ensure a smooth transition and minimal disruption to current operations.</p>
      
      <p>Training sessions will be conducted for all staff members, and dedicated support teams will be available throughout the implementation process. We encourage everyone to participate actively and share feedback to help us refine and optimize the program.</p>
      
      <p>For more information or questions, please contact the Healthcare Innovation Team at innovation@curahub.com.</p>
    `,
    time: "2 hours ago",
    date: "November 29, 2024",
    image: news1,
    category: "Healthcare",
    author: "Dr. Sarah Johnson",
  },
  "2": {
    id: "2",
    title: "Q1 Performance Excellence Awards",
    snippet: "Congratulations to our outstanding team members...",
    fullContent: `
      <p>We are thrilled to celebrate the exceptional achievements of our team members during the first quarter of this year. The Performance Excellence Awards recognize individuals and teams who have gone above and beyond in their dedication to excellence.</p>
      
      <h3>Award Categories</h3>
      <ul>
        <li><strong>Innovation Champion:</strong> Recognizing creative solutions and process improvements</li>
        <li><strong>Patient Care Excellence:</strong> Outstanding patient satisfaction and care quality</li>
        <li><strong>Team Collaboration:</strong> Exceptional teamwork and cross-departmental cooperation</li>
        <li><strong>Leadership Impact:</strong> Inspiring leadership and mentorship</li>
      </ul>
      
      <h3>This Quarter's Winners</h3>
      <p>After careful consideration by our selection committee, we are proud to announce the following winners:</p>
      <ul>
        <li><strong>Innovation Champion:</strong> Marcus Chen - IT Department</li>
        <li><strong>Patient Care Excellence:</strong> Emily Rodriguez - Nursing Team</li>
        <li><strong>Team Collaboration:</strong> Emergency Response Unit</li>
        <li><strong>Leadership Impact:</strong> Dr. Michael Thompson - Cardiology</li>
      </ul>
      
      <h3>Celebration Event</h3>
      <p>Join us for the awards ceremony on December 15th at 3:00 PM in the main auditorium. Light refreshments will be served, and all staff members are encouraged to attend and celebrate our colleagues' achievements.</p>
      
      <p>Congratulations to all nominees and winners! Your dedication and hard work continue to make Curana Hub an exceptional place to work and receive care.</p>
    `,
    time: "5 hours ago",
    date: "November 29, 2024",
    image: news2,
    category: "Recognition",
    author: "HR Department",
  },
  "3": {
    id: "3",
    title: "Updated Safety Protocols",
    snippet: "Review the latest safety and compliance guidelines...",
    fullContent: `
      <p>In our ongoing commitment to maintaining the highest standards of safety and compliance, we have updated our safety protocols effective immediately. All staff members are required to review and acknowledge these changes.</p>
      
      <h3>Key Updates</h3>
      <ul>
        <li>Enhanced infection control procedures in all patient care areas</li>
        <li>Updated emergency evacuation routes and assembly points</li>
        <li>New personal protective equipment (PPE) requirements</li>
        <li>Revised visitor screening and access protocols</li>
        <li>Updated hazardous materials handling procedures</li>
      </ul>
      
      <h3>Mandatory Training</h3>
      <p>All employees must complete the updated safety training module by December 10th. The training is available through our learning management system and takes approximately 45 minutes to complete.</p>
      
      <h3>Key Changes to Note</h3>
      <p><strong>Infection Control:</strong> Enhanced hand hygiene protocols now require sanitization before and after every patient interaction, with additional requirements for high-risk areas.</p>
      
      <p><strong>Emergency Procedures:</strong> New assembly points have been designated for the east wing. Please familiarize yourself with the updated evacuation maps posted throughout the facility.</p>
      
      <p><strong>PPE Requirements:</strong> Additional protective equipment is now required in specific clinical areas. Department managers will provide detailed guidance for their respective teams.</p>
      
      <h3>Compliance and Support</h3>
      <p>Compliance with these protocols is mandatory and will be monitored through regular audits. Our Safety and Compliance team is available to answer questions and provide support during this transition.</p>
      
      <p>For questions or concerns, please contact the Safety Department at safety@curahub.com or extension 5500.</p>
      
      <p>Thank you for your continued commitment to maintaining a safe environment for our patients, visitors, and staff.</p>
    `,
    time: "1 day ago",
    date: "November 28, 2024",
    image: news3,
    category: "Policy",
    author: "Safety & Compliance Team",
  },
};

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const article = id ? newsData[id as keyof typeof newsData] : null;

  if (!article) {
    return (
      <DashboardLayout>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Article Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button 
            onClick={() => navigate("/dashboard")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-accent transition-colors"
          >
            Dashboard
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-accent transition-colors"
          >
            News
          </button>
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1">
            {article?.title}
          </span>
        </nav>

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 -ml-2 text-primary hover:bg-primary/10 hover:text-primary/90 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Button>

        {/* Article Content */}
        <Card className="overflow-hidden">
          {/* Featured Image */}
          <div className="relative w-full h-64 sm:h-96 overflow-hidden">
            <img
              src={article?.image}
              alt={article?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block bg-accent text-white text-xs px-3 py-1 rounded-full mb-3">
                {article?.category}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                {article?.title}
              </h1>
            </div>
          </div>

          {/* Article Meta */}
          <div className="p-6 sm:p-8 border-b">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="inline-flex items-center gap-2 bg-accent/5 dark:bg-primary/20 px-3 py-1.5 rounded-full text-primary dark:text-primary border border-primary/20 dark:border-primary/30">
                <Calendar className="h-4 w-4 flex-shrink-0 text-primary dark:text-primary-foreground/70" />
                <span className="whitespace-nowrap">{article?.date}</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-accent/5 dark:bg-primary/20 px-3 py-1.5 rounded-full text-primary dark:text-primary border border-primary/20 dark:border-primary/30">
                <User className="h-4 w-4 flex-shrink-0 text-primary dark:text-primary-foreground/70" />
                <span className="whitespace-nowrap">{article?.author}</span>
              </div>
              <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto text-primary hover:bg-primary/10 hover:text-primary/90 transition-colors"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            </div>
          </div>

          {/* Article Body */}
          <div className="p-6 sm:p-8">
            <div
              className="prose prose-slate dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article?.fullContent }}
              style={{
                lineHeight: "1.8",
              }}
            />
          </div>
        </Card>

        {/* Related Actions */}
        <div className="mt-8 flex justify-between items-center">
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button 
            onClick={() => navigate("/news")}
            className="bg-card text-primary border border-primary hover:bg-primary/5 hover:text-primary/90 transition-colors"
          >
            View All News
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewsDetail;
