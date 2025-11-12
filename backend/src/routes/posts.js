import express from 'express';
import { getPosts, createPost } from '../controllers/postsController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Aplica o middleware de autenticação a todas as rotas
router.use(authMiddleware);

// Rota para listar todas as postagens
router.get('/', getPosts);

// Rota para criar uma nova postagem
router.post('/', createPost);

export default router;
