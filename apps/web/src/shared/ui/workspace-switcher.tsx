import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";
import { ChevronDownIcon } from "lucide-react";

const workspaceSwitcherVariants = cva(
  "flex w-full items-center justify-between gap-2 border-0 text-left text-label-button text-sidebar-primary-foreground transition-colors outline-none focus-visible:ring-3 focus-visible:ring-sidebar-ring/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        workspace:
          "h-[50px] rounded-lg bg-sidebar-switcher px-3.5 text-white hover:bg-sidebar-accent active:bg-sidebar-accent/80",
      },
    },
    defaultVariants: {
      variant: "workspace",
    },
  },
);

function WorkspaceSwitcher({
  className,
  variant = "workspace",
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof workspaceSwitcherVariants>) {
  return (
    <button
      type="button"
      data-slot="workspace-switcher"
      className={cn(workspaceSwitcherVariants({ variant }), className)}
      {...props}
    >
      <span className="min-w-0 truncate">{children}</span>
      <ChevronDownIcon aria-hidden className="size-4 shrink-0" />
    </button>
  );
}

export { WorkspaceSwitcher, workspaceSwitcherVariants };
