import { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";

import api from "../services/api"; // IMPORT CORRETO
import ButtonCustom from "../components/ButtonCustom";
import { saveToken } from "../storage/authStorage";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  // Função de login
  async function handleLogin() {
    try {
      console.log("Tentando login...");

      // chama backend Spring Boot
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN OK:", response.data);

      // salva token localmente
      await saveToken(response.data.token);

      // atualiza estado global de autenticação
      login();

    } catch (error) {
      console.log("ERRO LOGIN:", error);

      Alert.alert("Erro", "Email ou senha inválidos");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <ButtonCustom title="Entrar" onPress={handleLogin} />

      <ButtonCustom
        title="Cadastrar"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#CCC", padding: 15, borderRadius: 10, marginBottom: 10 },
});