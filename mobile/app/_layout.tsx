import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Slot, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import Constants from 'expo-constants';

// Finaliza sessões anteriores do WebBrowser (necessário para Web)
WebBrowser.maybeCompleteAuthSession();

// Carrega variáveis de ambiente do app.json
const { manifest } = Constants;
const extra = manifest?.extra || {};

process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID = extra.GOOGLE_ANDROID_CLIENT_ID;
process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID = extra.GOOGLE_IOS_CLIENT_ID;
process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID = extra.GOOGLE_WEB_CLIENT_ID;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  // Configuração da autenticação Google
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Autenticação Google bem-sucedida:', authentication);

      // Aqui você pode enviar o token para o backend, se quiser
      // fetch('SEU_BACKEND_URL/auth/google', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: authentication.accessToken }) });

      router.replace('/(tabs)'); // Redireciona para a página principal
    }
  }, [response]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
