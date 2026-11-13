import type { PostHog } from "posthog-js";

// Thin wrapper around PostHog. posthog-js is loaded lazily (after the page is
// idle) so it never competes with LCP; events fired before it loads are queued.

type Props = Record<string, unknown>;
type Queued = { event: string; props?: Props; beacon?: boolean };

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
// Off in `next dev` unless explicitly enabled, so local browsing doesn't pollute data.
const ENABLED =
  !!KEY &&
  (process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_POSTHOG_DEBUG === "true");

let posthog: PostHog | null = null;
let loading = false;
const queue: Queued[] = [];

function currentTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function initAnalytics() {
  if (!ENABLED || loading || typeof window === "undefined") return;
  loading = true;

  import("posthog-js").then(({ default: ph }) => {
    ph.init(KEY!, {
      // Proxied through next.config rewrites so ad blockers don't drop events.
      api_host: "/ingest",
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? "https://us.posthog.com",
      defaults: "2026-01-30",
      capture_pageview: "history_change", // SPA route changes count as pageviews
      capture_pageleave: true, // gives time-on-page for every page
      autocapture: true, // generic clicks, rage clicks, form interactions
      person_profiles: "identified_only", // anonymous visitors, cheaper
      debug: process.env.NEXT_PUBLIC_POSTHOG_DEBUG === "true",
      loaded: (instance) => {
        instance.register({ theme: currentTheme() });
      },
    });
    posthog = ph;
    for (const { event, props, beacon } of queue.splice(0)) {
      send(event, props, beacon);
    }
  });
}

function send(event: string, props?: Props, beacon?: boolean) {
  posthog?.capture(
    event,
    props,
    beacon ? { transport: "sendBeacon" } : undefined,
  );
}

/**
 * Track a custom event. Use `beacon` for events fired while the page is being
 * hidden/unloaded so they survive navigation away.
 */
export function track(event: string, props?: Props, opts?: { beacon?: boolean }) {
  if (!ENABLED) {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[analytics]", event, props);
    }
    return;
  }
  if (posthog) send(event, props, opts?.beacon);
  else queue.push({ event, props, beacon: opts?.beacon });
}

export function setThemeProperty(theme: string) {
  posthog?.register({ theme });
}
