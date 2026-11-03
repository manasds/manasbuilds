import { Container } from "@/components/container";
import Folder from "@/components/learning/folder";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning",
  description:
    "Manas's knowledge base and UI experiments: notes kept in Notion and small components built with Tailwind and Motion.",
  alternates: { canonical: "/learning" },
};

export default function Page() {
  return (
    <div className="h-full min-h-screen">
      <Container className="pt-12">
        <h1 className="text-xl font-medium">
          Knowledge base{" "}
          <span className="text-lg font-light">(periodically updated)</span>
        </h1>
        <Link
          target="_blank"
          href="https://manasd.notion.site/knowledge-base"
          rel="noopener noreferrer"
          className="w-full max-w-80 mt-4 group flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
        >
          <span className="flex items-center gap-3 text-neutral-700 group-hover:text-foreground dark:text-neutral-300">
            <span className="font-medium">Notion</span>
          </span>
          <ArrowUpRight className="size-4 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </Link>
      </Container>

      <Container className="pt-16">
        <div className="flex flex-col items-center gap-6 rounded-md p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:w-[80%] md:flex-row md:items-stretch md:justify-between">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="font-medium">Folder</h2>
            <p className="max-w-sm text-balance text-neutral-400">
              created a folder component using tailwind and motion inspired from
              aceternity illustrations
            </p>
            <a
              href="https://github.com/manasds/motion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-neutral-600"
            >
              view code <ArrowUpRight className="size-4" />
            </a>
          </div>
          <Folder />
        </div>
      </Container>
    </div>
  );
}
