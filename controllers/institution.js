import Institution from "../models/Institution.js";

// CURRENTLY NOT IN USE, FIX WHEN IMPLEMENTED IN FRONTEND
export const getInstitution = async (req, res) => {
  try {
    const institutionId = req.params.id;
    const institution = await Institution.findById(institutionId);
    if (!institution) {
      return res.status(404).json({ message: "Institution not found" });
    }
    res.status(200).json(institution);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};