# FSPH Squad 12 - Monorepo

Projeto da disciplina FSPH desenvolvido pelo Squad 12.

## 📁 Estrutura do Projeto

```
fsph-squad12/
├── mobile/          # App React Native
├── backend/         # API Express + Node.js
├── shared/          # Tipos e utilitários compartilhados
├── docs/           # Documentação do projeto
└── README.md       # Este arquivo
```

## 🚀 Quick Start

### Pré-requisitos
- Node.js >= 18.0.0
- npm >= 8.0.0
- Expo CLI (para mobile)
- MongoDB (para backend)

### Instalação
```bash
# Instalar todas as dependências
npm run install:all

# Ou instalar individualmente
npm run install:mobile
npm run install:backend
npm run install:shared
```

### Desenvolvimento
```bash
# Executar mobile e backend simultaneamente
npm run dev

# Executar apenas mobile
npm run mobile

# Executar apenas backend
npm run backend
```

## 🔧 Scripts Disponíveis

### Root
- `npm run dev` - Executa mobile e backend simultaneamente
- `npm run install:all` - Instala dependências de todos os workspaces
- `npm run lint` - Executa lint em todos os projetos
- `npm run test` - Executa testes
- `npm run clean` - Remove node_modules de todos os projetos

### Mobile
- `npm run mobile` - Inicia o app mobile
- `npm run mobile:build` - Build do app

### Backend
- `npm run backend` - Inicia servidor em modo desenvolvimento
- `npm run backend:start` - Inicia servidor em modo produção

### Shared
- `npm run shared:build` - Compila tipos compartilhados

## 🌿 Git Flow

### Branches principais:
- `main` - Versão estável para apresentações
- `develop` - Branch de integração contínua

### Branches de feature:
- `feature/mobile-*` - Features do app mobile
- `feature/backend-*` - Features da API
- `feature/shared-*` - Tipos e utils compartilhados

### Workflow:
1. Criar branch a partir de `develop`
2. Desenvolver feature
3. Abrir PR para `develop`
4. Code review obrigatório
5. Merge após aprovação

## 👥 Equipe

- **Squad 12** - 10 integrantes
- **Disciplina:** FSPH
- **Universidade:** [Nome da Universidade]

## 📝 Documentação Adicional

- [Documentação da API](./docs/api.md) (em desenvolvimento)
- [Guia de Contribuição](./docs/contributing.md) (em desenvolvimento)
- [Padrões de Código](./docs/coding-standards.md) (em desenvolvimento)