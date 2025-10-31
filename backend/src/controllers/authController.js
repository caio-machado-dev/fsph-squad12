import { OAuth2Client } from "google-auth-library";
import { findOrCreateUserByGoogleId } from "../services/userService.js";
import { generateToken } from "../utils/jwt.js";
import "dotenv/config";

// Inicializa o cliente OAuth do Google
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Lida com login via Google.
 * Recebe idToken do cliente, valida com o Google,
 * encontra ou cria usuário no banco de dados,
 * e retorna token JWT da aplicação.
 */
async function handleGoogleLogin(req, res) {
  const { idToken } = req.body; // <-- agora recebemos idToken

  if (!idToken) {
    return res.status(400).json({ error: "O idToken do Google é obrigatório." });
  }

  try {
    // Verifica o idToken com o Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const googleProfile = ticket.getPayload();

    if (!googleProfile) {
      return res.status(401).json({ error: "Token do Google inválido." });
    }

    // Encontra ou cria usuário no banco
    const user = await findOrCreateUserByGoogleId(googleProfile);

    // Gera JWT da aplicação
    const appToken = generateToken({
      id: user.id_usuario,
      nome: user.nome_completo,
      email: user.email,
    });

    // Retorna token e dados do usuário
    res.status(200).json({
      message: "Autenticação bem-sucedida!",
      token: appToken,
      user: {
        id: user.id_usuario,
        nome: user.nome_completo,
        email: user.email,
        foto: user.foto_perfil,
      },
    });
  } catch (error) {
    console.error("Erro na autenticação com Google:", error);
    res.status(500).json({ error: "Erro interno no servidor durante a autenticação." });
  }
}

export { handleGoogleLogin };
