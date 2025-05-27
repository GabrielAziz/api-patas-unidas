import { z } from 'zod';

// Validacoes para Address
export const AddressSchema = z.object({
  zipCode: z.string().regex(/^\d{8}$/, { message: 'Invalid ZIP code format' }),
  state: z.string().min(1, { message: 'State is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  district: z.string().min(1, { message: 'District is required' }),
  street: z.string().min(1, { message: 'Street is required' }),
  number: z.string().min(1, { message: 'Number is required' }),
  complement: z.string().nullable().optional()
});