import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'node:path';
import { envSchema } from './config/env.schema.js';
import { DatabaseModule } from './database/database.module.js';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    // Reads the root .env (values from the shell environment win) and
    // validates everything against envSchema before the app starts.
    ConfigModule.forRoot({
      isGlobal: true,
      // src/ and dist/ have the same depth, so this path works in both.
      envFilePath: resolve(import.meta.dirname, '../../../.env'),
      validationSchema: envSchema,
    }),
    DatabaseModule,
    HealthModule,
  ],
})
export class AppModule {}
