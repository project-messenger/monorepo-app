import type { ComponentProps } from "react";
import NextLink from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const linkVariants = cva(
  "rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
  {
    variants: {
      variant: {
        muted: "",
        inline: "text-body underline-offset-4 hover:underline",
      },
    },
    defaultVariants: { variant: "muted" },
  },
);

function Link({
  className,
  variant,
  ...props
}: ComponentProps<typeof NextLink> & VariantProps<typeof linkVariants>) {
  return (
    <NextLink
      data-slot="link"
      className={cn(linkVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Link };
