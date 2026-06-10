import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";

import api from "../services/api";
import ButtonCustom from "../components/ButtonCustom";

export default function RegisterScreen({ navigation }) {

  // Estados dos inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função de cadastro
  async function handleRegister() {

    try {

      console.log("Tentando cadastrar...");

      // Requisição para backend
      const response = await api.post("/auth/register", {
        name,
        email,
        password
      });

      console.log("CADASTRO OK:", response.data);

      Alert.alert(
        "Sucesso",
        "Usuário cadastrado com sucesso"
      );

      // Volta para login após cadastro
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

      <Text style={styles.title}>Cadastro</Text>

      {/* INPUT NOME */}
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

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

      {/* BOTÃO CADASTRAR */}
      <ButtonCustom
        title="Cadastrar"
        onPress={handleRegister}
      />

    </View>
  );
}

// Estilos
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