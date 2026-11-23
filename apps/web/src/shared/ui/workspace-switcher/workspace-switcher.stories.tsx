import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { WorkspaceSwitcher } from "./workspace-switcher";

const meta = {
  title: "UI/WorkspaceSwitcher",
  component: WorkspaceSwitcher,
  args: {
    children: "Команда разработки",
    className: "w-[208px]",
  },
  decorators: [
    (Story) => (
      <div className="w-[240px] rounded-lg bg-sidebar p-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WorkspaceSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Workspace: Story = {};
export const Disabled: Story = { args: { disabled: true } };
