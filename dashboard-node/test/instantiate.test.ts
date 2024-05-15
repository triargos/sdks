import {describe, expect, it} from 'vitest';
import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';
import {
    DEVELOPMENT_URL,
    getDashboardInstance,
    PRODUCTION_URL,
    requireAuthentication,
    STAGING_URL,
} from './client.mocks';
import {Dashboard} from "../src";
import {ApiError} from "../src/client";

const mockOrganizations = [
    {
        id: 'org_id',
        name: 'Test Organization',
        active: true,
    },
];

const handlers = (url: string) => [
    http.get(`${url}/organizations`, ({request}) => {
        requireAuthentication(request)
        return HttpResponse.json(mockOrganizations, {status: 200});
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
    it("should throw an error if the API key is invalid", async () => {
        const client = new Dashboard({apiKey: "12345", environment: "staging"});
        const server = setupServer(...handlers(STAGING_URL));
        server.listen();
        try {
            await client.organizations.getOrganizations();
        } catch (e: unknown) {
            if (e instanceof ApiError) {
               expect(e.status).toBe(401);
               expect(e.statusText).toBe("Unauthorized");
            } else {
                console.log(e);
            }

        }
    });

});
