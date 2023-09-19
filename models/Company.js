import mongoose from "mongoose";
import { validateUser, validateLink } from "../utils/validators.js";

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      minlength: [2, "Name must be at least 2 characters long."],
      maxlength: [50, "Name cannot exceed 50 characters."],
      unique: [true, "Name must be unique."],
      lowercase: true,
      index: true, // Used for faster indexing.
    },
    employees: [
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
        message: "Invalid logoPath value",
      },
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
