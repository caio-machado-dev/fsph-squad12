import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from 'expo-router';
import { ThemedText } from "../../components/ThemedText";

export default function FeedPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Link href="/" style={{ padding: 20 }}>
          <ThemedText type="link">Sair do aplicativo</ThemedText>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 20,
    //backgroundColor: "#aa3c3cff",
  },
});