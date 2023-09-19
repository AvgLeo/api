import express from "express";
import {
  getAllWhatsappGroups,
  newWhatsappGroup,
  updateWhatsappGroup,
  deleteWhatsappGroup,
} from "../controllers/whatsappGroup.js";
import { verifyToken } from "../middleware/auth.js";

const whatsappGroupRouter = express.Router();

whatsappGroupRouter
  .route("/")
  .get(verifyToken, getAllWhatsappGroups)
  .post(verifyToken, newWhatsappGroup);
whatsappGroupRouter
  .route("/:id")
  .patch(verifyToken, updateWhatsappGroup)
  .delete(verifyToken, deleteWhatsappGroup);

export default whatsappGroupRouter;
