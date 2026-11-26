import { Cta } from "./cta";
import { Features } from "./features";
import { Hero } from "./hero";
import { Security } from "./security";
import { Steps } from "./steps";

export function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Steps />
      <Security />
      <Cta />
    </>
  );
}
