import mysql from "mysql2/promise";
import "dotenv/config";

// Configurações do banco de dados, incluindo as do pool
const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "chatbot",
  database: process.env.DB_NAME || "fsphemo_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Garante que o banco de dados exista antes de criar o pool
async function ensureDatabaseExists() {
  // Usa um subconjunto de config, sem 'database' para a conexão inicial
  const { host, user, password } = DB_CONFIG;
  const dbName = DB_CONFIG.database;
  let connection;
  try {
    // Cria uma conexão temporária apenas para verificar/criar o banco
    connection = await mysql.createConnection({ host, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Banco de dados '${dbName}' verificado/criado com sucesso.`);
  } catch (error) {
    console.error("Erro ao verificar/criar o banco de dados:", error);
    throw error; // Propaga o erro para ser tratado no nível superior
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Singleton para o pool de conexões
let pool;

// Promessa que representa a inicialização do pool
// Isso garante que qualquer chamada para getConnection espere a conclusão da inicialização
const poolInitializationPromise = (async () => {
  try {
    await ensureDatabaseExists();
    pool = mysql.createPool(DB_CONFIG);

    // Testa a conexão para garantir que o pool é válido antes de prosseguir
    const connection = await pool.getConnection();
    console.log("Pool de conexões com o banco de dados inicializado com sucesso.");
    connection.release();
  } catch (error) {
    console.error("Falha crítica ao inicializar o pool de conexões:", error);
    // Se a inicialização do pool falhar, a aplicação não pode funcionar corretamente.
    // Lançar o erro aqui fará com que a promessa seja rejeitada.
    throw error;
  }
})();


/**
 * Obtém uma conexão do pool.
 * A função aguarda a inicialização do pool antes de tentar obter uma conexão.
 * @returns {Promise<import('mysql2/promise').PoolConnection>} Uma conexão do pool.
 */
async function getConnection() {
  try {
    // Aguarda a promessa de inicialização ser resolvida.
    // Se a promessa for rejeitada, o erro será propagado aqui.
    await poolInitializationPromise;
  } catch (error) {
    console.error("O pool de conexões não pôde ser inicializado. A aplicação não pode obter novas conexões.");
    // Encerra a aplicação se o pool não puder ser criado, pois é uma falha crítica.
    process.exit(1);
  }

  // Neste ponto, o pool deve estar inicializado e pronto
  return pool.getConnection();
}

export { getConnection };
