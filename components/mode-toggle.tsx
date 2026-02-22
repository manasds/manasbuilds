"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";

const ModeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!mounted) return <div className="size-8" />;

  return (
    <button
      onClick={toggleTheme}
      className="size-8 flex items-center justify-center cursor-pointer relative"
      aria-label="Toggle Theme"
    >
      <SunIcon
        size={20}
        className="absolute transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90"
      />
      <MoonIcon
        size={20}
        className="absolute transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0"
      />
    </button>
  );
};

export default ModeToggle;