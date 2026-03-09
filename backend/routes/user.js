import express from "express";
import { deleteUser, login, registerUser, updatedUser } from "../controllers/userController.js";
import { adminOnly, protecting } from "../middleWare/authMiddleware.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", login);
router.put("/update/:id", protecting, adminOnly, updatedUser);
router.delete("/delete/:id", protecting, adminOnly,deleteUser);

export default router;