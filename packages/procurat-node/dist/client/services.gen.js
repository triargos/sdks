"use strict";
// This file is auto-generated by @hey-api/openapi-ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReligionsService = exports.RelationshipsService = exports.HealthService = exports.FamilyService = exports.AddressService = exports.CommunicationService = exports.PersonService = exports.ContactInformationService = exports.DistrictsService = exports.CountriesService = exports.GroupsService = void 0;
class GroupsService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Find group members by id
     * Find group members by id
     * @param data The data for the request.
     * @param data.id
     * @returns GroupMemberDTO default response
     * @throws ApiError
     */
    findGroupMembersById(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/groups/{id}/members',
            path: {
                id: data.id
            }
        });
    }
    /**
     * Find group by id
     * Find group by id
     * @param data The data for the request.
     * @param data.id
     * @returns GroupDTO default response
     * @throws ApiError
     */
    findGroupById(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/groups/{id}',
            path: {
                id: data.id
            }
        });
    }
    /**
     * Find all groups
     * Find all groups
     * @returns GroupDTO default response
     * @throws ApiError
     */
    findAllGroups() {
        return this.httpRequest.request({
            method: 'GET',
            url: '/groups'
        });
    }
}
exports.GroupsService = GroupsService;
class CountriesService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Find by ID
     * Find a country by its ID
     * @param data The data for the request.
     * @param data.id
     * @returns CountryDTO default response
     * @throws ApiError
     */
    findCountryByIdx(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/countries/{id}',
            path: {
                id: data.id
            }
        });
    }
    /**
     * Find all
     * Find all available countries
     * @returns CountryDTO default response
     * @throws ApiError
     */
    findAllCountries() {
        return this.httpRequest.request({
            method: 'GET',
            url: '/countries'
        });
    }
}
exports.CountriesService = CountriesService;
class DistrictsService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Get all districts
     * Get all districts
     * @returns CountyDTO default response
     * @throws ApiError
     */
    findAllDistricts() {
        return this.httpRequest.request({
            method: 'GET',
            url: '/districts'
        });
    }
    /**
     * Get a district by ID
     * Find a specific district by ID
     * @param data The data for the request.
     * @param data.id
     * @returns CountyDTO default response
     * @throws ApiError
     */
    findDistrictById(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/districts/{id}',
            path: {
                id: data.id
            }
        });
    }
}
exports.DistrictsService = DistrictsService;
class ContactInformationService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Find by ID
     * Find contact information by id
     * @param data The data for the request.
     * @param data.contactInformationId
     * @returns ContactInformationDTO default response
     * @throws ApiError
     */
    findById(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/contactinformation/{contactInformationId}',
            path: {
                contactInformationId: data.contactInformationId
            }
        });
    }
    /**
     * Update
     * Update contact information
     * @param data The data for the request.
     * @param data.contactInformationId
     * @param data.requestBody
     * @returns ContactInformationDTO default response
     * @throws ApiError
     */
    updateContactInformation(data) {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/contactinformation/{contactInformationId}',
            path: {
                contactInformationId: data.contactInformationId
            },
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
    /**
     * Delete
     * Delete contact information
     * @param data The data for the request.
     * @param data.contactInformationId
     * @returns ResponseEntityObject default response
     * @throws ApiError
     */
    deleteContactInformation(data) {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/contactinformation/{contactInformationId}',
            path: {
                contactInformationId: data.contactInformationId
            }
        });
    }
    /**
     * Find by Address
     * Find contact information by address
     * @param data The data for the request.
     * @param data.addressId
     * @returns ContactInformationDTO default response
     * @throws ApiError
     */
    findByAddress(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/contactinformation/address/{addressId}',
            path: {
                addressId: data.addressId
            }
        });
    }
    /**
     * Find by Person
     * Find contact information by person
     * @param data The data for the request.
     * @param data.personId
     * @returns ContactInformationDTO default response
     * @throws ApiError
     */
    findByPerson(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/contactinformation/person/{personId}',
            path: {
                personId: data.personId
            }
        });
    }
    /**
     * Create
     * Create contact information
     * @param data The data for the request.
     * @param data.requestBody
     * @returns ResponseEntityObject default response
     * @throws ApiError
     */
    createContactInformation(data = {}) {
        return this.httpRequest.request({
            method: 'POST',
            url: '/contactinformation',
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
}
exports.ContactInformationService = ContactInformationService;
class PersonService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Find all
     * Find all persons.
     * @returns PersonDTO default response
     * @throws ApiError
     */
    findAllPersons() {
        return this.httpRequest.request({
            method: 'GET',
            url: '/persons'
        });
    }
    /**
     * Create
     * Create a person.
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SuccessResponse default response
     * @throws ApiError
     */
    createPerson(data = {}) {
        return this.httpRequest.request({
            method: 'POST',
            url: '/persons',
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
    /**
     * Find by id
     * Find a person by id.
     * @param data The data for the request.
     * @param data.id
     * @returns PersonDTO default response
     * @throws ApiError
     */
    findPerson(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/persons/{id}',
            path: {
                id: data.id
            }
        });
    }
    /**
     * Update
     * Update a person.
     * @param data The data for the request.
     * @param data.id
     * @param data.requestBody
     * @returns SuccessResponse default response
     * @throws ApiError
     */
    updatePerson(data) {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/persons/{id}',
            path: {
                id: data.id
            },
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
}
exports.PersonService = PersonService;
class CommunicationService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Delete contact person mapping for a child
     * Delete contact person mapping for a child
     * @param data The data for the request.
     * @param data.childId
     * @param data.contactPersonMappingId
     * @returns unknown default response
     * @throws ApiError
     */
    deleteContactPersonMapping(data) {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/communication/child/{childId}/persons/{contactPersonMappingId}',
            path: {
                childId: data.childId,
                contactPersonMappingId: data.contactPersonMappingId
            }
        });
    }
    /**
     * Get contact information mappings for a child
     * Get contact information mappings for a child
     * @param data The data for the request.
     * @param data.childId
     * @returns ContactInformationMappingDTO default response
     * @throws ApiError
     */
    getContactInformationMappings(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/communication/child/{childId}/information',
            path: {
                childId: data.childId
            }
        });
    }
    /**
     * Create contact information mapping for a child
     * Create contact information mapping for a child
     * @param data The data for the request.
     * @param data.childId
     * @param data.requestBody
     * @returns ContactInformationMappingDTO default response
     * @throws ApiError
     */
    createContactInformationMapping(data) {
        return this.httpRequest.request({
            method: 'POST',
            url: '/communication/child/{childId}/information',
            path: {
                childId: data.childId
            },
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
    /**
     * Get contact person mappings for a child
     * Get contact person mappings for a child
     * @param data The data for the request.
     * @param data.childId
     * @returns ContactPersonMappingDTO default response
     * @throws ApiError
     */
    getContactPersonMappings(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/communication/child/{childId}/persons',
            path: {
                childId: data.childId
            }
        });
    }
    /**
     * Create contact person mapping for a child
     * Create contact person mapping for a child
     * @param data The data for the request.
     * @param data.childId
     * @param data.requestBody
     * @returns ContactPersonMappingDTO default response
     * @throws ApiError
     */
    createContactPersonMapping(data) {
        return this.httpRequest.request({
            method: 'POST',
            url: '/communication/child/{childId}/persons',
            path: {
                childId: data.childId
            },
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
    /**
     * Delete contact information mapping for a child
     * Delete contact information mapping for a child
     * @param data The data for the request.
     * @param data.childId
     * @param data.contactInformationMappingId
     * @returns unknown default response
     * @throws ApiError
     */
    deleteContactInformationMapping(data) {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/communication/child/{childId}/information/{contactInformationMappingId}',
            path: {
                childId: data.childId,
                contactInformationMappingId: data.contactInformationMappingId
            }
        });
    }
}
exports.CommunicationService = CommunicationService;
class AddressService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Get address by id
     * Get address by id
     * @param data The data for the request.
     * @param data.id
     * @returns AddressDTO default response
     * @throws ApiError
     */
    findAddressById(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/addresses/{id}',
            path: {
                id: data.id
            }
        });
    }
    /**
     * Update address
     * Update address
     * @param data The data for the request.
     * @param data.id
     * @param data.requestBody
     * @returns AddressDTO default response
     * @throws ApiError
     */
    updateAddress(data) {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/addresses/{id}',
            path: {
                id: data.id
            },
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
    /**
     * Get all addresses
     * Get all addresses
     * @returns AddressDTO default response
     * @throws ApiError
     */
    findAllAddresses() {
        return this.httpRequest.request({
            method: 'GET',
            url: '/addresses'
        });
    }
    /**
     * Create address
     * Create address
     * @param data The data for the request.
     * @param data.requestBody
     * @returns AddressDTO default response
     * @throws ApiError
     */
    createAddress(data = {}) {
        return this.httpRequest.request({
            method: 'POST',
            url: '/addresses',
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
}
exports.AddressService = AddressService;
class FamilyService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Find all families
     * @returns FamilyDTO default response
     * @throws ApiError
     */
    findAllFamilies() {
        return this.httpRequest.request({
            method: 'GET',
            url: '/families'
        });
    }
    /**
     * Find family by id
     * @param data The data for the request.
     * @param data.id
     * @returns FamilyDTO default response
     * @throws ApiError
     */
    findFamilyById(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/families/{id}',
            path: {
                id: data.id
            }
        });
    }
}
exports.FamilyService = FamilyService;
class HealthService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * @returns HealthDTO default response
     * @throws ApiError
     */
    getHealth() {
        return this.httpRequest.request({
            method: 'GET',
            url: '/health'
        });
    }
}
exports.HealthService = HealthService;
class RelationshipsService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Get relationships for person
     * Get relationships for person
     * @param data The data for the request.
     * @param data.personId
     * @returns RelationshipDTO default response
     * @throws ApiError
     */
    findRelationshipsForPerson(data) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/relationships/person/{personId}',
            path: {
                personId: data.personId
            }
        });
    }
}
exports.RelationshipsService = RelationshipsService;
class ReligionsService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Find all
     * Find all available religions
     * @returns ReligionDTO default response
     * @throws ApiError
     */
    findAllReligions() {
        return this.httpRequest.request({
            method: 'GET',
            url: '/religions'
        });
    }
}
exports.ReligionsService = ReligionsService;
