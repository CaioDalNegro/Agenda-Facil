import { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";

import api from "../services/api";
import ButtonCustom from "../components/ButtonCustom";
import { saveToken } from "../storage/authStorage";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {

  // Estados dos inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Contexto de autenticação (login global)
  const { login } = useContext(AuthContext);

  // Função de login
  async function handleLogin() {

    try {

      // Log para debug (ver se o botão foi clicado)
      console.log("Tentando login...");

      // Requisição para backend
      const response = await api.post("/auth/login", {
        email,
        password
      });

      // Token retornado pelo backend
      const token = response.data.token;

      console.log("TOKEN RECEBIDO:", token);

      // Salva token no storage (AsyncStorage ou equivalente)
      await saveToken(token);

      // Atualiza estado global de login
      login();

      Alert.alert("Sucesso", "Login realizado com sucesso");

    } catch (error) {

      console.log("ERRO LOGIN:", error);

      Alert.alert(
        "Erro",
        "Email ou senha inválidos"
      );
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Login</Text>

      {/* INPUT EMAIL */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {/* INPUT SENHA */}
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* BOTÃO LOGIN */}
      <ButtonCustom
        title="Entrar"
        onPress={handleLogin}
      />

      {/* BOTÃO PARA CADASTRO */}
      <ButtonCustom
        title="Cadastrar"
        onPress={() => navigation.navigate("Register")}
      />

    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  }
});