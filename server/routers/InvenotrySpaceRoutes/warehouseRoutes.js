import express from "express";
import {
  addListing,
  freezeInventorySpace,
  confirmOwnerPayment,
  unfreezeInventorySpace,
  Intrested,
  getAllInventories,
  getSpecificInventory,
} from "../../controllers/index.js";

const warehouseRouter = express.Router();

warehouseRouter.post("/list", addListing);
warehouseRouter.post("/freeze", freezeInventorySpace);
warehouseRouter.post("/confirm-owner", confirmOwnerPayment);
warehouseRouter.post("/unfreeze", unfreezeInventorySpace);
warehouseRouter.post("/intrested", Intrested);
warehouseRouter.get("/allWarehouse", getAllInventories);
warehouseRouter.get("/getSpecificInventory", getSpecificInventory);

export default warehouseRouter;
