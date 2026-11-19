import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { HealthStatusSchema, type HealthStatus } from './health.schema.js';
import { HealthService } from './health.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  // GET /api/health — the /api prefix comes from setupApp.
  // `standardSchema` takes a Zod schema directly: Swagger converts it to OpenAPI.
  @Get()
  @ApiOkResponse({ standardSchema: HealthStatusSchema })
  check(): HealthStatus {
    return this.healthService.check();
  }
}
