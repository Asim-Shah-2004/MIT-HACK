import { Investor, Entrepreneur } from "../../models/index.js";

const getAllUsers = async (req, res) => {
  const { email } = req.user; 

  try {
    let isInvestor = false;
    const investor = await Investor.findOne({ email });
    if (investor) {
      isInvestor = true;
    }

    const entrepreneurs = await Entrepreneur.find(
      { email: { $ne: email } }, 
      {
        fullName: 1,           
        email: 1,
        phoneNumber: 1,
        profilePicture: 1,
        "location.country": 1,
        "location.state": 1,
        "location.city": 1,
      }
    );

    const investors = await Investor.find(
      { email: { $ne: email } }, 
      {
        fullName: 1,          
        email: 1,
        phoneNumber: 1,
        profilePicture: 1,
        role: 1,
        "location.country": 1,
        "location.state": 1,
        "location.city": 1,
        interestedIndustries: 1,
        amountLookingToInvest: 1,
        investmentType: 1,
        interestedInRuralBusiness: 1,
        engagementType: 1,
      }
    );

    const allUsers = [...entrepreneurs, ...investors];

    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export { getAllUsers };
