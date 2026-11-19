import { HealthService } from './health.service.js';

describe('HealthService', () => {
  it('reports that the app is up', () => {
    expect(new HealthService().check()).toEqual({ status: 'ok' });
  });
});
