import express from "express";
import { handleGoogleLogin } from "../controllers/authController.js";

const router = express.Router();

/**
 * @route POST /auth/google
 * @description Rota para autenticar um usuário com o Google OAuth 2.0.
 * @access Public
 * @body { "accessToken": "string" }
 */
router.post("/google", handleGoogleLogin);

export default router;
