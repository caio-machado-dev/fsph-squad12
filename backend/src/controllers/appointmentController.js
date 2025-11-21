import { getConnection } from "../config/database.js";

// Cria um novo agendamento e salva a pré-triagem
export async function createAppointment(req, res) {
  const pool = await getConnection();
  // Para transações, precisamos de uma conexão dedicada
  const connection = await pool.getConnection();

  try {
    const { id } = req.user; // ID do usuário vindo do token
    const {
      // Dados do agendamento
      data_agendamento, // YYYY-MM-DD HH:mm:ss
      tipo_agendamento, // 'individual', 'campaign', 'boneMarrow'
      local_agendamento,
      // Dados da pré-triagem
      pre_triagem
    } = req.body;

    await connection.beginTransaction();

    // 1. Inserir Agendamento
    const [resultAgendamento] = await connection.query(
      `INSERT INTO agendamentos
      (id_usuario, data_agendamento, tipo_agendamento, local_agendamento, status_agendamento)
      VALUES (?, ?, ?, ?, 'Pendente')`,
      [id, data_agendamento, tipo_agendamento, local_agendamento]
    );

    const idAgendamento = resultAgendamento.insertId;

    // 2. Inserir Pré-Triagem (se houver dados)
    if (pre_triagem) {
        const { peso, altura, pressao_arterial, apto_doacao, observacoes, perguntas_respostas } = pre_triagem;

        const obsFinal = observacoes || JSON.stringify(perguntas_respostas || {});

        await connection.query(
            `INSERT INTO pre_triagem
            (id_agendamento, peso, altura, pressao_arterial, apto_doacao, observacoes)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [idAgendamento, peso || null, altura || null, pressao_arterial || null, apto_doacao || true, obsFinal]
        );
    }

    await connection.commit();

    res.status(201).json({
        message: "Agendamento realizado com sucesso!",
        id_agendamento: idAgendamento
    });

  } catch (error) {
    await connection.rollback();
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({ error: "Erro interno ao processar agendamento." });
  } finally {
    // Libera a conexão de volta pro pool
    connection.release();
  }
}

// Lista agendamentos do usuário
export async function getMyAppointments(req, res) {
  const pool = await getConnection();
  try {
    const { id } = req.user;

    // Query simples pode usar o pool direto
    const [rows] = await pool.query(
        `SELECT * FROM agendamentos
         WHERE id_usuario = ?
         ORDER BY data_agendamento DESC`,
        [id]
    );

    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ error: "Erro interno ao buscar agendamentos." });
  }
  // Não precisa liberar pool.query
}
