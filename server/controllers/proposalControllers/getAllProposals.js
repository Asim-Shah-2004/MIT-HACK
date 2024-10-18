import { Investor, Entrepreneur, Proposal } from '../../models/index.js';

const getAllProposals = async (req, res) => {
  const { email } = req.user; 

  try {
    const user = await Investor.findOne({ email }) || await Entrepreneur.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const sentProposalIds = user.proposalsSent.map(p => p.proposalId);
    const sentProposals = await Proposal.find({ proposalId: { $in: sentProposalIds } });

    const receivedProposalIds = user.proposalsReceived.map(p => p.proposalId);
    const receivedProposals = await Proposal.find({ proposalId: { $in: receivedProposalIds } });

    return res.status(200).json({
      sentProposals,
      receivedProposals
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error. Please try again." });
  }
};

export default getAllProposals;
