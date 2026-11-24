import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { setupApp } from './../src/app.setup.js';

// KAN-51, PR 1: the contract only. These tests check validation and the
// OpenAPI document; the 501 answers are replaced by real ones in PR 2.
describe('Auth (e2e)', () => {
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

  describe('POST /api/auth/register', () => {
    it('answers 400 with an error for every invalid field', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({ name: 'A', email: 'not-an-email', password: 'short' })
        .expect(400);

      expect(response.body).toMatchObject({
        statusCode: 400,
        message: 'Validation failed',
        error: 'Bad Request',
        errorCode: 'validation_failed',
      });
      expect(
        response.body.errors.map((e: { path: string }) => e.path).sort(),
      ).toEqual(['email', 'name', 'password']);
    });

    it('answers 400 when the body is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .expect(400);

      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    it('accepts a valid body (501 until implemented)', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({ name: 'Ann', email: 'Ann@Example.com', password: 'secret-123' })
        .expect(501);
    });
  });

  describe('POST /api/auth/login', () => {
    it('answers 400 for an invalid email', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'nope', password: 'x' })
        .expect(400);

      expect(response.body.errors).toEqual([
        { path: 'email', code: 'invalid_format', message: expect.any(String) },
      ]);
    });

    it('accepts a valid body (501 until implemented)', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'ann@example.com', password: 'x' })
        .expect(501);
    });
  });

  it('POST /api/auth/logout exists (501 until implemented)', async () => {
    await request(app.getHttpServer()).post('/api/auth/logout').expect(501);
  });

  it('GET /api/auth/me exists (501 until implemented)', async () => {
    await request(app.getHttpServer()).get('/api/auth/me').expect(501);
  });

  it('lets the frontend origin send cookies', async () => {
    const response = await request(app.getHttpServer())
      .options('/api/auth/login')
      .set('Origin', 'http://localhost:3000')
      .set('Access-Control-Request-Method', 'POST')
      .expect(204);

    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });

  describe('OpenAPI', () => {
    it('describes request bodies and responses with named schemas', async () => {
      const { body: doc } = await request(app.getHttpServer())
        .get('/api/docs-json')
        .expect(200);

      const register = doc.paths['/api/auth/register'].post;
      expect(register.requestBody.content['application/json'].schema).toEqual({
        $ref: '#/components/schemas/RegisterRequest',
      });
      expect(
        register.responses['201'].content['application/json'].schema,
      ).toEqual({ $ref: '#/components/schemas/User' });
      expect(
        register.responses['400'].content['application/json'].schema,
      ).toEqual({ $ref: '#/components/schemas/ValidationErrorResponse' });
      expect(
        register.responses['409'].content['application/json'].schema,
      ).toEqual({ $ref: '#/components/schemas/ErrorResponse' });

      for (const path of ['/api/auth/register', '/api/auth/login']) {
        expect(
          doc.paths[path].post.responses['403'].content['application/json']
            .schema,
        ).toEqual({ $ref: '#/components/schemas/ErrorResponse' });
      }
      expect(
        doc.paths['/api/auth/login'].post.responses['200'].content[
          'application/json'
        ].schema,
      ).toEqual({ $ref: '#/components/schemas/User' });
      expect(doc.components.schemas.ErrorCode.enum).toEqual([
        'validation_failed',
        'email_taken',
        'invalid_credentials',
        'missing_credentials',
      ]);
      expect(doc.paths['/api/auth/logout'].post.responses['204']).toBeDefined();
      expect(
        doc.paths['/api/auth/me'].get.responses['401'].content[
          'application/json'
        ].schema,
      ).toEqual({ $ref: '#/components/schemas/ErrorResponse' });
    });
  });
});
