import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { UserWithRelations } from '../repositories/UserRepository';
import { BaseController } from './BaseController';

export class UserController extends BaseController<UserWithRelations> {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  protected getService(): UserService {
    return this.userService;
  }

  // Se precisar sobrescrever algum método, basta fazer aqui.
  // Exemplo:
  // async create(req: Request, res: Response): Promise<void> {
  //   // lógica customizada
  //   return super.create(req, res);
  // }
}