import { type User, UserSchema } from "@app/shared";

import { API_URL } from "@/shared/config";

// Сессию ведёт бэкенд: httpOnly-cookie, которую он ставит после OAuth callback.
// Поэтому все запросы идут с credentials: "include".

/** Текущий пользователь или null, если сессии нет (401). */
export async function fetchSession(): Promise<User | null> {
  const response = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (response.status === 401) return null;
  if (!response.ok) {
    throw new Error(`GET /auth/me: ${response.status}`);
  }

  return UserSchema.parse(await response.json());
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`POST /auth/logout: ${response.status}`);
  }
}
