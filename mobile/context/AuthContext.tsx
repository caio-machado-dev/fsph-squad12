import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter, useSegments } from 'expo-router';

// Define o tipo para os dados do usuário e do contexto
interface User {
  id: number;
  nome: string;
  email: string;
  foto?: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  signIn: (token: string, userData: User) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

// Cria o contexto com um valor padrão
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Hook customizado para usar o contexto de autenticação
export function useAuth() {
  return useContext(AuthContext);
}

// Componente Provedor do Contexto
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Efeito para carregar o token/usuário do armazenamento seguro na inicialização
  useEffect(() => {
    async function loadAuthData() {
      try {
        const storedToken = await SecureStore.getItemAsync('authToken');
        const storedUser = await SecureStore.getItemAsync('authUser');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Falha ao carregar dados de autenticação', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadAuthData();
  }, []);

  const signIn = async (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    await SecureStore.setItemAsync('authToken', newToken);
    await SecureStore.setItemAsync('authUser', JSON.stringify(userData));
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('authUser');
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
