"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchSession } from "./session";

export const sessionQueryKey = ["session"] as const;

/** data: пользователь, null — не авторизован, undefined — ещё загружается. */
export function useSession() {
  return useQuery({
    queryKey: sessionQueryKey,
    queryFn: fetchSession,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
