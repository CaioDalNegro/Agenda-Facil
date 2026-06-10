import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";

import api from "../services/api";
import ButtonCustom from "../components/ButtonCustom";

export default function RegisterScreen({ navigation }) {

  // Estados dos campos
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função responsável por cadastrar usuário
  async function handleRegister() {
    try {
      console.log("Tentando cadastrar...");

      // Envia os dados para o backend Spring Boot
      const response = await api.post("/auth/register", {
        name,
        email,
        password
      });

      console.log("CADASTRO OK:", response.data);

      Alert.alert(
        "Sucesso",
        "Usuário cadastrado com sucesso!"
      );

      // Retorna para tela de login
      navigation.navigate("Login");

    } catch (error) {

      console.log("ERRO CADASTRO:", error);

      Alert.alert(
        "Erro",
        "Não foi possível cadastrar"
      );
    }
  }

  return (
    <View style={styles.container}>

      {/* Título */}
      <Text style={styles.title}>
        Cadastro
      </Text>

      {/* Campo Nome */}
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

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

      {/* Botão cadastrar */}
      <ButtonCustom
        title="Cadastrar"
        onPress={handleRegister}
      />

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
  }
});