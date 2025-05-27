import { PrismaClient, Prisma } from '@prisma/client';
import { CreateUserDTO, UpdateUserDTO } from '../validations/user.validation';
import { AppError } from '../middlewares/errorHandler';

// Tipo que representa um usuário com address e permissions incluídos
export type UserWithRelations = Prisma.UserGetPayload<{
  include: { address: true, permissions: true }
}>;

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Busca todos os usuários (exceto soft deleted), incluindo endereço e permissões
  findAll = async (): Promise<UserWithRelations[]> => {
    try {
      return await this.prisma.user.findMany({
        where: { deletedAt: null },
        include: {
          address: true,
          permissions: true,
        },
      });
    } catch (error) {
      throw new AppError('Ocorreu um erro ao buscar os usuários. Entre em contato com o suporte.', 500);
    }
  }

  // Busca usuário por ID (exceto soft deleted), incluindo endereço e permissões
  findById = async (id: number): Promise<UserWithRelations | null> => {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
        include: {
          address: true,
          permissions: true,
        },
      });
    } catch (error) {
      throw new AppError('Ocorreu um erro ao buscar o usuário. Entre em contato com o suporte.', 500);
    }
  }

  // Busca usuário por email (exceto soft deleted), incluindo endereço e permissões
  findByEmail = async (email: string): Promise<UserWithRelations | null> => {
    try {
      return await this.prisma.user.findFirst({
        where: { email, deletedAt: null },
        include: {
          address: true,
          permissions: true,
        },
      });
    } catch (error) {
      throw new AppError('Ocorreu um erro ao buscar o usuário. Entre em contato com o suporte.', 500);
    }
  }

  // Busca usuário por CPF (exceto soft deleted), incluindo endereço e permissões
  findByCpf = async (cpf: string): Promise<UserWithRelations | null> => {
    try {
      return await this.prisma.user.findFirst({
        where: { cpf, deletedAt: null },
        include: {
          address: true,
          permissions: true,
        },
      });
    } catch (error) {
      throw new AppError('Ocorreu um erro ao buscar o usuário. Entre em contato com o suporte.', 500);
    }
  }

  // Cria usuário e permissões (se fornecidas), incluindo endereço e permissões no retorno
  create = async (data: CreateUserDTO): Promise<UserWithRelations> => {
    try {
      const { permissions, address, ...userData } = data;

      return await this.prisma.user.create({
        data: {
          ...userData,
          permissions: permissions ? { create: permissions } : undefined,
          address: address ? { create: address } : undefined,
        },
        include: {
          address: true,
          permissions: true,
        },
      });
    } catch (error) {
      throw new AppError('Ocorreu um erro ao criar o usuário. Entre em contato com o suporte.', 500);
    }
  }

  // Atualiza usuário e permissões (se fornecidas), incluindo endereço e permissões no retorno
  update = async (id: number, data: UpdateUserDTO): Promise<UserWithRelations | null> => {
    try {
      const { permissions, address, ...userData } = data;

      return await this.prisma.user.update({
        where: { id },
        data: {
          ...userData,
          permissions: permissions ? { update: permissions } : undefined,
          address: address ? { upsert: {
            create: address,
            update: address
          } } : undefined,
        },
        include: {
          address: true,
          permissions: true,
        },
      });
    } catch (error) {
      throw new AppError('Ocorreu um erro ao atualizar o usuário. Entre em contato com o suporte.', 500);
    }
  }

  // Soft delete: marca o usuário como deletado
  softDelete = async (id: number): Promise<UserWithRelations | null> => {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
        include: {
          address: true,
          permissions: true,
        },
      });
    } catch (error) {
      throw new AppError('Ocorreu um erro ao excluir o usuário. Entre em contato com o suporte.', 500);
    }
  }
}