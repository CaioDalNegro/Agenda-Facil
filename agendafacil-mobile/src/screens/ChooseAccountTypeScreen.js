import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import {
  Feather,
  MaterialCommunityIcons
} from "@expo/vector-icons";

export default function ChooseAccountTypeScreen({ navigation }) {

  // Guarda qual perfil foi escolhido
  const [selectedRole, setSelectedRole] = useState(null);

  // Navega para o cadastro
  function handleContinue() {

    if (!selectedRole) return;

    navigation.navigate("Register", {
      role: selectedRole
    });
  }

  return (

    <View style={styles.container}>

      {/* Título */}
      <Text style={styles.title}>
        Como deseja utilizar o app?
      </Text>

      {/* Subtítulo */}
      <Text style={styles.subtitle}>
        Escolha seu perfil para personalizar sua experiência.
      </Text>

      {/* CLIENTE */}
      <TouchableOpacity
        style={[
          styles.card,
          selectedRole === "CLIENT" && styles.selectedCard
        ]}
        onPress={() => setSelectedRole("CLIENT")}
      >

        <View style={[styles.iconBox, styles.clientIcon]}>
          <Feather
            name="user"
            size={24}
            color="#F0C040"
          />
        </View>

        <View style={styles.info}>

          <Text style={styles.cardTitle}>
            Cliente
          </Text>

          <Text style={styles.cardDescription}>
            Agende serviços de forma rápida e prática.
          </Text>

        </View>

        <Feather
          name="chevron-right"
          size={25}
          color="#F0C040"
        />

      </TouchableOpacity>

      {/* BARBEIRO */}
      <TouchableOpacity
        style={[
          styles.card,
          selectedRole === "BARBER" && styles.selectedCard
        ]}
        onPress={() => setSelectedRole("BARBER")}
      >

        <View style={[styles.iconBox, styles.barberIcon]}>
          <Feather
            name="scissors"
            size={24}
            color="#22D3EE"
          />
        </View>

        <View style={styles.info}>

          <Text style={styles.cardTitle}>
            Barbeiro
          </Text>

          <Text style={styles.cardDescription}>
            Gerencie sua agenda e seus atendimentos.
          </Text>

        </View>

        <Feather
          name="chevron-right"
          size={25}
          color="#F0C040"
        />

      </TouchableOpacity>

      {/* BARBEARIA */}
      <TouchableOpacity
        style={[
          styles.card,
          selectedRole === "OWNER" && styles.selectedCard
        ]}
        onPress={() => setSelectedRole("OWNER")}
      >

        <View style={[styles.iconBox, styles.shopIcon]}>
          <MaterialCommunityIcons
            name="store"
            size={24}
            color="#FF6B6B"
          />
        </View>

        <View style={styles.info}>

          <Text style={styles.cardTitle}>
            Barbearia
          </Text>

          <Text style={styles.cardDescription}>
            Gerencie equipe, serviços e clientes.
          </Text>

        </View>

        <Feather
          name="chevron-right"
          size={25}
          color="#F0C040"
        />

      </TouchableOpacity>

      {/* Botão continuar */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >

        <Text style={styles.buttonText}>
          Continuar
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    paddingHorizontal: 20,
    paddingTop: 70
  },

  title: {
    color: "#FFF",
    fontSize: 34,
    fontWeight: "bold"
  },

  subtitle: {
    color: "#AAAAAA",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 40,
    lineHeight: 24
  },

  card: {
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#2B2B2B",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18
  },

  selectedCard: {
    borderColor: "#F0C040"
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center"
  },

  clientIcon: {
    backgroundColor: "#41361B"
  },

  barberIcon: {
    backgroundColor: "#1B373D"
  },

  shopIcon: {
    backgroundColor: "#442424"
  },

  info: {
    flex: 1,
    marginLeft: 15
  },

  cardTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold"
  },

  cardDescription: {
    color: "#B0B0B0",
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20
  },

  button: {
    height: 60,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold"
  }

});