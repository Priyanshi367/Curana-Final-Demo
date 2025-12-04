import { createContext, useContext, useEffect, useState } from "react";

type Theme = "default" | "dark" | "midnight" | "ocean" | "forest" | "sunset" | "rose" | "slate" | "navy" | "sapphire" | "teal" | "plum" | "violet" | "emerald" | "jade" | "charcoal" | "obsidian" | "lavender" | "amethyst" | "cobalt" | "curana";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    return (stored as Theme) || "curana";
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("darkMode");
    return stored === "true";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("default", "dark", "midnight", "ocean", "forest", "sunset", "rose", "slate", "navy", "sapphire", "teal", "plum", "violet", "emerald", "jade", "charcoal", "obsidian", "lavender", "amethyst", "cobalt", "curana", "dark-mode");
    root.classList.add(theme);
    if (isDarkMode) {
      root.classList.add("dark-mode");
    }
    localStorage.setItem("theme", theme);
    localStorage.setItem("darkMode", String(isDarkMode));
  }, [theme, isDarkMode]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "default" ? "dark" : "default"));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
