import mongoose from "mongoose";
import { validateUser, validateInstitution } from "../utils/validators.js";

const currentYear = new Date().getFullYear();
const MIN_START_YEAR = 1990;
const MAX_START_YEAR = currentYear + 1;
const MAX_END_YEAR = currentYear + 10;

const educationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
      validate: {
        validator: validateUser,
        message: "Invalid userId.",
      },
    },
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: [true, "Institution ID is required."],
      validate: {
        validator: validateInstitution,
        message: "Invalid institutionId.",
      },
    },
    startYear: {
      type: Number,
      min: [
        MIN_START_YEAR,
        `Start year must be greater than or equal to ${MIN_START_YEAR}.`,
      ],
      max: [MAX_START_YEAR, `Start year cannot exceed ${MAX_START_YEAR}.`],
      default: MIN_START_YEAR,
    },
    endYear: {
      type: Number,
      min: [
        function () {
          return this.startYear;
        },
        "End year must be greater than or equal to start year.",
      ],
      max: [MAX_END_YEAR, `End year cannot exceed ${MAX_END_YEAR}.`],
    },
    degree: {
      type: String,
      minlength: [4, "Degree must be at least 4 characters."],
      maxlength: [30, "Degree cannot exceed 30 characters."],
      required: [true, "Degree is required."],
    },
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);

export default Education;
