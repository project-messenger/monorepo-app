import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { Logo } from "@/shared/ui/logo";

function LogoLink({ className }: { className?: string }) {
  return (
    <Link href={ROUTES.LANDING} className={cn("inline-flex", className)}>
      <Logo />
    </Link>
  );
}

export { LogoLink };
