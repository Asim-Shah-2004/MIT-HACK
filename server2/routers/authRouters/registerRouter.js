import express from 'express';
import { registerWarehouseOwner,registerEntrepreneur } from '../../controllers/index.js';

const registerRouter = express.Router();

registerRouter.post('/warehouse', registerWarehouseOwner);
registerRouter.post('/entrepreneur', registerEntrepreneur);

export default registerRouter;
