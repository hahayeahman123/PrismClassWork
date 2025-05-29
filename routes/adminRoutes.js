import express from "express";
import { addRole, removeRole, blockUser, unblockUser, deleteUser } from "../controllers/adminController.js";
import { authentificate, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-role", authentificate, isAdmin, addRole);
router.post("/remove-role", authentificate, isAdmin, removeRole);
router.post("/block-user", authentificate, isAdmin, blockUser);
router.post("/unblock-user", authentificate, isAdmin, unblockUser);
router.post("/delete-user", authentificate, isAdmin, deleteUser);

export default router;
