import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from './config/env.schema.js';

/**
 * App-wide settings that live outside AppModule. Shared by main.ts and e2e tests,
 * so tests run the app exactly as it is started.
 */
export function setupApp(app: INestApplication): void {
  const config = app.get<ConfigService<Env, true>>(ConfigService);

  // Every route starts with /api: GET /api/health, not GET /health.
  app.setGlobalPrefix('api');

  // An array (not a string) makes the server answer only to a matching Origin;
  // other origins get no Access-Control-Allow-Origin header.
  app.enableCors({ origin: [config.get('CORS_ORIGIN', { infer: true })] });

  // Runs onModuleDestroy/onApplicationShutdown on SIGTERM, e.g. when Docker stops
  // the container, so connections can close cleanly.
  app.enableShutdownHooks();
}
