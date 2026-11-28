import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AuthStory } from "./auth-story";
import { authStoryContent } from "../config/content";

describe("AuthStory", () => {
  it("presents the discussion-to-task example as static supporting content", () => {
    render(<AuthStory content={authStoryContent} />);

    const story = within(
      screen.getByRole("complementary", {
        name: /Хорошая работа\s+начинается\s+с разговора\./,
      }),
    );
    expect(story.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(story.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
    expect(story.getByText("# разработка")).toBeInTheDocument();
    expect(
      story.getByText("«Нужно исправить сессию до релиза»"),
    ).toBeInTheDocument();
    expect(
      story.getByText("↳ Задача WEB-128 → В работе → Связанный PR #84"),
    ).toBeInTheDocument();
    expect(
      story.getByText("Меньше переключений. Больше результата."),
    ).toBeInTheDocument();
    expect(story.queryByRole("link")).not.toBeInTheDocument();
    expect(story.queryByRole("button")).not.toBeInTheDocument();
  });

  it("uses each instance's supplied content and associates its own heading", () => {
    const alternateContent = {
      heading: "Другой заголовок для проверки.",
      description: "Демонстрационное описание второго блока.",
      card: {
        overline: "ДЕМОНСТРАЦИОННАЯ КАРТОЧКА",
        channel: "# пример",
        message: "Сообщение второго блока",
        outcome: "Результат второго блока",
      },
      footer: "Подпись второго блока",
    };
    render(
      <>
        <AuthStory content={authStoryContent} />
        <AuthStory content={alternateContent} />
      </>,
    );

    const first = screen.getByRole("complementary", {
      name: /Хорошая работа\s+начинается\s+с разговора\./,
    });
    const second = screen.getByRole("complementary", {
      name: "Другой заголовок для проверки.",
    });
    expect(
      within(second).getByText("Демонстрационное описание второго блока."),
    ).toBeInTheDocument();
    expect(
      within(second).getByText("Результат второго блока"),
    ).toBeInTheDocument();
    expect(
      within(second).getByText("Подпись второго блока"),
    ).toBeInTheDocument();
    expect(within(second).queryByText("# разработка")).not.toBeInTheDocument();
    const firstHeading = within(first).getByRole("heading", { level: 2 });
    const secondHeading = within(second).getByRole("heading", { level: 2 });
    expect(firstHeading.id).not.toBe(secondHeading.id);
    expect(first).toHaveAttribute("aria-labelledby", firstHeading.id);
    expect(second).toHaveAttribute("aria-labelledby", secondHeading.id);
  });
});
