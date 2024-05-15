export type AddressDTO = {
    id?: number;
    street?: string;
    zip?: string;
    city?: string;
    additional?: string;
    po?: string;
    poZip?: string;
    district?: string;
    country?: string;
    locality?: string;
};
export type PersonDTO = {
    id?: number;
    firstName?: string | null;
    allFirstNames?: string | null;
    lastName?: string;
    academicTitle?: string | null;
    birthDate?: string | null;
    addressId?: number;
    familyId?: number;
    familyRole?: string;
    gender?: string;
    placeOfBirth?: string;
    nationality?: string;
    countryOfOrigin?: string;
    religion?: string;
    email?: string;
    salutation?: string;
    prefix?: string;
};
export type CreatePersonDTO = {
    id?: number;
    firstName?: string | null;
    allFirstNames?: string | null;
    lastName?: string;
    academicTitle?: string | null;
    birthDate?: string | null;
    addressId?: number;
    familyId?: number;
    familyRole?: string;
    gender?: string;
    placeOfBirth?: string;
    nationality?: string;
    countryOfOrigin?: string;
    religion?: string;
    email?: string;
    salutation?: string;
    prefix?: string;
    mobilePhone?: string;
    householdPhone?: string;
    businessPhone?: string;
    street?: string;
    country?: string;
    zipCode?: string;
    city?: string;
};
export type SuccessResponse = {
    code?: number;
    message?: string;
};
export type ReligionDTO = {
    name?: string;
};
export type DistrictDTO = {
    name: string;
};
export type CreateAddressDTO = {
    personId?: number;
    street?: string;
    zip?: string;
    city?: string;
    additional?: string;
    po?: string;
    poZip?: string;
    district?: string;
    country?: string;
};
export type GroupDTO = {
    id: number;
    name: string;
    type: string;
    grade?: string;
    character?: string;
    schoolYear?: string;
};
export type CountryDTO = {
    name: string;
    iso: string;
};
export type RelationshipDTO = {
    personId?: number;
    relationshipType?: string;
    physical?: boolean;
    custody?: boolean;
    realParent?: boolean;
    notes?: string;
};
export type GroupMembershipDTO = {
    id?: number;
    entry?: string;
    exit?: string;
};
export type $OpenApiTs = {
    '/addresses/{id}': {
        get: {
            req: {
                id: number;
            };
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
            req: {
                requestBody?: CreateAddressDTO;
            };
            res: {
                /**
                 * default response
                 */
                200: AddressDTO;
            };
        };
    };
    '/persons/{id}': {
        get: {
            req: {
                id: number;
            };
            res: {
                /**
                 * default response
                 */
                200: PersonDTO;
            };
        };
        put: {
            req: {
                id: number;
                requestBody?: PersonDTO;
            };
            res: {
                /**
                 * default response
                 */
                200: SuccessResponse;
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
            req: {
                requestBody?: CreatePersonDTO;
            };
            res: {
                /**
                 * default response
                 */
                200: SuccessResponse;
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
    '/districts': {
        get: {
            res: {
                /**
                 * default response
                 */
                200: Array<DistrictDTO>;
            };
        };
    };
    '/groups/{id}': {
        get: {
            req: {
                id: number;
            };
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
    '/groups/{id}/members': {
        get: {
            req: {
                id: number;
            };
            res: {
                /**
                 * default response
                 */
                200: Array<GroupMembershipDTO>;
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
    '/relationships/person/{personId}': {
        get: {
            req: {
                personId: number;
            };
            res: {
                /**
                 * default response
                 */
                200: Array<RelationshipDTO>;
            };
        };
    };
};
