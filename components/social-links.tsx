import Link from "next/link";
import { Calendar, Github } from "lucide-react";
import { socialLinks } from "@/lib/social";
import { cn } from "@/lib/utils";
import { NotionIcon } from "./contact/notion-svg";

const icons: Record<string, React.ReactNode> = {
  GitHub: <Github className="size-4" />,
  Twitter: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 fill-current"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  "Cal.com": <Calendar className="size-4" />,
  Notion : <NotionIcon className="size-4 [&>path:first-child]:fill-white! [&>path:last-child]:fill-black! " />
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className="inline-flex items-center justify-center size-9 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-foreground hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
        >
          {icons[link.name]}
        </Link>
      ))}
    </div>
  );
}
