import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route GET /api/users/me
 * @description Rota para buscar os dados do perfil do usuário logado.
 * @access Private
 */
router.get("/me", authMiddleware, getUserProfile);

/**
 * @route PUT /api/users/me
 * @description Rota para atualizar os dados do perfil do usuário logado.
 * @access Private
 */
router.put("/me", authMiddleware, updateUserProfile);

export default router;
