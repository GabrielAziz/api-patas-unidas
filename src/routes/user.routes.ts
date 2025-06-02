import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { ensureAuthenticated, ensureAdministrator, ensureAdministratorOrSelf } from '../middlewares/auth';

const userRoutes = Router();
const userController = new UserController();

userRoutes.use(ensureAuthenticated);

userRoutes.get('/', ensureAdministrator, userController.findAll);                            // GET all users
userRoutes.get('/:id', ensureAdministratorOrSelf, userController.findById);                  // GET single user
userRoutes.post('/new', ensureAdministrator, userController.create);                         // CREATE user
userRoutes.put('/edit/:id', ensureAdministratorOrSelf, userController.update);               // UPTADE user
userRoutes.delete('/inactivate/:id', ensureAdministratorOrSelf, userController.softDelete);  // DELETE user

export { userRoutes };