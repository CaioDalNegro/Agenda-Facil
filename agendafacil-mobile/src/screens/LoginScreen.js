import { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";

import api from "../services/api";
import ButtonCustom from "../components/ButtonCustom";
import { saveToken } from "../storage/authStorage";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {

  // Estados para armazenar email e senha digitados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Método login vindo do contexto global
  const { login } = useContext(AuthContext);

  // Função responsável por realizar login
  async function handleLogin() {
    try {
      console.log("Tentando login...");

      // Envia email e senha para o backend Spring Boot
      const response = await api.post("/auth/login", {
        email,
        password
      });

      console.log("LOGIN OK:", response.data);

      // Salva token JWT no AsyncStorage
      await saveToken(response.data.token);

      // Atualiza estado global para usuário autenticado
      login();

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

      {/* Título */}
      <Text style={styles.title}>
        Login
      </Text>

      {/* Campo Email */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      {/* Campo Senha */}
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Botão Entrar */}
      <ButtonCustom
        title="Entrar"
        onPress={handleLogin}
      />

      {/* Link para tela de cadastro */}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.link}>
          Não tem uma conta? Cadastre-se
        </Text>
      </TouchableOpacity> */}

      {/* Link para tela de ChooseAccountType */}
      <TouchableOpacity
        onPress={() => navigation.navigate("ChooseAccountType")}
      >
        <Text style={styles.link}>
          Não tem uma conta? Cadastre-se
        </Text>
      </TouchableOpacity>

    </View>
  );
}

// Estilos da tela =====================================================
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212"
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FFFFFF"
  },

  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    color: "#FFFFFF"
  },

  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#4DA6FF",
    fontWeight: "bold"
  }

});