import { Injectable } from '@nestjs/common';
import type { HealthStatus } from './health.schema.js';

@Injectable()
export class HealthService {
  // Only says the process is up and answers HTTP. Database and Redis checks will be
  // added here when they are connected.
  check(): HealthStatus {
    return { status: 'ok' };
  }
}
