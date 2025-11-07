import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

// Tipos de dados do usuário e do contexto
interface User {
  id: number;
  nome_completo: string;
  email: string;
  foto_perfil?: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  signIn: (token: string, userData: User) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Carrega dados de autenticação apenas uma vez (sem loop!)
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("authToken");
        const storedUser = await SecureStore.getItemAsync("authUser");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar dados de autenticação:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  // Função de login
  const signIn = async (newToken: string, userData: User) => {
    try {
      setToken(newToken);
      setUser(userData);
      await SecureStore.setItemAsync("authToken", newToken);
      await SecureStore.setItemAsync("authUser", JSON.stringify(userData));

      // Redireciona após login
      router.replace("/(home_page)/profile_page");
    } catch (error) {
      console.error("Erro no signIn:", error);
    }
  };

  // Função de logout
  const signOut = async () => {
    try {
      setToken(null);
      setUser(null);
      await SecureStore.deleteItemAsync("authToken");
      await SecureStore.deleteItemAsync("authUser");

      router.replace("/(login_page)/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
