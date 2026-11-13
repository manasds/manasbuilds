import { initAnalytics, track } from "@/lib/analytics";

// Load PostHog once the browser is idle so it stays off the critical path.
const idle =
  window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2000));
idle(() => initAnalytics(), { timeout: 4000 });

// One delegated listener covers every tracked click on the site:
//  - any element with data-track="event_name" (extra props via data-track-*)
//  - any link leaving the site (outbound_link_clicked)
document.addEventListener(
  "click",
  (e) => {
    const target = e.target as Element | null;
    if (!target?.closest) return;

    const tracked = target.closest<HTMLElement>("[data-track]");
    if (tracked) {
      const props: Record<string, string> = { path: location.pathname };
      for (const [key, value] of Object.entries(tracked.dataset)) {
        if (key.startsWith("track") && key !== "track") {
          // data-track-label -> trackLabel -> label
          const name = key.slice(5);
          props[name.charAt(0).toLowerCase() + name.slice(1)] = value ?? "";
        }
      }
      track(tracked.dataset.track!, props);
    }

    const link = target.closest<HTMLAnchorElement>("a[href]");
    if (link) {
      let url: URL;
      try {
        url = new URL(link.href, location.href);
      } catch {
        return;
      }
      if (url.origin !== location.origin && url.protocol.startsWith("http")) {
        track(
          "outbound_link_clicked",
          {
            url: url.href,
            domain: url.hostname,
            text: (link.getAttribute("aria-label") || link.textContent || "")
              .trim()
              .slice(0, 100),
            path: location.pathname,
          },
          { beacon: true },
        );
      }
    }
  },
  { capture: true },
);
