import User from "../models/User.js";

// get ALL Users from db and send to frontend
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate(["education", "occupation"]);
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
