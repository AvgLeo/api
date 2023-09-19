import mongoose from "mongoose";
import { validateUser, validateCompany, validateLink } from "../utils/validators.js";

const jobOfferSchema = mongoose.Schema(
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
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company ID is required."],
      validate: {
        validator: validateCompany,
        message: "Invalid companyId.",
      },
    },
    content: {
      type: String,
      required: [true, "Content is required."],
      minlength: [10, "Content must be at least 10 characters."],
      maxlength: [2000, "Content cannot exceed 2000 characters."],
    },
    offerTitle: {
      type: String,
      required: [true, "Offer title is required."],
      minlength: [2, "Offer title must be at least 2 characters."],
      maxlength: [100, "Offer title cannot exceed 100 characters."],
    },
    location: {
      type: String,
      required: [true, "Location is required."],
      minlength: [2, "Location must be at least 2 characters."],
      maxlength: [50, "Location cannot exceed 50 characters."],
    },
    offerLink: {
      type: String,
      default: "",
      validate: {
        validator: validateLink,
        message: "Invalid URL.",
      },
    },
    expReq: {
      type: String,
      default: "",
    },
    referral: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const JobOffer = mongoose.model("JobOffer", jobOfferSchema);

export default JobOffer;
