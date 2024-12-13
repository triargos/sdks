/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/v1/organizations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all organizations
         * @description Get all organizations
         */
        get: operations["getOrganizations"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/organizations/{organizationId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get organization by ID
         * @description Get an organization by ID
         */
        get: operations["getOrganization"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/organizations/{organizationId}/persons": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get persons
         * @description Get all persons of an organization
         */
        get: operations["getPersons"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/organizations/{organizationId}/persons/{personId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a person
         * @description Get a person within an organization by ID
         */
        get: operations["getPerson"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/organizations/{organizationId}/persons/{personId}/relationships": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get relationships
         * @description Get all relationships for a person within an organization
         */
        get: operations["getRelationships"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/organizations/{organizationId}/groups": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all groups
         * @description Get all groups within an organization
         */
        get: operations["getGroups"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/organizations/{organizationId}/groups/{groupId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get group by ID
         * @description Get a group within an organization by ID
         */
        get: operations["getGroup"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/organizations/{organizationId}/groups/{groupId}/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get group members by ID
         * @description Get a groups members within an organization by ID
         */
        get: operations["getGroupMembers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: {
        /** @description The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing). */
        400: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    error: {
                        /**
                         * @description A short code indicating the error code returned.
                         * @example bad_request
                         * @enum {string}
                         */
                        code: "bad_request";
                        /**
                         * @description A human readable explanation of what went wrong.
                         * @example The requested resource was not found.
                         */
                        message: string;
                        /** @description A link to our documentation with more details about this error code */
                        doc_url?: string;
                    };
                };
            };
        };
        /** @description Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response. */
        401: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    error: {
                        /**
                         * @description A short code indicating the error code returned.
                         * @example unauthorized
                         * @enum {string}
                         */
                        code: "unauthorized";
                        /**
                         * @description A human readable explanation of what went wrong.
                         * @example The requested resource was not found.
                         */
                        message: string;
                        /** @description A link to our documentation with more details about this error code */
                        doc_url?: string;
                    };
                };
            };
        };
        /** @description The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server. */
        403: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    error: {
                        /**
                         * @description A short code indicating the error code returned.
                         * @example forbidden
                         * @enum {string}
                         */
                        code: "forbidden";
                        /**
                         * @description A human readable explanation of what went wrong.
                         * @example The requested resource was not found.
                         */
                        message: string;
                        /** @description A link to our documentation with more details about this error code */
                        doc_url?: string;
                    };
                };
            };
        };
        /** @description The server cannot find the requested resource. */
        404: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    error: {
                        /**
                         * @description A short code indicating the error code returned.
                         * @example not_found
                         * @enum {string}
                         */
                        code: "not_found";
                        /**
                         * @description A human readable explanation of what went wrong.
                         * @example The requested resource was not found.
                         */
                        message: string;
                        /** @description A link to our documentation with more details about this error code */
                        doc_url?: string;
                    };
                };
            };
        };
        /** @description This response is sent when a request conflicts with the current state of the server. */
        409: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    error: {
                        /**
                         * @description A short code indicating the error code returned.
                         * @example conflict
                         * @enum {string}
                         */
                        code: "conflict";
                        /**
                         * @description A human readable explanation of what went wrong.
                         * @example The requested resource was not found.
                         */
                        message: string;
                        /** @description A link to our documentation with more details about this error code */
                        doc_url?: string;
                    };
                };
            };
        };
        /** @description This response is sent when the requested content has been permanently deleted from server, with no forwarding address. */
        410: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    error: {
                        /**
                         * @description A short code indicating the error code returned.
                         * @example invite_expired
                         * @enum {string}
                         */
                        code: "invite_expired";
                        /**
                         * @description A human readable explanation of what went wrong.
                         * @example The requested resource was not found.
                         */
                        message: string;
                        /** @description A link to our documentation with more details about this error code */
                        doc_url?: string;
                    };
                };
            };
        };
        /** @description The request was well-formed but was unable to be followed due to semantic errors. */
        422: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    error: {
                        /**
                         * @description A short code indicating the error code returned.
                         * @example unprocessable_entity
                         * @enum {string}
                         */
                        code: "unprocessable_entity";
                        /**
                         * @description A human readable explanation of what went wrong.
                         * @example The requested resource was not found.
                         */
                        message: string;
                        /** @description A link to our documentation with more details about this error code */
                        doc_url?: string;
                    };
                };
            };
        };
        /** @description The user has sent too many requests in a given amount of time ("rate limiting") */
        429: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    error: {
                        /**
                         * @description A short code indicating the error code returned.
                         * @example rate_limit_exceeded
                         * @enum {string}
                         */
                        code: "rate_limit_exceeded";
                        /**
                         * @description A human readable explanation of what went wrong.
                         * @example The requested resource was not found.
                         */
                        message: string;
                        /** @description A link to our documentation with more details about this error code */
                        doc_url?: string;
                    };
                };
            };
        };
        /** @description The server has encountered a situation it does not know how to handle. */
        500: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    error: {
                        /**
                         * @description A short code indicating the error code returned.
                         * @example internal_server_error
                         * @enum {string}
                         */
                        code: "internal_server_error";
                        /**
                         * @description A human readable explanation of what went wrong.
                         * @example The requested resource was not found.
                         */
                        message: string;
                        /** @description A link to our documentation with more details about this error code */
                        doc_url?: string;
                    };
                };
            };
        };
    };
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getOrganizations: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of organizations */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id: string;
                        name: string;
                        active: boolean;
                    }[];
                };
            };
            400: components["responses"]["400"];
            401: components["responses"]["401"];
            403: components["responses"]["403"];
            404: components["responses"]["404"];
            409: components["responses"]["409"];
            410: components["responses"]["410"];
            422: components["responses"]["422"];
            429: components["responses"]["429"];
            500: components["responses"]["500"];
        };
    };
    getOrganization: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The organization's ID. */
                organizationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description An organization */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id: string;
                        name: string;
                        active: boolean;
                    };
                };
            };
            400: components["responses"]["400"];
            401: components["responses"]["401"];
            403: components["responses"]["403"];
            404: components["responses"]["404"];
            409: components["responses"]["409"];
            410: components["responses"]["410"];
            422: components["responses"]["422"];
            429: components["responses"]["429"];
            500: components["responses"]["500"];
        };
    };
    getPersons: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The organization's ID. */
                organizationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of persons */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id: number;
                        firstName: string | null;
                        lastName: string | null;
                        /** @enum {string|null} */
                        gender: "male" | "female" | "other" | null;
                        addressId: number | null;
                        familyId: number | null;
                        /** @enum {string|null} */
                        familyRole: "father" | "mother" | "jklml" | "etc" | null;
                        birthDate: string | null;
                        birthPlace: string | null;
                        birthCountryId: number | null;
                        languageId: number | null;
                        religionId: number | null;
                        allFirstNames: string | null;
                        email: string | null;
                        birthName: string | null;
                        academicTitle: string | null;
                        namePrefix: string | null;
                        nobilityTitle: string | null;
                        salutationA: string | null;
                        salutationB: string | null;
                        jobTitle: string | null;
                        comment: string | null;
                        nationalityId: number | null;
                        maritalStatus: string | null;
                        deathDate: string | null;
                        address: {
                            id: number;
                            street: string;
                            countryId: number | null;
                            zip: string;
                            city: string;
                            nameline2: string | null;
                            additional: string | null;
                            district: string | null;
                            poBoxZip: string | null;
                            poBox: string | null;
                            countyId: number | null;
                        } | null;
                    }[];
                };
            };
            400: components["responses"]["400"];
            401: components["responses"]["401"];
            403: components["responses"]["403"];
            404: components["responses"]["404"];
            409: components["responses"]["409"];
            410: components["responses"]["410"];
            422: components["responses"]["422"];
            429: components["responses"]["429"];
            500: components["responses"]["500"];
        };
    };
    getPerson: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The organization's ID. */
                organizationId: string;
                personId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A person with address */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id: number;
                        firstName: string | null;
                        lastName: string | null;
                        /** @enum {string|null} */
                        gender: "male" | "female" | "other" | null;
                        addressId: number | null;
                        familyId: number | null;
                        /** @enum {string|null} */
                        familyRole: "father" | "mother" | "jklml" | "etc" | null;
                        birthDate: string | null;
                        birthPlace: string | null;
                        birthCountryId: number | null;
                        languageId: number | null;
                        religionId: number | null;
                        allFirstNames: string | null;
                        email: string | null;
                        birthName: string | null;
                        academicTitle: string | null;
                        namePrefix: string | null;
                        nobilityTitle: string | null;
                        salutationA: string | null;
                        salutationB: string | null;
                        jobTitle: string | null;
                        comment: string | null;
                        nationalityId: number | null;
                        maritalStatus: string | null;
                        deathDate: string | null;
                        address: {
                            id: number;
                            street: string;
                            countryId: number | null;
                            zip: string;
                            city: string;
                            nameline2: string | null;
                            additional: string | null;
                            district: string | null;
                            poBoxZip: string | null;
                            poBox: string | null;
                            countyId: number | null;
                        } | null;
                    };
                };
            };
            400: components["responses"]["400"];
            401: components["responses"]["401"];
            403: components["responses"]["403"];
            404: components["responses"]["404"];
            409: components["responses"]["409"];
            410: components["responses"]["410"];
            422: components["responses"]["422"];
            429: components["responses"]["429"];
            500: components["responses"]["500"];
        };
    };
    getRelationships: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The organization's ID. */
                organizationId: string;
                personId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of relationships */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        personId: number;
                        /** @enum {string} */
                        relationShipType: "daughter" | "other" | "father" | "child" | "son" | "mother";
                        physical: boolean;
                        custody: boolean;
                        realParent: boolean;
                        notes: string | null;
                    }[];
                };
            };
            400: components["responses"]["400"];
            401: components["responses"]["401"];
            403: components["responses"]["403"];
            404: components["responses"]["404"];
            409: components["responses"]["409"];
            410: components["responses"]["410"];
            422: components["responses"]["422"];
            429: components["responses"]["429"];
            500: components["responses"]["500"];
        };
    };
    getGroups: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The organization's ID. */
                organizationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A group */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id: number;
                        parentGroupId: number | null;
                        name: string;
                        shortName: string;
                        /** @enum {string} */
                        type: "root" | "systemRoot" | "systemPersonGroup" | "systemYear" | "systemFacility" | "systemDepartment" | "personGroup" | "class" | "careGroup" | "schoolYear" | "facility" | "department" | "institution";
                        grade: number | null;
                        character: string | null;
                        schoolYear: string | null;
                        /** @enum {string|null} */
                        additionalType: "classFacility" | null;
                        sortKey: number | null;
                    }[];
                };
            };
            400: components["responses"]["400"];
            401: components["responses"]["401"];
            403: components["responses"]["403"];
            404: components["responses"]["404"];
            409: components["responses"]["409"];
            410: components["responses"]["410"];
            422: components["responses"]["422"];
            429: components["responses"]["429"];
            500: components["responses"]["500"];
        };
    };
    getGroup: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The organization's ID. */
                organizationId: string;
                /** @description The group's ID. */
                groupId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A group */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id: number;
                        parentGroupId: number | null;
                        name: string;
                        shortName: string;
                        /** @enum {string} */
                        type: "root" | "systemRoot" | "systemPersonGroup" | "systemYear" | "systemFacility" | "systemDepartment" | "personGroup" | "class" | "careGroup" | "schoolYear" | "facility" | "department" | "institution";
                        grade: number | null;
                        character: string | null;
                        schoolYear: string | null;
                        /** @enum {string|null} */
                        additionalType: "classFacility" | null;
                        sortKey: number | null;
                    };
                };
            };
            400: components["responses"]["400"];
            401: components["responses"]["401"];
            403: components["responses"]["403"];
            404: components["responses"]["404"];
            409: components["responses"]["409"];
            410: components["responses"]["410"];
            422: components["responses"]["422"];
            429: components["responses"]["429"];
            500: components["responses"]["500"];
        };
    };
    getGroupMembers: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The organization's ID. */
                organizationId: string;
                groupId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description All group members */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        personId: number;
                        entryDate: string;
                        exitDate: string | null;
                        jsonData?: unknown;
                    }[];
                };
            };
            400: components["responses"]["400"];
            401: components["responses"]["401"];
            403: components["responses"]["403"];
            404: components["responses"]["404"];
            409: components["responses"]["409"];
            410: components["responses"]["410"];
            422: components["responses"]["422"];
            429: components["responses"]["429"];
            500: components["responses"]["500"];
        };
    };
}
