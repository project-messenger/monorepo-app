import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  args: { children: "Кнопка" },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "surface",
        "soft",
        "accent",
        "sidebar-accent",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "app",
        "app-lg",
        "landing",
        "landing-cta",
        "auth",
      ],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Outline: Story = { args: { variant: "outline" } };
export const Destructive: Story = { args: { variant: "destructive" } };
export const Surface: Story = { args: { variant: "surface" } };
export const Soft: Story = { args: { variant: "soft" } };
export const Accent: Story = { args: { variant: "accent" } };
export const LandingCta: Story = {
  args: { variant: "sidebar-accent", size: "landing-cta" },
};
export const App: Story = { args: { size: "app" } };
export const AppLarge: Story = { args: { size: "app-lg" } };
export const Landing: Story = { args: { size: "landing" } };
export const Auth: Story = { args: { size: "auth" } };
export const Disabled: Story = { args: { disabled: true } };
