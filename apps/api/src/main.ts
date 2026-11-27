import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { getDrizzleToken } from '@nestjs/drizzle';
import { AppModule } from './app.module.js';
import { setupApp } from './app.setup.js';
import type { Env } from './config/env.schema.js';
import { checkDatabaseConnection } from './database/check-connection.js';
import type { Database } from './database/database.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApp(app);
  // `true` tells ConfigService the values were validated, so `get` never returns undefined.
  const config = app.get<ConfigService<Env, true>>(ConfigService);
  await checkDatabaseConnection(
    app.get<Database>(getDrizzleToken()),
    `${config.get('POSTGRES_HOST', { infer: true })}:${config.get('POSTGRES_PORT', { infer: true })}`,
  );
  await app.listen(config.get('PORT', { infer: true }));
}
await bootstrap();
