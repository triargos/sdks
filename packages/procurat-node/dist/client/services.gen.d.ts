import type { CancelablePromise } from './core/CancelablePromise';
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { GetContactPersonMappingsData, GetContactPersonMappingsResponse, CreateContactPersonMappingData, CreateContactPersonMappingResponse, DeleteContactPersonMappingData, DeleteContactPersonMappingResponse, GetContactInformationMappingsData, GetContactInformationMappingsResponse, CreateContactInformationMappingData, CreateContactInformationMappingResponse, DeleteContactInformationMappingData, DeleteContactInformationMappingResponse, FindPersonData, FindPersonResponse, UpdatePersonData, UpdatePersonResponse, FindAllPersonsResponse, CreatePersonData, CreatePersonResponse, FindGroupByIdData, FindGroupByIdResponse, FindGroupMembersByIdData, FindGroupMembersByIdResponse, FindAllGroupsResponse, FindByIdData, FindByIdResponse, UpdateContactInformationData, UpdateContactInformationResponse, DeleteContactInformationData, DeleteContactInformationResponse, FindByPersonData, FindByPersonResponse, CreateContactInformationData, CreateContactInformationResponse, FindByAddressData, FindByAddressResponse, FindAllAddressesResponse, CreateAddressData, CreateAddressResponse, FindAddressByIdData, FindAddressByIdResponse, GetHealthResponse, FindRelationshipsForPersonData, FindRelationshipsForPersonResponse, FindAllCountriesResponse, FindCountryByIdxData, FindCountryByIdxResponse, FindAllReligionsResponse, FindAllDistrictsResponse, FindDistrictByIdData, FindDistrictByIdResponse } from './types.gen';
export declare class CommunicationService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get contact person mappings for a child
     * Get contact person mappings for a child
     * @param data The data for the request.
     * @param data.childId
     * @returns ContactPersonMappingDTO default response
     * @throws ApiError
     */
    getContactPersonMappings(data: GetContactPersonMappingsData): CancelablePromise<GetContactPersonMappingsResponse>;
    /**
     * Create contact person mapping for a child
     * Create contact person mapping for a child
     * @param data The data for the request.
     * @param data.childId
     * @param data.requestBody
     * @returns ContactPersonMappingDTO default response
     * @throws ApiError
     */
    createContactPersonMapping(data: CreateContactPersonMappingData): CancelablePromise<CreateContactPersonMappingResponse>;
    /**
     * Delete contact person mapping for a child
     * Delete contact person mapping for a child
     * @param data The data for the request.
     * @param data.childId
     * @param data.contactPersonMappingId
     * @returns unknown default response
     * @throws ApiError
     */
    deleteContactPersonMapping(data: DeleteContactPersonMappingData): CancelablePromise<DeleteContactPersonMappingResponse>;
    /**
     * Get contact information mappings for a child
     * Get contact information mappings for a child
     * @param data The data for the request.
     * @param data.childId
     * @returns ContactInformationMappingDTO default response
     * @throws ApiError
     */
    getContactInformationMappings(data: GetContactInformationMappingsData): CancelablePromise<GetContactInformationMappingsResponse>;
    /**
     * Create contact information mapping for a child
     * Create contact information mapping for a child
     * @param data The data for the request.
     * @param data.childId
     * @param data.requestBody
     * @returns ContactInformationMappingDTO default response
     * @throws ApiError
     */
    createContactInformationMapping(data: CreateContactInformationMappingData): CancelablePromise<CreateContactInformationMappingResponse>;
    /**
     * Delete contact information mapping for a child
     * Delete contact information mapping for a child
     * @param data The data for the request.
     * @param data.childId
     * @param data.contactInformationMappingId
     * @returns unknown default response
     * @throws ApiError
     */
    deleteContactInformationMapping(data: DeleteContactInformationMappingData): CancelablePromise<DeleteContactInformationMappingResponse>;
}
export declare class PersonService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Find by id
     * Find a person by id.
     * @param data The data for the request.
     * @param data.id
     * @returns PersonDTO default response
     * @throws ApiError
     */
    findPerson(data: FindPersonData): CancelablePromise<FindPersonResponse>;
    /**
     * Update
     * Update a person.
     * @param data The data for the request.
     * @param data.id
     * @param data.requestBody
     * @returns SuccessResponse default response
     * @throws ApiError
     */
    updatePerson(data: UpdatePersonData): CancelablePromise<UpdatePersonResponse>;
    /**
     * Find all
     * Find all persons.
     * @returns PersonDTO default response
     * @throws ApiError
     */
    findAllPersons(): CancelablePromise<FindAllPersonsResponse>;
    /**
     * Create
     * Create a person.
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SuccessResponse default response
     * @throws ApiError
     */
    createPerson(data?: CreatePersonData): CancelablePromise<CreatePersonResponse>;
}
export declare class GroupsService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Find group by id
     * Find group by id
     * @param data The data for the request.
     * @param data.id
     * @returns GroupDTO default response
     * @throws ApiError
     */
    findGroupById(data: FindGroupByIdData): CancelablePromise<FindGroupByIdResponse>;
    /**
     * Find group members by id
     * Find group members by id
     * @param data The data for the request.
     * @param data.id
     * @returns GroupMemberDTO default response
     * @throws ApiError
     */
    findGroupMembersById(data: FindGroupMembersByIdData): CancelablePromise<FindGroupMembersByIdResponse>;
    /**
     * Find all groups
     * Find all groups
     * @returns GroupDTO default response
     * @throws ApiError
     */
    findAllGroups(): CancelablePromise<FindAllGroupsResponse>;
}
export declare class ContactInformationService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Find by ID
     * Find contact information by id
     * @param data The data for the request.
     * @param data.contactInformationId
     * @returns ContactInformationDTO default response
     * @throws ApiError
     */
    findById(data: FindByIdData): CancelablePromise<FindByIdResponse>;
    /**
     * Update
     * Update contact information
     * @param data The data for the request.
     * @param data.contactInformationId
     * @param data.requestBody
     * @returns ContactInformationDTO default response
     * @throws ApiError
     */
    updateContactInformation(data: UpdateContactInformationData): CancelablePromise<UpdateContactInformationResponse>;
    /**
     * Delete
     * Delete contact information
     * @param data The data for the request.
     * @param data.contactInformationId
     * @returns ResponseEntityObject default response
     * @throws ApiError
     */
    deleteContactInformation(data: DeleteContactInformationData): CancelablePromise<DeleteContactInformationResponse>;
    /**
     * Find by Person
     * Find contact information by person
     * @param data The data for the request.
     * @param data.personId
     * @returns ContactInformationDTO default response
     * @throws ApiError
     */
    findByPerson(data: FindByPersonData): CancelablePromise<FindByPersonResponse>;
    /**
     * Create
     * Create contact information
     * @param data The data for the request.
     * @param data.requestBody
     * @returns ResponseEntityObject default response
     * @throws ApiError
     */
    createContactInformation(data?: CreateContactInformationData): CancelablePromise<CreateContactInformationResponse>;
    /**
     * Find by Address
     * Find contact information by address
     * @param data The data for the request.
     * @param data.addressId
     * @returns ContactInformationDTO default response
     * @throws ApiError
     */
    findByAddress(data: FindByAddressData): CancelablePromise<FindByAddressResponse>;
}
export declare class AddressService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get all addresses
     * Get all addresses
     * @returns AddressDTO default response
     * @throws ApiError
     */
    findAllAddresses(): CancelablePromise<FindAllAddressesResponse>;
    /**
     * Create address
     * Create address
     * @param data The data for the request.
     * @param data.requestBody
     * @returns AddressDTO default response
     * @throws ApiError
     */
    createAddress(data?: CreateAddressData): CancelablePromise<CreateAddressResponse>;
    /**
     * Get address by id
     * Get address by id
     * @param data The data for the request.
     * @param data.id
     * @returns AddressDTO default response
     * @throws ApiError
     */
    findAddressById(data: FindAddressByIdData): CancelablePromise<FindAddressByIdResponse>;
}
export declare class HealthService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * @returns HealthDTO default response
     * @throws ApiError
     */
    getHealth(): CancelablePromise<GetHealthResponse>;
}
export declare class RelationshipsService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get relationships for person
     * Get relationships for person
     * @param data The data for the request.
     * @param data.personId
     * @returns RelationshipDTO default response
     * @throws ApiError
     */
    findRelationshipsForPerson(data: FindRelationshipsForPersonData): CancelablePromise<FindRelationshipsForPersonResponse>;
}
export declare class CountriesService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Find all
     * Find all available countries
     * @returns CountryDTO default response
     * @throws ApiError
     */
    findAllCountries(): CancelablePromise<FindAllCountriesResponse>;
    /**
     * Find by ID
     * Find a country by its ID
     * @param data The data for the request.
     * @param data.id
     * @returns CountryDTO default response
     * @throws ApiError
     */
    findCountryByIdx(data: FindCountryByIdxData): CancelablePromise<FindCountryByIdxResponse>;
}
export declare class ReligionsService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Find all
     * Find all available religions
     * @returns ReligionDTO default response
     * @throws ApiError
     */
    findAllReligions(): CancelablePromise<FindAllReligionsResponse>;
}
export declare class DistrictsService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get all districts
     * Get all districts
     * @returns CountyDTO default response
     * @throws ApiError
     */
    findAllDistricts(): CancelablePromise<FindAllDistrictsResponse>;
    /**
     * Get a district by ID
     * Find a specific district by ID
     * @param data The data for the request.
     * @param data.id
     * @returns CountyDTO default response
     * @throws ApiError
     */
    findDistrictById(data: FindDistrictByIdData): CancelablePromise<FindDistrictByIdResponse>;
}
