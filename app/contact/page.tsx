import { Container } from "@/components/container";
import { GithubHeatmap } from "@/components/github-heatmap";
import { socialLinks } from "@/lib/social";
import { Calendar, Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const GITHUB_USERNAME = "manasds";

const icons: Record<string, React.ReactNode> = {
  GitHub: <Github className="size-5" />,
  Twitter: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  "Cal.com": <Calendar className="size-5" />,
};

export default function Contact() {
  return (
    <Container className="pt-16 pb-24">
      <div className="max-w-2xl space-y-10">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-mono font-medium">
            Get in touch
          </h1>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Reach out on any of these — I&apos;m always happy to chat about
            projects, ideas, or opportunities.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-3 transition-colors hover:border-neutral-400 dark:hover:border-neutral-600"
            >
              <span className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300 group-hover:text-foreground">
                {icons[link.name]}
                <span className="font-medium">{link.name}</span>
              </span>
              <ArrowUpRight className="size-4 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
            </Link>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <Github className="size-4" />
            <span>
              Contributions on{" "}
              <Link
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                @{GITHUB_USERNAME}
              </Link>
            </span>
          </div>
          <div className="hide-calendar-scrollbar overflow-x-auto rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
            <GithubHeatmap username={GITHUB_USERNAME} />
          </div>
        </div>
      </div>
    </Container>
  );
}
