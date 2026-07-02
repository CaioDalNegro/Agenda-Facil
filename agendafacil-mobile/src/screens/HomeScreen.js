import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Cabeçalho */}
        <View style={styles.header}>

          <View>
            <Text style={styles.hello}>Olá!</Text>
            <Text style={styles.name}>João Silva</Text>
          </View>

          <TouchableOpacity style={styles.avatar}>
            <Text style={styles.avatarText}>JS</Text>
          </TouchableOpacity>

        </View>

        {/* Card principal */}

        <View style={styles.card}>

          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="store"
              size={34}
              color="#D4AF37"
            />
          </View>

          <Text style={styles.title}>
            Nenhuma barbearia vinculada
          </Text>

          <Text style={styles.subtitle}>
            Insira o código fornecido pela sua barbearia
            para acessar os serviços e realizar agendamentos.
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Inserir código de acesso
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Não tem um código? Peça ao seu barbeiro.
          </Text>

        </View>

        {/* Como funciona */}

        <View style={styles.cardInfo}>

          <Text style={styles.infoTitle}>
            COMO FUNCIONA?
          </Text>

          <View style={styles.step}>

            <View style={styles.numberCircle}>
              <Text style={styles.number}>1</Text>
            </View>

            <Text style={styles.stepText}>
              Seu barbeiro compartilha um código ou
              link exclusivo com você.
            </Text>

          </View>

          <View style={styles.step}>

            <View style={styles.numberCircle}>
              <Text style={styles.number}>2</Text>
            </View>

            <Text style={styles.stepText}>
              Você insere o código aqui e fica
              vinculado àquela barbearia.
            </Text>

          </View>

          <View style={styles.step}>

            <View style={styles.numberCircle}>
              <Text style={styles.number}>3</Text>
            </View>

            <Text style={styles.stepText}>
              Agende serviços, escolha seu
              profissional favorito e acompanhe
              seus horários.
            </Text>

          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const GOLD = "#D4AF37";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#111111",
  },

  header: {
    marginTop: 25,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  hello: {
    color: "#A5A5A5",
    fontSize: 16,
  },

  name: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 2,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: GOLD,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontWeight: "700",
    fontSize: 20,
    color: "#111",
  },

  card: {
    marginHorizontal: 15,
    marginTop: 25,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#2D2D2D",
    backgroundColor: "#1A1A1A",
    padding: 22,
    alignItems: "center",
  },

  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: GOLD,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 25,
    textAlign: "center",
  },

  subtitle: {
    color: "#9E9E9E",
    textAlign: "center",
    marginTop: 15,
    fontSize: 17,
    lineHeight: 25,
  },

  button: {
    width: "100%",
    marginTop: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#555",
    paddingVertical: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 17,
  },

  footerText: {
    marginTop: 18,
    color: "#777",
    fontSize: 15,
  },

  cardInfo: {
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#1A1A1A",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#2D2D2D",
    padding: 18,
  },

  infoTitle: {
    color: GOLD,
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 18,
  },

  step: {
    flexDirection: "row",
    marginBottom: 22,
    alignItems: "flex-start",
  },

  numberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: GOLD,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },

  number: {
    color: GOLD,
    fontWeight: "700",
  },

  stepText: {
    flex: 1,
    color: "#C8C8C8",
    fontSize: 16,
    lineHeight: 24,
  },

});