import {Product,Entrepreneur} from '../../models/index.js';

export const addProduct = async (req, res) => {
    const { name, pricePerUnit, minOrderQuantity, stock, creatorEmail, creatorName ,isRural , image } = req.body;

    if(!name || !pricePerUnit || !minOrderQuantity || !stock || !creatorEmail || !creatorName) return res.status(400).send({message:"provide all fields"})

    const entrepreneur = await Entrepreneur.findOne({email:creatorEmail})
    
    if(!entrepreneur) return res.status(400).send({message:"only entrepreneur can add products"})

    try {
        const newProduct = new Product({
            name,
            pricePerUnit,
            minOrderQuantity,
            stock,
            creatorEmail,
            creatorName,
            isRural,
            image
        });

        await newProduct.save();

        return res.status(201).json({ message: 'Product added successfully!', product: newProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ message: 'Failed to add product.' });
    }
};

export default addProduct;
