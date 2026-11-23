import { Menu } from "lucide-react";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Logo } from "@/shared/ui/logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
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
          <Button
            variant="ghost"
            size="landing"
            nativeButton={false}
            render={
              <a
                href={ROUTES.LOGIN}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Войти
          </Button>
          <Button
            size="landing"
            nativeButton={false}
            render={
              <a
                href={ROUTES.REGISTER}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Создать пространство
          </Button>
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
                        render={<a href={href} />}
                      />
                    }
                  >
                    {label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 p-4">
                <SheetClose
                  nativeButton={false}
                  render={
                    <Button
                      variant="outline"
                      nativeButton={false}
                      render={
                        <a
                          href={ROUTES.LOGIN}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    />
                  }
                >
                  Войти
                </SheetClose>
                <SheetClose
                  nativeButton={false}
                  render={
                    <Button
                      nativeButton={false}
                      render={
                        <a
                          href={ROUTES.REGISTER}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    />
                  }
                >
                  Создать пространство
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}

export { LandingHeader };
