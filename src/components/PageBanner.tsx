interface PageBannerProps {
  title: string;
  backgroundImage: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

const PageBanner = ({ title, backgroundImage, subtitle, breadcrumbs }: PageBannerProps) => {
  return (
    <div className="relative h-32 sm:h-36 md:h-40 mb-6 rounded-xl overflow-hidden mt-2 group">
      {/* Background Image Layer */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40" />
        <div className="absolute inset-0 opacity-30" style={{ background: 'var(--header-gradient)' }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-6 sm:px-8 md:px-12">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-2 animate-fade-in">
            <ol className="flex items-center space-x-2 text-xs sm:text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-1.5 text-white/40">›</span>}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="text-white/70 hover:text-white transition-colors duration-200"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-white/90 font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 animate-slide-up drop-shadow-lg">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm sm:text-base text-white/85 max-w-2xl animate-slide-up animation-delay-100 drop-shadow-md">
            {subtitle}
          </p>
        )}

        {/* Accent Line */}
        <div className="mt-3 w-16 h-0.5 bg-white/80 rounded-full animate-slide-right shadow-lg" />
      </div>

      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};

export default PageBanner;