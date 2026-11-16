import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "./input-group";

const meta = {
  title: "UI/InputGroup",
  component: InputGroup,
  render: (args) => (
    <InputGroup {...args} className="max-w-sm">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Поиск по задачам" />
    </InputGroup>
  ),
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "app", "settings"],
    },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const App: Story = { args: { variant: "app" } };
export const Settings: Story = { args: { variant: "settings" } };

export const WithButton: Story = {
  render: (args) => (
    <InputGroup {...args} className="max-w-sm">
      <InputGroupInput placeholder="Пригласить по email" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="soft">Отправить</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithPrefix: Story = {
  render: (args) => (
    <InputGroup {...args} className="max-w-sm">
      <InputGroupAddon>
        <InputGroupText>sync.app/</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="team" />
    </InputGroup>
  ),
};
