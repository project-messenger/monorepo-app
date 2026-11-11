import * as Sentry from "@sentry/nextjs";

// Работает и с Sentry, и с GlitchTip (у GlitchTip совместимый API): нужен только DSN.
// Без NEXT_PUBLIC_SENTRY_DSN SDK отключён.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  environment: process.env.NODE_ENV,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
