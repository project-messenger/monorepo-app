import { Controller, Get } from '@nestjs/common';
import { HealthService, type HealthStatus } from './health.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  // GET /api/health — the /api prefix comes from setupApp.
  @Get()
  check(): HealthStatus {
    return this.healthService.check();
  }
}
