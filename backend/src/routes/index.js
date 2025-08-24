const express = require('express');
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

module.exports = router;