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

function LandingHeaderMobile() {
  return (
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
          <LandingHeaderNavigationMobile />
          <LandingHeaderAuthLinks mode="mobile" />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export { LandingHeaderMobile };
