import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#CC3333', // Vermelho principal do app de doações
        tabBarInactiveTintColor: '#8e8e93', // Cinza para ícones inativos
        headerStyle: { backgroundColor: '#fff' },
        headerShadowVisible: false,
        headerTintColor: '#000',
        tabBarStyle: { 
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },
      }}
    >
      <Tabs.Screen
        name="home_page"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="feed_page"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} 
              size={24}
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="post_page"
        options={{
          title: 'Postar',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'camera' : 'camera-outline'} 
              size={24}
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ranking_page"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'trophy' : 'trophy-outline'} 
              size={24}
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile_page"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome 
              name={focused ? 'user' : 'user-o'} 
              size={22}
              color={color} 
            />
          ),
        }}
      />

      {/* Telas ocultas da navegação por abas */}
      <Tabs.Screen
        name="personal_settings_page"
        options={{
          href: null, // Esconde da Tab Bar
          title: 'Configurações',
        }}
      />
      <Tabs.Screen
        name="suggestions_page"
        options={{
          href: null, // Esconde da Tab Bar
          title: 'Sugestões',
        }}
      />
    </Tabs>
  );
}