import express from 'express';
import { getEstoque } from '../controllers/estoqueController.js';

const router = express.Router();

// A rota agora aponta para a função getEstoque no controller
router.get('/', getEstoque);

export default router;
