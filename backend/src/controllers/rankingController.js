import { getConnection } from "../config/database.js";

export async function getRanking(req, res) {
  const pool = await getConnection();
  try {
    // Ranking baseado no total de doações confirmadas na tabela contador_doacoes
    const [rows] = await pool.query(
        `SELECT
            u.nome_completo as nome,
            u.foto_perfil,
            c.total_doacoes
         FROM contador_doacoes c
         JOIN usuarios u ON c.id_usuario = u.id_usuario
         ORDER BY c.total_doacoes DESC
         LIMIT 10`
    );

    // Se a tabela contador_doacoes estiver vazia, fallback para count na tabela doacoes
    if (rows.length === 0) {
        const [fallbackRows] = await pool.query(
            `SELECT
                u.nome_completo as nome,
                u.foto_perfil,
                COUNT(d.id_doacao) as total_doacoes
             FROM doacoes d
             JOIN usuarios u ON d.id_usuario = u.id_usuario
             GROUP BY d.id_usuario
             ORDER BY total_doacoes DESC
             LIMIT 10`
        );
        return res.json(fallbackRows);
    }

    res.json(rows);

  } catch (error) {
    console.error("Erro ao buscar ranking:", error);
    res.status(500).json({ error: "Erro interno ao buscar ranking." });
  }
}
