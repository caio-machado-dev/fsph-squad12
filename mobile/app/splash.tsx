import React from 'react';
import { StyleSheet, View, StatusBar, Text } from 'react-native';

export default function SplashScreen() {

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#c62828" />
      
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.leftSide}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>9:41</Text>
          </View>
        </View>
        <View style={styles.rightSide}>
          <View style={styles.signalIcon} />
          <View style={styles.wifiIcon} />
          <View style={styles.batteryContainer}>
            <View style={styles.batteryOutline} />
            <View style={styles.batteryFill} />
            <View style={styles.batteryEnd} />
          </View>
        </View>
      </View>

      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          {/* Placeholder para o logo - substitua pela imagem correta */}
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>FSPH</Text>
            <Text style={styles.logoSubText}>Logo</Text>
          </View>
        </View>
      </View>

      {/* Home Indicator */}
      <View style={styles.homeIndicatorContainer}>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c62828',
  },
  statusBar: {
    height: 47,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  leftSide: {
    flex: 1,
  },
  timeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  timeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -0.32,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalIcon: {
    width: 18,
    height: 12,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  wifiIcon: {
    width: 17,
    height: 12,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  batteryContainer: {
    width: 27,
    height: 13,
    position: 'relative',
  },
  batteryOutline: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 2.4,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 2,
  },
  batteryFill: {
    position: 'absolute',
    left: 2,
    top: 2,
    right: 10.4,
    bottom: 2,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  batteryEnd: {
    position: 'absolute',
    right: 0,
    top: 4.22,
    width: 1.4,
    height: 4.22,
    backgroundColor: '#ffffff',
    borderRadius: 1,
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
  logoPlaceholder: {
    width: 169,
    height: 220,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoSubText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  homeIndicatorContainer: {
    height: 34,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 8,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#ffffff',
    borderRadius: 100,
  },
});