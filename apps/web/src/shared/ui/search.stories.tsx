import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Search } from "./search";

const meta = {
  title: "UI/Search",
  component: Search,
  args: {
    placeholder: "Поиск сообщений, задач и файлов",
  },
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Global: Story = {};
export const WithoutShortcut: Story = { args: { shortcut: null } };
export const Disabled: Story = { args: { disabled: true } };
