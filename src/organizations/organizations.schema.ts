import { z } from 'zod';

export const organizationsSchema = z.object({
  id: z.string(),
  name: z.string(),
  active: z.boolean(),
});
export const allOrganizationsSchema = z.array(organizationsSchema);
