import { findUserById, updateUserById } from '../services/userService.js';

// Função para buscar o perfil do usuário logado
export const getProfile = async (req, res) => {
  try {
    // O ID do usuário é extraído do token pelo middleware de autenticação
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    // Retorna os dados do usuário (sem a senha)
    const { senha, ...profileData } = user;
    res.json(profileData);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};

// Função para atualizar o perfil do usuário logado
export const updateProfile = async (req, res) => {
  try {
    // O ID do usuário vem do token
    const userId = req.user.id;
    // Os dados a serem atualizados vêm do corpo da requisição
    const userData = req.body;

    // Garante que o usuário não possa atualizar campos sensíveis como ID
    delete userData.id_usuario;

    const updatedUser = await updateUserById(userId, userData);
    const { senha, ...profileData } = updatedUser;
    res.json({ message: 'Perfil atualizado com sucesso!', user: profileData });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};
