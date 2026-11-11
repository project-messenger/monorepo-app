import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RegisterForm } from "./register-form";

// Вне App Router useSearchParams возвращает null (OAuthButtons внутри формы).
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
}));

const submit = () =>
  userEvent.click(screen.getByRole("button", { name: "Зарегистрироваться" }));

describe("RegisterForm", () => {
  it("показывает ошибки пустой формы после отправки", async () => {
    render(<RegisterForm />);

    await submit();

    expect(await screen.findByText("Введите имя")).toBeInTheDocument();
    expect(screen.getByText("Введите email")).toBeInTheDocument();
    expect(screen.getByText("Введите пароль")).toBeInTheDocument();
    expect(screen.getByText("Нужно принять условия")).toBeInTheDocument();
    expect(screen.getByLabelText("Имя")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("отправляет корректно заполненную форму", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByLabelText("Имя"), "Иван");
    await user.type(screen.getByLabelText("Рабочий email"), "you@company.ru");
    await user.type(screen.getByLabelText("Пароль"), "password1");
    await user.type(screen.getByLabelText("Повторите пароль"), "password1");
    await user.click(screen.getByRole("checkbox"));
    await submit();

    expect(
      await screen.findByText("Форма валидна — бэкенд ещё не подключён."),
    ).toBeInTheDocument();
    expect(screen.queryByText("Нужно принять условия")).not.toBeInTheDocument();
  });

  it("сообщает о несовпадении паролей", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByLabelText("Пароль"), "password1");
    await user.type(screen.getByLabelText("Повторите пароль"), "password2");
    await submit();

    expect(await screen.findByText("Пароли не совпадают")).toBeInTheDocument();
  });
});
