import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { ThemeToggle } from "@/features/theme-toggle";
import { Logo } from "@/shared/ui/logo";
import { navLinks } from "../config/nav-links";

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href={link.href} />}
            >
              {link.label}
            </Button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            className="hidden sm:inline-flex"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Войти
          </Button>
          <Button
            className="hidden sm:inline-flex"
            nativeButton={false}
            render={<Link href="/register" />}
          >
            Начать бесплатно
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Открыть меню"
                />
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
              <nav className="flex flex-col gap-1 px-4">
                {/* SheetClose закрывает меню при переходе: Link меняет роут без
                    перезагрузки, и без него Sheet остался бы открытым. */}
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    nativeButton={false}
                    render={
                      <Button
                        variant="ghost"
                        className="justify-start"
                        nativeButton={false}
                        render={<Link href={link.href} />}
                      />
                    }
                  >
                    {link.label}
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
                      render={<Link href="/login" />}
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
                      render={<Link href="/register" />}
                    />
                  }
                >
                  Начать бесплатно
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };
