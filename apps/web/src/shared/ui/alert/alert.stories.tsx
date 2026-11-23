import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta = {
  title: "UI/Alert",
  component: Alert,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "destructive", "warning"],
    },
  },
  args: {
    children: <AlertDescription>Изменения сохранены</AlertDescription>,
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = {
  args: {
    variant: "success",
    children: <AlertDescription>Адрес свободен</AlertDescription>,
  },
};
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: (
      <AlertDescription>Не удалось сохранить изменения</AlertDescription>
    ),
  },
};
export const Warning: Story = {
  args: {
    variant: "warning",
    children: (
      <>
        <AlertTitle>Не хватает данных</AlertTitle>
        <AlertDescription>Срок готовности не указан</AlertDescription>
      </>
    ),
  },
};
