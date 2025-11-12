import { findUserById, updateUserById } from "../services/userService.js";

async function getUserProfile(req, res) {
  try {
    // O ID do usuário é extraído do token JWT pelo authMiddleware
    const userId = req.user.id;

    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Remove a senha do objeto antes de enviá-lo na resposta
    const { senha, ...userProfile } = user;

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

async function updateUserProfile(req, res) {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    // Remove campos que não devem ser atualizados diretamente pelo usuário
    delete updateData.id_usuario;
    delete updateData.email; // O email geralmente requer um processo de verificação para ser alterado
    delete updateData.google_id;
    delete updateData.senha;
    delete updateData.data_criacao;

    const updatedUser = await updateUserById(userId, updateData);

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const { senha, ...userProfile } = updatedUser;
    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Erro ao atualizar perfil do usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

export { getUserProfile, updateUserProfile };
