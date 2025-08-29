import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginTab, setIsLoginTab] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>
          Você carrega dentro de si o poder de salvar vidas.
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Login/Register Toggle */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, isLoginTab && styles.activeTab]}
            onPress={() => setIsLoginTab(true)}
          >
            <Text style={[styles.tabText, isLoginTab && styles.activeTabText]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, !isLoginTab && styles.activeTab]}
            onPress={() => setIsLoginTab(false)}
          >
            <Text style={[styles.tabText, !isLoginTab && styles.activeTabText]}>
              Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.formFields}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Insira o seu email"
                placeholderTextColor="#8c8c8c"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Insira a sua senha"
                placeholderTextColor="#8c8c8c"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#8c8c8c" 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.enterButton}>
              <Text style={styles.enterButtonText}>Entrar</Text>
              <Text style={styles.arrowIcon}>↗</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Ou continue como</Text>
              <View style={styles.dividerLine} />
            </View>
          </View>

          <View style={styles.bottomSection}>
            {/* Social Login */}
            <View style={styles.socialButtonsRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.facebookIcon}>f</Text>
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.termsText}>
              Ao prosseguir, você confirma que leu e aceita os{' '}
              <Text style={styles.termsLink}>Termos de Uso</Text> e a{' '}
              <Text style={styles.termsLink}>Política de Privacidade.</Text>
            </Text>
          </View>
        </View>

        {/* Spacer to fill remaining space */}
        <View style={styles.bottomSpacer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d32f2f',
  },
  headerSection: {
    height: 250,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '200',
    textAlign: 'left',
    lineHeight: 42,
  },
  mainContent: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 0,
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e6e6e6',
    borderRadius: 25,
    padding: 4,
    marginBottom: 30,
    width: '90%',
    height: 49,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
    height: 41,
  },
  activeTab: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 15,
    color: '#8c8c8c',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '500',
  },
  formContainer: {
    width: '100%',
    maxWidth: 320,
    flex: 1,
  },
  formFields: {
    width: '100%',
  },
  bottomSection: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    height: 51,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  input: {
    fontSize: 15,
    color: '#000',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#b71c1c',
    fontSize: 12,
  },
  enterButton: {
    backgroundColor: '#d32f2f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 25,
  },
  enterButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  arrowIcon: {
    color: '#ffffff',
    fontSize: 18,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    width: '100%',
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#e6e6e6',
    flex: 1,
  },
  dividerText: {
    fontSize: 11,
    color: '#8c8c8c',
    paddingHorizontal: 15,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25,
    gap: 15,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 25,
    paddingVertical: 12,
    flex: 1,
    gap: 8,
  },
  googleIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285f4',
  },
  facebookIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1877f2',
  },
  socialText: {
    fontSize: 13,
    color: '#000',
  },
  termsText: {
    fontSize: 12,
    color: '#8c8c8c',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  termsLink: {
    fontWeight: 'bold',
    color: '#8c8c8c',
  },
  bottomSpacer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});