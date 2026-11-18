import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { setupApp } from './../src/app.setup.js';

describe('App (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('serves routes under the /api prefix', async () => {
    await request(app.getHttpServer()).get('/api/health').expect(200);
    await request(app.getHttpServer()).get('/health').expect(404);
  });

  describe('Swagger', () => {
    it('serves the UI under the /api prefix', async () => {
      await request(app.getHttpServer()).get('/api/docs').expect(200);
    });

    it('describes endpoints with schemas built from Zod', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/docs-json')
        .expect(200);

      expect(
        response.body.paths['/api/health'].get.responses['200'].content[
          'application/json'
        ].schema,
      ).toEqual({ $ref: '#/components/schemas/HealthStatus' });
      expect(response.body.components.schemas.HealthStatus).toEqual({
        type: 'object',
        properties: { status: { type: 'string', enum: ['ok'] } },
        required: ['status'],
        additionalProperties: false,
      });
    });
  });

  describe('CORS', () => {
    it('allows the frontend origin', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/health')
        .set('Origin', 'http://localhost:3000');

      expect(response.headers['access-control-allow-origin']).toBe(
        'http://localhost:3000',
      );
    });

    it('does not allow other origins', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/health')
        .set('Origin', 'https://evil.example');

      expect(response.headers['access-control-allow-origin']).toBeUndefined();
    });

    it('answers the preflight request', async () => {
      const response = await request(app.getHttpServer())
        .options('/api/health')
        .set('Origin', 'http://localhost:3000')
        .set('Access-Control-Request-Method', 'POST')
        .expect(204);

      expect(response.headers['access-control-allow-origin']).toBe(
        'http://localhost:3000',
      );
    });
  });
});
