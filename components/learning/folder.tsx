"use client";
import Image from "next/image";
import { motion, scale, Variant, Variants } from "motion/react";
import { initialize } from "next/dist/server/lib/render-server";

export default function Folder() {
  type cardtype = {
    imageurl: string;
    x?: number;
    rotateinit?: number;
    rotatefin?: number;
  };
  const cards = [
    {
      imageurl: "/1.webp",
      x: -40,
      rotateinit: -5,
      rotatefin: -20,
    },
    {
      imageurl: "/manu.webp",
      x: 0,
      rotateinit: 0,
      rotatefin: 0,
    },
    {
      imageurl: "/8.webp",
      x: 40,
      rotateinit: 5,
      rotatefin: 20,
    },
  ];
  const containerVariants = {
    initial: {},
    hover: {},
  };
  const flapVariants = {
    initial: { height: "2rem" },
    hover: { height: "1.5rem" },
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  };
  const cardVariants : Variants = {
    initial: ({card , idx} : {card : cardtype ; idx : number}) => ({
      x: 0,
      y: 0,
      rotate: card.rotateinit,
      zIndex : idx
    }),
    hover: ({card , idx} : {card : cardtype ; idx : number}) => ({
      x: card.x,
      y: -30,
      rotate: card.rotatefin,
      scale: 1.5,
      zindex: idx,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    }),
  };
  return (
    <div className="size-64 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center rounded-md">
      <motion.div
        className="h-12 w-16 bg-amber-500 rounded-md relative"
        variants={containerVariants}
        initial="initial"
        whileHover="hover"
      >
        <div
          className="w-4 rounded-sm h-4 bg-amber-500 -top-1 absolute left-2 "
          style={{ clipPath: "inset(0 0 40% 0)" }}
        ></div>
        <motion.div
          className="absolute bg-linear-to-b from-amber-400 to-amber-500 rounded-md inset-x-0 bottom-0 h-8 pointer-events-none z-20 flex justify-center"
          variants={flapVariants}
        >
          <div className="w-3/4 bg-gray-300 h-[0.5px] mt-2"></div>
        </motion.div>
        <motion.div
          className="size-full flex justify-center"
          variants={containerVariants}
          initial="initial"
          whileHover="hover"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={card.imageurl}
              variants={cardVariants}
              custom={{card , idx}}
              className="h-6 w-8 top-0 absolute rounded-md"
              style={{originY : "100%"}}
            >
              <Image src={card.imageurl} fill alt="1" className="rounded-md"
              style={{objectFit : "cover"}} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
