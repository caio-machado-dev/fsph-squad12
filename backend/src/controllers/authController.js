import { OAuth2Client } from "google-auth-library";
import {
  findOrCreateUserByGoogleId,
  createUser,
  findUserByEmail,
} from "../services/userService.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";
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

async function registerUser(req, res) {
  const { nome_completo, email, senha } = req.body;

  if (!nome_completo || !email || !senha) {
    return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "O email já está em uso." });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = await createUser({ nome_completo, email, senha: hashedPassword });

    const appToken = generateToken({
      id: newUser.id_usuario,
      nome: newUser.nome_completo,
      email: newUser.email,
    });

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      token: appToken,
      user: {
        id: newUser.id_usuario,
        nome: newUser.nome_completo,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor ao registrar usuário." });
  }
}

async function loginUser(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const appToken = generateToken({
      id: user.id_usuario,
      nome: user.nome_completo,
      email: user.email,
    });

    res.status(200).json({
      message: "Login bem-sucedido!",
      token: appToken,
      user: {
        id: user.id_usuario,
        nome: user.nome_completo,
        email: user.email,
        foto: user.foto_perfil,
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro interno no servidor ao fazer login." });
  }
}

export { handleGoogleLogin, registerUser, loginUser };
