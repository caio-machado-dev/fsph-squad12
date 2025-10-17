import { ThemedText } from '@/components/ThemedText';
import * as React from "react"
import { Text, StyleSheet, View} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { shadows } from "./shadow"
import { Link } from 'expo-router';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'

export default function Frame116() {

  const Line = () => {
    return <View style={styles.line} />;
  }

  return (
    <SafeAreaView style={styles.parent}>
      <View style={[styles.view, styles.viewFlexBox]}>
        <View style={[styles.frameParent, shadows.xl]}>
          <View style={styles.vidasHumanasPrecisamDeVocWrapper}>
            <Text style={[styles.vidasHumanasPrecisam, styles.aFlexBox]}>
              Vidas humanas precisam de você!
            </Text>
          </View>
          <View style={[styles.frameGroup, styles.viewFlexBox]}>
            <View style={styles.frameBorder}>
              <View style={[styles.vectorParent, styles.vectorFlexBox]}>
                <FontAwesome6 name="droplet" size={24} color="white" />
                <Text style={[styles.a, styles.aFlexBox]}>A-</Text>
              </View>
              <Line />
              <View style={[styles.alertaWrapper, styles.wrapperBorder]}>
                <Text style={styles.alertaTypo}>Alerta</Text>
              </View>
            </View>
            <View style={styles.frameBorder}>
              <View style={[styles.vectorParent, styles.vectorFlexBox]}>
                <FontAwesome6 name="droplet" size={24} color="white" />
                <Text style={[styles.a, styles.aFlexBox]}>B+</Text>
              </View>
              <Line />
              <View style={[styles.alertaWrapper, styles.wrapperBorder]}>
                <Text style={styles.alertaTypo}>Crítico</Text>
              </View>
            </View>
            <View style={[styles.frameParent2, styles.frameBorder]}>
              <View style={[styles.vectorContainer, styles.vectorFlexBox]}>
                <FontAwesome6 name="droplet" size={24} color="white" />
                <Text style={[styles.a, styles.aFlexBox]}>AB+</Text>
              </View>
              <Line />
              <View style={[styles.emergnciaWrapper, styles.wrapperBorder]}>
                <Text style={[styles.emergncia, styles.alertaTypo]}>
                  Emergência
                </Text>
              </View>
            </View>
            <View style={styles.frameBorder}>
              <View style={[styles.vectorParent, styles.vectorFlexBox]}>
                <FontAwesome6 name="droplet" size={24} color="white" />
                <Text style={[styles.a, styles.aFlexBox]}>B-</Text>
              </View>
              <Line />
              <View style={[styles.alertaWrapper, styles.wrapperBorder]}>
                <Text style={styles.alertaTypo}>Alerta</Text>
              </View>
            </View>
            <View style={styles.frameBorder}>
              <View style={[styles.vectorParent, styles.vectorFlexBox]}>
                <FontAwesome6 name="droplet" size={24} color="white" />
                <Text style={[styles.a, styles.aFlexBox]}>O-</Text>
              </View>
              <Line />
              <View style={[styles.alertaWrapper, styles.wrapperBorder]}>
                <Text style={styles.alertaTypo}>Alerta</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  line: {
    borderBlockColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 0.4,
  },
  viewFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  aFlexBox: {
    textAlign: "left",
    color: "#fff",
  },
  vectorFlexBox: {
    gap: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  wrapperBorder: {
    //borderColor: "rgba(218, 218, 218, 0.3)",
    height: "auto",
    padding: 3,
    //borderWidth: 1,
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  frameBorder: {
    height: "90%",
    borderRadius: 12,
    borderColor: "rgba(218, 218, 218, 0.3)",
    borderWidth: 1,
    borderStyle: "solid",
    overflow: "hidden",
  },
  alertaTypo: {
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
  },
  view: {
    width: "100%",
    height: 12,
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
    flex: 1,
    //backgroundColor: "#834b4bff",
  },
  frameParent: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#d32f2f",
    height: 125,
    borderWidth: 1,
    borderColor: "rgba(218, 218, 218, 0.17)",
    borderStyle: "solid",
    alignItems: "center",
    overflow: "hidden",
  },
  vidasHumanasPrecisamDeVocWrapper: {
    width: "100%",
    padding: 3,
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  vidasHumanasPrecisam: {
    fontSize: 15,
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    textAlign: "left",
  },
  frameGroup: {
    gap: 10,
    width: "100%",
    alignSelf: "stretch",
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
    flex: 1,
  },
  vectorParent: {
    height: 54,
    width: 57,
  },
  vectorIcon: {
    width: 17,
    height: 21,
    color: "#fff",
  },
  a: {
    fontSize: 24,
    fontFamily: "Roboto-Regular",
  },
  alertaWrapper: {
    height: "auto",
    width: "auto",
  },
  frameParent2: {
    width: 'auto',
  },
  vectorContainer: {
    alignSelf: "stretch",
    flex: 1,
  },
  emergnciaWrapper: {
    height: 21,
    alignSelf: "stretch",
  },
  emergncia: {
    display: "flex",
    width: 77,
    justifyContent: "center",
    alignItems: "center",
  },
})

