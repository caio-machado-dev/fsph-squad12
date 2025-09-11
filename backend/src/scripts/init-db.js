import mysql from 'mysql2/promise';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config(); // lê o .env

// Corrige __dirname no ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Caminho para o arquivo schema.sql
const schemaPath = join(__dirname, '../../db/schema.sql');

async function initDB() {
  try {
    // Conexão com MySQL
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      multipleStatements: true
    });

    // Lê o schema SQL
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    // Cria o banco se não existir
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await connection.query(`USE \`${process.env.DB_NAME}\`;`);

    // Executa o schema (tabelas)
    await connection.query(schema);

    console.log('✅ Banco inicializado com sucesso!');
    await connection.end();
  } catch (err) {
    console.error(' Erro ao inicializar o banco:', err.message);
  }
}

// Executa
initDB();
