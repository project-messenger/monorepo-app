"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { PasswordInput } from "@/shared/ui/password-input";
import {
  type LoginData,
  type LoginFormValues,
  loginSchema,
} from "../model/schemas";
import { AuthHeader } from "./auth-header";
import { OAuthButtons } from "./oauth-buttons";

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
  remember: true,
};

function LoginForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<LoginFormValues, unknown, LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  // TODO: подключить бэкенд авторизации
  function onSubmit(data: LoginData) {
    void data;
  }

  return (
    <>
      <AuthHeader
        title="Вход в аккаунт"
        description="Введите email и пароль, чтобы продолжить"
      />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field data-invalid={!!errors.email || undefined}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.ru"
              aria-invalid={!!errors.email || undefined}
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>

          <Field data-invalid={!!errors.password || undefined}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Link
                href="#"
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Забыли пароль?
              </Link>
            </div>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              aria-invalid={!!errors.password || undefined}
              {...register("password")}
            />
            <FieldError errors={[errors.password]} />
          </Field>

          <Controller
            control={control}
            name="remember"
            render={({ field: { value, onChange, ...field } }) => (
              <Field orientation="horizontal">
                <Checkbox
                  id="remember"
                  checked={value}
                  onCheckedChange={onChange}
                  {...field}
                />
                <FieldLabel htmlFor="remember" className="font-normal">
                  Запомнить меня
                </FieldLabel>
              </Field>
            )}
          />

          <Field>
            <Button type="submit">Войти</Button>
            {isSubmitSuccessful && (
              <FieldDescription className="text-center">
                Форма валидна — бэкенд ещё не подключён.
              </FieldDescription>
            )}
          </Field>

          <FieldSeparator>или</FieldSeparator>

          <OAuthButtons intent="login" />
          <FieldDescription className="text-center">
            Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </>
  );
}

export { LoginForm };
