import { Router } from 'express';
import * as controllers from '../../controller/product.controller';
import validateToken from '../../middleware/authentication.middleware';
const routes = Router();

routes
  .route('/')
  .post(validateToken, controllers.create)
  .get(controllers.getAllproducts);
routes.route('/:id').get(controllers.getPorductById);
export default routes;
