import express from 'express';
import { registerWarehouseOwner } from '../../controllers/authControllers/register/registerWarehouseOwner.js';

const registerRouter = express.Router();

registerRouter.post('/warehouse', registerWarehouseOwner);

export default registerRouter;
