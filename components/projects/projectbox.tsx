import React from "react";
import { Pin } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
export const ProjectBox = () => {
  return (
    <div className="p-2 flex flex-col gap-1.5 max-w-84" >
      <div className="h-52 border border-neutral-300 dark:border-neutral-600 rounded-md p-1">
        <div className="h-full w-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-sm"></div>
      </div>
      <div className="flex justify-between px-2 pr-5">
        <h1 className="font-semibold text-black text-lg dark:text-neutral-50">Lunel</h1>
        <div className="flex justify-between items-center gap-2 ">
          <div className="size-2 rounded-full bg-red-500 animate-pulse"></div>
          <h1 className="text-sm font-semibold text-gray-500">Building</h1>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 tracking-tight max-w-lg px-2 ">
        Lorem ipsum dolor sit amet , consecteur adipisicingelit . Dignissmos ,
        itaque.
      </p>
      <a href="https://github.com/manasds " className="text-neutral-500 text-sm px-2 flex gap-1.5 items-center dark:text-neutral-400">View Project <ArrowUpRight className="size-4"/></a>
    </div>
  );
};
