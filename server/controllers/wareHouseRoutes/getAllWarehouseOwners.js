import WarehouseOwner from "../../models/userModels/warehouseOwner.js";

 const getAllWarehouseOwners = async (req, res) => {
  try {
    const warehouseOwners = await WarehouseOwner.find();

    if (!warehouseOwners || warehouseOwners.length === 0) {
      return res.status(404).json({ message: "No warehouse owners found." });
    }

    return res.status(200).json({ warehouseOwners });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};
export default getAllWarehouseOwners;