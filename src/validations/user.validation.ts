import { z } from 'zod';

// Dependencias
import { AddressSchema } from './address.validation';
import { PermissionsSchema } from './permissions.validation';

// Validacoes para User ao CRIAR
export const CreateUserValidation = z.object({
  // Campos obrigatórios
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string()
    .min(8, { message: 'Password must have at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must have at least one uppercase letter' })
    .regex(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, { message: 'Password must have at least one special character' }),
  name: z.string().min(1, { message: 'Name is required' }),
  birthDate: z.coerce.date({
    errorMap: () => ({ message: 'Invalid date format' })
  }),
  cpf: z.string().regex(/^\d{11}$/, { message: 'Invalid CPF format' }),

  // Campos opcionais
  confirmPassword: z.string().optional(),
  socialName: z.string().optional().nullable(),
  address: AddressSchema.optional(),
  permissions: PermissionsSchema.optional().default({
    canAdopt: false,
    canSponsor: true,
    canAdmin: false
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type CreateUserDTO = z.infer<typeof CreateUserValidation>;

// Validacoes para User ao EDITAR (TODOS OS CAMPOS SAO OPCIONAIS)
export const UpdateUserValidation = z.object({

  // Campos opcionais
  name: z.string().min(1, { message: 'Name is required' }),
  birthDate: z.coerce.date({
    errorMap: () => ({ message: 'Invalid date format' })
  }),
  cpf: z.string().regex(/^\d{11}$/, { message: 'Invalid CPF format' }),
  permissions: PermissionsSchema,

  password: z.string()
    .min(8, { message: 'Password must have at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must have at least one uppercase letter' })
    .regex(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, { message: 'Password must have at least one special character' })
    .optional(),
  confirmPassword: z.string().optional(),
  socialName: z.string().optional().nullable(),
  address: AddressSchema.optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type UpdateUserDTO = z.infer<typeof UpdateUserValidation>;