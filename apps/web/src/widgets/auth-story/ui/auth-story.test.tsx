import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AuthStory } from "./auth-story";

describe("AuthStory", () => {
  it("presents the discussion-to-task example as static supporting content", () => {
    render(<AuthStory />);

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
});
