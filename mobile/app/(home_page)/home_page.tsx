import { ThemedText } from "@/components/ThemedText"
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import * as React from "react"
import { Alert, Image, LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { shadows } from "./_shadow"

// Desabilita warnings na tela
LogBox.ignoreAllLogs(true)

// Desabilita console.warn globalmente
console.warn = () => {}
console.error = () => {}

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

  const campaigns = [
    { name: 'João Santos', donors: '3/10', bloodTypes: ['A+', 'A-', 'O+', 'O-'] },
    { name: 'Sofia', donors: '45/50', bloodTypes: ['A-', 'B-', 'AB-', 'O-'] },
    { name: 'Simone', donors: '15/30', bloodTypes: [] },
  ]

  return (
    <SafeAreaView style={styles.parent}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <Text style={styles.scheduleTitle}>Seu próximo agendamento</Text>
          <View style={styles.card}>
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

      {/* Seção Seu Impacto */}
      <View style={styles.impactContainer}>
        <Text style={styles.sectionTitle}>Seu Impacto</Text>
        
        <View style={styles.impactCards}>
          <View style={styles.impactCard}>
            <Text style={styles.impactNumber}>2</Text>
            <Text style={styles.impactLabel}>Doações</Text>
            <Text style={styles.impactSubtext}>Acessar histórico</Text>
          </View>
          
          <View style={styles.impactCard}>
            <View style={styles.heartIconContainer}>
              <Text style={styles.heartIcon}>❤️</Text>
            </View>
            <Text style={styles.impactNumber}>8</Text>
            <Text style={styles.impactLabel}>Vidas salvas</Text>
          </View>
          
          <View style={styles.impactCard}>
            <MaterialCommunityIcons name="trophy" size={36} color="#DC2626" />
            <Text style={styles.impactTrophyText}>Vamos lá!</Text>
            <Text style={styles.impactSubtext}>Seja uma heroína{'\n'}e salve mais vidas</Text>
            <Text style={styles.impactSubtext}>Às vezes, ele é{'\n'}um dos seus{'\n'}maiores{'\n'}talentos.</Text>
            <Text style={styles.impactLabel}>Ranking</Text>
          </View>
        </View>
      </View>

      {/* Seção Campanhas */}
      <View style={styles.campaignsContainer}>
        <Text style={styles.sectionTitle}>Campanhas</Text>
        <Text style={styles.campaignsSubtitle}>Essas pessoas estão precisando de você!</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.campaignsScroll}
          contentContainerStyle={styles.campaignsContent}
        >
          {campaigns.map((campaign, index) => (
            <View key={index} style={styles.campaignCard}>
              <View style={styles.campaignHeader}>
                <View style={styles.campaignUser}>
                  <Image 
                    source={{ uri: 'https://via.placeholder.com/40' }}
                    style={styles.campaignAvatar}
                  />
                  <Text style={styles.campaignName}>{campaign.name}</Text>
                </View>
                <View style={styles.campaignBadge}>
                  <Text style={styles.campaignBadgeText}>Doadores</Text>
                </View>
              </View>
              
              <Text style={styles.campaignDonors}>{campaign.donors}</Text>
              
              {campaign.bloodTypes.length > 0 && (
                <View style={styles.campaignBloodTypes}>
                  {campaign.bloodTypes.map((type, idx) => (
                    <View key={idx} style={styles.campaignBloodType}>
                      <Text style={styles.campaignBloodTypeText}>{type}</Text>
                    </View>
                  ))}
                </View>
              )}
              
              <Text style={styles.campaignLabel}>Tipo</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    overflow: "visible",
    flex: 1,
    minWidth: 60,
    maxWidth: 70,
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
    width: "92%",
    borderRadius: 10,
    backgroundColor: "#d32f2f",
    height: 125,
    borderWidth: 1,
    borderColor: "rgba(218, 218, 218, 0.17)",
    borderStyle: "solid",
    alignItems: "center",
    overflow: "visible",
    alignSelf: "center",
    marginVertical: 8,
    paddingHorizontal: 8,
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
    gap: 6,
    width: "100%",
    alignSelf: "stretch",
    flexDirection: "row",
    overflow: "visible",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 4,
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
    paddingHorizontal: 20,
    width: "100%",
  },
  scheduleTitle: {
    fontSize: 14,
    color: "#9b9b9b",
    fontFamily: "Roboto-Regular",
    marginBottom: 8,
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
    padding: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  cardText: {
    fontSize: 16,
    color: "#111",
    fontFamily: "Roboto-Regular",
    flex: 1,
    marginRight: 12,
  },
  cardButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  cardButtonText: {
    color: "#fff",
    fontFamily: "Roboto-Bold",
    fontSize: 14,
  },
  formWrap: {
    marginTop: 12,
  },
  impactContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  impactCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  impactCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  impactNumber: {
    fontSize: 32,
    fontWeight: "700",
    color: "#DC2626",
    marginBottom: 4,
  },
  impactLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  impactSubtext: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
    marginTop: 4,
    lineHeight: 14,
  },
  heartIconContainer: {
    marginBottom: 4,
  },
  heartContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  heartIcon: {
    fontSize: 24,
  },
  impactTrophyText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontWeight: "600",
    marginTop: 4,
  },
  campaignsContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  campaignsSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  campaignsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  campaignsContent: {
    gap: 16,
    paddingRight: 20,
  },
  campaignCard: {
    width: 160,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  campaignHeader: {
    marginBottom: 12,
  },
  campaignUser: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  campaignAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  campaignName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  campaignBadge: {
    backgroundColor: "#FFE5E5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  campaignBadgeText: {
    fontSize: 8,
    color: "#DC2626",
    fontWeight: "600",
  },
  campaignDonors: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  campaignBloodTypes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginBottom: 8,
  },
  campaignBloodType: {
    backgroundColor: "#FFE5E5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  campaignBloodTypeText: {
    fontSize: 10,
    color: "#DC2626",
    fontWeight: "600",
  },
  campaignLabel: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
  },
})
