import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Textarea } from "./textarea";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  args: { placeholder: "Введите текст" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "app"],
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const App: Story = {
  args: { variant: "app", placeholder: "Описание задачи" },
};
export const Disabled: Story = {
  args: { disabled: true, value: "Недоступно" },
};
