import { getConnection } from "../config/database.js";

/**
 * Encontra um usuário pelo google_id ou cria um novo se não existir.
 * @param {object} googleProfile - O perfil do usuário retornado pela validação do token do Google.
 * @returns {Promise<object>} - O usuário do banco de dados (encontrado ou criado).
 */
async function findOrCreateUserByGoogleId(googleProfile) {
  const { sub: google_id, name: nome_completo, email, picture: foto_perfil } = googleProfile;

  const connection = await getConnection();
  try {
    // 1. Tenta encontrar o usuário pelo google_id
    let [rows] = await connection.query(
      "SELECT * FROM usuarios WHERE google_id = ?",
      [google_id]
    );

    if (rows.length > 0) {
      // Usuário encontrado, retorna os dados
      return rows[0];
    } else {
      // 2. Se não encontrar, cria um novo usuário
      const newUser = {
        google_id,
        nome_completo,
        email,
        foto_perfil,
        status_ativo: true, // Define o usuário como ativo por padrão
      };

      const [result] = await connection.query(
        "INSERT INTO usuarios SET ?",
        newUser
      );

      // Retorna o usuário recém-criado
      return { id_usuario: result.insertId, ...newUser };
    }
  } catch (error) {
    console.error("Erro no serviço de usuário (findOrCreate):", error);
    throw error; // Propaga o erro para ser tratado no controller
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export { findOrCreateUserByGoogleId };
