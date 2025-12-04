import { createContext, useContext, useState, ReactNode } from "react";

type LayoutType = "vertical" | "horizontal";

interface LayoutContextType {
  layoutType: LayoutType;
  setLayoutType: (type: LayoutType) => void;
  toggleLayout: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [layoutType, setLayoutType] = useState<LayoutType>("vertical");

  const toggleLayout = () => {
    setLayoutType(prev => prev === "vertical" ? "horizontal" : "vertical");
  };

  return (
    <LayoutContext.Provider value={{ layoutType, setLayoutType, toggleLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};
