import { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import api from "../services/api";
import { saveToken } from "../storage/authStorage";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);

  async function handleLogin() {

    try {

      const response = await api.post("/auth/login", {
        email,
        password
      });

      await saveToken(response.data.token);

      login();

    } catch (error) {

      Alert.alert(
        "Erro",
        "Email ou senha inválidos"
      );
    }
  }

  return (

    <View style={styles.container}>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Feather
            name="scissors"
            size={35}
            color="#000"
          />
        </View>

        <Text style={styles.title}>
          Bem-vindo
        </Text>

        <Text style={styles.subtitle}>
          Faça login para continuar
        </Text>
      </View>

      {/* Email */}
      <Text style={styles.label}>
        E-MAIL
      </Text>

      <View style={styles.inputContainer}>

        <Feather
          name="mail"
          size={20}
          color="#888"
        />

        <TextInput
          placeholder="seu@email.com"
          placeholderTextColor="#777"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

      </View>

      {/* Senha */}
      <Text style={styles.label}>
        SENHA
      </Text>

      <View style={styles.inputContainer}>

        <Feather
          name="lock"
          size={20}
          color="#888"
        />

        <TextInput
          placeholder="********"
          placeholderTextColor="#777"
          secureTextEntry={!showPassword}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
        >

          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#D4AF37"
          />

        </TouchableOpacity>

      </View>

      {/* Esqueci senha */}
      <TouchableOpacity>

        <Text style={styles.forgotPassword}>
          Esqueci minha senha
        </Text>

      </TouchableOpacity>

      {/* Entrar */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >

        <Text style={styles.loginText}>
          Entrar
        </Text>

      </TouchableOpacity>

      {/* Linha */}
      <View style={styles.separatorContainer}>

        <View style={styles.line} />

        <Text style={styles.separatorText}>
          ou
        </Text>

        <View style={styles.line} />

      </View>

      {/* Criar conta */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("ChooseAccountType")}
      >

        <Text style={styles.registerText}>
          Criar conta
        </Text>

      </TouchableOpacity>

    </View>
  );
}

// Estilos da tela =====================================================
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    paddingHorizontal: 20,
    justifyContent: "center"
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 50
  },

  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },

  title: {
    color: "#FFF",
    fontSize: 36,
    fontWeight: "bold"
  },

  subtitle: {
    color: "#B0B0B0",
    fontSize: 16,
    marginTop: 8
  },

  label: {
    color: "#AAA",
    fontSize: 12,
    marginBottom: 8,
    marginTop: 15
  },

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

  input: {
    flex: 1,
    color: "#FFF",
    marginLeft: 10
  },

  forgotPassword: {
    color: "#D4AF37",
    textAlign: "right",
    marginTop: 15
  },

  loginButton: {
    height: 60,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25
  },

  loginText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold"
  },

  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#333"
  },

  separatorText: {
    color: "#777",
    marginHorizontal: 15
  },

  registerButton: {
    height: 60,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center"
  },

  registerText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold"
  }

});