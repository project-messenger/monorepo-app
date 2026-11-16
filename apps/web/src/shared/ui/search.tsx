import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const searchVariants = cva(
  "flex w-full items-center gap-2 border border-transparent transition-colors outline-none focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 hover:border-ring/60 has-disabled:cursor-not-allowed has-disabled:opacity-50",
  {
    variants: {
      variant: {
        global:
          "h-9 rounded-sm bg-input-search px-3.5 text-body-small text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "global",
    },
  },
);

function Search({
  className,
  variant = "global",
  shortcut = "⌘ K",
  type = "search",
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof searchVariants> & {
    shortcut?: React.ReactNode;
  }) {
  return (
    <div
      data-slot="search"
      className={cn(searchVariants({ variant }), className)}
    >
      <input
        type={type}
        data-slot="search-input"
        className="min-w-0 flex-1 bg-transparent text-body-small text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        {...props}
      />
      {shortcut ? (
        <kbd
          data-slot="search-shortcut"
          className="shrink-0 font-sans text-caption text-muted-foreground"
        >
          {shortcut}
        </kbd>
      ) : null}
    </div>
  );
}

export { Search, searchVariants };
