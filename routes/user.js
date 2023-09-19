import express from "express";
import {
  getUser,
  updateUser,
  addEducationItem,
  getEducationItems,
  deleteEducationItem,
  addOccupationItem,
  getOccupationItems,
  deleteOccupationItem,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

// Handle all routes that start with /user
const userRouter = express.Router();

userRouter
  .route("/:id")
  .get(verifyToken, getUser)
  .patch(verifyToken, updateUser);

userRouter.route("/addEducationItem/:id").post(verifyToken, addEducationItem);

userRouter.route("/getEducationItems/:id").get(verifyToken, getEducationItems);

userRouter
  .route("/deleteEducationItem/:id")
  .delete(verifyToken, deleteEducationItem);

userRouter.route("/addOccupationItem/:id").post(verifyToken, addOccupationItem);

userRouter
  .route("/getOccupationItems/:id")
  .get(verifyToken, getOccupationItems);

userRouter
  .route("/deleteOccupationItem/:id")
  .delete(verifyToken, deleteOccupationItem);

export default userRouter;
