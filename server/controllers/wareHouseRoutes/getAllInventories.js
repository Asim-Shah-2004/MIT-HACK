import { InventorySpace } from "../../models/index.js";

const getAllInventories = async (req, res) => {
  try {
    const inventories = await InventorySpace.find({}, {
      rentalID: 1,
      creatorEmail: 1,
      creatorName: 1,
      propertyName: 1,
      details: 1,
      'location.country': 1,
      'location.state': 1,
      'location.city': 1,
      rentedSpace: 1,
      rentalPrice: 1,
      attachment: 1
    });

    if (!inventories || inventories.length === 0) {
      return res.status(404).json({ message: "No inventories found." });
    }

    return res.status(200).json({ inventories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export default getAllInventories;
