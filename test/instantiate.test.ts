import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
  DEVELOPMENT_URL,
  getDashboardInstance,
  PRODUCTION_URL,
  STAGING_URL,
} from './client.mocks';

const mockOrganizations = [
  {
    id: 'org_id',
    name: 'Test Organization',
    active: true,
  },
];

const handlers = (url: string) => [
  http.get(`${url}/organizations`, () => {
    return HttpResponse.json(mockOrganizations, { status: 200 });
  }),
];

describe('instantiate', () => {
  it('should query the staging environment', async () => {
    const staging = getDashboardInstance('staging');
    const server = setupServer(...handlers(STAGING_URL));
    server.listen();
    const organizations = await staging.organizations.getOrganizations();
    expect(organizations).toEqual(mockOrganizations);
    server.close();
  });
  it('should query the production environment', async () => {
    const production = getDashboardInstance('production');
    const server = setupServer(...handlers(PRODUCTION_URL));
    server.listen();
    const organizations = await production.organizations.getOrganizations();
    expect(organizations).toEqual(mockOrganizations);
    server.close();
  });
  it('should query the development environment', async () => {
    const development = getDashboardInstance('development');
    const server = setupServer(...handlers(DEVELOPMENT_URL));
    server.listen();
    const organizations = await development.organizations.getOrganizations();
    expect(organizations).toEqual(mockOrganizations);
    server.close();
  });
});
