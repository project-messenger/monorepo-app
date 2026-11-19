import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StyledLink } from "./styled-link";

const meta = {
  title: "UI/StyledLink",
  component: StyledLink,
  args: { href: "#", children: "Link" },
  argTypes: { variant: { control: "select", options: ["muted", "inline"] } },
} satisfies Meta<typeof StyledLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Muted: Story = {};
export const Inline: Story = { args: { variant: "inline" } };
export const External: Story = {
  args: {
    href: "https://example.com",
    target: "_blank",
    rel: "noopener noreferrer",
  },
};
