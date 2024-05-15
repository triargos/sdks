import { http, HttpResponse } from 'msw';
import { getDashboardInstance, STAGING_URL } from '../../client.mocks';
import { setupServer } from 'msw/node';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { mockGroups } from './groups.data';

const handlers = [
  http.get(`${STAGING_URL}/organizations/org_id/groups`, () => {
    return HttpResponse.json(mockGroups, { status: 200 });
  }),
  http.get(`${STAGING_URL}/organizations/org_id/groups/1`, () => {
    return HttpResponse.json(mockGroups[0], { status: 200 });
  }),
];

export const groupServer = setupServer(...handlers);

describe('organization', () => {
  beforeAll(() => groupServer.listen());
  afterAll(() => groupServer.close());
  const dashboard = getDashboardInstance();
  it('should fetch a single group', async () => {
    const member = await dashboard.groups.getGroup({
      organizationId: 'org_id',
      groupId: 1,
    });
    expect(member).toEqual(mockGroups[0]);
  });
  it('should fetch all members', async () => {
    const members = await dashboard.groups.getGroups({
      organizationId: 'org_id',
    });
    expect(members).toEqual(mockGroups);
  });
});
