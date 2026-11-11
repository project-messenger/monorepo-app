import { z } from "zod";

// Ограничения полей совпадают с UserSchema из @app/shared (контракт с бэкендом),
// а сообщения свои, на русском. Поменялся UserSchema — поменяйте и здесь:
// тест «совместима с UserSchema» в schemas.test.ts это поймает.

// Пустое поле и неверный формат — разные сообщения: pipe запускает z.email()
// только если строка непустая.
const email = z
  .string()
  .trim()
  .min(1, { error: "Введите email" })
  .pipe(z.email({ error: "Некорректный email" }));

const requiredPassword = z.string().min(1, { error: "Введите пароль" });

export const loginSchema = z.object({
  email,
  password: requiredPassword,
  remember: z.boolean(),
});

export type LoginFormValues = z.input<typeof loginSchema>;
export type LoginData = z.output<typeof loginSchema>;

const registerFields = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "Введите имя" })
    .min(2, { error: "Имя — минимум 2 символа" }),
  email,
  password: requiredPassword.min(8, { error: "Минимум 8 символов" }),
  confirm: z.string().min(1, { error: "Повторите пароль" }),
  terms: z.boolean().refine(Boolean, { error: "Нужно принять условия" }),
});

const passwordPair = registerFields.pick({ password: true, confirm: true });

export const registerSchema = registerFields.refine(
  (data) => data.password === data.confirm,
  {
    error: "Пароли не совпадают",
    path: ["confirm"],
    // По умолчанию Zod не запускает refine объекта, если ошибка есть в любом поле.
    // Сверяем пароли, как только оба поля сами по себе валидны.
    when: (payload) => passwordPair.safeParse(payload.value).success,
  },
);

export type RegisterFormValues = z.input<typeof registerSchema>;
export type RegisterData = z.output<typeof registerSchema>;
