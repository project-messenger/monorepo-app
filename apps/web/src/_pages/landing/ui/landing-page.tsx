import { Cta } from "./cta";
import { Faq } from "./faq";
import { Features } from "./features";
import { Hero } from "./hero";
import { Logos } from "./logos";
import { Pricing } from "./pricing";

export function LandingPage() {
  return (
    <>
      <Hero />
      <Logos />
      <Features />
      <Pricing />
      <Faq />
      <Cta />
    </>
  );
}
