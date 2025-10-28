import { Mic, Contrast } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("highContrast") === "true";
    setIsHighContrast(saved);
    if (saved) {
      document.documentElement.classList.add("high-contrast");
    }
  }, []);

  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    localStorage.setItem("highContrast", String(newValue));
    
    if (newValue) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-50 group-hover:opacity-75 transition-opacity rounded-full" />
            <Mic className="relative w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              VoiceLens
            </h1>
            <p className="text-xs text-muted-foreground">Type. Listen. Feel.</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleHighContrast}
          className="gap-2 border-border hover:border-primary transition-colors"
          title="Toggle High Contrast Mode"
        >
          <Contrast className="w-4 h-4" />
          <span className="hidden sm:inline">High Contrast</span>
        </Button>
      </div>
    </header>
  );
};
