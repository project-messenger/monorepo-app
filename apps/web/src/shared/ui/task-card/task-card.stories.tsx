import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  TaskCard,
  TaskCardDetails,
  TaskCardHeader,
  TaskCardId,
  TaskCardMenuButton,
  TaskCardMeta,
  TaskCardNote,
  TaskCardPriority,
  TaskCardTitle,
} from "./task-card";

const meta = {
  title: "UI/TaskCard",
  component: TaskCard,
  argTypes: {
    variant: {
      control: "select",
      options: ["standard", "blocked", "review"],
    },
  },
  args: {
    className: "w-[252px]",
  },
} satisfies Meta<typeof TaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    variant: "standard",
    children: (
      <>
        <TaskCardHeader>
          <TaskCardId>KAN-17</TaskCardId>
          <TaskCardMenuButton />
        </TaskCardHeader>
        <TaskCardTitle>Подготовить чеклист релиза</TaskCardTitle>
        <TaskCardMeta>
          <TaskCardPriority>Обычный приоритет</TaskCardPriority>
          <TaskCardDetails>Мария · до 20 нояб.</TaskCardDetails>
        </TaskCardMeta>
      </>
    ),
  },
};

export const Blocked: Story = {
  args: {
    variant: "blocked",
    children: (
      <>
        <TaskCardHeader>
          <TaskCardId>KAN-21</TaskCardId>
        </TaskCardHeader>
        <TaskCardTitle>Согласовать контракт API</TaskCardTitle>
        <TaskCardMeta>
          <TaskCardPriority priority="high">Высокий приоритет</TaskCardPriority>
          <TaskCardDetails>Иван · до 18 нояб.</TaskCardDetails>
        </TaskCardMeta>
        <TaskCardNote tone="destructive">
          Заблокировано: ждём бэкенд
        </TaskCardNote>
      </>
    ),
  },
};

export const Review: Story = {
  args: {
    variant: "review",
    children: (
      <>
        <TaskCardHeader>
          <TaskCardId>KAN-24</TaskCardId>
        </TaskCardHeader>
        <TaskCardTitle>Добавить ленту сообщений</TaskCardTitle>
        <TaskCardMeta>
          <TaskCardPriority>Обычный приоритет</TaskCardPriority>
          <TaskCardDetails>Анна · до 22 нояб.</TaskCardDetails>
        </TaskCardMeta>
        <TaskCardNote tone="success">PR #84 · CI зелёный</TaskCardNote>
      </>
    ),
  },
};
