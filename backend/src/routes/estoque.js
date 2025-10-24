import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Consulta o banco e retorna resultados ordenados
router.get('/', async (req, res) => {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'fsphemo_db',
  };

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.query('SELECT grupoabo, fatorrh, updated, situacao, cobertura FROM estoque ORDER BY grupoabo, fatorrh');
    await conn.end();
    res.json({ data: rows });
  } catch (err) {
    // Log completo para diagnosticar
    console.error('Erro ao consultar estoque no DB:', err);
    const isProd = (process.env.NODE_ENV || 'development') === 'production';
    res.status(500).json({ error: isProd ? 'Erro ao consultar estoque' : `Erro ao consultar estoque: ${err.message}` });
  }
});

export default router;
