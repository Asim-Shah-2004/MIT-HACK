import crypto from 'crypto';
import { WarehouseOwner, InventorySpace } from "../../models/index.js";

const addListing = async (req, res) => {
  try {
    const { email } = req.user;
    const { propertyName, details, country , state , city, rentedSpace, rentalPrice,attachment } = req.body;

    if(!propertyName || !details || !country || !state || !city || !rentedSpace || !rentalPrice){
        return res.status(400).json({ message: "provide all fields" });  
    }

    const warehouseOwner = await WarehouseOwner.findOne({ email });

    if (!warehouseOwner) {
      return res.status(400).json({ message: "This Warehouse owner doesn't exist." });
    }

    const rentalID = crypto.randomBytes(16).toString("hex");

    const newInventorySpace = new InventorySpace({
      rentalID,
      creatorEmail:warehouseOwner.email,
      creatorName:warehouseOwner.fullName,
      propertyName,
      details,
      location : {country,state,city},
      rentedSpace,
      rentalPrice,
      isDivisible : false,
      attachment: attachment ? Buffer.from(attachment, 'base64') : null.Buffer,
      customers:[]
    });

    await newInventorySpace.save();

    warehouseOwner.inventories.push({inventoryId: newInventorySpace.rentalID});
    await warehouseOwner.save();

    return res.status(201).json({ message: "Inventory space added successfully", rentalID });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export default addListing;
