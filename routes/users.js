import express from "express";
import { getAllUsers } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

// Handle all routes that start with /users
const usersRouter = express.Router();

usersRouter.route("/").get(verifyToken, getAllUsers);

export default usersRouter;
