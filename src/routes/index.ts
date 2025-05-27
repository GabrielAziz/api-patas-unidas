import { Router } from 'express';
import { userRoutes } from './user.routes';
import { authRoutes } from './auth.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);

export { routes };