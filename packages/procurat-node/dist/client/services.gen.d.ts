import type { CancelablePromise } from "./core/CancelablePromise";
import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { $OpenApiTs } from "./types.gen";
export declare class AddressService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get address by id
     * Get address by id
     * @param data The data for the request.
     * @param data.id
     * @returns AddressDTO default response
     * @throws ApiError
     */
    findAddressById(data: $OpenApiTs["/addresses/{id}"]["get"]["req"]): CancelablePromise<$OpenApiTs["/addresses/{id}"]["get"]["res"][200]>;
    /**
     * Get all addresses
     * Get all addresses
     * @returns AddressDTO default response
     * @throws ApiError
     */
    findAllAddresses(): CancelablePromise<$OpenApiTs["/addresses"]["get"]["res"][200]>;
    /**
     * Create address
     * Create address
     * @param data The data for the request.
     * @param data.requestBody
     * @returns AddressDTO default response
     * @throws ApiError
     */
    createAddress(data?: $OpenApiTs["/addresses"]["post"]["req"]): CancelablePromise<$OpenApiTs["/addresses"]["post"]["res"][200]>;
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
    findPerson(data: $OpenApiTs["/persons/{id}"]["get"]["req"]): CancelablePromise<$OpenApiTs["/persons/{id}"]["get"]["res"][200]>;
    /**
     * Update
     * Update a person.
     * @param data The data for the request.
     * @param data.id
     * @param data.requestBody
     * @returns SuccessResponse default response
     * @throws ApiError
     */
    updatePerson(data: $OpenApiTs["/persons/{id}"]["put"]["req"]): CancelablePromise<$OpenApiTs["/persons/{id}"]["put"]["res"][200]>;
    /**
     * Find all
     * Find all persons.
     * @returns PersonDTO default response
     * @throws ApiError
     */
    findAllPersons(): CancelablePromise<$OpenApiTs["/persons"]["get"]["res"][200]>;
    /**
     * Create
     * Create a person.
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SuccessResponse default response
     * @throws ApiError
     */
    createPerson(data?: $OpenApiTs["/persons"]["post"]["req"]): CancelablePromise<$OpenApiTs["/persons"]["post"]["res"][200]>;
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
    findAllReligions(): CancelablePromise<$OpenApiTs["/religions"]["get"]["res"][200]>;
}
export declare class DistrictsService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get all districts
     * Get all districts
     * @returns DistrictDTO default response
     * @throws ApiError
     */
    findAllDistricts(): CancelablePromise<$OpenApiTs["/districts"]["get"]["res"][200]>;
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
    findGroupById(data: $OpenApiTs["/groups/{id}"]["get"]["req"]): CancelablePromise<$OpenApiTs["/groups/{id}"]["get"]["res"][200]>;
    /**
     * Find all groups
     * Find all groups
     * @returns GroupDTO default response
     * @throws ApiError
     */
    findAllGroups(): CancelablePromise<$OpenApiTs["/groups"]["get"]["res"][200]>;
    /**
     * Find group members by id
     * Find group members by id
     * @param data The data for the request.
     * @param data.id
     * @returns GroupMembershipDTO default response
     * @throws ApiError
     */
    findGroupMembersById(data: $OpenApiTs["/groups/{id}/members"]["get"]["req"]): CancelablePromise<$OpenApiTs["/groups/{id}/members"]["get"]["res"][200]>;
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
    findAllCountries(): CancelablePromise<$OpenApiTs["/countries"]["get"]["res"][200]>;
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
    findRelationshipsForPerson(data: $OpenApiTs["/relationships/person/{personId}"]["get"]["req"]): CancelablePromise<$OpenApiTs["/relationships/person/{personId}"]["get"]["res"][200]>;
}
