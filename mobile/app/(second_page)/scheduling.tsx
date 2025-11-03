import { EvilIcons, Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import * as React from "react"
import { useState } from "react"
import {
  LayoutAnimation,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native"

// Habilita animação de layout no Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function SchedulingPage() {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  const [selected, setSelected] = useState<string | null>(null)
  const [openPre, setOpenPre] = useState(false)
  // respostas da pré-triagem por id da pergunta
  const [selectedPreAnswers, setSelectedPreAnswers] = useState<
    Record<string, string | null>
  >({})
  const hasPreAnswers = Object.values(selectedPreAnswers).some((v) => !!v)

  const [openDados, setOpenDados] = useState(false)
  const [openLocal, setOpenLocal] = useState(false)
  const [openDataHora, setOpenDataHora] = useState(false)
  const [openVerif, setOpenVerif] = useState(false)
  // Dados do doador
  const [cpf, setCpf] = useState<string>("")
  const [nome, setNome] = useState<string>("")
  const [dataNascimento, setDataNascimento] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [telefone, setTelefone] = useState<string>("")
  // Local de Doação: cidades e locais
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [selectedLocal, setSelectedLocal] = useState<string | null>(null)
  const [showCityList, setShowCityList] = useState(false)
  const [showLocalList, setShowLocalList] = useState(false)

  const cities = ["São Paulo", "Campinas", "Ribeirão Preto"]
  const locationsByCity: Record<string, string[]> = {
    "São Paulo": ["Hemocentro SP - Centro", "Hemocentro SP - Zona Sul"],
    Campinas: ["Hemocentro Campinas - Centro", "Hemocentro Campinas - Norte"],
    "Ribeirão Preto": ["Hemocentro RP - Central"],
  }

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setOpen((s) => !s)
  }

  const options = [
    { id: "individual", label: "Doação de Sangue Individual" },
    { id: "campaign", label: "Campanha de Doação de Sangue" },
    { id: "boneMarrow", label: "Cadastro de Medula Óssea" },
  ]

  const options_two = [
    { id: "yes", label: "Sim" },
    { id: "no", label: "Não" },
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/(home_page)/home_page")}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={22} color="#d32f2f" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agendamento Doação</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={[styles.page, { marginTop: 0 }]}>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={toggleOpen}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityState={{ expanded: open }}
            >
              <Text style={styles.cardTitle}>Tipo de agendamento</Text>
              <EvilIcons
                name={open ? "chevron-up" : "chevron-down"}
                size={35}
                color="#bdbdbd"
              />
            </TouchableOpacity>

            {open && (
              <View style={styles.cardBody}>
                <Text style={styles.instruction}>
                  Selecione o tipo de agendamento
                </Text>
                {options.map((opt) => {
                  const active = selected === opt.id
                  return (
                    <TouchableOpacity
                      key={opt.id}
                      style={styles.optionRow}
                      onPress={() => setSelected(opt.id)}
                      activeOpacity={0.8}
                    >
                      <View
                        style={[styles.radio, active && styles.radioActive]}
                      >
                        {active && <View style={styles.radioDot} />}
                      </View>
                      <Text
                        style={[
                          styles.optionLabel,
                          active && styles.optionLabelActive,
                        ]}
                      >
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            )}
          </View>

          {/* Pré-Triagem */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                )
                setOpenPre((s) => !s)
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.cardTitle}>Pré-Triagem</Text>
              <EvilIcons
                name={openPre ? "chevron-up" : "chevron-down"}
                size={28}
                color="#bdbdbd"
              />
            </TouchableOpacity>
            {openPre && (
              <View style={styles.cardBody}>
                {/* Lista de perguntas de pré-triagem */}
                {/* Cada pergunta pode usar opções Sim/Não, exceto 'sexo' que tem Masculino/Feminino */}
                {(
                  [
                    { id: "primeira", label: "Primeira vez doando sangue?" },
                    { id: "peso", label: "Pesa mais de 50 Kg?" },
                    {
                      id: "tattoo",
                      label:
                        "Fez uma tatuagem/piercing em um local não certificado pela ANVISA nos últimos 12 meses?",
                    },
                    { id: "sexo", label: "Sexo" },
                  ] as { id: string; label: string }[]
                ).map((q) => (
                  <View key={q.id} style={{ marginBottom: 12 }}>
                    <Text style={[styles.instruction, { marginBottom: 8 }]}>
                      {q.label}
                    </Text>

                    {(q.id === "sexo"
                      ? [
                          { id: "male", label: "Masculino" },
                          { id: "female", label: "Feminino" },
                        ]
                      : options_two
                    ).map((opt) => {
                      const active = selectedPreAnswers[q.id] === opt.id
                      return (
                        <TouchableOpacity
                          key={opt.id}
                          style={styles.optionRow}
                          onPress={() =>
                            setSelectedPreAnswers((prev) => ({
                              ...prev,
                              [q.id]: opt.id,
                            }))
                          }
                          activeOpacity={0.8}
                        >
                          <View
                            style={[styles.radio, active && styles.radioActive]}
                          >
                            {active && <View style={styles.radioDot} />}
                          </View>
                          <Text
                            style={[
                              styles.optionLabel,
                              active && styles.optionLabelActive,
                            ]}
                          >
                            {" "}
                            {opt.label}{" "}
                          </Text>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Dados do Doador */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                )
                setOpenDados((s) => !s)
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.cardTitle}>Dados do Doador</Text>
              <EvilIcons
                name={openDados ? "chevron-up" : "chevron-down"}
                size={28}
                color="#bdbdbd"
              />
            </TouchableOpacity>
            {openDados && (
              <View style={styles.cardBody}>
                <Text style={styles.label}>CPF</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu CPF"
                  value={cpf}
                  onChangeText={setCpf}
                  keyboardType="numeric"
                  returnKeyType="next"
                />

                <Text style={styles.label}>Nome Completo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu nome completo"
                  value={nome}
                  onChangeText={setNome}
                  returnKeyType="next"
                />

                <Text style={styles.label}>Data de Nascimento</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.inputInline}
                    placeholder="dd/mm/aaaa"
                    value={dataNascimento}
                    onChangeText={setDataNascimento}
                    returnKeyType="next"
                  />
                  <TouchableOpacity
                    style={styles.iconButton}
                    activeOpacity={0.7}
                    onPress={() => {
                      /* abrir picker se implementar */
                    }}
                  >
                    <Feather name="calendar" size={20} color="#bdbdbd" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={styles.input}
                  placeholder="seuemail@gmail.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Text style={styles.label}>Telefone</Text>
                <TextInput
                  style={styles.input}
                  placeholder="(xx) xxxxx-xxxx"
                  value={telefone}
                  onChangeText={setTelefone}
                  keyboardType="phone-pad"
                />
              </View>
            )}
          </View>

          {/* Local de Doação */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                )
                setOpenLocal((s) => !s)
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.cardTitle}>Local de Doação</Text>
              <EvilIcons
                name={openLocal ? "chevron-up" : "chevron-down"}
                size={28}
                color="#bdbdbd"
              />
            </TouchableOpacity>
            {openLocal && (
              <View style={styles.cardBody}>
                <Text style={styles.label}>Cidades</Text>
                <TouchableOpacity
                  style={styles.select}
                  onPress={() => {
                    setShowCityList((s) => !s)
                    setShowLocalList(false)
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.selectText}>
                    {selectedCity ?? "Selecione uma cidade"}
                  </Text>
                  <Feather
                    name={showCityList ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#bdbdbd"
                  />
                </TouchableOpacity>

                {showCityList && (
                  <View style={{ marginBottom: 12 }}>
                    {cities.map((c) => (
                      <TouchableOpacity
                        key={c}
                        style={styles.optionRow}
                        onPress={() => {
                          setSelectedCity(c)
                          setShowCityList(false)
                          setSelectedLocal(null)
                        }}
                      >
                        <Text style={styles.optionLabel}>{c}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                <Text style={styles.label}>Local*</Text>
                <TouchableOpacity
                  style={styles.select}
                  onPress={() => {
                    // só abre lista de locais se cidade selecionada
                    if (!selectedCity) {
                      setShowCityList(true)
                      return
                    }
                    setShowLocalList((s) => !s)
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.selectText}>
                    {selectedLocal ?? "Selecione um local"}
                  </Text>
                  <Feather
                    name={showLocalList ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#bdbdbd"
                  />
                </TouchableOpacity>

                {showLocalList && selectedCity && (
                  <View style={{ marginBottom: 12 }}>
                    {(locationsByCity[selectedCity] || []).map((loc) => (
                      <TouchableOpacity
                        key={loc}
                        style={styles.optionRow}
                        onPress={() => {
                          setSelectedLocal(loc)
                          setShowLocalList(false)
                        }}
                      >
                        <Text style={styles.optionLabel}>{loc}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Data e Hora */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                )
                setOpenDataHora((s) => !s)
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.cardTitle}>Data e Hora</Text>
              <EvilIcons
                name={openDataHora ? "chevron-up" : "chevron-down"}
                size={28}
                color="#bdbdbd"
              />
            </TouchableOpacity>
            {openDataHora && (
              <View style={styles.cardBody}>
                <Text style={styles.instruction}>
                  Selecione data e hora (picker)
                </Text>
              </View>
            )}
          </View>

          {/* Verificações Finais */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                )
                setOpenVerif((s) => !s)
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.cardTitle}>Verificações Finais</Text>
              <EvilIcons
                name={openVerif ? "chevron-up" : "chevron-down"}
                size={28}
                color="#bdbdbd"
              />
            </TouchableOpacity>
            {openVerif && (
              <View style={styles.cardBody}>
                <Text style={styles.instruction}>
                  Revisão das informações antes de confirmar
                </Text>
              </View>
            )}
          </View>

          <View style={{ height: 24 }} />

          <View style={styles.footerFixed}>
            <TouchableOpacity
              style={styles.backFooter}
              onPress={() => router.back()}
            >
              <Text style={styles.backFooterText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.advanceFooter,
                !selected && !hasPreAnswers && styles.nextButtonDisabled,
              ]}
              onPress={() => console.log("avançar")}
              disabled={!selected && !hasPreAnswers}
            >
              <Text style={styles.advanceFooterText}>Avançar</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.nextButton, !selected && styles.nextButtonDisabled]}
            disabled={!selected}
            onPress={() => {
              // navegar ou abrir próximo passo
              // por enquanto exibimos console
              console.log("tipo selecionado", selected)
            }}
          ></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f0dede",
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0dede",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardTitle: {
    fontSize: 16,
    color: "#d32f2f",
    fontFamily: "Roboto-Bold",
  },
  cardBody: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  instruction: {
    marginBottom: 12,
    fontSize: 16,
    color: "#111",
    fontFamily: "Roboto-Regular",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#bdbdbd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioActive: {
    borderColor: "#d32f2f",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#d32f2f",
  },
  optionLabel: {
    fontSize: 15,
    color: "#111",
    fontFamily: "Roboto-Regular",
  },
  optionLabelActive: {
    color: "#111",
    fontFamily: "Roboto-Bold",
  },
  footer: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  footerFixed: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  backFooter: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f0dede",
  },
  backFooterText: {
    color: "#d32f2f",
    fontFamily: "Roboto-Bold",
  },
  advanceFooter: {
    backgroundColor: "#d32f2f",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  advanceFooterText: {
    color: "#fff",
    fontFamily: "Roboto-Bold",
  },
  nextButton: {
    //backgroundColor: "#d32f2f",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
  },
  nextButtonDisabled: {
    backgroundColor: "#f1bcbc",
  },
  nextButtonText: {
    color: "#fff",
    fontFamily: "Roboto-Bold",
    fontSize: 15,
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    left: 12,
    top: 12,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#d32f2f",
    fontSize: 18,
    fontFamily: "Roboto-Bold",
  },
  label: {
    fontSize: 13,
    color: "#444",
    marginBottom: 6,
    fontFamily: "Roboto-Regular",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f0dede",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontFamily: "Roboto-Regular",
    backgroundColor: "#fff",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0dede",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  inputInline: {
    flex: 1,
    paddingVertical: 10,
    fontFamily: "Roboto-Regular",
  },
  iconButton: {
    padding: 8,
  },
  select: {
    borderWidth: 1,
    borderColor: "#f0dede",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  selectText: {
    color: "#999",
    fontFamily: "Roboto-Regular",
  },
})
