import { Injectable } from '@nestjs/common';

export interface HealthStatus {
  status: 'ok';
}

@Injectable()
export class HealthService {
  // Only says the process is up and answers HTTP. Database and Redis checks will be
  // added here when they are connected.
  check(): HealthStatus {
    return { status: 'ok' };
  }
}
