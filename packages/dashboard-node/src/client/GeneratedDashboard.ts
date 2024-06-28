import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { Interceptors } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { GroupsService } from './services.gen';
import { OrganizationsService } from './services.gen';
import { PersonsService } from './services.gen';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class GeneratedDashboard {

	public readonly groups: GroupsService;
	public readonly organizations: OrganizationsService;
	public readonly persons: PersonsService;

	public readonly request: BaseHttpRequest;

	constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
		this.request = new HttpRequest({
			BASE: config?.BASE ?? 'https://dashboard.triargos.de/api',
			VERSION: config?.VERSION ?? '0.0.1',
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

		this.groups = new GroupsService(this.request);
		this.organizations = new OrganizationsService(this.request);
		this.persons = new PersonsService(this.request);
	}
}
