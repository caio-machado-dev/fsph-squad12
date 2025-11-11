import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuggestionsPage() {
  const [suggestion, setSuggestion] = useState('');

  const handleSendSuggestion = () => {
    if (suggestion.trim().length === 0) {
      Alert.alert('Campo vazio', 'Por favor, escreva sua sugestão.');
      return;
    }
    Alert.alert('Obrigado!', 'Sua sugestão foi enviada com sucesso.');
    setSuggestion('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {router.replace('/(home_page)/profile_page')}}>
          <Feather name="arrow-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enviar Sugestão</Text>
        <View style={{ width: 28 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.card}>
            <Text style={styles.suggestionTitle}>
              Adoramos ouvir sua opinião!
            </Text>
            <Text style={styles.suggestionSubtitle}>
              Descreva sua sugestão abaixo:
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite sua sugestão aqui..."
              multiline
              numberOfLines={8}
              value={suggestion}
              onChangeText={setSuggestion}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendSuggestion}
          >
            <Text style={styles.sendButtonText}>Enviar Sugestão</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.0,
    elevation: 2,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  suggestionSubtitle: {
    fontSize: 15,
    color: '#555',
    marginBottom: 16,
  },
  textInput: {
    height: 150,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});