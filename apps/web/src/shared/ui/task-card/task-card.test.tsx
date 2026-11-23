import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  TaskCard,
  TaskCardDetails,
  TaskCardHeader,
  TaskCardId,
  TaskCardMeta,
  TaskCardNote,
  TaskCardPriority,
  TaskCardTitle,
} from "./task-card";

describe("TaskCard", () => {
  it("отображает все слоты карточки", () => {
    render(
      <TaskCard>
        <TaskCardHeader>
          <TaskCardId>KAN-17</TaskCardId>
        </TaskCardHeader>
        <TaskCardTitle>Подготовить чеклист релиза</TaskCardTitle>
        <TaskCardMeta>
          <TaskCardPriority>Обычный приоритет</TaskCardPriority>
          <TaskCardDetails>Мария · до 20 нояб.</TaskCardDetails>
        </TaskCardMeta>
        <TaskCardNote>Заблокировано</TaskCardNote>
      </TaskCard>,
    );

    expect(screen.getByText("KAN-17")).toBeInTheDocument();
    expect(screen.getByText("Подготовить чеклист релиза")).toBeInTheDocument();
    expect(screen.getByText("Обычный приоритет")).toBeInTheDocument();
    expect(screen.getByText("Мария · до 20 нояб.")).toBeInTheDocument();
    expect(screen.getByText("Заблокировано")).toBeInTheDocument();
  });

  it("по умолчанию использует вариант standard с обычной рамкой", () => {
    render(<TaskCard data-testid="card">Текст</TaskCard>);

    const card = screen.getByTestId("card");
    expect(card).toHaveAttribute("data-variant", "standard");
    expect(card).toHaveClass("border");
    expect(card).toHaveClass("rounded-lg");
    expect(card).toHaveClass("bg-card");
  });

  it("вариант review выделяется рамкой primary 1.5 px", () => {
    render(
      <TaskCard variant="review" data-testid="card">
        Текст
      </TaskCard>,
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveAttribute("data-variant", "review");
    expect(card).toHaveClass("border-[1.5px]");
    expect(card).toHaveClass("border-primary");
  });

  it("высокий приоритет использует цвет warning", () => {
    render(<TaskCardPriority priority="high">Высокий</TaskCardPriority>);

    expect(screen.getByText("Высокий")).toHaveClass("text-warning-foreground");
  });

  it.each([
    ["destructive", "text-destructive"],
    ["success", "text-primary"],
  ] as const)("заметка с тоном %s использует %s", (tone, expected) => {
    render(<TaskCardNote tone={tone}>Заметка</TaskCardNote>);

    expect(screen.getByText("Заметка")).toHaveClass(expected);
  });

  it("добавляет className, не теряя классы варианта", () => {
    render(
      <TaskCard className="w-[252px]" data-testid="card">
        Текст
      </TaskCard>,
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("w-[252px]");
    expect(card).toHaveClass("rounded-lg");
  });
});
