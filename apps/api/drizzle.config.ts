import { defineConfig } from 'drizzle-kit';
import { resolve } from 'node:path';
import { envSchema } from './src/config/env.schema.js';

// drizzle-kit runs outside Nest, so it reads the root .env itself, with the same
// precedence as ConfigModule: variables from the shell win over the file
// (loadEnvFile doesn't override them), defaults come from envSchema.
try {
  process.loadEnvFile(resolve(import.meta.dirname, '../../.env'));
} catch (err) {
  // No .env is fine: the API starts with the defaults too.
  if (!(err instanceof Error && 'code' in err && err.code === 'ENOENT'))
    throw err;
}
const env = envSchema.parse(process.env);

export default defineConfig({
  dialect: 'postgresql',
  // Re-exports every table (src/<domain>/<domain>.table.ts). One file, not a
  // glob: with no tables yet a glob matches nothing and `generate` fails.
  schema: './src/database/schema.ts',
  // One folder per migration (migration.sql + snapshot.json); commit each one.
  out: './migrations',
  dbCredentials: {
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    database: env.POSTGRES_DB,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    // drizzle-kit tries TLS when credentials are given as fields, and the local
    // Postgres from docker-compose has no TLS. The API's pg pool doesn't use TLS
    // either. Production settings are a separate task.
    ssl: false,
  },
});
