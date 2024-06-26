"use strict";
// This file is auto-generated by @hey-api/openapi-ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsService = exports.PersonsService = exports.OrganizationsService = void 0;
class OrganizationsService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Get all organizations
     * Get all organizations
     * @returns unknown A list of organizations
     * @throws ApiError
     */
    getOrganizations() {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/organizations',
            errors: {
                400: 'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
                401: 'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.',
                403: "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.",
                404: 'The server cannot find the requested resource.',
                409: 'This response is sent when a request conflicts with the current state of the server.',
                410: 'This response is sent when the requested content has been permanently deleted from server, with no forwarding address.',
                422: 'The request was well-formed but was unable to be followed due to semantic errors.',
                429: 'The user has sent too many requests in a given amount of time ("rate limiting")',
                500: 'The server has encountered a situation it does not know how to handle.'
            }
        });
    }
    /**
     * Get organization by ID
     * Get an organization by ID
     * @param data The data for the request.
     * @param data.organizationId The organization's ID.
     * @returns unknown An organization
     * @throws ApiError
     */
    getOrganization(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/organizations/{organizationId}',
            path: {
                organizationId: data.organizationId
            },
            errors: {
                400: 'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
                401: 'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.',
                403: "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.",
                404: 'The server cannot find the requested resource.',
                409: 'This response is sent when a request conflicts with the current state of the server.',
                410: 'This response is sent when the requested content has been permanently deleted from server, with no forwarding address.',
                422: 'The request was well-formed but was unable to be followed due to semantic errors.',
                429: 'The user has sent too many requests in a given amount of time ("rate limiting")',
                500: 'The server has encountered a situation it does not know how to handle.'
            }
        });
    }
}
exports.OrganizationsService = OrganizationsService;
class PersonsService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Get persons
     * Get all persons of an organization
     * @param data The data for the request.
     * @param data.organizationId The organization's ID.
     * @returns unknown A list of persons
     * @throws ApiError
     */
    getPersons(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/organizations/{organizationId}/persons',
            path: {
                organizationId: data.organizationId
            },
            errors: {
                400: 'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
                401: 'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.',
                403: "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.",
                404: 'The server cannot find the requested resource.',
                409: 'This response is sent when a request conflicts with the current state of the server.',
                410: 'This response is sent when the requested content has been permanently deleted from server, with no forwarding address.',
                422: 'The request was well-formed but was unable to be followed due to semantic errors.',
                429: 'The user has sent too many requests in a given amount of time ("rate limiting")',
                500: 'The server has encountered a situation it does not know how to handle.'
            }
        });
    }
    /**
     * Get a person
     * Get a person within an organization by ID
     * @param data The data for the request.
     * @param data.organizationId The organization's ID.
     * @param data.personId
     * @returns unknown A person with address
     * @throws ApiError
     */
    getPerson(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/organizations/{organizationId}/persons/{personId}',
            path: {
                organizationId: data.organizationId,
                personId: data.personId
            },
            errors: {
                400: 'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
                401: 'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.',
                403: "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.",
                404: 'The server cannot find the requested resource.',
                409: 'This response is sent when a request conflicts with the current state of the server.',
                410: 'This response is sent when the requested content has been permanently deleted from server, with no forwarding address.',
                422: 'The request was well-formed but was unable to be followed due to semantic errors.',
                429: 'The user has sent too many requests in a given amount of time ("rate limiting")',
                500: 'The server has encountered a situation it does not know how to handle.'
            }
        });
    }
    /**
     * Get relationships
     * Get all relationships for a person within an organization
     * @param data The data for the request.
     * @param data.organizationId The organization's ID.
     * @param data.personId
     * @returns unknown A list of relationships
     * @throws ApiError
     */
    getRelationships(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/organizations/{organizationId}/persons/{personId}/relationships',
            path: {
                organizationId: data.organizationId,
                personId: data.personId
            },
            errors: {
                400: 'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
                401: 'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.',
                403: "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.",
                404: 'The server cannot find the requested resource.',
                409: 'This response is sent when a request conflicts with the current state of the server.',
                410: 'This response is sent when the requested content has been permanently deleted from server, with no forwarding address.',
                422: 'The request was well-formed but was unable to be followed due to semantic errors.',
                429: 'The user has sent too many requests in a given amount of time ("rate limiting")',
                500: 'The server has encountered a situation it does not know how to handle.'
            }
        });
    }
}
exports.PersonsService = PersonsService;
class GroupsService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Get all groups
     * Get all groups within an organization
     * @param data The data for the request.
     * @param data.organizationId The organization's ID.
     * @returns unknown A group
     * @throws ApiError
     */
    getGroups(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/organizations/{organizationId}/groups',
            path: {
                organizationId: data.organizationId
            },
            errors: {
                400: 'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
                401: 'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.',
                403: "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.",
                404: 'The server cannot find the requested resource.',
                409: 'This response is sent when a request conflicts with the current state of the server.',
                410: 'This response is sent when the requested content has been permanently deleted from server, with no forwarding address.',
                422: 'The request was well-formed but was unable to be followed due to semantic errors.',
                429: 'The user has sent too many requests in a given amount of time ("rate limiting")',
                500: 'The server has encountered a situation it does not know how to handle.'
            }
        });
    }
    /**
     * Get group by ID
     * Get a group within an organization by ID
     * @param data The data for the request.
     * @param data.organizationId The organization's ID.
     * @param data.groupId
     * @returns unknown A group
     * @throws ApiError
     */
    getGroup(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/organizations/{organizationId}/groups/{groupId}',
            path: {
                organizationId: data.organizationId,
                groupId: data.groupId
            },
            errors: {
                400: 'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
                401: 'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.',
                403: "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.",
                404: 'The server cannot find the requested resource.',
                409: 'This response is sent when a request conflicts with the current state of the server.',
                410: 'This response is sent when the requested content has been permanently deleted from server, with no forwarding address.',
                422: 'The request was well-formed but was unable to be followed due to semantic errors.',
                429: 'The user has sent too many requests in a given amount of time ("rate limiting")',
                500: 'The server has encountered a situation it does not know how to handle.'
            }
        });
    }
    /**
     * Get group members by ID
     * Get a groups members within an organization by ID
     * @param data The data for the request.
     * @param data.organizationId The organization's ID.
     * @param data.groupId
     * @returns unknown All group members
     * @throws ApiError
     */
    getGroupMembers(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/organizations/{organizationId}/groups/{groupId}/members',
            path: {
                organizationId: data.organizationId,
                groupId: data.groupId
            },
            errors: {
                400: 'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
                401: 'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.',
                403: "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.",
                404: 'The server cannot find the requested resource.',
                409: 'This response is sent when a request conflicts with the current state of the server.',
                410: 'This response is sent when the requested content has been permanently deleted from server, with no forwarding address.',
                422: 'The request was well-formed but was unable to be followed due to semantic errors.',
                429: 'The user has sent too many requests in a given amount of time ("rate limiting")',
                500: 'The server has encountered a situation it does not know how to handle.'
            }
        });
    }
}
exports.GroupsService = GroupsService;
