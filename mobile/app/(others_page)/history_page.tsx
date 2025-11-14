import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dados das doações
const donationHistory = [
  {
    id: '1',
    date: 'Sexta-feira, 22/08/2025',
    time: 'Turno da manhã: 07h - 8h:30',
  },
  {
    id: '2',
    date: 'Quinta-feira, 15/05/2025',
    time: 'Turno da manhã: 10h - 11h:30',
  },
  {
    id: '3',
    date: 'Terça-feira, 11/02/2025',
    time: 'Turno da tarde: 14h - 15h:00',
  },
  {
    id: '4',
    date: 'Quarta-feira, 10/12/2024',
    time: 'Turno da manhã: 09h - 10h:30',
  },
];

// Componente para exibir os itens com a estilização
const DonationItem = ({ item }: { item: { date: string, time: string } }) => (
  <View style={styles.card}>
    <FontAwesome5 name="tint" size={24} color="#d32f2f" style={styles.cardIcon} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardDate}>{item.date}</Text>
      <Text style={styles.cardTime}>{item.time}</Text>
    </View>
  </View>
);

export default function HistoryPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.parent} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Doações</Text>
      </View>

      <FlatList
        data={donationHistory}
        renderItem={({ item }) => <DonationItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.scheduleButton}
          onPress={() => router.push('/(others_page)/scheduling')} 
          activeOpacity={0.9}
        >
          <Text style={styles.scheduleButtonText}>Agendar Doação</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    position: 'relative', 
  },
  backButton: {
    marginTop: "10%",
    position: 'absolute',
    left: 16,
    right: 0,
    justifyContent: 'center',
    paddingRight: 10,
  },
  headerTitle: {
    marginTop: "10%",
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Roboto-Bold',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 3,
  },
  cardIcon: {
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Roboto-Bold',
  },
  cardTime: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Roboto-Regular',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
  },
  scheduleButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontWeight: '700',
    fontSize: 16,
  },
});