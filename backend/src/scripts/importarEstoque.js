import fetch from 'node-fetch';
import mysql from 'mysql2/promise';
import 'dotenv/config'; // para usar variáveis do .env

// Configuração do banco
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'chatbot',
  database: process.env.DB_NAME || 'fsphemo_db',
};

// URL da API
const url = 'https://api.fsph.se.gov.br/apiinterface/estoque';

// Função para inserir dados no banco
const inserirDados = async (dados) => {
  const conexao = await mysql.createConnection(dbConfig);

  try {
    const sql = `
      INSERT INTO estoque (grupoabo, fatorrh, updated, situacao, cobertura)
      VALUES ?
      ON DUPLICATE KEY UPDATE
        updated = VALUES(updated),
        situacao = VALUES(situacao),
        cobertura = VALUES(cobertura)
    `;

    // Converte o campo updated para o formato DATETIME do MySQL
    const valores = dados.map(item => [
      item.grupoabo,
      item.fatorrh,
      new Date(item.updated).toISOString().slice(0, 19).replace('T', ' '), // YYYY-MM-DD HH:MM:SS
      item.situacao,
      item.cobertura
    ]);

    const [resultado] = await conexao.query(sql, [valores]);
    console.log(`Inseridos/Atualizados ${resultado.affectedRows} registros.`);
  } catch (erro) {
    console.error('Erro ao inserir dados:', erro);
  } finally {
    await conexao.end();
  }
};

// Função principal para importar o estoque
const importarEstoque = async () => {
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error(`Erro na requisição: ${resposta.statusText}`);

    const respostaJson = await resposta.json();
    const dados = respostaJson.data;

    if (!Array.isArray(dados)) throw new Error('Dados da API não estão no formato esperado.');

    await inserirDados(dados);
    console.log('Importação finalizada com sucesso!');
  } catch (erro) {
    console.error('Erro ao importar estoque:', erro);
  }
};

// Executa a importação
importarEstoque();
