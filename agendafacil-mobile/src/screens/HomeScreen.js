import { useEffect, useState } from "react";

import {
  View,
 Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";

import api from "../services/api";
import { getToken } from "../storage/authStorage";

export default function HomeScreen() {

  // Dados do usuário
  const [user, setUser] = useState(null);

  // Estado de carregamento
  const [loading, setLoading] = useState(true);

  // Executa ao abrir a tela
  useEffect(() => {
    loadUser();
  }, []);

  // Busca os dados do usuário logado
  async function loadUser() {

    try {

      // Recupera token salvo
      const token = await getToken();

      console.log("TOKEN:", token);

      // Faz requisição para o backend
      const response = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("USUÁRIO:", response.data);

      // Salva usuário
      setUser(response.data);

    } catch (error) {

      console.log("ERRO AO BUSCAR USUÁRIO:");

      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }

    } finally {

      setLoading(false);

    }
  }

  // Enquanto carrega
  if (loading) {

    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );

  }

  // Caso não consiga obter o usuário
  if (!user) {

    return (
      <View style={styles.container}>

        <Text style={styles.errorText}>
          Não foi possível carregar os dados do usuário
        </Text>

      </View>
    );

  }

  // Tela principal
  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Bem-vindo 👋
      </Text>

      <Text style={styles.name}>
        {user.name}
      </Text>

      <Text style={styles.info}>
        {user.email}
      </Text>

      <Text style={styles.info}>
        Perfil: {user.role}
      </Text>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212"
  },

  title: {
    fontSize: 30,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 20
  },

  name: {
    fontSize: 24,
    color: "#FFFFFF"
  },

  info: {
    fontSize: 18,
    color: "#BBBBBB",
    marginTop: 10
  },

  errorText: {
    color: "red",
    fontSize: 18
  }

});