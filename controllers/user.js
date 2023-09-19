import User from "../models/User.js";
import Institution from "../models/Institution.js";
import Education from "../models/Education.js";
import Company from "../models/Company.js";
import Occupation from "../models/Occupation.js";

// Currently, this function is not used in the app
export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body; // Assuming the request body contains the updated data

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true, // This option returns the updated document
      runValidators: true, // This option runs the validation on the updated data
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "updateUser: User not found" });
    }

    res.status(200).json({
      message: "updateUser: Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const addEducationItem = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      organizationId: institutionId,
      startYear,
      endYear,
      degree,
    } = req.body; // Assuming the request body contains the updated data
    const newEducation = new Education({
      userId,
      institutionId,
      startYear,
      endYear,
      degree,
    });
    const savedEducation = await newEducation.save();

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { education: savedEducation._id } },
      {
        new: true, // This option returns the updated document
        runValidators: true, // This option runs the validation on the updated data
      }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "addEducationItem: User not found" });
    }

    // Update user data
    const updatedInstitution = await Institution.findByIdAndUpdate(
      institutionId,
      { $push: { students: userId } },
      {
        new: true, // This option returns the updated document
        runValidators: true, // This option runs the validation on the updated data
      }
    );

    if (!updatedInstitution) {
      return res
        .status(404)
        .json({ message: "addEducationItem: Institution not found" });
    }
    await savedEducation.populate("institutionId");
    res.status(200).json({
      message: "addEducationItem: Profile updated successfully",
      user: updatedUser,
      newItem: savedEducation,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getEducationItems = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const educationItems = await Education.find({
      _id: { $in: user.education },
    }).populate("institutionId");

    res
      .status(200)
      .json({ message: "Profile updated successfully", educationItems });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEducationItem = async (req, res) => {
  try {
    const userId = req.params.id;
    const { educationId, institutionId } = req.body; // Assuming the request body contains the updated data
    console.log(educationId, institutionId);

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { education: educationId } },
      {
        new: true, // This option returns the updated document
        runValidators: true, // This option runs the validation on the updated data
      }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "deleteEducationItem: User not found" });
    }

    // TODO - double request to the DB, can be optimized
    const user = await User.findById(userId);
    // Loop through the user's education items and check if the there is an institutionId matching
    // the newly removed education item
    // If there is no other education item with the same institutionId, remove the user from the institution's students list
    let shouldRemove = false;
    user.education.forEach((educationId) => {
      if (educationId.institutionId === institutionId) {
        shouldRemove = true;
        return;
      }
    });

    // Update user data
    if (shouldRemove) {
      const updatedInstitution = await Institution.findByIdAndUpdate(
        institutionId,
        { $pull: { students: userId } },
        {
          new: true, // This option returns the updated document
          runValidators: true, // This option runs the validation on the updated data
        }
      );

      if (!updatedInstitution) {
        return res
          .status(404)
          .json({ message: "deleteEducationItem:  Institution not found" });
      }
    }

    res.status(200).json({
      message: "deleteEducationItem: Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const addOccupationItem = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      organizationId: companyId,
      startYear,
      endYear,
      position,
    } = req.body; // Assuming the request body contains the updated data
    const newOccupation = new Occupation({
      userId,
      companyId,
      startYear,
      endYear,
      position,
    });
    const savedOccupation = await newOccupation.save();

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { occupation: savedOccupation._id } },
      {
        new: true, // This option returns the updated document
        runValidators: true, // This option runs the validation on the updated data
      }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "addOccupationItem: User not found" });
    }

    // Update user data
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { $push: { employees: userId } },
      {
        new: true, // This option returns the updated document
        runValidators: true, // This option runs the validation on the updated data
      }
    );

    if (!updatedCompany) {
      return res
        .status(404)
        .json({ message: "addOccupationItem: Company not found" });
    }

    await savedOccupation.populate("companyId");
    res.status(200).json({
      message: "addOccupationItem: Profile updated successfully",
      user: updatedUser,
      newItem: savedOccupation,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getOccupationItems = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const occupationItems = await Occupation.find({
      _id: { $in: user.occupation },
    }).populate("companyId");

    res
      .status(200)
      .json({ message: "Profile updated successfully", occupationItems });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteOccupationItem = async (req, res) => {
  try {
    const userId = req.params.id;
    const { occupationId, companyId } = req.body; // Assuming the request body contains the updated data

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { occupation: occupationId } },
      {
        new: true, // This option returns the updated document
        runValidators: true, // This option runs the validation on the updated data
      }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "deleteOccupationItem: User not found" });
    }

    // TODO - double request to the DB, can be optimized
    const user = await User.findById(userId);
    // Loop through the user's education items and check if the there is an institutionId matching
    // the newly removed education item
    // If there is no other education item with the same institutionId, remove the user from the institution's students list
    let shouldRemove = false;
    user.occupation.forEach((occupationId) => {
      if (occupationId.companyId === companyId) {
        shouldRemove = true;
        return;
      }
    });

    // Update user data
    if (shouldRemove) {
      const updatedCompany = await Company.findByIdAndUpdate(
        companyId,
        { $pull: { employees: userId } },
        {
          new: true, // This option returns the updated document
          runValidators: true, // This option runs the validation on the updated data
        }
      );

      if (!updatedCompany) {
        return res
          .status(404)
          .json({ message: "deleteOccupationItem: Company not found" });
      }
    }

    res.status(200).json({
      message: "deleteOccupationItem: Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
