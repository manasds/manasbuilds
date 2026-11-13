"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const SCROLL_MILESTONES = [25, 50, 75, 100];
// Stop counting time if there's no scroll/mouse/key/touch activity for this long.
const IDLE_AFTER_MS = 30_000;
const TICK_MS = 1_000;

type Props = {
  slug: string;
  title: string;
  /** Which blog system served the post. */
  source: "sanity" | "mdx";
  /** Estimated read time in minutes, if known. */
  readingMinutes?: number;
};

/**
 * Tracks engagement on a blog post:
 *  - blog_post_viewed       on mount
 *  - blog_scroll_depth      at 25/50/75/100% of the article
 *  - blog_read_completed    once the reader reaches the end AND spent a
 *                           reasonable share of the estimated read time
 *  - blog_time_spent        when the reader leaves/hides the page, with
 *                           active (visible + not idle) seconds and max scroll
 */
export function BlogReadTracker({ slug, title, source, readingMinutes }: Props) {
  useEffect(() => {
    const base = { slug, title, source, reading_minutes: readingMinutes };
    const article = document.querySelector<HTMLElement>("[data-blog-article]");

    let activeMs = 0;
    let lastActivity = Date.now();
    let maxDepth = 0;
    let completed = false;
    let reported = false;
    const hit = new Set<number>();

    track("blog_post_viewed", base);

    const markActive = () => {
      lastActivity = Date.now();
    };

    const depth = () => {
      const el = article ?? document.documentElement;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return 100;
      return Math.min(100, Math.max(0, Math.round((-rect.top / total) * 100)));
    };

    const maybeComplete = () => {
      if (completed || maxDepth < 90) return;
      // Require at least 40% of the estimated read time (or 20s) to count as a real read.
      const minMs = readingMinutes ? readingMinutes * 60_000 * 0.4 : 20_000;
      if (activeMs < minMs) return;
      completed = true;
      track("blog_read_completed", {
        ...base,
        active_seconds: Math.round(activeMs / 1000),
      });
    };

    const onScroll = () => {
      markActive();
      const d = depth();
      if (d > maxDepth) maxDepth = d;
      for (const m of SCROLL_MILESTONES) {
        if (maxDepth >= m && !hit.has(m)) {
          hit.add(m);
          track("blog_scroll_depth", { ...base, depth: m });
        }
      }
      maybeComplete();
    };

    const interval = window.setInterval(() => {
      if (
        document.visibilityState === "visible" &&
        Date.now() - lastActivity < IDLE_AFTER_MS
      ) {
        activeMs += TICK_MS;
        maybeComplete();
      }
    }, TICK_MS);

    const report = () => {
      if (reported || activeMs < 1000) return;
      reported = true;
      track(
        "blog_time_spent",
        {
          ...base,
          active_seconds: Math.round(activeMs / 1000),
          max_scroll_depth: maxDepth,
          completed,
        },
        { beacon: true },
      );
    };

    // Hiding the tab sends a report; coming back starts a fresh segment so
    // long-lived tabs still report every reading session.
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        report();
      } else {
        reported = false;
        activeMs = 0;
        markActive();
      }
    };

    const activityEvents = ["mousemove", "keydown", "touchstart", "wheel"];
    activityEvents.forEach((ev) =>
      window.addEventListener(ev, markActive, { passive: true }),
    );
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", report);
    onScroll();

    return () => {
      // Client-side navigation away from the post.
      report();
      window.clearInterval(interval);
      activityEvents.forEach((ev) => window.removeEventListener(ev, markActive));
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", report);
    };
  }, [slug, title, source, readingMinutes]);

  return null;
}
