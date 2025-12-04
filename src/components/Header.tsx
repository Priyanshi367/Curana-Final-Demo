import { Search, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/contexts/SidebarContext";
import { ThemePicker } from "@/components/ThemePicker";
import logo from "@/assets/logonew.png";
import profileImg from "@/assets/profile-avatar.jpg";

const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="fixed top-0 left-0 right-0 h-10 sm:h-12 text-header-foreground z-50 shadow-elegant" style={{ background: 'var(--header-gradient)' }}>
      <div className="h-full flex items-center justify-between px-1.5 sm:px-3 gap-1.5 sm:gap-3">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-7 w-7 sm:h-8 sm:w-8 text-header-foreground hover:bg-white/10"
          >
            <Menu className="h-3.5 w-3.5" />
          </Button>
          <img src={logo} alt="Curana Hub" className="h-10 sm:h-11 w-auto" />
        </div>

        {/* Center: Search - Hidden on mobile, visible on md+ */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search... (Ctrl+K)"
            className="w-full h-8 pl-8 pr-3 bg-white/10 border-white/20 text-header-foreground placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 rounded-full transition-all text-xs"
          />
        </div>

        {/* Search button on mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-8 w-8 text-header-foreground hover:bg-white/10"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Notification Bell */}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 text-header-foreground hover:bg-white/10 relative"
          >
            <Bell className="h-3.5 w-3.5" />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-red-500 rounded-full" />
          </Button>

          {/* Theme Picker */}
          <ThemePicker />

          {/* User Avatar */}
          <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full overflow-hidden border border-white/30 cursor-pointer hover:border-white/50 transition-colors">
            <img
              src={profileImg}
              alt="Dr. Emily Chen"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
