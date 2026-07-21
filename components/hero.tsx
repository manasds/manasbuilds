import { Container } from "./container";
import { SocialLinks } from "./social-links";
import { yap, tagline } from "@/lib/text";

export const Hero = () => {
  return (
    <Container className="relative z-10 overflow-hidden rounded-xl py-3 md:py-8">
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/BG-MD.jpeg')] bg-cover bg-center bg-no-repeat"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-black/30 dark:bg-black/45"
      />
      <div className="relative z-10 max-w-2xl space-y-3 md:space-y-4">
        <div className="space-y-1">
          <p className="text-lg md:text-xl font-mono font-medium text-white drop-shadow-sm">
            {yap}
          </p>
          <p className="text-sm md:text-base text-white/85 leading-relaxed drop-shadow-sm">
            {tagline}
          </p>
        </div>
        <SocialLinks className="[&_a]:border-white/35 [&_a]:text-white/90 [&_a:hover]:text-white [&_a:hover]:border-white/55" />
      </div>
    </Container>
  );
};
