import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from '../context/AuthContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Espera carregar o estado de autenticação

    const inAuthGroup = segments[0] === '(login_page)';

    if (!user && !inAuthGroup) {
      // Usuário não logado → redireciona para tela de login
      router.replace('/(login_page)');
    } else if (user && inAuthGroup) {
      // Usuário logado → redireciona para a home (ou outra tela protegida)
      router.replace('/(tabs)');
    }
  }, [user, isLoading, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
