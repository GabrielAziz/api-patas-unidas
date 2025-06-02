import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import { UserRepository } from '../repositories/UserRepository';
import { AppError } from './errorHandler';

interface TokenPayload {
  userId: number;
  iat: number;
  exp: number;
  sub: string;
}

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const authCookie = req.cookies.token;

  if (!authCookie) {
    throw new AppError('Token JWT não informado', 401);
  }

  const decoded = verify(authCookie, authConfig.jwt.secret) as TokenPayload;
  const { userId } = decoded;

  const userRepository = new UserRepository();
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new AppError('Usuário não encontrado', 401);
  }

  req.user = {
    id: userId,
    permissions: user.permissions || {
      canAdopt: false,
      canSponsor: false,
      canAdmin: false,
    },
  };

  return next();
};

export const ensureAdministrator: RequestHandler = async (req, res, next) => {
  if (!req.user?.permissions?.canAdmin) {
    throw new AppError('Usuário não tem permissão de administrador', 403);
  }
  return next();
};

export const ensureAdopter: RequestHandler = async (req, res, next) => {
  if (!req.user?.permissions?.canAdopt) {
    throw new AppError('Usuário não tem permissão de adotante', 403);
  }
  return next();
};

export const ensureAdministratorOrSelf: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.id);
  if (!req.user?.permissions?.canAdmin && req.user?.id !== userId) {
    throw new AppError('Usuário não tem permissão', 403);
  }
  return next();
};