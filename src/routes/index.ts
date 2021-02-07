import { Router } from "express"

import UsersController from '../controllers/users';

const routes = Router();

routes.post('/users', UsersController.create);
routes.get('/users/:user_id', UsersController.get);
routes.put('/users/:user_id', UsersController.update)
routes.delete('users/:user_id', UsersController.delete)

export default routes;
