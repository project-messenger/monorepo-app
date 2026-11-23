import { Container } from "@/shared/ui/container";
import { Logo } from "@/shared/ui/logo";
import { LandingHeaderAuthLinks } from "./landing-header-auth-links";
import { LandingHeaderMobile } from "./landing-header-mobile";
import { LandingHeaderNavigationDesktop } from "./landing-header-navigation";

function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/95 backdrop-blur">
      <Container className="grid h-20 grid-cols-[1fr_auto_1fr] items-center">
        <Logo className="shrink-0" />
        <LandingHeaderNavigationDesktop />
        <LandingHeaderAuthLinks mode="desktop" />
        <LandingHeaderMobile />
      </Container>
    </header>
  );
}

export { LandingHeader };
