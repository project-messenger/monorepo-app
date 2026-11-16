import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const metricCardVariants = cva(
  "flex w-full items-start gap-3 rounded-metric px-5 py-4 text-foreground",
  {
    variants: {
      variant: {
        accent: "bg-surface-linked",
        surface: "border border-border bg-surface",
      },
    },
    defaultVariants: {
      variant: "surface",
    },
  },
);

function MetricCard({
  className,
  variant = "surface",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof metricCardVariants>) {
  return (
    <div
      data-slot="metric-card"
      className={cn(metricCardVariants({ variant }), className)}
      {...props}
    />
  );
}

function MetricCardValue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="metric-card-value"
      className={cn("text-heading-auth text-primary", className)}
      {...props}
    />
  );
}

function MetricCardBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="metric-card-body"
      className={cn("flex min-w-0 flex-col gap-2.5 pt-1.5", className)}
      {...props}
    />
  );
}

function MetricCardLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="metric-card-label"
      className={cn("text-base leading-[1.45] font-semibold", className)}
      {...props}
    />
  );
}

function MetricCardContext({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="metric-card-context"
      className={cn("text-caption text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  MetricCard,
  MetricCardBody,
  MetricCardContext,
  MetricCardLabel,
  MetricCardValue,
  metricCardVariants,
};
