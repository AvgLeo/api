import Company from "../models/Company.js";

// CURRENTLY NOT IN USE, FIX WHEN IMPLEMENTED IN FRONTEND
export const getCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};