import { Cta } from "./cta";
import { Faq } from "./faq";
import { Features } from "./features";
import { Hero } from "./hero";
import { Logos } from "./logos";
import { Pricing } from "./pricing";
import { Security } from "./security";
import { Steps } from "./steps";

export function LandingPage() {
  return (
    <>
      <Hero />
      <Logos />
      <Features />
      <Pricing />
      <Faq />
      <Steps />
      <Security />
      <Cta />
    </>
  );
}
