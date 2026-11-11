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
  type RegisterData,
  type RegisterFormValues,
  registerSchema,
} from "../model/schemas";
import { AuthHeader } from "./auth-header";
import { OAuthButtons } from "./oauth-buttons";

const defaultValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirm: "",
  terms: false,
};

function RegisterForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<RegisterFormValues, unknown, RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  // TODO: подключить бэкенд регистрации
  function onSubmit(data: RegisterData) {
    void data;
  }

  const invalid = (name: keyof RegisterFormValues) =>
    !!errors[name] || undefined;

  return (
    <>
      <AuthHeader
        title="Создать аккаунт"
        description="14 дней бесплатно, карта не нужна"
      />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field data-invalid={invalid("name")}>
            <FieldLabel htmlFor="name">Имя</FieldLabel>
            <Input
              id="name"
              autoComplete="name"
              placeholder="Иван Иванов"
              aria-invalid={invalid("name")}
              {...register("name")}
            />
            <FieldError errors={[errors.name]} />
          </Field>

          <Field data-invalid={invalid("email")}>
            <FieldLabel htmlFor="email">Рабочий email</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.ru"
              aria-invalid={invalid("email")}
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>

          <Field data-invalid={invalid("password")}>
            <FieldLabel htmlFor="password">Пароль</FieldLabel>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              aria-invalid={invalid("password")}
              {...register("password")}
            />
            {errors.password ? (
              <FieldError errors={[errors.password]} />
            ) : (
              <FieldDescription>Минимум 8 символов.</FieldDescription>
            )}
          </Field>

          <Field data-invalid={invalid("confirm")}>
            <FieldLabel htmlFor="confirm">Повторите пароль</FieldLabel>
            <PasswordInput
              id="confirm"
              autoComplete="new-password"
              aria-invalid={invalid("confirm")}
              {...register("confirm")}
            />
            <FieldError errors={[errors.confirm]} />
          </Field>

          <Controller
            control={control}
            name="terms"
            render={({ field: { value, onChange, ...field } }) => (
              <Field orientation="horizontal" data-invalid={invalid("terms")}>
                <Checkbox
                  id="terms"
                  checked={value}
                  onCheckedChange={onChange}
                  aria-invalid={invalid("terms")}
                  {...field}
                />
                <FieldLabel htmlFor="terms" className="font-normal">
                  Принимаю условия использования и политику конфиденциальности
                </FieldLabel>
              </Field>
            )}
          />
          {errors.terms && (
            <FieldError className="-mt-3" errors={[errors.terms]} />
          )}

          <Field>
            <Button type="submit">Зарегистрироваться</Button>
            {isSubmitSuccessful && (
              <FieldDescription className="text-center">
                Форма валидна — бэкенд ещё не подключён.
              </FieldDescription>
            )}
          </Field>

          <FieldSeparator>или</FieldSeparator>

          <OAuthButtons intent="register" />
          <FieldDescription className="text-center">
            Уже есть аккаунт? <Link href="/login">Войти</Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </>
  );
}

export { RegisterForm };
