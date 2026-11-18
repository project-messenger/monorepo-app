import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { envSchema } from './config/env.schema.js';

@Module({
  imports: [
    // Reads apps/api/.env (values from the shell environment win) and
    // validates everything against envSchema before the app starts.
    ConfigModule.forRoot({ isGlobal: true, validationSchema: envSchema }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
