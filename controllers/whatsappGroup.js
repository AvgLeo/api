import mongoose from "mongoose";
import WhatsappGroup from "../models/WhatsappGroup.js";

// get all WhatsappGroups from db and send to frontend
export const getAllWhatsappGroups = async (req, res) => {
  try {
    const whatsappGroups = await WhatsappGroup.find();
    if (!whatsappGroups) {
      return res.status(404).json({ message: "WhatsappGroups not found" });
    }
    res.status(200).json(whatsappGroups);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// new WhatsappGroup
export const newWhatsappGroup = async (req, res) => {
  const whatsappGroup = req.body;
  const newWhatsappGroup = new WhatsappGroup(whatsappGroup);
  try {
    await newWhatsappGroup.save();
    res.status(201).json(newWhatsappGroup);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// update a WhatsappGroup in db
export const updateWhatsappGroup = async (req, res) => {
  const { id: _id } = req.params;
  const whatsappGroup = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No WhatsappGroup with that id");
  }

  const updatedWhatsappGroup = await WhatsappGroup.findByIdAndUpdate(
    _id,
    whatsappGroup,
    { new: true }
  );

  res.json(updatedWhatsappGroup);
};

// delete a WhatsappGroup from db
export const deleteWhatsappGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No WhatsappGroup with that id");
  }

  await WhatsappGroup.findByIdAndRemove(id);

  res.json({ message: "WhatsappGroup deleted successfully" });
};