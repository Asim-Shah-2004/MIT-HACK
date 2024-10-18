import { WarehouseOwner, InventorySpace, Entrepreneur, Investor } from "../../models/index.js";

const unfreezeInventorySpace = async (req, res) => {
  try {
    const { email: ownerEmail } = req.user;
    const { customerEmail, inventoryId } = req.body;

    const warehouseOwner = await WarehouseOwner.findOne({ email: ownerEmail });
    if (!warehouseOwner) {
      return res.status(400).json({ message: "Warehouse owner not found." });
    }

    const customer = await WarehouseOwner.findOne({ email: customerEmail }) || 
                     await Investor.findOne({ email: customerEmail }) || 
                     await Entrepreneur.findOne({ email: customerEmail });

    if (!customer) {
      return res.status(400).json({ message: "Customer not found." });
    }

    const inventorySpace = await InventorySpace.findOne({ rentalID: inventoryId });
    if (!inventorySpace) {
      return res.status(404).json({ message: "Inventory space not found." });
    }

    const customerIndex = inventorySpace.customers.findIndex(c => c.customerEmail === customerEmail);
    if (customerIndex === -1) {
      return res.status(404).json({ message: "Customer not found in this inventory space." });
    }

    const { agreedRentedSpace } = inventorySpace.customers[customerIndex];

    inventorySpace.customers.splice(customerIndex, 1);
    inventorySpace.rentedSpace += agreedRentedSpace;

    await inventorySpace.save();

    return res.status(200).json({ message: "Inventory space unfrozen and added back to available space." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export default unfreezeInventorySpace;
