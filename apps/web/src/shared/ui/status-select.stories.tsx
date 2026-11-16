import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StatusSelect } from "./status-select";

const meta = {
  title: "UI/StatusSelect",
  component: StatusSelect,
  argTypes: {
    defaultValue: {
      control: "select",
      options: ["todo", "in-progress", "review", "done"],
    },
  },
  args: {
    className: "w-[194px]",
  },
} satisfies Meta<typeof StatusSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Todo: Story = { args: { defaultValue: "todo" } };
export const InProgress: Story = { args: { defaultValue: "in-progress" } };
export const Review: Story = { args: { defaultValue: "review" } };
export const Done: Story = { args: { defaultValue: "done" } };
export const Disabled: Story = {
  args: { defaultValue: "review", disabled: true },
};
