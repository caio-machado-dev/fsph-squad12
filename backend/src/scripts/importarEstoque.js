import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import "dotenv/config";

// ====================== CONFIGURAÇÕES ======================
const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "chatbot",
  database: process.env.DB_NAME || "fsphemo_db",
};

const API_URL = "https://api.fsph.se.gov.br/apiinterface/estoque";
const SAVE_PATH = path.join(process.cwd(), "estoque.json");
// Intervalo de atualização em milissegundos (6 horas)
const UPDATE_INTERVAL = 6 * 60 * 60 * 1000;
const SAVE_LOCAL = (process.env.SAVE_LOCAL || 'false').toLowerCase() === 'true';
// ============================================================

// Garante que o banco exista
async function ensureDatabaseExists() {
  const { host, user, password, database } = DB_CONFIG;
  const connection = await mysql.createConnection({ host, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  console.log(`Banco de dados '${database}' verificado/criado com sucesso.`);
  await connection.end();
}

// Garante que a tabela exista
async function ensureTableExists(connection) {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS estoque (
      id INT AUTO_INCREMENT PRIMARY KEY,
      grupoabo VARCHAR(10),
      fatorrh VARCHAR(5),
      updated DATETIME,
      situacao VARCHAR(50),
      cobertura VARCHAR(50),
      UNIQUE KEY (grupoabo, fatorrh)
    )
  `;
  await connection.query(createTableSQL);
  console.log("Tabela 'estoque' verificada/criada com sucesso.");
}

// Insere ou atualiza os dados
async function inserirDados(dados) {
  await ensureDatabaseExists();
  const connection = await mysql.createConnection(DB_CONFIG);
  await ensureTableExists(connection);

  try {
    const sql = `
      INSERT INTO estoque (grupoabo, fatorrh, updated, situacao, cobertura)
      VALUES ?
      ON DUPLICATE KEY UPDATE
        updated = VALUES(updated),
        situacao = VALUES(situacao),
        cobertura = VALUES(cobertura)
    `;

    const valores = dados.map(item => [
      item.grupoabo,
      item.fatorrh,
      new Date(item.updated).toISOString().slice(0, 19).replace("T", " "),
      item.situacao,
      item.cobertura,
    ]);

    const [resultado] = await connection.query(sql, [valores]);
    console.log(`Inseridos/Atualizados ${resultado.affectedRows} registros.`);
  } catch (erro) {
    console.error("Erro ao inserir dados:", erro.message);
  } finally {
    await connection.end();
  }
}

// Busca dados da API e salva localmente
async function fetchAndSave() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);
    const data = await response.json();

    if (SAVE_LOCAL) {
      fs.writeFileSync(
        SAVE_PATH,
        JSON.stringify({ data: data.data, updatedAt: new Date().toISOString() }, null, 2)
      );
    }

    console.log(`[${new Date().toLocaleString()}] Estoque atualizado com sucesso.`);
    return data.data;
  } catch (err) {
    console.error(`[${new Date().toLocaleString()}] Falha ao atualizar estoque:`, err.message);

    if (fs.existsSync(SAVE_PATH)) {
      const last = JSON.parse(fs.readFileSync(SAVE_PATH, "utf8"));
      console.log(`Usando última atualização salva: ${last.updatedAt}`);
      return last.data;
    } else {
      console.log("Nenhum estoque salvo disponível.");
      return null;
    }
  }
}

// Importação principal
async function importarEstoque() {
  const dados = await fetchAndSave();
  if (dados && Array.isArray(dados)) {
    await inserirDados(dados);
    console.log("Importação concluída com sucesso!");
  } else {
    console.log("Nenhum dado para importar.");
  }
}

// Função que inicia o agendamento e executa imediatamente
function startImportSchedule() {
  console.log("Agendamento de atualização de estoque iniciado.");
  // execução imediata
  importarEstoque();
  // agendamento periódico
  const handle = setInterval(importarEstoque, UPDATE_INTERVAL);
  return () => clearInterval(handle);
}

// Se executado diretamente via CLI (node src/scripts/importarEstoque.js), inicia o scheduler
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  startImportSchedule();
}

export default startImportSchedule;
