import bcrypt from "bcrypt";
import { WarehouseOwner } from "../../models/index.js";

const registerInventory = async (req, res) => {
  const {
    email,  
    propertyName, totalSpace, pricePerSpace, location, isDivisible, inventoryParts
  } = req.body;


  if (!email || !propertyName || !totalSpace || !pricePerSpace) {
    return res.status(400).json({ msg: "Email, property name, total space, and price per space are required." });
  }

  try {

    let warehouseOwner = await WarehouseOwner.findOne({ email });

    if (!warehouseOwner) {

      return res.status(400).json({ msg: "You need to register as a warehouse owner first." });
    }


    let availableSpace = totalSpace;

    if (isDivisible && inventoryParts && inventoryParts.length > 0) {
      const totalPartSpace = inventoryParts.reduce((acc, part) => acc + part.partSize, 0);
      if (totalPartSpace > totalSpace) {
        return res.status(400).json({ msg: "Total space of parts exceeds available space" });
      }
      availableSpace = totalSpace - totalPartSpace;
    }


    warehouseOwner.properties.push({
      propertyName,
      location,
      totalSpace,
      pricePerSpace,
      availableSpace,
      isDivisible,
      inventoryParts: isDivisible ? inventoryParts : []
    });

    await warehouseOwner.save();
    
    res.status(201).json({ msg: "Inventory registered successfully", warehouseOwner });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export default registerInventory;
