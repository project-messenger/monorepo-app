import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config/env.schema.js';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    // Reads apps/api/.env (values from the shell environment win) and
    // validates everything against envSchema before the app starts.
    ConfigModule.forRoot({ isGlobal: true, validationSchema: envSchema }),
    HealthModule,
  ],
})
export class AppModule {}
