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
    await request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect('Hello World!');
    await request(app.getHttpServer()).get('/').expect(404);
  });

  describe('CORS', () => {
    it('allows the frontend origin', async () => {
      const response = await request(app.getHttpServer())
        .get('/api')
        .set('Origin', 'http://localhost:3000');

      expect(response.headers['access-control-allow-origin']).toBe(
        'http://localhost:3000',
      );
    });

    it('does not allow other origins', async () => {
      const response = await request(app.getHttpServer())
        .get('/api')
        .set('Origin', 'https://evil.example');

      expect(response.headers['access-control-allow-origin']).toBeUndefined();
    });

    it('answers the preflight request', async () => {
      const response = await request(app.getHttpServer())
        .options('/api')
        .set('Origin', 'http://localhost:3000')
        .set('Access-Control-Request-Method', 'POST')
        .expect(204);

      expect(response.headers['access-control-allow-origin']).toBe(
        'http://localhost:3000',
      );
    });
  });
});
