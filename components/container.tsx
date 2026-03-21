import { cn } from "../lib/utils";
import React from "react";

export const Container = ({
  className,
  children,
  style , 
}: {
  className?: string;
  children: React.ReactNode;
  style? : React.CSSProperties
}) => {
  return <div  style={style} className={cn("max-w-4xl mx-auto px-4 ", className)}>{children}</div>;
};