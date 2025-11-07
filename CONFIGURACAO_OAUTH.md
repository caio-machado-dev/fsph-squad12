# Guia de Configuração do Google OAuth 2.0 para o Projeto

Este documento detalha o processo passo a passo para configurar as credenciais do Google OAuth 2.0, o que é **essencial para que o login com Google funcione**, especialmente no Android.

## Parte 1: Configuração no Google Cloud Console

Antes de tudo, você precisa de um projeto no [Google Cloud Console](https://console.cloud.google.com/).

### Passo 1: Criar a Credencial para Web

Esta credencial é usada para o login em navegadores (Expo Web).

1.  No menu do seu projeto, vá para **"APIs & Services" > "Credentials"**.
2.  Clique em **"+ CREATE CREDENTIALS"** e selecione **"OAuth client ID"**.
3.  Escolha **"Web application"** como o tipo de aplicação.
4.  Dê um nome para a credencial (ex: "Cliente Web do App Hemose").
5.  Em **"Authorized redirect URIs"**, adicione a seguinte URL (essencial para o Expo Go):
    *   `https://auth.expo.io/@anonymous/fsph-squad12`
6.  Clique em **"CREATE"**.
7.  **Copie o "Client ID" gerado**. Ele se parecerá com `xxxx.apps.googleusercontent.com`.

### Passo 2: Criar a Credencial para Android (O Mais Importante!)

Esta credencial é a que permite que o login com Google funcione no aplicativo Android nativo.

1.  Na mesma tela de "Credentials", clique novamente em **"+ CREATE CREDENTIALS" > "OAuth client ID"**.
2.  Escolha **"Android"** como o tipo de aplicação.
3.  Dê um nome para a credencial (ex: "Cliente Android do App Hemose").
4.  **Package name:** Insira o nome do pacote do seu aplicativo. Você pode encontrá-lo no arquivo `mobile/app.json`, sob a chave `android.package`. Atualmente, o valor é:
    *   `com.anonymous.fsphsquad12app`
5.  **SHA-1 certificate fingerprint:** Esta é a etapa mais crítica. Você precisa gerar a impressão digital do seu certificado de assinatura.
    *   **Para desenvolvimento com Expo Go:** A forma mais fácil de obter a SHA-1 correta é rodar o seguinte comando na pasta `mobile/`:
        ```bash
        npx expo credentials:android
        ```
        Este comando irá guiá-lo e, ao final, exibirá a impressão digital SHA-1 que o Expo usa para assinar o app de desenvolvimento. Copie esse valor.
    *   **Para produção:** Quando você gerar seu próprio keystore para publicar o app na Google Play, você precisará extrair a SHA-1 desse novo keystore e adicioná-la aqui.
6.  Clique em **"CREATE"**.
7.  **Copie o "Client ID" gerado**. Ele será **diferente** do Client ID da Web.

## Parte 2: Configuração no Código do Aplicativo

Agora que você tem as duas chaves (Client IDs), precisa colocá-las no lugar certo no código.

1.  Abra o arquivo `mobile/app.json`.
2.  Encontre a seção `"extra"`.
3.  Cole as chaves que você copiou nos campos correspondentes:

```json
{
  "expo": {
    // ... outras configurações
    "extra": {
      "GOOGLE_WEB_CLIENT_ID": "COLE_O_SEU_CLIENT_ID_DA_WEB_AQUI",
      "GOOGLE_ANDROID_CLIENT_ID": "COLE_O_SEU_CLIENT_ID_DO_ANDROID_AQUI",
      "GOOGLE_IOS_CLIENT_ID": "SE_TIVER_UM_CLIENT_ID_DO_IOS_COLE_AQUI"
    },
    // ... outras configurações
  }
}
```

Após salvar o `app.json`, reinicie o seu processo de desenvolvimento do Expo (feche e rode `npx expo start` novamente) para garantir que as novas configurações sejam carregadas.

Com estes passos, a autenticação do Google deve funcionar corretamente no Android.
