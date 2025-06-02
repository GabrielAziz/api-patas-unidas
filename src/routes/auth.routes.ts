import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { ensureAuthenticated } from '../middlewares/auth';

const authRoutes = Router();
const authController = new AuthController();

//TODO
// Usuario se cria por singup (seguir modelo users/new)
// users/new se torna roda de administrador e liberia permissoes
// Modificar ErrorHandler para ter X tipos de erros
// Recuperar senha/email (MANDAR EMAIL / SMS)

// authRoutes.post('/signup', authController.signup);
authRoutes.post('/login', authController.login);
authRoutes.get('/logout', ensureAuthenticated, authController.logout);

export { authRoutes };