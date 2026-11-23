import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PasswordInput } from "./password-input";

const meta = {
  title: "UI/PasswordInput",
  component: PasswordInput,
  args: { placeholder: "Пароль", defaultValue: "secret-password" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "auth", "app", "settings"],
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Auth: Story = { args: { variant: "auth" } };
export const Disabled: Story = { args: { disabled: true } };
