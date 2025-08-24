import React from 'react';
import { StyleSheet, View, StatusBar, Text } from 'react-native';
import { Image } from 'expo-image';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#c62828" />

      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <Image 
            source={require('@/assets/images/81c182165fa853e424d84da89cf03a074c786cc3.png')} 
            style={styles.logo}
            contentFit="contain"
          />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c62828',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logoWrapper: {
    width: 216,
    height: 258,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  logo: {
    width: 169,
    height: 220,
  },
});
