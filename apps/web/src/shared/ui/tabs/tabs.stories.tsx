import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  args: { defaultValue: "chats" },
  render: (args) => (
    <Tabs {...args} className="max-w-md">
      <TabsList>
        <TabsTrigger value="chats">Чаты</TabsTrigger>
        <TabsTrigger value="tasks">Задачи</TabsTrigger>
        <TabsTrigger value="github">GitHub</TabsTrigger>
      </TabsList>
      <TabsContent value="chats">Список чатов команды.</TabsContent>
      <TabsContent value="tasks">Канбан задач проекта.</TabsContent>
      <TabsContent value="github">Пул-реквесты и обсуждения.</TabsContent>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Line: Story = {
  render: (args) => (
    <Tabs {...args} className="max-w-md">
      <TabsList variant="line">
        <TabsTrigger value="chats">Чаты</TabsTrigger>
        <TabsTrigger value="tasks">Задачи</TabsTrigger>
      </TabsList>
      <TabsContent value="chats">Список чатов команды.</TabsContent>
      <TabsContent value="tasks">Канбан задач проекта.</TabsContent>
    </Tabs>
  ),
};
export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <Tabs {...args} className="max-w-md">
      <TabsList>
        <TabsTrigger value="chats">Чаты</TabsTrigger>
        <TabsTrigger value="tasks">Задачи</TabsTrigger>
      </TabsList>
      <TabsContent value="chats">Список чатов команды.</TabsContent>
      <TabsContent value="tasks">Канбан задач проекта.</TabsContent>
    </Tabs>
  ),
};
