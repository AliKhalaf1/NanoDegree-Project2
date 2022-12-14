import { Router } from 'express';
import * as controllers from '../../controller/user.controller';
import validateToken from '../../middleware/authentication.middleware';
const routes = Router();

routes
  .route('/')
  .post(controllers.create)
  .get(validateToken, controllers.getAllUsers)
  .patch(validateToken, controllers.updateUser);
routes
  .route('/:id')
  .get(validateToken, controllers.getUserById)
  .delete(validateToken, controllers.deleteUser);
routes.route('/authenticate').post(controllers.authenticate);
export default routes;
