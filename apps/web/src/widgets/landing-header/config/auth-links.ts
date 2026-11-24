import { ROUTES } from "@/shared/config";

export const authLinks = [
  {
    href: ROUTES.LOGIN,
    label: "Войти",
  },
  {
    href: ROUTES.REGISTER,
    label: "Создать пространство",
  },
] as const;
