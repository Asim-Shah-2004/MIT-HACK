import { Investor, Entrepreneur, WarehouseOwner } from "../../models/index.js";

const updateDetails = async (req, res) => {
    const {email} = req.user
    const { fullName, phoneNumber, country, state, city, profilePicture } = req.body;
    
    try {
        const user = await Investor.findOne({ email }) || 
                     await Entrepreneur.findOne({ email }) || 
                     await WarehouseOwner.findOne({ email });
        
        if (!user) return res.status(400).send({ message: "Email doesn't exist" });
        if (fullName) user.fullName = fullName;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (country) user.location.country = country;
        if (state) user.location.state = state;
        if (city) user.location.city = city;
        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();

        return res.status(200).send({ message: "Details updated successfully" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export default updateDetails;
