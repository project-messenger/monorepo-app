"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout, sessionQueryKey } from "@/shared/api";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Данные прошлого пользователя (чаты, задачи…) не должны пережить выход:
      // иначе следующий вошедший на этом устройстве увидит их из кэша.
      // Сессию не удаляем, а обнуляем — подписанные на неё компоненты сразу
      // получат null и покажут гостевой интерфейс.
      queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] !== sessionQueryKey[0],
      });
      queryClient.setQueryData(sessionQueryKey, null);
    },
  });
}
