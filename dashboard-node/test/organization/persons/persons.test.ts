import { http, HttpResponse } from 'msw';
import { getDashboardInstance, STAGING_URL } from '../../client.mocks';
import { setupServer } from 'msw/node';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { mockPersons, mockRelationships } from './persons.data';

const handlers = [
  http.get(`${STAGING_URL}/organizations/org_id/persons`, () => {
    return HttpResponse.json(mockPersons, { status: 200 });
  }),
  http.get(`${STAGING_URL}/organizations/org_id/persons/1`, () => {
    return HttpResponse.json(mockPersons[0], { status: 200 });
  }),
  http.get(
    `${STAGING_URL}/organizations/org_id/persons/1/relationships`,
    () => {
      return HttpResponse.json(mockRelationships, { status: 200 });
    },
  ),
];

const personServer = setupServer(...handlers);

describe('persons', () => {
  beforeAll(() => personServer.listen());
  afterAll(() => personServer.close());
  const dashboard = getDashboardInstance();
  it('should fetch a single person', async () => {
    const member = await dashboard.persons.getPerson({
      personId: '1',
      organizationId: 'org_id',
    });
    expect(member).toEqual(mockPersons[0]);
  });
  it('should fetch all persons', async () => {
    const members = await dashboard.persons.getPersons({
      organizationId: 'org_id',
    });
    expect(members).toEqual(mockPersons);
  });
  it('should fetch all relationships', async () => {
    const relationships = await dashboard.persons.getRelationships({
      organizationId: 'org_id',
      personId: '1',
    });
    expect(relationships).toEqual(mockRelationships);
  });
});
