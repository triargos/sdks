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
        readonly zip: {
            readonly type: "string";
        };
        readonly city: {
            readonly type: "string";
        };
        readonly additional: {
            readonly type: "string";
        };
        readonly po: {
            readonly type: "string";
        };
        readonly poZip: {
            readonly type: "string";
        };
        readonly district: {
            readonly type: "string";
        };
        readonly country: {
            readonly type: "string";
        };
        readonly locality: {
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
            readonly nullable: true;
        };
        readonly allFirstNames: {
            readonly type: "string";
            readonly nullable: true;
        };
        readonly lastName: {
            readonly type: "string";
        };
        readonly academicTitle: {
            readonly type: "string";
            readonly nullable: true;
        };
        readonly birthDate: {
            readonly type: "string";
            readonly nullable: true;
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
        readonly gender: {
            readonly type: "string";
        };
        readonly placeOfBirth: {
            readonly type: "string";
        };
        readonly nationality: {
            readonly type: "string";
        };
        readonly countryOfOrigin: {
            readonly type: "string";
        };
        readonly religion: {
            readonly type: "string";
        };
        readonly email: {
            readonly type: "string";
        };
        readonly salutation: {
            readonly type: "string";
        };
        readonly prefix: {
            readonly type: "string";
        };
    };
};
export declare const $CreatePersonDTO: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly firstName: {
            readonly type: "string";
            readonly nullable: true;
        };
        readonly allFirstNames: {
            readonly type: "string";
            readonly nullable: true;
        };
        readonly lastName: {
            readonly type: "string";
        };
        readonly academicTitle: {
            readonly type: "string";
            readonly nullable: true;
        };
        readonly birthDate: {
            readonly type: "string";
            readonly nullable: true;
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
        readonly gender: {
            readonly type: "string";
        };
        readonly placeOfBirth: {
            readonly type: "string";
        };
        readonly nationality: {
            readonly type: "string";
        };
        readonly countryOfOrigin: {
            readonly type: "string";
        };
        readonly religion: {
            readonly type: "string";
        };
        readonly email: {
            readonly type: "string";
        };
        readonly salutation: {
            readonly type: "string";
        };
        readonly prefix: {
            readonly type: "string";
        };
        readonly mobilePhone: {
            readonly type: "string";
        };
        readonly householdPhone: {
            readonly type: "string";
        };
        readonly businessPhone: {
            readonly type: "string";
        };
        readonly street: {
            readonly type: "string";
        };
        readonly country: {
            readonly type: "string";
        };
        readonly zipCode: {
            readonly type: "string";
        };
        readonly city: {
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
export declare const $ReligionDTO: {
    readonly type: "object";
    readonly properties: {
        readonly name: {
            readonly type: "string";
        };
    };
};
export declare const $DistrictDTO: {
    readonly required: readonly ["name"];
    readonly type: "object";
    readonly properties: {
        readonly name: {
            readonly type: "string";
        };
    };
};
export declare const $CreateAddressDTO: {
    readonly type: "object";
    readonly properties: {
        readonly personId: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly street: {
            readonly type: "string";
        };
        readonly zip: {
            readonly type: "string";
        };
        readonly city: {
            readonly type: "string";
        };
        readonly additional: {
            readonly type: "string";
        };
        readonly po: {
            readonly type: "string";
        };
        readonly poZip: {
            readonly type: "string";
        };
        readonly district: {
            readonly type: "string";
        };
        readonly country: {
            readonly type: "string";
        };
    };
};
export declare const $GroupDTO: {
    readonly required: readonly ["id", "name", "type"];
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
export declare const $CountryDTO: {
    readonly required: readonly ["iso", "name"];
    readonly type: "object";
    readonly properties: {
        readonly name: {
            readonly type: "string";
        };
        readonly iso: {
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
export declare const $GroupMembershipDTO: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int32";
        };
        readonly entry: {
            readonly type: "string";
        };
        readonly exit: {
            readonly type: "string";
        };
    };
};
