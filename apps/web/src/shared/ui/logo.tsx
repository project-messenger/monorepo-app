import { cn } from "@/shared/lib/utils";

function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center text-brand-app tracking-tight",
        className,
      )}
    >
      <span>синк /</span>
    </div>
  );
}

export { Logo };
