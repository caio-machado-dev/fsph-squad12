import { getConnection } from "../config/database.js";

// Cria um novo agendamento e salva a pré-triagem
export async function createAppointment(req, res) {
  const connection = await getConnection();
  try {
    const { id } = req.user; // ID do usuário vindo do token
    const {
      // Dados do agendamento
      data_agendamento, // YYYY-MM-DD HH:mm:ss
      tipo_agendamento, // 'individual', 'campaign', 'boneMarrow'
      local_agendamento,
      cidade, // opcional, se quiser salvar separado
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

        // Se 'perguntas_respostas' for um objeto JSON, converta para string para salvar em 'observacoes' ou crie campo específico
        // Aqui vamos simplificar salvando em observacoes se não tiver campo específico
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
    connection.release();
  }
}

// Lista agendamentos do usuário
export async function getMyAppointments(req, res) {
  const connection = await getConnection();
  try {
    const { id } = req.user;

    // Busca agendamentos ordenados por data
    const [rows] = await connection.query(
        `SELECT * FROM agendamentos
         WHERE id_usuario = ?
         ORDER BY data_agendamento DESC`,
        [id]
    );

    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ error: "Erro interno ao buscar agendamentos." });
  } finally {
    connection.release();
  }
}
