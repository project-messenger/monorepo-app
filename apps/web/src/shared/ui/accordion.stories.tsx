import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const items = [
  {
    value: "what",
    question: "Что такое Sync?",
    answer: "Мессенджер для команд: чаты, задачи и GitHub в одном месте.",
  },
  {
    value: "pricing",
    question: "Сколько стоит?",
    answer: "Базовый тариф бесплатный, платные функции появятся позже.",
  },
  {
    value: "data",
    question: "Где хранятся данные?",
    answer: "На серверах в России, доступ — только у участников команды.",
  },
];

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  render: (args) => (
    <Accordion {...args} className="max-w-md">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FirstOpen: Story = { args: { defaultValue: ["what"] } };
