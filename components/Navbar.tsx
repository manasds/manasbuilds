"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Container } from "./container";
import { Button } from "./ui/button";
import { PanelLeft, X } from "lucide-react";
import ModeToggle from "./mode-toggle" 
import { Noise } from "./noise";
import { CommandDialog } from "cmdk";
const navlinks = [
  { title: "Blog", href: "/blog" },
  { title: "Projects", href: "/projects" },
  { title: "Contact", href: "/contaxt" },
  { title: "Pricing", href: "/pricing" },
];

export default function Navbar(){
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 relative">
      <Noise />
      <DesktopNavbar />
    </div>
  );
};

export const DesktopNavbar = () => {
  return (
    <Container className="py-4 items-center justify-between hidden lg:flex relative z-20">
      <Link href="https://manasbuilds.me">Manas</Link>
      <div className="flex items-center gap-4">
        {navlinks.map((link) => (
          <Link
            key={link.title}
            className="text-sm text-neutral-600 dark:text-neutral-400 font-medium"
            href={link.href}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <CommandDialog />
        <ModeToggle />
      </div>
    </Container>
  );
}