"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type TaskStatus = "todo" | "in-progress" | "review" | "done";

const statusItems: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "К выполнению" },
  { value: "in-progress", label: "В работе" },
  { value: "review", label: "На проверке" },
  { value: "done", label: "Готово" },
];

type StatusSelectProps = {
  value?: TaskStatus;
  defaultValue?: TaskStatus;
  onValueChange?: (value: TaskStatus) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
};

function StatusSelect({
  value,
  defaultValue = "todo",
  onValueChange,
  disabled,
  className,
  "aria-label": ariaLabel = "Статус задачи",
}: StatusSelectProps) {
  const [internal, setInternal] = React.useState<TaskStatus>(defaultValue);
  const current = value ?? internal;

  return (
    <Select
      items={statusItems}
      value={current}
      disabled={disabled}
      onValueChange={(next) => {
        const status = next as TaskStatus;
        setInternal(status);
        onValueChange?.(status);
      }}
    >
      <SelectTrigger
        data-slot="status-select"
        aria-label={ariaLabel}
        variant={`status-${current}`}
        className={className}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statusItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { StatusSelect, statusItems };
export type { TaskStatus };
