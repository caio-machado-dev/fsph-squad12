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

  if (!loaded) {
    return null;
  }

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
    if (isLoading) return; // Aguarda o carregamento do estado de autenticação

    const inAuthGroup = segments[0] === '(login_page)';

    if (user && !inAuthGroup) {
      // Se o usuário está logado e não está no grupo de autenticação,
      // redireciona para a home
      router.replace('/(tabs)');
    } else if (!user) {
      // Se o usuário não está logado, redireciona para a tela de login
      router.replace('/(login_page)');
    }
  }, [user, isLoading, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
