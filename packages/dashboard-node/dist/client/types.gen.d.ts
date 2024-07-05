export type $OpenApiTs = {
    '/v1/organizations': {
        get: {
            res: {
                /**
                 * A list of organizations
                 */
                200: Array<{
                    id: string;
                    name: string;
                    active: boolean;
                }>;
                /**
                 * The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
                 */
                400: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'bad_request';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
                 */
                401: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unauthorized';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
                 */
                403: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'forbidden';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server cannot find the requested resource.
                 */
                404: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'not_found';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when a request conflicts with the current state of the server.
                 */
                409: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'conflict';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
                 */
                410: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'invite_expired';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The request was well-formed but was unable to be followed due to semantic errors.
                 */
                422: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unprocessable_entity';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The user has sent too many requests in a given amount of time ("rate limiting")
                 */
                429: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'rate_limit_exceeded';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server has encountered a situation it does not know how to handle.
                 */
                500: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'internal_server_error';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
            };
        };
    };
    '/v1/organizations/{organizationId}': {
        get: {
            req: {
                /**
                 * The organization's ID.
                 */
                organizationId: string;
            };
            res: {
                /**
                 * An organization
                 */
                200: {
                    id: string;
                    name: string;
                    active: boolean;
                };
                /**
                 * The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
                 */
                400: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'bad_request';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
                 */
                401: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unauthorized';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
                 */
                403: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'forbidden';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server cannot find the requested resource.
                 */
                404: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'not_found';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when a request conflicts with the current state of the server.
                 */
                409: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'conflict';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
                 */
                410: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'invite_expired';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The request was well-formed but was unable to be followed due to semantic errors.
                 */
                422: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unprocessable_entity';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The user has sent too many requests in a given amount of time ("rate limiting")
                 */
                429: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'rate_limit_exceeded';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server has encountered a situation it does not know how to handle.
                 */
                500: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'internal_server_error';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
            };
        };
    };
    '/v1/organizations/{organizationId}/persons': {
        get: {
            req: {
                /**
                 * The organization's ID.
                 */
                organizationId: string;
            };
            res: {
                /**
                 * A list of persons
                 */
                200: Array<{
                    id: number;
                    firstName: string | null;
                    lastName: string | null;
                    gender: string | null;
                    addressId: number | null;
                    familyId: number | null;
                    familyRole: string | null;
                    birthDate: string | null;
                    birthPlace: string | null;
                    birthCountryId: number | null;
                    languageId: number | null;
                    religionId: number | null;
                    allFirstNames: string | null;
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
                        street: string | null;
                        countryId: number | null;
                        zip: string | null;
                        city: string | null;
                        nameline2: string | null;
                        additional: string | null;
                        district: string | null;
                        poBoxZip: string | null;
                        poBox: string | null;
                        countyId: number | null;
                    } | null;
                }>;
                /**
                 * The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
                 */
                400: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'bad_request';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
                 */
                401: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unauthorized';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
                 */
                403: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'forbidden';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server cannot find the requested resource.
                 */
                404: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'not_found';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when a request conflicts with the current state of the server.
                 */
                409: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'conflict';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
                 */
                410: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'invite_expired';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The request was well-formed but was unable to be followed due to semantic errors.
                 */
                422: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unprocessable_entity';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The user has sent too many requests in a given amount of time ("rate limiting")
                 */
                429: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'rate_limit_exceeded';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server has encountered a situation it does not know how to handle.
                 */
                500: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'internal_server_error';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
            };
        };
    };
    '/v1/organizations/{organizationId}/persons/{personId}': {
        get: {
            req: {
                /**
                 * The organization's ID.
                 */
                organizationId: string;
                personId: string;
            };
            res: {
                /**
                 * A person with address
                 */
                200: {
                    id: number;
                    firstName: string | null;
                    lastName: string | null;
                    gender: string | null;
                    addressId: number | null;
                    familyId: number | null;
                    familyRole: string | null;
                    birthDate: string | null;
                    birthPlace: string | null;
                    birthCountryId: number | null;
                    languageId: number | null;
                    religionId: number | null;
                    allFirstNames: string | null;
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
                        street: string | null;
                        countryId: number | null;
                        zip: string | null;
                        city: string | null;
                        nameline2: string | null;
                        additional: string | null;
                        district: string | null;
                        poBoxZip: string | null;
                        poBox: string | null;
                        countyId: number | null;
                    } | null;
                };
                /**
                 * The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
                 */
                400: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'bad_request';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
                 */
                401: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unauthorized';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
                 */
                403: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'forbidden';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server cannot find the requested resource.
                 */
                404: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'not_found';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when a request conflicts with the current state of the server.
                 */
                409: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'conflict';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
                 */
                410: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'invite_expired';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The request was well-formed but was unable to be followed due to semantic errors.
                 */
                422: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unprocessable_entity';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The user has sent too many requests in a given amount of time ("rate limiting")
                 */
                429: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'rate_limit_exceeded';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server has encountered a situation it does not know how to handle.
                 */
                500: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'internal_server_error';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
            };
        };
    };
    '/v1/organizations/{organizationId}/persons/{personId}/relationships': {
        get: {
            req: {
                /**
                 * The organization's ID.
                 */
                organizationId: string;
                personId: string;
            };
            res: {
                /**
                 * A list of relationships
                 */
                200: Array<{
                    personId: number;
                    relationshipType: 'father' | 'mother' | 'son' | 'daughter' | 'other' | 'child';
                    custody: boolean;
                    realParent: boolean;
                    physical: boolean;
                    notes: string | null;
                }>;
                /**
                 * The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
                 */
                400: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'bad_request';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
                 */
                401: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unauthorized';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
                 */
                403: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'forbidden';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server cannot find the requested resource.
                 */
                404: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'not_found';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when a request conflicts with the current state of the server.
                 */
                409: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'conflict';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
                 */
                410: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'invite_expired';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The request was well-formed but was unable to be followed due to semantic errors.
                 */
                422: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unprocessable_entity';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The user has sent too many requests in a given amount of time ("rate limiting")
                 */
                429: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'rate_limit_exceeded';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server has encountered a situation it does not know how to handle.
                 */
                500: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'internal_server_error';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
            };
        };
    };
    '/v1/organizations/{organizationId}/groups': {
        get: {
            req: {
                /**
                 * The organization's ID.
                 */
                organizationId: string;
            };
            res: {
                /**
                 * A group
                 */
                200: Array<{
                    id: number;
                    name: string;
                    type: 'root' | 'systemRoot' | 'systemPersonGroup' | 'systemYear' | 'systemFacility' | 'systemDepartment' | 'personGroup' | 'class' | 'careGroup' | 'schoolYear' | 'facility' | 'department' | 'institution';
                    grade?: string | null;
                    schoolYear?: string | null;
                    char?: string | null;
                }>;
                /**
                 * The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
                 */
                400: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'bad_request';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
                 */
                401: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unauthorized';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
                 */
                403: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'forbidden';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server cannot find the requested resource.
                 */
                404: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'not_found';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when a request conflicts with the current state of the server.
                 */
                409: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'conflict';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
                 */
                410: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'invite_expired';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The request was well-formed but was unable to be followed due to semantic errors.
                 */
                422: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unprocessable_entity';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The user has sent too many requests in a given amount of time ("rate limiting")
                 */
                429: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'rate_limit_exceeded';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server has encountered a situation it does not know how to handle.
                 */
                500: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'internal_server_error';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
            };
        };
    };
    '/v1/organizations/{organizationId}/groups/{groupId}': {
        get: {
            req: {
                groupId: string;
                /**
                 * The organization's ID.
                 */
                organizationId: string;
            };
            res: {
                /**
                 * A group
                 */
                200: {
                    id: number;
                    name: string;
                    type: 'root' | 'systemRoot' | 'systemPersonGroup' | 'systemYear' | 'systemFacility' | 'systemDepartment' | 'personGroup' | 'class' | 'careGroup' | 'schoolYear' | 'facility' | 'department' | 'institution';
                    grade?: string | null;
                    schoolYear?: string | null;
                    char?: string | null;
                };
                /**
                 * The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
                 */
                400: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'bad_request';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
                 */
                401: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unauthorized';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
                 */
                403: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'forbidden';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server cannot find the requested resource.
                 */
                404: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'not_found';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when a request conflicts with the current state of the server.
                 */
                409: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'conflict';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
                 */
                410: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'invite_expired';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The request was well-formed but was unable to be followed due to semantic errors.
                 */
                422: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unprocessable_entity';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The user has sent too many requests in a given amount of time ("rate limiting")
                 */
                429: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'rate_limit_exceeded';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server has encountered a situation it does not know how to handle.
                 */
                500: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'internal_server_error';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
            };
        };
    };
    '/v1/organizations/{organizationId}/groups/{groupId}/members': {
        get: {
            req: {
                groupId: string;
                /**
                 * The organization's ID.
                 */
                organizationId: string;
            };
            res: {
                /**
                 * All group members
                 */
                200: Array<{
                    personId: number;
                    entryDate: string | null;
                    exitDate: string | null;
                }>;
                /**
                 * The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
                 */
                400: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'bad_request';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
                 */
                401: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unauthorized';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
                 */
                403: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'forbidden';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server cannot find the requested resource.
                 */
                404: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'not_found';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when a request conflicts with the current state of the server.
                 */
                409: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'conflict';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
                 */
                410: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'invite_expired';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The request was well-formed but was unable to be followed due to semantic errors.
                 */
                422: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'unprocessable_entity';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The user has sent too many requests in a given amount of time ("rate limiting")
                 */
                429: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'rate_limit_exceeded';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
                /**
                 * The server has encountered a situation it does not know how to handle.
                 */
                500: {
                    error: {
                        /**
                         * A short code indicating the error code returned.
                         */
                        code: 'internal_server_error';
                        /**
                         * A human readable explanation of what went wrong.
                         */
                        message: string;
                        /**
                         * A link to our documentation with more details about this error code
                         */
                        doc_url?: string;
                    };
                };
            };
        };
    };
};
