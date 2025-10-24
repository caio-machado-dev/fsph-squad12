import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 
    message: 'FSPH Squad 12 API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api'
    }
  });
});

export default router;
// (estoque route removed per project requirements)