import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DrizzleModule } from '@nestjs/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import type { Env } from '../config/env.schema.js';

/**
 * Connects PostgreSQL through Drizzle (ADR-0012). Import it once, in AppModule:
 * the database is global, services get it with `@InjectDrizzle()` and the
 * `Database` type.
 *
 * The `pg` pool connects lazily, on the first query, so the app (and e2e tests
 * that don't query) starts without a running database. `@nestjs/drizzle` closes
 * the pool on shutdown and logs connection errors.
 */
@Module({
  imports: [
    DrizzleModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => ({
        drizzle,
        connection: {
          host: config.get('POSTGRES_HOST', { infer: true }),
          port: config.get('POSTGRES_PORT', { infer: true }),
          database: config.get('POSTGRES_DB', { infer: true }),
          user: config.get('POSTGRES_USER', { infer: true }),
          password: config.get('POSTGRES_PASSWORD', { infer: true }),
          // pg waits forever by default; without a limit a silent server hangs the startup check.
          connectionTimeoutMillis: 5000,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
