# Análise e Relatório do Projeto Hemose

## Visão Geral

Este relatório detalha a análise completa do projeto, com foco no backend e no diagnóstico de problemas de ambiente de desenvolvimento. O projeto possui uma base muito sólida, mas contém inconsistências críticas e funcionalidades inacabadas que precisam de atenção.

---

## 1. Diagnóstico do Problema no Ambiente Android

*   **Problema Identificado:** A aplicação não rodava no Android Studio devido a um erro de `"caminho não encontrado"` (`spawn ENOENT`).
*   **Causa Raiz:** O sistema operacional Windows não conseguia localizar as ferramentas do Android SDK (`emulator`, `adb`, etc.) porque as variáveis de ambiente (`ANDROID_HOME` e `PATH`) não estavam configuradas corretamente.
*   **Status:** **SOLUÇÃO PROPOSTA.** Forneci um script PowerShell para configurar permanentemente as variáveis de ambiente. Após a execução do script e o reinício dos terminais/editores, o ambiente de desenvolvimento deve estar funcional.

---

## 2. Análise do Backend

### ✅ Pontos Fortes

1.  **Arquitetura em Camadas Sólida:** A estrutura do código-fonte em `src` (`config`, `controllers`, `services`, `routes`, `utils`) é excelente. Essa separação de responsabilidades é uma das melhores práticas do mercado e torna o projeto fácil de manter, testar e escalar.
2.  **Fluxo de Autenticação Seguro:** A autenticação com Google (`POST /auth/google`) é implementada da forma mais segura:
    *   Recebe o `idToken` do cliente.
    *   Verifica a validade do token diretamente com o Google.
    *   Gera um JWT interno para a aplicação, desacoplando a autenticação da API do provedor OAuth.
3.  **Boas Práticas de Segurança:** O uso de `helmet` para proteção contra vulnerabilidades web comuns e `cors` para controle de acesso de origens é fundamental e está bem implementado.
4.  **Schema de Banco de Dados Robusto:** O arquivo `db/schema.sql` mostra um modelo de dados MySQL bem planejado e abrangente, cobrindo todas as principais funcionalidades esperadas para a aplicação (usuários, doações, agendamentos, campanhas, etc.).
5.  **Inicialização Inteligente do Servidor:** A lógica no `server.js` que tenta encontrar uma porta livre se a padrão estiver ocupada melhora significativamente a experiência de desenvolvimento.

### ❌ Pontos Críticos de Melhoria

1.  **Inconsistência Grave na Configuração do Banco de Dados:**
    *   **O Problema:** O código (`src/config/database.js` e `db/schema.sql`) usa **MySQL**. No entanto, o arquivo de configuração de exemplo (`.env.example`) instrui a configurar um banco **MongoDB**, e o projeto tem a dependência `mongoose` (para MongoDB) instalada.
    *   **O Impacto:** Isso torna impossível para um novo desenvolvedor configurar o ambiente corretamente. É a falha mais crítica encontrada.

2.  **Funcionalidades de API Inexistentes ou Inativas:**
    *   **O Problema:** Apesar de existir um schema de banco de dados completo, **não há rotas de API implementadas para interagir com ele**. O arquivo `src/routes/index.js` está vazio, e a única rota funcional além da autenticação (`/api/estoque`) está desativada.
    *   **O Impacto:** No estado atual, o backend é apenas um serviço de login. Ele não possui as funcionalidades de agendamento, consulta de doações, cadastro de campanhas, etc. O projeto está, em grande parte, inacabado.

3.  **Dependências Não Utilizadas (Código Morto):**
    *   **O Problema:** As dependências `mongoose`, `express-session`, `passport` e `passport-google-oauth20` estão instaladas, mas não são utilizadas no fluxo principal da aplicação, que é stateless (baseado em JWT).
    *   **O Impacto:** Isso "incha" o projeto desnecessariamente, aumenta a superfície de potenciais vulnerabilidades de segurança e confunde os desenvolvedores.

4.  **Violação de Arquitetura na Rota de Estoque:**
    *   **O Problema:** A rota inativa `src/routes/estoque.js` ignora completamente a arquitetura do projeto. Ela cria sua própria conexão com o banco de dados e mistura lógica de acesso a dados diretamente no arquivo de rota.
    *   **O Impacto:** Se essa abordagem for copiada para outras funcionalidades, a manutenibilidade do projeto será destruída.

---

## 3. Plano de Ação Recomendado (Próximos Passos)

1.  **Corrigir a Configuração do Banco de Dados (Prioridade Máxima):**
    *   Remova a dependência `mongoose` do `package.json`: `npm uninstall mongoose`.
    *   Atualize o arquivo `.env.example` para que ele contenha as variáveis de ambiente corretas para o **MySQL**: `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`.

2.  **Limpar Dependências Não Utilizadas:**
    *   Remova `express-session`, `passport` e `passport-google-oauth20`: `npm uninstall express-session passport passport-google-oauth20`.
    *   Remova a configuração de `session` e `passport` do `server.js`.

3.  **Desenvolver as Rotas da API:**
    *   Crie novos arquivos de rota em `src/routes/` para cada funcionalidade principal (ex: `usuarios.js`, `doacoes.js`, `agendamentos.js`).
    *   Para cada rota, crie os `controllers` e `services` correspondentes, seguindo a arquitetura já estabelecida.
    *   Importe e use essas novas rotas no `server.js` ou no `src/routes/index.js`.

4.  **Refatorar e Ativar a Rota de Estoque:**
    *   Mova a lógica de acesso ao banco de dados de `src/routes/estoque.js` para um novo `estoqueController.js` e `estoqueService.js`.
    *   Utilize a conexão de banco de dados centralizada de `src/config/database.js`.
    *   Importe e ative a rota de estoque no `server.js` para que ela se torne acessível.
