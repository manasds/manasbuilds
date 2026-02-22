import { Hero } from "../components/hero";
import { Noise } from "../components/noise";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen font-inter relative">
      <Noise />
      <Hero />
      <Hero />
      <Hero />
    </div>
  );
}
