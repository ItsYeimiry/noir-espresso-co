"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={label} title={label}>
      <Sun className="icon-sun" aria-hidden="true" />
      <Moon className="icon-moon" aria-hidden="true" />
    </Button>
  );
}
