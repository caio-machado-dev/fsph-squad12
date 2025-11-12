import { getConnection } from '../config/database.js';

// Função para formatar a data para dd/mm/aa
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

export const getEstoque = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const [rows] = await conn.query('SELECT grupoabo, fatorrh, updated, situacao, cobertura FROM estoque ORDER BY grupoabo, fatorrh');

    const formattedData = rows.map(row => ({
      tipo: `${row.grupoabo}${row.fatorrh}`,
      data_atualizacao: formatDate(row.updated),
      situacao: row.situacao,
      cobertura: row.cobertura,
    }));

    res.json(formattedData);
  } catch (err) {
    console.error('Erro ao consultar estoque no DB:', err);
    res.status(500).json({ error: 'Erro ao consultar o estoque de sangue.' });
  } finally {
    if (conn) {
      await conn.end();
    }
  }
};
