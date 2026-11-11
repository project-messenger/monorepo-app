import { UserSchema } from "@app/shared";
import { describe, expect, it } from "vitest";

import { loginSchema, registerSchema } from "./schemas";

function fieldErrors(result: {
  success: boolean;
  error?: { issues: { path: PropertyKey[]; message: string }[] };
}) {
  const errors: Record<string, string> = {};
  for (const issue of result.error?.issues ?? []) {
    const key = String(issue.path[0]);
    errors[key] ??= issue.message;
  }
  return errors;
}

describe("loginSchema", () => {
  const valid = { email: "you@company.ru", password: "secret", remember: true };

  it("принимает корректные данные и обрезает пробелы в email", () => {
    const result = loginSchema.safeParse({
      ...valid,
      email: "  you@company.ru ",
    });
    expect(result.success).toBe(true);
    expect(result.data?.email).toBe("you@company.ru");
  });

  it("различает пустой и некорректный email", () => {
    expect(
      fieldErrors(loginSchema.safeParse({ ...valid, email: "  " })),
    ).toEqual({
      email: "Введите email",
    });
    expect(
      fieldErrors(loginSchema.safeParse({ ...valid, email: "you@" })),
    ).toEqual({
      email: "Некорректный email",
    });
  });

  it("требует пароль", () => {
    expect(
      fieldErrors(loginSchema.safeParse({ ...valid, password: "" })),
    ).toEqual({
      password: "Введите пароль",
    });
  });
});

describe("registerSchema", () => {
  const valid = {
    name: "Иван",
    email: "you@company.ru",
    password: "password1",
    confirm: "password1",
    terms: true,
  };

  it("принимает корректные данные", () => {
    expect(registerSchema.safeParse(valid).success).toBe(true);
  });

  it("сообщает обо всех пустых полях сразу", () => {
    const result = registerSchema.safeParse({
      name: " ",
      email: "",
      password: "",
      confirm: "",
      terms: false,
    });
    expect(fieldErrors(result)).toEqual({
      name: "Введите имя",
      email: "Введите email",
      password: "Введите пароль",
      terms: "Нужно принять условия",
    });
  });

  it("требует имя не короче 2 символов", () => {
    expect(
      fieldErrors(registerSchema.safeParse({ ...valid, name: " И " })),
    ).toEqual({ name: "Имя — минимум 2 символа" });
  });

  it("совместима с UserSchema: что примет форма, примет и бэкенд", () => {
    const backend = UserSchema.pick({ name: true, email: true });
    for (const input of [
      valid,
      { ...valid, name: " Ян ", email: " ya@company.ru " },
    ]) {
      const result = registerSchema.safeParse(input);
      expect(result.success).toBe(true);
      expect(backend.safeParse(result.data).success).toBe(true);
    }
    // И наоборот: имя, которое отклонит бэкенд, не пропускает и форма.
    expect(backend.safeParse({ name: "Я", email: valid.email }).success).toBe(
      false,
    );
    expect(registerSchema.safeParse({ ...valid, name: "Я" }).success).toBe(
      false,
    );
  });

  it("требует минимум 8 символов в пароле", () => {
    expect(
      fieldErrors(
        registerSchema.safeParse({
          ...valid,
          password: "short",
          confirm: "short",
        }),
      ),
    ).toEqual({ password: "Минимум 8 символов" });
  });

  it("сверяет пароли, даже если другие поля невалидны", () => {
    const result = registerSchema.safeParse({
      ...valid,
      name: "",
      confirm: "password2",
    });
    expect(fieldErrors(result)).toEqual({
      name: "Введите имя",
      confirm: "Пароли не совпадают",
    });
  });
});
