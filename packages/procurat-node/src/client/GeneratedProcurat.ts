import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { Interceptors } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AddressService } from './services.gen';
import { CommunicationService } from './services.gen';
import { ContactInformationService } from './services.gen';
import { CountriesService } from './services.gen';
import { DistrictsService } from './services.gen';
import { FamilyService } from './services.gen';
import { GroupsService } from './services.gen';
import { HealthService } from './services.gen';
import { PersonService } from './services.gen';
import { RelationshipsService } from './services.gen';
import { ReligionsService } from './services.gen';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class GeneratedProcurat {

	public readonly address: AddressService;
	public readonly communication: CommunicationService;
	public readonly contactInformation: ContactInformationService;
	public readonly countries: CountriesService;
	public readonly districts: DistrictsService;
	public readonly family: FamilyService;
	public readonly groups: GroupsService;
	public readonly health: HealthService;
	public readonly person: PersonService;
	public readonly relationships: RelationshipsService;
	public readonly religions: ReligionsService;

	public readonly request: BaseHttpRequest;

	constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
		this.request = new HttpRequest({
			BASE: config?.BASE ?? 'http://localhost:8080/procurat/spring',
			VERSION: config?.VERSION ?? '0',
			WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
			CREDENTIALS: config?.CREDENTIALS ?? 'include',
			TOKEN: config?.TOKEN,
			USERNAME: config?.USERNAME,
			PASSWORD: config?.PASSWORD,
			HEADERS: config?.HEADERS,
			ENCODE_PATH: config?.ENCODE_PATH,
			interceptors: {
				request: config?.interceptors?.request ?? new Interceptors(),
				response: config?.interceptors?.response ?? new Interceptors(),
      },
		});

		this.address = new AddressService(this.request);
		this.communication = new CommunicationService(this.request);
		this.contactInformation = new ContactInformationService(this.request);
		this.countries = new CountriesService(this.request);
		this.districts = new DistrictsService(this.request);
		this.family = new FamilyService(this.request);
		this.groups = new GroupsService(this.request);
		this.health = new HealthService(this.request);
		this.person = new PersonService(this.request);
		this.relationships = new RelationshipsService(this.request);
		this.religions = new ReligionsService(this.request);
	}
}
