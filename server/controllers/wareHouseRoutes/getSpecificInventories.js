import { InventorySpace, WarehouseOwner } from "../../models/index.js";

const getAllInventories = async (req, res) => {
  try {
    const { email } = req.user;

    const warehouseOwner = await WarehouseOwner.findOne({ email });

    if (!warehouseOwner || !warehouseOwner.inventories || warehouseOwner.inventories.length === 0)
      return res.status(200).json({ inventories: [] });

    const inventoryIds = warehouseOwner.inventories.map(inv => inv.inventoryId);

    const inventories = await InventorySpace.find({
      rentalID: { $in: inventoryIds }  
    }).select('rentalID propertyName details location rentedSpace rentalPrice attachment'); 

    return res.status(200).json({ inventories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export default getAllInventories;
