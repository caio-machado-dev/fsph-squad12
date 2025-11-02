import { FontAwesome, Ionicons } from '@expo/vector-icons'; // Use seus ícones
import { Tabs } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#CC3333', // Cor do ícone ativo (vermelho)
        tabBarInactiveTintColor: '#8e8e93', // Cor do ícone inativo (cinza)
      }}
    >
      <Tabs.Screen
        name="home_page" // Nome do arquivo .tsx
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="feed_page" // Nome do arquivo .tsx
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses" color={color} size={size} />
          ),
        }}
      />
      {/* Eu não vi um arquivo 'postar' na sua lista, 
        mas sua aba tem. Assumindo que o nome do arquivo é 'postar_page.tsx'
        Se o nome for diferente, apenas ajuste o 'name'
      */}
      <Tabs.Screen
        name="post_page" // Ajuste este nome de arquivo
        options={{
          title: 'Postar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ranking_page" // Nome do arquivo .tsx
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile_page" // Nome do arquivo .tsx
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />

      {/* --- ESTA É A CORREÇÃO --- */}
      {/* Estas telas não aparecerão na barra de abas */}

      <Tabs.Screen
        name="personal_settings_page"
        options={{
          href: null, // Esconde da Tab Bar
        }}
      />
      <Tabs.Screen
        name="suggestions_page"
        options={{
          href: null, // Esconde da Tab Bar
        }}
      />
    </Tabs>
  );
}