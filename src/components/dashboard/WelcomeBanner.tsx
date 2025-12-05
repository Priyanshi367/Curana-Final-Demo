import { motion } from "framer-motion";
import banner from "@/assets/banner.png";
import banner1 from "@/assets/banner1.png";
import banner2 from "@/assets/banner2.jpg";
import banner3 from "@/assets/banner3.jpg";
import banner4 from "@/assets/banner4.png";
import { useState, useEffect } from "react";
import { Calendar, Dna, HeartPulse, Hospital, Microscope, Sparkles, Stethoscope } from "lucide-react";

/**
 * Clean Welcome Banner - Inspired by reference design
 * - Compact height
 * - Simple gradient background
 * - Text on left, image on right with seamless blend
 * - Auto-rotating banner images
 *
 * Changes made:
 * - Reduced the image column width to 35% on large screens
 * - Ensured the image block is flush/touched to the right edge (using ml-auto)
 * - Kept compact heights and accessibility labels
 */

// Banner images array - you can easily add/remove images here
const BANNER_IMAGES = [
  banner1,
  banner,
  banner2, // Placeholder - replace with actual image paths
  banner3, // Placeholder - replace with actual image paths
  banner4,
];

// Time in milliseconds between image changes
const ROTATION_INTERVAL = 3000; // 3000ms = 3 seconds

function formatDate() {
  const d = new Date();
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const WelcomeBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BANNER_IMAGES.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      role="banner"
      aria-label="Welcome banner"
      className="relative w-full rounded-xl bg-card text-card-foreground shadow-md mb-6 overflow-hidden"
    >
      {/* Light, subtle gradient background aligned with theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/8 to-transparent w-1/2" />

      {/* Content Container */}
      <div className="relative">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content - Enhanced design with same compact height */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[70%] px-6 sm:px-8 py-6 sm:py-7 lg:py-8 relative"
          >


            <div className="space-y-2 relative z-10">
              {/* Elegant greeting label with decorative line */}


              <motion.div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
                >
                  <HeartPulse className="w-5 h-5 text-primary" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="text-[20px] font-semibold text-primary tracking-wide"
                >
                  Welcome Back
                </motion.div>
              </motion.div>
              {/* Heading with enhanced gradient and sparkle icon */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight flex items-center gap-2">
                <span className="text-foreground">Hello, </span>
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  Dr. Emily
                </span>
                <motion.div
                  initial={{ opacity: 0, rotate: -20 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </motion.div>
              </h1>

              {/* Date with icon - compact */}
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs sm:text-sm">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate()}</span>
              </div>

              {/* Description with highlighted keywords */}
              <p className="text-muted-foreground text-xs sm:text-sm max-w-lg leading-relaxed pt-0.5">
                Transforming healthcare for seniors through{" "}
                <span className="text-foreground font-medium">innovative care</span> and{" "}
                <span className="text-foreground font-medium">compassionate service</span>.
              </p>


            </div>
          </motion.div>

          {/* Right Image with reduced width and touched to right side */}
          <div className="relative h-[200px] lg:h-[240px] w-full lg:w-[30%] lg:ml-auto overflow-hidden">
            {/* Stacked images with transitions */}
            {BANNER_IMAGES.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
              >
                <img
                  src={image}
                  alt="Healthcare professionals with seniors"
                  className="w-full h-full object-cover object-right"
                  style={{ objectFit: "cover", objectPosition: "right" }}
                />
              </div>
            ))}

            {/* Seamless left edge blend - only on desktop, adapts to dark mode */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white/50 to-transparent dark:from-gray-900 dark:via-gray-900/50 pointer-events-none z-10" />

            {/* Very subtle color tint - adapts to dark mode */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/3 to-pink-600/3 dark:from-purple-500/10 dark:to-pink-500/10 pointer-events-none z-10" />

            {/* Image indicators */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-20">
              {BANNER_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "bg-primary w-6" : "bg-white/50 hover:bg-white/70"
                    }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
