import express from "express";
import { getJobOffers, newJobOffer } from "../controllers/jobs.js";
import { verifyToken } from "../middleware/auth.js";

// Handle all routes that start with /jobs
const jobsRouter = express.Router();

jobsRouter.route("/").get(verifyToken, getJobOffers).post(verifyToken, newJobOffer);

export default jobsRouter;
