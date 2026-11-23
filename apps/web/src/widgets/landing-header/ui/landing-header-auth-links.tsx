import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { Link } from "@/shared/ui/link";
import { SheetClose } from "@/shared/ui/sheet";
import { authLinks } from "../config/auth-links";

type LandingHeaderAuthLinksProps = {
  mode: "desktop" | "mobile";
};

function LandingHeaderAuthLinks({ mode }: LandingHeaderAuthLinksProps) {
  const isMobile = mode === "mobile";

  return (
    <div
      className={
        isMobile
          ? "mt-auto flex flex-col gap-2 p-4"
          : "hidden items-center gap-[clamp(0.2rem,calc(10vw_-_6rem),2rem)] justify-self-end landing-header:flex"
      }
    >
      {authLinks.map(({ href, label }) => {
        const variant =
          href === ROUTES.LOGIN ? (isMobile ? "outline" : "ghost") : "default";
        const link = (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            role="link"
          />
        );

        if (isMobile) {
          return (
            <SheetClose
              key={href}
              nativeButton={false}
              render={
                <Button variant={variant} nativeButton={false} render={link} />
              }
            >
              {label}
            </SheetClose>
          );
        }

        return (
          <Button
            key={href}
            variant={variant}
            size="landing"
            nativeButton={false}
            render={link}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}

export { LandingHeaderAuthLinks };
