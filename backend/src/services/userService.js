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

async function createUser(userData) {
  const { nome_completo, email, senha } = userData;
  const connection = await getConnection();
  try {
    const newUser = {
      nome_completo,
      email,
      senha, // Lembre-se que a senha já deve vir com hash
    };
    const [result] = await connection.query(
      "INSERT INTO usuarios SET ?",
      newUser
    );
    newUser.id_usuario = result.insertId;
    return newUser;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
}

async function findUserByEmail(email) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Erro ao buscar usuário por email:", error);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
}

async function findUserById(id) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
}

async function updateUserById(id, updateData) {
  let connection; // Declarado aqui para ser acessível no finally
  try {
    connection = await getConnection();
    // Garante que o objeto de atualização não esteja vazio
    if (Object.keys(updateData).length === 0) {
      // Reutiliza a conexão existente para buscar o usuário
      const [rows] = await connection.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id]);
      return rows.length > 0 ? rows[0] : null;
    }

    await connection.query("UPDATE usuarios SET ? WHERE id_usuario = ?", [
      updateData,
      id,
    ]);

    // Reutiliza a conexão para buscar o usuário atualizado
    const [rows] = await connection.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Erro ao atualizar usuário por ID:", error);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
}

export {
  findOrCreateUserByGoogleId,
  createUser,
  findUserByEmail,
  findUserById,
  updateUserById,
};
