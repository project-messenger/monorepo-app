import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "./input";

const meta = {
  title: "UI/Input",
  component: Input,
  args: { placeholder: "Введите текст" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "auth", "app", "settings"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Auth: Story = { args: { variant: "auth" } };
export const App: Story = {
  args: { variant: "app", placeholder: "Название проекта" },
};
export const Settings: Story = {
  args: { variant: "settings", defaultValue: "Проект «Sync»" },
};
export const Disabled: Story = {
  args: { disabled: true, value: "Недоступно" },
};
export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "неверный email" },
};
