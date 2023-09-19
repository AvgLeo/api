import express from "express";
import { getAllCompanies } from "../controllers/companies.js";
import { verifyToken } from "../middleware/auth.js";

// Handle all routes that start with /users
const companiesRouter = express.Router();

companiesRouter.route("/").get(verifyToken, getAllCompanies);

export default companiesRouter;
