import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Calendar } from "./calendar";

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  args: {
    mode: "single",
    defaultMonth: new Date(2026, 10, 1),
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithSelectedDay: Story = {
  args: { selected: new Date(2026, 10, 16) },
};
export const WithoutOutsideDays: Story = {
  args: { showOutsideDays: false },
};
