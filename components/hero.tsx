import { Container } from "./container";
import React from "react";

export const Hero = () => {
  return (
    <Container className="h-screen border-x-2 relative flex justify-center items-center z-20">
      <div className=" text-6xl font-mono font-medium dark:font-white">
        This is Manas Dubey
      </div>
    </Container>
  );
};
