import Company from "../models/Company.js";

// get all companies from DB
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    if (!companies) {
      return res.status(404).json({ message: "Companies not found" });
    }
    res.status(200).json(companies);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
