import mongoose from "mongoose";
import { validateUser, validateLink } from "../utils/validators.js";

const whatsappGroupSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required."],
    validate: {
      validator: validateUser,
      message: "Invalid userId.",
    },
  },
  link: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    validate: {
      validator: validateLink,
      message: "Invalid link value",
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    index: true,
  },
  tags: [
    {
      type: String,
      minlength: 2,
      maxlength: 20,
    },
  ],
  });

const WhatsappGroup = mongoose.model("WhatsappGroup", whatsappGroupSchema);

export default WhatsappGroup;
