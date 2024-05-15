import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { Interceptors } from "./core/OpenAPI";
import { AxiosHttpRequest } from "./core/AxiosHttpRequest";

import {
  AddressService,
  CountriesService,
  DistrictsService,
  GroupsService,
  PersonService,
  RelationshipsService,
  ReligionsService,
} from "./services.gen";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class GeneratedProcurat {
  public readonly address: AddressService;
  public readonly countries: CountriesService;
  public readonly districts: DistrictsService;
  public readonly groups: GroupsService;
  public readonly person: PersonService;
  public readonly relationships: RelationshipsService;
  public readonly religions: ReligionsService;

  public readonly request: BaseHttpRequest;

  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest: HttpRequestConstructor = AxiosHttpRequest,
  ) {
    this.request = new HttpRequest({
      BASE:
        config?.BASE ??
        "http://localhost:8080/procurat_server_war_exploded/spring",
      VERSION: config?.VERSION ?? "0",
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? "include",
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
    this.countries = new CountriesService(this.request);
    this.districts = new DistrictsService(this.request);
    this.groups = new GroupsService(this.request);
    this.person = new PersonService(this.request);
    this.relationships = new RelationshipsService(this.request);
    this.religions = new ReligionsService(this.request);
  }
}
