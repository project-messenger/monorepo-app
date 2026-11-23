import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Separator } from "./separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  render: (args) => (
    <div className="w-64">
      <p className="text-body">Сверху</p>
      <Separator {...args} className="my-4" />
      <p className="text-body">Снизу</p>
    </div>
  ),
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Vertical: Story = {
  render: (args) => (
    <div className="flex h-24 items-stretch gap-4">
      <span className="text-body">Слева</span>
      <Separator {...args} />
      <span className="text-body">Справа</span>
    </div>
  ),
  args: { orientation: "vertical" },
};
