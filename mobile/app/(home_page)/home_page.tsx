import { ThemedText } from "@/components/ThemedText"
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import * as React from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { shadows } from "./_shadow"

export default function Frame116() {
  const router = useRouter()
  const [local, setLocal] = React.useState("")
  const [data, setData] = React.useState("")
  const [hora, setHora] = React.useState("")
  const [nextAppointment, setNextAppointment] = React.useState<null | {
    local: string
    data: string
    hora: string
  }>(null)
  const [showForm, setShowForm] = React.useState(false)

  const handleSchedule = () => {
    if (!local.trim() || !data.trim() || !hora.trim()) {
      Alert.alert(
        "Preencha todos os campos",
        "Por favor informe local, data e hora para o agendamento."
      )
      return
    }

    setNextAppointment({ local, data, hora })
    Alert.alert(
      "Agendamento confirmado",
      `Local: ${local}\nData: ${data}\nHora: ${hora}`
    )
    // limpar campos e fechar formulário
    setLocal("")
    setData("")
    setHora("")
    setShowForm(false)
  }

  const Line = () => {
    return <View style={styles.line} />
  }

  return (
    <SafeAreaView style={styles.parent}>
      {/* Profile header: foto e nome do usuário */}
      <View style={styles.profileContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/profile" as any)}
          style={styles.profileLink}
        >
          {/* substituir require por imagem do usuário se disponível */}
          <FontAwesome
            name="user-circle"
            size={48}
            color="#d32f2f"
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <ThemedText style={styles.profileGreeting}>Olá,</ThemedText>
          <ThemedText style={styles.profileName}>Usuário</ThemedText>
        </View>
      </View>
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
        {/* Agendamentos */}
        <View style={styles.scheduleContainer}>
          <View style={styles.card}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>Seu próximo agendamento</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>
                {nextAppointment
                  ? `${nextAppointment.local} — ${nextAppointment.data} às ${nextAppointment.hora}`
                  : "Sem agendamentos próximos"}
              </Text>
              <TouchableOpacity
                style={styles.cardButton}
                onPress={() => {
                  console.log("navegando para scheduling")
                  router.push("/(second_page)/scheduling" as any)
                }}
                activeOpacity={0.9}
              >
                <Text style={styles.cardButtonText}>Agendar</Text>
              </TouchableOpacity>
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
    //backgroundColor: "#c2ababff",
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
    height: "auto",
    padding: 3,
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
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "center",
    flex: 1,
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
    alignSelf: "center",
    marginVertical: 8,
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
    width: "auto",
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
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  profileLink: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    // se trocar por <Image />, ajustar width/height
    width: 48,
    height: 48,
  },
  profileInfo: {
    justifyContent: "center",
  },
  profileGreeting: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Roboto-Regular",
  },
  profileName: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    color: "#111",
  },
  scheduleContainer: {
    marginTop: 16,
    //paddingHorizontal: 20,
    //paddingVertical: 12,
    width: "90%",
    alignSelf: "center",
  },
  scheduleTitle: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    marginBottom: 8,
    color: "#111",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
  },
  scheduleButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  scheduleButtonText: {
    color: "#fff",
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 14,
    color: "#9b9b9b",
    fontFamily: "Roboto-Bold",
    marginBottom: 8,
    paddingLeft: 4,
  },
  cardTitleContainer: {
    width: "100%",
    paddingBottom: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // leve sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardContent: {
    //flex: 1,
    gap: "17%",
    //paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    fontSize: 20,
    color: "#111",
    fontFamily: "Roboto-Regular",
  },
  cardButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
  },
  cardButtonText: {
    color: "#fff",
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },
  formWrap: {
    marginTop: 12,
  },
})
