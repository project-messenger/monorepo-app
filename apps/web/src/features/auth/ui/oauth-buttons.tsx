"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/shared/ui/button";
import { Field, FieldError } from "@/shared/ui/field";
import { OAUTH_PROVIDERS } from "../config/providers";
import { buildOAuthUrl, oauthErrorMessage } from "../lib/oauth";
import { providerIcons } from "./provider-icons";

type Intent = "login" | "register";

const labels: Record<Intent, (provider: string) => string> = {
  login: (provider) => `Войти через ${provider}`,
  register: (provider) => `Продолжить с ${provider}`,
};

function OAuthButtonList({
  intent,
  returnTo,
  error,
}: {
  intent: Intent;
  returnTo?: string | null;
  error?: string | null;
}) {
  return (
    <Field>
      {error && <FieldError className="text-center">{error}</FieldError>}
      {OAUTH_PROVIDERS.map((provider) => {
        const Icon = providerIcons[provider.id];
        return (
          // Полный переход, а не next/link: OAuth уходит на бэкенд и к провайдеру.
          <Button
            key={provider.id}
            variant="outline"
            nativeButton={false}
            render={<a href={buildOAuthUrl(provider.id, returnTo)} />}
          >
            <Icon data-icon="inline-start" />
            {labels[intent](provider.name)}
          </Button>
        );
      })}
    </Field>
  );
}

function OAuthButtonsFromUrl({ intent }: { intent: Intent }) {
  const searchParams = useSearchParams();
  return (
    <OAuthButtonList
      intent={intent}
      returnTo={searchParams.get("returnTo")}
      error={oauthErrorMessage(searchParams.get("error"))}
    />
  );
}

/**
 * Кнопки входа через OAuth-провайдеров. returnTo и код ошибки берутся из URL
 * (/login?returnTo=/chats, /login?error=access_denied). useSearchParams
 * требует Suspense, иначе страница не пререндерится, поэтому до гидрации
 * показываем те же кнопки с возвратом на главную.
 */
export function OAuthButtons({ intent }: { intent: Intent }) {
  return (
    <Suspense fallback={<OAuthButtonList intent={intent} />}>
      <OAuthButtonsFromUrl intent={intent} />
    </Suspense>
  );
}
