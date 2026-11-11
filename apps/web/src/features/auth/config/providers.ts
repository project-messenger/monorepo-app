/**
 * OAuth-провайдеры, которые поддерживает бэкенд. Чтобы добавить провайдера,
 * добавьте его сюда и иконку в ui/provider-icons.tsx; бэкенд должен
 * обслуживать /auth/{id} и /auth/{id}/callback (см. lib/oauth.ts).
 */
export const OAUTH_PROVIDERS = [
  { id: "google", name: "Google" },
  { id: "github", name: "GitHub" },
] as const;

export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number];
export type OAuthProviderId = OAuthProvider["id"];
