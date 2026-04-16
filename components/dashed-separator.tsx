"use client";

import { cn } from "@/lib/utils";

interface DashedSeparatorProps {
  dashWidth?: number;
  gap?: number;
  className?: string;
}

export const DashedSeparator = ({
  dashWidth = 4,
  gap = 4,
  className = "text-neutral-300",
}: DashedSeparatorProps) => {
  return (
    <div className={cn("w-full h-px", className)}>
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 50%, transparent 50%)`,
          backgroundSize: `${dashWidth + gap}px 100%`,
          backgroundRepeat: "repeat-x",
        }}
      />
    </div>
  );
};