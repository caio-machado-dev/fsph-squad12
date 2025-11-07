import express from 'express';
import { getCampaigns } from '../controllers/campaignsController.js';

const router = express.Router();

// Rota pública para listar as campanhas
router.get('/', getCampaigns);

export default router;
