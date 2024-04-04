import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { MissingAuthenticationException } from '../src/exceptions/missing-authentication-exception';
import { Dashboard } from '../src';
import { ResourceForbiddenException } from '../src/exceptions/resource-forbidden-exception';
import { getDashboardInstance } from './client.mocks';
import { ResourceNotFoundException } from '../src/exceptions/resource-not-found-exception';
import { ZodError } from 'zod';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}));

const handlers = [
  http.get(
    'https://staging.dashboard.triargos.de/api/organizations',
    ({ request }) => {
      const key = request.headers.get('X-Api-Key');
      if (!key) {
        return HttpResponse.json(
          { message: 'Authentication missing' },
          { status: 401 },
        );
      }
      if (key === 'forbidden') {
        return HttpResponse.json({ message: 'Forbidden' }, { status: 403 });
      }
      return HttpResponse.json([{ id: 1 }], { status: 200 });
    },
  ),
  http.get(
    'https://staging.dashboard.triargos.de/api/organizations/invalid',
    ({ request }) => {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    },
  ),
  http.get(
    'https://staging.dashboard.triargos.de/api/organizations/invalid_schema',
    ({ request }) => {
      return HttpResponse.json({ id: 'invalid' }, { status: 200 });
    },
  ),
];
const exceptionServer = setupServer(...handlers);

describe('handleExceptions', () => {
  beforeAll(() => exceptionServer.listen());
  afterAll(() => exceptionServer.close());
  it('should throw an authenticationMissingException', async () => {
    const dashboard = new Dashboard({ apiKey: null, environment: 'staging' });
    try {
      await dashboard.organizations.findAll();
    } catch (e) {
      expect(dashboard.get).toHaveBeenCalled;
      expect(e).toBeInstanceOf(MissingAuthenticationException);
    }
  });
  it('should throw an resourceForbiddenException ', async () => {
    const dashboard = new Dashboard({
      apiKey: 'forbidden',
      environment: 'staging',
    });
    try {
      await dashboard.organizations.findAll();
    } catch (e) {
      expect(dashboard.get).toHaveBeenCalled;
      expect(e).toBeInstanceOf(ResourceForbiddenException);
    }
  });
  it('should throw an resourceNotFoundException', async () => {
    const dashboard = getDashboardInstance();
    try {
      await dashboard.organizations.findById('invalid');
    } catch (e) {
      expect(dashboard.get).toHaveBeenCalled;
      expect(e).toBeInstanceOf(ResourceNotFoundException);
    }
  });
  it('should throw an schemaValidationException', async () => {
    const dashboard = getDashboardInstance();
    try {
      await dashboard.organizations.findById('invalid_schema');
    } catch (e) {
      expect(dashboard.get).toHaveBeenCalled;
      expect(e).toBeInstanceOf(ZodError);
    }
  });
});
