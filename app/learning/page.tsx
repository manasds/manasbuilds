import { Container } from "@/components/container";
import Folder from "@/components/learning/folder";
import { ArrowUpRight } from "lucide-react";
export default function Page() {
  return (
    <Container className="pt-16">
      <div className="flex shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[80%] p-4 rounded-md dark:border-4 dark:border-dashed dark:border-neutral-800">
        <div className="flex flex-col justify-center gap-2">
          <h2 className="font-medium">Folder</h2>
          <p className="text-neutral-400 max-w-sm text-balance">
            created a folder component using tailwind and motion inspired from
            aceternity illustrations
          </p>
          <a href="https://github.com/manasds/motion" target="_blank" className="flex items-center gap-1 text-neutral-600">view code <ArrowUpRight className="size-4"/></a>
        </div>
        <Folder />
      </div>
    </Container>
  );
}
