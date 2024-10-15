import express from 'express';
import { registerWarehouseOwner,registerEntrepreneur,registerInvestor } from '../../controllers/index.js';

const registerRouter = express.Router();

registerRouter.post('/warehouse', registerWarehouseOwner);
registerRouter.post('/entrepreneur', registerEntrepreneur);
registerRouter.post('/investor' ,registerInvestor)

export default registerRouter;
