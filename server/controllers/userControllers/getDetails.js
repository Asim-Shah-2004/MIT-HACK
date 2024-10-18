import { Investor,Entrepreneur,WarehouseOwner } from "../../models/index.js"


const getDetails = async (req,res)=>{
    const {email} = req.body
    try{
        const user = await Investor.findOne({email}) || await Entrepreneur.findOne({email}) || await WarehouseOwner.findOne({email})
        if(!user) return res.status(400).send({message:"Email dosent exists"})
        return res.status(200).send({
            email : user.email,
            fullName : user.fullName,
            phoneNumber : user.phoneNumber,
            country : user.location.country,
            state : user.location.state,
            city : user.location.city,
            profilePicture : user.profilePicture,
        })
    }catch(err){
        res.status(500).send({message : err})
    }
}

export default getDetails