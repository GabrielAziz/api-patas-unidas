// src/models/Address.ts
export interface Address {
  id: number;
  zipCode: string;
  state: string;
  city: string;
  district: string;
  street: string;
  complement?: string | null;
  number: string;
  createdAt: Date;
  updatedAt?: Date;
}