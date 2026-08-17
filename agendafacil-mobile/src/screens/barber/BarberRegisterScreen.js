import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import api from "../../services/api";

export default function BarberRegisterScreen({ navigation }) {
  // Armazena as especialidades marcadas pelo barbeiro durante o cadastro.
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Busca as especialidades disponíveis na API assim que a tela abre.
  useEffect(() => {
    async function loadSpecialties() {
      try {
        const response = await api.get("/specialties");
        setSpecialties(response.data || []);
      } catch (error) {
        console.error("Erro ao carregar especialidades:", error);
        Alert.alert(
          "Conexão indisponível",
          "Não foi possível carregar as especialidades. Verifique se a API está em execução."
        );
      } finally {
        setLoading(false);
      }
    }

    loadSpecialties();
  }, []);

  // Marca ou desmarca uma especialidade ao tocar no botão correspondente.
  function toggleSpecialty(item) {
    const isSelected = selectedSpecialties.some((s) => s.id === item.id);

    if (isSelected) {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s.id !== item.id));
    } else {
      setSelectedSpecialties([...selectedSpecialties, item]);
    }
  }

  // Valida os campos do formulário e avança para a tela de horários.
  function handleNext() {
    if (!fullName.trim()) {
      Alert.alert("Erro", "Informe o nome completo.");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Erro", "Informe o e-mail.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    const specialty = selectedSpecialties.map((item) => item.name).join(", ") || "Geral";

    navigation.navigate("BarberScheduleScreen", {
      barberData: {
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        specialty,
      },
    });
  }

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}

      <TouchableOpacity style={styles.backButton}>
        <Icon name="arrow-left" size={22} color="#FFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>Perfil de barbeiro</Text>

      {/* Progresso */}

      <View style={styles.progressBackground}>
        <View style={styles.progressFill} />
      </View>

      {/* Foto */}

      <TouchableOpacity style={styles.photoContainer}>
        <View style={styles.photoCircle}>
          <Icon name="camera" size={28} color="#D9AF37" />

          <View style={styles.addButton}>
            <Icon name="plus" size={14} color="#111" />
          </View>
        </View>

        <Text style={styles.photoText}>Foto profissional</Text>
      </TouchableOpacity>

      {/* Nome */}

      <Text style={styles.label}>NOME COMPLETO</Text>

      <View style={styles.inputContainer}>
        <Icon
          name="user"
          size={18}
          color="#D9AF37"
          style={styles.icon}
        />

        <TextInput
          placeholder="Ricardo Silva"
          placeholderTextColor="#AAA"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Email e telefone */}

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>E-MAIL</Text>

          <View style={styles.smallInput}>
            <Icon
              name="mail"
              size={17}
              color="#AAA"
              style={styles.icon}
            />

            <TextInput
              placeholder="email@..."
              placeholderTextColor="#777"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={{ width: 12 }} />

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>TELEFONE</Text>

          <View style={styles.smallInput}>
            <Icon
              name="phone"
              size={17}
              color="#AAA"
              style={styles.icon}
            />

            <TextInput
              placeholder="(11) 9..."
              placeholderTextColor="#777"
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </View>

      {/* Divider */}

      <View style={styles.divider} />

      {/* Especialidades */}
      <Text style={styles.label}>ESPECIALIDADES</Text>

      <Text style={styles.description}>
        Selecione todas que se aplicam
      </Text>

      <View style={styles.tagsContainer}>
        {loading ? (
          <Text style={styles.description}>Carregando especialidades...</Text>
        ) : (
          specialties.map((item) => {
            const active = selectedSpecialties.some((s) => s.id === item.id);

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.tag,
                  active && styles.tagSelected,
                ]}
                onPress={() => toggleSpecialty(item)}
              >
                <Text
                  style={[
                    styles.tagText,
                    active && styles.tagTextSelected,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      <View style={styles.divider} />

      {/* Senha */}

      <Text style={styles.label}>SENHA</Text>

      <View style={styles.inputContainer}>
        <Icon
          name="lock"
          size={18}
          color="#D9AF37"
          style={styles.icon}
        />

        <TextInput
          placeholder="********"
          secureTextEntry
          placeholderTextColor="#777"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Text style={styles.label}>CONFIRMAR SENHA</Text>

      <View style={styles.inputContainer}>
        <Icon
          name="lock"
          size={18}
          color="#D9AF37"
          style={styles.icon}
        />

        <TextInput
          placeholder="********"
          secureTextEntry
          placeholderTextColor="#777"
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>Próximo: Horários</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const GOLD = "#D9AF37";
const DARK = "#121212";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK,
    paddingHorizontal: 18,
  },

  backButton: {
    marginTop: 18,
    width: 42,
    height: 42,
    justifyContent: "center",
  },

  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "700",
  },

  subtitle: {
    color: "#999",
    marginTop: 4,
    marginBottom: 18,
  },

  progressBackground: {
    width: "100%",
    height: 3,
    backgroundColor: "#343434",
    borderRadius: 10,
    marginBottom: 30,
  },

  progressFill: {
    width: "40%",
    height: 3,
    backgroundColor: GOLD,
    borderRadius: 10,
  },

  photoContainer: {
    alignItems: "center",
    marginBottom: 28,
  },

  photoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: GOLD,
    justifyContent: "center",
    alignItems: "center",
  },

  addButton: {
    position: "absolute",
    right: -3,
    bottom: -3,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: GOLD,
    justifyContent: "center",
    alignItems: "center",
  },

  photoText: {
    color: "#999",
    marginTop: 10,
  },

  label: {
    color: "#BBB",
    fontSize: 12,
    marginBottom: 8,
    marginTop: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 56,
    marginBottom: 18,
  },

  smallInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: "#FFF",
  },

  row: {
    flexDirection: "row",
  },

  divider: {
    height: 1,
    backgroundColor: "#2A2A2A",
    marginVertical: 18,
  },

  description: {
    color: "#777",
    marginBottom: 14,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  tag: {
    borderWidth: 1,
    borderColor: "#555",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 10,
  },

  tagSelected: {
    borderColor: GOLD,
    backgroundColor: "#2A220C",
  },

  tagText: {
    color: "#AAA",
    fontWeight: "500",
  },

  tagTextSelected: {
    color: GOLD,
    fontWeight: "700",
  },

  button: {
    backgroundColor: GOLD,
    height: 56,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#111",
    fontSize: 17,
    fontWeight: "700",
  },
});
