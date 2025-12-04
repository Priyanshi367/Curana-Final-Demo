
import { motion } from "framer-motion";
import banner from "@/assets/banner.png";
import banner1 from "@/assets/banner1.png";
import banner2 from "@/assets/banner2.jpg";
import banner3 from "@/assets/banner3.jpg";
import { useState, useEffect } from "react";

/**
 * Clean Welcome Banner - Inspired by reference design
 * - Compact height
 * - Simple gradient background
 * - Text on left, image on right with seamless blend
 * - Auto-rotating banner images
 */

// Banner images array - you can easily add/remove images here
const BANNER_IMAGES = [
  banner1,
  banner,
  banner2, // Placeholder - replace with actual image paths
  banner3, // Placeholder - replace with actual image paths
];

// Time in milliseconds between image changes
const ROTATION_INTERVAL = 3000; // 5 seconds

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
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % BANNER_IMAGES.length
      );
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);
  return (
    <div 
      role="banner"
      aria-label="Welcome banner"
      className="relative w-full rounded-xl border border-border/40 bg-card text-card-foreground shadow-sm mb-6 overflow-hidden"
    >
      {/* Subtle left side accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent w-1/3" />
      
      {/* Very subtle background tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/10 to-transparent w-1/2 dark:from-background/5" />

      {/* Content Container */}
      <div className="relative">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 px-6 sm:px-8 py-6 sm:py-7 lg:py-8"
          >
            <div className="space-y-2 relative z-10">
              {/* Heading */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                <span className="text-foreground">Welcome back,</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Dr. Emily
                </span>
              </h1>

              {/* Date */}
              <p className="text-muted-foreground text-xs sm:text-sm">
                {formatDate()}
              </p>

              {/* Description */}
              <p className="text-muted-foreground text-xs sm:text-sm max-w-lg leading-relaxed pt-0.5">
                Transforming healthcare for seniors through innovative care models and compassionate service.
              </p>
            </div>
          </motion.div>

          {/* Right Image with seamless blend and rotation */}
          <div className="flex-1 relative h-[200px] lg:h-[280px] w-full lg:w-auto overflow-hidden">
            {/* Stacked images with transitions */}
            {BANNER_IMAGES.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentImageIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <img
                  src={image}
                  alt="Healthcare professionals with seniors"
                  className="w-full h-full object-cover object-[center_30%]"
                />
              </div>
            ))}
            
            {/* Seamless left edge blend - only on desktop, adapts to dark mode */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/70 to-transparent dark:from-gray-900 dark:via-gray-900/70 pointer-events-none z-10" />
            
            {/* Very subtle color tint - adapts to dark mode */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/3 to-pink-600/3 dark:from-purple-500/10 dark:to-pink-500/10 pointer-events-none z-10" />

            {/* Image indicators */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-20">
              {BANNER_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-primary w-6"
                      : "bg-white/50 hover:bg-white/70"
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
