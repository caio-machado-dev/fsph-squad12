import { getConnection } from "../config/database.js";

export async function getHistory(req, res) {
  const connection = await getConnection();
  try {
    const { id } = req.user;

    // Busca doações realizadas (confirmadas)
    const [doacoes] = await connection.query(
        `SELECT
            id_doacao as id,
            data_doacao as date,
            local_doacao as local,
            'Doação Realizada' as type,
            volume_coletado
         FROM doacoes
         WHERE id_usuario = ?
         ORDER BY data_doacao DESC`,
        [id]
    );

    // Busca agendamentos (futuros e passados)
    const [agendamentos] = await connection.query(
        `SELECT
            id_agendamento as id,
            data_agendamento as date,
            local_agendamento as local,
            CONCAT('Agendamento - ', status_agendamento) as type
         FROM agendamentos
         WHERE id_usuario = ?
         ORDER BY data_agendamento DESC`,
        [id]
    );

    // Unifica e ordena
    // Adiciona flag para saber origem
    const history = [
        ...doacoes.map(d => ({...d, origin: 'donation'})),
        ...agendamentos.map(a => ({...a, origin: 'appointment'}))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(history);

  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    res.status(500).json({ error: "Erro interno ao buscar histórico." });
  } finally {
    connection.release();
  }
}
