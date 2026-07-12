"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function GithubHeatmap({ username }: { username: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[120px] w-full animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-900" />;
  }

  return (
    <GitHubCalendar
      username={username}
      colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
      blockSize={11}
      blockMargin={3}
      fontSize={12}
    />
  );
}
