import { forwardRef, type ComponentPropsWithoutRef } from "react";
import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { Logo } from "@/shared/ui/logo";

type LogoLinkProps = Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "className" | "href"
> & { className?: string };

const LogoLink = forwardRef<HTMLAnchorElement, LogoLinkProps>(function LogoLink(
  { className, ...props },
  ref,
) {
  return (
    <Link
      {...props}
      ref={ref}
      href={ROUTES.LANDING}
      className={cn("inline-flex", className)}
    >
      <Logo />
    </Link>
  );
});

export { LogoLink };
