import mongoose from "mongoose";
import { validateUser, validateLink } from "../utils/validators.js";

const institutionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Institution name is required."],
      minlength: [2, "Institution name must be at least 2 characters."],
      maxlength: [50, "Institution name cannot exceed 50 characters."],
      index: true, // Add index to 'name' field
      lowercase: true, // Convert 'name' value to lowercase
      trim: true, // Use 'trim' option to remove leading and trailing spaces
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        validate: {
          validator: validateUser,
          message: "Invalid userId.",
        },
      },
    ],
    logoPath: {
      type: String,
      default: "",
      validate: {
        validator: validateLink,
        message: "Invalid logoPath value.",
      },
    },
  },
  { timestamps: true }
);

const Institution = mongoose.model("Institution", institutionSchema);

export default Institution;
