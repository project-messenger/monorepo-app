import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils";

function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="container"
      className={cn(
        "mx-auto w-full max-w-page px-4 sm:px-6 lg:px-16",
        className,
      )}
      {...props}
    />
  );
}

export { Container };
