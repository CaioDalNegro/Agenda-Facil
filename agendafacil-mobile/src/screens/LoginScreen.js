import { useContext, useState } from "react";

// Componentes nativos do React Native
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";           // Biblioteca de ícones Feather
import api from "../services/api";                      // Serviço responsável pelas requisições HTTP para o backend
import { saveToken } from "../storage/authStorage";     // Função responsável por salvar o token no armazenamento local
import { AuthContext } from "../context/AuthContext";   // Contexto responsável pelo controle de autenticação

// Componente da tela de Login
export default function LoginScreen({ navigation }) {

  // Estados dos campos ==========================
  const [email, setEmail] = useState("");                     // Armazena o email digitado pelo usuário
  const [password, setPassword] = useState("");               // Armazena a senha digitada
  const [showPassword, setShowPassword] = useState(false);    // Controla se a senha está visível ou oculta
  const { login } = useContext(AuthContext);                  // Obtém a função login() do contexto de autenticação

  // Função responsável pelo login ==========================
  async function handleLogin() {

    try {

      // Envia email e senha para o backend
      const response = await api.post("/auth/login", {
        email,
        password
      });

      // Salva o token JWT no armazenamento local
      await saveToken(response.data.token);
      console.log('Token salvo:', response.data.token);

      // Atualiza o estado global de autenticação
      login();

    } catch (error) {

      // Exibe mensagem caso o login falhe
      Alert.alert(
        "Erro",
        "Email ou senha inválidos"
      );
    }
  }

  return (

    // Container principal da tela
    <View style={styles.container}>

      {/* ================= Logo e textos ================= */}
      <View style={styles.logoContainer}>

        {/* Caixa contendo o ícone */}
        <View style={styles.logoBox}>

          <Feather
            name="scissors"
            size={35}
            color="#000"
          />

        </View>

        {/* Título */}
        <Text style={styles.title}>
          Bem-vindo
        </Text>

        {/* Subtítulo */}
        <Text style={styles.subtitle}>
          Faça login para continuar
        </Text>

      </View>

      {/* ================= Campo Email ================= */}
      <Text style={styles.label}>
        E-MAIL
      </Text>

      <View style={styles.inputContainer}>

        {/* Ícone do email */}
        <Feather
          name="mail"
          size={20}
          color="#888"
        />

        {/* Campo de entrada do email */}
        <TextInput
          placeholder="seu@email.com"
          placeholderTextColor="#777"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

      </View>

      {/* ================= Campo Senha ================= */}
      <Text style={styles.label}>
        SENHA
      </Text>

      <View style={styles.inputContainer}>

        {/* Ícone do cadeado */}
        <Feather
          name="lock"
          size={20}
          color="#888"
        />

        {/* Campo da senha */}
        <TextInput
          placeholder="********"
          placeholderTextColor="#777"

          // Se showPassword for false, a senha fica escondida
          secureTextEntry={!showPassword}

          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* Botão para mostrar ou ocultar a senha */}
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
        >

          <Feather
            // Alterna entre os ícones olho aberto e fechado
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#D4AF37"
          />

        </TouchableOpacity>

      </View>

      {/* ================= Esqueci minha senha ================= */}
      <TouchableOpacity>

        <Text style={styles.forgotPassword}>
          Esqueci minha senha
        </Text>

      </TouchableOpacity>

      {/* ================= Botão Entrar ================= */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >

        <Text style={styles.loginText}>
          Entrar
        </Text>

      </TouchableOpacity>

      {/* ================= Separador ================= */}
      <View style={styles.separatorContainer}>

        {/* Linha da esquerda */}
        <View style={styles.line} />

        {/* Texto central */}
        <Text style={styles.separatorText}>
          ou
        </Text>

        {/* Linha da direita */}
        <View style={styles.line} />

      </View>

      {/* ================= Criar conta ================= */}
      <TouchableOpacity
        style={styles.registerButton}

        // Navega para a tela de escolha do tipo de conta
        onPress={() => navigation.navigate("ChooseAccountType")}
      >

        <Text style={styles.registerText}>
          Criar conta
        </Text>

      </TouchableOpacity>

    </View>
  );
}

// Estilos da tela ======================================================
const styles = StyleSheet.create({

  // Container principal
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    paddingHorizontal: 20,
    justifyContent: "center"
  },

  // Área da logo
  logoContainer: {
    alignItems: "center",
    marginBottom: 50
  },

  // Caixa da logo
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },

  // Título principal
  title: {
    color: "#FFF",
    fontSize: 36,
    fontWeight: "bold"
  },

  // Subtítulo
  subtitle: {
    color: "#B0B0B0",
    fontSize: 16,
    marginTop: 8
  },

  // Texto acima dos campos
  label: {
    color: "#AAA",
    fontSize: 12,
    marginBottom: 8,
    marginTop: 15
  },

  // Caixa dos campos de entrada
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 60
  },

  // Campo de texto
  input: {
    flex: 1,
    color: "#FFF",
    marginLeft: 10
  },

  // Texto "Esqueci minha senha"
  forgotPassword: {
    color: "#D4AF37",
    textAlign: "right",
    marginTop: 15
  },

  // Botão Entrar
  loginButton: {
    height: 60,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25
  },

  // Texto do botão Entrar
  loginText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold"
  },

  // Container do separador
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30
  },

  // Linhas laterais
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#333"
  },

  // Texto "ou"
  separatorText: {
    color: "#777",
    marginHorizontal: 15
  },

  // Botão Criar Conta
  registerButton: {
    height: 60,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center"
  },

  // Texto do botão Criar Conta
  registerText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold"
  }
});