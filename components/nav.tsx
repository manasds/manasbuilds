"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Container } from "./container";
import { Button } from "./ui/button";
import { PanelLeft, X } from "lucide-react";
import ModeToggle from "./mode-toggle" 
import { CommandDialog } from "./ui/command";
import {AnimatePresence, motion} from "motion/react"
const navlinks = [
  { title: "Blog", href: "/blog" },
  { title: "Projects", href: "/projects" },
  { title: "Contact", href: "/contaxt" },
  { title: "Pricing", href: "/pricing" },
];

export const Nav = () => {
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 relative">
      <DesktopNavbar />
      <MobileNavbar />
    </div>
  );
};
export const MobileNavbar = () => {
  const [open, setopen] = useState(false);
  return (
    <div className="flex md:hidden py-2 px-4 justify-between relative items-center z-20">
      <Link href={"/"} className="size-4 rounded-full flex justify-center items-center">M</Link>
      <div className="flex gap-2">
        <ModeToggle />
        <button onClick={() => setopen(!open)}>
          <PanelLeft className="size-5" />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 h-dvh w-screen bg-white/40 dark:bg-black/40 flex flex-col justify-between overscroll-contain overflow-y-auto backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              
            }}
            exit={{
              opacity: 0,
             
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <div>
              <div className="flex w-full py-2 items-center justify-between px-4">
              {/* this classname is applied to logo svg and not whole logo with title  */}
                <div className="size-4 rounded-full flex justify-center items-center">M</div>
                <button onClick={() => setopen(false)}>
                  <X className="h-8 dark:text-white " />
                </button>
              </div>
              <div className="flex flex-col gap-6 my-10 px-4">
                {navlinks.map((link, idx) => (
                  <motion.div
                    key={idx}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.2,
                      delay: idx * 0.1,
                    }}
                  >
                    <Link
                      className="text-sm text-neutral-600 dark:text-neutral-400 font-medium tracking-wide"
                      href={link.href}
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-6 px-4 pb-4">
              <Button
                variant="outline"
                className="border border-neutral-300 dark:text-neutral-200  dark:border-neutral-700"
              >
                Login
              </Button>
              <Button>Signup</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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