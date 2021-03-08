import { Router } from 'express';

import UserController from './controllers/UserControler';
import Docx from './docx/index';

const routes = Router();

routes.get('/Main', UserController.index);
routes.post('/Main', UserController.create);
routes.post('/Main/remove', UserController.remove);
routes.post('/Main/edit', UserController.edit);
routes.post('/docx', Docx.generator);

export default routes;
