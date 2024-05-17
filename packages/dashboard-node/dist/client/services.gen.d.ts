import type { CancelablePromise } from './core/CancelablePromise';
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { $OpenApiTs } from './types.gen';
export declare class OrganizationsService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get all organizations
     * Get all organizations
     * @returns unknown A list of organizations
     * @throws ApiError
     */
    getOrganizations(): CancelablePromise<$OpenApiTs['/v1/organizations']['get']['res'][200]>;
    /**
     * Get organization by ID
     * Get an organization by ID
     * @param data The data for the request.
     * @param data.organizationId The organization's ID.
     * @returns unknown An organization
     * @throws ApiError
     */
    getOrganization(data: $OpenApiTs['/v1/organizations/{organizationId}']['get']['req']): CancelablePromise<$OpenApiTs['/v1/organizations/{organizationId}']['get']['res'][200]>;
}
export declare class PersonsService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get persons
     * Get all persons of an organization
     * @param data The data for the request.
     * @param data.organizationId The organization's ID.
     * @returns unknown A list of persons
     * @throws ApiError
     */
    getPersons(data: $OpenApiTs['/v1/organizations/{organizationId}/persons']['get']['req']): CancelablePromise<$OpenApiTs['/v1/organizations/{organizationId}/persons']['get']['res'][200]>;
    /**
     * Get a person
     * Get a person within an organization by ID
     * @param data The data for the request.
     * @param data.organizationId The organization's ID.
     * @param data.personId
     * @returns unknown A person with address
     * @throws ApiError
     */
    getPerson(data: $OpenApiTs['/v1/organizations/{organizationId}/persons/{personId}']['get']['req']): CancelablePromise<$OpenApiTs['/v1/organizations/{organizationId}/persons/{personId}']['get']['res'][200]>;
    /**
     * Get relationships
     * Get all relationships for a person within an organization
     * @param data The data for the request.
     * @param data.organizationId The organization's ID.
     * @param data.personId
     * @returns unknown A list of relationships
     * @throws ApiError
     */
    getRelationships(data: $OpenApiTs['/v1/organizations/{organizationId}/persons/{personId}/relationships']['get']['req']): CancelablePromise<$OpenApiTs['/v1/organizations/{organizationId}/persons/{personId}/relationships']['get']['res'][200]>;
}
export declare class GroupsService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get all groups
     * Get all groups within an organization
     * @param data The data for the request.
     * @param data.organizationId The organization's ID.
     * @returns unknown A group
     * @throws ApiError
     */
    getGroups(data: $OpenApiTs['/v1/organizations/{organizationId}/groups']['get']['req']): CancelablePromise<$OpenApiTs['/v1/organizations/{organizationId}/groups']['get']['res'][200]>;
    /**
     * Get group by ID
     * Get a group within an organization by ID
     * @param data The data for the request.
     * @param data.organizationId The organization's ID.
     * @param data.groupId The group's ID.
     * @returns unknown A group
     * @throws ApiError
     */
    getGroup(data: $OpenApiTs['/v1/organizations/{organizationId}/groups/{groupId}']['get']['req']): CancelablePromise<$OpenApiTs['/v1/organizations/{organizationId}/groups/{groupId}']['get']['res'][200]>;
}
