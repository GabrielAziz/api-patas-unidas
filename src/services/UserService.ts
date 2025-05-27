import { hash } from 'bcrypt';
import { UserRepository, UserWithRelations } from '../repositories/UserRepository';
import { CreateUserDTO, CreateUserValidation } from '../validations/user.validation';
import { BaseService, ServiceResponse } from './BaseService';

export class UserService extends BaseService<UserWithRelations> {
  private userRepository: UserRepository = new UserRepository();

  // Implementação do método abstrato herdado
  protected getRepository(): UserRepository {
    return this.userRepository;
  }

  // Sobrescreve o método create para adicionar validações específicas
  async create(data: CreateUserDTO): Promise<ServiceResponse<UserWithRelations>> {
    // Validações específicas de usuário
    const existingUserByEmail = await this.userRepository.findByEmail(data.email);
    if (existingUserByEmail) {
      this.setError('E-mail já existe');
      return this.getResponse();
    }

    const existingUserByCPF = await this.userRepository.findByCpf(data.cpf);
    if (existingUserByCPF) {
      this.setError('CPF já está em uso');
      return this.getResponse();
    }

    const validation = CreateUserValidation.safeParse({
      ...data,
      birthDate: new Date(data.birthDate)
    });

    if (!validation.success) {
      const errors = validation.error.errors.map(e => e.message);
      this.setError(errors);
      return this.getResponse();
    }

    const { confirmPassword, ...userData } = validation.data;

    // Criptografa a senha
    const hashedData = {
      ...userData,
      password: await hash(userData.password, 8)
    };

    // Chama o método da classe pai para criar o usuário
    return super.create(hashedData);
  }

  // Sobrescreve o método update para adicionar validações específicas
  async update(id: number, data: CreateUserDTO): Promise<ServiceResponse<UserWithRelations>> {
    const existingUserByEmail = await this.userRepository.findByEmail(data.email);
    if (existingUserByEmail && existingUserByEmail.id !== id) {
      this.setError('E-mail já existe');
      return this.getResponse();
    }

    const existingUserByCPF = await this.userRepository.findByCpf(data.cpf);
    if (existingUserByCPF && existingUserByCPF.id !== id) {
      this.setError('CPF já está em uso');
      return this.getResponse();
    }

    const validation = CreateUserValidation.safeParse({
      ...data,
      birthDate: new Date(data.birthDate)
    });

    if (!validation.success) {
      const errors = validation.error.errors.map(e => e.message);
      this.setError(errors);
      return this.getResponse();
    }

    const { confirmPassword, ...userData } = validation.data;

    // Criptografa a senha
    const hashedData = {
      ...userData,
      password: await hash(userData.password, 8)
    };

    // Chama o método da classe pai para atualizar o usuário
    return super.update(id, hashedData);
  }
}