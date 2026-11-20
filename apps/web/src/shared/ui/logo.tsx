import Link from "next/link";
import { cn } from "@/shared/lib/utils";

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="синк /"
      className={cn(
        "flex items-center gap-2 text-brand-app font-bold tracking-tight",
        className,
      )}
    >
      <span>синк</span>
      <span>/</span>
    </Link>
  );
}

export { Logo };
