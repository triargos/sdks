import {http, HttpResponse} from "msw";
import {getDashboardInstance, STAGING_URL} from "../../client.mocks";
import {setupServer} from "msw/node";
import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {mockMembers} from "./members.data";


const handlers = [
    http.get(`${STAGING_URL}/organizations/org_id/members`, ({request}) => {
        return HttpResponse.json(mockMembers, {status: 200})
    }),
    http.get(`${STAGING_URL}/organizations/org_id/members/1`, ({request}) => {
        return HttpResponse.json(mockMembers[0], {status: 200})
    })
]

export const memberServer = setupServer(...handlers);

describe("organization", () => {
    beforeAll(() => memberServer.listen())
    afterAll(() => memberServer.close())
    const dashboard = getDashboardInstance();
    it('should fetch a single member', async () => {
        const member = await dashboard.organizations.members.findById("org_id", 1)
        expect(member).toEqual(mockMembers[0])
    });
    it('should fetch all members', async () => {
        const members = await dashboard.organizations.members.findAll("org_id")
        expect(members).toEqual(mockMembers)
    });
})