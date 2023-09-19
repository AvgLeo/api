import express from "express";
import { getAllInstitutions } from "../controllers/institutions.js";
import { verifyToken } from "../middleware/auth.js";

// Handle all routes that start with /users
const institutionsRouter = express.Router();

institutionsRouter.route("/").get(verifyToken, getAllInstitutions);

export default institutionsRouter;
