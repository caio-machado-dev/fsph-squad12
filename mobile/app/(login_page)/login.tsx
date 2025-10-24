import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React, { useState, useEffect } from "react"
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
} from "react-native"
import { getLogin } from "./auth"

// Paleta de Cores
const colors = {
  primaryRed: "#D32F2F",
  black: "#1E1E1E",
  gray: "#8C8C8C",
  gray50: "#DADADA",
  gray10: "#F2F2F2",
  white: "#FFFFFF",
}

const fonts = {
  regular: "Roboto-Regular",
  bold: "Roboto-Bold",
}

// Assets
const googleLogo: ImageSourcePropType = require("../../assets/images/google-logo.png")
const facebookLogo: ImageSourcePropType = require("../../assets/images/facebook-logo.png")

const LoginScreen = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [isSenhaVisible, setIsSenhaVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    const value = await getLogin({ email, senha })
    console.log(value)
    if (value.success) {
      router.replace("/(home_page)/home_page")
    } else {
      alert(value.message || "Erro ao tentar logar.")
    }
  }

  // Configuração do Google Auth
  WebBrowser.maybeCompleteAuthSession();

  const webClientId = Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID || '186834080659-bvsr5g2ocvu78j8dq2sa8oj6kdm0nbn2.apps.googleusercontent.com';

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId,
  });

  // Captura o resultado do login Google
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('✅ Login Google bem-sucedido', authentication);

      // Aqui você pode enviar o token para o backend
      // fetch('http://localhost:3000/auth/google', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token: authentication.accessToken }),
      // });

      router.replace('/(home_page)/home_page');
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Formulário de Login */}
      <View style={styles.formContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.loginContainer}>
            <TextInput
              style={styles.input}
              placeholder="Insira o seu email"
              placeholderTextColor={colors.gray}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Insira a sua senha"
                placeholderTextColor={colors.gray}
                secureTextEntry={!isSenhaVisible}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity onPress={() => setIsSenhaVisible(!isSenhaVisible)}>
                <Feather
                  name={isSenhaVisible ? "eye-off" : "eye"}
                  size={20}
                  color={colors.gray}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.loginButtonText}>Entrar</Text>
              )}
              <Feather name="arrow-up-right" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Ou continue como</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialLoginContainer}>
            <TouchableOpacity 
              style={styles.socialButton} 
              onPress={() => promptAsync()}
              disabled={!request}
            >
              <Image source={googleLogo} style={styles.socialLogo} />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image source={facebookLogo} style={styles.socialLogo} />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.termsText}>
            Ao prosseguir, você confirma que leu e aceita os{" "}
            <Text style={styles.linkText}>Termos de Uso</Text> e a{" "}
            <Text style={styles.linkText}>Política de Privacidade.</Text>
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primaryRed,
  },
  header: {
    paddingHorizontal: "8%",
    paddingTop: "45%",
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    color: colors.white,
    fontFamily: fonts.regular,
    lineHeight: 31,
  },
  loginContainer: {
    width: "100%",
    height: "auto",
    gap: 10,
  },
  formContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  scrollContent: {
    padding: 20,
  },
  tabSelector: {
    flexDirection: "row",
    backgroundColor: colors.gray10,
    borderRadius: 99,
    padding: 4,
    marginBottom: 16,
  },
  tabInactive: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  tabActive: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 99,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  tabTextInactive: {
    fontSize: 14,
    color: colors.gray,
    fontFamily: fonts.regular,
  },
  tabTextActive: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray50,
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 10,
    color: colors.black,
    fontFamily: fonts.regular,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray50,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.primaryRed,
    textAlign: "right",
    marginBottom: 14,
    fontFamily: fonts.bold,
  },
  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryRed,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 16,
    gap: "60%",
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.bold,
    marginRight: 8,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray50,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 12,
    color: colors.gray,
    fontFamily: fonts.regular,
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.gray50,
    borderRadius: 12,
    paddingVertical: 14,
    marginHorizontal: 4,
  },
  socialLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  termsText: {
    fontSize: 12,
    color: colors.gray,
    textAlign: "center",
    lineHeight: 18,
    fontFamily: fonts.regular,
  },
  linkText: {
    color: colors.primaryRed,
    textDecorationLine: "underline",
    fontFamily: fonts.bold,
  },
})

export default LoginScreen