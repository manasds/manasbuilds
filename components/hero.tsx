import { Container } from "./container";
import React from "react";
import { yap } from "@/lib/text";
export const Hero = () => {
  return (
    <Container className="h-screen relative z-10">
      <div className=" text-lg md:text-xl leading-10 font-mono font-medium dark:font-white ">
        {yap}
      </div>
    </Container>
  );
};
