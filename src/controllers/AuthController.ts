import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { AppError } from '../middlewares/errorHandler';

export class AuthController {
  private authService: AuthService = new AuthService();;

  authenticate = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Email e senha são obrigatórios', 400);
    }

    // O serviço deve lançar AppError em caso de falha
    const { user, token } = await this.authService.authenticate({
      email,
      password,
    });

    // Configurar cookie HTTP-only
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Apenas HTTPS em produção
      maxAge: 3600000, // 1 hora em milissegundos
      sameSite: 'strict'
    });

    // Retorna apenas dados não sensíveis do usuário
    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        permissions: user.permissions
      }
    });
  }

  logout = async (req: Request, res: Response): Promise<Response> => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return res.status(204).send();
  }
}