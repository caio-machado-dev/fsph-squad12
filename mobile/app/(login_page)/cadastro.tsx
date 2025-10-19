import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Cores a serem usadas
const colors = {
  primaryRed: '#D32F2F',
  black: '#1E1E1E',
  gray: '#8C8C8C',
  gray50: '#DADADA',
  gray10: '#F2F2F2',
  white: '#FFFFFF',
};

const fonts = {
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
};

// Tela de cadastro: coleta nome, email e senhas
const CadastroScreen = () => {
  const router = useRouter(); // navegação entre telas
  // estados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  // controlar visibilidade de senha
  const [isSenhaVisible, setIsSenhaVisible] = useState(false);
  const [isConfirmarSenhaVisible, setIsConfirmarSenhaVisible] = useState(false);
  // mostra erros no campo ao invés do alert
  const [fieldErrors, setFieldErrors] = useState<any>({});

  return (
    // Header/Cabeçalho
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryRed} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {"Você carrega\ndentro de si o poder\nde salvar vidas."}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.tabSelector}>
            <TouchableOpacity
              style={styles.tabInactive}
              onPress={() => router.push("login" as any)}
            >
              <Text style={styles.tabTextInactive}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabActive}>
              <Text style={styles.tabTextActive}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Insira o seu nome completo"
            placeholderTextColor={colors.gray}
            value={nome}
            onChangeText={setNome}
          />
          {/* mostra erro no nome, se houver */}
          {fieldErrors.nome ? <Text style={styles.errorText}>{fieldErrors.nome}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Insira o seu email"
            placeholderTextColor={colors.gray}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          {/* erro de email, se existir */}
          {fieldErrors.email ? <Text style={styles.errorText}>{fieldErrors.email}</Text> : null}

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Senha"
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
          {/* erro de senha */}
          {fieldErrors.senha ? <Text style={styles.errorText}>{fieldErrors.senha}</Text> : null}

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Confirme a senha"
              placeholderTextColor={colors.gray}
              secureTextEntry={!isConfirmarSenhaVisible}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
            <TouchableOpacity
              onPress={() => setIsConfirmarSenhaVisible(!isConfirmarSenhaVisible)}
            >
              <Feather
                name={isConfirmarSenhaVisible ? "eye-off" : "eye"}
                size={20}
                color={colors.gray}
              />
            </TouchableOpacity>
          </View>
          {/* mostra erro de confirmação */}
          {fieldErrors.confirmarSenha ? <Text style={styles.errorText}>{fieldErrors.confirmarSenha}</Text> : null}

          <Text style={styles.hintText}>
            Mínimo 8 caracteres, incluindo letras, números e caracteres
            especiais.
          </Text>

          <TouchableOpacity
            style={styles.createAccountButton}
            activeOpacity={0.8}
            onPress={() => {
              setFieldErrors({});
              const { validateRegistrationFields } = require('./credentials');
              const errors = validateRegistrationFields({ nome, email, senha, confirmarSenha });
              if (Object.keys(errors).length > 0) {
                setFieldErrors(errors);
                return;
              }

              // redireciona para home se tudo estiver válido
              router.replace('/(home_page)/home_page');
            }}
          >
            <Text style={styles.createAccountButtonText}>Criar conta</Text>
            <Feather name="arrow-up-right" size={20} color={colors.white} />
          </TouchableOpacity>

          <Text style={styles.termsText}>
            Ao prosseguir, você confirma que leu e aceita os{" "}
            <Text style={styles.linkText}>Termos de Uso</Text> e a{" "}
            <Text style={styles.linkText}>Política de Privacidade.</Text>
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
};

// Estilização
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primaryRed,
  },
  header: {
    paddingHorizontal: "8%",
    paddingTop: "20%",
    paddingBottom: "5%",
  },
  headerTitle: {
    fontSize: 32,
    color: colors.white,
    fontFamily: fonts.regular,
    lineHeight: 31,
    transform: [{ translateY: -10 }],
  },
  formContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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

  /* passwordContainer reuse para campos empilhados */
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray50,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    // removida largura fixa para ocupar 100% do container
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
  },
  hintText: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 14,
    paddingHorizontal: 4,
    fontFamily: fonts.regular,
  },
  createAccountButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryRed,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 16,
    gap: "60%"
  },
  createAccountButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.bold,
    marginRight: 8,
  },
  termsText: {
    fontSize: 12,
    color: colors.gray,
    textAlign: "center",
    lineHeight: 18,
    fontFamily: fonts.regular,
    marginTop: 4,
  },
  linkText: {
    color: colors.primaryRed,
    textDecorationLine: "underline",
    fontFamily: fonts.bold,
  },
  errorText: {
    color: colors.primaryRed,
    fontSize: 13,
    marginBottom: 8,
    fontFamily: fonts.regular,
  },
})

export default CadastroScreen;