import { Router } from 'express';
import * as controllers from '../../controller/user.controller';
const routes = Router();

routes.post('/', controllers.create);

export default routes;
