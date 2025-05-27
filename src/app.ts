import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { routes } from './routes';
import { errorHandler } from './middlewares/errorHandler'

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true // Importante para cookies
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Rotas
app.use('/api', routes);

// Captura e tratamento de erros
app.use(errorHandler);

export { app };