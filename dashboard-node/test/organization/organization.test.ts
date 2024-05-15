import { http, HttpResponse } from 'msw';
import { getDashboardInstance, STAGING_URL } from '../client.mocks';
import { setupServer } from 'msw/node';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const mockOrganizations = [
  {
    id: 'org_id',
    name: 'Test Organization',
    active: true,
  },
  {
    id: 'org_id_2',
    name: 'Test Organization 2',
    active: false,
  },
];

const handlers = [
  http.get(`${STAGING_URL}/organizations`, () => {
    return HttpResponse.json(mockOrganizations, { status: 200 });
  }),
  http.get(`${STAGING_URL}/organizations/org_id`, () => {
    return HttpResponse.json(mockOrganizations[0], { status: 200 });
  }),
];

export const organizationServer = setupServer(...handlers);

describe('organization', () => {
  beforeAll(() => organizationServer.listen());
  afterAll(() => organizationServer.close());
  const dashboard = getDashboardInstance();
  it('should fetch an organization', async () => {
    const organization = await dashboard.organizations.getOrganization({
      organizationId: 'org_id',
    });
    expect(organization).toEqual(mockOrganizations[0]);
  });
  it('should fetch all organizations', async () => {
    const res = await dashboard.organizations.getOrganizations();
    expect(res).toEqual(mockOrganizations);
  });
});
