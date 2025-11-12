import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 
    message: 'Bem-vindo à API FSPH Squad 12',
    version: '1.0.0',
    documentation: {
      message: 'Acesse a rota /api/routes para ver a lista de endpoints disponíveis.'
    }
  });
});

router.get('/routes', (req, res) => {
  res.json({
    auth: {
      login: 'POST /auth/login',
      register: 'POST /auth/register',
      google: 'POST /auth/google'
    },
    estoque: {
      get: 'GET /api/estoque'
    },
    profile: {
      get: 'GET /api/profile (Autenticado)',
      update: 'PUT /api/profile (Autenticado)'
    },
    posts: {
      getAll: 'GET /api/posts (Autenticado)',
      create: 'POST /api/posts (Autenticado)'
    },
    campaigns: {
      getAll: 'GET /api/campaigns'
    }
  });
});

export default router;
