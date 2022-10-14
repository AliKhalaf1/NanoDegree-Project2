import { Router } from 'express';
import * as controllers from '../../controller/order.controller';
import validateToken from '../../middleware/authentication.middleware';
const routes = Router();

routes
  .route('/')
  .post(validateToken, controllers.createOrder)
  .get(validateToken, controllers.getAllOrders);
routes.route('/:order_id').post(validateToken, controllers.addProduct);
routes
  .route('/user/:user_id')
  .get(validateToken, controllers.getOrdersByUserId);

export default routes;
