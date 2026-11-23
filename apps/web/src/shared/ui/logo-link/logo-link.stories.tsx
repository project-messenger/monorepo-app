import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LogoLink } from "./logo-link";

const meta = {
  title: "UI/LogoLink",
  component: LogoLink,
} satisfies Meta<typeof LogoLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
