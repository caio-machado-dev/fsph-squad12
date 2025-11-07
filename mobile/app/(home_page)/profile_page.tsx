import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { useAuth } from '../../context/AuthContext'; // Importar o useAuth

const defaultAvatar = require('../../assets/images/default-avatar.png');
const appLogo = require('../../assets/images/logo.png');

export default function ProfilePage() {
  const { user, signOut } = useAuth(); // Usar o contexto de autenticação
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [imageUri, setImageUri] = useState<string | null>(user?.foto_perfil || null);

  const router = useRouter();

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da sua permissão para acessar a galeria.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      // Aqui você poderia adicionar a lógica para fazer upload da nova foto para o backend
    }
  };

  const handleLogout = () => {
    signOut(); // Usar a função signOut do contexto
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f8" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#333" />
          </TouchableOpacity>
          <Image source={appLogo} style={styles.headerLogo} />
        </View>

        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handlePickImage}>
            <Image
              source={imageUri ? { uri: imageUri } : (user?.foto_perfil ? { uri: user.foto_perfil } : defaultAvatar)}
              style={styles.avatar}
            />
          </TouchableOpacity>
          {/* Usar dados do usuário do contexto */}
          <Text style={styles.profileName}>{user?.nome_completo || 'Carregando...'}</Text>
          <TouchableOpacity onPress={handlePickImage}>
            <Text style={styles.editProfileText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* O restante do código permanece o mesmo, pois são configurações de UI */}
        <View style={styles.card}>
          <View style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Ionicons name="notifications-outline" size={22} color="#555" style={styles.settingsIcon} />
              <Text style={styles.settingsText}>Ativar notificações</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notificationsEnabled ? '#f4f3f4' : '#f4f3f4'}
              onValueChange={() => setNotificationsEnabled((prev) => !prev)}
              value={notificationsEnabled}
            />
          </View>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.settingsItem} onPress={() => router.push('/(home_page)/personal_settings_page')}>
            <View style={styles.settingsItemLeft}>
              <Ionicons name="settings-outline" size={22} color="#555" style={styles.settingsIcon} />
              <Text style={styles.settingsText}>Configurações gerais</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Mais cards... */}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
          <Text style={styles.logoutButtonText}>Sair do aplicativo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f4f8' },
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? 16 : 0, paddingBottom: 8 },
  headerLogo: { width: 36, height: 36, resizeMode: 'contain' },
  profileSection: { alignItems: 'center', marginVertical: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12, borderWidth: 3, borderColor: '#fff' },
  profileName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  editProfileText: { fontSize: 15, fontWeight: '600', color: '#007AFF', marginTop: 6 },
  card: { backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3.0, elevation: 2 },
  settingsItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 16 },
  settingsItemLeft: { flexDirection: 'row', alignItems: 'center' },
  settingsIcon: { marginRight: 16 },
  settingsText: { fontSize: 16, color: '#333' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginHorizontal: 16 },
  logoutButton: { backgroundColor: '#CC3333', borderRadius: 12, padding: 16, marginHorizontal: 16, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
});
