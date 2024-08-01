export declare const $GroupMemberDTO: {
    readonly type: "object";
    readonly properties: {
        readonly personId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly entryDate: {
            readonly type: "string";
        };
        readonly exitDate: {
            readonly type: "string";
        };
    };
};
export declare const $CountryDTO: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly idx: {
            readonly type: "string";
        };
        readonly iso: {
            readonly type: "string";
        };
    };
};
export declare const $CountyDTO: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly name: {
            readonly type: "string";
        };
    };
};
export declare const $ContactInformationDTO: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly order: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly type: {
            readonly type: "string";
        };
        readonly medium: {
            readonly type: "string";
        };
        readonly personId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly addressId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly externalName: {
            readonly type: "string";
        };
        readonly content: {
            readonly type: "string";
        };
        readonly comment: {
            readonly type: "string";
        };
        readonly secret: {
            readonly type: "boolean";
        };
    };
};
export declare const $PersonCreationDTO: {
    readonly type: "object";
    readonly properties: {
        readonly firstName: {
            readonly type: "string";
        };
        readonly lastName: {
            readonly type: "string";
        };
        readonly gender: {
            readonly type: "string";
        };
        readonly addressId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly familyId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly familyRole: {
            readonly type: "string";
        };
        readonly birthDate: {
            readonly type: "string";
        };
        readonly birthPlace: {
            readonly type: "string";
        };
        readonly birthCountryId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly languageId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly religionId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly allFirstNames: {
            readonly type: "string";
        };
        readonly birthName: {
            readonly type: "string";
        };
        readonly academicTitle: {
            readonly type: "string";
        };
        readonly namePrefix: {
            readonly type: "string";
        };
        readonly nobilityTitle: {
            readonly type: "string";
        };
        readonly salutationA: {
            readonly type: "string";
        };
        readonly salutationB: {
            readonly type: "string";
        };
        readonly jobTitle: {
            readonly type: "string";
        };
        readonly nationalityId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly maritalStatus: {
            readonly type: "string";
        };
        readonly deathDate: {
            readonly type: "string";
        };
    };
};
export declare const $SuccessResponse: {
    readonly type: "object";
    readonly properties: {
        readonly code: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly message: {
            readonly type: "string";
        };
    };
};
export declare const $AddressDTO: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly street: {
            readonly type: "string";
        };
        readonly countryId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly zip: {
            readonly type: "string";
        };
        readonly city: {
            readonly type: "string";
        };
        readonly nameline2: {
            readonly type: "string";
        };
        readonly additional: {
            readonly type: "string";
        };
        readonly district: {
            readonly type: "string";
        };
        readonly poBoxZip: {
            readonly type: "string";
        };
        readonly poBox: {
            readonly type: "string";
        };
        readonly countyId: {
            readonly type: "integer";
            readonly format: "int32";
        };
    };
};
export declare const $FamilyDTO: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly members: {
            readonly type: "array";
            readonly items: {
                readonly type: "integer";
                readonly format: "int32";
            };
        };
    };
};
export declare const $ContactInformationMappingDTO: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly childId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly contactInfoId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly emergencyPriority: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly isOnList: {
            readonly type: "boolean";
        };
    };
};
export declare const $PersonUpdateDTO: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly firstName: {
            readonly type: "string";
        };
        readonly lastName: {
            readonly type: "string";
        };
        readonly gender: {
            readonly type: "string";
        };
        readonly birthDate: {
            readonly type: "string";
        };
        readonly birthPlace: {
            readonly type: "string";
        };
        readonly birthCountryId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly languageId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly religionId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly allFirstNames: {
            readonly type: "string";
        };
        readonly birthName: {
            readonly type: "string";
        };
        readonly academicTitle: {
            readonly type: "string";
        };
        readonly namePrefix: {
            readonly type: "string";
        };
        readonly nobilityTitle: {
            readonly type: "string";
        };
        readonly salutationA: {
            readonly type: "string";
        };
        readonly salutationB: {
            readonly type: "string";
        };
        readonly jobTitle: {
            readonly type: "string";
        };
        readonly comment: {
            readonly type: "string";
        };
        readonly nationalityId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly maritalStatus: {
            readonly type: "string";
        };
    };
};
export declare const $ContactPersonMappingDTO: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly childId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly parentId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly isEmergency: {
            readonly type: "boolean";
        };
        readonly includeAddressOnList: {
            readonly type: "boolean";
        };
        readonly includeHomePhoneOnList: {
            readonly type: "boolean";
        };
    };
};
export declare const $GroupDTO: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly name: {
            readonly type: "string";
        };
        readonly type: {
            readonly type: "string";
        };
        readonly grade: {
            readonly type: "string";
        };
        readonly character: {
            readonly type: "string";
        };
        readonly schoolYear: {
            readonly type: "string";
        };
    };
};
export declare const $AddressCreationDTO: {
    readonly type: "object";
    readonly properties: {
        readonly personId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly street: {
            readonly type: "string";
        };
        readonly countryId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly zip: {
            readonly type: "string";
        };
        readonly city: {
            readonly type: "string";
        };
        readonly nameline2: {
            readonly type: "string";
        };
        readonly additional: {
            readonly type: "string";
        };
        readonly district: {
            readonly type: "string";
        };
        readonly poBoxZip: {
            readonly type: "string";
        };
        readonly poBox: {
            readonly type: "string";
        };
        readonly countyId: {
            readonly type: "integer";
            readonly format: "int32";
        };
    };
};
export declare const $HealthDTO: {
    readonly type: "object";
    readonly properties: {
        readonly databaseVersion: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly build: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly databaseValid: {
            readonly type: "boolean";
        };
        readonly databaseLocked: {
            readonly type: "boolean";
        };
        readonly lastUpdateStart: {
            readonly type: "string";
        };
        readonly lastUpdateEnd: {
            readonly type: "string";
        };
        readonly lastUpdateFailed: {
            readonly type: "string";
        };
    };
};
export declare const $RelationshipDTO: {
    readonly type: "object";
    readonly properties: {
        readonly personId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly relationshipType: {
            readonly type: "string";
        };
        readonly physical: {
            readonly type: "boolean";
        };
        readonly custody: {
            readonly type: "boolean";
        };
        readonly realParent: {
            readonly type: "boolean";
        };
        readonly notes: {
            readonly type: "string";
        };
    };
};
export declare const $PersonDTO: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly firstName: {
            readonly type: "string";
        };
        readonly lastName: {
            readonly type: "string";
        };
        readonly gender: {
            readonly type: "string";
        };
        readonly addressId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly familyId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly familyRole: {
            readonly type: "string";
        };
        readonly birthDate: {
            readonly type: "string";
        };
        readonly birthPlace: {
            readonly type: "string";
        };
        readonly birthCountryId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly languageId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly religionId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly allFirstNames: {
            readonly type: "string";
        };
        readonly birthName: {
            readonly type: "string";
        };
        readonly academicTitle: {
            readonly type: "string";
        };
        readonly namePrefix: {
            readonly type: "string";
        };
        readonly nobilityTitle: {
            readonly type: "string";
        };
        readonly salutationA: {
            readonly type: "string";
        };
        readonly salutationB: {
            readonly type: "string";
        };
        readonly jobTitle: {
            readonly type: "string";
        };
        readonly comment: {
            readonly type: "string";
        };
        readonly nationalityId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly maritalStatus: {
            readonly type: "string";
        };
        readonly deathDate: {
            readonly type: "string";
        };
    };
};
export declare const $ContentDisposition: {
    readonly type: "object";
    readonly properties: {
        readonly type: {
            readonly type: "string";
        };
        readonly name: {
            readonly type: "string";
        };
        readonly filename: {
            readonly type: "string";
        };
        readonly charset: {
            readonly type: "object";
            readonly properties: {
                readonly registered: {
                    readonly type: "boolean";
                };
            };
        };
        readonly size: {
            readonly type: "integer";
            readonly format: "int64";
        };
        readonly creationDate: {
            readonly type: "string";
            readonly format: "date-time";
        };
        readonly modificationDate: {
            readonly type: "string";
            readonly format: "date-time";
        };
        readonly readDate: {
            readonly type: "string";
            readonly format: "date-time";
        };
        readonly inline: {
            readonly type: "boolean";
        };
        readonly attachment: {
            readonly type: "boolean";
        };
        readonly formData: {
            readonly type: "boolean";
        };
    };
};
export declare const $HttpHeaders: {
    readonly type: "object";
    readonly properties: {
        readonly date: {
            readonly type: "integer";
            readonly format: "int64";
        };
        readonly contentType: {
            readonly $ref: "#/components/schemas/MediaType";
        };
        readonly contentLength: {
            readonly type: "integer";
            readonly format: "int64";
        };
        readonly ifModifiedSince: {
            readonly type: "integer";
            readonly format: "int64";
        };
        readonly lastModified: {
            readonly type: "integer";
            readonly format: "int64";
        };
        readonly connection: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly empty: {
            readonly type: "boolean";
        };
        readonly location: {
            readonly type: "string";
            readonly format: "uri";
        };
        readonly host: {
            readonly type: "object";
            readonly properties: {
                readonly hostString: {
                    readonly type: "string";
                };
                readonly address: {
                    readonly type: "object";
                    readonly properties: {
                        readonly address: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly format: "byte";
                            };
                        };
                        readonly hostAddress: {
                            readonly type: "string";
                        };
                        readonly hostName: {
                            readonly type: "string";
                        };
                        readonly multicastAddress: {
                            readonly type: "boolean";
                        };
                        readonly anyLocalAddress: {
                            readonly type: "boolean";
                        };
                        readonly linkLocalAddress: {
                            readonly type: "boolean";
                        };
                        readonly siteLocalAddress: {
                            readonly type: "boolean";
                        };
                        readonly mcglobal: {
                            readonly type: "boolean";
                        };
                        readonly mcnodeLocal: {
                            readonly type: "boolean";
                        };
                        readonly mclinkLocal: {
                            readonly type: "boolean";
                        };
                        readonly mcsiteLocal: {
                            readonly type: "boolean";
                        };
                        readonly mcorgLocal: {
                            readonly type: "boolean";
                        };
                        readonly canonicalHostName: {
                            readonly type: "string";
                        };
                        readonly loopbackAddress: {
                            readonly type: "boolean";
                        };
                    };
                };
                readonly port: {
                    readonly type: "integer";
                    readonly format: "int32";
                };
                readonly unresolved: {
                    readonly type: "boolean";
                };
                readonly hostName: {
                    readonly type: "string";
                };
            };
        };
        readonly all: {
            readonly type: "object";
            readonly additionalProperties: {
                readonly type: "string";
            };
            readonly writeOnly: true;
        };
        readonly origin: {
            readonly type: "string";
        };
        readonly acceptLanguageAsLocales: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly language: {
                        readonly type: "string";
                    };
                    readonly script: {
                        readonly type: "string";
                    };
                    readonly country: {
                        readonly type: "string";
                    };
                    readonly variant: {
                        readonly type: "string";
                    };
                    readonly extensionKeys: {
                        readonly uniqueItems: true;
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly unicodeLocaleAttributes: {
                        readonly uniqueItems: true;
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly unicodeLocaleKeys: {
                        readonly uniqueItems: true;
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly iso3Language: {
                        readonly type: "string";
                    };
                    readonly iso3Country: {
                        readonly type: "string";
                    };
                    readonly displayLanguage: {
                        readonly type: "string";
                    };
                    readonly displayScript: {
                        readonly type: "string";
                    };
                    readonly displayCountry: {
                        readonly type: "string";
                    };
                    readonly displayVariant: {
                        readonly type: "string";
                    };
                    readonly displayName: {
                        readonly type: "string";
                    };
                };
            };
        };
        readonly accessControlAllowCredentials: {
            readonly type: "boolean";
        };
        readonly accessControlAllowHeaders: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly accessControlAllowMethods: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly enum: readonly ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "TRACE"];
            };
        };
        readonly accessControlAllowOrigin: {
            readonly type: "string";
        };
        readonly accessControlExposeHeaders: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly accessControlRequestHeaders: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly accessControlRequestMethod: {
            readonly type: "string";
            readonly enum: readonly ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "TRACE"];
        };
        readonly cacheControl: {
            readonly type: "string";
        };
        readonly expires: {
            readonly type: "integer";
            readonly format: "int64";
        };
        readonly contentLanguage: {
            readonly type: "object";
            readonly properties: {
                readonly language: {
                    readonly type: "string";
                };
                readonly script: {
                    readonly type: "string";
                };
                readonly country: {
                    readonly type: "string";
                };
                readonly variant: {
                    readonly type: "string";
                };
                readonly extensionKeys: {
                    readonly uniqueItems: true;
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly unicodeLocaleAttributes: {
                    readonly uniqueItems: true;
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly unicodeLocaleKeys: {
                    readonly uniqueItems: true;
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly iso3Language: {
                    readonly type: "string";
                };
                readonly iso3Country: {
                    readonly type: "string";
                };
                readonly displayLanguage: {
                    readonly type: "string";
                };
                readonly displayScript: {
                    readonly type: "string";
                };
                readonly displayCountry: {
                    readonly type: "string";
                };
                readonly displayVariant: {
                    readonly type: "string";
                };
                readonly displayName: {
                    readonly type: "string";
                };
            };
        };
        readonly allow: {
            readonly uniqueItems: true;
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly enum: readonly ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "TRACE"];
            };
        };
        readonly etag: {
            readonly type: "string";
        };
        readonly range: {
            readonly type: "array";
            readonly items: {
                readonly $ref: "#/components/schemas/HttpRange";
            };
        };
        readonly vary: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly acceptPatch: {
            readonly type: "array";
            readonly items: {
                readonly $ref: "#/components/schemas/MediaType";
            };
        };
        readonly accept: {
            readonly type: "array";
            readonly items: {
                readonly $ref: "#/components/schemas/MediaType";
            };
        };
        readonly acceptLanguage: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly range: {
                        readonly type: "string";
                    };
                    readonly weight: {
                        readonly type: "number";
                        readonly format: "double";
                    };
                };
            };
        };
        readonly accessControlMaxAge: {
            readonly type: "integer";
            readonly format: "int64";
        };
        readonly acceptCharset: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly registered: {
                        readonly type: "boolean";
                    };
                };
            };
        };
        readonly basicAuth: {
            readonly type: "string";
            readonly writeOnly: true;
        };
        readonly bearerAuth: {
            readonly type: "string";
            readonly writeOnly: true;
        };
        readonly contentDisposition: {
            readonly $ref: "#/components/schemas/ContentDisposition";
        };
        readonly ifMatch: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly ifNoneMatch: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly ifUnmodifiedSince: {
            readonly type: "integer";
            readonly format: "int64";
        };
        readonly pragma: {
            readonly type: "string";
        };
        readonly upgrade: {
            readonly type: "string";
        };
    };
    readonly additionalProperties: {
        readonly type: "array";
        readonly items: {
            readonly type: "string";
        };
    };
};
export declare const $HttpRange: {
    readonly type: "object";
};
export declare const $MediaType: {
    readonly type: "object";
    readonly properties: {
        readonly type: {
            readonly type: "string";
        };
        readonly subtype: {
            readonly type: "string";
        };
        readonly parameters: {
            readonly type: "object";
            readonly additionalProperties: {
                readonly type: "string";
            };
        };
        readonly qualityValue: {
            readonly type: "number";
            readonly format: "double";
        };
        readonly concrete: {
            readonly type: "boolean";
        };
        readonly charset: {
            readonly type: "object";
            readonly properties: {
                readonly registered: {
                    readonly type: "boolean";
                };
            };
        };
        readonly wildcardType: {
            readonly type: "boolean";
        };
        readonly wildcardSubtype: {
            readonly type: "boolean";
        };
        readonly subtypeSuffix: {
            readonly type: "string";
        };
    };
};
export declare const $ResponseEntityObject: {
    readonly type: "object";
    readonly properties: {
        readonly headers: {
            readonly type: "object";
            readonly properties: {
                readonly date: {
                    readonly type: "integer";
                    readonly format: "int64";
                };
                readonly contentType: {
                    readonly $ref: "#/components/schemas/MediaType";
                };
                readonly contentLength: {
                    readonly type: "integer";
                    readonly format: "int64";
                };
                readonly ifModifiedSince: {
                    readonly type: "integer";
                    readonly format: "int64";
                };
                readonly lastModified: {
                    readonly type: "integer";
                    readonly format: "int64";
                };
                readonly connection: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly empty: {
                    readonly type: "boolean";
                };
                readonly location: {
                    readonly type: "string";
                    readonly format: "uri";
                };
                readonly host: {
                    readonly type: "object";
                    readonly properties: {
                        readonly hostString: {
                            readonly type: "string";
                        };
                        readonly address: {
                            readonly type: "object";
                            readonly properties: {
                                readonly address: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly format: "byte";
                                    };
                                };
                                readonly hostAddress: {
                                    readonly type: "string";
                                };
                                readonly hostName: {
                                    readonly type: "string";
                                };
                                readonly multicastAddress: {
                                    readonly type: "boolean";
                                };
                                readonly anyLocalAddress: {
                                    readonly type: "boolean";
                                };
                                readonly linkLocalAddress: {
                                    readonly type: "boolean";
                                };
                                readonly siteLocalAddress: {
                                    readonly type: "boolean";
                                };
                                readonly mcglobal: {
                                    readonly type: "boolean";
                                };
                                readonly mcnodeLocal: {
                                    readonly type: "boolean";
                                };
                                readonly mclinkLocal: {
                                    readonly type: "boolean";
                                };
                                readonly mcsiteLocal: {
                                    readonly type: "boolean";
                                };
                                readonly mcorgLocal: {
                                    readonly type: "boolean";
                                };
                                readonly canonicalHostName: {
                                    readonly type: "string";
                                };
                                readonly loopbackAddress: {
                                    readonly type: "boolean";
                                };
                            };
                        };
                        readonly port: {
                            readonly type: "integer";
                            readonly format: "int32";
                        };
                        readonly unresolved: {
                            readonly type: "boolean";
                        };
                        readonly hostName: {
                            readonly type: "string";
                        };
                    };
                };
                readonly all: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "string";
                    };
                    readonly writeOnly: true;
                };
                readonly origin: {
                    readonly type: "string";
                };
                readonly acceptLanguageAsLocales: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly language: {
                                readonly type: "string";
                            };
                            readonly script: {
                                readonly type: "string";
                            };
                            readonly country: {
                                readonly type: "string";
                            };
                            readonly variant: {
                                readonly type: "string";
                            };
                            readonly extensionKeys: {
                                readonly uniqueItems: true;
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly unicodeLocaleAttributes: {
                                readonly uniqueItems: true;
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly unicodeLocaleKeys: {
                                readonly uniqueItems: true;
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly iso3Language: {
                                readonly type: "string";
                            };
                            readonly iso3Country: {
                                readonly type: "string";
                            };
                            readonly displayLanguage: {
                                readonly type: "string";
                            };
                            readonly displayScript: {
                                readonly type: "string";
                            };
                            readonly displayCountry: {
                                readonly type: "string";
                            };
                            readonly displayVariant: {
                                readonly type: "string";
                            };
                            readonly displayName: {
                                readonly type: "string";
                            };
                        };
                    };
                };
                readonly accessControlAllowCredentials: {
                    readonly type: "boolean";
                };
                readonly accessControlAllowHeaders: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly accessControlAllowMethods: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly enum: readonly ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "TRACE"];
                    };
                };
                readonly accessControlAllowOrigin: {
                    readonly type: "string";
                };
                readonly accessControlExposeHeaders: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly accessControlRequestHeaders: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly accessControlRequestMethod: {
                    readonly type: "string";
                    readonly enum: readonly ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "TRACE"];
                };
                readonly cacheControl: {
                    readonly type: "string";
                };
                readonly expires: {
                    readonly type: "integer";
                    readonly format: "int64";
                };
                readonly contentLanguage: {
                    readonly type: "object";
                    readonly properties: {
                        readonly language: {
                            readonly type: "string";
                        };
                        readonly script: {
                            readonly type: "string";
                        };
                        readonly country: {
                            readonly type: "string";
                        };
                        readonly variant: {
                            readonly type: "string";
                        };
                        readonly extensionKeys: {
                            readonly uniqueItems: true;
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly unicodeLocaleAttributes: {
                            readonly uniqueItems: true;
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly unicodeLocaleKeys: {
                            readonly uniqueItems: true;
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly iso3Language: {
                            readonly type: "string";
                        };
                        readonly iso3Country: {
                            readonly type: "string";
                        };
                        readonly displayLanguage: {
                            readonly type: "string";
                        };
                        readonly displayScript: {
                            readonly type: "string";
                        };
                        readonly displayCountry: {
                            readonly type: "string";
                        };
                        readonly displayVariant: {
                            readonly type: "string";
                        };
                        readonly displayName: {
                            readonly type: "string";
                        };
                    };
                };
                readonly allow: {
                    readonly uniqueItems: true;
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly enum: readonly ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "TRACE"];
                    };
                };
                readonly etag: {
                    readonly type: "string";
                };
                readonly range: {
                    readonly type: "array";
                    readonly items: {
                        readonly $ref: "#/components/schemas/HttpRange";
                    };
                };
                readonly vary: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly acceptPatch: {
                    readonly type: "array";
                    readonly items: {
                        readonly $ref: "#/components/schemas/MediaType";
                    };
                };
                readonly accept: {
                    readonly type: "array";
                    readonly items: {
                        readonly $ref: "#/components/schemas/MediaType";
                    };
                };
                readonly acceptLanguage: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly range: {
                                readonly type: "string";
                            };
                            readonly weight: {
                                readonly type: "number";
                                readonly format: "double";
                            };
                        };
                    };
                };
                readonly accessControlMaxAge: {
                    readonly type: "integer";
                    readonly format: "int64";
                };
                readonly acceptCharset: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly registered: {
                                readonly type: "boolean";
                            };
                        };
                    };
                };
                readonly basicAuth: {
                    readonly type: "string";
                    readonly writeOnly: true;
                };
                readonly bearerAuth: {
                    readonly type: "string";
                    readonly writeOnly: true;
                };
                readonly contentDisposition: {
                    readonly $ref: "#/components/schemas/ContentDisposition";
                };
                readonly ifMatch: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly ifNoneMatch: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly ifUnmodifiedSince: {
                    readonly type: "integer";
                    readonly format: "int64";
                };
                readonly pragma: {
                    readonly type: "string";
                };
                readonly upgrade: {
                    readonly type: "string";
                };
            };
            readonly additionalProperties: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
            };
        };
        readonly body: {
            readonly type: "object";
        };
        readonly statusCode: {
            readonly type: "string";
            readonly enum: readonly ["100 CONTINUE", "101 SWITCHING_PROTOCOLS", "102 PROCESSING", "103 CHECKPOINT", "200 OK", "201 CREATED", "202 ACCEPTED", "203 NON_AUTHORITATIVE_INFORMATION", "204 NO_CONTENT", "205 RESET_CONTENT", "206 PARTIAL_CONTENT", "207 MULTI_STATUS", "208 ALREADY_REPORTED", "226 IM_USED", "300 MULTIPLE_CHOICES", "301 MOVED_PERMANENTLY", "302 FOUND", "302 MOVED_TEMPORARILY", "303 SEE_OTHER", "304 NOT_MODIFIED", "305 USE_PROXY", "307 TEMPORARY_REDIRECT", "308 PERMANENT_REDIRECT", "400 BAD_REQUEST", "401 UNAUTHORIZED", "402 PAYMENT_REQUIRED", "403 FORBIDDEN", "404 NOT_FOUND", "405 METHOD_NOT_ALLOWED", "406 NOT_ACCEPTABLE", "407 PROXY_AUTHENTICATION_REQUIRED", "408 REQUEST_TIMEOUT", "409 CONFLICT", "410 GONE", "411 LENGTH_REQUIRED", "412 PRECONDITION_FAILED", "413 PAYLOAD_TOO_LARGE", "413 REQUEST_ENTITY_TOO_LARGE", "414 URI_TOO_LONG", "414 REQUEST_URI_TOO_LONG", "415 UNSUPPORTED_MEDIA_TYPE", "416 REQUESTED_RANGE_NOT_SATISFIABLE", "417 EXPECTATION_FAILED", "418 I_AM_A_TEAPOT", "419 INSUFFICIENT_SPACE_ON_RESOURCE", "420 METHOD_FAILURE", "421 DESTINATION_LOCKED", "422 UNPROCESSABLE_ENTITY", "423 LOCKED", "424 FAILED_DEPENDENCY", "425 TOO_EARLY", "426 UPGRADE_REQUIRED", "428 PRECONDITION_REQUIRED", "429 TOO_MANY_REQUESTS", "431 REQUEST_HEADER_FIELDS_TOO_LARGE", "451 UNAVAILABLE_FOR_LEGAL_REASONS", "500 INTERNAL_SERVER_ERROR", "501 NOT_IMPLEMENTED", "502 BAD_GATEWAY", "503 SERVICE_UNAVAILABLE", "504 GATEWAY_TIMEOUT", "505 HTTP_VERSION_NOT_SUPPORTED", "506 VARIANT_ALSO_NEGOTIATES", "507 INSUFFICIENT_STORAGE", "508 LOOP_DETECTED", "509 BANDWIDTH_LIMIT_EXCEEDED", "510 NOT_EXTENDED", "511 NETWORK_AUTHENTICATION_REQUIRED"];
        };
        readonly statusCodeValue: {
            readonly type: "integer";
            readonly format: "int32";
        };
    };
};
export declare const $ReligionDTO: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly name: {
            readonly type: "string";
        };
    };
};
export declare const $ContactInformationCreationDTO: {
    readonly required: readonly ["content", "medium", "type"];
    readonly type: "object";
    readonly properties: {
        readonly type: {
            readonly type: "string";
        };
        readonly medium: {
            readonly type: "string";
        };
        readonly personId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly addressId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly externalName: {
            readonly type: "string";
        };
        readonly content: {
            readonly type: "string";
        };
        readonly comment: {
            readonly type: "string";
        };
        readonly secret: {
            readonly type: "boolean";
        };
    };
};
