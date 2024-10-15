
import express from 'express';
import registerInventory from '../../controllers/userControllers/registerInventory.js';

const registerInventoryRouter = express.Router();

registerInventoryRouter.post('/', registerInventory);
export default registerInventoryRouter;
