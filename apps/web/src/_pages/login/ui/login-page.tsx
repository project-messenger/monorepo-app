import type { Metadata } from "next";

import { LoginForm } from "@/features/auth";

export const metadata: Metadata = { title: "Вход" };

export function LoginPage() {
  return <LoginForm />;
}
