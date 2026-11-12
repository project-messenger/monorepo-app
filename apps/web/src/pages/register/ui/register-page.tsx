import type { Metadata } from "next";

import { RegisterForm } from "@/features/auth";

export const metadata: Metadata = { title: "Регистрация" };

export function RegisterPage() {
  return <RegisterForm />;
}
