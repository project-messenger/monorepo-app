const DEFAULT_API_URL = "http://localhost:3001";

// Пустая строка (`NEXT_PUBLIC_API_URL=` в .env) — тоже «не задано»: иначе запросы
// ушли бы на относительный путь фронтенда.
export function resolveApiUrl(raw: string | undefined): string {
  return (raw?.trim() || DEFAULT_API_URL).replace(/\/+$/, "");
}

// NEXT_PUBLIC_* Next подставляет при сборке, поэтому обращаемся к каждой
// переменной напрямую, а не через process.env[name].
export const API_URL = resolveApiUrl(process.env.NEXT_PUBLIC_API_URL);
