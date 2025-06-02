import { Request, Response } from 'express';
import { BaseService, ServiceResponse } from '../services/BaseService';

export abstract class BaseController<T> {
  protected abstract getService(): BaseService<T>;

  findAll = async (req: Request, res: Response): Promise<Response> => {
    const response: ServiceResponse<T> = await this.getService().findAll();
    if (!response.isSuccess) {
      return res.status(400).json({ errors: response.errors });
    }
    return res.status(200).json(response.collection);
  };

  findById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const response: ServiceResponse<T> = await this.getService().findById(Number(id));
    if (!response.isSuccess) {
      return res.status(404).json({ errors: response.errors });
    }
    return res.status(200).json(response.record);
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const response: ServiceResponse<T> = await this.getService().create(req.body);
    if (!response.isSuccess) {
      return res.status(400).json({ errors: response.errors });
    }
    return res.status(201).json(response.record);
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const response: ServiceResponse<T> = await this.getService().update(Number(id), req.body);
    if (!response.isSuccess) {
      return res.status(400).json({ errors: response.errors });
    }
    return res.status(200).json(response.record);
  };

  softDelete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const response: ServiceResponse<T> = await this.getService().softDelete(Number(id));
    if (!response.isSuccess) {
      return res.status(404).json({ errors: response.errors });
    }
    return res.status(204).send();
  };
}