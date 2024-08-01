export type GroupMemberDTO = {
    personId?: number;
    entryDate?: string;
    exitDate?: string;
};
export type CountryDTO = {
    id?: number;
    idx?: string;
    iso?: string;
};
export type CountyDTO = {
    id?: number;
    name?: string;
};
export type ContactInformationDTO = {
    id?: number;
    order?: number;
    type?: string;
    medium?: string;
    personId?: number;
    addressId?: number;
    externalName?: string;
    content?: string;
    comment?: string;
    secret?: boolean;
};
export type PersonCreationDTO = {
    firstName?: string;
    lastName?: string;
    gender?: string;
    addressId?: number;
    familyId?: number;
    familyRole?: string;
    birthDate?: string;
    birthPlace?: string;
    birthCountryId?: number;
    languageId?: number;
    religionId?: number;
    allFirstNames?: string;
    birthName?: string;
    academicTitle?: string;
    namePrefix?: string;
    nobilityTitle?: string;
    salutationA?: string;
    salutationB?: string;
    jobTitle?: string;
    nationalityId?: number;
    maritalStatus?: string;
    deathDate?: string;
};
export type SuccessResponse = {
    code?: number;
    message?: string;
};
export type AddressDTO = {
    id?: number;
    street?: string;
    countryId?: number;
    zip?: string;
    city?: string;
    nameline2?: string;
    additional?: string;
    district?: string;
    poBoxZip?: string;
    poBox?: string;
    countyId?: number;
};
export type FamilyDTO = {
    id?: number;
    members?: Array<(number)>;
};
export type ContactInformationMappingDTO = {
    id?: number;
    childId?: number;
    contactInfoId?: number;
    emergencyPriority?: number;
    isOnList?: boolean;
};
export type PersonUpdateDTO = {
    id?: number;
    firstName?: string;
    lastName?: string;
    gender?: string;
    birthDate?: string;
    birthPlace?: string;
    birthCountryId?: number;
    languageId?: number;
    religionId?: number;
    allFirstNames?: string;
    birthName?: string;
    academicTitle?: string;
    namePrefix?: string;
    nobilityTitle?: string;
    salutationA?: string;
    salutationB?: string;
    jobTitle?: string;
    comment?: string;
    nationalityId?: number;
    maritalStatus?: string;
};
export type ContactPersonMappingDTO = {
    id?: number;
    childId?: number;
    parentId?: number;
    isEmergency?: boolean;
    includeAddressOnList?: boolean;
    includeHomePhoneOnList?: boolean;
};
export type GroupDTO = {
    id?: number;
    name?: string;
    type?: string;
    grade?: string;
    character?: string;
    schoolYear?: string;
};
export type AddressCreationDTO = {
    personId?: number;
    street?: string;
    countryId?: number;
    zip?: string;
    city?: string;
    nameline2?: string;
    additional?: string;
    district?: string;
    poBoxZip?: string;
    poBox?: string;
    countyId?: number;
};
export type HealthDTO = {
    databaseVersion?: number;
    build?: number;
    databaseValid?: boolean;
    databaseLocked?: boolean;
    lastUpdateStart?: string;
    lastUpdateEnd?: string;
    lastUpdateFailed?: string;
};
export type RelationshipDTO = {
    personId?: number;
    relationshipType?: string;
    physical?: boolean;
    custody?: boolean;
    realParent?: boolean;
    notes?: string;
};
export type PersonDTO = {
    id?: number;
    firstName?: string;
    lastName?: string;
    gender?: string;
    addressId?: number;
    familyId?: number;
    familyRole?: string;
    birthDate?: string;
    birthPlace?: string;
    birthCountryId?: number;
    languageId?: number;
    religionId?: number;
    allFirstNames?: string;
    birthName?: string;
    academicTitle?: string;
    namePrefix?: string;
    nobilityTitle?: string;
    salutationA?: string;
    salutationB?: string;
    jobTitle?: string;
    comment?: string;
    nationalityId?: number;
    maritalStatus?: string;
    deathDate?: string;
};
export type ContentDisposition = {
    type?: string;
    name?: string;
    filename?: string;
    charset?: {
        registered?: boolean;
    };
    size?: number;
    creationDate?: string;
    modificationDate?: string;
    readDate?: string;
    inline?: boolean;
    attachment?: boolean;
    formData?: boolean;
};
export type HttpHeaders = {
    date?: number;
    contentType?: MediaType;
    contentLength?: number;
    ifModifiedSince?: number;
    lastModified?: number;
    connection?: Array<(string)>;
    empty?: boolean;
    location?: string;
    host?: {
        hostString?: string;
        address?: {
            address?: Array<(string)>;
            hostAddress?: string;
            hostName?: string;
            multicastAddress?: boolean;
            anyLocalAddress?: boolean;
            linkLocalAddress?: boolean;
            siteLocalAddress?: boolean;
            mcglobal?: boolean;
            mcnodeLocal?: boolean;
            mclinkLocal?: boolean;
            mcsiteLocal?: boolean;
            mcorgLocal?: boolean;
            canonicalHostName?: string;
            loopbackAddress?: boolean;
        };
        port?: number;
        unresolved?: boolean;
        hostName?: string;
    };
    all?: {
        [key: string]: (string);
    };
    origin?: string;
    acceptLanguageAsLocales?: Array<{
        language?: string;
        script?: string;
        country?: string;
        variant?: string;
        extensionKeys?: Array<(string)>;
        unicodeLocaleAttributes?: Array<(string)>;
        unicodeLocaleKeys?: Array<(string)>;
        iso3Language?: string;
        iso3Country?: string;
        displayLanguage?: string;
        displayScript?: string;
        displayCountry?: string;
        displayVariant?: string;
        displayName?: string;
    }>;
    accessControlAllowCredentials?: boolean;
    accessControlAllowHeaders?: Array<(string)>;
    accessControlAllowMethods?: Array<('GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'TRACE')>;
    accessControlAllowOrigin?: string;
    accessControlExposeHeaders?: Array<(string)>;
    accessControlRequestHeaders?: Array<(string)>;
    accessControlRequestMethod?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'TRACE';
    cacheControl?: string;
    expires?: number;
    contentLanguage?: {
        language?: string;
        script?: string;
        country?: string;
        variant?: string;
        extensionKeys?: Array<(string)>;
        unicodeLocaleAttributes?: Array<(string)>;
        unicodeLocaleKeys?: Array<(string)>;
        iso3Language?: string;
        iso3Country?: string;
        displayLanguage?: string;
        displayScript?: string;
        displayCountry?: string;
        displayVariant?: string;
        displayName?: string;
    };
    allow?: Array<('GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'TRACE')>;
    etag?: string;
    range?: Array<HttpRange>;
    vary?: Array<(string)>;
    acceptPatch?: Array<MediaType>;
    accept?: Array<MediaType>;
    acceptLanguage?: Array<{
        range?: string;
        weight?: number;
    }>;
    accessControlMaxAge?: number;
    acceptCharset?: Array<{
        registered?: boolean;
    }>;
    basicAuth?: string;
    bearerAuth?: string;
    contentDisposition?: ContentDisposition;
    ifMatch?: Array<(string)>;
    ifNoneMatch?: Array<(string)>;
    ifUnmodifiedSince?: number;
    pragma?: string;
    upgrade?: string;
    [key: string]: (Array<string> | number | MediaType | string | boolean | unknown | HttpRange | ContentDisposition) | undefined;
};
export type accessControlRequestMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'TRACE';
export type HttpRange = {
    [key: string]: unknown;
};
export type MediaType = {
    type?: string;
    subtype?: string;
    parameters?: {
        [key: string]: (string);
    };
    qualityValue?: number;
    concrete?: boolean;
    charset?: {
        registered?: boolean;
    };
    wildcardType?: boolean;
    wildcardSubtype?: boolean;
    subtypeSuffix?: string;
};
export type ResponseEntityObject = {
    headers?: {
        date?: number;
        contentType?: MediaType;
        contentLength?: number;
        ifModifiedSince?: number;
        lastModified?: number;
        connection?: Array<(string)>;
        empty?: boolean;
        location?: string;
        host?: {
            hostString?: string;
            address?: {
                address?: Array<(string)>;
                hostAddress?: string;
                hostName?: string;
                multicastAddress?: boolean;
                anyLocalAddress?: boolean;
                linkLocalAddress?: boolean;
                siteLocalAddress?: boolean;
                mcglobal?: boolean;
                mcnodeLocal?: boolean;
                mclinkLocal?: boolean;
                mcsiteLocal?: boolean;
                mcorgLocal?: boolean;
                canonicalHostName?: string;
                loopbackAddress?: boolean;
            };
            port?: number;
            unresolved?: boolean;
            hostName?: string;
        };
        all?: {
            [key: string]: (string);
        };
        origin?: string;
        acceptLanguageAsLocales?: Array<{
            language?: string;
            script?: string;
            country?: string;
            variant?: string;
            extensionKeys?: Array<(string)>;
            unicodeLocaleAttributes?: Array<(string)>;
            unicodeLocaleKeys?: Array<(string)>;
            iso3Language?: string;
            iso3Country?: string;
            displayLanguage?: string;
            displayScript?: string;
            displayCountry?: string;
            displayVariant?: string;
            displayName?: string;
        }>;
        accessControlAllowCredentials?: boolean;
        accessControlAllowHeaders?: Array<(string)>;
        accessControlAllowMethods?: Array<('GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'TRACE')>;
        accessControlAllowOrigin?: string;
        accessControlExposeHeaders?: Array<(string)>;
        accessControlRequestHeaders?: Array<(string)>;
        accessControlRequestMethod?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'TRACE';
        cacheControl?: string;
        expires?: number;
        contentLanguage?: {
            language?: string;
            script?: string;
            country?: string;
            variant?: string;
            extensionKeys?: Array<(string)>;
            unicodeLocaleAttributes?: Array<(string)>;
            unicodeLocaleKeys?: Array<(string)>;
            iso3Language?: string;
            iso3Country?: string;
            displayLanguage?: string;
            displayScript?: string;
            displayCountry?: string;
            displayVariant?: string;
            displayName?: string;
        };
        allow?: Array<('GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'TRACE')>;
        etag?: string;
        range?: Array<HttpRange>;
        vary?: Array<(string)>;
        acceptPatch?: Array<MediaType>;
        accept?: Array<MediaType>;
        acceptLanguage?: Array<{
            range?: string;
            weight?: number;
        }>;
        accessControlMaxAge?: number;
        acceptCharset?: Array<{
            registered?: boolean;
        }>;
        basicAuth?: string;
        bearerAuth?: string;
        contentDisposition?: ContentDisposition;
        ifMatch?: Array<(string)>;
        ifNoneMatch?: Array<(string)>;
        ifUnmodifiedSince?: number;
        pragma?: string;
        upgrade?: string;
        [key: string]: (Array<string> | number | MediaType | string | boolean | unknown | HttpRange | ContentDisposition) | undefined;
    };
    body?: {
        [key: string]: unknown;
    };
    statusCode?: '100 CONTINUE' | '101 SWITCHING_PROTOCOLS' | '102 PROCESSING' | '103 CHECKPOINT' | '200 OK' | '201 CREATED' | '202 ACCEPTED' | '203 NON_AUTHORITATIVE_INFORMATION' | '204 NO_CONTENT' | '205 RESET_CONTENT' | '206 PARTIAL_CONTENT' | '207 MULTI_STATUS' | '208 ALREADY_REPORTED' | '226 IM_USED' | '300 MULTIPLE_CHOICES' | '301 MOVED_PERMANENTLY' | '302 FOUND' | '302 MOVED_TEMPORARILY' | '303 SEE_OTHER' | '304 NOT_MODIFIED' | '305 USE_PROXY' | '307 TEMPORARY_REDIRECT' | '308 PERMANENT_REDIRECT' | '400 BAD_REQUEST' | '401 UNAUTHORIZED' | '402 PAYMENT_REQUIRED' | '403 FORBIDDEN' | '404 NOT_FOUND' | '405 METHOD_NOT_ALLOWED' | '406 NOT_ACCEPTABLE' | '407 PROXY_AUTHENTICATION_REQUIRED' | '408 REQUEST_TIMEOUT' | '409 CONFLICT' | '410 GONE' | '411 LENGTH_REQUIRED' | '412 PRECONDITION_FAILED' | '413 PAYLOAD_TOO_LARGE' | '413 REQUEST_ENTITY_TOO_LARGE' | '414 URI_TOO_LONG' | '414 REQUEST_URI_TOO_LONG' | '415 UNSUPPORTED_MEDIA_TYPE' | '416 REQUESTED_RANGE_NOT_SATISFIABLE' | '417 EXPECTATION_FAILED' | '418 I_AM_A_TEAPOT' | '419 INSUFFICIENT_SPACE_ON_RESOURCE' | '420 METHOD_FAILURE' | '421 DESTINATION_LOCKED' | '422 UNPROCESSABLE_ENTITY' | '423 LOCKED' | '424 FAILED_DEPENDENCY' | '425 TOO_EARLY' | '426 UPGRADE_REQUIRED' | '428 PRECONDITION_REQUIRED' | '429 TOO_MANY_REQUESTS' | '431 REQUEST_HEADER_FIELDS_TOO_LARGE' | '451 UNAVAILABLE_FOR_LEGAL_REASONS' | '500 INTERNAL_SERVER_ERROR' | '501 NOT_IMPLEMENTED' | '502 BAD_GATEWAY' | '503 SERVICE_UNAVAILABLE' | '504 GATEWAY_TIMEOUT' | '505 HTTP_VERSION_NOT_SUPPORTED' | '506 VARIANT_ALSO_NEGOTIATES' | '507 INSUFFICIENT_STORAGE' | '508 LOOP_DETECTED' | '509 BANDWIDTH_LIMIT_EXCEEDED' | '510 NOT_EXTENDED' | '511 NETWORK_AUTHENTICATION_REQUIRED';
    statusCodeValue?: number;
};
export type statusCode = '100 CONTINUE' | '101 SWITCHING_PROTOCOLS' | '102 PROCESSING' | '103 CHECKPOINT' | '200 OK' | '201 CREATED' | '202 ACCEPTED' | '203 NON_AUTHORITATIVE_INFORMATION' | '204 NO_CONTENT' | '205 RESET_CONTENT' | '206 PARTIAL_CONTENT' | '207 MULTI_STATUS' | '208 ALREADY_REPORTED' | '226 IM_USED' | '300 MULTIPLE_CHOICES' | '301 MOVED_PERMANENTLY' | '302 FOUND' | '302 MOVED_TEMPORARILY' | '303 SEE_OTHER' | '304 NOT_MODIFIED' | '305 USE_PROXY' | '307 TEMPORARY_REDIRECT' | '308 PERMANENT_REDIRECT' | '400 BAD_REQUEST' | '401 UNAUTHORIZED' | '402 PAYMENT_REQUIRED' | '403 FORBIDDEN' | '404 NOT_FOUND' | '405 METHOD_NOT_ALLOWED' | '406 NOT_ACCEPTABLE' | '407 PROXY_AUTHENTICATION_REQUIRED' | '408 REQUEST_TIMEOUT' | '409 CONFLICT' | '410 GONE' | '411 LENGTH_REQUIRED' | '412 PRECONDITION_FAILED' | '413 PAYLOAD_TOO_LARGE' | '413 REQUEST_ENTITY_TOO_LARGE' | '414 URI_TOO_LONG' | '414 REQUEST_URI_TOO_LONG' | '415 UNSUPPORTED_MEDIA_TYPE' | '416 REQUESTED_RANGE_NOT_SATISFIABLE' | '417 EXPECTATION_FAILED' | '418 I_AM_A_TEAPOT' | '419 INSUFFICIENT_SPACE_ON_RESOURCE' | '420 METHOD_FAILURE' | '421 DESTINATION_LOCKED' | '422 UNPROCESSABLE_ENTITY' | '423 LOCKED' | '424 FAILED_DEPENDENCY' | '425 TOO_EARLY' | '426 UPGRADE_REQUIRED' | '428 PRECONDITION_REQUIRED' | '429 TOO_MANY_REQUESTS' | '431 REQUEST_HEADER_FIELDS_TOO_LARGE' | '451 UNAVAILABLE_FOR_LEGAL_REASONS' | '500 INTERNAL_SERVER_ERROR' | '501 NOT_IMPLEMENTED' | '502 BAD_GATEWAY' | '503 SERVICE_UNAVAILABLE' | '504 GATEWAY_TIMEOUT' | '505 HTTP_VERSION_NOT_SUPPORTED' | '506 VARIANT_ALSO_NEGOTIATES' | '507 INSUFFICIENT_STORAGE' | '508 LOOP_DETECTED' | '509 BANDWIDTH_LIMIT_EXCEEDED' | '510 NOT_EXTENDED' | '511 NETWORK_AUTHENTICATION_REQUIRED';
export type ReligionDTO = {
    id?: number;
    name?: string;
};
export type ContactInformationCreationDTO = {
    type: string;
    medium: string;
    personId?: number;
    addressId?: number;
    externalName?: string;
    content: string;
    comment?: string;
    secret?: boolean;
};
export type FindGroupMembersByIdData = {
    id: number;
};
export type FindGroupMembersByIdResponse = Array<GroupMemberDTO>;
export type FindGroupByIdData = {
    id: number;
};
export type FindGroupByIdResponse = GroupDTO;
export type FindAllGroupsResponse = Array<GroupDTO>;
export type FindCountryByIdxData = {
    id: number;
};
export type FindCountryByIdxResponse = CountryDTO;
export type FindAllCountriesResponse = Array<CountryDTO>;
export type FindAllDistrictsResponse = Array<CountyDTO>;
export type FindDistrictByIdData = {
    id: number;
};
export type FindDistrictByIdResponse = CountyDTO;
export type FindByIdData = {
    contactInformationId: number;
};
export type FindByIdResponse = ContactInformationDTO;
export type UpdateContactInformationData = {
    contactInformationId: number;
    requestBody?: ContactInformationDTO;
};
export type UpdateContactInformationResponse = ContactInformationDTO;
export type DeleteContactInformationData = {
    contactInformationId: number;
};
export type DeleteContactInformationResponse = ResponseEntityObject;
export type FindByAddressData = {
    addressId: number;
};
export type FindByAddressResponse = Array<ContactInformationDTO>;
export type FindByPersonData = {
    personId: number;
};
export type FindByPersonResponse = Array<ContactInformationDTO>;
export type CreateContactInformationData = {
    requestBody?: ContactInformationCreationDTO;
};
export type CreateContactInformationResponse = ResponseEntityObject;
export type FindAllPersonsResponse = Array<PersonDTO>;
export type CreatePersonData = {
    requestBody?: PersonCreationDTO;
};
export type CreatePersonResponse = SuccessResponse;
export type FindPersonData = {
    id: number;
};
export type FindPersonResponse = PersonDTO;
export type UpdatePersonData = {
    id: number;
    requestBody?: PersonUpdateDTO;
};
export type UpdatePersonResponse = SuccessResponse;
export type DeleteContactPersonMappingData = {
    childId: number;
    contactPersonMappingId: number;
};
export type DeleteContactPersonMappingResponse = unknown;
export type GetContactInformationMappingsData = {
    childId: number;
};
export type GetContactInformationMappingsResponse = Array<ContactInformationMappingDTO>;
export type CreateContactInformationMappingData = {
    childId: number;
    requestBody?: ContactInformationMappingDTO;
};
export type CreateContactInformationMappingResponse = ContactInformationMappingDTO;
export type GetContactPersonMappingsData = {
    childId: number;
};
export type GetContactPersonMappingsResponse = Array<ContactPersonMappingDTO>;
export type CreateContactPersonMappingData = {
    childId: number;
    requestBody?: ContactPersonMappingDTO;
};
export type CreateContactPersonMappingResponse = ContactPersonMappingDTO;
export type DeleteContactInformationMappingData = {
    childId: number;
    contactInformationMappingId: number;
};
export type DeleteContactInformationMappingResponse = unknown;
export type FindAddressByIdData = {
    id: number;
};
export type FindAddressByIdResponse = AddressDTO;
export type UpdateAddressData = {
    id: number;
    requestBody?: AddressDTO;
};
export type UpdateAddressResponse = AddressDTO;
export type FindAllAddressesResponse = Array<AddressDTO>;
export type CreateAddressData = {
    requestBody?: AddressCreationDTO;
};
export type CreateAddressResponse = AddressDTO;
export type FindAllFamiliesResponse = Array<FamilyDTO>;
export type FindFamilyByIdData = {
    id: number;
};
export type FindFamilyByIdResponse = FamilyDTO;
export type GetHealthResponse = HealthDTO;
export type FindRelationshipsForPersonData = {
    personId: number;
};
export type FindRelationshipsForPersonResponse = Array<RelationshipDTO>;
export type FindAllReligionsResponse = Array<ReligionDTO>;
export type $OpenApiTs = {
    '/groups/{id}/members': {
        get: {
            req: FindGroupMembersByIdData;
            res: {
                /**
                 * default response
                 */
                200: Array<GroupMemberDTO>;
            };
        };
    };
    '/groups/{id}': {
        get: {
            req: FindGroupByIdData;
            res: {
                /**
                 * default response
                 */
                200: GroupDTO;
            };
        };
    };
    '/groups': {
        get: {
            res: {
                /**
                 * default response
                 */
                200: Array<GroupDTO>;
            };
        };
    };
    '/countries/{id}': {
        get: {
            req: FindCountryByIdxData;
            res: {
                /**
                 * default response
                 */
                200: CountryDTO;
            };
        };
    };
    '/countries': {
        get: {
            res: {
                /**
                 * default response
                 */
                200: Array<CountryDTO>;
            };
        };
    };
    '/districts': {
        get: {
            res: {
                /**
                 * default response
                 */
                200: Array<CountyDTO>;
            };
        };
    };
    '/districts/{id}': {
        get: {
            req: FindDistrictByIdData;
            res: {
                /**
                 * default response
                 */
                200: CountyDTO;
            };
        };
    };
    '/contactinformation/{contactInformationId}': {
        get: {
            req: FindByIdData;
            res: {
                /**
                 * default response
                 */
                200: ContactInformationDTO;
            };
        };
        put: {
            req: UpdateContactInformationData;
            res: {
                /**
                 * default response
                 */
                200: ContactInformationDTO;
            };
        };
        delete: {
            req: DeleteContactInformationData;
            res: {
                /**
                 * default response
                 */
                200: ResponseEntityObject;
            };
        };
    };
    '/contactinformation/address/{addressId}': {
        get: {
            req: FindByAddressData;
            res: {
                /**
                 * default response
                 */
                200: Array<ContactInformationDTO>;
            };
        };
    };
    '/contactinformation/person/{personId}': {
        get: {
            req: FindByPersonData;
            res: {
                /**
                 * default response
                 */
                200: Array<ContactInformationDTO>;
            };
        };
    };
    '/contactinformation': {
        post: {
            req: CreateContactInformationData;
            res: {
                /**
                 * default response
                 */
                200: ResponseEntityObject;
            };
        };
    };
    '/persons': {
        get: {
            res: {
                /**
                 * default response
                 */
                200: Array<PersonDTO>;
            };
        };
        post: {
            req: CreatePersonData;
            res: {
                /**
                 * default response
                 */
                200: SuccessResponse;
            };
        };
    };
    '/persons/{id}': {
        get: {
            req: FindPersonData;
            res: {
                /**
                 * default response
                 */
                200: PersonDTO;
            };
        };
        put: {
            req: UpdatePersonData;
            res: {
                /**
                 * default response
                 */
                200: SuccessResponse;
            };
        };
    };
    '/communication/child/{childId}/persons/{contactPersonMappingId}': {
        delete: {
            req: DeleteContactPersonMappingData;
            res: {
                /**
                 * default response
                 */
                200: unknown;
            };
        };
    };
    '/communication/child/{childId}/information': {
        get: {
            req: GetContactInformationMappingsData;
            res: {
                /**
                 * default response
                 */
                200: Array<ContactInformationMappingDTO>;
            };
        };
        post: {
            req: CreateContactInformationMappingData;
            res: {
                /**
                 * default response
                 */
                200: ContactInformationMappingDTO;
            };
        };
    };
    '/communication/child/{childId}/persons': {
        get: {
            req: GetContactPersonMappingsData;
            res: {
                /**
                 * default response
                 */
                200: Array<ContactPersonMappingDTO>;
            };
        };
        post: {
            req: CreateContactPersonMappingData;
            res: {
                /**
                 * default response
                 */
                200: ContactPersonMappingDTO;
            };
        };
    };
    '/communication/child/{childId}/information/{contactInformationMappingId}': {
        delete: {
            req: DeleteContactInformationMappingData;
            res: {
                /**
                 * default response
                 */
                200: unknown;
            };
        };
    };
    '/addresses/{id}': {
        get: {
            req: FindAddressByIdData;
            res: {
                /**
                 * default response
                 */
                200: AddressDTO;
            };
        };
        put: {
            req: UpdateAddressData;
            res: {
                /**
                 * default response
                 */
                200: AddressDTO;
            };
        };
    };
    '/addresses': {
        get: {
            res: {
                /**
                 * default response
                 */
                200: Array<AddressDTO>;
            };
        };
        post: {
            req: CreateAddressData;
            res: {
                /**
                 * default response
                 */
                200: AddressDTO;
            };
        };
    };
    '/families': {
        get: {
            res: {
                /**
                 * default response
                 */
                200: Array<FamilyDTO>;
            };
        };
    };
    '/families/{id}': {
        get: {
            req: FindFamilyByIdData;
            res: {
                /**
                 * default response
                 */
                200: FamilyDTO;
            };
        };
    };
    '/health': {
        get: {
            res: {
                /**
                 * default response
                 */
                200: HealthDTO;
            };
        };
    };
    '/relationships/person/{personId}': {
        get: {
            req: FindRelationshipsForPersonData;
            res: {
                /**
                 * default response
                 */
                200: Array<RelationshipDTO>;
            };
        };
    };
    '/religions': {
        get: {
            res: {
                /**
                 * default response
                 */
                200: Array<ReligionDTO>;
            };
        };
    };
};