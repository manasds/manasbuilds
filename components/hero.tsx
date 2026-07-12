import { Container } from "./container";
import { SocialLinks } from "./social-links";
import { yap, tagline } from "@/lib/text";

export const Hero = () => {
  return (
    <Container className="relative z-10 pt-10 pb-16 md:pt-16 md:pb-20">
      <div className="max-w-2xl space-y-6">
        <div className="space-y-3">
          <p className="text-lg md:text-xl font-mono font-medium">{yap}</p>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {tagline}
          </p>
        </div>
        <SocialLinks />
      </div>
    </Container>
  );
};
