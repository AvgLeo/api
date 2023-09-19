import JobOffer from "../models/JobOffer.js";

// CURRENTLY NOT IN USE, FIX WHEN IMPLEMENTED IN FRONTEND
export const getJobOffers = async (req, res) => {
  try {
    const jobs = await JobOffer.find().populate("companyId").populate("userId");
    if (!jobs) {
      return res.status(404).json({ message: "Jobs not found" });
    }
    res.status(200).json(jobs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const newJobOffer = async (req, res) => {
  try {
    // extract user details from the JSON in req.body sent from frontend
    const {
      userId,
      companyId,
      content,
      offerTitle,
      offerLink,
      location,
      expReq,
      referral,
    } = req.body;

    // instance a new User with the info got and save it to DB using mongoose schema
    const newJobOffer = new JobOffer({
      userId,
      companyId,
      content,
      offerTitle,
      offerLink,
      location,
      expReq,
      referral,
    });
    const savedJobOffer = await newJobOffer.save();
    await savedJobOffer.populate("companyId");
    res.status(201).json(savedJobOffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
