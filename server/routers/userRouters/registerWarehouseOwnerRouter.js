// routes/warehouseRoutes.js
import express from 'express';
import registerWarehouseOwner from '../../controllers/userControllers/registerWarehouseOwner.js';  

const registerWarehouseOwnerRouter = express.Router();


registerWarehouseOwnerRouter.post('/', registerWarehouseOwner);

export default registerWarehouseOwnerRouter;
