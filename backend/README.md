# Backend — instruções de uso

Este diretório contém o backend da aplicação. Aqui estão as instruções para rodar, configurar o banco e controlar a escrita de cache local (`estoque.json`).

## Principais comportamentos implementados
- O servidor Express verifica/cria o banco e a tabela `estoque` quando necessário.
- Existe um script que consome a API externa e insere/atualiza os registros no banco de dados automaticamente.
- Ao iniciar o servidor, o script de importação também é iniciado automaticamente e agenda execuções periódicas.
- Por padrão a escrita em disco (`estoque.json`) está desabilitada — o banco é a fonte de verdade.

## Variáveis de ambiente
Coloque um arquivo `.env` no diretório `backend` (não comitar) com as variáveis mínimas:

```
DB_HOST=localhost
DB_USER=fsph_user
DB_PASS=SUA_SENHA
DB_NAME=fsphemo_db
NODE_ENV=development
SAVE_LOCAL=false
PORT=3000
```

- `SAVE_LOCAL`: se `true` o script também grava um arquivo `estoque.json` local quando importa a API — útil apenas para debug. Por padrão `false`.
- `PORT`: porta preferencial para o servidor. Se estiver ocupada, o servidor tentará portas subsequentes (3001, 3002...).

## Comandos úteis

- Instalar dependências:

```powershell
cd backend
npm install
```

- Rodar servidor (sem nodemon):

```powershell
npm run dev
```

- Rodar apenas o script de importação manualmente (útil para testes):

```powershell
node src/scripts/importarEstoque.js
```

- Testar conexão com o banco (script auxiliar):

```powershell
node scripts/test-db-connection.js
```

## Observações sobre `estoque.json`
- O arquivo `estoque.json` não é mais necessário para produção, já que os dados são persistidos no MySQL.
- Se você quiser guardar um snapshot local para debug, defina `SAVE_LOCAL=true` no `.env` antes de iniciar o servidor.
- `estoque.json` foi adicionado ao `.gitignore` para evitar commits acidentais.

## Comportamento do agendamento
- O agendamento padrão está configurado para executar a importação imediatamente ao subir o servidor e repetir a cada 6 horas.
- Se preferir agendamentos em horários fixos (ex.: 08:00/14:00/20:00) podemos alterar o script — peça essa mudança quando desejar.

## Problemas comuns e solução rápida
- Erro de acesso ao MySQL (ex: `Access denied`): verifique `DB_USER` / `DB_PASS` e se o usuário tem privilégios no banco `DB_NAME`. Use o `scripts/test-db-connection.js` para diagnosticar.
- Porta ocupada: o servidor tenta portas subsequentes; para liberar a porta 3000 no Windows use `netstat -ano | findstr :3000` e `taskkill /PID <pid> /F`.

## Próximos passos
- Mantivemos o banco como fonte de verdade. Caso queira que eu implemente uma rota pública `/api/estoque` que leia direto do banco, informe e eu implemento.

---
README gerado automaticamente pelo assistente para facilitar uso e deploy local.
