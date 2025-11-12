import express from "express";
import { handleGoogleLogin, registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

/**
 * @route POST /auth/google
 * @description Rota para autenticar um usuário com o Google OAuth 2.0.
 * @access Public
 * @body { "idToken": "string" }
 */
router.post("/google", handleGoogleLogin);

/**
 * @route POST /auth/register
 * @description Rota para registrar um novo usuário com email e senha.
 * @access Public
 * @body { "nome_completo": "string", "email": "string", "senha": "string" }
 */
router.post("/register", registerUser);

/**
 * @route POST /auth/login
 * @description Rota para autenticar um usuário com email e senha.
 * @access Public
 * @body { "email": "string", "senha": "string" }
 */
router.post("/login", loginUser);


export default router;
