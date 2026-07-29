"use client";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { projecttype } from "@/data/projects/projects";
import Link from "next/link";
import { DashedSeparator } from "../dashed-separator";

export const ProjectBox = ({
  id,
  title,
  slug,
  status,
  content,
  url,
  src,
  bg,
  description
}: projecttype) => {
  return (
    <div className="p-2 flex flex-col gap-1.5 max-w-84 min-w-72 group relative">
      <div className="h-52 border border-neutral-300 dark:border-neutral-700 rounded-md p-1">
        <div className="h-full w-full bg-neutral-200 dark:bg-zinc-800 border border-neutral-300 dark:border-neutral-700 rounded-sm overflow-hidden relative">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Image
              src={bg}
              alt="bg"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="w-[80%] h-[75%] bg-black border-2 inset-x-0 border-white border-b-0 dark:border-black mx-auto p-0.5 rounded-t-sm group-hover:h-[70%] transition-all duration-300 absolute bottom-0 pb-0 overflow-hidden">
            {src ? (
              <img
                src={src[0]}
                alt={title}
                className="block h-full w-full object-contain object-center"
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex justify-between px-2 pr-5">
        <h1 className="font-semibold text-black text-lg dark:text-neutral-50">
          {title}
        </h1>
        {status === "building" ? (
          <div className="flex items-center gap-2 ">
            <div className="size-2 rounded-full bg-red-500 animate-pulse"></div>
            <h1 className="text-sm font-semibold text-gray-500">Building</h1>
          </div>
        ) : (
          <div className="flex justify-between items-center gap-2 ">
            <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
            <h1 className="text-sm font-semibold text-gray-500">Live</h1>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 tracking-tight max-w-lg px-2 ">
        {description}
      </p>
      <div className="relative z-20 flex justify-between pointer-events-none">
        <span className="text-neutral-500 text-sm px-2 flex gap-1.5 items-center dark:text-neutral-400">
          View Project <ArrowUpRight className="size-4" />
        </span>
        {status === "live" && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 pointer-events-auto text-neutral-500 text-sm px-2 flex gap-1.5 items-center dark:text-neutral-400"
          >
            View Live
            <ArrowUpRight className="size-4" />
          </a>
        )}
      </div>
      <DashedSeparator
        className="pointer-events-none text-neutral-300 dark:text-neutral-600 absolute bottom-0"
        dashWidth={8}
        gap={4}
      />
      <Link
        href={`/projects/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${title} project`}
      />
    </div>
  );
};
