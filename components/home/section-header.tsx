import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type SectionHeaderProps = {
  title: string;
  description?: string;
  href: string;
  linkLabel?: string;
};

export function SectionHeader({
  title,
  description,
  href,
  linkLabel = "View all",
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {description}
          </p>
        )}
      </div>
      <Link
        href={href}
        className="shrink-0 text-sm text-neutral-600 dark:text-neutral-400 hover:text-foreground inline-flex items-center gap-1 transition-colors"
      >
        {linkLabel}
        <ArrowUpRight className="size-4" />
      </Link>
    </div>
  );
}
