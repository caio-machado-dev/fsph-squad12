import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'fsphemo_db',
};

(async () => {
  try {
    const conn = await mysql.createConnection({ host: dbConfig.host, user: dbConfig.user, password: dbConfig.password });
    console.log('Conectado ao servidor MySQL com sucesso.');
    // verifica se banco existe
    const [rows] = await conn.query(`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${dbConfig.database}'`);
    if (rows && rows.length) console.log(`Banco ${dbConfig.database} existe.`); else console.log(`Banco ${dbConfig.database} NÃO encontrado.`);
    await conn.end();
  } catch (err) {
    console.error('Falha ao conectar ao MySQL:', err.message);
    process.exit(1);
  }
})();
