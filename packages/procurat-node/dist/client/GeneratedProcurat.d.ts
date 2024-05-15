import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { AddressService, CountriesService, DistrictsService, GroupsService, PersonService, RelationshipsService, ReligionsService } from "./services.gen";
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export declare class GeneratedProcurat {
    readonly address: AddressService;
    readonly countries: CountriesService;
    readonly districts: DistrictsService;
    readonly groups: GroupsService;
    readonly person: PersonService;
    readonly relationships: RelationshipsService;
    readonly religions: ReligionsService;
    readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest?: HttpRequestConstructor);
}
export {};
