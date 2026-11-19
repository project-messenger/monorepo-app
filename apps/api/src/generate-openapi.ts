import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { createOpenApiDocument, setupApp } from './app.setup.js';

/**
 * Writes the OpenAPI document to apps/api/openapi.json without starting the server.
 * Run with `pnpm --filter api openapi`; the frontend generates its API client from the file.
 *
 * The app is created but neither initialised nor listening: no port is opened and
 * onModuleInit hooks (e.g. database connections) don't run. Swagger only needs the
 * controllers' metadata and the settings from setupApp (the /api prefix).
 */
async function generateOpenApi() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  setupApp(app);
  const document = createOpenApiDocument(app);
  await app.close();

  // dist/generate-openapi.js → apps/api/openapi.json
  const file = join(import.meta.dirname, '..', 'openapi.json');
  await writeFile(file, `${JSON.stringify(document, null, 2)}\n`);
  console.log(`OpenAPI document written to ${file}`);
}
await generateOpenApi();
