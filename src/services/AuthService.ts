import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { UserRepository } from '../repositories/UserRepository';
import authConfig from '../config/auth';
import { AppError } from '../middlewares/errorHandler';

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: number;
    name: string | null;
    email: string;
    permissions: {
      canAdopt: boolean;
      canSponsor: boolean;
      canAdmin: boolean;
    };
  };
  token: string;
}

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async authenticate({ email, password }: AuthRequest): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const { secret } = authConfig.jwt;

    const token = sign(
      { userId: user.id }, // Payload
      secret,             // Secret key
      { expiresIn: '1h' }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        permissions: user.permissions ?? {
          canAdopt: false,
          canSponsor: false,
          canAdmin: false,
        }, // Incluindo as permissões
      },
      token,
    };
  }
}