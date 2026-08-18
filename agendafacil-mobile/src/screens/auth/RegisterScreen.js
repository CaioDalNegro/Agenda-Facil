import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

// Serviço responsável pelas requisições para a API
import api from "../../services/api";

// Componente da tela de cadastro
export default function RegisterScreen({ navigation, route }) {

  // Recebe a navegação e os parâmetros da tela anterior.
  // Aqui armazenamos os valores digitados pelo usuário em estados locais.
  const [name, setName] = useState(""); // Nome do usuário
  const [email, setEmail] = useState(""); // Email do usuário
  const [phone, setPhone] = useState(""); // Telefone do usuário
  const [password, setPassword] = useState(""); // Senha
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmação da senha

  // Estado responsável por mostrar ou ocultar a senha
  const [showPassword, setShowPassword] = useState(false);

  // Recebe o tipo de perfil enviado pela tela anterior
  const role = route.params?.role;

  // Função responsável por validar os dados e enviar o cadastro para a API.
  async function handleRegister() {

    // Verifica se as duas senhas são iguais
    if (password !== confirmPassword) {
      Alert.alert(
        "Erro",
        "As senhas não coincidem"
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert("Senha inválida", "A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    try {

      // Envia os dados para a API
      await api.post("/auth/register", {
        name,
        email,
        password
      });

      // Exibe mensagem de sucesso
      Alert.alert(
        "Sucesso",
        "Conta criada com sucesso!"
      );

      // Redireciona para a tela de login
      navigation.navigate("Login");

    } catch (error) {

      // Mostra o erro no console
      console.log("Falha no cadastro:", error.response?.status, error.response?.data);

      if (error.response?.data?.message) {
        Alert.alert("Erro", error.response.data.message);
        return;
      }

      // Exibe mensagem de erro
      Alert.alert(
        "Erro",
        "Não foi possível realizar o cadastro"
      );
    }
  }

  return (
    // ScrollView permite rolagem vertical da tela
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* ================= Cabeçalho ================= */}
      {/* Botão para voltar para a tela anterior */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back"
          size={28}
          color="#FFF"
        />
      </TouchableOpacity>

      {/* Título da tela */}
      <Text style={styles.title}>
        Criar conta
      </Text>

      {/* Subtítulo */}
      <Text style={styles.subtitle}>
        Perfil de cliente
      </Text>

      {/* Barra de progresso */}
      <View style={styles.progress}>
        <View style={styles.progressBar} />
      </View>

      {/* ================= Foto do perfil ================= */}
      <View style={styles.photoContainer}>

        {/* Círculo onde será exibida a foto */}
        <View style={styles.photoCircle}>
          <Ionicons
            name="person-outline"
            size={45}
            color="#D4AF37"
          />
        </View>

        {/* Botão para adicionar foto */}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons
            name="add"
            size={18}
            color="#000"
          />
        </TouchableOpacity>

      </View>

      {/* Texto abaixo da foto */}
      <Text style={styles.photoText}>
        Adicionar foto de perfil
      </Text>

      {/* ================= Campo Nome ================= */}
      <Text style={styles.label}>
        NOME COMPLETO
      </Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={20}
          color="#D4AF37"
        />

        <TextInput
          placeholder="João Silva"
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

      </View>

      {/* ================= Campo E-mail ================= */}
      <Text style={styles.label}>
        E-MAIL
      </Text>

      <View style={styles.inputContainer}>

        <Ionicons
          name="mail-outline"
          size={20}
          color="#888"
        />

        <TextInput
          placeholder="seu@email.com"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

      </View>

      {/* ================= Campo Telefone ================= */}
      <Text style={styles.label}>
        TELEFONE
      </Text>

      <View style={styles.inputContainer}>
        <Feather
          name="phone"
          size={20}
          color="#888"
        />
        <TextInput
          placeholder="(11) 90000-0000"
          placeholderTextColor="#777"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />
      </View>

      {/* ================= Campo Senha ================= */}
      <Text style={styles.label}>
        SENHA
      </Text>

      <View style={styles.inputContainer}>

        {/* Ícone do cadeado */}
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#888"
        />

        {/* Campo da senha */}
        <TextInput
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {/* Botão para mostrar ou ocultar senha */}
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name="eye-outline"
            size={20}
            color="#D4AF37"
          />
        </TouchableOpacity>

      </View>

      {/* ================= Campo Confirmar Senha ================= */}
      <Text style={styles.label}>
        CONFIRMAR SENHA
      </Text>

      <View style={styles.inputContainer}>

        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#888"
        />

        <TextInput
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />

        {/* Ícone indicando confirmação */}
        <Ionicons
          name="checkmark"
          size={20}
          color="#00D26A"
        />

      </View>

      {/* ================= Botão de cadastro ================= */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >

        <Text style={styles.buttonText}>
          Criar conta
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

// Estilos da tela ======================================================
const styles = StyleSheet.create({

  // Container principal
  container: {
    flex: 1,
    backgroundColor: "#090909",
    padding: 20
  },

  // Título principal
  title: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 15
  },

  // Texto abaixo do título
  subtitle: {
    color: "#AAA",
    marginBottom: 20
  },

  // Fundo da barra de progresso
  progress: {
    height: 4,
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    marginBottom: 30
  },

  // Parte preenchida da barra
  progressBar: {
    width: "50%",
    height: 4,
    backgroundColor: "#D4AF37"
  },

  // Container da foto
  photoContainer: {
    alignSelf: "center",
    marginBottom: 10
  },

  // Círculo da foto do perfil
  photoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center"
  },

  // Botão de adicionar foto
  addButton: {
    width: 35,
    height: 35,
    backgroundColor: "#D4AF37",
    borderRadius: 18,
    position: "absolute",
    bottom: 0,
    right: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  // Texto abaixo da foto
  photoText: {
    color: "#AAA",
    textAlign: "center",
    marginBottom: 30
  },

  // Texto dos labels
  label: {
    color: "#AAA",
    marginBottom: 8,
    marginTop: 10
  },

  // Caixa dos inputs
  inputContainer: {
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15
  },

  // Campo de texto
  input: {
    flex: 1,
    color: "#FFF",
    padding: 16
  },

  // Botão criar conta
  button: {
    backgroundColor: "#D4AF37",
    padding: 18,
    borderRadius: 18,
    marginTop: 20,
    marginBottom: 40
  },

  // Texto do botão
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  }

});
