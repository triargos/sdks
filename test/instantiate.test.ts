import {describe, expect, it} from "vitest";
import {Dashboard} from "../src";

describe("instantiateClient", () => {
    it('should instantiate a client for the staging environment', () => {
        const dashboard = new Dashboard({apiKey: "1234", environment: "staging"});
        expect(dashboard).toBeDefined();
        expect(dashboard.environment).toBe("staging");
    });
    it('should instantiate a client for the production environment', () => {
        const dashboard = new Dashboard({apiKey: "1234"})
        expect(dashboard).toBeDefined();
        expect(dashboard.environment).toBe("production");
    });
    it('should instantiate a client for the development environment', () => {
        const dashboard = new Dashboard({apiKey: "1234", environment: "development"})
        expect(dashboard).toBeDefined();
        expect(dashboard.environment).toBe("development");
    });

    it('should define an organizations object with its children', () => {
        const dashboard = new Dashboard({apiKey: "1234"})
        expect(dashboard.organizations).toBeDefined();
        expect(dashboard.organizations.groups).toBeDefined();
        expect(dashboard.organizations.members).toBeDefined();
    });
})