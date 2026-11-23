import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const items = [
  { value: "all", label: "Все участники" },
  { value: "me", label: "Только я" },
  { value: "team", label: "Команда" },
];

const meta = {
  title: "UI/Select",
  component: SelectTrigger,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "app", "settings"],
    },
  },
  render: (args) => (
    <Select items={items} defaultValue="all">
      <SelectTrigger {...args} className="w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
} satisfies Meta<typeof SelectTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const App: Story = { args: { variant: "app" } };
export const Settings: Story = { args: { variant: "settings" } };
export const Disabled: Story = { args: { variant: "app", disabled: true } };
