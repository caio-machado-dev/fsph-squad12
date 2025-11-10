import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Aplica o middleware de autenticação a todas as rotas deste arquivo
router.use(authMiddleware);

// Rota para obter os dados do perfil do usuário logado
router.get('/', getProfile);

// Rota para atualizar os dados do perfil do usuário logado
router.put('/', updateProfile);

export default router;
