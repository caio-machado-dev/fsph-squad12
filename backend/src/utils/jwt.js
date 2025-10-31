import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET || "seu_segredo_super_secreto_aqui";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/**
 * Gera um token JWT para um usuário.
 * @param {object} payload - Os dados para incluir no token (ex: id, nome).
 * @returns {string} - O token JWT gerado.
 */
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifica a validade de um token JWT.
 * @param {string} token - O token JWT a ser verificado.
 * @returns {object | null} - O payload decodificado se o token for válido, senão null.
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("Erro na verificação do token:", error.message);
    return null;
  }
}

export { generateToken, verifyToken };
