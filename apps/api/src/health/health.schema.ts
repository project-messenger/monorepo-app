import { z } from 'zod';

// Response of GET /api/health. Swagger builds the OpenAPI schema from it, and the
// TypeScript type below comes from it too, so the two can't drift apart.
export const HealthStatusSchema = z
  .object({ status: z.literal('ok') })
  .meta({ id: 'HealthStatus' });

export type HealthStatus = z.infer<typeof HealthStatusSchema>;
