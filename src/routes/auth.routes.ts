import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { ensureAuthenticated } from '../middlewares/auth';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/login', authController.authenticate);
authRoutes.post('/logout', ensureAuthenticated, authController.logout);

export { authRoutes };