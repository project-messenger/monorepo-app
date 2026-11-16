import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { NavigationItem } from "./navigation-item";

const meta = {
  title: "UI/NavigationItem",
  component: NavigationItem,
  argTypes: {
    variant: { control: "select", options: ["default", "selected"] },
  },
  args: {
    href: "#",
    children: "Проект Alpha",
    className: "w-[216px]",
  },
  decorators: [
    (Story) => (
      <div className="w-[240px] rounded-lg bg-sidebar p-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavigationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: "default" } };
export const Selected: Story = { args: { variant: "selected" } };
