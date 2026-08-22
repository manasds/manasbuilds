"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export function GithubHeatmap({ username }: { username: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !calendarRef.current) {
      return;
    }

    const scrollToLatest = () => {
      const scrollContainer = calendarRef.current?.querySelector<HTMLElement>(
        ".react-activity-calendar__scroll-container",
      );

      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth;
      }
    };

    scrollToLatest();

    const observer = new MutationObserver(scrollToLatest);
    observer.observe(calendarRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) {
    return <div className="h-[120px] w-full animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-900" />;
  }

  return (
    <div ref={calendarRef}>
      <GitHubCalendar
        username={username}
        colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
        blockSize={11}
        blockMargin={3}
        fontSize={12}
      />
    </div>
  );
}
