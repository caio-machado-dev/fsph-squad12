import mysql from "mysql2/promise";
import "dotenv/config";

const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "chatbot",
  database: process.env.DB_NAME || "fsphemo_db",
};

// Garante que o banco de dados exista antes de tentar conectar
async function ensureDatabaseExists() {
  const { host, user, password, database } = DB_CONFIG;
  let connection;
  try {
    connection = await mysql.createConnection({ host, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    console.log(`Banco de dados '${database}' verificado/criado com sucesso.`);
  } catch (error) {
    console.error("Erro ao verificar/criar o banco de dados:", error);
    throw error; // Propaga o erro para quem chamou
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Função principal para obter uma conexão com o banco de dados
async function getConnection() {
  try {
    // Garante que o DB exista antes de estabelecer a conexão principal
    await ensureDatabaseExists();
    const connection = await mysql.createConnection(DB_CONFIG);
    return connection;
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
    process.exit(1); // Encerra a aplicação se a conexão com o DB falhar
  }
}

export { getConnection };
