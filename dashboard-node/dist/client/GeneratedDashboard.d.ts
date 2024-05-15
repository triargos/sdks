import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { GroupsService } from './services.gen';
import { OrganizationsService } from './services.gen';
import { PersonsService } from './services.gen';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export declare class GeneratedDashboard {
    readonly groups: GroupsService;
    readonly organizations: OrganizationsService;
    readonly persons: PersonsService;
    readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest?: HttpRequestConstructor);
}
export {};
