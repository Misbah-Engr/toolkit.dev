"use client";

import { useTheme } from "@/app/_contexts/theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export const ColorModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      size="icon"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};
