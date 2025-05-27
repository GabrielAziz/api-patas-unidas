import { AppError } from '../middlewares/errorHandler';

export interface ServiceResponse<T> {
  isSuccess: boolean;
  errors: string[];
  record?: T;
  collection?: T[];
}

export abstract class BaseService<T> {
  protected record?: T;
  protected collection?: T[];
  protected isSuccess: boolean = true;
  protected errors: string[] = [];

  protected abstract getRepository(): any;

  async findAll(): Promise<ServiceResponse<T>> {
    try {
      this.collection = await this.getRepository().findAll();

    } catch (err) {
      console.error(err);

      this.resetService();
      throw new AppError('Erro ao buscar registros', 500);
    }

    return this.getResponse();
  }

  async findById(id: number): Promise<ServiceResponse<T>> {
    try {
      this.record = await this.getRepository().findById(id);
      if (!this.record) {
        throw new AppError(`Registro com ID ${id} não encontrado`, 404);
      }

    } catch (err) {
      console.error(err);

      this.resetService();
      throw new AppError('Erro ao buscar registro', 500);
    }
    return this.getResponse();
  }

  async create(data: any): Promise<ServiceResponse<T>> {
    try {
      this.record = await this.getRepository().create(data);

    } catch (err) {
      console.error(err);

      this.resetService();
      throw new AppError('Erro ao criar registro', 500);
    }
    return this.getResponse();
  }

  async update(id: number, data: any): Promise<ServiceResponse<T>> {
    try {
      const existingRecord = await this.getRepository().findById(id);
      if (!existingRecord) {
        throw new AppError(`Registro com ID ${id} não encontrado`, 404);
      }

      this.record = await this.getRepository().update(id, data);

    } catch (err) {
      console.error(err);

      this.resetService();
      throw new AppError('Erro ao atualizar registro', 500);
    }
    return this.getResponse();
  }

  async softDelete(id: number): Promise<ServiceResponse<T>> {
    try {
      this.record = await this.getRepository().softDelete(id);

      if (!this.record) {
        this.setError(`Record with ID ${id} not found`);
      }

    } catch (err) {
      console.error(err);

      this.resetService();
      throw new AppError('Erro ao deletar registro', 500);
    }
    return this.getResponse();
  }

  protected setError(error: string | string[]): void {
    this.isSuccess = false;

    this.errors = [
      ...this.errors,
      ...(Array.isArray(error) ? error : [error])
    ];
  }

  protected getResponse(): ServiceResponse<T> {
    const response = {
      isSuccess: this.isSuccess,
      errors: this.errors,
      record: this.record,
      collection: this.collection
    };

    this.resetService();

    return response;
  }

  protected resetService(): void {
    this.isSuccess = true;
    this.errors = [];
    this.record = undefined;
    this.collection = undefined;
  }
}