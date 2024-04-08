import { z } from 'zod';

export const membersSchema = z.object({
  id: z.number(),
  firstName: z.string().nullable(),
  lastName: z.string(),
  allFirstNames: z.string().nullable(),
  academicTitle: z.string().nullable(),
  prefix: z.string().nullable(),
  salutation: z.string().nullable(),
  addressId: z.number().nullable(),
  familyRole: z.string().nullable(),
  gender: z.string().nullable(),
  email: z.string().nullable(),
  religion: z.string().nullable(),
  birthDate: z.string().nullable(),
  placeOfBirth: z.string().nullable(),
  nationality: z.string().nullable(),
  address: z
    .object({
      id: z.number(),
      street: z.string().nullable(),
      zip: z.string().nullable(),
      city: z.string().nullable(),
      country: z.string().nullable(),
      locality: z.string().nullable(),
      district: z.string().nullable(),
    })
    .nullable(),
});

export const allMembersSchema = z.array(membersSchema);

export const relationshipSchema = z.object({
    personId: z.number(),
    relationshipType: z.enum(['father', 'mother', 'son', 'daughter', 'other', 'child']),
    custody: z.boolean(),
    realParent: z.boolean(),
    physical: z.boolean(),
    notes: z.string().nullable(),
});

export const allRelationshipsSchema = z.array(relationshipSchema);