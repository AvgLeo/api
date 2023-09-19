import express from "express";
import { getCompany } from "../controllers/company.js";
import { verifyToken } from "../middleware/auth.js";

// Handle all routes that start with /users
const companyRouter = express.Router();

companyRouter.route("/:id").get(verifyToken, getCompany);

export default companyRouter;
