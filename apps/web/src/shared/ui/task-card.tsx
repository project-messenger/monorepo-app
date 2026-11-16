import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { MoreVerticalIcon } from "lucide-react";

const taskCardVariants = cva(
  "flex w-full flex-col gap-1.5 rounded-lg bg-card px-3.5 pt-2.5 pb-1.5 text-card-foreground",
  {
    variants: {
      variant: {
        standard: "border border-border",
        blocked: "border border-border",
        review: "border-[1.5px] border-primary",
      },
    },
    defaultVariants: {
      variant: "standard",
    },
  },
);

function TaskCard({
  className,
  variant = "standard",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof taskCardVariants>) {
  return (
    <div
      data-slot="task-card"
      data-variant={variant}
      className={cn(taskCardVariants({ variant }), className)}
      {...props}
    />
  );
}

function TaskCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="task-card-header"
      className={cn("flex items-start justify-between gap-2", className)}
      {...props}
    />
  );
}

function TaskCardMenuButton({
  className,
  "aria-label": ariaLabel = "Действия с задачей",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="task-card-menu-button"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 active:bg-secondary disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4",
        className,
      )}
      {...props}
    >
      <MoreVerticalIcon aria-hidden />
    </button>
  );
}

function TaskCardId({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="task-card-id"
      className={cn("text-caption-task-id text-muted-foreground", className)}
      {...props}
    />
  );
}

function TaskCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="task-card-title"
      className={cn("text-label-button text-foreground", className)}
      {...props}
    />
  );
}

function TaskCardMeta({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="task-card-meta"
      className={cn("flex flex-col gap-2.5", className)}
      {...props}
    />
  );
}

const taskCardPriorityVariants = cva("text-caption-small", {
  variants: {
    priority: {
      normal: "text-muted-foreground",
      high: "text-warning-foreground",
    },
  },
  defaultVariants: {
    priority: "normal",
  },
});

function TaskCardPriority({
  className,
  priority = "normal",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof taskCardPriorityVariants>) {
  return (
    <div
      data-slot="task-card-priority"
      className={cn(taskCardPriorityVariants({ priority }), className)}
      {...props}
    />
  );
}

function TaskCardDetails({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="task-card-details"
      className={cn("text-caption-small text-muted-foreground", className)}
      {...props}
    />
  );
}

const taskCardNoteVariants = cva("text-[0.625rem] leading-[1.45]", {
  variants: {
    tone: {
      destructive: "text-destructive",
      success: "text-primary",
    },
  },
  defaultVariants: {
    tone: "destructive",
  },
});

function TaskCardNote({
  className,
  tone = "destructive",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof taskCardNoteVariants>) {
  return (
    <div
      data-slot="task-card-note"
      className={cn(taskCardNoteVariants({ tone }), className)}
      {...props}
    />
  );
}

export {
  TaskCard,
  TaskCardDetails,
  TaskCardHeader,
  TaskCardId,
  TaskCardMenuButton,
  TaskCardMeta,
  TaskCardNote,
  TaskCardPriority,
  TaskCardTitle,
  taskCardNoteVariants,
  taskCardPriorityVariants,
  taskCardVariants,
};
