import { OAuth2Client } from "google-auth-library";
import { findOrCreateUserByGoogleId } from "../services/userService.js";
import { generateToken } from "../utils/jwt.js";
import "dotenv/config";

// Inicializa o cliente do Google OAuth
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Lida com o login do Google.
 * Recebe um accessToken do cliente, valida-o com o Google,
 * encontra ou cria um usuário em nosso banco de dados,
 * e retorna um token JWT para o cliente.
 */
async function handleGoogleLogin(req, res) {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: "O accessToken do Google é obrigatório." });
  }

  try {
    // 1. Verifica o accessToken com o Google
    const ticket = await client.verifyIdToken({
      idToken: accessToken,
      audience: process.env.GOOGLE_CLIENT_ID, // Especifique o CLIENT_ID
    });
    const googleProfile = ticket.getPayload();

    if (!googleProfile) {
      return res.status(401).json({ error: "Token do Google inválido." });
    }

    // 2. Encontra ou cria o usuário no banco de dados
    const user = await findOrCreateUserByGoogleId(googleProfile);

    // 3. Gera o token JWT da nossa aplicação
    const appToken = generateToken({
      id: user.id_usuario,
      nome: user.nome_completo,
      email: user.email,
    });

    // 4. Retorna o token JWT para o cliente
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
