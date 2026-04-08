"use client"
import React, { useState, useEffect } from "react";
import { Pin } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { projecttype } from "@/data/projects/projects";


export const ProjectBox = ({id , title , status , content , url , src} : projecttype) => {
  
  return (
    <a href={url} target="_blank" className="p-2 flex flex-col gap-1.5 max-w-84 group border-b border-dashed border-neutral-200 dark:border-neutral-700">
      <div className="h-52 border border-neutral-300 dark:border-neutral-700 rounded-md p-1">
        <div className="h-full w-full bg-neutral-200 dark:bg-zinc-800 border border-neutral-300 dark:border-neutral-700 rounded-sm overflow-hidden relative">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            
              <Image
                src={src}
                alt="bg"
                fill
                className="object-cover object-center"
              />
          </div>
          <div
            className="w-[80%] h-[75%] bg-black border-2 inset-x-0  border-white dark:border-black mx-auto  p-0.5 rounded-t-sm group-hover:h-[70%] transition-all duration-300 absolute bottom-0 pb-0"
          >
          </div>
        </div>
      </div>
      <div className="flex justify-between px-2 pr-5">
        <h1 className="font-semibold text-black text-lg dark:text-neutral-50">
          {title}
        </h1>
        <div className="flex justify-between items-center gap-2 ">
          <div className="size-2 rounded-full bg-red-500 animate-pulse"></div>
          <h1 className="text-sm font-semibold text-gray-500">Building</h1>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 tracking-tight max-w-lg px-2 ">
       {content}
      </p>
      <span
        className="text-neutral-500 text-sm px-2 flex gap-1.5 items-center dark:text-neutral-400"
      >
        View Project <ArrowUpRight className="size-4" />
      </span>
    </a>
  );
};
