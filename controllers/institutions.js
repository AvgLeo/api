import Institution from "../models/Institution.js";

// get ALL Users from db and send to frontend
export const getAllInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find();
    if (!institutions) {
      return res.status(404).json({ message: "Institutions not found" });
    }
    res.status(200).json(institutions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
