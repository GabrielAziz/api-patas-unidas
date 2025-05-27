import { ErrorRequestHandler } from 'express';

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // APENAS LOG dos ERROS inesperados
  console.error(err.stack || err);

  return res.status(500).json({ error: err.message || 'Erro interno do servidor. Entre em contato com o suporte.' });
};