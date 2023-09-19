import express from "express";
import { logout, login, register } from "../controllers/auth.js";

// Handle all routes that start with /auth 
const authRouter = express.Router();

authRouter.post("/logout", logout);
authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;
