import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AddressService } from './services.gen';
import { CommunicationService } from './services.gen';
import { ContactInformationService } from './services.gen';
import { CountriesService } from './services.gen';
import { DistrictsService } from './services.gen';
import { GroupsService } from './services.gen';
import { HealthService } from './services.gen';
import { PersonService } from './services.gen';
import { RelationshipsService } from './services.gen';
import { ReligionsService } from './services.gen';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export declare class GeneratedProcurat {
    readonly address: AddressService;
    readonly communication: CommunicationService;
    readonly contactInformation: ContactInformationService;
    readonly countries: CountriesService;
    readonly districts: DistrictsService;
    readonly groups: GroupsService;
    readonly health: HealthService;
    readonly person: PersonService;
    readonly relationships: RelationshipsService;
    readonly religions: ReligionsService;
    readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest?: HttpRequestConstructor);
}
export {};
