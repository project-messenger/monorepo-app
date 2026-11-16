import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "./label";

const meta = {
  title: "UI/Label",
  component: Label,
  args: { children: "Название поля" },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = {
  render: () => (
    <div data-disabled="true">
      <Label>Недоступное поле</Label>
    </div>
  ),
};
