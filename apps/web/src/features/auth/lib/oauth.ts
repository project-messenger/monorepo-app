import { API_URL } from "@/shared/config";

import type { OAuthProviderId } from "../config/providers";

/*
 * Контракт с бэкендом (apps/api), OAuth целиком на его стороне:
 *
 *   GET  {API}/auth/{provider}?returnTo=/path
 *        → 302 на страницу согласия провайдера.
 *   GET  {API}/auth/{provider}/callback
 *        → успех: ставит httpOnly-cookie сессии, 302 на {WEB}{returnTo};
 *        → ошибка: 302 на {WEB}/login?error={код} (коды — в OAUTH_ERRORS).
 *   GET  {API}/auth/me      → 200 User (@app/shared) | 401.
 *   POST {API}/auth/logout  → 2xx, сбрасывает cookie.
 *
 * returnTo бэкенд обязан проверять сам (только относительные пути своего
 * фронтенда) — иначе это open redirect.
 */

const DEFAULT_RETURN_TO = "/";

// Origin-заглушка: на нём разбираем путь так же, как это сделает браузер.
const PARSE_BASE = "http://return-to.invalid";

/**
 * Пропускает только путь внутри приложения, иначе — главная.
 *
 * Строку не проверяем вручную, а разбираем через URL: браузер выкидывает
 * табы и переводы строк и считает "\" за "/", поэтому "/<TAB>/evil.com"
 * и "/\evil.com" на деле ведут на чужой домен. Возвращаем нормализованный путь.
 */
export function safeReturnTo(value: string | null | undefined): string {
  if (!value || !value.startsWith("/")) return DEFAULT_RETURN_TO;

  let url: URL;
  try {
    url = new URL(value, PARSE_BASE);
  } catch {
    return DEFAULT_RETURN_TO;
  }
  if (url.origin !== PARSE_BASE) return DEFAULT_RETURN_TO;
  // Нормализация может сама собрать "//": "/.//evil.com" → "//evil.com".
  if (url.pathname.startsWith("//")) return DEFAULT_RETURN_TO;

  return url.pathname + url.search + url.hash;
}

export function buildOAuthUrl(
  provider: OAuthProviderId,
  returnTo?: string | null,
): string {
  const url = new URL(`${API_URL}/auth/${provider}`);
  url.searchParams.set("returnTo", safeReturnTo(returnTo));
  return url.toString();
}

export const OAUTH_ERRORS: Record<string, string> = {
  access_denied: "Вход отменён: доступ не был предоставлен.",
  oauth_failed: "Не удалось войти через провайдера. Попробуйте ещё раз.",
  account_exists:
    "Аккаунт с этим email уже есть. Войдите тем способом, которым регистрировались.",
};

export function oauthErrorMessage(code: string | null): string | null {
  if (!code) return null;
  // Только собственные ключи: иначе ?error=__proto__ вернёт Object.prototype,
  // и React упадёт, пытаясь отрендерить объект.
  return Object.hasOwn(OAUTH_ERRORS, code)
    ? OAUTH_ERRORS[code]
    : OAUTH_ERRORS.oauth_failed;
}
