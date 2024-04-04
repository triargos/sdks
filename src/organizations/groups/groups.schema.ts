import {z} from "zod";

export const groupsSchema = z.object({
    id: z.number(),
    name: z.string(),
    type: z
        .enum(['central', 'class', 'institution', 'schoolyear', 'caregroup', 'company'])
        .nullable(),
    grade: z.string().nullable().optional(),
    schoolYear: z.string().nullable().optional(),
    char: z.string().nullable().optional(),
});

export const allGroupsSchema = z.array(groupsSchema)