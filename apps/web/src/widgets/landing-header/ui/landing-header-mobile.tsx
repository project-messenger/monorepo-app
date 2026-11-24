"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Logo } from "@/shared/ui/logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { LandingHeaderAuthLinks } from "./landing-header-auth-links";
import { LandingHeaderNavigationMobile } from "./landing-header-navigation";

const DESKTOP_MEDIA_QUERY = "(min-width: 72rem)";

function LandingHeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }

    const desktopMediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    desktopMediaQuery.addEventListener("change", closeOnDesktop);

    return () => {
      desktopMediaQuery.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  return (
    <div className="col-start-3 justify-self-end landing-header:hidden">
      <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
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
          <LandingHeaderNavigationMobile />
          <LandingHeaderAuthLinks mode="mobile" />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export { LandingHeaderMobile };
