import { Feather } from "@expo/vector-icons";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

// Configuração do WebBrowser
WebBrowser.maybeCompleteAuthSession();

// Paleta de Cores e Fontes
const colors = {
  primaryRed: "#D32F2F", black: "#1E1E1E", gray: "#8C8C8C",
  gray50: "#DADADA", gray10: "#F2F2F2", white: "#FFFFFF",
};
const fonts = { regular: "Roboto-Regular", bold: "Roboto-Bold" };
const googleLogo: ImageSourcePropType = require("../../assets/images/google-logo.png");
const facebookLogo: ImageSourcePropType = require("../../assets/images/facebook-logo.png");

// URL do Backend - Troque pelo seu IP se estiver testando em um dispositivo físico
const API_URL = "http://localhost:3000";

const LoginScreen = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isSenhaVisible, setIsSenhaVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Configuração do Google Auth Request
  const extra = Constants.expoConfig?.extra || {};
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: extra.GOOGLE_WEB_CLIENT_ID,
    androidClientId: extra.GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: extra.GOOGLE_IOS_CLIENT_ID,
  });

  // Efeito para lidar com a resposta do Google
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleGoogleSignIn(id_token);
    }
  }, [response]);

  // Função para login com Google
  const handleGoogleSignIn = async (idToken: string) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/google`, { idToken });
      if (res.data.token && res.data.user) {
        await signIn(res.data.token, res.data.user);
        // O redirecionamento será tratado pelo _layout.tsx
      } else {
        alert("Erro de autenticação: Resposta inválida do servidor.");
      }
    } catch (error: any) {
      console.error("Erro no login com Google:", error.response?.data || error.message);
      alert(`Erro no login com Google: ${error.response?.data?.error || "Verifique sua conexão."}`);
    } finally {
      setLoading(false);
    }
  };

  // Função para login tradicional
  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, senha });
      if (res.data.token && res.data.user) {
        await signIn(res.data.token, res.data.user);
      } else {
        alert("Erro de autenticação: Resposta inválida do servidor.");
      }
    } catch (error: any) {
      console.error("Erro no login:", error.response?.data || error.message);
      alert(`Erro no login: ${error.response?.data?.error || "Credenciais inválidas."}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.loginContainer}>
            <TextInput
              style={styles.input}
              placeholder="Insira o seu email"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Insira a sua senha"
                secureTextEntry={!isSenhaVisible}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity onPress={() => setIsSenhaVisible(!isSenhaVisible)}>
                <Feather name={isSenhaVisible ? "eye-off" : "eye"} size={20} color={colors.gray} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity><Text style={styles.forgotPasswordText}>Esqueci minha senha</Text></TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} activeOpacity={0.8} onPress={handleSubmit}>
              {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.loginButtonText}>Entrar</Text>}
              <Feather name="arrow-up-right" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} /><Text style={styles.dividerText}>Ou continue como</Text><View style={styles.dividerLine} />
          </View>
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={() => promptAsync()} disabled={!request || loading}>
              <Image source={googleLogo} style={styles.socialLogo} /><Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={facebookLogo} style={styles.socialLogo} /><Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.termsText}>
            Ao prosseguir, você confirma que leu e aceita os <Text style={styles.linkText}>Termos de Uso</Text> e a <Text style={styles.linkText}>Política de Privacidade.</Text>
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.primaryRed },
  loginContainer: { width: "100%", height: "auto", gap: 10 },
  formContainer: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 20, paddingVertical: 20 },
  scrollContent: { padding: 20 },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray50, borderRadius: 12, paddingVertical: 13, paddingHorizontal: 16, fontSize: 16, marginBottom: 10, color: colors.black, fontFamily: fonts.regular },
  passwordContainer: { flexDirection: "row", alignItems: "center", backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray50, borderRadius: 12, paddingHorizontal: 16, marginBottom: 10 },
  inputPassword: { flex: 1, paddingVertical: 13, fontSize: 16, color: colors.black, fontFamily: fonts.regular },
  forgotPasswordText: { fontSize: 14, color: colors.primaryRed, textAlign: "right", marginBottom: 14, fontFamily: fonts.bold },
  loginButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: colors.primaryRed, borderRadius: 12, paddingVertical: 14, marginBottom: 16, gap: "60%" },
  loginButtonText: { color: colors.white, fontSize: 16, fontFamily: fonts.bold, marginRight: 8 },
  dividerContainer: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.gray50 },
  dividerText: { marginHorizontal: 16, fontSize: 12, color: colors.gray, fontFamily: fonts.regular },
  socialLoginContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  socialButton: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.gray50, borderRadius: 12, paddingVertical: 14, marginHorizontal: 4 },
  socialLogo: { width: 20, height: 20, marginRight: 10 },
  socialButtonText: { fontSize: 14, color: colors.black, fontFamily: fonts.bold },
  termsText: { fontSize: 12, color: colors.gray, textAlign: "center", lineHeight: 18, fontFamily: fonts.regular },
  linkText: { color: colors.primaryRed, textDecorationLine: "underline", fontFamily: fonts.bold },
});

export default LoginScreen;
