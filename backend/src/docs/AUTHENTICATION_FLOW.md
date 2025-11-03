# Documentação do Fluxo de Autenticação com Google OAuth 2.0

Este documento descreve o fluxo de autenticação para o backend, que utiliza um `accessToken` do Google fornecido pelo cliente (Web, iOS ou Android) para autenticar e autorizar usuários.

## Visão Geral

O fluxo de autenticação é projetado para ser *stateless* (sem estado), utilizando JSON Web Tokens (JWT) para gerenciar as sessões dos usuários após o login inicial.

O processo pode ser resumido da seguinte forma:
1.  O cliente (aplicação frontend) obtém um `accessToken` do Google.
2.  O cliente envia este `accessToken` para o endpoint de autenticação do nosso backend.
3.  O backend valida o `accessToken` com os servidores do Google.
4.  Após a validação, o backend procura o usuário no banco de dados pelo `google_id`.
    - Se o usuário existe, seus dados são recuperados.
    - Se o usuário não existe, um novo registro é criado.
5.  O backend gera um token JWT próprio, contendo informações do usuário.
6.  O backend retorna este token JWT para o cliente.
7.  O cliente armazena o token JWT e o utiliza no cabeçalho `Authorization` para acessar rotas protegidas da API.

---

## Passo a Passo

### 1. Endpoint de Autenticação

-   **Método:** `POST`
-   **URL:** `/auth/google`

### 2. Corpo da Requisição (Request Body)

O cliente deve enviar um objeto JSON contendo o `accessToken` obtido do Google.

```json
{
  "accessToken": "SEU_ACCESS_TOKEN_AQUI_OBTIDO_DO_GOOGLE"
}
```

### 3. Resposta de Sucesso (200 OK)

Se o `accessToken` for válido, o backend responderá com um objeto JSON contendo o token JWT da aplicação e informações básicas do usuário.

```json
{
  "message": "Autenticação bem-sucedida!",
  "token": "SEU_TOKEN_JWT_GERADO_PELO_BACKEND",
  "user": {
    "id": 123,
    "nome": "Nome do Usuário",
    "email": "usuario@exemplo.com",
    "foto": "URL_DA_FOTO_DE_PERFIL_DO_GOOGLE"
  }
}
```

### 4. Respostas de Erro

-   **400 Bad Request:** Se o `accessToken` não for fornecido no corpo da requisição.
    ```json
    {
      "error": "O accessToken do Google é obrigatório."
    }
    ```
-   **401 Unauthorized:** Se o `accessToken` for inválido ou expirado.
    ```json
    {
      "error": "Token do Google inválido."
    }
    ```
-   **500 Internal Server Error:** Se ocorrer um erro inesperado no servidor durante o processo.
    ```json
    {
      "error": "Erro interno no servidor durante a autenticação."
    }
    ```

---

## Variáveis de Ambiente Necessárias

Para que o sistema de autenticação funcione corretamente, as seguintes variáveis de ambiente devem ser configuradas no arquivo `.env` do backend:

-   `GOOGLE_CLIENT_ID`: O Client ID da sua aplicação, obtido no Google Cloud Console. É essencial para validar o `accessToken`.
-   `JWT_SECRET`: Uma string secreta e longa, usada para assinar e verificar os tokens JWT da sua aplicação.
-   `JWT_EXPIRES_IN`: O tempo de expiração para os tokens JWT (ex: `"7d"`, `"24h"`, `"1h"`).

Exemplo de configuração no `.env`:
```
GOOGLE_CLIENT_ID="SEU_CLIENT_ID.apps.googleusercontent.com"
JWT_SECRET="seu_segredo_super_seguro_e_dificil_de_adivinhar"
JWT_EXPIRES_IN="7d"
```
