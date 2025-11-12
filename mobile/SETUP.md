# 📱 Setup do App Mobile - FSPH Squad 12

## 🚀 Funcionalidades Implementadas

### ✅ Tela Home
- Card com tipos sanguíneos e status de estoque
- Seção de agendamentos
- Seção "Seu Impacto" com estatísticas
- Seção de campanhas com scroll horizontal
- Background branco e design limpo

### ✅ Tela de Feed
- Visualização de todas as postagens
- Sistema de curtidas funcional
- Menu de opções (excluir post)
- Pull to refresh
- Design estilo Instagram

### ✅ Tela de Postagem
- Abertura automática da câmera ao clicar em "Postar"
- Captura de foto nativa
- Tela de pré-visualização
- Campo de legenda com contador
- Salvamento local com AsyncStorage
- Navegação automática para o feed após publicar

## 📋 Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn
- Expo Go app instalado no celular (iOS ou Android)
- Git

## 🔧 Instalação

### 1. Clone o repositório e navegue para a branch

```bash
git clone https://github.com/caio-machado-dev/fsph-squad12.git
cd fsph-squad12
git checkout feature/mobile-app-complete
```

### 2. Navegue para a pasta mobile

```bash
cd mobile
```

### 3. Instale as dependências

**IMPORTANTE:** Use a flag `--legacy-peer-deps` devido às dependências do React 19:

```bash
npm install --legacy-peer-deps
```

### 4. Inicie o servidor Expo

```bash
npm start
```

ou com cache limpo:

```bash
npx expo start --clear
```

## 📱 Rodando no Celular

### Android
1. Instale o app **Expo Go** na Play Store
2. Escaneie o QR code que aparece no terminal
3. Aguarde o bundle carregar

### iOS
1. Instale o app **Expo Go** na App Store
2. Abra a câmera nativa do iPhone
3. Aponte para o QR code
4. Toque na notificação que aparecer

## 🌐 Rodando no Navegador

Pressione `w` no terminal ou acesse:
```
http://localhost:8081
```

## 📦 Pacotes Adicionados

Esta branch inclui os seguintes pacotes novos:

- `expo-image-picker` - Para acessar a câmera do dispositivo
- `@react-native-async-storage/async-storage` - Para persistência local de dados

## 🐛 Solução de Problemas

### Erro: "Cannot find module"
```bash
rm -rf node_modules
npm install --legacy-peer-deps
```

### Erro: "Metro bundler failed"
```bash
npx expo start --clear
```

### Erro: "Port 8081 already in use"
O Expo vai automaticamente sugerir usar outra porta (8082, 8083, etc). Aceite com `Y`.

### Permissões de câmera não funcionam
- **Android:** Vá em Configurações > Apps > Expo Go > Permissões > Câmera > Permitir
- **iOS:** Vá em Ajustes > Expo Go > Câmera > Permitir

## 🔄 Comandos Úteis

```bash
# Iniciar servidor
npm start

# Limpar cache e iniciar
npx expo start --clear

# Rodar no Android
npm run android

# Rodar no iOS
npm run ios

# Rodar no navegador
npm run web
```

## 📂 Estrutura de Pastas Principais

```
mobile/
├── app/
│   ├── (home_page)/
│   │   ├── home_page.tsx      # Tela inicial
│   │   ├── feed_page.tsx      # Feed de postagens
│   │   ├── post_page.tsx      # Tela de captura/postagem
│   │   ├── ranking_page.tsx   # Ranking
│   │   └── profile_page.tsx   # Perfil
│   └── _layout.tsx            # Layout raiz
├── components/                 # Componentes reutilizáveis
├── constants/                  # Constantes e cores
└── package.json               # Dependências
```

## ⚙️ Configurações Importantes

### AsyncStorage
Os dados são salvos localmente no dispositivo. Para limpar:
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.clear();
```

### Câmera
A câmera abre automaticamente ao clicar em "Postar". Se cancelar, volta para o feed.

## 🎨 Design

- Cores principais: Vermelho (`#DC2626`) e Branco (`#FFFFFF`)
- Fontes: Roboto (Regular, Bold)
- Icons: Ionicons e MaterialCommunityIcons

## 👥 Contribuindo

1. Crie uma branch a partir desta
2. Faça suas alterações
3. Teste no celular E no navegador
4. Faça commit das mudanças
5. Abra um Pull Request

## 📝 Notas

- Esta branch contém todas as funcionalidades de câmera, feed e postagem
- Os posts são salvos localmente no dispositivo (AsyncStorage)
- Para integração com backend, descomente as linhas relacionadas ao fetch no `post_page.tsx`
- O username padrão é `rental_dogood`

## 🆘 Suporte

Se encontrar problemas:
1. Verifique se todas as dependências foram instaladas com `--legacy-peer-deps`
2. Limpe o cache com `npx expo start --clear`
3. Reinicie o Expo Go no celular
4. Verifique as permissões de câmera

---

Desenvolvido com ❤️ pelo FSPH Squad 12
