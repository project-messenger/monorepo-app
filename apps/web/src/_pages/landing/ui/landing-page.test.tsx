import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LandingPage } from "./landing-page";

describe("LandingPage", () => {
  it("renders landing sections in the correct order without unused sections", () => {
    render(<LandingPage />);

    const sections = [
      screen.getByRole("heading", {
        level: 1,
        name: /От «обсудим»/,
      }),
      screen.getByRole("img", {
        name: "Пример интерфейса командного мессенджера",
      }),
      screen.getByRole("region", {
        name: /Не ещё один чат/,
      }),
      screen.getByRole("region", {
        name: /Три шага — и вы в одном ритме/,
      }),
      screen.getByRole("region", {
        name: /Контекст общий/,
      }),
      screen.getByRole("region", {
        name: /Пусть разговоры/,
      }),
    ];

    for (let i = 0; i < sections.length - 1; i++) {
      expect(
        sections[i].compareDocumentPosition(sections[i + 1]) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }

    expect(
      screen.queryByText(/Нам доверяют команды из/),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "Простые и прозрачные цены",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "Частые вопросы",
      }),
    ).not.toBeInTheDocument();
  });

  it("offers registration as a real link that opens in the same tab", () => {
    render(<LandingPage />);

    const link = screen.getByRole("link", {
      name: /Создать пространство/,
    });

    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/register");
    expect(link).not.toHaveAttribute("target");
    expect(within(link).queryByRole("button")).not.toBeInTheDocument();
    expect(link.closest("button")).toBeNull();
  });

  it("shows access guarantees before the final registration call to action", () => {
    render(<LandingPage />);

    const security = screen.getByRole("region", {
      name: /Контекст общий\. Доступ — под контролем\./,
    });
    expect(
      within(security).getByText("ИИ видит только то, что доступно вам."),
    ).toBeVisible();
    const statements = [
      "Закрытые каналы и репозитории остаются закрытыми.",
      "ИИ видит только то, что доступно вам.",
      "Никаких действий от вашего имени без подтверждения.",
    ];
    const securityText = security.textContent ?? "";
    const statementPositions = statements.map((statement) =>
      securityText.indexOf(statement),
    );
    expect(statementPositions.every((position) => position !== -1)).toBe(true);
    expect(statementPositions).toEqual(
      [...statementPositions].sort((first, second) => first - second),
    );
    expect(
      within(security).getByText(
        "Никаких действий от вашего имени без подтверждения.",
      ),
    ).toBeVisible();
    const cta = screen.getByRole("region", {
      name: /Пусть разговоры становятся результатом\./,
    });
    expect(
      security.compareDocumentPosition(cta) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("provides anchor targets for all header navigation links", () => {
    render(<LandingPage />);

    const productImage = screen.getByRole("img", {
      name: "Пример интерфейса командного мессенджера",
    });

    expect(productImage.closest("figure")).toHaveAttribute("id", "product");

    expect(
      screen.getByRole("region", {
        name: /Три шага — и вы в одном ритме/,
      }),
    ).toHaveAttribute("id", "teams");

    expect(
      screen.getByRole("region", {
        name: /Контекст общий\. Доступ — под контролем/,
      }),
    ).toHaveAttribute("id", "security");
  });

  it("provides a registration link in the hero section", () => {
    render(<LandingPage />);

    const link = screen.getByRole("link", {
      name: /Начать с командой/,
    });

    expect(link).toHaveAttribute("href", "/register");
    expect(link).not.toHaveAttribute("target");
  });
});
