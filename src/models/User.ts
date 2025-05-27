// src/models/User.ts
import { Address } from './Address';
import { Permissions } from './Permissions';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  socialName?: string | null;
  birthDate?: Date;
  cpf?: string;
  addressId?: number | null;
  address?: Address | null;
  permissions: Permissions | null;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

