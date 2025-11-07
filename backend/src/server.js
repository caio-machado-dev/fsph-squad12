// ==========================
// SERVIDOR EXPRESS PRINCIPAL
// ==========================
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";

// Carrega variáveis do .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================
// MIDDLEWARES BÁSICOS
// ==========================
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================
// ROTA DE VERIFICAÇÃO
// ==========================
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API FSPH Squad 12 está rodando 🚀" });
});

// ==========================
// ROTAS PRINCIPAIS
// ==========================
import routes from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

app.use("/api", routes);
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

// ==========================
// MIDDLEWARE GLOBAL DE ERRO
// ==========================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno no servidor" });
});

// ===============================
// EXECUTA O SCRIPT DE ATUALIZAÇÃO
// ===============================
import startImportSchedule from "./scripts/importarEstoque.js";

try {
  startImportSchedule();
  console.log("Script de atualização de estoque iniciado automaticamente.");
} catch (err) {
  console.error("Falha ao iniciar o script de estoque:", err.message);
}

// ===========================================
// FUNÇÃO PARA INICIAR O SERVIDOR COM TENTATIVAS
// ===========================================
function startServer(port = PORT, attempts = 5) {
  const server = app.listen(port, () => {
    console.log(`✅ Servidor rodando na porta ${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`⚠️ Porta ${port} ocupada.`);
      if (attempts > 0) {
        const nextPort = port + 1;
        console.log(`Tentando porta ${nextPort} (${attempts} tentativas restantes)...`);
        setTimeout(() => startServer(nextPort, attempts - 1), 500);
      } else {
        console.error("❌ Não foi possível iniciar o servidor: todas as portas tentadas estão ocupadas.");
        console.error("Se quiser liberar a porta 3000 rode no PowerShell:");
        console.error("  netstat -ano | findstr :3000");
        console.error("  taskkill /PID <pid> /F");
        process.exit(1);
      }
    } else {
      console.error("Erro no servidor:", err);
      process.exit(1);
    }
  });
}

startServer();

export default app;
