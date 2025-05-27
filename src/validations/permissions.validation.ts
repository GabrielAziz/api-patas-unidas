import { z } from 'zod';

// Schema para Permissions (não opcional em si)
export const PermissionsSchema = z.object({
  canAdopt: z.boolean().default(false),
  canSponsor: z.boolean().default(true),
  canAdmin: z.boolean().default(false)
});