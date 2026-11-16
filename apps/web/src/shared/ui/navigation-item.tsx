import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const navigationItemVariants = cva(
  "flex h-[34px] w-full items-center gap-2 rounded-lg px-2 py-1.5 pl-7 text-left text-body transition-colors outline-none focus-visible:ring-3 focus-visible:ring-sidebar-ring/50 disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "text-sidebar-item-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground active:bg-sidebar-accent",
        selected:
          "bg-sidebar-accent font-semibold text-sidebar-accent-foreground hover:bg-sidebar-accent/80 active:bg-sidebar-accent/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function NavigationItem({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"a"> &
  VariantProps<typeof navigationItemVariants>) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(navigationItemVariants({ variant }), className),
        "aria-current": variant === "selected" ? "page" : undefined,
      },
      props,
    ),
    render,
    state: {
      slot: "navigation-item",
      variant,
    },
  });
}

export { NavigationItem, navigationItemVariants };
