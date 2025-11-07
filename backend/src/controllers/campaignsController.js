// Mock data para simular campanhas
const mockCampaigns = [
  { id_campanha: 1, nome_campanha: 'Doe Sangue, Salve Vidas - Centro', descricao: 'Campanha de doação de sangue no centro da cidade.', data_inicio: new Date(), data_fim: new Date(), local_campanha: 'Praça Central', status_campanha: 'Ativa' },
  { id_campanha: 2, nome_campanha: 'Semana da Doação - Hospital Regional', descricao: 'Participe da nossa campanha semanal no hospital.', data_inicio: new Date(), data_fim: new Date(), local_campanha: 'Hospital Regional', status_campanha: 'Ativa' }
];

// Função para listar as campanhas
export const getCampaigns = async (req, res) => {
  try {
    // Retorna os dados mockados
    res.json(mockCampaigns);
  } catch (error) {
    console.error('Erro ao buscar campanhas:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};
