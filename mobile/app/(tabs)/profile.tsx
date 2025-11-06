import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useAuth } from '../../../context/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        {user?.foto && (
          <Image source={{ uri: user.foto }} style={styles.avatar} />
        )}
        <Text style={styles.name}>{user?.nome || 'Nome do Usuário'}</Text>
        <Text style={styles.email}>{user?.email || 'email@exemplo.com'}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <Button title="Sair (Logout)" onPress={signOut} color="#d32f2f" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#d32f2f',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  actionsContainer: {
    width: '80%',
  },
});
