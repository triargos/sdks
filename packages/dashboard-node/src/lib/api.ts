/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/api/v1/organizations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Return a list of organizations */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id: string;
                            name: string;
                            active: boolean;
                            slug: string | null;
                            createdAt: string;
                            updatedAt: string;
                            logoUrl: string | null;
                        }[];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/organizations/{organizationId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Return a single organization */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id: string;
                            name: string;
                            active: boolean;
                            slug: string | null;
                            createdAt: string;
                            updatedAt: string;
                            logoUrl: string | null;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/organizations/{organizationId}/persons": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Return a list of persons */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id: number;
                            firstName?: string | null;
                            lastName?: string | null;
                            /** @enum {string|null} */
                            gender: "male" | "female" | "other" | null;
                            addressId?: number | null;
                            familyId?: number | null;
                            /** @enum {string|null} */
                            familyRole: "father" | "mother" | "child" | "etc" | null;
                            birthDate?: string | null;
                            birthPlace?: string | null;
                            birthCountryId?: number | null;
                            languageId?: number | null;
                            religionId?: number | null;
                            allFirstNames?: string | null;
                            email?: string | null;
                            birthName?: string | null;
                            academicTitle?: string | null;
                            namePrefix?: string | null;
                            nobilityTitle?: string | null;
                            salutationA?: string | null;
                            salutationB?: string | null;
                            jobTitle?: string | null;
                            comment?: string | null;
                            nationalityId?: number | null;
                            maritalStatus?: string | null;
                            deathDate?: string | null;
                            address: {
                                id: number;
                                street?: string | null;
                                countryId?: number | null;
                                zip?: string | null;
                                city?: string | null;
                                nameline2?: string | null;
                                additional?: string | null;
                                district?: string | null;
                                poBoxZip?: string | null;
                                poBox?: string | null;
                                countyId?: number | null;
                            } | null;
                            businessEmail: string | null;
                        }[];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/organizations/{organizationId}/persons/{personId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: string;
                    personId: number | null;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Return a single person */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id: number;
                            firstName?: string | null;
                            lastName?: string | null;
                            /** @enum {string|null} */
                            gender: "male" | "female" | "other" | null;
                            addressId?: number | null;
                            familyId?: number | null;
                            /** @enum {string|null} */
                            familyRole: "father" | "mother" | "child" | "etc" | null;
                            birthDate?: string | null;
                            birthPlace?: string | null;
                            birthCountryId?: number | null;
                            languageId?: number | null;
                            religionId?: number | null;
                            allFirstNames?: string | null;
                            email?: string | null;
                            birthName?: string | null;
                            academicTitle?: string | null;
                            namePrefix?: string | null;
                            nobilityTitle?: string | null;
                            salutationA?: string | null;
                            salutationB?: string | null;
                            jobTitle?: string | null;
                            comment?: string | null;
                            nationalityId?: number | null;
                            maritalStatus?: string | null;
                            deathDate?: string | null;
                            address: {
                                id: number;
                                street?: string | null;
                                countryId?: number | null;
                                zip?: string | null;
                                city?: string | null;
                                nameline2?: string | null;
                                additional?: string | null;
                                district?: string | null;
                                poBoxZip?: string | null;
                                poBox?: string | null;
                                countyId?: number | null;
                            } | null;
                            businessEmail: string | null;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/organizations/{organizationId}/persons/{personId}/relationships": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: string;
                    personId: number | null;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Returns a list of relationships for a person */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            personId: number;
                            /** @enum {string} */
                            relationShipType?: "daughter" | "other" | "father" | "child" | "son" | "mother";
                            physical: boolean;
                            custody: boolean;
                            realParent: boolean;
                            notes: string | null;
                        }[];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/organizations/{organizationId}/groups": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Return a list of all groups */
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
                            grades: number[] | null;
                            schoolYear: string | null;
                            /** @enum {string|null} */
                            additionalType: "classFacility" | null;
                            sortKey: number | null;
                        }[];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/organizations/{organizationId}/groups/{groupId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: string;
                    groupId: number | null;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Return a single group */
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
                            grades: number[] | null;
                            schoolYear: string | null;
                            /** @enum {string|null} */
                            additionalType: "classFacility" | null;
                            sortKey: number | null;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/organizations/{organizationId}/groups/{groupId}/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: string;
                    groupId: number | null;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Return a list of members of a group */
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
                            grade: number | null;
                        }[];
                    };
                };
            };
        };
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
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
