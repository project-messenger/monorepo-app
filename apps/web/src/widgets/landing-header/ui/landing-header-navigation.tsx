import { Button } from "@/shared/ui/button";
import { Link } from "@/shared/ui/link";
import { SheetClose } from "@/shared/ui/sheet";
import { navLinks } from "../config/nav-links";

function LandingHeaderNavigationDesktop() {
  return (
    <nav
      aria-label="Навигация по странице"
      className="hidden items-center gap-[clamp(0.5rem,calc(5vw_-_2rem),2rem)] landing-header:flex"
    >
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-body-landing focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-ring"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

function LandingHeaderNavigationMobile() {
  return (
    <nav
      aria-label="Навигация по странице"
      className="flex flex-col gap-1 px-4"
    >
      {navLinks.map(({ href, label }) => (
        <SheetClose
          key={href}
          nativeButton={false}
          render={
            <Button
              variant="ghost"
              className="justify-start"
              nativeButton={false}
              render={<Link href={href} role="link" />}
            />
          }
        >
          {label}
        </SheetClose>
      ))}
    </nav>
  );
}

export { LandingHeaderNavigationDesktop, LandingHeaderNavigationMobile };
