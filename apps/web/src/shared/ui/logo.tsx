import Link from "next/link";
import { Layers } from "lucide-react";
import { cn } from "cn";

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
    >
      <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Layers className="size-4" />
      </span>
      Acme
    </Link>
  );
}

export { Logo };
