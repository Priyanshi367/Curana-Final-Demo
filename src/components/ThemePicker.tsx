import { Palette, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const themes = [
  { name: "curana", label: "Curana", color: "bg-gradient-to-r from-[#1d4485] to-[#862d8f]" },
  { name: "default", label: "Default", color: "bg-gradient-to-br from-purple-700 to-purple-900" },
  { name: "navy", label: "Navy", color: "bg-gradient-to-br from-blue-900 to-blue-950" },
  { name: "dark", label: "Dark", color: "bg-gradient-to-br from-gray-800 to-black" },
  { name: "midnight", label: "Midnight", color: "bg-gradient-to-br from-indigo-900 to-slate-900" },
  { name: "amethyst", label: "Amethyst", color: "bg-gradient-to-br from-purple-700 to-violet-900" },
  { name: "cobalt", label: "Cobalt", color: "bg-gradient-to-br from-blue-700 to-blue-900" },
  { name: "forest", label: "Forest", color: "bg-gradient-to-br from-green-700 to-emerald-900" },
  { name: "slate", label: "Slate", color: "bg-gradient-to-br from-slate-700 to-gray-900" },
  { name: "sapphire", label: "Sapphire", color: "bg-gradient-to-br from-blue-600 to-blue-800" },
  { name: "teal", label: "Teal", color: "bg-gradient-to-br from-teal-600 to-cyan-800" },
  { name: "plum", label: "Plum", color: "bg-gradient-to-br from-purple-600 to-violet-900" },
  { name: "emerald", label: "Emerald", color: "bg-gradient-to-br from-emerald-600 to-green-800" },
  { name: "violet", label: "Violet", color: "bg-gradient-to-br from-violet-600 to-purple-800" },
  { name: "jade", label: "Jade", color: "bg-gradient-to-br from-teal-700 to-emerald-900" },
  { name: "charcoal", label: "Charcoal", color: "bg-gradient-to-br from-slate-800 to-gray-950" },
  { name: "obsidian", label: "Obsidian", color: "bg-gradient-to-br from-gray-900 to-black" },
  { name: "lavender", label: "Lavender", color: "bg-gradient-to-br from-purple-500 to-violet-700" },
  { name: "ocean", label: "Ocean", color: "bg-gradient-to-br from-blue-600 to-cyan-700" },
  { name: "rose", label: "Rose", color: "bg-gradient-to-br from-rose-600 to-pink-800" },
  { name: "sunset", label: "Sunset", color: "bg-gradient-to-br from-orange-600 to-pink-700" },
] as const;

export const ThemePicker = () => {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        className="h-8 w-8 sm:h-9 sm:w-9 text-header-foreground hover:bg-white/10"
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9 text-header-foreground hover:bg-white/10"
          >
            <Palette className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-4" align="end">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Choose Theme</h4>
            <div className="grid grid-cols-5 gap-3">
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTheme(t.name as any)}
                  className={cn(
                    "relative group flex flex-col items-center gap-1.5 transition-all",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
                  )}
                  title={t.label}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full transition-all",
                      t.color,
                      theme === t.name
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                        : "hover:scale-105 hover:ring-2 hover:ring-muted-foreground/30"
                    )}
                  />
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
