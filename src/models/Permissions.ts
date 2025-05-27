// src/models/Permissions.ts

export interface Permissions {
  id: number;
  userId?: number;
  canAdopt: boolean;
  canSponsor: boolean;
  canAdmin: boolean;
  createdAt: Date;
  updatedAt?: Date;
}