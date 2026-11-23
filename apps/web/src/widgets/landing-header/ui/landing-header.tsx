import { Menu } from "lucide-react";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Link } from "@/shared/ui/link";
import { Logo } from "@/shared/ui/logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { authLinks } from "../config/auth-links";
import { navLinks } from "../config/nav-links";

function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/95 backdrop-blur">
      <Container className="grid h-20 grid-cols-[1fr_auto_1fr] items-center">
        <Logo className="shrink-0" />

        <nav
          aria-label="Навигация по странице"
          className="hidden items-center gap-[clamp(0.5rem,calc(5vw_-_2rem),2rem)] landing-header:flex"
        >
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-body-landing text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-ring"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-[clamp(0.2rem,calc(10vw_-_6rem),2rem)] justify-self-end landing-header:flex">
          {authLinks.map(({ href, label }) => (
            <Button
              key={href}
              variant={href === ROUTES.LOGIN ? "ghost" : "default"}
              size="landing"
              nativeButton={false}
              render={
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="link"
                />
              }
            >
              {label}
            </Button>
          ))}
        </div>

        <div className="col-start-3 justify-self-end landing-header:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Открыть меню" />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
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
              <div className="mt-auto flex flex-col gap-2 p-4">
                {authLinks.map(({ href, label }) => (
                  <SheetClose
                    key={href}
                    nativeButton={false}
                    render={
                      <Button
                        variant={href === ROUTES.LOGIN ? "outline" : "default"}
                        nativeButton={false}
                        render={
                          <Link
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            role="link"
                          />
                        }
                      />
                    }
                  >
                    {label}
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}

export { LandingHeader };
